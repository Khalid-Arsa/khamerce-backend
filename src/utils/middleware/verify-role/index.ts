import { Request, Response, NextFunction } from "express";
import { User } from "../../../model/user.model"

export const verifyRole = async (req: Request, res: Response, next: NextFunction) => {
  const user =  await User.findAll()
  return user
}