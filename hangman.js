var inquirer = require("inquirer");
var request = require("request");
var Word = require("./word.js");
var colors = require("colors");
var queryURL = "http://pokeapi.co/api/v2/pokemon/?limit=150";
request(queryURL, function(error, response, body)
{
	if (!error)
	{
		var pokemon = [];
		var lettersTried = [];
		var numOfTries = 10;
		var streak = 0;

		bodyObject = JSON.parse(body);
		for (var i = 0; i < 150; i++)
		{
			pokemon.push((bodyObject.results[i].name).toUpperCase());
		}
		pokemon[121] = "MRMIME";
		pokemon[28] = "NIDORANF";
		pokemon[31] = "NIDORANM";

		var pokeToGuess = pokemon[Math.floor(Math.random()*pokemon.length)];
		var wordToGuess = new Word(pokeToGuess);
		cl(colors.white("Do you want to be the very best?"));
		console.log(colors.cyan(wordToGuess+" \n"));
		ask();

		function ask() 
		{
			inquirer.prompt([
			{
				type: "input",
				name: "guess",
				message: colors.white("WHO'S THAT POKEMON? (Guess a letter)"),
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
						cl(colors.grey("You can't do that. You have to guess something."));
						console.log(colors.cyan(wordToGuess+" \n"));
						ask();
					}
					else if (answer.guess.length > 1)
					{
						cl(colors.grey("Too many at a time! Please enter only one character at a time."));
						console.log(colors.cyan(wordToGuess+" \n"));
						ask();
					}
					else if (answer.guess.charCodeAt(0) < 65 || (answer.guess.charCodeAt(0) > 90 && answer.guess.charCodeAt(0) < 97)  || answer.guess.charCodeAt(0) > 122)
					{
						cl(colors.grey("Don't be silly! Pick from the alphabet."));
						console.log(colors.cyan(wordToGuess+" \n"));
						ask();
					}
					else
					{
						answer.guess = answer.guess.toUpperCase();
						answer.guess = answer.guess.charAt(0);
						var alreadyTried = 0;
						for (var i = 0; i < lettersTried.length; i++)
						{
							if (lettersTried[i] === answer.guess)
							{
								alreadyTried++;
							}
						}
						if (alreadyTried > 0)
						{
							cl(colors.grey("You already tried that letter, silly! Try another one."));
							console.log(colors.cyan(wordToGuess+" \n"));
							ask();
							alreadyTried = 0;
						}
						else if (alreadyTried === 0)
						{
							lettersTried.push(answer.guess);
							var numChanges = 0;
							for (var i = 0; i < wordToGuess.wordArray.length; i++)
							{
								if (answer.guess === wordToGuess.wordArray[i].letter)
								{
									wordToGuess.wordArray[i].guess(answer.guess);
									numChanges++;
								}
							}
							if (numChanges === 0)
							{
								numOfTries--;
								cl(colors.red("Wrong! Number of tries left: " + numOfTries));
							}
							else
							{
								cl("CORRECT!");
								numChanges = 0;
							}
							console.log(colors.cyan(wordToGuess+" \n"));


							if (!wordToGuess.hasFound())
							{
								ask();
							}
							else if (wordToGuess.hasFound())
							{
								numOfTries = 10;
								lettersTried = [];
								pokeToGuess = pokemon[Math.floor(Math.random()*pokemon.length)];
								wordToGuess = new Word(pokeToGuess);
								streak++;
								cl("YOU WON!!!! You put the 'COOL' in 'TENTACOOL'! Keep going!! Streak: " + streak);
								console.log(colors.cyan(wordToGuess+" \n"));
								ask();
							}
						}
					}
				}
				else if (numOfTries <= 0)
				{
					cl("You lost! You are as useful as a Magikarp. The answer is: " + pokeToGuess +"\nYou had a streak of " + streak);
					streak = 0;
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
	console.log(colors.white("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n") + text + colors.white("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"));
}
