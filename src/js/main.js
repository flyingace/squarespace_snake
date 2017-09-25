"use strict";

const rowLength = 20;
const columnLength = 20;
const screen = document.querySelector('#screen');
const startButton = document.querySelector('#start-button');
const gameMessageField = document.querySelector('#game-message-field');
const startingSnakePixels = [[12, 5], [13, 5]];
const startingDirection = [-1, 0];
let snakePixels;
let direction;
let turnInterval;
let foodPixel = [];

/**
 * Generate
 * Render an empty game screen
 */
function setUpScreen() {
    let htmlForPixels = '';

    for (let row = 0; row < rowLength; row++) {
        for (let col = 0; col < columnLength; col++) {
            htmlForPixels += `<div class="screen-pixel" id='r${row}c${col}'></div>`
        }
    }

    screen.innerHTML = htmlForPixels;
}

/**
 * Initial setup of snake on screen
 * setting the value of snakePixels to the default
 * updating the style of the snakePixels so they display the snake's color
 * setting the value of direction to the default
 */
function setUpSnake() {
    snakePixels = Array.from(startingSnakePixels);
    snakePixels.forEach(function (snakePixel) {
        paintPixel(snakePixel, 'snake');
    });
    direction = Array.from(startingDirection);
}

/**
 * Adding the keydown listener
 */
function addListeners() {
    document.addEventListener('keydown', onKeyDown);
}

/**
 * Randomly generate a pixel location on the game screen.
 * If those coordinates aren't part of the snake
 * style the pixel and set foodPixel to those coordinates.
 * If it is part of the snake start over (recursively).
 */
function addFood() {
    const foodPixelCoords = generateRandomCoordinates();
    if (!isPixelInSnake(foodPixelCoords)) {
        paintPixel(foodPixelCoords, 'food');
        foodPixel = foodPixelCoords;
    } else {
        addFood();
    }
}

/**
 * Style the pixel at pixelCoordinates by adding the value of type to the element's class names.
 * The screen is styled by passing an empty string ('') as type.
 * @param pixelCoords
 * @param type
 */
function paintPixel(pixelCoords, type) {
    document.querySelector(`#r${pixelCoords[0]}c${pixelCoords[1]}`).className = 'screen-pixel ' + type;
}

/**
 *  Function handles actions which occur on each turn to simulate the snake's moving across the screen
 *  and check whether the snake has "eaten food" or collided with itself or the wall
 * @returns {boolean}
 */
function turn() {
    const nextPixel = getNextPixel();
    const lastPixel = snakePixels[snakePixels.length - 1];

    if (checkForCollision(nextPixel)) {
        endGame();
        return false;
    } else {
        addNextPixel(nextPixel);
    }

    if (!_.isMatch(nextPixel, foodPixel)) {
        removeLastPixel(lastPixel);
    } else {
        addFood();
    }
}

/**
 * Determine where the snake's "head" will be next and set coordinates as an array
 * @returns {[x,y]}
 */
function getNextPixel() {
    let currentPixel = snakePixels[0];
    return [currentPixel[0] + direction[0], currentPixel[1] + direction[1]]
}

/**
 * Add the nextPixel's coordinate array to snakePixels
 * and update the style of the pixel so it displays the snake's color
 * @param nextPixel
 */
function addNextPixel(nextPixel) {
    snakePixels.unshift(nextPixel);
    paintPixel(nextPixel, 'snake');
}

/**
 * Remove the last pixel's coordinate array from snakePixels
 * and update the style of the pixel so it displays the screen's color
 * @param lastPixel
 */
function removeLastPixel(lastPixel) {
    snakePixels.pop();
    paintPixel(lastPixel, '');
}

/**
 * Check to see whether the next pixel's coordinates will place it
 * either outside of the grid or colliding with itself
 * @param pixelCoords
 * @returns {boolean}
 */
function checkForCollision(pixelCoords) {
    const hasHitEdge = (
        pixelCoords[0] >= rowLength ||
        pixelCoords[0] < 0 ||
        pixelCoords[1] >= columnLength ||
        pixelCoords[1] < 0);

    const hasHitSelf = isPixelInSnake(pixelCoords);

    return (hasHitEdge || hasHitSelf);
}

/**
 * Check whether the coordinate array for a pixel
 * matches any of the pixel coordinate arrays in snakePixels
 * @param pixelCoords
 * @returns {boolean}
 */
function isPixelInSnake(pixelCoords) {
    return snakePixels.some(function (snakePixel) {
        return _.isMatch(snakePixel, pixelCoords);
    })
}

/**
 * After a keydown event occurs, if any of the arrow keys have been pressed,
 * update the value of direction accordingly
 * @param evt
 */
function onKeyDown(evt) {
    switch (evt.key) {
    case 'ArrowUp':
        direction = [-1, 0];
        break;
    case 'ArrowDown':
        direction = [+1, 0];
        break;
    case 'ArrowRight':
        direction = [0, 1];
        break;
    case 'ArrowLeft':
        direction = [0, -1];
        break;
    default:
        break;
    }
}

/**
 * Generate two random values from 0-19 inclusive
 * and return them as values in an array
 * @returns {[x,y]}
 */
function generateRandomCoordinates() {
    const x = Math.floor(Math.random() * 20);
    const y = Math.floor(Math.random() * 20);
    return [x, y];
}

/**
 * Call functions which perform game setup actions
 */
function setupGame() {
    setUpScreen();
    setUpSnake();
    addListeners();
}

/**
 * Call functions which start game play
 * clear any existing messages
 * remove the event listener on the "Start" button
 * and cause turns to occur at a set interval
 */
function startGame() {
    gameMessageField.innerHTML = ``;
    startButton.removeEventListener('click', startGame);
    setupGame();
    addFood();
    turnInterval = setInterval(turn, 150);
}

/**
 * Call functions which end game play
 * preventing further turns from occurring
 * displaying a message which alerts the player to the end of the game
 * and re-add the event listener to the "Start" button so the game can be played again
 */
function endGame() {
    clearInterval(turnInterval);
    gameMessageField.innerHTML = `GAME OVER<br/>Congratulations! Your score was ${snakePixels.length - 2}!<br/><br/>
Press the <strong>Start</strong> button to play again.`;
    startButton.addEventListener('click', startGame);
}

/**
 * Add message for the first time the game loads,
 * add the event listener for the Start button
 * and call the setupGame method to load the start screen
 */
function firstTimeSetup() {
    gameMessageField.innerHTML = `Press the <strong>Start</strong> button to play.`;
    startButton.addEventListener('click', startGame);
    setupGame();
}

firstTimeSetup();
