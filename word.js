var Letter = require("./letter.js");

var Word = function(word) {
	this.wordArray = [];
	for (var i = 0; i < word.length; i++)
	{
		this.wordArray.push(new Letter(word[i]));
	}
}

Word.prototype.toString = function() {
	return this.wordArray.join(" ");
}
Word.prototype.hasFound = function()
{
	for (var i = 0; i < this.wordArray.length; i++)
	{
		if (this.wordArray[i].found === false)
		{
			return;
		}
		else
		{
			return true;
		}
	}
}

module.exports = Word;
