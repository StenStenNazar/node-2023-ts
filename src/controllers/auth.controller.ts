import {NextFunction, Request, Response} from "express";

import {ITokenPair} from "../interfaces/token.interface";
import {IUser} from "../interfaces/user.interface";
import {authService} from "../services/auth.service";
import {emailService} from "../services/email.service";
import {EEmailActions} from "../enums/email.enams";

class AuthController {
  public async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      await authService.register(req.res.locals as IUser);
      await emailService.sendMail(req.res.locals.email, EEmailActions.WELCOME, {
        name: req.res.locals.name,
      });
      return res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }
  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ITokenPair>> {
    try {
      const tokensPair = await authService.login(
        req.body,
        req.res.locals as IUser
      );
      return res.status(200).json({
        ...tokensPair,
      });
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
