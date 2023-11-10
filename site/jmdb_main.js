let search_bar;
let search_button;
let search_dropdown;
let searchData;
let searchDiv;
let searchResult;
let login_input;
let login_button;
let user = null;
let users;
let user_json;
let profile_button;
let logout_button;
let search_val = "";
let to_favorite;
let upcomingMovie;
let trendingMovies;


function setup() {
    removeElements();
    createCanvas(windowWidth, 5000);
    searchDiv = createDiv();

    search_bar = createInput(search_val);
    search_bar.size(300);
    search_bar.position(windowWidth/2 - 150, 50);
    search_bar.class("search");

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
    login_input.position(1700, search_bar.y);
    login_button.position(login_input.x - 50, search_bar.y);
    login_button.mousePressed(login);
    
    logout_button = createButton("Logout");
    logout_button.position(login_input.x + 10, search_bar.y);
    logout_button.hide();
    logout_button.mousePressed(logout);

    profile_button = createButton("Profile");
    profile_button.position(login_input.x - 50, search_bar.y);
    profile_button.hide();
    profile_button.mousePressed(displayUserProfile);
    
    login();

    displayUpcoming();
    displayRecents();
    displayTrending();
}

function preload(){
    let key = "users";

    url = "https://keyval.learnscrum.xyz/keystore/users?apikey=YOUR_KEYVAL_API_KEY";
    loadJSON(url, function(data){
        user_json = data;
        users = Array(user_json.users.length);
        for (let i = 0; i < user_json.users.length; i++){
            users[i] = new User(user_json.users[i].username, user_json.users[i].favorite_movie_id);
        }
    });
}


function draw() {
    if (getItem('user') != null){
        login_button.hide();
        login_input.hide();
        profile_button.show();
        textSize(15)
        if (true){
            text(user.username, profile_button.x-50, 50);
        }
    }
}

function login(){
    /*
    ideas:
        store all users in a json file
        json structure
        array of users
            user_name
            favorite movie id 
            currently watching[] array of ids
            to_watch[] array of ids
    */
    print(getItem('user'));
    let user_found = false;
    if (login_input.value() === "" && getItem('user') == null){
        return;
    }
    if (users != null && getItem('user') == null){
        for (let i = 0; i < users.length; i++){
            if (users[i].username === login_input.value()){
                user = users[i];
                user_found = true;
                storeItem('user', user.username);
            }
        }
    }
    else if (getItem('user') != null){
        for (let i = 0; i < users.length; i++){
            if (users[i].username === getItem('user')){
                user = users[i];
                user_found = true;
            }
        }
    }
    else {
        users = Array(0);
    }
    if (!user_found){
        users.push(new User(login_input.value()));
    }
    login_button.hide();
    login_input.hide();
    profile_button.show();
    logout_button.show();
    saveUsers();
}


function logout(){
    user = null;
    login_button.show();
    login_input.show();
    logout_button.hide();
    profile_button.hide();
    storeItem('user', null);
    login_input.value("");
    background('darkgray');
}

function saveUsers(){
    let json = {};
    let json_string;
    let user_keyval = new Keyval(KEYVAL_API_KEY);
    let users_array_json = Array(users.length); 
    for (let i = 0; i < users.length; i++){
        users_array_json[i] = {};
        users_array_json[i]["username"] = users[i].username;
        users_array_json[i]["favorite_movie_id"] = users[i].favorite_movie_id;
    }
    json.users = users_array_json;
    json_string = JSON.stringify(json);
    print(json_string);
    user_keyval.set("users", json_string, function(){
        print("user save success");
    },
    function(){
        print("user save failed")
    });
    
}

function makeFavorite(){
    user.favorite_movie_id = to_favorite;
    saveUsers();
}

function searchType(){
    search_val = search_bar.value();
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

    if (trendingMovies != null) {
        for (let i = 0; i < trendingMovies.length; i ++) {
            trendingMovies[i].image.remove();
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
    searchResult = Array(searchData.results.length);
    background('darkgray');
    for (let i = 0; i < searchData.results.length ; i++){
        searchResult[i] = new Movie("search", searchData, i, search_bar.value());
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
          searchResult[i] = new TvShow(searchData, i, search_bar.value());
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
          searchResult[i] = new Person(searchData, i, search_bar.value());
          searchResult[i].display(x,y);
          y += 200;
          print(searchResult[i]);
        }
    });
}

function searchUser(value){

}

function displayUserProfile(){
    background('darkgray');
    if (searchResult != null){
        for (let i = 0; i < searchResult.length; i++){
            searchResult[i].image.remove();
            searchResult[i].button.remove();   
        }
    }
    user.display_profile_screen();
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
    
    fill("black");
    textSize(30);
    text("Upcoming Movies", 50, 400);

    if(searchResult == null){
    
        loadJSON(url, function (data) {
            upcomingMovie = Array(10);
            background('darkgray');
    
            for (let i = 0; i < 10; i++) {
                upcomingMovie[i] = new Movie("search", data, i, "");
                //print(upcomingMovie[i]);
            }
    
            let x = 50;
            let y = 700;
    
            for (let i = 0; i < upcomingMovie.length; i++) {
                if (upcomingMovie[i] != null) {
                    upcomingMovie[i].HomeDisplay(x, y,);
                    x += 140;
                }
            }
    
            
        });
    }
}

function displayTrending() {
    fill("black");
    textSize(30);
    text("Trending Movies:", 50, 200);

    let url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US" + "&api_key=" + TMDB_API_KEY;
    
    if (searchResult == null) {
        data = loadJSON(url, function(data){
            let trendingMovies = Array(10);
            background('darkgray');
            for (let i = 0; i < 10; i++) {
                trendingMovies[i] = new Movie("search", data, i, "");
            }
    
            let x = 50;
            let y = 400;
            
            for (let i = 0; i < trendingMovies.length; i++) {
                if (trendingMovies[i] != null) {
                    trendingMovies[i].displayHome(x, y);
                    x += 140;
                }
            }
        });
    }
    
}