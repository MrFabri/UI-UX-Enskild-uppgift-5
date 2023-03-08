import fetch from "node-fetch";
const IMDB_API = "https://www.omdbapi.com/?apikey=81d6c4d0";

export async function movieRatings(apiAdapter, id) {
  const result = await apiAdapter.loadMovieRatings(id);
  const ratings = result.ratings;
  const imdbMovieId = result.imdbMovieId;

  if (ratings.length >= 5) {
    let sum = ratings.reduce((a, b) => {
      return a + b;
    });

    let tempResult = sum / ratings.length;
    let finalResult = Math.round(tempResult * 10) / 10;

    return {
      rating: finalResult,
      origin: "CMS API"
    };
  } else {
    const res = await fetch(`${IMDB_API}&i=${imdbMovieId}`);
    const payload = await res.json();
    const imdbResult = payload.imdbRating;
    const imdbFinalResult = imdbResult / 2;
    return {
      rating: imdbFinalResult,
      origin: "IMDB API"
    };
  }
}