import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { User } from "../model/user.model";
import { UserInterface } from "../lib/interface/auth/index.interface";
import { AppError } from "../utils/error/AppError";
import jwt from "jsonwebtoken";
import { config } from "../config";

export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const payload: UserInterface = req.body;

    if (payload.confirm_password !== payload.password) {
      return next(new AppError("Password don't match", 400));
    }

    let userEmail: UserInterface = await User.findByEmail(payload.email);

    if (userEmail?.email === payload.email) {
      return next(new AppError("Email already exists", 400));
    }

    let user = new User(payload);
    user.save();

    return res.status(200).json({
      success: true,
      message: "Successfully created user",
      user,
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
          const token = jwt.sign(
            { user: body },
            config.secret as string,
            { expiresIn: "1d" }
          );

          if (user.role !== "admin") {
            return next(new AppError("Admin is not an Owner", 401));
          }

          const userDoc: UserInterface = await User.findById(user.id);

          return res.status(200).json({
            success: true,
            message: "Signin successful",
            token,
            data: {
              _id: userDoc.id,
              email: userDoc.email,
              role: userDoc.role,
              firstName: userDoc.first_name,
              lastName: userDoc.last_name,
            },
          });
        });
      } catch (error: any) {
        console.log("Error: ", error);
      }
    }
  )(req, res, next);
}
