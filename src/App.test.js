import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders search input", () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/search movie/i)).toBeInTheDocument();
});