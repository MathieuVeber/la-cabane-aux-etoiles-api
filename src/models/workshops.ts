import { Document, Schema, model, Model } from "mongoose";

export interface IWorkshop extends Document {
  name: string;
  numberParticipants: number;
  pricePerParticipant: number;
  minAge: number;
  maxAge: number;
  description: string;
}

const workshopSchema = new Schema({
  name: { type: String, required: true, unique: true },
  numberParticipants: { type: Number, required: true },
  pricePerParticipant: { type: Number, required: true },
  minAge: { type: Number, required: true },
  maxAge: { type: Number, required: true },
  description: { type: String },
});

export const Workshop = model<IWorkshop, Model<IWorkshop>>(
  "Workshop",
  workshopSchema
);
