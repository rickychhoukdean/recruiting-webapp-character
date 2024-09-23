import React, { useContext } from "react";
import { ClassContext } from "../../contexts/ClassContext";
import "./ClassList.css";

const ClassList = () => {
	const { classList, attributes } = useContext(ClassContext);

	const canMeetRequirements = (className) => {
		const classRequirements = classList[className];
		return Object.entries(classRequirements).every(
			([attribute, requiredValue]) => {
				return attributes[attribute] >= requiredValue;
			}
		);
	};

	return (
		<div className="class-list">
			{Object.keys(classList).map((className) => {
				const meetsRequirements = canMeetRequirements(className);

				return (
					<button
						data-testid={`class-button-${className}`}
						key={className}
						className={
							meetsRequirements
								? "class-list__button class-list__button--available"
								: "class-list__button class-list__button--unavailable"
						}
					>
						{className}
					</button>
				);
			})}
		</div>
	);
};

export default ClassList;
