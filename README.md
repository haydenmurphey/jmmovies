# JMMovies

A movie and TV discovery site inspired by IMDb, built by a team of five in **CS 345 (Software Engineering)** at James Madison University, Fall 2023.

Built with [p5.js](https://p5js.org/) and [The Movie Database (TMDB) API](https://developer.themoviedb.org/).

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
2. Serve the repo root with any static server and open `site/index.html`:
   ```sh
   python3 -m http.server 5501
   # then visit http://localhost:5501/site/index.html
   ```

> **Note:** Accounts and reviews were stored in a key-value service provided by the course (`keyval.learnscrum.xyz`), which may no longer be available. Search and browsing only need a TMDB key.

## Project structure

```
site/
  index.html        Page layout and styles
  jmdb_main.js      p5.js setup, search, home page sections, login
  classes/          Movie, TVShow, Person, User, Review models
lib/
  keyval.js         Small client for the course key-value store
  jstest.js         Minimal test harness
test/               Browser test runner
```

## Team

This was a group project. Credit goes to everyone who worked on it:

- **Hayden Murphey** ([@haydenmurphey](https://github.com/haydenmurphey))
- **Zach Merkel**
- **Austin Wysocki**
- **James Owen**
- **Sam Sorrell**

Course instructor: Phil Riley.

The full commit history from the original class repository is preserved here, so each team member's contributions remain attributed to them.

---

*This product uses the TMDB API but is not endorsed or certified by TMDB.*
