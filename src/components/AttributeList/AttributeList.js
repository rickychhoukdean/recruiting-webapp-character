import React, { useContext } from "react";
import { ClassContext } from "../../contexts/ClassContext.js";
import { calculateModifier } from "../../helpers/helpers.js";
import "./AttributeList.css";
const AttributeList = () => {
	const { attributes, updateAttribute } = useContext(ClassContext);
	const totalAttributes = Object.values(attributes).reduce(
		(acc, value) => acc + value,
		0
	);

	return (
		<div>
			<div className="attribute-total">
				<strong>Total Attributes: {totalAttributes}</strong>
			</div>
			{Object.entries(attributes).map(([attribute, value]) => {
				return (
					<div key={attribute} className="attribute-item">
						<span
							data-testid={`attribute-${attribute}`}
							className="attribute-item__details"
						>
							{attribute}: {value} (Modifier: {calculateModifier(value)})
						</span>
						<div className="attribute-item__controls">
							<button
								data-testid={`increment-${attribute}`}
								onClick={() => updateAttribute(attribute, 1)}
							>
								+
							</button>
							<button
								data-testid={`decrement-${attribute}`}
								onClick={() => updateAttribute(attribute, -1)}
							>
								-
							</button>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default AttributeList;
