import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.errors";
import { IUser } from "../interfaces/user.interface";
import { User } from "../models/User.model";
import { UserValidator } from "../validators/user.validator";

class UserController {
  public async getAll(req: Request, res: Response): Promise<Response<IUser[]>> {
    try {
      const users = await User.find({});
      return res.json(users);
    } catch (e) {
      console.log(e);
    }
  }
  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findById(req.params.id);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
  public async post(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const { error, value } = UserValidator.create.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      const createdUser = await User.create(value);
      return res.status(201).json(createdUser);
    } catch (e) {
      next(e);
    }
  }
  public async put(req: Request, res: Response): Promise<Response<IUser>> {
    const { id } = req.params;
    try {
      const { error, value } = UserValidator.update.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        { ...value },
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
