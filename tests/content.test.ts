import { describe, expect, it } from "vitest";

import { fallbackProfile, fallbackProjects } from "@/lib/fallback-content";

describe("fallback content", () => {
  it("provides profile content for local bootstrapping", () => {
    expect(fallbackProfile.fullName).toBeTruthy();
    expect(fallbackProfile.skills.length).toBeGreaterThan(0);
  });

  it("provides at least one featured project", () => {
    expect(fallbackProjects.some((project) => project.featured)).toBe(true);
  });
});
