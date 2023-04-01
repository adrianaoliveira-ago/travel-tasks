import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  test("Renders App", () => {
    render(<App />);
    const todoHeader = screen.getByText(/ToDo/i);
    expect(todoHeader).toBeInTheDocument();

    const doneHeader = screen.getByText(/Done/i);
    expect(doneHeader).toBeInTheDocument();
  });
});
