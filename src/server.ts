import express, { Express, Request, Response } from 'express';
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import http from "http";
import helmet from "helmet"
import cors from "cors"
import { config } from './config';

/* CONFIGURATION */
dotenv.config();
const app: Express = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(config.port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${config.port}`);
});
