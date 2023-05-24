import { Request, Response, NextFunction } from 'express';
import { signUp } from '../service/auth.service';

export class AuthController {
  create(req: Request, res: Response, next: NextFunction) {
    return signUp(req, res, next)
  }
}