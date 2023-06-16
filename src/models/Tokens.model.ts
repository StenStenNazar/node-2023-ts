import { model, Schema, Types } from "mongoose";

import { User } from "./User.model";

const TokensSchema = new Schema({
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  _id: {
    type: Types.ObjectId,
    required: true,
    ref: User,
  },
});

export const Tokens = model("Tokens", TokensSchema);
