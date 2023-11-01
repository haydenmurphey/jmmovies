class TvShow{
    constructor(tvJson, num){
        this.name = tvJson.results[num].name;
        this.imgPath = tvJson.results[num].poster_path;
        this.releaseDate = tvJson.results[num].first_air_date;
        this.id = tvJson.results[num].id;
        this.description = tvJson.results[num].overview;
        this.reviewAverage = tvJson.results[num].vote_average;
        this.voteCount = tvJson.results[num].vote_count;
        this.popularity = tvJson.results[num].popularity;
        this.image = createElement("img");
    }
    
    getImage(){
        return "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + this.imgPath; 
    }

    display(x, y){
        this.image.position(x, y);
        this.image.attribute("src", this.getImage());
        this.image.size(120,180);
    }
}