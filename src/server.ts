import express, { Express, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import session from 'express-session';
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet"
import cors from "cors"
import { config } from './config';
import router from "./router/index"
import { AppError } from './utils/error/AppError';

/* Configuration */
dotenv.config();

/* Create a new Express application. */
const app: Express = express();

import '../src/utils/middleware/passport/index';


/* 
  Use application-level middleware for common functionality, including
  logging, parsing, and session handling.
*/
app.use(session({
  secret: config.secret_session as string,
  resave: true,
  rolling: true, // forces resetting of max age,
  cookie: {
    maxAge: 360000,
    secure: false
  }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* Router */
app.use(router);

app.listen(config.port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${config.port}`);
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new AppError(
    `Can't find ${req.originalUrl} on this server`,
    404,
  );
  next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const error = {
    statusCode: err.statusCode || 500,
    success: err.success,
    message: err.message,
  };

  res.status(error.statusCode).json({
    success: error.success,
    message: error.message,
    data: null,
  });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal Server Error',
  });
});
