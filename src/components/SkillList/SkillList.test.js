import React from "react";
import { render, screen } from "@testing-library/react";
import SkillList from "./SkillList";
import { MockClassProvider } from "../../helpers/helpers";

const getSkillPoints = (skillName) =>
	screen.getByTestId(`skill-points-${skillName}`);

const getTotalValue = (skillName) => screen.getByTestId(`total-${skillName}`);

test("renders skill list with correct initial values and total values", () => {
	const mockContext = {
		attributes: {
			Dexterity: 14,
			Intelligence: 12,
		},
		skillPoints: {
			Acrobatics: 3,
			Stealth: 0,
			Arcana: 0,
		},
		skillList: [
			{ name: "Acrobatics", attributeModifier: "Dexterity" },
			{ name: "Stealth", attributeModifier: "Dexterity" },
			{ name: "Arcana", attributeModifier: "Intelligence" },
		],
	};

	render(
		<MockClassProvider mockContext={mockContext}>
			<SkillList />
		</MockClassProvider>
	);

	expect(getSkillPoints("Acrobatics")).toHaveTextContent("level 3");
	// Check the total value of Acrobatics (points 3 + Dexterity modifier 2 = 5)
	expect(getTotalValue("Acrobatics")).toHaveTextContent("Total: 5");

	expect(getSkillPoints("Stealth")).toHaveTextContent("level 0");
	expect(getTotalValue("Stealth")).toHaveTextContent("Total: 2");

	expect(getSkillPoints("Arcana")).toHaveTextContent("level 0");
	expect(getTotalValue("Arcana")).toHaveTextContent("Total: 1");
});
