import { createContext, useState } from "react";
import {
	MAX_ATTRIBUTE_TOTAL,
	DEFAULT_ATTRIBUTES,
	CLASS_LIST,
	SKILL_LIST,
} from "../constants/consts";
export const ClassContext = createContext();

export const ClassProvider = ({ children }) => {
	const [attributes, setAttributes] = useState(DEFAULT_ATTRIBUTES);
	const [selectedClass, setSelectedClass] = useState(null);

	const [skillPoints, setSkillPoints] = useState(
		SKILL_LIST.reduce((acc, skill) => {
			acc[skill.name] = 0;
			return acc;
		}, {})
	);

	const updateAttribute = (attribute, value) => {
		setAttributes((prevAttributes) => {
			if (!(attribute in prevAttributes)) {
				alert(`Attribute "${attribute}" does not exist.`);
				return prevAttributes;
			}

			const currentTotal = Object.entries(prevAttributes)
				.filter(([key]) => key !== attribute)
				.reduce((acc, [, val]) => acc + val, 0);

			const newValue = prevAttributes[attribute] + value;
			const newTotal = currentTotal + newValue;

			if (newTotal > MAX_ATTRIBUTE_TOTAL && newValue > prevAttributes[attribute]) {
				alert(`Total attributes cannot exceed ${MAX_ATTRIBUTE_TOTAL}.`);
				return prevAttributes;
			}
			return {
				...prevAttributes,
				[attribute]: Math.max(newValue, 0),
			};
		});
	};

	const selectClass = (className) => {
		setSelectedClass(className);
	};

	const updateSkillPoints = (skill, value) => {
		setSkillPoints((prevSkillPoints) => {
			return {
				...prevSkillPoints,
				[skill]: Math.max(prevSkillPoints[skill] + value, 0),
			};
		});
	};

	return (
		<ClassContext.Provider
			value={{
				attributes,
				updateAttribute,
				classList: CLASS_LIST,
				skillList: SKILL_LIST,
				selectedClass,
				selectClass,
				skillPoints,
				updateSkillPoints,
			}}
		>
			{children}
		</ClassContext.Provider>
	);
};
