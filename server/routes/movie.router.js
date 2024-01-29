const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')




router.get('/', (req, res) => {
  const query = `
    SELECT * FROM "movies"
      ORDER BY "title" ASC;
  `;
  pool.query(query)
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});
// router to fetch movie details from the "movies" table in postico then 
//fetches genres from the "genre" table and sends both queries in a combined response to the client

router.get('/:id', (req, res) => {
  console.log("req.params.id", req.params.id)
     //empty object to store details about the movie clicked
  let movieDetails = {}
  console.log("movie details - should be empty", movieDetails)
     //SQL query to select all colums associated with the id (row)
  let queryText =
    `SELECT * FROM "movies"
  WHERE "id" = $1;`;

      //array that contains the movie id called in the url path
  let queryParams = [req.params.id];

  pool.query(queryText, queryParams)
        //promise chain that handles the successful execution of SQL query
    .then(result => {
        //This adds movie details to the object. The movieDetails object is updated by merging its current contents with the first row of the query result.
      movieDetails = { ...movieDetails, ...result.rows[0] }
      console.log("Movie Details after - should not be empty", movieDetails)

        //This SQL query updates the previous queryText to selec the genre associated with the movieID
      queryText = `
    SELECT genres.name FROM "movies"
    JOIN "movies_genres" ON movies_genres.movie_id = movies.id
    JOIN "genres" ON movies_genres.genre_id = genres.id
    WHERE movies.id = $1;
    `
        //execution of new query with updated queryText
      pool.query(queryText, queryParams)
        // start of another promise chain
        .then(result => {
            //updates movieDetails object to include genres
          movieDetails = { ...movieDetails, genres: result.rows }
          console.log("movie details", movieDetails)
            //sends movieDetails object to the client
          res.send(movieDetails)
        }).catch(error => {
          console.log("error", error)
        })
    })
    .catch(error => {
      console.log("error getting details", error)
    })
})

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
    INSERT INTO "movies" 
      ("title", "poster", "description")
      VALUES
      ($1, $2, $3)
      RETURNING "id";
  `;
  const insertMovieValues = [
    req.body.title,
    req.body.poster,
    req.body.description
  ]
  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, insertMovieValues)
    .then(result => {
      // ID IS HERE!
      console.log('New Movie Id:', result.rows[0].id);
      const createdMovieId = result.rows[0].id

      // Now handle the genre reference:
      const insertMovieGenreQuery = `
        INSERT INTO "movies_genres" 
          ("movie_id", "genre_id")
          VALUES
          ($1, $2);
      `;
      const insertMovieGenreValues = [
        createdMovieId,
        req.body.genre_id
      ]
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, insertMovieGenreValues)
        .then(result => {
          //Now that both are done, send back success!
          res.sendStatus(201);
        }).catch(err => {
          // catch for second query
          console.log(err);
          res.sendStatus(500)
        })
    }).catch(err => { // 👈 Catch for first query
      console.log(err);
      res.sendStatus(500)
    })
})

module.exports = router;
