import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  firebaseUserId: string;
  name: string;
  email: string;
  avatar?: string;
  isVerified: boolean;
  signedUpFrom: "email" | "google";
  createdAt?: Date;
  updatedAt?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    firebaseUserId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    signedUpFrom: { type: String, enum: ["email", "google"], required: true },
    isVerified: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Method to exclude password field when converting to JSON
// UserSchema.methods.toJSON = function () {
//   const user = this.toObject();
//   delete user.firebaseUserId;
//   return user;
// };

const User = mongoose.model("User", UserSchema);

export default User;
