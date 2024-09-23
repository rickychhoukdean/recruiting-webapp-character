import "./App.css";
import AttributeList from "./components/AttributeList/AttributeList.js";
import ClassList from "./components/ClassList/ClassList.js";
import { ClassProvider } from "./contexts/ClassContext.js";

function App() {
	return (
		<ClassProvider>
			<div className="App">
				<header className="App-header">
					<h1>Character Builder</h1>
				</header>
				<main>
					<section>
						<h2>Character Attributes</h2>
						<AttributeList />
					</section>
					<section>
						<h2>Class List</h2>
						<ClassList />
					</section>
				</main>
			</div>
		</ClassProvider>
	);
}

export default App;
