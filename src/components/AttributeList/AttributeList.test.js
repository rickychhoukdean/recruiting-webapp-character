import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AttributeList from "./AttributeList";
import { ClassProvider } from "../../contexts/ClassContext.js";
import {
	DEFAULT_ATTRIBUTES,
	MAX_ATTRIBUTE_TOTAL,
} from "../../constants/consts.js";

test("Renders all of the attributes with correct values", () => {
	render(
		<ClassProvider>
			<AttributeList />
		</ClassProvider>
	);

	Object.entries(DEFAULT_ATTRIBUTES).forEach(([attribute, value]) => {
		const modifier = Math.floor((value - 10) / 2); // Calculate the modifier
		expect(screen.getByTestId(`attribute-${attribute}`)).toHaveTextContent(
			`${attribute}: ${value} (Modifier: ${modifier})`
		);
	});
});

test("Ensure attributes get incremented correctly without affecting others", () => {
	render(
		<ClassProvider>
			<AttributeList />
		</ClassProvider>
	);

	fireEvent.click(screen.getByTestId("increment-Strength"));

	expect(screen.getByTestId("attribute-Strength")).toHaveTextContent(
		`Strength: ${DEFAULT_ATTRIBUTES.Strength + 1}`
	);

	// Ensure other attributes are not affected
	expect(screen.getByTestId("attribute-Charisma")).toHaveTextContent(
		`Charisma: ${DEFAULT_ATTRIBUTES.Charisma}`
	);
});

test("Prevents Strength from going below 0 when - button is clicked", () => {
	render(
		<ClassProvider>
			<AttributeList />
		</ClassProvider>
	);

	// Click the decrement button more than the default to ensure it doesn't go below 0
	for (let i = 0; i < 15; i++) {
		fireEvent.click(screen.getByTestId("decrement-Strength"));
	}

	// Ensure Strength doesn't go below 0
	expect(screen.getByTestId("attribute-Strength")).toHaveTextContent(
		"Strength: 0 (Modifier: -5)" // Modifier for 0 is -5
	);
});

test("Ensure attribute can't exceed specified limit", () => {
	render(
		<ClassProvider>
			<AttributeList />
		</ClassProvider>
	);

	jest.spyOn(window, "alert").mockImplementation(() => {});

	// Calculate the number of remaining points to be allocated by summing all attributes and subtracting
	// from MAX_ATTRIBUTE_TOTAL
	const remainingPoints =
		MAX_ATTRIBUTE_TOTAL -
		Object.values(DEFAULT_ATTRIBUTES).reduce((acc, val) => acc + val, 0);

	for (let i = 0; i < remainingPoints + 1; i++) {
		fireEvent.click(screen.getByTestId("increment-Strength"));
	}

	expect(window.alert).toHaveBeenCalledWith(
		`Total attributes cannot exceed ${MAX_ATTRIBUTE_TOTAL}.`
	);
	window.alert.mockRestore();
});
