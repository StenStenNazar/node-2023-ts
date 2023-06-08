import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.errors";
import { User } from "../models/User.model";
import { UserValidator } from "../validators/user.validator";

class UserMiddlewares {
  public async isValidIdOrThrow(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      if (!isObjectIdOrHexString(id)) {
        throw new ApiError("ID not valid", 400);
      }
      req.res.locals = { id };
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isIdValid(
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

  public async create(
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

  public async put(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = UserValidator.update.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      req.res.locals = value;
      next();
    } catch (e) {
      next(e);
    }
  }
}
export const userMiddleWare = new UserMiddlewares();
