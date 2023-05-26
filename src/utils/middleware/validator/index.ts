import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

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
