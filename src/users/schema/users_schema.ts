import { Schema } from 'mongoose';

export const UsersScrema = new Schema({
  username: String,
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
});
