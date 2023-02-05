import React from "react";
import { Spinner, Button } from "react-bootstrap";
import MoviesList from "./components/MoviesList";
import "./App.css";
import { useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  const getMoviesHandler = async () => {
    setIsLoading(true)
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
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={getMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies}/>}
        {isLoading && <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <span className="visually-hidden">Loading...</span>
      </Button>}
      </section>
    </React.Fragment>
  );
}

export default App;
