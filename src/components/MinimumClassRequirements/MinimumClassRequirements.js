import React, { useContext } from "react";
import { ClassContext } from "../../contexts/ClassContext";

const MinimumClassRequirements = () => {
	const { selectedClass, classList } = useContext(ClassContext);

	if (!selectedClass) return null;

	const classAttributes = classList[selectedClass];

	return (
		<ul>
			{Object.entries(classAttributes).map(([attribute, value]) => (
				<ul key={attribute}>
					{attribute}: {value}
				</ul>
			))}
		</ul>
	);
};

export default MinimumClassRequirements;
