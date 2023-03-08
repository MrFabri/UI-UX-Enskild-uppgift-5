import { describe, expect, test } from "@jest/globals";
import { getAllScreenings, getMovieScreenings } from "../helpers/screenings.js";
import { getMovieScreenings_all, getMovieScreenings_page3 } from './screenings.mock.js'

describe('SCREENINGS', () => {
    test('GET ALL SCREENINGS THAT EXISTS', async () => {
        const result = await getAllScreenings();
        expect(Array.isArray(result)).toBeTruthy();
        expect(result.length).toBeGreaterThan(0);
    });
});

describe('GET MOVIE SCREENINGS', () => {
    test('GET ALL THE SCREENINGS FOR A MOVIE', async () => {
        const result = await getMovieScreenings(apiAdapterMock, 2);
        expect(Array.isArray(result.data)).toBeTruthy();
        expect(result.data.length).toBeGreaterThan(0);
        expect(result.meta.pagination.page).toEqual(1)
    });
    test('GET THE SCREENINGS FOR A MOVIE WITH PAGINATION', async () => {
        const page = 3;
        const movieId = 2;
        const result = await getMovieScreenings(apiAdapterMock, movieId, page);
        const mockDate = getMovieScreenings_page3.data[0].attributes.start_time;
        const date = mockDate.split("T")[0]
        const time = mockDate.split("T")[1].substring(0, mockDate.split("T")[1].length - 8)

        expect(result.data.length).toBeGreaterThan(0);
        expect(result.data[0].attributes.start_time.date).toEqual(date);
        expect(result.data[0].attributes.start_time.time).toEqual(time);
        expect(result.meta.pagination.page).toBe(page);
    });
});

const apiAdapterMock = {
    getMovieScreenings: async (movieId, page) => {
        if(page === 'all') {
            return getMovieScreenings_all
        } else {
            return getMovieScreenings_page3
        }
    }
}