import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Without vitest's `globals: true`, Testing Library's automatic cleanup
// (which relies on a global `afterEach`) never registers, so unmount the
// previous test's render before each new one.
afterEach(() => {
  cleanup();
});
