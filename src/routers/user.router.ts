import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { userMiddleWare } from "../middlewares/user.middlewares";

const router = Router();

router.get("/", userController.getAll);

router.get(
  "/:id",
  userMiddleWare.checkIsIdCorrect,
  userMiddleWare.checkIfUserExists,
  userController.getById
);

router.post("/", userMiddleWare.checkValuesForCreation, userController.create);

router.put(
  "/:id",
  userMiddleWare.checkIsIdCorrect,
  userMiddleWare.checkIfUserExists,
  userMiddleWare.checkValuesForUpdate,
  userController.update
);

router.delete(
  "/:id",
  userMiddleWare.checkIsIdCorrect,
  userMiddleWare.checkIfUserExists,
  userController.delete
);

export const userRouter = router;
