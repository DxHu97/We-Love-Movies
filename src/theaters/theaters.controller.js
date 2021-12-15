const { theatersWhereMovieIsPlaying } = require("../movies/movies.services");
const services = require("./theaters.services");

async function list(req, res) {
  let { movieId } = req.params;

  if (movieId !== undefined) {
    res.json({ data: await theatersWhereMovieIsPlaying(movieId) });
  } else {
    const theaters = await services.list();

    const movieTheater = theaters.map(async (theater) => {
      return { ...theater, movies: await services.movieTheaterMatch(theater) };
    });
    const result = await Promise.all(movieTheater);

    res.json({ data: result });
  }
}

module.exports = { list };
