let score = 0;
let bet = 0;
let pot = 0;
let playerAnswer = '';

const possibleBetSizes = [
    0.2,
    0.25,
    0.33,
    0.50,
    0.66,
    0.77,
    0.80,
    0.90,
    1.00,
    1.10,
    1.20,
    1.25,
    1.30,
    1.40,
    1.50,
    1.60,
    1.75,
    1.80,
    1.90,
    2.00,
]

document.querySelector('.js-answer-form').addEventListener('submit', handleAnswerSubmit)

function generateBet() {
    bet = possibleBetSizes[Math.floor(Math.random() * possibleBetSizes.length)] * pot;
    document.getElementById("bet").textContent = `${bet.toLocaleString()}`;
}

function generatePot() {
    pot = getRandomRounded(1, 100);
    document.getElementById('pot').textContent = `${pot.toLocaleString()}`;
}

function getRandomRounded(min, max) {
    min = Math.ceil(min / 5) * 5;
    max = Math.floor(max / 5) * 5;
    let random = Math.floor(Math.random() * ((max - min) / 5 + 1)) * 5 + min;
    return random;
}

function calculatePotOdds() {
    return Number(bet / (pot + (bet * 2)) * 100).toFixed(2);
}

function handleAnswerSubmit(e) {
    e.preventDefault();
    playerAnswer = Number(document.getElementById('playerAnswer').value);
    correctAnswer = calculatePotOdds();
    let difference = Math.abs(playerAnswer - correctAnswer).toFixed(2);

    if (difference <= 2.5) { // Check if the difference is within 2.5%
        score++;
        document.getElementById('result').textContent = `Your answer was correct!`;
        document.getElementById('result').className = 'font-weight-bold text-success';
    } else {
        score--;
        document.getElementById('result').textContent = `Your answer was incorrect.`;
        document.getElementById('result').className = 'font-weight-bold text-danger';
    }

    document.getElementById('difference').textContent = `Your answer ${playerAnswer} was ${difference}% off. The correct answer was ${correctAnswer}%.`;

    document.getElementById('result').style.display = 'inline';
    document.getElementById('score').textContent = "Score: " + score;
    document.getElementById('submit').style.display = "none";
    document.getElementById('continue').style.display = 'inline';
    document.querySelector('.js-answer-input').value = '';
    document.querySelector('.js-answer-input').disabled = true;
}

function continueGame() {
    generatePot();
    generateBet();
    document.getElementById('playerAnswer').value = '';
    document.getElementById('submit').style.display = 'inline';
    document.getElementById('continue').style.display = 'none';
    document.getElementById('result').style.display = 'none';
    document.querySelector('.js-answer-input').disabled = false;
    document.querySelector('.js-answer-input').focus();
    document.getElementById("difference").textContent = '';
}

// Initial setup
generatePot();
generateBet();
document.getElementById('continue').style.display = 'none';
