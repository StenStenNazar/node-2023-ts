import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.errors";
import { User } from "../models/User.model";

class UserMiddlewares {
  public async getByIdAndThrow(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      if (!user) {
        throw new ApiError("User not found", 404);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleWare = new UserMiddlewares();
