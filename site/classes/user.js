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
        console.log("Displaying Profile");
        removeElements();
        let img = createElement("img");
        if (this.favorite_movie != null){
            img.attribute("src", this.favorite_movie.getImage());
        }
        img.position(100,150);
        img.size(200,300);
        let usernameP = createP(this.username);
        usernameP.class("profile-username");
        usernameP.position(100,100);
        usernameP.style('font-size', '23px');
        if (this.favorite_movie != null){
            this.favorite_movie.display(100,125);
        }else{
            text("No favorite movie", 300, 300);
        }

        let currentlyContainer = createDiv();
        currentlyContainer.addClass('currently-container');
        currentlyContainer.position(550, 500);
        let currentlyWatchingP = createP("Currently Watching:");
        currentlyWatchingP.addClass('currently');
        currentlyWatchingP.parent(currentlyContainer);

        let planningContainer = createDiv();
        planningContainer.addClass('planning-container');
        planningContainer.position(100, 500)
        let toWatchP = createP("Planning:");
        toWatchP.addClass('toWatch');
        toWatchP.parent(planningContainer);
        
        let completedContainer = createDiv();
        completedContainer.addClass('completed-container');
        completedContainer.position(1000, 500);
        let completedP = createP("Completed:");
        completedP.addClass('completed');
        completedP.parent(completedContainer);

        let toggleButton = createButton("Show Tv");
        toggleButton.position(700, 500);
        toggleButton.mousePressed(this.toggleWatchlist);

        this.showMovie = true;

        let x = 100;
        let y = 500;

        this.plan_to_watch_movies_display = Array(this.plan_to_watch_movies.length);
        this.currently_watching_movies_display = Array(this.currently_watching_movies.length);
        this.completed_movies_display = Array(this.completed_movies.length);
        this.plan_to_watch_tv_display = Array(this.plan_to_watch_tv.length);
        this.currently_watching_tv_display = Array(this.currently_watching_tv.length);
        this.completed_tv_display = Array(this.completed_tv.length);




        for (let i = 0; i < this.plan_to_watch_movies.length; i++){
            this.plan_to_watch_movies_display[i] = createP(this.plan_to_watch_movies[i].name);
            this.plan_to_watch_movies_display[i].mouseClicked(this.plan_to_watch_movies[i].buttonPressed);
            this.plan_to_watch_movies_display[i].addClass('watchlist-item');
            this.plan_to_watch_movies_display[i].addClass('movie-title');
            this.plan_to_watch_movies_display[i].parent(planningContainer);          
            y += 25;
        }
        
        x = 550;
        y = 500;
         
        for (let i = 0; i < this.currently_watching_movies.length; i++){
            this.currently_watching_movies_display[i] = createP(this.currently_watching_movies[i].name);
            this.currently_watching_movies_display[i].mouseClicked(this.currently_watching_movies[i].buttonPressed);
            this.currently_watching_movies_display[i].addClass('watchlist-item');
            this.currently_watching_movies_display[i].addClass('movie-title');
            this.currently_watching_movies_display[i].parent(currentlyContainer);
            y += 25;
        }
        
        x = 1000;
        y = 500;

        for (let i = 0; i < this.completed_movies.length; i++){
            this.completed_movies_display[i] = createP(this.completed_movies[i].name);
            this.completed_movies_display[i].mouseClicked(this.completed_movies[i].buttonPressed);
            this.completed_movies_display[i].addClass('watchlist-item');
            this.completed_movies_display[i].addClass('movie-title');
            this.completed_movies_display[i].parent(completedContainer);
            y += 25;
        }
        
        //display tv
        x = 100;
        y = 500;

        for (let i = 0; i < this.plan_to_watch_tv.length; i++){
            this.plan_to_watch_tv_display[i] = createP(this.plan_to_watch_tv[i].name);
            this.plan_to_watch_tv_display[i].mouseClicked(this.plan_to_watch_tv[i].buttonPressed);
            this.plan_to_watch_tv_display[i].addClass('watchlist-item');
            this.plan_to_watch_tv_display[i].addClass('movie-title');
            this.plan_to_watch_tv_display[i].parent(planningContainer);
            this.plan_to_watch_tv_display[i].hide();
            y += 25;
        }

        x = 550;
        y = 500;
         
        for (let i = 0; i < this.currently_watching_tv.length; i++){
            this.currently_watching_tv_display[i] = createP(this.currently_watching_tv[i].name);
            this.currently_watching_tv_display[i].mouseClicked(this.currently_watching_tv[i].buttonPressed);
            this.currently_watching_tv_display[i].addClass('watchlist-item');
            this.currently_watching_tv_display[i].addClass('movie-title');
            this.currently_watching_tv_display[i].parent(currentlyContainer);
            this.currently_watching_tv_display[i].hide();
            y += 25;
        }
        
        x = 1000;
        y = 500;

        for (let i = 0; i < this.completed_tv.length; i++){
            this.completed_tv_display[i] = createP(this.completed_tv[i].name);
            this.completed_tv_display[i].mouseClicked(this.completed_tv[i].buttonPressed);
            this.completed_tv_display[i].addClass('watchlist-item');
            this.completed_tv_display[i].addClass('movie-title');
            this.completed_tv_display[i].parent(completedContainer);
            this.completed_tv_display[i].hide();
            y += 25;
        }

        
    }

    toggleWatchlist = () =>{
        


        this.showMovie = !this.showMovie;
        if (this.showMovie){
            for (let i = 0; i < this.plan_to_watch_movies.length; i++){
                this.plan_to_watch_movies_display[i].show();    
            }
             
            for (let i = 0; i < this.currently_watching_movies.length; i++){
                this.currently_watching_movies_display[i].show();
            }
    
            for (let i = 0; i < this.completed_movies.length; i++){
                this.completed_movies_display[i].show();
            }

            for (let i = 0; i < this.plan_to_watch_tv.length; i++){
                this.plan_to_watch_tv_display[i].hide();
            }
             
            for (let i = 0; i < this.currently_watching_tv.length; i++){
                this.currently_watching_tv_display[i].hide();
            }
    
            for (let i = 0; i < this.completed_tv.length; i++){
                this.completed_tv_display[i].hide();
            }
        }

        else{
            for (let i = 0; i < this.plan_to_watch_movies.length; i++){
                this.plan_to_watch_movies_display[i].hide();    
            }
             
            for (let i = 0; i < this.currently_watching_movies.length; i++){
                this.currently_watching_movies_display[i].hide();
            }
    
            for (let i = 0; i < this.completed_movies.length; i++){
                this.completed_movies_display[i].hide();
            }

            for (let i = 0; i < this.plan_to_watch_tv.length; i++){
                this.plan_to_watch_tv_display[i].show();
            }
             
            for (let i = 0; i < this.currently_watching_tv.length; i++){
                this.currently_watching_tv_display[i].show();
            }
    
            for (let i = 0; i < this.completed_tv.length; i++){
                this.completed_tv_display[i].show();
            }
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
        print("making watching movies")
        for (let i = 0; i < this.currently_watching_movies.length; i++){
            let url = "https://api.themoviedb.org/3/movie/" + this.currently_watching_movies_ids[i] + "?language=en-US&api_key=" + TMDB_API_KEY;
            loadJSON(url, (data) => {
                this.currently_watching_movies[i] = new Movie("id", data);
                console.log("Movie loaded"); 
            });
        }
    }

    make_to_watch_movies = () => {
        print("making to watch movies");
        let create_movie;
        for (let i = 0; i < this.plan_to_watch_movies.length; i++){
            let url = "https://api.themoviedb.org/3/movie/" + this.plan_to_watch_movies_ids[i] + "?language=en-US&api_key=" + TMDB_API_KEY;
            loadJSON(url, (data) => {
                this.plan_to_watch_movies[i] = new Movie("id", data);
                console.log("Movie loaded"); 

            });
        }
    }

    make_completed_movies = () =>{
        print("making completed movies");
        let create_movie;
        for (let i = 0; i < this.completed_movies.length; i++){
            let url = "https://api.themoviedb.org/3/movie/" + this.completed_movies_ids[i] + "?language=en-US&api_key=" + TMDB_API_KEY;
            loadJSON(url, (data) => {
                this.completed_movies[i] = new Movie("id", data);
                console.log("Movie loaded"); 

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

    contained_in_watchlist_movie(id){
        if (this.plan_to_watch_movies_ids.includes(id)){
            return "Plan to Watch";
        }
        else if (this.currently_watching_movies_ids.includes(id)){
            return "Currently Watching";
        }
        else if (this.completed_movies_ids.includes(id)){
            return "Completed";
        }
    }
    contained_in_watchlist_tv(id){
        if (this.plan_to_watch_tv_ids.includes(id)){
            return "Plan to Watch";
        }
        else if (this.currently_watching_tv_ids.includes(id)){
            return "Currently Watching";
        }
        else if (this.completed_tv_ids.includes(id)){
            return "Completed";
        }
        else{
            return "None";
        }
    }
    remove_repeat_from_list = (id) =>{
        let index = this.currently_watching_movies_ids.indexOf(id);
        print(index)
        if (index > -1) { // only splice array when item is found
            this.currently_watching_movies.splice(index, 1); // 2nd parameter means remove one item only
            this.currently_watching_movies_ids.splice(index, 1); // 2nd parameter means remove one item only
        }
        index = this.plan_to_watch_movies_ids.indexOf(id);
        print(index)
        print(this.currently_watching_movies);

        if (index > -1) { // only splice array when item is found
            this.plan_to_watch_movies.splice(index, 1); // 2nd parameter means remove one item only
            this.plan_to_watch_movies_ids.splice(index, 1); // 2nd parameter means remove one item only
        }
        index = this.completed_movies_ids.indexOf(id);
        print(index)
        print(this.plan_to_watch_movies);

        if (index > -1) { // only splice array when item is found
            this.completed_movies_ids.splice(index, 1); // 2nd parameter means remove one item only
            this.completed_movies.splice(index, 1); // 2nd parameter means remove one item only
        }
        print(this.completed_movies);

    }

}

function makeFavorite(){
    user.favorite_movie_id = to_favorite;
    user.update_favorite_movie();
    saveUsers();
}

function addMovieToList(id){
    user.remove_repeat_from_list(id);

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
    //not waiting on all lists to be made before saving idk how to fix
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