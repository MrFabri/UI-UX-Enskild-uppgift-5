import { describe, expect, test, jest } from "@jest/globals";
import { screeningsStartpage } from "../helpers/screenings.js";

function addDayToCurrentDate(days) {
  let currentDate = new Date();

  return new Date(currentDate.setDate(currentDate.getDate() + days)).toISOString().split("T")[0];
}
const currentDate = new Date().toISOString().split("T")[0];
const datesArr = [
  currentDate,
  addDayToCurrentDate(1),
  addDayToCurrentDate(2),
  addDayToCurrentDate(3),
  addDayToCurrentDate(4),
];

describe("screeningsStartpage()", () => {
  test("correct response format", async () => {
    const result = await screeningsStartpage(mockApiAdapter);
    expect(Array.isArray(result)).toBeTruthy();
    for (let i = 0; i < result.length; i++) {
      expect(result[i].start_time).toBeTruthy();
      expect(typeof result[i].id).toBe("number");
      expect(typeof result[i].movie.title).toBe("string");
    }
  });

  test("Function returns screenings from todays date +4 days ahead and maximum 10 screenings in total", async () => {
    const result = await screeningsStartpage(mockApiAdapter);
    expect(result.length).toBeGreaterThan(0);
    expect(result.length).toBeLessThanOrEqual(10);
    for (let i = 0; i < result.length; i++) {
      expect(datesArr.includes(result[i].start_time.split("T")[0]));
    }
  });
});

