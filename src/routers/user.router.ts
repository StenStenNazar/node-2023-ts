import { Router } from "express";

import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/", userController.getAll);
router.get("/:id", userController.getById);
router.post("/", userController.post);
router.put("/:id", userController.put);
router.delete("/:id", userController.delete);

export const userRouter = router;
