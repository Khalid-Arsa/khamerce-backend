import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { AppError } from "../utils/error/AppError";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { UserInterface } from "../lib/interface/user.interface";
import UserModel from "../model/user.model";

export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      role,
      address,
      phone_number,
      confirm_password
    }: UserInterface = req.body;

    if (confirm_password !== password) {
      return next(new AppError("Password don't match", 400));
    }

    const createUser = await UserModel.create({
      first_name,
      last_name,
      email,
      password,
      role,
      address,
      phone_number
    });

    return res.status(200).json({
      success: true,
      message: "Successfully created user",
      createUser,
    });
  } catch (error: any) {
    return next(new AppError(error.message, 400));
  }
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
  passport.authenticate(
    "signin",
    async (err: any, user: UserInterface, info: string) => {
      try {
        const { message }: any = info;

        if (err || !user) {
          return next(new AppError(message, 401));
        }

        return req.login(user, { session: false }, async (error) => {
          if (error) return next(error);

          const body = { _id: user.id, email: user.email, role: user.role };
          const token = jwt.sign({ user: body }, config.secret as string, {
            expiresIn: "1d",
          });

          if (user.role !== "admin") {
            return next(new AppError("Unauthorized", 401));
          }

          return res.status(200).json({
            success: true,
            message: "Signin successful",
            token,
            data: user
          });
        });
      } catch (error: any) {
        console.log("Error: ", error);
      }
    }
  )(req, res, next);
}
