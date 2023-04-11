const prompt = require('prompt-sync')({ sigint: true });
const clear = require('clear-screen');

const height = 10;       //row
const width = 10;        //col
const floor = "░"
const pathCharacter = '*'; //default position @ (0, 0)
const hat = "^";
const hole = "O";
const field = [[]];       //An empty 2D array
const bombNumber = Math.floor((Math.random() * 7 + 8));
let x = 0;
let y = 0;
let winGame = false;
let outOfBound = false;

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
function print(optionalText = null) {
    clear();
    const displayString = field.map(row => {    //map
        return row.join('');
    }).join('\n');      // \n: is next line
    console.log(displayString);     //convert to string
    getWord = displayString.toString().replace('\n', '');
    console.log("");
    if (optionalText) { //if (string as it is) - it will be considered if string is NOT NULL;
        console.log(optionalText);
    }
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

//create a function to check for win conditions/out of bound/win
function checkCanMove(x, y) {
    if (x > 9 || x < 0 || y > 9 || y < 0) {
        outOfBound = true;
        winGame = false;
        return false;
    } else if (field[x][y] == hat) {
        winGame = true;
        return false;
    } else if (field[x][y] == hole) {
        winGame = false;
        return false;
    } else {
        return true;
    }
}

function askForInput() {
    const userInput = prompt("Please input your direction: ").toUpperCase();

    let movedX = x; //declare movedX as prediction
    let movedY = y; //declare movedY as prediction

    let checkMove = true;

    //make use of switchcase to capture the only 4 possible options
    switch (userInput) {
        case "D":
            movedX = x + 1; //movedX is predicting  
            checkMove = checkCanMove(movedX, movedY); //make use of function checkCanMoved(arg1, arg2) to return true/false value;
            if (!checkMove) { //if checkMove is NOT true
                return checkMove;
            }
            field[x][y] = floor;
            x = movedX;
            break;
        case "U":
            movedX = x - 1;
            checkMove = checkCanMove(movedX, movedY);
            if (!checkMove) {
                return checkMove;
            }
            field[x][y] = floor;
            x = movedX;
            break;

        case "R":
            movedY = y + 1; //movedY is predicting  
            checkMove = checkCanMove(movedX, movedY); //make use of function checkCanMoved(arg1, arg2) to return true/false value;
            if (!checkMove) { //if checkMove is NOT true
                return checkMove;
            }
            field[x][y] = floor;
            y = movedY;
            break;

        case "L":
            movedY = y - 1;
            checkMove = checkCanMove(movedX, movedY);
            if (!checkMove) {
                return checkMove;
            }
            field[x][y] = floor;
            y = movedY;
            break;

        default:
            print("Enter only U, D, L or R");
            return true;
    }

    field[movedX][movedY] = pathCharacter;
    print();
    return true;
}
// if (userInput == "D") {
//     field[x + 1][y] = pathCharacter;
//     x += 1;
// }
// else if (userInput == "U") {
//     field[x - 1][y] = pathCharacter;
//     x -= 1;
// }
// else if (userInput == "L") {
//     field[x][y - 1] = pathCharacter;
//     y -= 1;
// }
// else if (userInput == "R") {
//     field[x][y + 1] = pathCharacter;
//     y += 1;
// }
function startGame() {
    let isPlaying = true;
    while (isPlaying) {                 //this will loop until isPlaying become false, which is determined by askForInput()'s return value
        isPlaying = askForInput();
    }
    if (winGame) {
        console.log(`Congrats, you found your hat!`);
    } else {
        if (outOfBound) {
            console.log(`Out of bounds - Game End!`);
        } else {
            console.log(`You fell into a hole!`);
        }
    }
}
generatePlayingField();
startGame();

