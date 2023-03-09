import { Router } from "express";
import { loadMovies, loadMovie } from "../helpers/movies.js";
import { marked } from "marked";
import menu from "../../menu.js";

const router = Router();
const headerMenu = menu;
const title = 'Biograf Luleå';
const description = 'Luelå är en biograf med egen bistro och bar på Stortorget i centrala Malmö. Det är den gamla biografen Alcazar, byggd 1934 och senare omdöpt till Camera, som sedan 1998 heter Spegeln. I november 2014 öppnade Spegeln en bar och bistro och blev i och med det Malmös första biobar. ';

function menuWithActive(items, path) {
  return items.map((item) => ({
    active: item.link == path,
    ...item,
  }));
}

// Pages
router.get("/", async (req, res) => {
  res.render("index", {
    headerMenu: menuWithActive(headerMenu, "/"),
    meta: {
      name: title,
      description: description
    }
  });
});

router.get("/login", (req, res) => {
  res.render("login", {
    headerMenu: menuWithActive(headerMenu, "/login"),
    meta: {
      name: title,
      description: description
    }
  });
});

router.get("/signup", (req, res) => {
  res.render("signup", {
    headerMenu: headerMenu,
    meta: {
      name: title,
      description: description
    }
  });
});

router.get("/about", (req, res) => {
  res.render("about-us", {
    headerMenu: headerMenu,
    meta: {
      name: title,
      description: description
    }
  });
});

router.get("/events", (req, res) => {
  res.render("events", {
    headerMenu: headerMenu,
    meta: {
      name: title,
      description: description
    }
  });
});

router.get("/restaurant", async (req, res) => {
  const movies = await loadMovies();
  res.render("restaurant", {
    headerMenu: headerMenu,
    movieImage0: movies[0].attributes.image.url,
    movieTitle0: movies[0].attributes.title,
    movieImage1: movies[1].attributes.image.url,
    movieTitle1: movies[1].attributes.title,
    movieImage2: movies[2].attributes.image.url,
    movieTitle2: movies[2].attributes.title,
    movieImage3: movies[3].attributes.image.url,
    movieTitle3: movies[3].attributes.title,
    meta: {
      name: title,
      description: description
    }
  });
});

router.get("/salons", (req, res) => {
  res.render("salons", {
    headerMenu: headerMenu,
    path: req.url,
    meta: {
      name: title,
      description: description
    }
  });
});

router.get("/salon/a", (req, res) => {
  res.render("salons", {
    headerMenu: headerMenu,
    path: req.url,
    meta: {
      name: title,
      description: description
    }
  });
});

router.get("/salon/b", (req, res) => {
  res.render("salons", {
    headerMenu: headerMenu,
    path: req.url,
    meta: {
      name: title,
      description: description
    }
  });
});

router.get("/UC", (req, res) => {
  res.render("under-construction", {
    headerMenu: headerMenu,
    meta: {
      name: title,
      description: 'Den här sidan är under uppbyggnad, kom tillbaka senare'
    }
  });
});

router.get("/booking", (req, res) => {
  res.render("booking", {
    headerMenu: headerMenu,
    meta: {
      name: title,
      description: description
    }
  });
});

// Filmer routes
router.get("/movies", async (req, res) => {
  const movies = await loadMovies();

  res.render("movies", {
    headerMenu: headerMenu,
    movies,
    movieHeader: "Alla filmer",
    meta: {
      name: title,
      description: description
    }
  });
});

router.get("/movies/:movieId", async (req, res) => {
  const movie = await loadMovie(req.params.movieId);
  if (movie) {
    res.render("movie-info", {
      headerMenu: headerMenu,
      movie,
      title: movie.attributes.title,
      intro: marked.parseInline(movie.attributes.intro),
      image: movie.attributes.image.url,
      meta: {
        name: `${movie.attributes.title} | ${title}`,
        description: movie.attributes.intro
      }
    });
  } else {
    res.status(404).render("404", {
      headerMenu: headerMenu,
      path: req.url,
      meta: {
        name: `Filmen finns inte | ${title}`,
        description: 'Filmen existerar inte i våra databaser!'
      }
    });
  }
});

export default router;
