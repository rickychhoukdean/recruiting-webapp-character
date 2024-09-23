import { render, screen } from "@testing-library/react";
import MinimumClassRequirements from "./MinimumClassRequirements";
import { ClassContext } from "../../contexts/ClassContext";
import { CLASS_LIST } from "../../constants/consts";

const mockSelectedClassContext = {
	selectedClass: "Barbarian",
	classList: CLASS_LIST,
	attributes: {
		Strength: 14,
		Dexterity: 9,
		Constitution: 9,
		Intelligence: 9,
		Wisdom: 9,
		Charisma: 9,
	},
};

test("renders minimum class requirements for selected class", () => {
	render(
		<ClassContext.Provider value={mockSelectedClassContext}>
			<MinimumClassRequirements />
		</ClassContext.Provider>
	);

	const selectedClass = mockSelectedClassContext.selectedClass;
	const classRequirements = CLASS_LIST[selectedClass];

	Object.entries(classRequirements).forEach(([attribute, value]) => {
		expect(screen.getByText(`${attribute}: ${value}`)).toBeInTheDocument();
	});
});
