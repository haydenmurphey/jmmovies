class Movie{
    constructor(moviesJson, num){
        this.name = moviesJson.results[num].title;
        this.imgPath = moviesJson.results[num].poster_path;
        this.releaseDate = moviesJson.results[num].release_date;
        this.id = moviesJson.results[num].id;
        this.description = moviesJson.results[num].overview;
        this.reviewAverage = moviesJson.results[num].vote_average;
        this.popularity = moviesJson.results[num].popularity;
    }


    getImage(){
        return "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + this.imgPath; 
    }
    
}