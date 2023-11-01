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
        if (this.imgPath == null){
            this.image.attribute("src", "https://eticketsolutions.com/demo/themes/e-ticket/img/movie.jpg")
        }
    }

}