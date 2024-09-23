import { createContext, useState } from "react";
import { DEFAULT_ATTRIBUTES } from "../constants/consts";
export const ClassContext = createContext();

export const ClassProvider = ({ children }) => {
	const [attributes, setAttributes] = useState(DEFAULT_ATTRIBUTES);

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

	return (
		<ClassContext.Provider
			value={{
				attributes,
				updateAttribute,
			}}
		>
			{children}
		</ClassContext.Provider>
	);
};
