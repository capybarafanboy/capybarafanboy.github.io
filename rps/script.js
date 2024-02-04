function playGame(playerChoice) {
  const choices = ['rock', 'paper', 'scissors'];
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  const result = determineWinner(playerChoice, computerChoice);

  displayResult(playerChoice, computerChoice, result);
}

function determineWinner(player, computer) {
  if (player === computer) {
    return 'It\'s a tie!';
  } else if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'paper' && computer === 'rock') ||
    (player === 'scissors' && computer === 'paper')
  ) {
    return 'You win!';
  } else {
    return 'Computer wins!';
  }
}

function displayResult(player, computer, result) {
  const resultElement = document.getElementById('result');
  resultElement.textContent = `You chose ${player}. Computer chose ${computer}. ${result}`;
}
