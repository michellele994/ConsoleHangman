//This is a constructor that holds information for each letter to determine if a letter had been found or not.
var Letter = function (letter) {
	this.letter = letter;
	this.found = false;
};

Letter.prototype.toString = function () {
	if (!this.found) {
		return "_";
	}
	return this.letter;
}

Letter.prototype.guess = function (userGuess) {
	if (userGuess === this.letter) {
		this.found = true;
	}
}


module.exports = Letter;
