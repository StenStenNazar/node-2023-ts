import { NextFunction, Request, Response } from "express";

import { IUser } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.findAll();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.findById(req.res.locals.id);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const createdUser = await userService.create(req.res.locals as IUser);
      return res.status(201).json(createdUser);
    } catch (e) {
      next(e);
    }
  }
  public async update(req: Request, res: Response): Promise<Response<IUser>> {
    const { id } = req.params;
    try {
      const updatedUser = await userService.update(id, req.res.locals as IUser);
      return res.status(200).json(updatedUser);
    } catch (e) {
      console.log(e);
    }
  }
  public async delete(req: Request, res: Response): Promise<Response<void>> {
    try {
      await userService.delete(req.res.locals.id as string);
      return res.sendStatus(200);
    } catch (e) {
      console.log(e);
    }
  }
}

export const userController = new UserController();
