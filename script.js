const Gameboard = {
    gameboard:
    [
        "", "", "",
        "", "", "",
        "", "", ""
    ],
    
    returnCurrentState() {
        return Gameboard.gameboard;
    },

    updateBoard(marker, position) {
        (Gameboard.gameboard)[position] = marker;
    },

    resetBoard() {
        for(let i=0; i<(Gameboard.gameboard).length; i++) {
            (Gameboard.gameboard)[i] = "";
        }
    }
}

const Players = {
    Player: function(name, marker, score) {
        this.name = name;
        this.marker = marker;
        this.score = score;
    },

    createPlayer1(name, marker, score) {
        let player1 = new Players.Player(name, marker, score);
        return player1;
    },

    createPlayer2(name, marker, score) {
        let player2 = new Players.Player(name, marker, score);
        return player2;
    },

    returnCurrentScore(player) {
        return player.score;
    },

    updateScore(player, updatedScore) {
        player.score = updatedScore;
    },

    resetScore(player) {
        player.score = 0;
    }
}

const GameController = (function() {
    let player1;
    let player2;
    let currentPlayer;

    function startGame() {
        player1 = Players.createPlayer1("Aditya", "X", 0);
        player2 = Players.createPlayer2("Bob", "O", 0)
        currentPlayer = player1;
    }

    function switchTurn() {
        if(currentPlayer === player1) {
            currentPlayer = player2;
        }
        else {
            currentPlayer = player1;
        }
    }

    function checkWinner() {
        if((Gameboard.gameboard[0] === Gameboard.gameboard[1] && Gameboard.gameboard[1] === Gameboard.gameboard[2] && Gameboard.gameboard[2] !== "") ||
            (Gameboard.gameboard[3] === Gameboard.gameboard[4] && Gameboard.gameboard[4] === Gameboard.gameboard[5] && Gameboard.gameboard[5] !== "") ||
            (Gameboard.gameboard[6] === Gameboard.gameboard[7] && Gameboard.gameboard[7] === Gameboard.gameboard[8] && Gameboard.gameboard[8] !== "") ||
            
            (Gameboard.gameboard[0] === Gameboard.gameboard[3] && Gameboard.gameboard[3] === Gameboard.gameboard[6] && Gameboard.gameboard[6] !== "") ||
            (Gameboard.gameboard[1] === Gameboard.gameboard[4] && Gameboard.gameboard[4] === Gameboard.gameboard[7] && Gameboard.gameboard[7] !== "") ||
            (Gameboard.gameboard[2] === Gameboard.gameboard[5] && Gameboard.gameboard[5] === Gameboard.gameboard[8] && Gameboard.gameboard[8] !== "") ||
        
            (Gameboard.gameboard[0] === Gameboard.gameboard[4] && Gameboard.gameboard[4] === Gameboard.gameboard[8] && Gameboard.gameboard[8] !== "") ||
            (Gameboard.gameboard[2] === Gameboard.gameboard[4] && Gameboard.gameboard[4] === Gameboard.gameboard[6] && Gameboard.gameboard[6] !== "")) {
                return `Winner is ${currentPlayer.name} (Marker: ${currentPlayer.marker})`
            }
        else if(!(Gameboard.gameboard).includes("")) {
            return "Game is a draw"
        }
    }

    function playMove(position) {
        if((Gameboard.gameboard[position-1] === "X") || (Gameboard.gameboard[position-1] === "O")) {
            return "That position is already occupied."
        }
        Gameboard.updateBoard(Gameboard.gameboard, currentPlayer.marker, position-1);
        let currentState = Gameboard.returnCurrentState(Gameboard.gameboard);
        console.log(currentState);
    }

    return {
        startGame,
        switchTurn,
        checkWinner,
        playMove
    }
})();