import React from 'react';
import { Button } from 'react-bootstrap';

import classes from './Movie.module.css';

const Movie = (props) => {

  const deleteMovieHandler = (id) => {
    const response = fetch('https://react-http-b29b9-default-rtdb.firebaseio.com/movies.json', {
      method: 'DELETE',
    body: id})
    var d = document.getElementById(id);
    d.remove();
    
  }

  return (
    <li className={classes.movie} id={props.id}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <Button variant='danger' onClick={() => deleteMovieHandler(props.id)}>Delete</Button>
    </li>
  );
};

export default Movie;
