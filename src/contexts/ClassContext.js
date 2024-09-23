import { createContext, useState } from "react";
import { DEFAULT_ATTRIBUTES, CLASS_LIST } from "../constants/consts";
export const ClassContext = createContext();

export const ClassProvider = ({ children }) => {
	const [attributes, setAttributes] = useState(DEFAULT_ATTRIBUTES);
	const [selectedClass, setSelectedClass] = useState(null);

	const updateAttribute = (attribute, value) => {
		setAttributes((prevAttributes) => {
			if (!(attribute in prevAttributes)) {
				alert(`Attribute "${attribute}" does not exist.`);
				return prevAttributes;
			}

			const newValue = prevAttributes[attribute] + value;
			return {
				...prevAttributes,
				[attribute]: Math.max(newValue, 0),
			};
		});
	};

	const selectClass = (className) => {
		setSelectedClass(className);
	};

	return (
		<ClassContext.Provider
			value={{
				attributes,
				updateAttribute,
				classList: CLASS_LIST,
				selectedClass,
				selectClass,
			}}
		>
			{children}
		</ClassContext.Provider>
	);
};
