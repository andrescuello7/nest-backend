import { Document } from 'mongoose';

export interface Users extends Document {
  readonly username: string;
  readonly email: string;
  readonly password: string;
}
