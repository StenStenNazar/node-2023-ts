import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { userMiddleWare } from "../middlewares/user.middlewares";

const router = Router();

router.get("/", userController.getAll);
router.get("/:id", userMiddleWare.getByIdAndThrow, userController.getById);
router.post("/", userController.post);
router.put("/:id", userController.put);
router.delete("/:id", userController.delete);

export const userRouter = router;
