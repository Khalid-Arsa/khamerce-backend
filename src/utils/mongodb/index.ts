import mongoose from 'mongoose';
import logger from '../logger/index'

const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    logger.info('Database Connected');
  } catch (error) {
    console.log(error)
    logger.error('Could not connect to db', error);
    process.exit(1);
  }
};

export default connect;
