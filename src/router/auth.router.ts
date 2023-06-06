import express from "express";
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
