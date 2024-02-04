let deck = [];
let playerHand = [];
let dealerHand = [];
let gameOver = false;

function startGame() {
    deck = createDeck();
    playerHand = [drawCard(), drawCard()];
    dealerHand = [drawCard(), drawCard()];
    gameOver = false;

    displayHands();
}

function createDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const deck = [];

    for (const suit of suits) {
        for (const value of values) {
            deck.push({ suit, value });
        }
    }

    return shuffle(deck);
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

function drawCard() {
    return deck.pop();
}

function calculateHand(hand) {
    let sum = 0;
    let hasAce = false;

    for (const card of hand) {
        if (card.value === 'A') {
            hasAce = true;
        }
        sum += cardValue(card.value);
    }

    if (hasAce && sum + 10 <= 21) {
        sum += 10;
    }

    return sum;
}

function cardValue(value) {
    return isNaN(value) ? 10 : Number(value);
}

function displayHands() {
    document.getElementById('player-hand').innerHTML = `Player Hand: ${formatHand(playerHand)}`;
    document.getElementById('dealer-hand').innerHTML = `Dealer Hand: ${formatDealerHand()}`;

    if (gameOver) {
        const result = determineWinner();
        document.getElementById('result').innerHTML = result;
        document.getElementById('dealer-hand').innerHTML = `Dealer Hand: ${formatHand(dealerHand)}`;
    }
}

function formatHand(hand) {
    return hand.map(card => `${card.value} of ${card.suit}`).join(', ') + ` (Total: ${calculateHand(hand)})`;
}

function formatDealerHand() {
    if (gameOver) {
        return formatHand(dealerHand);
    } else {
        return `${dealerHand[0].value} of ${dealerHand[0].suit}, hidden card`;
    }
}

function hit() {
    if (!gameOver) {
        playerHand.push(drawCard());
        if (calculateHand(playerHand) > 21) {
            gameOver = true;
        }
        displayHands();
    }
}

function stand() {
    if (!gameOver) {
        while (calculateHand(dealerHand) < 17) {
            dealerHand.push(drawCard());
        }

        gameOver = true;
        displayHands();
    }
}

function determineWinner() {
    const playerTotal = calculateHand(playerHand);
    const dealerTotal = calculateHand(dealerHand);

    if (playerTotal > 21 || (dealerTotal <= 21 && dealerTotal >= playerTotal)) {
        return 'Dealer wins!';
    } else if (dealerTotal > 21 || playerTotal > dealerTotal) {
        return 'Player wins!';
    } else {
        return 'It\'s a tie!';
    }
}
