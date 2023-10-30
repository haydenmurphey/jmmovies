
let search_bar;
let search_button;
let search_dropdown;
let searchData;


function setup() {

    search_bar = createInput();
    search_bar.position(200,25);
    search_bar.size(300);

    search_dropdown = createSelect();
    search_dropdown.position(125,25);
    search_dropdown.size(75);
    search_dropdown.option("Movie");
    search_dropdown.option("TV Show");
    search_dropdown.option("Actor");
    search_dropdown.option("User");
    
    search_button = createButton("Search");
    search_button.position(507,25);
    search_button.mousePressed(searchType);
    
    keyval = new Keyval(KEYVAL_API_KEY);

}

function draw() {

}

function searchType(){
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
    })
}

function searchTV(value){
    let url = "https://api.themoviedb.org/3/search/tv?query=" + value + "&include_adult=false&language=en-US&page=1&api_key=" + TMDB_API_KEY;
    loadJSON(url, function(inp){
        searchData = inp;
    })
}

function searchActor(value){
    let url = "https://api.themoviedb.org/3/search/person?query=" + value + "&include_adult=false&language=en-US&page=1&api_key=" + TMDB_API_KEY;
    loadJSON(url, function(inp){
        searchData = inp;
    })
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