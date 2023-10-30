class TvShow{
    constructor(tvJson, num){
        this.name = tvJson.results[num].title;
        this.imgPath = tvJson.results[num].poster_path;
        this.releaseDate = tvJson.results[num].first_air_date;
        this.id = tvJson.results[num].id;
        this.description = tvJson.results[num].overview;
        this.reviewAverage = tvJson.results[num].vote_average;
        this.voteCount = tvJson.results[num].vote_count;
        this.popularity = tvJson.results[num].popularity;
    }
}