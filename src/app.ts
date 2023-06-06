import express from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/configs";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRouter);

app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL);
  console.log(`Server has started on PORT ${configs.PORT} 🥸`);
});
