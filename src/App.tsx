import { useState } from "react";
import "./App.scss";

type SearchResult = {
	aliases?: string;
	count_of_issue_appearances: number;
	deck: string;
	description: string;
	gender: number;
	id: number;
	image: {
		icon_url: string;
		image_tags: string;
		medium_url: string;
		original_url: string;
		screen_large_url: string;
		screen_url: string;
		small_url: string;
		super_url: string;
		thumb_url: string;
		tiny_url: string;
	};
	name: string;
	origin: {
		api_detail_url: string;
		id: 1;
		name: string;
	};
	publisher: {
		api_detail_url: string;
		id: number;
		name: string;
	};
	real_name: string;
	resource_type: string;
	site_detail_url: string;
};

function App() {
	const [query, setQuery] = useState("wolverine");
	const [searchResult, setSearchResult] = useState<SearchResult[]>([]);

	const handleSearch = async () => {
		setSearchResult([]);
		const data = await fetch(`/api/${query}`);
		const result = await data.json();
		console.log(await result);
		setSearchResult(result.results as SearchResult[]);
	};

	return (
		<>
			<h1>🌠 shooting-star 🌠</h1>
			<p>a demo for students or React</p>
			<label>
				Search character:{" "}
				<input
					type="text"
					value={query}
					placeholder="Search..."
					onChange={(e) => setQuery(e.target.value)}
				/>
			</label>
			<button onClick={handleSearch}>Search</button>
			<div>
				{searchResult?.map((result) => {
					if (result.resource_type === "character")
						return <CharacterCard key={result.id} character={result} />;
				})}
			</div>
		</>
	);
}

const CharacterCard = ({ character }: { character: SearchResult }) => {
	return (
		<div className="CharacterCard">
			<h1>Name: {character.name}</h1>
			{character.real_name && <h2>Real name: {character.real_name}</h2>}
			{character.aliases && (
				<div>
					Aliases:
					<ul>
						{character.aliases.split("\n").map((a) => (
							<li key={a}>{a}</li>
						))}
					</ul>
				</div>
			)}
			{character.deck && <p>{character.deck}</p>}
			{character.image.small_url !==
				"https://comicvine.gamespot.com/a/uploads/scale_small/11122/111222211/6373148-blank.png" && (
				<img
					src={character.image.small_url}
					alt={character.image.image_tags}
				/>
			)}
		</div>
	);
};

export default App;
