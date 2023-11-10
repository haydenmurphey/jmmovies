class Movie{
    constructor(type, moviesJson, num=0){
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
    }

    

    getImage(){
        return "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + this.imgPath; 
    }
    
    display(x, y){
        this.image.position(x,y);
        this.image.attribute("src", this.getImage());
        this.image.size(120,180);
        fill("black");
        textWrap(WORD);
        if (this.imgPath == null){
            this.image.attribute("src", "https://eticketsolutions.com/demo/themes/e-ticket/img/movie.jpg")
        }
        text(this.description, x + 200, y, 1000);
        textSize(30);
        text(this.name, x + 200, y - 50);
        this.button.size(100, 20);
        this.button.position(x + 200, y + 55);
        textSize(12);
    }

    buttonPressed(){
        removeElements();
        background("darkgray");
        console.log(this);
        this.image.size(200,300);
        this.image.position(200,200);
        this.backButton = createButton("back to search");
        this.backButton.size(150,20);
        this.backButton.position(50,150);
        this.backButton.mouseClicked(setup);
    }
}