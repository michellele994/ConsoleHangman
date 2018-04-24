# ConsoleHangman
This project was a homework due for the Trilogy & University of Arizona Coding Bootcamp. This project was intended to hone my skills in
 * Using NPM packages
 * Javascript
 * jQuery
 * request
 * Node


The homework for this project instructed me to construct a console log node hangman game.

To use, follow these steps
 1. Clone the repository using the link under "Live Demonstration" below.
 2. Once cloned, install all the dependencies using the following code
    ```
    npm install
    ```
 3. Now you can run the game by running the following command into the command line:
    ```
    node hangman.js
    ```
 4. After running the command, the game begins! A series of "_" will be displayed indicating a hidden letter, and you will be prompted to enter guesses.
    * The game ensures that a user does not enter willy-nilly guesses. Guess have to be single letters.
    * The game will measure the amount of tries the player has left, and prompt the user to continue guessing or notify them if they had lost as appropriate.
    * The game will also notify whether or not the user has correctly guessed a word.
 5. After a user correctly guesses a word, a streak count will be kept and then the game will be restarted with the next randomly chosen word.
    * If the user has lost, streak count will be resetted. 

## Live Demonsration
This application is not hosted on the web. Please clone the repository [here](https://michellele994.github.io/ConsoleHangman/) and follow the instructions above.

## Improvements to be made
 * Better use of the constructors
 * Break down the ask() function in hangman.js to smaller, more manageable and easy to evaluate functions.

## Acknowledgements
Bootcamp Instructor: Jan Jorgensen
Bootcamp TAs: Joel Borjorquez, Peter Fesz-Nguyen, and Nicholas Green

Copyright 2018 Michelle Le