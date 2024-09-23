import "./App.css";
import AttributeList from "./components/AttributeList/AttributeList.js";
import ClassList from "./components/ClassList/ClassList.js";
import { ClassProvider } from "./contexts/ClassContext.js";
import MinimumClassRequirements from "./components/MinimumClassRequirements/MinimumClassRequirements.js";
import SkillList from "./components/SkillList/SkillList.js";
import SaveButton from "./components/SaveButton/SaveButton.js";
import LoadButton from "./components/LoadButton/LoadButton.js";

function App() {
	return (
		<ClassProvider>
			<div className="character-builder">
				<header className="character-builder__header">
					<h1>Character Builder</h1>
				</header>
				<section className="character-builder__actions">
					<SaveButton />
					<LoadButton />
				</section>
				<main className="character-builder__content">
					<section className="character-builder-section">
						<h2>Attributes</h2>
						<AttributeList />
					</section>
					<section className="character-builder-section">
						<h2>Classes</h2>
						<ClassList />
						<MinimumClassRequirements />
					</section>
					<section className="character-builder-section">
						<h2>Skills</h2>
						<SkillList />
					</section>
				</main>
			</div>
		</ClassProvider>
	);
}

export default App;