const mockApiAdapter = {
  loadScreeningsStartpage: async () => {
    return {
      data: [
        {
          id: 1,
          attributes: {
            start_time: `"${currentDate}"`,
            room: "Stora salongen",
            createdAt: "2023-01-31T04:27:02.786Z",
            updatedAt: "2023-01-31T04:27:02.786Z",
            movie: {
              data: {
                id: 3,
                attributes: {
                  title: "The Shawshank Redemption",
                  imdbId: "tt0111161",
                  intro:
                    "Over the course of several years, **two convicts form a friendship**, seeking consolation and, eventually, redemption through basic compassion.",
                  image: {
                    url: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
                  },
                  createdAt: "2023-01-23T07:17:34.923Z",
                  updatedAt: "2023-01-27T07:12:24.582Z",
                  publishedAt: "2023-01-23T07:17:39.384Z",
                },
              },
            },
          },
        },
        {
          id: 2,
          attributes: {
            start_time: `"${currentDate}"`,
            room: "Stora salongen",
            createdAt: "2023-01-31T04:27:03.776Z",
            updatedAt: "2023-01-31T04:27:03.776Z",
            movie: {
              data: {
                id: 4,
                attributes: {
                  title: "Min granne Totoro",
                  imdbId: "tt0096283",
                  intro:
                    "When two girls move to the country to be near their ailing mother, they have **adventures with the wondrous forest spirits** who live nearby.",
                  image: {
                    url: "https://m.media-amazon.com/images/M/MV5BYzJjMTYyMjQtZDI0My00ZjE2LTkyNGYtOTllNGQxNDMyZjE0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
                  },
                  createdAt: "2023-01-23T09:15:23.153Z",
                  updatedAt: "2023-01-27T07:12:08.242Z",
                  publishedAt: "2023-01-23T09:15:43.382Z",
                },
              },
            },
          },
        },
        {
          id: 3,
          attributes: {
            start_time: `"${currentDate}"`,
            room: "Stora salongen",
            createdAt: "2023-01-31T04:27:04.047Z",
            updatedAt: "2023-01-31T04:27:04.047Z",
            movie: {
              data: {
                id: 1,
                attributes: {
                  title: "Isle of dogs",
                  imdbId: "tt5104604",
                  intro:
                    "An outbreak of dog flu has spread through the city of **Megasaki, Japan**, and Mayor Kobayashi has demanded all dogs to be sent to Trash Island.",
                  image: {
                    url: "https://m.media-amazon.com/images/M/MV5BZDQwOWQ2NmUtZThjZi00MGM0LTkzNDctMzcyMjcyOGI1OGRkXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg",
                  },
                  createdAt: "2023-01-23T05:58:58.110Z",
                  updatedAt: "2023-01-27T07:11:53.523Z",
                  publishedAt: "2023-01-23T06:01:31.679Z",
                },
              },
            },
          },
        },
        {
          id: 4,
          attributes: {
            start_time: `"${addDayToCurrentDate(1)}"`,
            room: "Stora salongen",
            createdAt: "2023-01-31T04:27:04.291Z",
            updatedAt: "2023-01-31T04:27:04.291Z",
            movie: {
              data: {
                id: 4,
                attributes: {
                  title: "Min granne Totoro",
                  imdbId: "tt0096283",
                  intro:
                    "When two girls move to the country to be near their ailing mother, they have **adventures with the wondrous forest spirits** who live nearby.",
                  image: {
                    url: "https://m.media-amazon.com/images/M/MV5BYzJjMTYyMjQtZDI0My00ZjE2LTkyNGYtOTllNGQxNDMyZjE0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
                  },
                  createdAt: "2023-01-23T09:15:23.153Z",
                  updatedAt: "2023-01-27T07:12:08.242Z",
                  publishedAt: "2023-01-23T09:15:43.382Z",
                },
              },
            },
          },
        },
        {
          id: 5,
          attributes: {
            start_time: `"${addDayToCurrentDate(1)}"`,
            room: "Stora salongen",
            createdAt: "2023-01-31T04:27:04.532Z",
            updatedAt: "2023-01-31T04:27:04.532Z",
            movie: {
              data: {
                id: 3,
                attributes: {
                  title: "The Shawshank Redemption",
                  imdbId: "tt0111161",
                  intro:
                    "Over the course of several years, **two convicts form a friendship**, seeking consolation and, eventually, redemption through basic compassion.",
                  image: {
                    url: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
                  },
                  createdAt: "2023-01-23T07:17:34.923Z",
                  updatedAt: "2023-01-27T07:12:24.582Z",
                  publishedAt: "2023-01-23T07:17:39.384Z",
                },
              },
            },
          },
        },
        {
          id: 6,
          attributes: {
            start_time: `"${addDayToCurrentDate(1)}"`,
            room: "Stora salongen",
            createdAt: "2023-01-31T04:27:04.797Z",
            updatedAt: "2023-01-31T04:27:04.797Z",
            movie: {
              data: {
                id: 4,
                attributes: {
                  title: "Min granne Totoro",
                  imdbId: "tt0096283",
                  intro:
                    "When two girls move to the country to be near their ailing mother, they have **adventures with the wondrous forest spirits** who live nearby.",
                  image: {
                    url: "https://m.media-amazon.com/images/M/MV5BYzJjMTYyMjQtZDI0My00ZjE2LTkyNGYtOTllNGQxNDMyZjE0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
                  },
                  createdAt: "2023-01-23T09:15:23.153Z",
                  updatedAt: "2023-01-27T07:12:08.242Z",
                  publishedAt: "2023-01-23T09:15:43.382Z",
                },
              },
            },
          },
        },
        {
          id: 7,
          attributes: {
            start_time: `"${addDayToCurrentDate(2)}"`,
            room: "Stora salongen",
            createdAt: "2023-01-31T04:27:05.473Z",
            updatedAt: "2023-01-31T04:27:05.473Z",
            movie: {
              data: {
                id: 1,
                attributes: {
                  title: "Isle of dogs",
                  imdbId: "tt5104604",
                  intro:
                    "An outbreak of dog flu has spread through the city of **Megasaki, Japan**, and Mayor Kobayashi has demanded all dogs to be sent to Trash Island.",
                  image: {
                    url: "https://m.media-amazon.com/images/M/MV5BZDQwOWQ2NmUtZThjZi00MGM0LTkzNDctMzcyMjcyOGI1OGRkXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg",
                  },
                  createdAt: "2023-01-23T05:58:58.110Z",
                  updatedAt: "2023-01-27T07:11:53.523Z",
                  publishedAt: "2023-01-23T06:01:31.679Z",
                },
              },
            },
          },
        },
        {
          id: 8,
          attributes: {
            start_time: `"${addDayToCurrentDate(2)}"`,
            room: "Stora salongen",
            createdAt: "2023-01-31T04:27:05.702Z",
            updatedAt: "2023-01-31T04:27:05.702Z",
            movie: {
              data: {
                id: 2,
                attributes: {
                  title: "Encanto",
                  imdbId: "tt2953050",
                  intro:
                    "A Colombian teenage girl has to face the frustration of being **the only member of her family** without magical powers.\n\n",
                  image: {
                    url: "https://m.media-amazon.com/images/M/MV5BNjE5NzA4ZDctOTJkZi00NzM0LTkwOTYtMDI4MmNkMzIxODhkXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_.jpg",
                  },
                  createdAt: "2023-01-23T06:46:24.765Z",
                  updatedAt: "2023-01-27T07:11:39.088Z",
                  publishedAt: "2023-01-23T06:46:29.324Z",
                },
              },
            },
          },
        },
        {
          id: 9,
          attributes: {
            start_time: `"${addDayToCurrentDate(2)}"`,
            room: "Stora salongen",
            createdAt: "2023-01-31T04:27:06.146Z",
            updatedAt: "2023-01-31T04:27:06.146Z",
            movie: {
              data: {
                id: 3,
                attributes: {
                  title: "The Shawshank Redemption",
                  imdbId: "tt0111161",
                  intro:
                    "Over the course of several years, **two convicts form a friendship**, seeking consolation and, eventually, redemption through basic compassion.",
                  image: {
                    url: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
                  },
                  createdAt: "2023-01-23T07:17:34.923Z",
                  updatedAt: "2023-01-27T07:12:24.582Z",
                  publishedAt: "2023-01-23T07:17:39.384Z",
                },
              },
            },
          },
        },
        {
          id: 10,
          attributes: {
            start_time: `"${addDayToCurrentDate(3)}"`,
            room: "Stora salongen",
            createdAt: "2023-01-31T04:27:06.843Z",
            updatedAt: "2023-01-31T04:27:06.843Z",
            movie: {
              data: {
                id: 2,
                attributes: {
                  title: "Encanto",
                  imdbId: "tt2953050",
                  intro:
                    "A Colombian teenage girl has to face the frustration of being **the only member of her family** without magical powers.\n\n",
                  image: {
                    url: "https://m.media-amazon.com/images/M/MV5BNjE5NzA4ZDctOTJkZi00NzM0LTkwOTYtMDI4MmNkMzIxODhkXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_.jpg",
                  },
                  createdAt: "2023-01-23T06:46:24.765Z",
                  updatedAt: "2023-01-27T07:11:39.088Z",
                  publishedAt: "2023-01-23T06:46:29.324Z",
                },
              },
            },
          },
        },
        {
          id: 11,
          attributes: {
            start_time: `"${addDayToCurrentDate(3)}"`,
            room: "Stora salongen",
            createdAt: "2023-01-31T04:27:07.487Z",
            updatedAt: "2023-01-31T04:27:07.487Z",
            movie: {
              data: {
                id: 4,
                attributes: {
                  title: "Min granne Totoro",
                  imdbId: "tt0096283",
                  intro:
                    "When two girls move to the country to be near their ailing mother, they have **adventures with the wondrous forest spirits** who live nearby.",
                  image: {
                    url: "https://m.media-amazon.com/images/M/MV5BYzJjMTYyMjQtZDI0My00ZjE2LTkyNGYtOTllNGQxNDMyZjE0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
                  },
                  createdAt: "2023-01-23T09:15:23.153Z",
                  updatedAt: "2023-01-27T07:12:08.242Z",
                  publishedAt: "2023-01-23T09:15:43.382Z",
                },
              },
            },
          },
        },
        {
          id: 12,
          attributes: {
            start_time: `"${addDayToCurrentDate(3)}"`,
            room: "Stora salongen",
            createdAt: "2023-01-31T04:27:08.513Z",
            updatedAt: "2023-01-31T04:27:08.513Z",
            movie: {
              data: {
                id: 4,
                attributes: {
                  title: "Min granne Totoro",
                  imdbId: "tt0096283",
                  intro:
                    "When two girls move to the country to be near their ailing mother, they have **adventures with the wondrous forest spirits** who live nearby.",
                  image: {
                    url: "https://m.media-amazon.com/images/M/MV5BYzJjMTYyMjQtZDI0My00ZjE2LTkyNGYtOTllNGQxNDMyZjE0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
                  },
                  createdAt: "2023-01-23T09:15:23.153Z",
                  updatedAt: "2023-01-27T07:12:08.242Z",
                  publishedAt: "2023-01-23T09:15:43.382Z",
                },
              },
            },
          },
        },
        {
          id: 13,
          attributes: {
            start_time: `"${addDayToCurrentDate(4)}"`,
            room: "Stora salongen",
            createdAt: "2023-01-31T04:27:08.770Z",
            updatedAt: "2023-01-31T04:27:08.770Z",
            movie: {
              data: {
                id: 4,
                attributes: {
                  title: "Min granne Totoro",
                  imdbId: "tt0096283",
                  intro:
                    "When two girls move to the country to be near their ailing mother, they have **adventures with the wondrous forest spirits** who live nearby.",
                  image: {
                    url: "https://m.media-amazon.com/images/M/MV5BYzJjMTYyMjQtZDI0My00ZjE2LTkyNGYtOTllNGQxNDMyZjE0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
                  },
                  createdAt: "2023-01-23T09:15:23.153Z",
                  updatedAt: "2023-01-27T07:12:08.242Z",
                  publishedAt: "2023-01-23T09:15:43.382Z",
                },
              },
            },
          },
        },
        {
          id: 14,
          attributes: {
            start_time: `"${addDayToCurrentDate(4)}"`,
            room: "Stora salongen",
            createdAt: "2023-01-31T04:27:09.429Z",
            updatedAt: "2023-01-31T04:27:09.429Z",
            movie: {
              data: {
                id: 4,
                attributes: {
                  title: "Min granne Totoro",
                  imdbId: "tt0096283",
                  intro:
                    "When two girls move to the country to be near their ailing mother, they have **adventures with the wondrous forest spirits** who live nearby.",
                  image: {
                    url: "https://m.media-amazon.com/images/M/MV5BYzJjMTYyMjQtZDI0My00ZjE2LTkyNGYtOTllNGQxNDMyZjE0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
                  },
                  createdAt: "2023-01-23T09:15:23.153Z",
                  updatedAt: "2023-01-27T07:12:08.242Z",
                  publishedAt: "2023-01-23T09:15:43.382Z",
                },
              },
            },
          },
        },
        {
          id: 15,
          attributes: {
            start_time: `"${addDayToCurrentDate(4)}"`,
            room: "Stora salongen",
            createdAt: "2023-01-31T04:27:10.332Z",
            updatedAt: "2023-01-31T04:27:10.332Z",
            movie: {
              data: {
                id: 2,
                attributes: {
                  title: "Encanto",
                  imdbId: "tt2953050",
                  intro:
                    "A Colombian teenage girl has to face the frustration of being **the only member of her family** without magical powers.\n\n",
                  image: {
                    url: "https://m.media-amazon.com/images/M/MV5BNjE5NzA4ZDctOTJkZi00NzM0LTkwOTYtMDI4MmNkMzIxODhkXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_.jpg",
                  },
                  createdAt: "2023-01-23T06:46:24.765Z",
                  updatedAt: "2023-01-27T07:11:39.088Z",
                  publishedAt: "2023-01-23T06:46:29.324Z",
                },
              },
            },
          },
        },
        {
          id: 16,
          attributes: {
            start_time: `"${addDayToCurrentDate(4)}"`,
            room: "Stora salongen",
            createdAt: "2023-01-31T04:27:10.585Z",
            updatedAt: "2023-01-31T04:27:10.585Z",
            movie: {
              data: {
                id: 1,
                attributes: {
                  title: "Isle of dogs",
                  imdbId: "tt5104604",
                  intro:
                    "An outbreak of dog flu has spread through the city of **Megasaki, Japan**, and Mayor Kobayashi has demanded all dogs to be sent to Trash Island.",
                  image: {
                    url: "https://m.media-amazon.com/images/M/MV5BZDQwOWQ2NmUtZThjZi00MGM0LTkzNDctMzcyMjcyOGI1OGRkXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg",
                  },
                  createdAt: "2023-01-23T05:58:58.110Z",
                  updatedAt: "2023-01-27T07:11:53.523Z",
                  publishedAt: "2023-01-23T06:01:31.679Z",
                },
              },
            },
          },
        },
        {
          id: 17,
          attributes: {
            start_time: `"${addDayToCurrentDate(5)}"`,
            room: "Stora salongen",
            createdAt: "2023-01-31T04:27:11.016Z",
            updatedAt: "2023-01-31T04:27:11.016Z",
            movie: {
              data: {
                id: 2,
                attributes: {
                  title: "Encanto",
                  imdbId: "tt2953050",
                  intro:
                    "A Colombian teenage girl has to face the frustration of being **the only member of her family** without magical powers.\n\n",
                  image: {
                    url: "https://m.media-amazon.com/images/M/MV5BNjE5NzA4ZDctOTJkZi00NzM0LTkwOTYtMDI4MmNkMzIxODhkXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_.jpg",
                  },
                  createdAt: "2023-01-23T06:46:24.765Z",
                  updatedAt: "2023-01-27T07:11:39.088Z",
                  publishedAt: "2023-01-23T06:46:29.324Z",
                },
              },
            },
          },
        },
        {
          id: 18,
          attributes: {
            start_time: `"${addDayToCurrentDate(5)}"`,
            room: "Stora salongen",
            createdAt: "2023-01-31T04:27:11.253Z",
            updatedAt: "2023-01-31T04:27:11.253Z",
            movie: {
              data: {
                id: 2,
                attributes: {
                  title: "Encanto",
                  imdbId: "tt2953050",
                  intro:
                    "A Colombian teenage girl has to face the frustration of being **the only member of her family** without magical powers.\n\n",
                  image: {
                    url: "https://m.media-amazon.com/images/M/MV5BNjE5NzA4ZDctOTJkZi00NzM0LTkwOTYtMDI4MmNkMzIxODhkXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_.jpg",
                  },
                  createdAt: "2023-01-23T06:46:24.765Z",
                  updatedAt: "2023-01-27T07:11:39.088Z",
                  publishedAt: "2023-01-23T06:46:29.324Z",
                },
              },
            },
          },
        },
        {
          id: 19,
          attributes: {
            start_time: `"${addDayToCurrentDate(6)}"`,
            room: "Stora salongen",
            createdAt: "2023-01-31T04:27:11.468Z",
            updatedAt: "2023-01-31T04:27:11.468Z",
            movie: {
              data: {
                id: 3,
                attributes: {
                  title: "The Shawshank Redemption",
                  imdbId: "tt0111161",
                  intro:
                    "Over the course of several years, **two convicts form a friendship**, seeking consolation and, eventually, redemption through basic compassion.",
                  image: {
                    url: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
                  },
                  createdAt: "2023-01-23T07:17:34.923Z",
                  updatedAt: "2023-01-27T07:12:24.582Z",
                  publishedAt: "2023-01-23T07:17:39.384Z",
                },
              },
            },
          },
        },
        {
          id: 20,
          attributes: {
            start_time: `"${addDayToCurrentDate(6)}"`,
            room: "Stora salongen",
            createdAt: "2023-01-31T04:27:11.886Z",
            updatedAt: "2023-01-31T04:27:11.886Z",
            movie: {
              data: {
                id: 4,
                attributes: {
                  title: "Min granne Totoro",
                  imdbId: "tt0096283",
                  intro:
                    "When two girls move to the country to be near their ailing mother, they have **adventures with the wondrous forest spirits** who live nearby.",
                  image: {
                    url: "https://m.media-amazon.com/images/M/MV5BYzJjMTYyMjQtZDI0My00ZjE2LTkyNGYtOTllNGQxNDMyZjE0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
                  },
                  createdAt: "2023-01-23T09:15:23.153Z",
                  updatedAt: "2023-01-27T07:12:08.242Z",
                  publishedAt: "2023-01-23T09:15:43.382Z",
                },
              },
            },
          },
        },
        {
          id: 21,
          attributes: {
            start_time: `"${addDayToCurrentDate(7)}"`,
            room: "Stora salongen",
            createdAt: "2023-01-31T04:27:13.363Z",
            updatedAt: "2023-01-31T04:27:13.363Z",
            movie: {
              data: {
                id: 1,
                attributes: {
                  title: "Isle of dogs",
                  imdbId: "tt5104604",
                  intro:
                    "An outbreak of dog flu has spread through the city of **Megasaki, Japan**, and Mayor Kobayashi has demanded all dogs to be sent to Trash Island.",
                  image: {
                    url: "https://m.media-amazon.com/images/M/MV5BZDQwOWQ2NmUtZThjZi00MGM0LTkzNDctMzcyMjcyOGI1OGRkXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg",
                  },
                  createdAt: "2023-01-23T05:58:58.110Z",
                  updatedAt: "2023-01-27T07:11:53.523Z",
                  publishedAt: "2023-01-23T06:01:31.679Z",
                },
              },
            },
          },
        },
        {
          id: 22,
          attributes: {
            start_time: `"${addDayToCurrentDate(7)}"`,
            room: "Stora salongen",
            createdAt: "2023-01-31T04:27:14.053Z",
            updatedAt: "2023-01-31T04:27:14.053Z",
            movie: {
              data: {
                id: 3,
                attributes: {
                  title: "The Shawshank Redemption",
                  imdbId: "tt0111161",
                  intro:
                    "Over the course of several years, **two convicts form a friendship**, seeking consolation and, eventually, redemption through basic compassion.",
                  image: {
                    url: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
                  },
                  createdAt: "2023-01-23T07:17:34.923Z",
                  updatedAt: "2023-01-27T07:12:24.582Z",
                  publishedAt: "2023-01-23T07:17:39.384Z",
                },
              },
            },
          },
        },
        {
          id: 23,
          attributes: {
            start_time: `"${addDayToCurrentDate(8)}"`,
            room: "Stora salongen",
            createdAt: "2023-01-31T04:27:14.475Z",
            updatedAt: "2023-01-31T04:27:14.475Z",
            movie: {
              data: {
                id: 3,
                attributes: {
                  title: "The Shawshank Redemption",
                  imdbId: "tt0111161",
                  intro:
                    "Over the course of several years, **two convicts form a friendship**, seeking consolation and, eventually, redemption through basic compassion.",
                  image: {
                    url: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
                  },
                  createdAt: "2023-01-23T07:17:34.923Z",
                  updatedAt: "2023-01-27T07:12:24.582Z",
                  publishedAt: "2023-01-23T07:17:39.384Z",
                },
              },
            },
          },
        },
        {
          id: 24,
          attributes: {
            start_time: `"${addDayToCurrentDate(8)}"`,
            room: "Stora salongen",
            createdAt: "2023-01-31T04:27:14.727Z",
            updatedAt: "2023-01-31T04:27:14.727Z",
            movie: {
              data: {
                id: 1,
                attributes: {
                  title: "Isle of dogs",
                  imdbId: "tt5104604",
                  intro:
                    "An outbreak of dog flu has spread through the city of **Megasaki, Japan**, and Mayor Kobayashi has demanded all dogs to be sent to Trash Island.",
                  image: {
                    url: "https://m.media-amazon.com/images/M/MV5BZDQwOWQ2NmUtZThjZi00MGM0LTkzNDctMzcyMjcyOGI1OGRkXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg",
                  },
                  createdAt: "2023-01-23T05:58:58.110Z",
                  updatedAt: "2023-01-27T07:11:53.523Z",
                  publishedAt: "2023-01-23T06:01:31.679Z",
                },
              },
            },
          },
        },
        {
          id: 25,
          attributes: {
            start_time: `"${currentDate}"`,
            room: "Stora salongen",
            createdAt: "2023-01-31T04:27:14.976Z",
            updatedAt: "2023-01-31T04:27:14.976Z",
            movie: {
              data: {
                id: 2,
                attributes: {
                  title: "Encanto",
                  imdbId: "tt2953050",
                  intro:
                    "A Colombian teenage girl has to face the frustration of being **the only member of her family** without magical powers.\n\n",
                  image: {
                    url: "https://m.media-amazon.com/images/M/MV5BNjE5NzA4ZDctOTJkZi00NzM0LTkwOTYtMDI4MmNkMzIxODhkXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._V1_.jpg",
                  },
                  createdAt: "2023-01-23T06:46:24.765Z",
                  updatedAt: "2023-01-27T07:11:39.088Z",
                  publishedAt: "2023-01-23T06:46:29.324Z",
                },
              },
            },
          },
        },
      ],
      meta: {
        pagination: {
          page: 1,
          pageSize: 25,
          pageCount: 2,
          total: 36,
        },
      },
    };
  },
};
