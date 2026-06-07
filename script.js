const Gameboard = {
    gameboard:
    [
        "", "", "",
        "", "", "",
        "", "", ""
    ],
    
    returnCurrentState(gameboard) {
        return gameboard;
    },

    updateBoard(gameboard, marker, position) {
        gameboard[position] = marker;
    },

    resetBoard(gameboard) {
        for(let i=0; i<gameboard.length; i++) {
            gameboard[i] = "";
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
        player1 = new Players.Player(name, marker, score);
    },

    createPlayer2(name, marker, score) {
        if(name === player1.name) {
            return "Choose a different name than Player1."
        }
        if(marker === player1.marker) {
            return "Player 1 already has this marker."
        }
        player2 = new Players.Player(name, marker, score);
    }
}