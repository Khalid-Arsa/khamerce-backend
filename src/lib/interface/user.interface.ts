import mongoose from "mongoose";

export interface UserInterface extends mongoose.Document {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  role: string;
  phone_number: string;
  address: string;
  createdAt: Date;
  updateAt: Date;
  isValidPassword(password: string): Promise<boolean>;
}
