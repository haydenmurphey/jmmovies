
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

function setup() {
    getUsers();
    removeElements();
    createCanvas(windowWidth, 5000);
    searchDiv = createDiv();

    search_bar = createInput();
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
    //let saveButton = createButton("save");
    //saveButton.position(1600,50);
    //saveButton.mousePressed(saveUsers);
    profile_button = createButton("Profile");
    profile_button.position(login_input.x - 50, search_bar.y);
    profile_button.hide();
    profile_button.mousePressed(displayUserProfile);
    
    displayRecents();
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
    if (user != null){
        login_button.hide();
        login_input.hide();
        profile_button.show();
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
    let user_found = false;
    if (login_input.value() === ""){
        return;
    }
    if (users != null){
        for (let i = 0; i < users.length; i++){
            if (users[i].username === login_input.value()){
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
    saveUsers();
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

function getUsers(){
    
}

function searchType(){
    if (searchResult != null){
        for (let i = 0; i < searchResult.length; i ++){
            searchResult[i].image.remove();
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
        searchResult[i] = new Movie("search", searchData, i);
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