import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.errors";
import { User } from "../models/User.model";
import { authService } from "../services/auth.service";
import { passwordService } from "../services/password.service";
import { UserValidator } from "../validators/user.validator";

class AuthMiddlewares {
  public async checkValuesForRegister(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = UserValidator.create.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      req.res.locals = value;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkIfEmailExists(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email } = req.body;
      await authService.checkEmail(email);
      next();
    } catch (e) {
      next(e);
    }
  }
  public async checkValuesForLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        throw new ApiError("invalid email or password", 401);
      }
      const isMatched = await passwordService.compare(password, user.password);
      if (!isMatched) {
        throw new ApiError("invalid email or password", 401);
      }
      req.res.locals = user;
      next();
    } catch (e) {
      next(e);
    }
  }
}
export const authMiddlewares = new AuthMiddlewares();
