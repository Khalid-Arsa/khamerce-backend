import express from "express";
import { AuthController } from "../controller/auth.controller";
import {
  isRequestValidated,
  validateSigninRequest,
  validateSignupRequest,
} from "../utils/middleware/validator";
import { isEmailExisted } from "../utils/middleware/isEmailExisted";

const router = express.Router();
const authController = new AuthController();

router.post(
  "/signup",
  validateSignupRequest,
  isRequestValidated,
  isEmailExisted,
  authController.signup,
);

router.post(
  "/signin",
  validateSigninRequest,
  isRequestValidated,
  authController.signin
);

export default router;
