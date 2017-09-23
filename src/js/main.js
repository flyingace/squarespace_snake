"use strict";

//generate initial 2-d array for game's screen of pixels
let row = new Array(20);
row.fill('b');
let grid = new Array(20);
grid.fill(row);

const screen = document.querySelector('#screen');

//render initial screen of pixels from grid array
function setUpScreen() {
    let htmlForPixels = ''
    grid.forEach(function(row, rIdx) {
        row.forEach(function(cell, cIdx) {
            htmlForPixels += `<div class="screen-pixel" id='r${rIdx}c${cIdx}'></div>`
        })
    });
    screen.innerHTML = htmlForPixels;
}

//convert 2 pixels in grid to snake pixels
function setUpSnake() {
    const snakeStarter = ['r12c5', 'r13c5'];
    paintSnake(snakeStarter);
}

//add 'snake' class to pixels
function paintSnake(snakePixels) {
    snakePixels.forEach(function(snakePixel) {
        document.querySelector(`#${snakePixel}`).className += ' snake';
    })
}

//remove 'snake' class from pixels
function unPaintSnake(snakePixels) {
    snakePixels.forEach(function(snakePixel) {
        document.querySelector(`#${snakePixel}`).className = 'screen-pixel';
    })
}

setUpScreen();
setUpSnake();
