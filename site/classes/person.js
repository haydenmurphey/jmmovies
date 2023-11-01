class Person{
    constructor(actorJson, num){
        this.name = actorJson.results[num].name;
        this.id = actorJson.results[num].id;
        this.imgPath = actorJson.results[num].profile_path;
        this.image = createElement("img");
    }

    getImage(){
        return "https://image.tmdb.org/t/p/w600_and_h900_bestv2" + this.imgPath; 
    }

    display(x, y){
        this.image.position(x, y);
        this.image.attribute("src", this.getImage());
        this.image.size(120,180);
        if(this.imgPath == null){
            this.image.attribute("src","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAAMFBMVEXk5ueutLewt7np6+ursbTh4+SzubzBxsjT1ti6v8Lc3+DIzM7X2tvM0NLFyczP09R8ZhjBAAAC4klEQVR4nO2a2XLrIAyGDcJsXvL+b3swdVO3dUCyJXJmyj+9ykX5RguSJYahq6urq6urq6urq6vr7wngnYcP0U8uBLcuc3wDCYzeaWU+pfQ6NyYYV5vOPcoY61sSTD/O3ymsb+QOmNUZQIYIYxOE6RXAxqBbhIQrEGwQD3FnhDJBA4YqQWJYRAkqXtglmJ3wQBEoJZcXI5JAWTEEiySQCwesG5K0kCvQRkhmmEQyc8EbQQlFJMEImxkECGaSEZTi9wSsNATDX6+AaASzsiNEIoIK7Ai0fNjMwI6AK1BHBPZgCESC1DdwI5BuhYywcqcllUApx4yArtNfCh1BAOFCLLAjkDOCPRwv3AsLN4IjI7C38sRanRDY+yZqxyLRyL+/WAMxJfirFOkrIiPwEwwjjYD9YkoCWtMiMm0hdY9WZs5BMINAC5+Fr5aGPyN3lWZt3xHEZhyAmDRlAsFpEy4xDXuZPmrGEIgFws5Qd4UVHgJDjcHIjbqeej0Eb+GFD42FvBAZrpwIltN1xDaHj632QzBMJ94wVn4If9Q4WXWwhTE6tF5Obfu5R9Cfeeh8m3XMb4zEkTS+ZVkJ6dAxxnn2+S9x5J9anZ7O9ouzVucYyFtKpbS1YfWbQeTP91Ow5jwpt5+DE91WQpzCi9O/gdh1FnEKxOXngrZAod3M7JJk/1AsDWe2eHDmKSQDUM7fKTTfDHihGeBoimnkcIfXFwEyhLpdOiEiO9bXEDffFAC6bS9B3Oli4pUoPGEwV981gOc4/wPiWm6wOOHJcMkZ5AVEmeFCa383E36JvMBlJ6B+4hAnKkhpCgFnJB6E/9BCv5SgCv/JHWUAFH4YCTx34jkDDoG8FKUgoMaRtBEnmQFRN6kbeqoQWSFrBIwZpI2AMYOu/5Obqn2Be2kjVO8n7HDzFkMFQZ6gNiInPxe5glDu6yVvxqfKTZx4Sm4qp2WDaEwqI+gGqrx/gxYqEnR1dXV1/S/6BzA0IDjtXgNsAAAAAElFTkSuQmCC");
        }
        fill("black");
        textSize(30);
        textWrap(WORD);
        if(this.name == ""){
            text("NO NAME FOUND", x + 200, y, 1000);
        } else {
            text(this.name, x + 200, y, 1000);
        }
    }
}