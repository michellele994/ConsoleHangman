var Letter = function(letter)
{
	this.letter = letter;
	this.found = false;
};

Letter.prototype.toString = function()
{
	if (!this.found)
	{
		return "_";
	}
	return this.letter;
}

Letter.prototype.guess = function(userGuess)
{
	if (userGuess === this.letter)
	{
		this.found = true;
	}
}


module.exports = Letter;
