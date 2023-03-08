import fetch from "node-fetch";
const API = "https://plankton-app-xhkom.ondigitalocean.app/api";

const apiAdapter = {
  loadScreeningsStartpage: async () => {
    const res = await fetch(API + "/screenings?populate=movie");
    const payload = await res.json();
    return payload;
  },
  getMovieScreenings: async (movieId, page) => {
    if(page === 'all') {
      const res = await fetch(`${API}/screenings?filters[movie]=${movieId}`);
      const payload = await res.json();
      return payload;
    } else {
      const res = await fetch(`${API}/screenings?pagination[page]=${page}&pagination[pageSize]=5&filters[movie]=${movieId}`);
      const payload = await res.json();
      return payload;
    }
  },
  loadMovieRatings: async (id) => {
    const res = await fetch(`${API}/reviews?filters[movie]=${id}&populate=movie`);
    const payload = await res.json();
    const imdbMovieId = payload.data[0].attributes.movie.data.attributes.imdbId;
    const ratings = payload.data.map((review) => review.attributes.rating);
    return {
      imdbMovieId,
      ratings
    };
  }
};

export default apiAdapter;
