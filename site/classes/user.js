class User{
    constructor(username, favorite_movie_id=null){
        this.username = username;
        this.favorite_movie_id = favorite_movie_id;
        if (favorite_movie_id != null){
            let url = "https://api.themoviedb.org/3/movie/${this.favorite_movie_id}?language=en-US&api_key=${TMDB_API_KEY}";
            loadJSON(url, function(data){
                this.favorite_movie = new Movie("id", data);
            });
        }
        else{
            this.favorite_movie_id = null;
        }
        this.currently_watching;
        this.to_watch;
    }


    display_profile_screen = () =>{
        removeElements();

        textSize(30)
        text(this.username, 300, 200);
        if (this.favorite_movie != null){
            this.favorite_movie.display(300,300);
        }
        else{
            text("No favorite movie", 300, 300)
        }
    }

/*
username in top right
favorite movie button/implementation
*/
}


