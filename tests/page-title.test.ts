import { describe, expect, it } from "vitest";
import { displayPageTitle } from "../src/domain/page-title.js";

describe("displayPageTitle", () => {
  it("preserves a non-empty page title", () => {
    expect(displayPageTitle("Project overview")).toBe("Project overview");
  });

  it("trims surrounding whitespace", () => {
    expect(displayPageTitle("  Project overview  ")).toBe("Project overview");
  });

  it("provides a label when the page has no title", () => {
    expect(displayPageTitle("  ")).toBe("Untitled page");
    expect(displayPageTitle(undefined)).toBe("Untitled page");
  });
});
