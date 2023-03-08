import apiAdapter from "../helpers/apiAdapter.js";
import { loadMovies, loadMovie } from "../helpers/movies.js";
import { loadAllReviews, loadMovieReviews } from "../helpers/reviews.js";
import { getAllScreenings, getMovieScreenings, screeningsStartpage } from "../helpers/screenings.js";
import { sendReview } from "../helpers/review.js";
import { movieRatings } from "../helpers/ratings.js";

const apiCtrl = {};

apiCtrl.movies = async (req, res) => {
  res.json(await loadMovies());
};

apiCtrl.movie = async (req, res) => {
  res.json(await loadMovie(req.params.id));
};

apiCtrl.startpageScreenings = async (req, res) => {
  res.json(await screeningsStartpage(apiAdapter));
};

apiCtrl.movieScreenings = async (req, res) => {
  if (!req.query.page) {
    res.json(await getMovieScreenings(apiAdapter, req.params.id));
  } else {
    res.json(await getMovieScreenings(apiAdapter, req.params.id, req.query.page));
  }
};

apiCtrl.getAllScreenings = async (req, res) => {
  res.json(await getAllScreenings());
};

apiCtrl.movieReviews = async (req, res) => {
  res.json(await loadMovieReviews(req.params.id, req.query.page));
};

apiCtrl.reviews = async (req, res) => {
  res.json(await loadAllReviews());
};

apiCtrl.review = async (req, res) => { 
  res.json(await sendReview(req.params.id, req.body));
};

apiCtrl.movieRating = async (req, res) => {
  res.json(await movieRatings(apiAdapter, req.params.id));
};

export default apiCtrl;
