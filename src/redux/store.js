import { createStore, combineReducers, applyMiddleware } from 'redux';
    // logger is a middleware used to log Redux actions and state changes in the console
import logger from 'redux-logger';
    // createSagaMiddleware is used to handle asynchronous operations in a generator function
import createSagaMiddleware from 'redux-saga';
    // takeEvery & put also helps in the handling of asynchronous operations in a generator function
import { takeEvery, put } from 'redux-saga/effects';
    // axios is a library used to make HTTP requests
import axios from 'axios';


// !The store file sets ups REDUX store with Sagas middleware to manage the state of movies, genres, and details


//! ------------------- SAGAS ----------------------------
    // Create the rootSaga generator function
    // rootSaga  coordinates sagas in the application. It listens for the actions that trigger saga functions
function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
  yield takeEvery('FETCH_DETAILS', fetchMovieDetails)
}

    // 'FETCH_MOVIES' triggers fetchAllMovies function which makes a get request to fetch the movies from the server and then dispatches an action ('SET_MOVIES') to updat the movies reducer with the fetched data
function* fetchAllMovies() {
  try {
    // Get the movies:
    const moviesResponse = yield axios.get('/api/movies');
    // Set the value of the movies reducer:
    yield put({
      type: 'SET_MOVIES',
      payload: moviesResponse.data
    });
  } catch (error) {
    console.log('fetchAllMovies error:', error);
  }
}

    // 'FETCH_DETAILS' triggers fetchMovieDetails function. it is dispatched with the movieId payload. It makes a GET request to get the details of a specific movie and then dispatches action 'SET_DETAILS' which updates the details reducer with the fetched data.
function* fetchMovieDetails(action) {
  try {
    console.log("action.payload", action.payload)
    const movieDetails = yield axios.get(`/api/movies/${action.payload}`);
    yield put({
      type: 'SET_DETAILS',
      payload: movieDetails.data
    })
  } catch (error) {
    console.log("fetch details error", error)
  }
}



    // Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

//! --------------------REDUCERS--------------------------
    // Used to store movies returned from the server
    // it listens for 'SET_MOVIES' action and updates state with payload containing movie data
const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      console.log("inside movies reducer")
      return action.payload
    default:
      return state;
  }
}

    // Used to store the movie genres
    // it listens for 'SET_GENRES' and updates state with paload containing genre data
const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
}

    // Used to store movie details
    // it listens for 'SET_DETAILS' action and updates state with payload containing details data
const details = (state = {}, action) => {
  switch (action.type) {
    case 'SET_DETAILS':
      return action.payload;
    default:
      return state;
  }
}


    // Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    details

  }),
      // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger),
);

    // Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

export default storeInstance;
