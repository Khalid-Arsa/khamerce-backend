import { Request, Response, NextFunction } from "express";
import { User } from "../model/user.model";
import { UserInterface } from "../lib/interface/auth/index.interface";

export async function signUp(req: Request, res: Response, next: NextFunction) {
  const payload: UserInterface = req.body

  let user = new User(payload);
  user.save();

  res.status(200).json({
    success: true,
    message: "Successfully created user",
    user
  })
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
  res.send("Signin Successfully");
}
