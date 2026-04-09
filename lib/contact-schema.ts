import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.email("Please enter a valid email address."),
  message: z.string().trim().min(20, "Please include at least 20 characters."),
  website: z.string().optional(),
});
