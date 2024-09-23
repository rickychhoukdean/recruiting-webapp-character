import { ClassContext } from "../contexts/ClassContext";

export const calculateModifier = (attributeValue) =>
	Math.floor((attributeValue - 10) / 2);

export const MockClassProvider = ({ children, mockContext }) => (
	<ClassContext.Provider value={mockContext}>{children}</ClassContext.Provider>
);
