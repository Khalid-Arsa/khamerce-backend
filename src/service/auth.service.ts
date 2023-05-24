import { Request, Response, NextFunction } from 'express';
import { UserInterface } from "../lib/interface/auth";
import { AppError } from '../utils/error/AppError';

export async function signUp(req: Request, res: Response, next: NextFunction) {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    role,
    phoneNumber,
    address,
  }: UserInterface = req.body;

  console.log("Email: ", email)

}