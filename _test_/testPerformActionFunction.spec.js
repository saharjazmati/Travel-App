import { performAction } from "../src/client/js/app";

require("babel-polyfill");

test("performAction function", () => {
  expect(performAction).toBeDefined();
});
