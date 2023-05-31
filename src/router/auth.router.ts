import express from 'express';
import passport from 'passport';
import { AuthController } from '../controller/auth.controller';
import { isRequestValidated, validateSignupRequest } from '../utils/middleware/validator';

const router = express.Router();
const authController = new AuthController();

router.post(
  '/signup', 
  passport.authenticate('local', { session: false }),
  validateSignupRequest,
  isRequestValidated,
  authController.signup
);
router.post('/signin', authController.signin);

export default router;
