import React, { useContext } from "react";
import { ClassContext } from "../../contexts/ClassContext";
import { saveCharacter } from "../../api/api";

const SaveButton = () => {
	const { attributes, skillPoints } = useContext(ClassContext);

	const handleSaveCharacter = async () => {
		const characterData = {
			attributes,
			skillPoints,
		};

		try {
			await saveCharacter(characterData);
			alert("Character saved successfully!");
		} catch (error) {
			alert("Error saving character.");
		}
	};

	return (
		<div>
			<button onClick={handleSaveCharacter}>Save Character</button>
		</div>
	);
};

export default SaveButton;
