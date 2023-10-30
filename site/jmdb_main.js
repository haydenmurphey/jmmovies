
let search_bar;
let search_button;
let search_dropdown;

function setup() {

    search_bar = createInput();
    search_bar.position(200,25);
    search_bar.size(300);

    search_button = createButton("Search");
    search_button.position(500,25);

    search_dropdown = createSelect();
    search_dropdown.position(125,25);
    search_dropdown.size(75);
    search_dropdown.option("Movie");
    search_dropdown.option("Movie");


    keyval = new Keyval(KEYVAL_API_KEY);

}

function draw() {
}

function fetchData() {
    keyval.set("test", input.value(), function (data) {
        keyval.get("test", function (data) {
            console.log(data);
        });
    });
}