import mongoose, { Document, Schema, Model } from "mongoose";

export interface HabitInterface {
  userId: mongoose.Types.ObjectId; 
  title: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  completedDates: Date[]; 
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface HabitDocument extends HabitInterface, Document {}

const habitSchema = new Schema<HabitDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    completedDates: { type: [Date], default: [] },
    isActive: { type: Boolean, default: true },
  },
  {
    collection: "Habit",
    versionKey: false,
    timestamps: true,
  }
);

const HabitModel: Model<HabitDocument> = mongoose.model<HabitDocument>(
  "Habit",
  habitSchema
);

export default HabitModel;
