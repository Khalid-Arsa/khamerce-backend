import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { UserInterface } from '../lib/interface/user.interface';

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'super-admin'],
      default: 'user',
    },
    phone_number: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    }
  },
  { timestamps: true },
);

UserSchema.pre('save', async function save(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function check(
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model<UserInterface>('User', UserSchema);

export default UserModel;
