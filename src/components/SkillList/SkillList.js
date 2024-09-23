import { useContext } from "react";
import { ClassContext } from "../../contexts/ClassContext";
import { calculateModifier } from "../../helpers/helpers";
import "./SkillList.css";
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
			<div className="skill-total">
				<strong>
					Total skill points available: {maxSkillPoints - totalPointsSpent}
				</strong>
			</div>
			<div>
				{skillList.map(({ name, attributeModifier }) => {
					const modifierValue = calculateModifier(
						attributes[attributeModifier]
					);
					const totalValue = skillPoints[name] + modifierValue;

					return (
						<div className="skill-item" key={name}>
							<div className="skill-item__info">
								<span
									data-testid={`skill-points-${name}`}
									className="skill-points"
								>
									<strong>{name}</strong> level {skillPoints[name] || 0} |{" "}
								</span>
								<span>
									Modifier <em>({attributeModifier}): </em>
									{modifierValue} |{" "}
								</span>
								<span data-testid={`total-${name}`} className="skill-total">
									<strong>Total: {totalValue} </strong>
								</span>
							</div>
							<div className="skill-item__controls">
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
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SkillList;
