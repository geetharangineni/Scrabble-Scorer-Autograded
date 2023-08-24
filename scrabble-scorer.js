// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

// User to enter a word
function initialPrompt() {
   return input.question("Let's play some scrabble! Enter a word: ");
}

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
}

// Scorer functions
function simpleScorer(word) {
  return word.length;
  
}

function vowelBonusScorer(word) {
  word = word.toUpperCase();
  let score = 0;

  for (let i = 0; i < word.length; i++) {
    if ('AEIOU'.includes(word[i])) {
      score += 3;
    } else {
      score++;
    }
  }

  return score;
}

function scrabbleScorer(word, scoringObj) {
  word = word.toUpperCase();
  let score = 0;

  for (let i = 0; i < word.length; i++) {
    score += scoringObj[word[i]];
  }

  return score;
}

const scoringAlgorithms = [
  { name: 'Simple Score', description: 'Each letter is worth 1 point.', scorerFunction: simpleScorer },
  { name: 'Bonus Vowels', description: 'Vowels are 3 pts, consonants are 1 pt.', scorerFunction: vowelBonusScorer },
  { name: 'Scrabble', description: 'The traditional scoring algorithm.', scorerFunction: scrabbleScorer }
];

function scorerPrompt() {
  console.log("\nWhich scoring algorithm would you like to use?");
  for (let i = 0; i < scoringAlgorithms.length; i++) {
    console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
  }
  let choice = input.question("Enter 0, 1, or 2: ");
  choice = parseInt(choice);
  return choice;
}

function transform(oldPointStructure) {
  let newPointStructure = {};

  for (const pointValue in oldPointStructure) {
    let letters = oldPointStructure[pointValue];

    for (let i = 0; i < letters.length; i++) {
      newPointStructure[letters[i].toLowerCase()] = parseInt(pointValue);
    }
  }

  return newPointStructure;
}

let newPointStructure = transform(oldPointStructure);
console.log("Scrabble scoring values for");
console.log("letter a: ", newPointStructure.a);
console.log("letter j: ", newPointStructure.j);
console.log("letter z: ", newPointStructure["z"]);

console.log("Letters with score '4':", oldPointStructure['4']);
console.log("3rd letter within the key '4' array:", oldPointStructure['4'][2]);

let letters = oldPointStructure['8'];
console.log("Letters with score '8':", letters);
console.log("2nd letter within the key '8' array:", letters[1]);




function runProgram() {
   let word = initialPrompt();
   let choice = scorerPrompt();
 
  let selectedScorer = scoringAlgorithms[choice].scorerFunction;
   let score = selectedScorer(word, newPointStructure);
 
   console.log(`Score for '${word}': ${score}`);
 }
 

module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScorer: simpleScorer,
  vowelBonusScorer: vowelBonusScorer,
  scrabbleScorer: scrabbleScorer,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt
};
