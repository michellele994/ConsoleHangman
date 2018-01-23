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
	var numFound = 0;
	for (var i = 0; i < this.wordArray.length; i++)
	{
		if (this.wordArray[i].found)
		{
			numFound++;	
		}
	}
	if(numFound === this.wordArray.length)
	{
		return true;
	}
	else
	{
		return false;
	}
}

module.exports = Word;
