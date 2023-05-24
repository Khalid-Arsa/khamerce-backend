import express, { Express, Request, Response } from 'express';
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet"
import cors from "cors"
import { config } from './config';
import router from "./router/index"

/* Create a new Express application. */
const app: Express = express();

/* 
  Use application-level middleware for common functionality, including
  logging, parsing, and session handling.
*/
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* Configuration */
dotenv.config();

/* Router */
app.use(router);

app.listen(config.port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${config.port}`);
});
