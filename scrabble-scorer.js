
// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word = info) {
  word = word.toUpperCase();
	let letterPoints = "";
	for (let i = 0; i < word.length; i++) {
	  for (const pointValue in oldPointStructure) {
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
	  }
	}
	console.log(letterPoints);
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

let info = "";

function initialPrompt() {
   info = input.question("Let's play some Scrabble! \n\nEnter a word to score: ");
   return info;
};


function simpleScore() {
  simple = info.length;
  return simple;
}


function vowelBonusScore(word = info) {
  word = word.toUpperCase();
  let vowelScore = 0;
  for (i = 0; i < word.length; i++) {
     if (word[i]== "A" || word[i] == "E" || word[i] == "I" || word[i]  == "O" || word[i] == "U" || word[i] == "Y") {   
       vowelScore = vowelScore + 3;
     } else {
       vowelScore++;
     }
  }
  return vowelScore;
}

function transform(input) {
  let singleLetterPoints = {};
  for (let key in input) {
      let letters = input[key];
      for (let i=0; i<letters.length; i++){
        singleLetterPoints[letters[i].toLowerCase()] = Number(key);
      }         
  }
  return singleLetterPoints;
};

const newPointStructure = transform(oldPointStructure);

function scrabbleScore (input=info, points=newPointStructure) {
  let theScore = 0;
  for (i = 0; i < input.length; i++ ) {
    theScore += points[input[i].toLowerCase()]
  }
  return theScore;
};

const choice0 = {
  name: "Simple Score",
  description: "Each letter is worth 1 point.",
  scoringFunction: simpleScore
}

const choice1 = {
  name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scoringFunction: vowelBonusScore
}

const choice2 = {
  name: "Scrabble",
  description: "The traditional scoring algorithm.",
  scoringFunction: scrabbleScore  
}

const scoringAlgorithms = [choice0, choice1, choice2];

function scorerPrompt() {

choice = Number(input.question(`Which scoring algorithm would you like to use?

0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 points
2 - Scrabble: Uses scrabble point system
Enter 0, 1, or 2: `));

console.log("algorithm name: ", scoringAlgorithms[choice].name);
console.log("scoringFunction result: ", scoringAlgorithms[choice].scoringFunction());
}

// console.log(newPointStructure)

function runProgram() {
   console.log("Scrabble scoring values for");
   initialPrompt();
   scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

