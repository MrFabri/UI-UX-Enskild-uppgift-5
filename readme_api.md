# Team-vadSomHelst API-documentation

GruppUppgift 2 – Spegeln Del 2
Visningar, betyg & recensioner

# Movies

## `/api/movies`
**GET**

> Returns all movies

## `/api/movies/{id}`

**GET**
> Returns a movie


# Screenings

## `/api/screenings`

**GET**
> Returns all the screenings

## `/api/movies/{id}/screenings`

**GET**
> Returns all the screenings for a specific movie

## `/api/movies/{id}/screenings?page={page}`

**GET**
> Returns all the screenings for a movie with pagination, every page has 5 screenings max and it also includes information about how many pages there is.

## `/api/screenings/startpage`

**GET**
> Returns screenings for the next 5 days and maximum 10 screenings.


# Reviews
## `/api/reviews`

**GET**
> Returns all reviews

**POST**
> Posts a review to API

## `/api/reviews/{id}`

**GET**
> Returns all reviews for a specific movie

### With the query:
*?page=x* 
>Returns the reviews for a movie with pagination. 5 reviews at every page where x is page number.

# Ratings
## `/movies/{id}/ratings`
>Returns the rating for a movie