let players = [];

document.getElementById('addPlayerButton').addEventListener('click', addPlayer);
document.getElementById('playerScoreButton').addEventListener('click', addPlayerScore);

function addPlayer() {
    const playerName = document.getElementById('playerName').value.trim();
    const startingScore = parseInt(document.getElementById('startingScore').value.trim());

    if (playerName && !isNaN(startingScore)) {
        const player = {
            name: playerName,
            score: startingScore
        };

        players.push(player);

        renderLeaderboard();
    } else {
        alert('Please enter valid player details.');
    }
}

function addPlayerScore() {
    const playerScore = parseInt(prompt('Enter the score to add/subtract:'));
    if (!isNaN(playerScore)) {
        players.forEach((player, index) => {
            players[index].score += playerScore;
        });
        renderLeaderboard();
    } else {
        alert('Please enter a valid number for score adjustment.');
    }
}

function renderLeaderboard() {
    const leaderboardTable = document.getElementById('leaderboardTable');
    const tbody = leaderboardTable.getElementsByTagName('tbody')[0];

    tbody.innerHTML = '';

    players.forEach((player, index) => {
        const row = tbody.insertRow();

        const firstNameCell = row.insertCell(0);
        firstNameCell.textContent = player.firstName;

        const lastNameCell = row.insertCell(1);
        lastNameCell.textContent = player.lastName;

        const countryCell = row.insertCell(2);
        countryCell.textContent = player.country;

        const scoreCell = row.insertCell(3);
        scoreCell.textContent = player.score;

        const adjustCell = row.insertCell(4);
        const plusButton = document.createElement('button');
        plusButton.textContent = '+5';
        plusButton.addEventListener('click', () => adjustScore(index, 5));
        const minusButton = document.createElement('button');
        minusButton.textContent = '-5';
        minusButton.addEventListener('click', () => adjustScore(index, -5));
        adjustCell.appendChild(plusButton);
        adjustCell.appendChild(minusButton);

        const deleteCell = row.insertCell(5);
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => deletePlayer(index));
        deleteCell.appendChild(deleteButton);
    });
}

function adjustScore(index, value) {
    players[index].score += value;
    renderLeaderboard();
}

function deletePlayer(index) {
    players.splice(index, 1);
    renderLeaderboard();
}
