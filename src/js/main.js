"use strict";

//generate initial 2-d array for game's screen of pixels
let row = new Array(20);
row.fill('b');
let grid = new Array(20);
grid.fill(row);

const screen = document.querySelector('#screen');
let snakePixels = [[12,5], [13,5]];
let direction = [-1,0];

//render initial screen of pixels from grid array
//TODO: With the current approach the need for the initial row and grid arrays is nil
function setUpScreen() {
    let htmlForPixels = '';
    
    grid.forEach(function(row, rIdx) {
        row.forEach(function(cell, cIdx) {
            htmlForPixels += `<div class="screen-pixel" id='r${rIdx}c${cIdx}'></div>`
        })
    });
    screen.innerHTML = htmlForPixels;
}

//convert 2 pixels in grid to snake pixels
function setUpSnake() {
    snakePixels.forEach(function(snakePixel) {
        paintSnakePixel(snakePixel);
    })
}

function addListeners() {
    document.addEventListener('keydown', onKeyDown);
}

//add 'snake' class to pixel
function paintSnakePixel(snakePixel) {
    document.querySelector(`#r${snakePixel[0]}c${snakePixel[1]}`).className += ' snake';
}

//remove 'snake' class from pixel
function unPaintSnakePixel(snakePixel) {
    document.querySelector(`#r${snakePixel[0]}c${snakePixel[1]}`).className = 'screen-pixel';
}

//snake moves in same direction unless prompted by arrow keys
//arrow keys alter direction
//direction is just where to add the next pixel in relation to the current pixel
//every turn a new pixel is added to the front and a pixel is taken from the rear
//unless the snake encounters "food"
//snake is represented by an array which corresponds to the grid & row arrays?

function turn() {
    const newPixel = getNewPixel();
    const lastPixel = snakePixels[snakePixels.length - 1];
    //get coordinates of new pixel in direction
    if (checkForCollision(newPixel)) {
        //? is new pixel hitting self?
        //game is over
        console.log('Game Over');
    } else {
        //add pixel to snakePixels
        snakePixels.unshift(newPixel);
        //paint new pixel as snake
        paintSnakePixel(newPixel);
        snakePixels.pop();
        unPaintSnakePixel(lastPixel);
    }


    //? is new pixel hitting food?
        //remove food
        //add new food on screen
    //removePixelFromBack();
}

function checkForCollision(newPixel) {
    //is either coordinate more than 19 or less than 0?
    const hasHitEdge = (newPixel[0] > 19 || newPixel[0] < 0 || newPixel[1] > 19 || newPixel[1] < 0);
    //is the new coordinate already in the snakePixels array?
    const hasHitSelf = (snakePixels.join('-').search(newPixel.join('')) > -1);

    return (hasHitEdge || hasHitSelf);
}

function changeDirection(indx) {
    direction = directions[indx];
}

function onKeyDown(evt) {
    switch(evt.key) {
    case 'ArrowUp':
        direction = [-1,0];
        break;
    case 'ArrowDown':
        direction = [+1,0];
        break;
    case 'ArrowRight':
        direction = [0,1];
        break;
    case 'ArrowLeft':
        direction = [0,-1];
        break;
    default:
        break;
    }
}

function covertCoordsToId(coords) {
    return 'r' + coords[0] + 'c' + coords[1];
}

function getNewPixel() {
    let currentPixel = snakePixels[0];
    return [currentPixel[0] + direction[0], currentPixel[1] + direction[1]]
}

setUpScreen();
setUpSnake();
addListeners();

window.setInterval(turn, 500);

