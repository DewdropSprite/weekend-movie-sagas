import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import './MovieList.css';



function MovieList() {
  let history = useHistory();

  let dispatch = useDispatch();
  let movies = useSelector(store => store.movies);

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, [dispatch]);

const handleClick = (movieId) => {
  history.push('/details');
  dispatch({ type: 'FETCH_DETAILS', payload: movieId})
}
  

  return (
    <main>
      <h1>MovieList</h1>
      <section className="movies">
        {movies.map(movie => {
          return (
            <div data-testid='movieItem' key={movie.id}>
              <h3>{movie.title} </h3>
              <img data-testid="toDetails" 
              onClick={() => handleClick(movie.id)}
              src={movie.poster} 
              alt={movie.title}
              />
            </div>
          );

        })}
      </section>

    </main>
  );
}

export default MovieList;
