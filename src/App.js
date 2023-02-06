import React from "react";
import { Spinner, Button } from "react-bootstrap";
import MoviesList from "./components/MoviesList";
import "./App.css";
import { useState, useEffect, useCallback } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cancel,setCancel] = useState(false);

  const getMoviesHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("https://swapi.dev/api/films/");

      if (!response.ok) {
        throw new Error("something went wrong Retrying...");
      }

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
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  },[]);

  useEffect(() => {
    if(!cancel && error!=null){
      let intervalId = setInterval(() => {
        getMoviesHandler();
      },5000);
  
      return () => {
        clearInterval(intervalId);
      }
    }
    
  },[getMoviesHandler,cancel,error])

  const cancelRequestHandler = () => {
    setCancel(true);
    
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={getMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} />}
        {isLoading && (
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="visually-hidden">Loading...</span>
          </Button>
        )}
        {!isLoading && error && !cancel &&<><p>{error}</p><Button onClick={cancelRequestHandler}>Cancel</Button></>}
        {!isLoading && error && cancel && <p>Request Cancelled</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
