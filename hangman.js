var inquirer = require("inquirer");
var request = require("request");
var Word = require("./word.js");
var pokemon = [];
var lettersTried = [];
var numOfTries = 10;
var queryURL = "http://pokeapi.co/api/v2/pokemon/?limit=150";
request(queryURL, function(error, response, body)
{
	if (!error)
	{
		bodyObject = JSON.parse(body);
		for (var i = 0; i < 150; i++)
		{
			pokemon.push((bodyObject.results[i].name).toUpperCase());
		}
		var pokeToGuess = pokemon[Math.floor(Math.random()*pokemon.length)];
		var wordToGuess = new Word(pokeToGuess);
		cl("Let's play a game!")
		console.log(wordToGuess+" \n");
		ask();



		function ask() 
		{
			inquirer.prompt([
			{
				type: "input",
				name: "guess",
				message: "WHO'S THAT POKEMON? (Guess a letter)",
				when: function()
				{
					return (!wordToGuess.hasFound() && numOfTries > 0);
				}
			}]).then(function(answer)
			{
				if (numOfTries > 0)
				{
					if (answer.guess === undefined || answer.guess.charAt(0) === " " || answer.guess.charAt(0) === "")
					{
						cl("You can't do that. You have to guess something.");
						ask();
					}
					else if (answer.guess.length > 1)
					{
						cl("Too many at a time! Please enter only one character at a time.");
						ask();
					}
					else if (answer.guess.charCodeAt(0) < 65 || (answer.guess.charCodeAt(0) > 90 && answer.guess.charCodeAt(0) < 97)  || answer.guess.charCodeAt(0) > 122)
					{
						cl("Don't be silly! Pick from the alphabet.");
						ask();
					}
					else
					{
						answer.guess = answer.guess.toUpperCase();
						answer.guess = answer.guess.charAt(0);
						var hadTried = 0;
						for (var i = 0; i < lettersTried.length; i++)
						{
							if (lettersTried[i] === answer.guess)
							{
								hadTried++;
							}
							else
							{
								lettersTried.push(answer.guess);
								console.log(lettersTried);
							}
						}
						if (hadTried > 0)
						{
							cl("You already tried that letter, silly! Try another one.");
							hadTried = 0;
							ask();
						}
						var numFound  = 0;
						for (var i = 0; i < wordToGuess.wordArray.length; i++)
						{
							if (answer.guess === wordToGuess.wordArray[i].letter)
							{
								wordToGuess.wordArray[i].guess(answer.guess);
								numFound++;
							}
						}
						if (numFound === 0)
						{
							numOfTries--;
							console.log("\nWrong! Number of tries left: " + numOfTries + "\n");
						}
						else
						{
							console.log("\nCORRECT!\n")
							numFound = 0;
						}
						// console.log(wordToGuess);
						console.log(wordToGuess+" \n");


						if (!wordToGuess.hasFound())
						{
							ask();
						}
						else if (wordToGuess.hasFound())
						{
							cl("YOU WON!!!! Keep going!! New pokemon!");
							numOfTries = 10;
							pokeToGuess = pokemon[Math.floor(Math.random()*pokemon.length)];
							wordToGuess = new Word(pokeToGuess);
							console.log(wordToGuess+" \n");
							ask();
						}
					}
				}
				else if (numOfTries <= 0)
				{
					console.log("You lost! The answer is: " + pokeToGuess + ". Keep studying.");
				}
			});
		}

	}
	else
	{
		console.log(error);
	}
})


function cl (text)
{
	console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n" + text + "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
}





//prompt, are you ready to play?

//start the game
//pick a random word from the array and put it through the word.js


// cat.wordArray[1].guess("a");
// cat.wordArray[2].guess("s");
// cat.wordArray[3].guess("o");
// cat.wordArray[4].guess("n");

// wordToGuess.hasFound();

// console.log(wordToGuess + " ");
// console.log(wordToGuess);

