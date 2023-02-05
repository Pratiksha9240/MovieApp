import React from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import { useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);

  const getMoviesHandler = async () => {
    const response = await fetch("https://swapi.dev/api/films/");
    const data = await response.json();

    const transformedMovies = data.results.map((m) => {
      return {
        id: m.episode_id,
        title: m.title,
        releaseDate: m.release_date,
        openingText: m.opening_crawl,
      };
    });
    setMovies(transformedMovies);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={getMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
