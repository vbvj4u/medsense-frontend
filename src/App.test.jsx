import { render, screen } from "@testing-library/react";
import App from "./App.jsx";

test("renders the search UI", () => {
  render(<App />);
  expect(screen.getByText("MedSense")).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/search a medicine/i)).toBeInTheDocument();
});
