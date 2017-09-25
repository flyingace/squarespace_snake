# Snake
This game was built on top of [HTML5 Boilerplate](https://html5boilerplate.com/) though much of what that package ships
 with has been stripped out. It also makes use of the [lodash](https://lodash.com/) method [*isMatch()*](https://lodash.com/docs/4.17.4#isMatch) but apart from the bulk of the JavaScript code written to make this game 
 function uses vanilla JS including many ES6 elements.
 
 The game can be viewed and played here: [https://flyingace.github.io/squarespace_snake/](https://flyingace.github.io/squarespace_snake/).
 
 The code written for this project can be found in the ./src directory. The files in the ./docs directory are direct copies of those in ./src, added only to facilitate GitHub's hosting of the game on GitHub Pages.
 
 ## Notes
_Snake_ was built for a coding test and the project description for this test suggested that about 3 hours should be taken to complete the project and then to include notes as to what next steps would be. The code herein represents more than 3 hours of work. Once I began working on the project I found that I did not want to stop and turn in anything that was not a completely working solution, even if the code was rough. At 3 hours I had a working version of the game but continued to encounter a bug which periodically caused the game to end prematurely as it perceived (incorrectly) that the snake had collided with itself.\*

I would estimate that the 3 hour mark was reached roughly at [commit f12fb50c6d8965f34cff5bb62ba9e8641fb02000](https://github.com/flyingace/squarespace_snake/tree/f12fb50c6d8965f34cff5bb62ba9e8641fb02000)

### Next Steps
There are still ways in which the code for this project could be improved, but I am satisfied that at this point I have a  working version of game, coded cleanly. I'm sure there are things I have overlooked, but among others the game and it's code could possibly be improved by
1. Using ES6 Classes to break out portions of the code into components or modules. There could, for example, be a pixel class which handled all of the changes to its appearance and to detecting collisions with itself, screen edges or food.
2. More dynamism could be added to the way the game's dimensions are set up by not providing a fixed width for the screen, and amending the scss/css so that the nth child didn't float behind its sibling but instead began a new row.
3. There are a few game features that could be added such as the display of a score that updated as snake ate more food, A selector on the game's screen that would allow the player to choose a faster or slower version of the game, the addition of a countdown timer that would reset every time the snake ate food and perhaps the game over message could indicate the cause of the game ending.
4. Finally, I could hire an editor to cut the length of this readme doc in half.


### Footnotes (Really? Footnotes? Well, maybe just one.)
\*At the time I was checking to see if the pixel the snake was about to move into was already contained in the body of the snake by joining the snakePixels array into a string divided by hyphens and searching it for a match with a stringified version of the next pixel's coordinates. This was turning up false positives because strings like '4,10' could be found inside of '12,10-13,10-1**4,10**'.
