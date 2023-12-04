class Person {
    constructor(actorJson, num, search_val ="", type ="", movie = null){
        if(type === "cast"){
            this.name = actorJson.cast[num].name;
            this.id = actorJson.cast[num].id;
            this.imgPath = actorJson.cast[num].profile_path;
            this.image = createElement("img");
            this.search_val = search_val;
            this.movie = movie;
            this.type = "cast";
            //this.appearsIn = data.results[num].known_for;
            //this.movies = Array(this.appearsIn.length);
        } else {
            this.name = actorJson.results[num].name;
            this.id = actorJson.results[num].id;
            this.imgPath = actorJson.results[num].profile_path;
            this.image = createElement("img");
            this.search_val = search_val;
            this.type = "";
            this.movie = null;
            //this.appearsIn = actorJson.results[num].known_for;
            //this.movies = Array(this.appearsIn.length);
        }
        this.image.mouseClicked(this.buttonPressed);
        this.image.class("actor");
        this.backButton;
        let test;
        let url = "https://api.themoviedb.org/3/person/" + this.id + "?language=en-US&api_key=" + TMDB_API_KEY;
            loadJSON(url, test = (data) =>{
                //print(data);
                this.bio = data.biography;
                this.birthday = data.birthday;
                this.bornIn = data.place_of_birth;
                this.popularity = data.popularity;
            });
            
            url = "https://api.themoviedb.org/3/person/" + this.id + "/movie_credits?language=en-US&api_key=" + TMDB_API_KEY;
            loadJSON(url, test = (data) =>{
            //print(data);
            this.movies = Array(data.cast.length);
            for(let i = 0; i < this.movies.length; i++){
                this.appearsIn = data.cast[i];
                this.movies[i] = this.appearsIn;
            }
            
            });
        
    }

    getImage(){
        return "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + this.imgPath; 
    }

    display(x, y, type = ""){
        this.image.position(x, y);
        this.image.attribute("src", this.getImage());
        this.image.size(120,180);
        if(this.imgPath == null){
            this.image.attribute("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAAMFBMVEXk5ueutLewt7np6+ursbTh4+SzubzBxsjT1ti6v8Lc3+DIzM7X2tvM0NLFyczP09R8ZhjBAAAC4klEQVR4nO2a2XLrIAyGDcJsXvL+b3swdVO3dUCyJXJmyj+9ykX5RguSJYahq6urq6urq6urq6vr7wngnYcP0U8uBLcuc3wDCYzeaWU+pfQ6NyYYV5vOPcoY61sSTD/O3ymsb+QOmNUZQIYIYxOE6RXAxqBbhIQrEGwQD3FnhDJBA4YqQWJYRAkqXtglmJ3wQBEoJZcXI5JAWTEEiySQCwesG5K0kCvQRkhmmEQyc8EbQQlFJMEImxkECGaSEZTi9wSsNATDX6+AaASzsiNEIoIK7Ai0fNjMwI6AK1BHBPZgCESC1DdwI5BuhYywcqcllUApx4yArtNfCh1BAOFCLLAjkDOCPRwv3AsLN4IjI7C38sRanRDY+yZqxyLRyL+/WAMxJfirFOkrIiPwEwwjjYD9YkoCWtMiMm0hdY9WZs5BMINAC5+Fr5aGPyN3lWZt3xHEZhyAmDRlAsFpEy4xDXuZPmrGEIgFws5Qd4UVHgJDjcHIjbqeej0Eb+GFD42FvBAZrpwIltN1xDaHj632QzBMJ94wVn4If9Q4WXWwhTE6tF5Obfu5R9Cfeeh8m3XMb4zEkTS+ZVkJ6dAxxnn2+S9x5J9anZ7O9ouzVucYyFtKpbS1YfWbQeTP91Ow5jwpt5+DE91WQpzCi9O/gdh1FnEKxOXngrZAod3M7JJk/1AsDWe2eHDmKSQDUM7fKTTfDHihGeBoimnkcIfXFwEyhLpdOiEiO9bXEDffFAC6bS9B3Oli4pUoPGEwV981gOc4/wPiWm6wOOHJcMkZ5AVEmeFCa383E36JvMBlJ6B+4hAnKkhpCgFnJB6E/9BCv5SgCv/JHWUAFH4YCTx34jkDDoG8FKUgoMaRtBEnmQFRN6kbeqoQWSFrBIwZpI2AMYOu/5Obqn2Be2kjVO8n7HDzFkMFQZ6gNiInPxe5glDu6yVvxqfKTZx4Sm4qp2WDaEwqI+gGqrx/gxYqEnR1dXV1/S/6BzA0IDjtXgNsAAAAAElFTkSuQmCC");
        }
        fill("black");
        textSize(30);
        textWrap(WORD);
        if (type === "cast"){
            textSize(12);
            text(this.name, x, y + 60, 60);
        } else {
            text(this.name, x, y + 100, 100);
        }
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
        this.backButton = createButton("Back to Search");
        this.backButton.class("person-back-button");
        this.backButton.size(150,40);
        this.backButton.position(100,150);
        if(this.type === "cast"){
            this.backButton = createButton("Back to Title");
        }
        this.backButton.addClass('person-back-button');
        this.backButton.size(150,40);
        this.backButton.position(100,150);
        this.backButton.mouseClicked(this.goBack);
        background("darkgray");
        textSize(40);
        textWrap(WORD);
        text(this.name, 600, 200, 600);
        text("Appears in:", 100, 1200, 600);
        textSize(14);
        text(this.bio, 100, 750, 1000);
        textSize(20);
        text("Born in: " + this.bornIn, 600, 300, 600);
        text("Birthday: " + this.birthday, 600, 350, 600);
        text("Popularity rating: " + this.popularity, 600, 400, 600);
        this.getMovies();
    }

    getMovies = () => {
        let test;
        let appeared;
        let start_url = "https://api.themoviedb.org/3/movie/";
        let type = 0;
        let x = 0;
        let y = 1500
        for (let i = 0; i < this.movies.length; i++){
            //if(this.appearsIn[i].media_type === "movie"){
                //start_url = "https://api.themoviedb.org/3/movie/";
                //type = 1;
            //} else {
                //start_url = "https://api.themoviedb.org/3/tvshow/";
            //}
            let url = start_url + this.movies[i].id + "?language=en-US&api_key=YOUR_TMDB_API_KEY";
            loadJSON(url, test = (data) => {
                appeared = new Movie("id", data);
                this.movies[i] = appeared;
                textWrap(WORD);
                if(x <= 1000){
                    x += 200
                } else{
                x = 200;
                y += 300;
                }
                appeared.display(x, y);
            });
          }
    }

    goBack = () => {
        removeElements();
        //search_bar.input(this.search_val);
        if(this.type === "cast"){
            //print(this.movie);
            this.movie.buttonPressed();
        } else if(this.search_val != ""){
            setup();
            searchActor(this.search_val);
        }
    }

}