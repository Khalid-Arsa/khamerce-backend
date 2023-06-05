import express from "express";
import passport from "passport";
import { AuthController } from "../controller/auth.controller";
import {
  isRequestValidated,
  validateSigninRequest,
  validateSignupRequest,
} from "../utils/middleware/validator";

const router = express.Router();
const authController = new AuthController();

router.post(
  "/signup",
  passport.authenticate('signup'),
  validateSignupRequest,
  isRequestValidated,
  authController.signup
);
router.post(
  "/signin",
  validateSigninRequest,
  isRequestValidated,
  authController.signin
);

export default router;
