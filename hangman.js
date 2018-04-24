//This is code for the game to run

var inquirer = require("inquirer");
var request = require("request");
var Word = require("./word.js");
var colors = require("colors");
var queryURL = "http://pokeapi.co/api/v2/pokemon/?limit=150";

//Using request, obtain information from pokeapi.
request(queryURL, function (error, response, body) {
	//If there is no error, run the game.
	if (!error) {
		//variable to obtain all the available pokemons from pokeapi
		var pokemon = [];
		//variable to idenfity all the letters that have already been attempted.
		var lettersTried = [];
		//variable to determine number of tries left.
		var numOfTries = 10;
		//variable to determine winning streak
		var streak = 0;

		//Parsing the body
		bodyObject = JSON.parse(body);
		//Searching through the bodyObject and forcing all letters to become uppercase
		for (var i = 0; i < 150; i++) {
			pokemon.push((bodyObject.results[i].name).toUpperCase());
		}
		//Certain characters in certain pokemons cannot be used by this app, therefore I am changing it manually here
		pokemon[121] = "MRMIME";
		pokemon[28] = "NIDORANF";
		pokemon[31] = "NIDORANM";

		//variable indicating the random pokemon word to guess from.
		var pokeToGuess = pokemon[Math.floor(Math.random() * pokemon.length)];
		//pass the chosen pokemon name to the Word constructor. 
		var wordToGuess = new Word(pokeToGuess);

		//cl is a console log function made prettier. See below to find the function.
		cl(colors.white("Do you want to be the very best?"));
		console.log(colors.cyan(wordToGuess + " \n"));

		//Run the game
		ask();

		function ask() {
			inquirer.prompt([
				{
					type: "input",
					name: "guess",
					message: colors.white("WHO'S THAT POKEMON? (Guess a letter)"),
					//Continue asking when the word has not been found yet and user still has tries left.
					when: function () {
						return (!wordToGuess.hasFound() && numOfTries > 0);
					}
				}]).then(function (answer) {
					//If user still has tries left
					if (numOfTries > 0) {
						//Ensuring that the guessed letter is valid.
						if (answer.guess === undefined || answer.guess.charAt(0) === " " || answer.guess.charAt(0) === "") {
							cl(colors.grey("You can't do that. You have to guess something."));
							console.log(colors.cyan(wordToGuess + " \n"));
							ask();
						}
						//If the user is trying to guess more than one character
						else if (answer.guess.length > 1) {
							cl(colors.grey("Too many at a time! Please enter only one character at a time."));
							console.log(colors.cyan(wordToGuess + " \n"));
							ask();
						}
						//If the user is trying to guess a character outside of the alphabet
						else if (answer.guess.charCodeAt(0) < 65 || (answer.guess.charCodeAt(0) > 90 && answer.guess.charCodeAt(0) < 97) || answer.guess.charCodeAt(0) > 122) {
							cl(colors.grey("Don't be silly! Pick from the alphabet."));
							console.log(colors.cyan(wordToGuess + " \n"));
							ask();
						}
						//Assuming that all potential odd characters that a user could enter had been controlled
						else {
							//Force the letter to be upper case
							answer.guess = answer.guess.toUpperCase();
							answer.guess = answer.guess.charAt(0);
							var alreadyTried = 0;
							//Determine if the letter had already been guessed.
							for (var i = 0; i < lettersTried.length; i++) {
								if (lettersTried[i] === answer.guess) {
									alreadyTried++;
								}
							}
							//If letter had already been guessed, let the user know.
							if (alreadyTried > 0) {
								cl(colors.grey("You already tried that letter, silly! Try another one."));
								console.log(colors.cyan(wordToGuess + " \n"));
								ask();
								alreadyTried = 0;
							}
							//Else, continue evaluating the letter guessed.
							else if (alreadyTried === 0) {
								//Push the letter into the array of lettersGuessed to mark that this letter had already been guessed.
								lettersTried.push(answer.guess);
								//This variable will assist in the following for loop that will identify if there had been any changes made after the user had guessed
								var numChanges = 0;
								for (var i = 0; i < wordToGuess.wordArray.length; i++) {
									if (answer.guess === wordToGuess.wordArray[i].letter) {
										wordToGuess.wordArray[i].guess(answer.guess);
										numChanges++;
									}
								}
								//If there were no changes made, that means that the letter did not fit and user loses a try
								if (numChanges === 0) {
									numOfTries--;
									cl(colors.red("Wrong! Number of tries left: " + numOfTries));
								}
								//Else, let user know that they have gotten a correct letter.
								else {
									cl("CORRECT!");
									numChanges = 0;
								}
								console.log(colors.cyan(wordToGuess + " \n"));

								//Check to see if the word had been found.
								//If not, keep asking.
								//Else, console log that the user has won.
								if (!wordToGuess.hasFound()) {
									ask();
								}
								else if (wordToGuess.hasFound()) {
									numOfTries = 10;
									lettersTried = [];
									pokeToGuess = pokemon[Math.floor(Math.random() * pokemon.length)];
									wordToGuess = new Word(pokeToGuess);
									streak++;
									cl("YOU WON!!!! You put the 'COOL' in 'TENTACOOL'! Keep going!! Streak: " + streak);
									console.log(colors.cyan(wordToGuess + " \n"));
									ask();
								}
							}
						}
					}
					//If user has no more tries left, let them know that they have lost
					else if (numOfTries <= 0) {
						cl("You lost! You are as useful as a Magikarp. The answer is: " + pokeToGuess + "\nYou had a streak of " + streak);
						streak = 0;
					}
				});
		}

	}
	else {
		console.log(error);
	}
})


function cl(text) {
	console.log(colors.white("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n") + text + colors.white("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));
}
