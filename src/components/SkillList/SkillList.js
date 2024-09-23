import { useContext } from "react";
import { ClassContext } from "../../contexts/ClassContext";
import { calculateModifier } from "../../helpers/helpers";

const SkillList = () => {
	const { attributes, skillList, skillPoints, updateSkillPoints } =
		useContext(ClassContext);

	const intelligenceModifier = calculateModifier(attributes.Intelligence);
	const maxSkillPoints = 10 + 4 * intelligenceModifier;

	const totalPointsSpent = Object.values(skillPoints).reduce(
		(acc, points) => acc + points,
		0
	);

	const incrementSkill = (skillName) => {
		if (totalPointsSpent < maxSkillPoints) {
			updateSkillPoints(skillName, 1);
		}
	};

	const decrementSkill = (skillName) => {
		if (skillPoints[skillName] > 0) {
			updateSkillPoints(skillName, -1);
		}
	};

	return (
		<div>
			<h3>Total skill points available: {maxSkillPoints - totalPointsSpent}</h3>
			<ul>
				{skillList.map(({ name, attributeModifier }) => {
					const modifierValue = calculateModifier(
						attributes[attributeModifier]
					);
					const totalValue = skillPoints[name] + modifierValue;

					return (
						<ul
							style={{
								padding: "10px",
								marginBottom: "10px",
								border: "1px solid black",
							}}
							key={name}
						>
							<div
								data-testid={`skill-points-${name}`}
								className="skill-points"
							>
								{name} level: {skillPoints[name] || 0}
							</div>
							<div>
								Modifier ({attributeModifier}): {modifierValue}
							</div>
							<div data-testid={`total-${name}`} className="skill-total">
								Total: {totalValue}
							</div>
							<button
								onClick={() => incrementSkill(name)}
								data-testid={`increment-${name}`}
							>
								+
							</button>
							<button
								onClick={() => decrementSkill(name)}
								data-testid={`decrement-${name}`}
							>
								-
							</button>
						</ul>
					);
				})}
			</ul>
		</div>
	);
};

export default SkillList;
