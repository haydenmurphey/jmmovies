class Movie{
    constructor(type, moviesJson, num=0, search_val){
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
        }
        this.search_val = search_val;
        this.button = createButton("go to page");
        this.button.mouseClicked(this.buttonPressed);
    }

    getImage(){
        return "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + this.imgPath; 
    }
    
    display = (x, y) =>{
        this.image.position(x,y);
        this.image.attribute("src", this.getImage());
        this.image.size(120,180);
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

    buttonPressed = () =>{
        removeElements();
        this.image = createElement("img");
        this.image.attribute("src", this.getImage());
        if (this.imgPath == null){
            this.image.attribute("src", "https://eticketsolutions.com/demo/themes/e-ticket/img/movie.jpg")
        }  
        this.image.size(400,600);
        this.image.position(100,200);
        this.backButton = createButton("back to search");
        this.backButton.size(150,20);
        this.backButton.position(50,150);
        this.backButton.mouseClicked(this.goBack);

        if (getItem('user') != null){
            this.favorite_button = createButton("Make favorite");
            this.favorite_button.position(250, 150);
            to_favorite = this.id;
            this.favorite_button.mousePressed(makeFavorite);
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
        textSize(20);
        text(this.description, 600, 350, 800);
    }

    goBack = () => {
        removeElements();
        setup();
        //search_bar.input(this.search_val);
        searchMovie(this.search_val);
    }
}