/**
 * @jest-environment jsdom
 */

import { App } from "./App";

describe("app", () => {
  it("is ok", async () => {
    const app = <App />;
    expect(app).not.toBeUndefined();
  });
});
