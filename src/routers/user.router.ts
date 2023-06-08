import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { userMiddleWare } from "../middlewares/user.middlewares";

const router = Router();

router.get("/", userController.getAll);

router.get(
  "/:id",
  userMiddleWare.isValidIdOrThrow,
  userMiddleWare.isIdValid,
  userController.getById
);

router.post("/", userMiddleWare.create, userController.post);

router.put(
  "/:id",
  userMiddleWare.isValidIdOrThrow,
  userMiddleWare.put,
  userController.put
);

router.delete("/:id", userMiddleWare.isValidIdOrThrow, userController.delete);

export const userRouter = router;
