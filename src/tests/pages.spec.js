import request from "supertest";
import app from "../app.js";
import { loadMovies } from "../helpers/movies.js";

test("That movies page shows list of all movies from API", async () => {
  const movies = await loadMovies();
  const response = await request(app)
    .get("/movies")
    .expect("Content-Type", "text/html; charset=utf-8")
    .expect(200);

  for (let i = 0; i < movies.length; i++) {
    expect(response.text.includes(`<img src="${movies[i].attributes.image.url}" />`)).toBeTruthy();

    expect(response.text.includes(`a href="/movies/${movies[i].id}"`)).toBeTruthy();

    expect(
      response.text.includes(`<img src="${movies[i] + movies[i].attributes.image.url}" />`)
    ).toBeFalsy();
  }
});

test("Is info page about certain movie returning correct title", async () => {
  const movies = await loadMovies();
  for (let i = 0; i < movies.length; i++) {
    const response = await request(app)
      .get("/movies/" + movies[i].id)
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200);

    expect(response.text.includes(`${movies[i].attributes.title}`)).toBeTruthy();
  }
});
