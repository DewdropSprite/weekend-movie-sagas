import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import './MovieList.css';
import Album from '../album/Album';



// Movie list renders a list of movies and each movie has a Title and Poster image. 
// When a movie poster image is clicked an event starts that routes to the  movie details page and 
// fetches the description for the movie that was clicked.


function MovieList() {
  let history = useHistory();
    //dispatch will allow the component to dispatch actions to the redux store
  let dispatch = useDispatch();
    //movies calls the movies variable in the redux store 
  let movies = useSelector(store => store.movies);


  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, [dispatch]);

    // called when a movie poster is clicked on the DOM. it brings the user to the Details page
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
