import { Request, Response, NextFunction } from "express";
import { UserInterface } from "../../../lib/interface/user.interface";
import UserModel from "../../../model/user.model";
import { AppError } from "../../error/AppError";

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
