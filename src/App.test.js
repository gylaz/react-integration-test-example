import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";

it("renders without crashing", async () => {
  axios.get = jest.fn(() => {
    return Promise.resolve({ data: { one: 1, two: 2 } });
  });
  const div = document.createElement("div");
  const component = await await ReactDOM.render(<App />, div);

  expect(div.textContent).toEqual("We have data!");
});
