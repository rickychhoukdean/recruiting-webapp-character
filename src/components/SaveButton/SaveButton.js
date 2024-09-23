import React, { useContext, useState } from "react";
import { ClassContext } from "../../contexts/ClassContext";
import { saveCharacter } from "../../api/api";

const SaveButton = () => {
	const { attributes, skillPoints } = useContext(ClassContext);
	const [statusMessage, setStatusMessage] = useState("");

	const handleSaveCharacter = async () => {
		const characterData = {
			attributes,
			skillPoints,
		};

		try {
			await saveCharacter(characterData);
			setStatusMessage("Character saved successfully!");
		} catch (error) {
			setStatusMessage("Error saving character.");
		}
	};

	return (
		<div>
			<button onClick={handleSaveCharacter}>Save Character</button>
			<div>{statusMessage}</div>
		</div>
	);
};

export default SaveButton;
