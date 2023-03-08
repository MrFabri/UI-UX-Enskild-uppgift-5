import fetch from "node-fetch";

const API = "https://plankton-app-xhkom.ondigitalocean.app/api/screenings";

export async function getAllScreenings() {
  const res = await fetch(API);
  const payload = await res.json();
  return payload.data;
}

export async function getMovieScreenings(apiAdapter, movieId, page = 'all') {
  const payload = await apiAdapter.getMovieScreenings(movieId, page);
  const meta = payload.meta;
  const data = payload.data.map(screening => ({
    id: screening.id,
    attributes:  {
      ...screening.attributes,
      start_time: {
        date: screening.attributes.start_time.split("T")[0],
        time: screening.attributes.start_time.split("T")[1].substring(0, screening.attributes.start_time.split("T")[1].length - 8)
      },
    }
  }));

  return { data, meta }
}

export async function screeningsStartpage(apiAdapter) {
  const payload = await apiAdapter.loadScreeningsStartpage();
  const result = payload.data
    .map((item) => ({
      id: item.id,
      ...item.attributes,
      movie: {
        id: item.attributes.movie.data.id,
        ...item.attributes.movie.data.attributes,
      },
    }))
    .filter((screenings) => {
      const getDatesBetweenDates = (startDate, endDate) => {
        let dates = [];

        const theDate = new Date(startDate);
        while (theDate < new Date(endDate)) {
          dates = [...dates, new Date(theDate).toISOString().split("T")[0]];
          theDate.setDate(theDate.getDate() + 1);
        }
        dates = [...dates, new Date(endDate).toISOString().split("T")[0]];
        return dates;
      };
      const start = new Date().toISOString().split("T")[0];
      const end = new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];

      for (let i = 0; i < getDatesBetweenDates(start, end).length; i++) {
        if (screenings.start_time.includes(getDatesBetweenDates(start, end)[i])) {
          return true;
        }
      }
    });

  return result.slice(0, 10);
}
