class TvShow{
    constructor(type, tvJson, num=0, search_val=""){
        if(type === "search"){
            this.name = tvJson.results[num].name;
            this.imgPath = tvJson.results[num].poster_path;
            this.releaseDate = tvJson.results[num].first_air_date;
            this.id = tvJson.results[num].id;
            this.description = tvJson.results[num].overview;
            this.reviewAverage = tvJson.results[num].vote_average;
            this.voteCount = tvJson.results[num].vote_count;
            this.popularity = tvJson.results[num].popularity;
        }
        if(type === "id"){
            this.name = tvJson.name;
            this.imgPath = tvJson.poster_path;
            this.releaseDate = tvJson.first_air_date;
            this.id = tvJson.id;
            this.description = tvJson.overview;
            this.reviewAverage = tvJson.vote_average;
            this.voteCount = tvJson.vote_count;
            this.popularity = tvJson.popularity;
        }
        this.image = createElement("img");
        this.search_val = search_val;
    }
    
    getImage(){
        return "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + this.imgPath; 
    }

    display(x, y){
        
        this.image.position(x, y);
        if (this.imgPath != null){
            this.image.attribute("src", this.getImage());
        }
            
        this.image.size(120,180);
        fill("black");
        textWrap(WORD);
        textSize(15);
        this.image.mouseClicked(this.buttonPressed);
        textSize(12);
        text(this.name, x, y + 100, 100);
        
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
        if (getItem('user') != null){
            let add_to_list_button = createButton("Add to List");
            add_to_list_button.position(800, 150);
            add_to_list_button.mouseClicked(this.callAddTv);
    
            this.list_selector = createSelect();
            this.list_selector.position(600, 150);
            this.list_selector.option("Plan to Watch");
            this.list_selector.option("Currently Watching");
            this.list_selector.option("Completed");

            list_type = this.list_selector.value();
        }
    }

    goBack = () => {
        removeElements();
        setup();
        //search_bar.input(this.search_val);
        searchTV(this.search_val);
    }

    callAddTv = () =>{
        to_add_list = this.id;
        list_type = this.list_selector.value();
        addTvToList();
    }
}