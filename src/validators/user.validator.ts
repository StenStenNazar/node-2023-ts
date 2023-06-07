import Joi, { valid } from "joi";

import { regexConstants } from "../constants/regex.constatants";
import { EGenders } from "../enums/users.enums";

export class UserValidator {
  static firstName = Joi.string().min(3).max(30).trim();
  static age = Joi.number().min(1).max(199);
  static gender = valid(...Object.values(EGenders));
  static email = Joi.string().regex(regexConstants.EMAIL).lowercase().trim();
  static password = Joi.string().regex(regexConstants.PASSWORD).trim();

  static update = Joi.object({
    name: this.firstName,
    age: this.age,
    gender: this.gender,
  });

  static create = Joi.object({
    name: this.firstName.required(),
    age: this.age.required(),
    gender: this.gender.required(),
    email: this.email.required(),
    password: this.password.required(),
  });
}
