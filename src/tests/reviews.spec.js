import { describe, expect, test } from "@jest/globals";
import { loadMovieReviews } from "../helpers/reviews.js";

describe("loadMovieReviews()", () => {
  test("correct response format", async () => {
    const result = await loadMovieReviews(1);
    expect(Array.isArray(result.data)).toBeTruthy();
    expect(result.data[0].attributes.comment).not.toBeUndefined();
    expect(result.data[0].attributes.rating).not.toBeUndefined();
    expect(result.data[0].attributes.author).not.toBeUndefined();
  });

  test("return all reviews when page parameter is empty", async () => {
    const result = await loadMovieReviews(1);
    if(result.meta.pagination.total <= 25){
      expect(result.meta.pagination.pageCount).toEqual(1);
    } else {
      expect(result.meta.pagination.pageCount).toBeGreaterThan(1);
    } 
  });

  test("get less than 5 reviews", async () => {
    const result = await loadMovieReviews(1, 1);
    expect(result.data.length).toBeLessThan(6);
  });

  test("get pagination page 2", async () => {
    const result = await loadMovieReviews(1, 2);
    expect(result.meta.pagination.page).toEqual(2);
  });

  test("get 5 or less reviews on pagination page 1", async () => {
    const result = await loadMovieReviews(1, 1);
    if (result.meta.pagination.total >= 5) {
      expect(result.data.length).toEqual(5);
    } else {
      expect(result.data.length).toBeLessThan(5);
    }
  });

  test("get 5 or less reviews on pagination page 2", async () => {
    const result = await loadMovieReviews(1, 2);
    if (result.meta.pagination.total >= 10) {
      expect(result.data.length).toEqual(5);
    } else {
      expect(result.data.length).toBeLessThan(5);
    }
  });
});
