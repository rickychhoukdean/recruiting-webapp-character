import { render, screen } from "@testing-library/react";
import MinimumClassRequirements from "./MinimumClassRequirements";
import { CLASS_LIST } from "../../constants/consts";
import { MockClassProvider } from "../../helpers/helpers";
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
		<MockClassProvider mockContext={mockSelectedClassContext}>
			<MinimumClassRequirements />
		</MockClassProvider>
	);

	const selectedClass = mockSelectedClassContext.selectedClass;
	const classRequirements = CLASS_LIST[selectedClass];

	Object.entries(classRequirements).forEach(([attribute, value]) => {
		expect(screen.getByText(`${attribute}: ${value}`)).toBeInTheDocument();
	});
});
