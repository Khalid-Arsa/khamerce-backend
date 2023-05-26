import { Request, Response, NextFunction } from "express";
import { User } from "../model/user.model";
import { UserInterface } from "../lib/interface/auth/index.interface";
import { AppError } from "../utils/error/AppError";

export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const payload: UserInterface = req.body;

    if (payload.confirm_password !== payload.password) {
      return next(new AppError("Passwords don't match", 400));
    }

    let email: string = await User.findByEmail(payload.email);

    if (email === payload.email) {
      return next(new AppError("Email already exists", 400));
    }

    let user = new User(payload);
    user.save();

    return res.status(200).json({
      success: true,
      message: "Successfully created user",
      user
    });
  } catch (error: any) {
    return next(new AppError(error.message, 400));
  }
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await User.findAll();

    res.status(200).json({
      success: true,
      message: "Successful getting users data",
      users,
    });
  } catch (error: any) {
    console.log("Error: ", error);
  }
}
