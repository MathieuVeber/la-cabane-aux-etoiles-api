import { Document, Schema, model, Model } from "mongoose";

export interface IWorkshop extends Document {
  name: string;
  numberOfParticipants: number;
  pricePerParticipant: number;
  minAge: number;
  maxAge: number;
  description: string;
}

const workshopSchema = new Schema({
  name: { type: String, required: true, unique: true },
  numberOfParticipants: { type: Number, required: true },
  pricePerParticipant: { type: Number, required: true },
  minAge: { type: Number, required: true },
  maxAge: { type: Number, required: true },
  description: { type: String },
});

export const Workshop = model<IWorkshop, Model<IWorkshop>>(
  "Workshop",
  workshopSchema
);
