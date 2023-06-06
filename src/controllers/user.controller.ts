import { Request, Response } from "express";

import { IUser } from "../interfaces/user.interface";
import { User } from "../models/User.model";

class UserController {
  public async getAll(req: Request, res: Response): Promise<Response<IUser[]>> {
    try {
      const users = await User.find({});
      return res.json(users);
    } catch (e) {
      console.log(e);
    }
  }
  public async getById(req: Request, res: Response) {
    try {
      const user = await User.findById(req.params.id);
      return res.json(user);
    } catch (e) {
      console.log(e);
    }
  }
  public async post(req: Request, res: Response): Promise<Response<IUser>> {
    try {
      const createdUser = await User.create(req.body);
      return res.status(201).json(createdUser);
    } catch (e) {
      console.log(e);
    }
  }
  public async put(req: Request, res: Response): Promise<Response<IUser>> {
    const { id } = req.params;
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        { returnDocument: "after" }
      );
      return res.status(200).json(updatedUser);
    } catch (e) {
      console.log(e);
    }
  }
  public async delete(req: Request, res: Response): Promise<Response<void>> {
    try {
      const { id } = req.params;
      await User.deleteOne({ _id: id });
      return res.sendStatus(200);
    } catch (e) {
      console.log(e);
    }
  }
}

export const userController = new UserController();
