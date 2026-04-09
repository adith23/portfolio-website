import { describe, expect, it } from "vitest";

import { contactSchema } from "@/lib/contact-schema";

describe("contactSchema", () => {
  it("accepts a valid contact payload", () => {
    const result = contactSchema.safeParse({
      name: "Adithya",
      email: "adithya@example.com",
      message: "I would like to discuss a platform architecture engagement.",
      website: "",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid email and short messages", () => {
    const result = contactSchema.safeParse({
      name: "A",
      email: "invalid",
      message: "Too short",
      website: "",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toBeDefined();
      expect(result.error.flatten().fieldErrors.message).toBeDefined();
    }
  });
});
