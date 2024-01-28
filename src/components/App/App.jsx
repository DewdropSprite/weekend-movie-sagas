import { Route, HashRouter as Router } from 'react-router-dom';
import MovieList from '../MovieList/MovieList';
import './App.css';
import MovieDetails from '../MovieDetails/MovieDetails';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        
      {/* Details page */}
        <Route path="/details">
          <MovieDetails />
        </Route>
        


        {/* Add Movie page */}
        
      </Router>
    </div>
  );
}

export default App;
