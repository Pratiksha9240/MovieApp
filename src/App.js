import React from "react";
import { Spinner, Button } from "react-bootstrap";
import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";
import { useState, useEffect, useCallback } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cancel,setCancel] = useState(false);
  const [showForm,setShowForm] = useState(false);

  const getMoviesHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("https://react-http-b29b9-default-rtdb.firebaseio.com/movies.json");

      if (!response.ok) {
        throw new Error("something went wrong Retrying...");
      }

      const data = await response.json();

      const loadedMovies = [];

      for(const key in data){
        loadedMovies.push({
          id: key,
          title: data[key].title,
          releaseDate: data[key].releaseDate,
          openingText: data[key].openingText
        })
      }

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
    
  },[]);


  async function addMovieHandler(movie) {
    const response = await fetch('https://react-http-b29b9-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  }


  useEffect(() => {
    if(error==null){
      getMoviesHandler();
    }
    
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
      {/* <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section> */}
      <section>
        {!showForm && <button onClick={() => {setShowForm(true)}}>Add Movie</button>}
        {showForm && <AddMovie onAddMovie={addMovieHandler}/>}
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
