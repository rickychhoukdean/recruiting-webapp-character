import React, { useContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ClassList from "./ClassList";
import { ClassProvider, ClassContext } from "../../contexts/ClassContext.js";
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

const TestComponent = () => {
	const { selectedClass } = useContext(ClassContext);
	return <div data-testid="selected-class">{selectedClass}</div>;
};

test("updates selectedClass correctly when a class is clicked", () => {
	render(
		<ClassProvider>
			<ClassList />
			<TestComponent />
		</ClassProvider>
	);

	// Ensure initially no class is selected
	expect(screen.getByTestId("selected-class")).toHaveTextContent("");

	// Click on the Wizard class button
	const wizardButton = screen.getByTestId("class-button-Wizard");
	fireEvent.click(wizardButton);

	// Ensure selectedClass is updated to "Wizard"
	expect(screen.getByTestId("selected-class")).toHaveTextContent("Wizard");
});
