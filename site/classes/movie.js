class Movie{
    constructor(type, moviesJson, num=0, search_val =""){
        if (type === "search"){
            if (moviesJson.results[num].title == null){
                this.name = "unknown title";
            }
            else{
                this.name = moviesJson.results[num].title;
            }
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
        //this.button.show();
        fill("black");
        textWrap(WORD);
        if (this.imgPath == null){
            this.image.attribute("src", "https://eticketsolutions.com/demo/themes/e-ticket/img/movie.jpg")
        }  
        //this.button.position(x + 200, y + 50);
        //textSize(12);   
        //text(this.description, x + 200, y, 1000);
        textSize(12);
        text(this.name, x, y + 100, 100);
        //textSize(12);
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
        this.area = createElement('textarea');
        this.area.position(600, 740);
        this.area.class("review-box");

        text("Leave a rating", 800, 600);
        this.ratingScore = createSelect();
        this.ratingScore.position(800, 740);
        this.ratingScore.class("rating-score");
        for(let i = 0; i < 10; i++){
            this.ratingScore.option(i +1);
        }

        this.submitButton = createButton("Submit Review");
        this.submitButton.mousePressed(this.submitReview);
        this.submitButton.position(950, 740);
        this.submitButton.class("submit-button");

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
        let getCastJson;
        let data;
        let y = 1200;
        let x = 200;
        let url ="https://api.themoviedb.org/3/movie/" + this.id + "/credits?language=en-US&api_key=" + TMDB_API_KEY;
        loadJSON(url, getCastJson = (inp) =>{
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
                    y += 225;
                    x = 200;
                }
            }
            this.review_y = y + 125;
            print(this.review_y);
            this.displayReviews();
    
        });
    }

    callAddMovie = () =>{
        to_add_list = this.id;
        list_type = this.list_selector.value();
        addMovieToList();
    }

    saveReviews = () => {
         /* 
        JSON file structure 

        review_total_rating
        reviews[]
            username
            rating
            review
        */
        let movieKeyval = new Keyval(KEYVAL_API_KEY);
        let reviews_json = {};
        reviews_json.review_total_rating = this.totalReviewScore;
        let reviewsArray = Array(this.reviews.length);
        for (let i = 0; i < this.reviews.length; i++){
            reviewsArray[i] = {};
            reviewsArray[i]["username"] = this.reviewUsernames[i];
            reviewsArray[i]["rating"] = this.reviewRatings[i];
            reviewsArray[i]["review"] = this.reviews[i];
        }
        reviews_json.reviews = reviewsArray;
        let json_string = JSON.stringify(reviews_json);
        movieKeyval.set(this.id + "movie", json_string);

    }

    getReviews = () => {

        /* 
        JSON file structure 

        review_total_rating
        reviews[]
            username
            rating
            review
        */
        let data_found = true;
        let review_url = "https://keyval.learnscrum.xyz/keystore/" + this.id + "movie?apikey=" + KEYVAL_API_KEY;
        let test;
        let test1;
        let test2;
        let blah = fetch(review_url).then(test1 = (response) =>{
            if (response.status == 200){
                loadJSON(review_url, test = (data) =>{
                    this.reviews = Array(data.reviews.length);
                    this.reviewUsernames = Array(data.reviews.length);
                    this.reviewRatings = Array(data.reviews.length);
                    this.totalReviewScore = data.review_total_rating;
                    this.reviewAverage = this.totalReviewScore / data.reviews.length;
        
                    for (let i = 0; i < this.reviews.length; i++){
                        this.reviews[i] = data.reviews[i].review;
                        this.reviewUsernames[i] = data.reviews[i].username;
                        this.reviewRatings[i] = data.reviews[i].rating;
                    }
                },
                    test2 = () =>{
                    print("no reviews");
                            
                    
        
                });
    
            }
            else{
                this.reviews = Array();
                    this.reviewUsernames = Array();
                    this.reviewRatings = Array();
                    this.totalReviewScore = 0;
                    this.reviewAverage = 0;
            }
        })
    }

    submitReview = () => {
        this.reviews.push(this.area.value());
        this.reviewUsernames.push(user.username);
        this.reviewRatings.push(parseInt(this.ratingScore.value()));
        this.totalReviewScore += parseInt(this.ratingScore.value());
        this.reviewAverage = this.totalReviewScore / this.reviews.length;
        this.buttonPressed();
        this.saveReviews();
    }


    displayReviews = () => {
        let totalReviews = createP("Reviews: ");
        totalReviews.addClass('total-review-text');
        totalReviews.position(50, this.review_y + 75);
        for (let i = 0; i < this.reviews.length; i++) {
            let reviwer = createP("Username: " + this.reviewUsernames[i]);
            let review_rating = createP("Rating: " + this.reviewRatings[i]);
            let review_text = createP(this.reviews[i]);

            // Style for Reviews
            let reviewContainer = createDiv();
            reviewContainer.addClass('review-container');
            reviwer.addClass('submitted-review');
            review_rating.addClass('submitted-review');
            review_text.addClass('submitted-review');
            reviwer.parent(reviewContainer);
            review_rating.parent(reviewContainer);
            review_text.parent(reviewContainer);
            reviewContainer.position(50, this.review_y + 150 + (150 * i));
        }
    }
}
