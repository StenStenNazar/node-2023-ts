import { IUser } from "../interfaces/user.interface";
import { User } from "../models/User.model";

class UserService {
  public async findAll(): Promise<IUser[]> {
    return User.find().select("-password");
  }
  public async create(data: IUser): Promise<IUser> {
    return User.create(data);
  }
  public async findById(userId: string): Promise<IUser> {
    return User.findById(userId);
  }
  public async update(id: string, data: IUser): Promise<IUser> {
    return User.findOneAndUpdate(
      { _id: id },
      { ...data },
      { returnDocument: "after" }
    );
  }

  public async delete(id: string): Promise<void> {
    console.log(id);
    await User.deleteOne({ _id: id });
  }
}
export const userService = new UserService();
