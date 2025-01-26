import { formatCapilize, uniqsarr } from "../src/Pages/ulit/commonFunction";

import { render } from "@testing-library/react";
import React from "react";
import App from "../src/App";

describe("MyComponent", () => {
  test("two plus two is four", () => {
    expect(2 + 2).toBe(4);
  });
  test("formae capilize", () => {
    expect(formatCapilize("test")).toBe("Test");
  });
  it("find uniq and return uniq value and that count", () => {
    expect(uniqsarr([1, 2, 3, 45, 45, 2, 3, 8, 6, 8])).toStrictEqual({
      1: 1,
      2: 2,
      3: 2,
      45: 2,
      6: 1,
      8: 2,
    });
  });
//   test("renders the App component without errors", () => {
//     const { getByRole } = render(<App />);
//     // No assertions needed, the test will fail if there are any errors
//     const main = getByRole("main");

//     expect(main).toBeInTheDocument();
//   });
});
