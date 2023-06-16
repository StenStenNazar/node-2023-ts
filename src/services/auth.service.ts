import { ApiError } from "../errors/api.errors";
import { ICredentials } from "../interfaces/credentials.interface";
import { ITokenPair } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import { Tokens } from "../models/Tokens.model";
import { User } from "../models/User.model";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(data: IUser): Promise<void> {
    try {
      const hashedPassword = await passwordService.hash(data.password);
      await User.create({ ...data, password: hashedPassword });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async login(
    credentials: ICredentials,
    user: IUser
  ): Promise<ITokenPair> {
    try {
      const tokensPair = await tokenService.generateTokenPair({
        _id: user._id,
      });

      await Tokens.create({
        ...tokensPair,
        _id: user._id,
      });

      return tokensPair;
    } catch (e) {
      throw new ApiError("user already logging", 500);
    }
  }
  public async checkEmail(email: string): Promise<void> {
    try {
      const emailExist = await User.findOne({ email });
      if (emailExist) {
        throw new ApiError("Email already exist", 400);
      }
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}
export const authService = new AuthService();
