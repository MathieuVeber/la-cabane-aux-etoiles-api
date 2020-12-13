import { Document, Schema, model, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IParent extends Document {
  email: string;
  lastName: string;
  firstName: string;
  getSafeParent(): ISafeParent;
  setPassword(password: string): void;
  validatePassword(password: string): boolean;
}

export type ISafeParent = Pick<
  IParent,
  "_id" | "email" | "lastName" | "firstName"
>;

const parentSchema = new Schema({
  email: { type: String, required: true, unique: true },
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  password: { type: String, required: true },
});

parentSchema.methods.setPassword = async function (
  password: string
): Promise<void> {
  const salt = await bcrypt.genSalt(11);
  this.password = await bcrypt.hash(password, salt);
};

parentSchema.methods.validatePassword = function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(this.password, password);
};

parentSchema.methods.getSafeParent = function (): ISafeParent {
  const { _id, email, lastName, firstName } = this;
  return { _id, email, lastName, firstName };
};

export const Parent = model<IParent, Model<IParent>>("Parent", parentSchema);
