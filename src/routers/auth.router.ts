import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddlewares } from "../middlewares/auth.middlewares";

const router = Router();

router.post(
  "/register",
  authMiddlewares.checkValuesForRegister,
  authMiddlewares.checkIfEmailExists,
  authController.register
);

router.post(
  "/login",
  authMiddlewares.checkValuesForLogin,
  authController.login
);
export const authRouter = router;
