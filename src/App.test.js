import { render, screen } from "@testing-library/react";
import App from "./App";

test("Renders the header correctly", () => {
	render(<App />);
	const headerElement = screen.getByText("Character Builder");
	expect(headerElement).toBeInTheDocument();
});
