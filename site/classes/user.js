class User{
    constructor(username, favorite_movie_id=null, currently_watching_movies=null, plan_to_watch_movies=null, completed_movies=null, currently_watching_tv=null, plan_to_watch_tv=null, completed_tv=null){
        let test;
        this.username = username;
        this.favorite_movie_id = favorite_movie_id;
        this.favorite_movie = null;
        if (favorite_movie_id != null){
            let url = "https://api.themoviedb.org/3/movie/" + favorite_movie_id + "?language=en-US&api_key=YOUR_TMDB_API_KEY";
            loadJSON(url, test = (data) => {
                this.favorite_movie = new Movie("id", data);
            });
        }
        else{
            this.favorite_movie_id = null;
        }
        this.currently_watching_movies_ids = currently_watching_movies;
        this.plan_to_watch_movies_ids = plan_to_watch_movies;
        this.completed_movies_ids = completed_movies;
        this.currently_watching_tv_ids = currently_watching_tv;
        this.plan_to_watch_tv_ids = plan_to_watch_tv;
        this.completed_tv_ids = completed_tv;

        if (this.currently_watching_movies_ids == null){
            this.currently_watching_movies_ids = Array();
        }
        if (this.plan_to_watch_movies_ids == null){
            this.plan_to_watch_movies_ids = Array();
        }
        if (this.completed_movies_ids == null){
            this.completed_movies_ids = Array();
        }
        if (this.currently_watching_tv_ids ==  null){
            this.currently_watching_tv_ids = Array();
        }
        if (this.plan_to_watch_tv_ids == null){
            this.plan_to_watch_tv_ids = Array();
        }
        if (this.completed_tv_ids == null){
            this.completed_tv_ids = Array();
        }
        
        this.currently_watching_movies = Array(this.currently_watching_movies_ids.length);
        this.plan_to_watch_movies = Array(this.plan_to_watch_movies_ids.length);
        this.completed_movies = Array(this.completed_movies_ids.length);
        this.currently_watching_tv = Array(this.currently_watching_tv_ids.length);
        this.plan_to_watch_tv = Array(this.plan_to_watch_tv_ids.length);
        this.completed_tv = Array(this.completed_tv_ids.length);
        
        this.make_lists();
    }
    
    
    display_profile_screen = () =>{
        removeElements();
        let img = createElement("img");
        img.attribute("src", this.favorite_movie.getImage());
        img.position(100,150);
        img.size(200,300);
        textSize(30);
        text(this.username, 100, 50);
        if (this.favorite_movie != null){
            this.favorite_movie.display(100,125);
        }else{
            text("No favorite movie", 300, 300);
        }

        let x = 500;
        let y = 500;
        for (let i = 0; i < this.currently_watching_movies.length; i++){
            this.currently_watching_movies[i].displayForWatchlist(x,y);
            y += 150;
        }



        
    }

    update_favorite_movie = () =>{
        let test;
        let url = "https://api.themoviedb.org/3/movie/" + this.favorite_movie_id + "?language=en-US&api_key=" + TMDB_API_KEY;
            loadJSON(url, test = (data) => {
                this.favorite_movie = new Movie("id", data);
            });
    }

    make_lists = () =>{
        print("making lists");
        this.make_watching_movies();
        this.make_to_watch_movies();
        this.make_completed_movies();
        this.make_watching_tv();
        this.make_to_watch_tv();
        this.make_completed_tv();
    }

    make_watching_movies = () =>{
        let create_movie;
        for (let i = 0; i < this.currently_watching_movies.length; i++){
            let url = "https://api.themoviedb.org/3/movie/" + this.currently_watching_movies_ids[i] + "?language=en-US&api_key=" + TMDB_API_KEY;
            loadJSON(url, create_movie = (data) => {
                this.currently_watching_movies[i] = new Movie("id", data);
            });
        }
    }

    make_to_watch_movies = () => {
        let create_movie;
        for (let i = 0; i < this.plan_to_watch_movies.length; i++){
            let url = "https://api.themoviedb.org/3/movie/" + this.plan_to_watch_movies_ids[i] + "?language=en-US&api_key=" + TMDB_API_KEY;
            loadJSON(url, create_movie = (data) => {
                this.plan_to_watch_movies[i] = new Movie("id", data);
            });
        }
    }

    make_completed_movies = () =>{
        let create_movie;
        for (let i = 0; i < this.completed_movies.length; i++){
            let url = "https://api.themoviedb.org/3/movie/" + this.completed_movies_ids[i] + "?language=en-US&api_key=" + TMDB_API_KEY;
            loadJSON(url, create_movie = (data) => {
                this.completed_movies[i] = new Movie("id", data);
            });
        }
    }
    
    make_watching_tv = () =>{
        let create_tv;
        for (let i = 0; i < this.currently_watching_tv.length; i++){
            let url = "https://api.themoviedb.org/3/tv/" + this.currently_watching_tv_ids[i] + "?language=en-US&api_key=" + TMDB_API_KEY;
            loadJSON(url, create_tv = (data) => {
                this.currently_watching_tv[i] = new TvShow("id", data);
            });
        }
    }
    
    make_to_watch_tv = () =>{
        let create_tv;
        for (let i = 0; i < this.plan_to_watch_tv.length; i++){
            let url = "https://api.themoviedb.org/3/tv/" + this.plan_to_watch_tv_ids[i] + "?language=en-US&api_key=" + TMDB_API_KEY;
            loadJSON(url, create_tv = (data) => {
                this.plan_to_watch_tv[i] = new TvShow("id", data);
            });
        }
    }

    make_completed_tv = () =>{
        let create_tv;
        for (let i = 0; i < this.completed_tv.length; i++){
            let url = "https://api.themoviedb.org/3/tv/" + this.completed_tv_ids[i] + "?language=en-US&api_key=" + TMDB_API_KEY;
            loadJSON(url, create_tv = (data) => {
                this.completed_tv[i] = new TvShow("id", data);
            });
        }
    }

}

function makeFavorite(){
    user.favorite_movie_id = to_favorite;
    user.update_favorite_movie();
    saveUsers();
}

function addMovieToList(){
    if (list_type === "Plan to Watch"){
        user.plan_to_watch_movies_ids.push(to_add_list);
    }
    else if (list_type === "Currently Watching"){
        user.currently_watching_movies_ids.push(to_add_list);
    }
    else if (list_type === "Completed"){
        user.completed_movies_ids.push(to_add_list);
    }
    user.make_lists();
    saveUsers();
}

function addTvToList(){
    if (list_type === "Plan to Watch"){
        user.plan_to_watch_tv_ids.push(to_add_list);
    }
    else if (list_type === "Currently Watching"){
        user.currently_watching_tv_ids.push(to_add_list);
    }
    else if (list_type === "Completed"){
        user.completed_tv_ids.push(to_add_list);
    }
    user.make_lists();
    saveUsers();
}