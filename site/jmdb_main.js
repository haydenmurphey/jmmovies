
let search_bar;
let search_button;
let search_dropdown;
let searchData;
let searchDiv;
let searchResult;
let login_input;
let login_button;
let user;
let upcomingMovie;


function setup() {
    createCanvas(windowWidth, 5000);
    searchDiv = createDiv();

    search_bar = createInput();
    search_bar.size(300);
    search_bar.position(windowWidth/2 - 150, 50);

    search_dropdown = createSelect();
    search_dropdown.position(search_bar.x - 76,search_bar.y);
    search_dropdown.size(75);
    search_dropdown.option("Movie");
    search_dropdown.option("TV Show");
    search_dropdown.option("Actor");
    //search_dropdown.option("User");
    
    search_button = createButton("Search");
    search_button.position(search_bar.x + 307, search_bar.y);
    search_button.size(75);
    search_button.mousePressed(searchType);

    login_button = createButton("Login");
    login_input = createInput();
    login_input.position(1300, search_bar.y);
    login_button.position(login_input.x - 50, search_bar.y);
    login_button.mousePressed(login);
    let saveButton = createButton("save");
    saveButton.position(800,300);
    saveButton.mousePressed(saveUser);

    displayRecents();
    displayUpcoming();


    keyval = new Keyval(KEYVAL_API_KEY);
}

function draw() {

}

function login(){
    let user_keyval = new Keyval(KEYVAL_API_KEY);

    user_keyval.get(login_input.value(), function(data){
        test = data;
        print(test);
    }, 
    function(){
        print("error");
    });
}

function saveUser(){
    let user_keyval = new Keyval(KEYVAL_API_KEY);

    user_keyval.set(login_input.value(), function(data){
        print(data);
    });

}


function searchType(){
    if (searchResult != null){
        for (let i = 0; i < searchResult.length; i ++){
            searchResult[i].image.remove();
            
        }
    }
    if(upcomingMovie != null){
        for (let i = 0; i < upcomingMovie.length; i ++){
            upcomingMovie[i].image.remove();
            
        }

    }
    if(search_bar.value() == ""){
        background("darkgray");
        return;
    }
    let dropdown_value = search_dropdown.value();
    if (dropdown_value === "Movie"){
        searchMovie(search_bar.value());
    }
    else if (dropdown_value === "TV Show"){
        searchTV(search_bar.value());
    }
    else if (dropdown_value === "Actor"){
        searchActor(search_bar.value());
    }
    else if (dropdown_value === "User"){
        searchUser(search_bar.value());
    }
}


function searchMovie(value){
    let url = "https://api.themoviedb.org/3/search/movie?query=" + value + "&include_adult=false&language=en-US&page=1&api_key=" + TMDB_API_KEY;    
    loadJSON(url, function(inp){
    
    searchData = inp;
    searchResult = Array(20);
    background('darkgray');
    for (let i = 0; i < 20 ; i++){
        searchResult[i] = new Movie(searchData, i);
        print(searchResult[i]);
      }
      let x = 100;
      let y = 100;
      for (let i = 0; i < searchResult.length; i++){
        if (searchResult[i] != null){
            searchResult[i].display(x, y);
            y += 200;
        } 
      }
    });
}

function searchTV(value){
    let url = "https://api.themoviedb.org/3/search/tv?query=" + value + "&include_adult=false&language=en-US&page=1&api_key=" + TMDB_API_KEY;
    loadJSON(url, function(inp){
        searchData = inp;
        searchResult = Array(20);
        background('darkgray');

        x = 100;
        y = 100;
        for (let i = 0; i < 20; i++){
          searchResult[i] = new TvShow(searchData, i);
          searchResult[i].display(x,y);
          y += 200;
          print(searchResult[i]);
        }
    });
}

function searchActor(value){
    let url = "https://api.themoviedb.org/3/search/person?query=" + value + "&include_adult=false&language=en-US&page=1&api_key=" + TMDB_API_KEY;
    loadJSON(url, function(inp){
        searchData = inp;
        searchResult = new Array(20);
        background('darkgray');

        x = 100;
        y = 100;
        for (let i = 0; i < 20; i++){
          searchResult[i] = new Person(searchData, i);
          searchResult[i].display(x,y);
          y += 200;
          print(searchResult[i]);
        }
    });
}

function searchUser(value){

}

function fetchData() {
    keyval.set("test", input.value(), function (data) {
        keyval.get("test", function (data) {
            console.log(data);
        });
    });
}

function displayRecents() {
   fill("black");
   textSize(30);
   text("Recently Released Movies/Shows:", 50, 75);

   
}

function displayUpcoming() {
    let date = new Date;
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let day_result = day.toString().padStart(2, '0');
    let month_result = month.toString().padStart(2, '0');

    let min_date = `${year}-${month_result}-${day_result}`;
    let max_date;

    if (day + 7 > 31) {
        if (month + 1 > 12) {
            max_date = `${year + 1}-${(month + 1) % 12}-${(day + 7) - 31}`;
        } else {
            max_date = `${year}-${month + 1}-${day + 7 - 31}`;
        }
    } else {
        max_date = `${year}-${month_result}-${day + 7}`;
    }
    
    let url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&primary_release_date.gte=${min_date}&primary_release_date.lte=${max_date}&api_key=` + TMDB_API_KEY;
    
    if(searchResult == null){
    
        loadJSON(url, function (data) {
            upcomingMovie = Array(9);
            background('darkgray');
    
            for (let i = 0; i < 9; i++) {
                upcomingMovie[i] = new Movie(data, i);
                //print(upcomingMovie[i]);
            }
    
            let x = 100;
            let y = 600;
    
            for (let i = 0; i < upcomingMovie.length; i++) {
                if (upcomingMovie[i] != null) {
                    upcomingMovie[i].HomeDisplay(x, y,);
                    x += 180;
                }
            }
    
            fill("black");
            textSize(30);
            text("Upcoming Movies", 50, 400);
        });
    }
}