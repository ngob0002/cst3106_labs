class Dice {
    constructor(numberOfDice) {
        this.numberOfDice = numberOfDice;
        this.diceValues = new Array(numberOfDice).fill(1); // Initialize all dice to 1
    }

    roll() {
        this.diceValues = this.diceValues.map(() => this.getRandomNumber(1, 6));
    }

    getCurrentDiceValues() {
        return this.diceValues;
    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

// Usage example
const dice = new Dice(5); // Create an instance with 5 dice
document.getElementById('roll-dice').addEventListener('click', function() {
    dice.roll(); // Roll the dice
    const currentDiceValues = dice.getCurrentDiceValues(); // Get the current dice values
    updateDiceUI(currentDiceValues); // Update the UI with the new dice values
});

function updateDiceUI(diceValues) {
    const dices = document.querySelectorAll('.dice');
    dices.forEach(function(dice, index) {
        const randomNumber = diceValues[index];
        dice.querySelector('.dots span').textContent = randomNumber;
    });

class YatzyEngine {
    constructor() {
        this.scoreTable = {
            Ones: null,
            Twos: null,
            Threes: null,
            Fours: null,
            Fives: null,
            Sixes: null,
            ThreeOfAKind: null,
            FourOfAKind: null,
            FullHouse: null,
            SmallStraight: null,
            LargeStraight: null,
            Yatzy: null,
            Chance: null,
            Bonus: null,
            TotalScore: null,
        };
    }
    
    calculateScore(category, diceValues) {
        // Implement score calculation logic for the given category
         // Update the score table with the calculated score
    }
    
    isValidSelection(category, diceValues) {
        // Implement logic to check if the selection is valid based on dice values
        // and the chosen category
    }
    }
    
}

