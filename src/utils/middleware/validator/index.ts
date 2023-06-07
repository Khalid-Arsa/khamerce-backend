import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";
import { AppError } from "../../error/AppError";
import { UserInterface } from "../../../lib/interface/user.interface";
import UserModel from "../../../model/user.model";

export const validateSignupRequest = [
  check("first_name").notEmpty().withMessage("first name is required"),
  check("last_name").notEmpty().withMessage("last name is required"),
  check("email").isEmail().withMessage("Valid email is required"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 character long"),
  check("address").notEmpty().withMessage("Address is required"),
  check("phone_number").notEmpty().withMessage("Phone number is required"),
];

export const validateSigninRequest = [
  check("email").isEmail().withMessage("Valid email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
];

export const isRequestValidated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({
      message: errors.array()[0].msg,
      success: false,
    });
  }
  next();
};

export const isPasswordCorrect = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    confirm_password,
    password
  } = req.body;

  if (confirm_password !== password) {
    return next(new AppError("Password don't match", 400));
  };

  next()
};


export const isEmailExisted = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const userExist: UserInterface | null = await UserModel.findOne({ email });
  if (userExist) {
    return next(new AppError("This email is already exist", 400));
  };

  next();
};
