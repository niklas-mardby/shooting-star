import "./App.scss";

function App() {
	const query = "wolverine";

	const handleSearch = async () => {
		const data = await fetch(`/api/${query}`);
		const result = await data.json();
		console.log(await result);
	};
	return (
		<>
			<h1>🌠 shooting-star 🌠</h1>
			<p>a demo for students or React</p>
			<label>
				Search: <input type="text" placeholder="Search..." />
			</label>
			<button onClick={handleSearch}>Search</button>
		</>
	);
}

export default App;
