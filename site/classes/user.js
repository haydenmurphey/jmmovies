class User{
    constructor(username, favorite_movie_id=null){
        this.username = username;
        this.favorite_movie_id = favorite_movie_id;
        let url = "https://api.themoviedb.org/3/movie/{this.favorite_movie_id}?language=en-US&api_key={TMDB_API_KEY}";
        loadJSON(url, function(data){
            this.favorite_movie = new Movie("id", data);
        });
        this.currently_watching;
        this.to_watch;
    }
}