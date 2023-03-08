import { describe, expect, test } from "@jest/globals";
import { movieRatings } from "../helpers/ratings.js";
import { manyRatings, threeRatings } from "../tests/ratings.mock.js";

describe('RATING', () => {
    test('CHECK IF RATING COMES FROM THE CMS API', async () => {
        const movieId = 1
        const result = await movieRatings({
            loadMovieRatings: async(id) => {
                const imdbMovieId = manyRatings.data[0].attributes.movie.data.attributes.imdbId;
                const ratings = manyRatings.data.map((review) => review.attributes.rating);
                return {
                  imdbMovieId,
                  ratings
                };
            }
        }, movieId);
        expect(result.rating).toBeGreaterThan(0);
        expect(result.origin).toBe("CMS API");
    } )
});

describe('IMDB?', () => {
    test('IF TEST SUCCEDS THEN RATING IS FROM IMDB', async () => {
        const movieId = 1
        const result = await movieRatings(apiAdapterMock, movieId);
        expect(result.origin).toBe("IMDB API");
    })
});

const apiAdapterMock = {
    loadMovieRatings: async (id) => {
        const imdbMovieId = threeRatings.data[0].attributes.movie.data.attributes.imdbId;
        const ratings = threeRatings.data.map((review) => review.attributes.rating);
        return {
          imdbMovieId,
          ratings
        };
    }
}