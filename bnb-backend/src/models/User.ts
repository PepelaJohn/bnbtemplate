import mongoose from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";

export interface UserDocument extends mongoose.Document {
  email: string;
  username?: string;
  password: string;
  verified: boolean;
  updatedAt: Date;
  createdAt: Date;
  name:string;
  phone: string;
  role: "guest" | "admin" | "super_admin";
  isActive: boolean;
  lastLogin?: Date;
  comparePassword(val: string): Promise<boolean>;
  omitPassword(): Pick<
    UserDocument,
    "_id" | "verified" | "email" | "verified" | "createdAt" | "updatedAt"
  >;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    username: { type: String },
    name:{type:String, required:true},
    email: { type: String, required: true },
    password: { type: String, required: true, min: 6, max: 255 },
    verified: { type: Boolean, required: true, default: false },
    role: {
      
      type: String,
      enum: ["guest", "admin", "super_admin"],
      default: "guest",
    },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
    phone: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await hashValue(this.password);
  return next();
});

userSchema.methods.comparePassword = async function (val: string) {
  return compareValue(val, this.password);
};

userSchema.methods.omitPassword = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

export default mongoose.model<UserDocument>("User", userSchema);
