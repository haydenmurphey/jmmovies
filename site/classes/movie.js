class Movie{
    constructor(moviesJson, num){
        this.name = moviesJson.results[num].title;
        this.imgPath = moviesJson.results[num].poster_path;
        this.releaseDate = moviesJson.results[num].release_date;
        this.id = moviesJson.results[num].id;
        this.description = moviesJson.results[num].overview;
        this.reviewAverage = moviesJson.results[num].vote_average;
        this.popularity = moviesJson.results[num].popularity;
        this.image = createElement("img");
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
        textSize(12);

    }
    
    HomeDisplay(x,y){
        this.image.position(x,y);
        this.image.attribute("src", this.getImage());
        this.image.size(120,200);
        fill("black");
        textWrap(WORD);
        if (this.imgPath == null){
            this.image.attribute("src", "https://eticketsolutions.com/demo/themes/e-ticket/img/movie.jpg")
        }
        textSize(12);
        textStyle(BOLD);
        text(this.name, x - 10, y + 125, x + 10);
        text(12);
        textStyle(NORMAL);
        text(this.releaseDate, x - 10, y + 110, x + 10)


    }
}