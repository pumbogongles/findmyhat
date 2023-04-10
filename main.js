const prompt = require('prompt-sync')({ sigint: true });
const clear = require('clear-screen');

const height = 10;       //row
const width = 10;        //col
const floor = "░"
const pathCharacter = '*'; //default position @ (0, 0)
const hat = "^";
const hole = "O";
const field = [[]];       //An empty 2D array
const bombNumber = Math.floor((Math.random() * 6 + 9));
const allowedLetters = ["U","u", "D","d", "L","l", "R",]
let currentPosition = []
let x = 0;
let y = 0;
let blownUp = false;
let winGame = false;


function generatePlayingField() {
    for (let row = 0; row < height; row++) {
        field[row] = [];
        for (let col = 0; col < width; col++) {
            field[row][col] = floor;
            console.log(field[row][col]);

        }
    }
    populateBombsInMap();
    print();
}

//function to make my map appear properly 10 by 10.
function print() {
    clear();
    const displayString = field.map(row => {    //map
        return row.join('');
    }).join('\n');      // \n: is next line
    console.log(displayString);     //convert to string
    getWord = displayString.toString().replace('\n', '');

    askForInput();
}

//create a function to populate the map with bombs between 1-10 for both X & Y coordinates
function populateBombsInMap() {
    for (i = 0; i < bombNumber; i++) {
        let xCordinate = Math.floor((Math.random() * 10) + 1);
        let yCordinate = Math.floor((Math.random() * 10) + 1);
        field[xCordinate - 1][yCordinate - 1] = hole;
    }
    //populate the hat within the map, outside of loop so only happens once
    let hatCordinateX = Math.floor((Math.random() * 10) + 1);
    let hatCordinateY = Math.floor((Math.random() * 10) + 1);
    field[hatCordinateX - 1][hatCordinateY - 1] = hat;
    //populate the player
    field[x][y] = pathCharacter;
}



function askForInput() {
    const userInput = prompt("Please input your direction: ").toUpperCase();
    if (field[x + 1][y] == hole) {
        blownUp = true;
        return console.log("You got blown up");
    } else {
        if (userInput == "D") {
            field[x + 1][y] = pathCharacter;
            x += 1;
        }
        else if (userInput == "U") {
            field[x - 1][y] = pathCharacter;
            x -= 1;
        }
        else if (userInput == "L") {
            field[x][y - 1] = pathCharacter;
            y -= 1;
        }
        else if (userInput == "R") {
            field[x][y + 1] = pathCharacter;
            y += 1;
        }
    }
    print();
}




function startGame() {
    let isPlaying = true;
    while (isPlaying) {
        print();
        if (field[x][y] == hole) {
            return console.log(`You got blown up!`);
            break;
        } else if (field[x] < 0 || field[y] < 0) {
            console.log(`You are out of bounds`);
            break;
        } else if (field[x][y] == hat) {
            console.log(`You found the hat! You win!`)
            break;
        }
        else askForInput();
    }
}
generatePlayingField();
askForInput();

