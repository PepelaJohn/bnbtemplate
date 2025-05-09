import { z } from "zod";

export const emailSchema = z.string().email().min(1).max(100);
export const usernameSchema = z.string().min(3).max(100).optional();
export const passwordSchema = z.string().min(6).max(255);

export const loginSchema = z.object({
  email: z.string(),
  password: passwordSchema,
  userAgent: z.string(),
  
  
});

export const registerSchema = loginSchema
  .extend({
    email: emailSchema,
    username: usernameSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
    name: z.string(),
    phone: z.string().regex(/^\+\d+$/, "Phone number must be digits"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!!",
    path: ["confirmPassword"],
  });


export const verificationCodeSchema = z.string().min(1).max(24);

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  verificationCode: verificationCodeSchema,
});
