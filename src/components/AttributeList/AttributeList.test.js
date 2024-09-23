import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AttributeList from "./AttributeList";
import { ClassProvider } from "../../contexts/ClassContext.js";
import { DEFAULT_ATTRIBUTES } from "../../constants/consts.js";

test("Renders all of the attributes with correct values", () => {
	render(
		<ClassProvider>
			<AttributeList />
		</ClassProvider>
	);

	Object.entries(DEFAULT_ATTRIBUTES).forEach(([attribute, value]) => {
		expect(screen.getByText(`${attribute}: ${value}`)).toBeInTheDocument();
	});
});

test("Ensure attributes get incremented correctly without affecting others", () => {
	render(
		<ClassProvider>
			<AttributeList />
		</ClassProvider>
	);

	// Check to see if strength is incremented correctly
	fireEvent.click(screen.getByTestId("increment-Strength"));

	expect(
		screen.getByText(`Strength: ${DEFAULT_ATTRIBUTES.Strength + 1}`)
	).toBeInTheDocument();

	// Ensure other attributes are not affected
	expect(
		screen.getByText(`Charisma: ${DEFAULT_ATTRIBUTES.Charisma}`)
	).toBeInTheDocument();
});

test("Prevents Strength from going below 0 when - button is clicked", () => {
	render(
		<ClassProvider>
			<AttributeList />
		</ClassProvider>
	);

	// Click the decrement button more than the default to ensure it doesn't go below 0
	for (let i = 0; i < 12; i++) {
		fireEvent.click(screen.getByTestId("decrement-Strength"));
	}

	expect(screen.getByText("Strength: 0")).toBeInTheDocument();
});
