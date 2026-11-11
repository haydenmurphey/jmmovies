# JMMovies

A movie and TV discovery site inspired by IMDb, built by a team of five in **CS 345 (Software Engineering)** at James Madison University, Fall 2023.

**Tech:** [p5.js](https://p5js.org/) 1.7 (used mostly for its DOM helpers like `createButton` and `createInput`), the [TMDB REST API](https://developer.themoviedb.org/), and plain JavaScript classes. There's no build step and no framework.

## Features

- **Search** movies, TV shows, actors, and other users
- **Trending, upcoming, and recent releases** on the home page
- **Movie, TV, and person detail pages**, including cast and credits
- **User accounts**: log in, set a favorite movie, track *watching / plan to watch / completed* lists
- **Reviews and ratings** on movies and TV shows

## Running locally

1. Copy the key template and add your own [TMDB API key](https://www.themoviedb.org/settings/api):
   ```sh
   cp api_key.example.js api_key.js
   ```
2. Serve the repo root with any static server:
   ```sh
   python3 -m http.server 5501
   # then visit http://localhost:5501/
   ```

> **Note:** Accounts, watchlists, and reviews were originally stored in a key-value service run by the course, which has since been retired. They are now saved in your browser's `localStorage`, so they stay on your machine. A TMDB key is the only setup needed.

## Project structure

```
site/
  index.html        Page layout and styles
  jmdb_main.js      p5.js setup, search, home page sections, login
  classes/          Movie, TVShow, Person, User, Review models
lib/
  keyval.js         Key-value storage (localStorage; originally the course's web service)
index.html          Redirects to site/
```

## Team

This was a group project. Credit goes to everyone who worked on it:

- **Hayden Murphey** ([@haydenmurphey](https://github.com/haydenmurphey))
- **Zach Merkel**
- **Austin Wysocki**
- **James Owen**
- **Sam Sorrell**

Course instructor: Phil Riley.

---

*This product uses the TMDB API but is not endorsed or certified by TMDB.*
