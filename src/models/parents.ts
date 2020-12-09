import { Document, Schema, model, Model } from "mongoose";
import bcrypt from 'bcrypt';

export interface IParent extends Document {
  email: string;
  lastname: string;
  firstname: string;
  getSafeParent(): ISafeParent;
  setPassword(password: string): void;
  validatePassword(password: string): boolean;
}

export type ISafeParent = Pick<IParent, '_id' | 'email' | 'lastname' | 'firstname'>;

const parentSchema = new Schema({
  email: { type: String, required: true, unique: true },
  lastname: { type: String, required: true },
  firstname: { type: String, required: true },
  password: { type: String, required: true },
});

parentSchema.methods.setPassword = async function (password: string): Promise<void> {
  const salt = await bcrypt.genSalt(11);
  this.password = await bcrypt.hash(password, salt);
};

parentSchema.methods.validatePassword = function (password: string): Promise<boolean> {
  return bcrypt.compare(this.password, password);
};

parentSchema.methods.getSafeParent = function (): ISafeParent {
  const { _id, email, lastname, firstname } = this;
  return { _id, email, lastname, firstname };
};

export const Parent = model<IParent, Model<IParent>>("Parent", parentSchema);