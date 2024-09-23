import React, { useContext } from "react";
import { ClassContext } from "../../contexts/ClassContext.js";

const AttributeList = () => {
	const { attributes, updateAttribute } = useContext(ClassContext);
	return (
		<ul>
			{Object.entries(attributes).map(([attribute, value]) => {
				return (
					<ul key={attribute}>
						{attribute}: {value}
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
					</ul>
				);
			})}
		</ul>
	);
};

export default AttributeList;
