import env from 'dotenv';

env.config();

export const config = {
  secret: process.env.STRIPE_SECRET_KEY,
  port: process.env.PORT,
}