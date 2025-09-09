import mongoose, { Document, Schema, Model } from "mongoose";

export interface UserModelInterface {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserModleDocument extends UserModelInterface, Document {}

const userModelSchema = new Schema<UserModleDocument>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
  },
  {
    collection: "User",
    versionKey: false,
    timestamps: true,
  }
);

//? compound index 
userModelSchema.index({ firstName: 1, lastName: 1 });

const UserModel: Model<UserModleDocument> = mongoose.model<UserModleDocument>(
  "User",
  userModelSchema
);

export default UserModel;
