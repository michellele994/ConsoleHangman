var inquirer = require("inquirer");
var request = require("request");
var Word = require("./word.js");
var pokemon = [];

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
		var rand = Math.floor(Math.random()*pokemon.length);
		var wordToGuess = new Word(pokemon[rand]);
		ask();

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



function ask() 
{
	inquirer.prompt([
	{
		type: "input",
		name: "guess",
		message: "WHO'S THAT POKEMON? (Guess a letter)"
	}]).then(function(answer)
	{
		if (answer.guess === undefined || answer.guess.charAt(0) === " " || answer.guess.charAt(0) === "")
		{
			cl("You can't do that. You have to guess something.");
		}
		else if (answer.guess.length > 1)
		{
			cl("Too many at a time! Please enter only one character at a time.");
		}
		else if (answer.guess.charCodeAt(0) < 65 || (answer.guess.charCodeAt(0) > 90 && answer.guess.charCodeAt(0) < 97)  || answer.guess.charCodeAt(0) > 122)
		{
			cl("Don't be silly! Pick from the alphabet.");
		}
		else
		{
			answer.guess = answer.guess.toUpperCase();
			answer.guess = answer.guess.charAt(0);
			for (var i = 0; i < wordToGuess.wordArray.length; i++)
			{
				wordToGuess.wordArray[i].guess(answer.guess);
			}
			console.log(wordToGuess);
			console.log(wordToGuess+" ");
			if (!wordToGuess.hasFound())
			{
				ask();
			}
			else if (wordToGuess.hasFound())
			{
				console.log("I think you just won");
			}
		}
	});
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

