class Movie{
    constructor(type, moviesJson, num=0, search_val =""){
        if (type === "search"){
            this.name = moviesJson.results[num].title;
            this.imgPath = moviesJson.results[num].poster_path;
            this.releaseDate = moviesJson.results[num].release_date;
            this.id = moviesJson.results[num].id;
            this.description = moviesJson.results[num].overview;
            this.reviewAverage = moviesJson.results[num].vote_average;
            this.popularity = moviesJson.results[num].popularity;
            this.image = createElement("img");
        }
        if (type === "id"){
            this.name = moviesJson.title;
            this.imgPath = moviesJson.poster_path;
            this.releaseDate = moviesJson.release_date;
            this.id = moviesJson.id;
            this.description = moviesJson.overview;
            this.reviewAverage = moviesJson.vote_average;
            this.popularity = moviesJson.popularity;
            this.image = createElement("img");

        }
        this.search_val = search_val;
        this.button = createButton("go to page");
        this.button.mouseClicked(this.buttonPressed);
        this.button.hide();
        this.image.class("image");

        this.getReviews();
    }

    getImage = () =>{
        return "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + this.imgPath; 
    }
 
    display = (x, y) =>{
        this.displayed_on_home = false;
        this.image.position(x,y);
        this.image.attribute("src", this.getImage());
        this.image.size(120,180);
        this.image.mouseClicked(this.buttonPressed);
        this.button.show();
        fill("black");
        textWrap(WORD);
        if (this.imgPath == null){
            this.image.attribute("src", "https://eticketsolutions.com/demo/themes/e-ticket/img/movie.jpg")
        }  
        this.button.position(x + 200, y + 50);
        textSize(12);   
        text(this.description, x + 200, y, 1000);
        textSize(30);
        text(this.name, x + 200, y - 50);
        textSize(12);
    }
    
    HomeDisplay(x,y){
        this.displayed_on_home = true;
        this.image.position(x,y);
        this.image.attribute("src", this.getImage());
        this.image.size(120,200);
        this.image.mouseClicked(this.buttonPressed);
        fill("black");
        textWrap(WORD);
        if (this.imgPath == null){
            this.image.attribute("src", "https://eticketsolutions.com/demo/themes/e-ticket/img/movie.jpg")
        }
        textSize(12);
        textStyle(BOLD);
        text(this.name, x - 5, y + 125, 130);
        textSize(12);
        textStyle(NORMAL);
        text(this.releaseDate, x - 5, y + 110, x + 10)
    }

    buttonPressed = () =>{
        removeElements();
        this.image = createElement("img");
        this.image.attribute("src", this.getImage());
        if (this.imgPath == null){
            this.image.attribute("src", "https://eticketsolutions.com/demo/themes/e-ticket/img/movie.jpg")
        }  
        this.image.size(400,600);
        this.image.position(100,200);
        this.backButton = createButton("Go Back");
        //this.backButton.size(150,20);
        this.backButton.position(100,150);
        this.backButton.mouseClicked(this.goBack);
        this.getCast();
        this.backButton.class("back");

        if (getItem('user') != null){
            this.favorite_button = createButton("Make favorite");
            this.favorite_button.position(180, 150);
            to_favorite = this.id;
            this.favorite_button.mousePressed(makeFavorite);
            this.favorite_button.class("favorite");

            let add_to_list_button = createButton("Add to List");
            add_to_list_button.position(800, 150);
            add_to_list_button.mouseClicked(this.callAddMovie);
            add_to_list_button.class("add-to-list");
    
            this.list_selector = createSelect();
            this.list_selector.position(600, 150);
            this.list_selector.option("Plan to Watch");
            this.list_selector.option("Currently Watching");
            this.list_selector.option("Completed");
            this.list_selector.class("list-selector");

        }

        background("darkgray");
        textSize(40);
        textWrap(WORD);
        text(this.name, 600, 200, 600);
        text("Popularity Rating: " + this.popularity, 100, 800);
        if(this.reviewAverage == null){
            this.reviewAverage = "Not enough votes";
        }
        text("Average Review Rating: " + this.reviewAverage, 100, 900);
        text("Cast List:", 200, 1000, 600);
        textSize(20);
        text(this.description, 600, 350, 800);
        text("Release Date: " + this.releaseDate, 600, 500, 800);
        
        //LEAVE A REVIEW SECTION
        text("Leave a review", 600, 600);
        let area = createElement('textarea');
        area.position(600, 700);

        text("Leave a rating", 800, 600);
        let ratingScore = createSelect();
        ratingScore.position(800, 700);
        for(let i = 0; i < 10; i++){
            ratingScore.option(i +1);
        }

        let submitButton = createButton("Submit Review");
        submitButton.position(700,800);

    }

    displayForWatchlist = (x, y) =>{
        this.image.attribute("src", this.getImage());
        this.image.position(500, 500);
        this.image.size(120,200);
        this.titleDisplay = createP(this.name);
        this.titleDisplay.position(x,y);
    }


    goBack = () => {
        removeElements();
        setup();
        if (this.displayed_on_home == false){
            searchMovie(this.search_val);

        }
    }

    getCast = () => {
        let cast;
        let data;
        let y = 1200;
        let x = 200;
        let url ="https://api.themoviedb.org/3/movie/" + this.id + "/credits?language=en-US&api_key=" + TMDB_API_KEY;
        loadJSON(url, function(inp){
            data = inp;
            print('TEST');
            print(data);
            cast = Array(data.cast.length);
            for (let i = 0; i < cast.length; i++){
                cast[i] = new Person(data, i, "", "cast");
                cast[i].display(x,y, "cast");
                cast[i].image.size(100,150);
                if (x < 1000){
                    x += 200;
                } else{
                    y += 200
                    x = 200
                }
            }
            
        });
    }

    callAddMovie = () =>{
        to_add_list = this.id;
        list_type = this.list_selector.value();
        addMovieToList();
    }




    getReviews = () => {

        /* 
        JSON file structure 

        num_reviews
        review_total_rating
        reviews[]
            username
            rating
            review
        */


        let review_url = "https://keyval.learnscrum.xyz/keystore/" + this.id + "movie?apikey=" + KEYVAL_API_KEY;
        //loadJSON(review_url, );
        



    }
}
