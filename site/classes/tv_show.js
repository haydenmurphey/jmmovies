class TvShow{
    constructor(tvJson, num, search_val){
        this.name = tvJson.results[num].name;
        this.imgPath = tvJson.results[num].poster_path;
        this.releaseDate = tvJson.results[num].first_air_date;
        this.id = tvJson.results[num].id;
        this.description = tvJson.results[num].overview;
        this.reviewAverage = tvJson.results[num].vote_average;
        this.voteCount = tvJson.results[num].vote_count;
        this.popularity = tvJson.results[num].popularity;
        this.image = createElement("img");
        this.button = createButton("go to page");
        this.button.mouseClicked(this.buttonPressed);
        this.search_val = search_val;
    }
    
    getImage(){
        return "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + this.imgPath; 
    }

    display(x, y){
        this.image.position(x, y);
        this.image.attribute("src", this.getImage());
        this.image.size(120,180);
        fill("black");
        this.button.position(x + 200, y + 50);
        textWrap(WORD);
        textSize(15);
        if(this.description == ""){
            text("NO DESCRIPTION", x + 200, y, 1000);
        } else {
            text(this.description, x + 200, y, 1000);
        }
        textSize(30);
        text(this.name, x + 200, y - 50);
        
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
    }

    goBack = () => {
        removeElements();
        setup();
        //search_bar.input(this.search_val);
        searchTV(this.search_val);
    }
}