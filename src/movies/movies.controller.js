const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const services = require("./movies.services");

async function list(req, res) {
  const { is_showing } = req.query;
  let data;

  if (is_showing) {
    data = await services.moviesShowingInTheater();
  } else {
    data = await services.list();
  }

  res.json({ data });
}

async function read(req, res) {
  const { movie } = res.locals;
  res.json({ data: movie });
}

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const validMovie = await services.read(movieId);

  if (validMovie) {
    res.locals.movie = validMovie;
    return next();
  } else {
    next({
      status: 404,
      message: "Movie cannot be found",
    });
  }
}

async function movieReviews(req, res) {
  const { movie } = res.locals;
  const data = await services.movieReviews(movie.movie_id);
  res.json({ data });
}

async function theatersWhereMovieIsPlaying(req, res) {
  const { movie } = res.locals;
  const data = await services.theatersWhereMovieIsPlaying(movie.movie_id);
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  movieReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(movieReviews),
  ],
  theatersWhereMovieIsPlaying: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(theatersWhereMovieIsPlaying),
  ],
};
