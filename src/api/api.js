const BASE_URL = "https://recruiting.verylongdomaintotestwith.ca/api";
const GITHUB_USERNAME = "rickychhoukdean";
const defaultHeaders = {
	"Content-Type": "application/json",
};
const apiUrl = `${BASE_URL}/{${GITHUB_USERNAME}}/character`

export const saveCharacter = async (characterData) => {
	try {
		const response = await fetch(apiUrl, {
			method: "POST",
			headers: defaultHeaders,
			body: JSON.stringify(characterData),
		});

		if (!response.ok) {
			throw new Error("Failed to save character");
		}

		const data = await response.json();
		return data;
	} catch (error) {
		throw error;
	}
};

export const loadCharacter = async () => {
	try {
		const response = await fetch(apiUrl, {
			method: "GET",
			headers: defaultHeaders,
		});

		if (!response.ok) {
			throw new Error("Failed to load character");
		}

		const data = await response.json();
		return data.body;
	} catch (error) {
		throw error;
	}
};
