const knex = require("../db/connection");

function list() {
  return knex("theaters").select("*");
}

function movieTheaterMatch(theater) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("m.*")
    .where({ "t.theater_id": theater.theater_id });
}

module.exports = {
  list,
  movieTheaterMatch,
};
