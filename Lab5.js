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

// Create an instance of the Dice class with 5 dice
// Usage example
const dice = new Dice(5); // Create an instance with 5 dice
const rollButton = document.getElementById('roll-dice'); // Get the "Roll Dice" button

rollButton.addEventListener('click', function() {
    dice.roll(); // Roll the dice
    const currentDiceValues = dice.getCurrentDiceValues(); // Get the current dice values
    updateDiceUI(currentDiceValues); // Update the UI with the new dice values
});
// Example usage when rolling the dice
function updateDiceUI(diceValues) {
    const dices = document.querySelectorAll('.dice');
    dices.forEach(function(dice, index) {
        const randomNumber = diceValues[index];
        dice.querySelector('.dots span').textContent = randomNumber;
    });
}

class YatzyEngine {
    constructor() {
        // Initialize the score table to keep track of scores for each category
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
        // Ensure the category is valid and hasn't been scored yet
        if (!this.isValidSelection(category, diceValues)) {
            return 0; // Return 0 if the category is not valid
        }

        // Implement the scoring logic for each category
        switch (category) {
            case "Ones":
            case "Twos":
            case "Threes":
            case "Fours":
            case "Fives":
            case "Sixes":
                // Calculate the sum of corresponding dice values
                const value = parseInt(category.charAt(0)); // Extract the number from category name
                return this.calculateSum(diceValues, value);
            case "ThreeOfAKind":
                // Score the sum of all dice if you have at least three of the same value
                if (this.hasNOfAKind(diceValues, 3)) {
                    return diceValues.reduce((sum, dice) => sum + dice, 0);
                }
                return 0;
            case "FourOfAKind":
                // Score the sum of all dice if you have at least four of the same value
                if (this.hasNOfAKind(diceValues, 4)) {
                    return diceValues.reduce((sum, dice) => sum + dice, 0);
                }
                return 0;
            case "FullHouse":
                // Score 25 points if you have three of one value and two of another
                if (this.isFullHouse(diceValues)) {
                    return 25;
                }
                return 0;
            case "SmallStraight":
                // Score 30 points if you have a sequence of four consecutive dice
                if (this.isSmallStraight(diceValues)) {
                    return 30;
                }
                return 0;
            case "LargeStraight":
                // Score 40 points if you have a sequence of five consecutive dice
                if (this.isLargeStraight(diceValues)) {
                    return 40;
                }
                return 0;
            case "Yatzy":
                // Score 50 points if you have all five dice showing the same value
                if (this.hasNOfAKind(diceValues, 5)) {
                    return 50;
                }
                return 0;
            case "Chance":
                // Score the sum of all five dice, regardless of the combination
                return diceValues.reduce((sum, dice) => sum + dice, 0);
            case "Bonus":
                // Bonus category is not directly scored, it depends on the sum of Ones through Sixes
                const sumOnesToSixes = this.calculateSum(diceValues, 1) + this.calculateSum(diceValues, 2) + this.calculateSum(diceValues, 3) + this.calculateSum(diceValues, 4) + this.calculateSum(diceValues, 5) + this.calculateSum(diceValues, 6);
                if (sumOnesToSixes >= 63) {
                    return 35;
                }
                return 0;
            case "TotalScore":
                // Total Score category is not directly scored, it depends on the sum of all categories
                return Object.values(this.scoreTable).reduce((sum, score) => sum + (score || 0), 0);
            default:
                return 0; // Return 0 for unhandled categories
        }
    }

    isValidSelection(category, diceValues) {
        // Ensure the category is valid
        if (!this.scoreTable.hasOwnProperty(category)) {
            return false;
        }

        // Ensure the category hasn't been scored yet
        if (this.scoreTable[category] !== null) {
            return false;
        }

        // Implement category-specific validation
        switch (category) {
            case "Ones":
            case "Twos":
            case "Threes":
            case "Fours":
            case "Fives":
            case "Sixes":
                // Check if the category matches the dice values
                const value = parseInt(category.charAt(0)); // Extract the number from category name
                return diceValues.includes(value);
            case "ThreeOfAKind":
                // Check if there is at least three of the same value
                return this.hasNOfAKind(diceValues, 3);
            case "FourOfAKind":
                // Check if there is at least four of the same value
                return this.hasNOfAKind(diceValues, 4);
            case "FullHouse":
                // Check if it's a full house
                return this.isFullHouse(diceValues);
            case "SmallStraight":
                // Check if it's a small straight
                return this.isSmallStraight(diceValues);
            case "LargeStraight":
                // Check if it's a large straight
                return this.isLargeStraight(diceValues);
            case "Yatzy":
                // Check if all dice have the same value
                return this.hasNOfAKind(diceValues, 5);
            case "Chance":
                // Chance category is always valid
                return true;
            case "Bonus":
            case "TotalScore":
                // Bonus and Total Score categories are not directly selected
                return false;
            default:
                return false; // Invalid category by default
        }
    }

    // Utility method to calculate the sum of dice with a specific value
    calculateSum(diceValues, value) {
        return diceValues.reduce((sum, dice) => (dice === value ? sum + dice : sum), 0);
    }

    // Utility method to check if there is at least N dice of the same value
    hasNOfAKind(diceValues, N) {
        const counts = {};
        for (const dice of diceValues) {
            counts[dice] = (counts[dice] || 0) + 1;
        }
        return Object.values(counts).some((count) => count >= N);
    }

    // Utility method to check if it's a full house
    isFullHouse(diceValues) {
        const counts = {};
        for (const dice of diceValues) {
            counts[dice] = (counts[dice] || 0) + 1;
        }
        const values = Object.values(counts);
        return values.length === 2 && (values[0] === 2 || values[1] === 2);
    }

    // Utility method to check if it's a small straight
    isSmallStraight(diceValues) {
        const sortedValues = [...new Set(diceValues)].sort((a, b) => a - b);
        for (let i = 0; i < sortedValues.length - 1; i++) {
            if (sortedValues[i] + 1 !== sortedValues[i + 1]) {
                return false;
            }
        }
        return sortedValues.length >= 4;
    }

    // Utility method to check if it's a large straight
    isLargeStraight(diceValues) {
        const sortedValues = [...new Set(diceValues)].sort((a, b) => a - b);
        return sortedValues.length === 5 && (sortedValues[4] - sortedValues[0] === 4);
    }
}

// Export the YatzyEngine class/module
export default YatzyEngine;
