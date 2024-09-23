import React, { useContext, useState } from "react";
import { ClassContext } from "../../contexts/ClassContext";
import { loadCharacter } from "../../api/api";

const LoadButton = () => {
	const { setAttributes, setSkillPoints } = useContext(ClassContext);
	const [statusMessage, setStatusMessage] = useState("");

	const handleLoadCharacter = async () => {
		try {
			const characterData = await loadCharacter();
			setAttributes(characterData.attributes || {});
			setSkillPoints(characterData.skillPoints || {});
			setStatusMessage("Character loaded successfully!");
		} catch (error) {
			setStatusMessage("Error loading character.");
		}
	};

	return (
		<div>
			<button onClick={handleLoadCharacter}>Load Character</button>
			<div>{statusMessage}</div>
		</div>
	);
};

export default LoadButton;
