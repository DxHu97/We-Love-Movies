const knex = require("../db/connection");

function list(criticId) {
  return knex("critics as c").where({ "c.critic_id": criticId }).first();
}

function read(reviewId) {
  return knex("reviews").select("*").where("review_id", reviewId).first();
}

function update(updated) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updated.review_id })
    .update(updated, "*");
}

function destroy(reviewId) {
  return knex("reviews").where("review_id", reviewId).del();
}

module.exports = {
  list,
  read,
  update,
  destroy,
};
