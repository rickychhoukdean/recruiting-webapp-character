import React from "react";
import { render, screen } from "@testing-library/react";
import ClassList from "./ClassList";
import { ClassProvider } from "../../contexts/ClassContext.js";
import { CLASS_LIST } from "../../constants/consts";

test("renders class list and applies correct color for selected class", () => {
	render(
		<ClassProvider>
			<ClassList />
		</ClassProvider>
	);

	// Only the barbarian class will be valid from the start
	const classButton = screen.getByTestId(`class-button-Barbarian`);
	expect(classButton).toHaveClass("class-list__button--available");

	const otherClassButtons = Object.keys(CLASS_LIST)
		.filter((className) => className !== "Barbarian")
		.map((className) => screen.getByTestId(`class-button-${className}`));

	// Assert that all other buttons are red
	otherClassButtons.forEach((button) => {
		expect(button).toHaveClass("class-list__button--unavailable");
	});
});
