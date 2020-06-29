//Restarts the game 
document.querySelector('.restart').addEventListener('click', function () {
        location.reload();
});

//Shows modal and displays buttons to choose player options
const choosePlayer = new ChoosePlayer();
choosePlayer.choosePlayerOptions();  

// Modal function to choose player options and start the game
function ChoosePlayer() {
    this.choosePlayerOptions = function() {
        const modal = document.querySelector(".modal");
        modal.style.display = "flex";
        const outerContainer = document.querySelector(".outer-container");
        outerContainer.style.display = "none";
        const restartButton = document.querySelector('.restart')
        restartButton.style.display = "none";

        //Two human player option
        const twoHuman = document.querySelector("#twoplayer");
        twoHuman.addEventListener('click', function() {
            //Close the modal
            modal.style.display = "none";
            outerContainer.style.display = "flex";
            restartButton.style.display = "flex";
            document.getElementById("playerX").innerText = "Player 1"
            document.getElementById("playerO").innerText = "Player 2"
            // Start the game
            const twoHumanPlayers = new TwoHumanPlayers();
            twoHumanPlayers.play();
        });

        //Dumb computer player option
        const dumbComputer = document.querySelector("#dumbcomputer");
        dumbComputer.addEventListener('click', function() {
            //Close the modal
            modal.style.display = "none";
            outerContainer.style.display = "flex";
            restartButton.style.display = "flex";
            document.getElementById("playerX").innerText = "You"
            document.getElementById("playerO").innerText = "Dumb PC"
            // Start the game
            const humanAndDumbComputer = new HumanAndDumbComputer();
            humanAndDumbComputer.play();
    
        });

        //Smart AI option
        const smartAI = document.querySelector("#smartai");
        smartAI.addEventListener('click', function() {
            //Close the modal
            modal.style.display = "none";
            outerContainer.style.display = "flex";
            restartButton.style.display = "flex";
            document.getElementById("playerX").innerText = "You"
            document.getElementById("playerO").innerText = "Smart AI"
            // Start the game
            // const controlGame = new ControlGame();
            // controlGame.play();
        });
    }
}

function TwoHumanPlayers() {
    //Private
    const _gameBoard = new GameBoard();
    const _player1 = new Player1(_gameBoard);
    const _player2 = new Player2(_gameBoard);
    let _player = 0;

    function _changePlayer() {
        if (_gameBoard.checkForWinner()) {
            return;
        }

        if (_player % 2 === 0 ) {
            _player1.changePlayer();
        } else {
            _player2.changePlayer();
        }    
        _player++;
    }

    function playGame() {
        const gameConfig = {childList: true};
        const gameObserver = new MutationObserver(() => _changePlayer());
        _gameBoard.blocks.forEach((block) => gameObserver.observe(block, gameConfig));
        _changePlayer();
    }

    //Public
    return {
        play: playGame,   
    }
};

function HumanAndDumbComputer() {
    //Private
    const _gameBoard = new GameBoard();
    const _player1 = new Player1(_gameBoard);
    const _dumbCoputer = new DumbComputer(_gameBoard);
    let _player = 0;

    function _changePlayer() {
        if (_gameBoard.checkForWinner()) {
            return;
        }

        if (_player % 2 === 0 ) {
            _player1.changePlayer();
        } else {
            _dumbCoputer.changePlayer();
        }    
        _player++;
    }

    function playGame() {
        const gameConfig = {childList: true};
        const gameObserver = new MutationObserver(() => _changePlayer());
        _gameBoard.blocks.forEach((block) => gameObserver.observe(block, gameConfig));
        _changePlayer();
    }

    //Public
    return {
        play: playGame,   
    }
};

function GameBoard() {
    this.blocks = Array.from(document.querySelectorAll('.block'));
    this.checkForWinner = function () {
        let winner = false;
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        for (let i = 0; i < winningCombinations.length; i++) {
            const eachWinningCombination =  winningCombinations[i];
            const firstIndex = eachWinningCombination[0];
            const secondIndex = eachWinningCombination[1];
            const thirdIndex = eachWinningCombination[2];
            if (this.blocks[firstIndex].textContent !== '' && 
                this.blocks[firstIndex].textContent  === this.blocks[secondIndex].textContent &&
                this.blocks[secondIndex].textContent  === this.blocks[thirdIndex].textContent) {
                    if (this.blocks[firstIndex].textContent === 'X') {
                        eachWinningCombination.forEach((index) => {
                            this.blocks[index].style.color="red";
                        })
                        winner = true;
                        return winner;
                    } else {
                        eachWinningCombination.forEach((index) => {
                            this.blocks[index].style.color="blue";
                        })
                        winner = true;
                        return winner;   
                    }
            }  
        }
        const availableBlocks = this.blocks.filter((block) => block.innerText == '');
        if (availableBlocks.length === 0) {
            alert("It's a tie!")
        }
    }
}

function Player1(gameBoard) {
    this.changePlayer = function () {
        gameBoard.blocks.forEach(block => block.addEventListener('click', makeMove));
    }

    function makeMove(e) {
        e.target.innerText = "X";
        gameBoard.blocks.forEach(block => block.removeEventListener('click', makeMove));
    }
}

function Player2(gameBoard) {
    this.changePlayer = function () {
        gameBoard.blocks.forEach(block => block.addEventListener('click', makeMove));
    }

    function makeMove(e) {
        e.target.innerText = "O";
        gameBoard.blocks.forEach(block => block.removeEventListener('click', makeMove));
    }
}

function DumbComputer(gameBoard) {
    this.changePlayer = function () {
        const availableBlocks = gameBoard.blocks.filter((block) => block.innerText == '');
        const dumbMove = Math.floor(Math.random()* (availableBlocks.length));
        availableBlocks[dumbMove].innerText = 'O'
    }
}

function bestMove() {
    let bestScore = -Infinity;

}

function minimax(board, depth, isMaximising) {
    let result = board.checkForWinner();
    if (result !== null) {
        let score = score[result];
        return score;
    }

    if(isMaximising) {

    }
    
}