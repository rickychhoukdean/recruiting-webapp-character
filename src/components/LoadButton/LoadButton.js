import React, { useContext } from "react";
import { ClassContext } from "../../contexts/ClassContext";
import { loadCharacter } from "../../api/api";

const LoadButton = () => {
	const { setAttributes, setSkillPoints } = useContext(ClassContext);

	const handleLoadCharacter = async () => {
		try {
			const characterData = await loadCharacter();
			setAttributes(characterData.attributes || {});
			setSkillPoints(characterData.skillPoints || {});
			alert("Character loaded successfully!");
		} catch (error) {
			alert("Error loading character.");
		}
	};

	return (
		<div>
			<button onClick={handleLoadCharacter}>Load Character</button>
		</div>
	);
};

export default LoadButton;
