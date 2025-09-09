import { z } from "zod";

export const userSignupSchema = z.object({
  firstName: z.string().min(3, "string must be at least 3 characters long."),
  lastName: z.string().min(1, "string must be at least 1 characters long."),
  email: z.string().email(),
  password: z.string().min(6, "string must be at least 6 characters long."),
});
export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "string must be at least 6 characters long."),
});
export const createHabitsSchema = z.object({
  title: z.string().min(3, "string must be at least 3 characters long."),
  description: z.string().min(3, "string must be at least 3 characters long."),
  startDate: z.iso.date()
});
