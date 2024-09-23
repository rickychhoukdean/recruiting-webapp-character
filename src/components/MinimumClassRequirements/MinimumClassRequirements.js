import React, { useContext } from "react";
import { ClassContext } from "../../contexts/ClassContext";
import "./MinimumClassRequirements.css";

const MinimumClassRequirements = () => {
	const { selectedClass, classList, clearSelectedClass } =
		useContext(ClassContext);

	if (!selectedClass) return null;

	const classAttributes = classList[selectedClass];

	return (
		<div className="class-requirements">
			<div className="class-requirements__title">
				Required Stats for {selectedClass}
			</div>
			{Object.entries(classAttributes).map(([attribute, value]) => (
				<div className="class-requirements__attribute" key={attribute}>
					{attribute}: {value}
				</div>
			))}
			<button
				className="class-requirements__close-btn"
				onClick={clearSelectedClass}
				style={{ marginLeft: "10px" }}
			>
				Close
			</button>
		</div>
	);
};

export default MinimumClassRequirements;
