import { Request, Response, NextFunction } from "express";

export async function signUp(req: Request, res: Response, next: NextFunction) {
  res.send("Signup Successfully");
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
  res.send("Signin Successfully");
}
