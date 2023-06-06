/**
 * Main application file
 */
import { config } from "./config";
import { server } from "./server";
import logger from './utils/logger';
import connect from "./utils/mongodb";

const PORT = config.port || 5000;

server.listen(PORT, async () => {
  logger.info(`The server is listening on port ${PORT}`);

  await connect();
});