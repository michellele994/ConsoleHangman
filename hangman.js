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
		console.log(pokemon[149]);
		var rand = Math.floor(Math.random()*pokemon.length);
		var wordToGuess = new Word(pokemon[rand]);
	}
	else
	{
		console.log(error);
	}
})



// var userGuess = process.argv[2];
// if (userGuess === undefined || userGuess.charAt(0) === " " || userGuess.charAt(0) === "")
// {
// 	console.log("You can't do that");
// }
// else if (userGuess.length > 1)
// {
// 	console.log("Please enter only one letter at a time");
// }
// else if (userGuess.charCodeAt(0) < 65 || (userGuess.charCodeAt(0) > 90 && userGuess.charCodeAt(0) < 97)  || userGuess.charCodeAt(0) > 122)
// {
// 	console.log("that is not a letter");
// }
// else
// {
// 	userGuess = userGuess.toUpperCase();
// 	userGuess = userGuess.charAt(0);
// 	console.log(userGuess);
// }

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

