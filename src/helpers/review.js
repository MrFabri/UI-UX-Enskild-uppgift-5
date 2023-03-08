
import fetch from "node-fetch";

const API = "https://plankton-app-xhkom.ondigitalocean.app/api/reviews";

export async function sendReview(movieId, data) {

  const body = {
    "data": {
      comment: data.comment,
      rating: data.rating,
      author: data.author,
      verified: false,
      movie: movieId,
      createdAt: new Date().toISOString(),
    }
  }

  const res = await fetch(API,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  return res.json();
};