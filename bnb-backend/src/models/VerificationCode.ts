export const enum VerificationCodeType {
  EmailVerification = "email_verification",
  PasswordReset = "password_reset",
}

import mongoose, { Document } from "mongoose";

export interface verificationCodeDocument extends Document {
  userId: mongoose.Types.ObjectId;
  type: VerificationCodeType;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
}

const verificationCodeSchema = new mongoose.Schema<verificationCodeDocument>(
  {
    userId: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);


export default mongoose.model<verificationCodeDocument>("VerificationCode", verificationCodeSchema, "verification_codes")