class Person{
    constructor(moviesJson, num){
        this.name = moviesJson.results[num].name;
        this.id = moviesJson.results[num].id;
        this.imgPath = moviesJson.results[num].profile_path;
    }

}