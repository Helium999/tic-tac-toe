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
        if (document.querySelector("#playButton")) {
            let p1name = document.querySelector("#p1name");
            let p1marker = document.querySelector("input[name=p1marker]:checked");
            player1 = Players.createPlayer1(p1name.value, p1marker.value, 0);

            let p2name = document.querySelector("#p2name");
            let p2marker = document.querySelector("input[name=p2marker]:checked");
            player2 = Players.createPlayer2(p2name.value, p2marker.value, 0);

            currentPlayer = player1;

            sessionStorage.setItem(
                "player1",
                JSON.stringify(player1)
            );

            sessionStorage.setItem(
                "player2",
                JSON.stringify(player2)
            );

            window.location.href = "./game.html";
        }
        if (document.querySelector(".container")) {
            player1 = JSON.parse(
                sessionStorage.getItem("player1")
            );

            player2 = JSON.parse(
                sessionStorage.getItem("player2")
            );

            currentPlayer = player1;
                }
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
        Gameboard.updateBoard(currentPlayer.marker, position-1);
        let currentState = Gameboard.returnCurrentState();
    }

    return {
        startGame,
        switchTurn,
        checkWinner,
        playMove
    }
})();

const displayController = {
    startGame() {
        const playButton = document.querySelector("#playButton")
        playButton.addEventListener("click", () => {
            GameController.startGame();
        })
    },

    displayBoard() {
        const cells = document.querySelectorAll(".container > div");

        cells.forEach((cell, index) => {
        cell.innerText = (Gameboard.gameboard)[index];
        });
    },

    displayResult(result) {
        gameResultAnnouncement = document.querySelector(".gameResultAnnouncement");
        gameResultAnnouncement.innerText = result;
    },

    displayMove() {
        const gameboardContainer = document.querySelector(".container");
        gameboardContainer.addEventListener("click", (e) => {
            let locationCell = e.target;
            const index = Array.from(gameboardContainer.children).indexOf(locationCell);
            movePlayed = GameController.playMove(index+1);
            displayController.displayBoard();
            let result = GameController.checkWinner();
            if(result) {
                displayController.displayResult(result);
            }
            if(!result) {
                if (movePlayed !== "That position is already occupied.") {
                    GameController.switchTurn();
                }
            }
        })
    }
}

if (document.querySelector("#playButton")) {
    const p1markers = document.querySelectorAll("input[name=p1marker]");
    const p2markers = document.querySelectorAll("input[name=p2marker]");

    for(let marker of p1markers) {
        marker.addEventListener("change", (e) => {
            if(e.target.id === "p1markerx" && e.target.checked) {
                for(let p2marker of p2markers) {
                    if(p2marker.id === "p2markerx") {
                        p2marker.disabled = true;
                    }
                    if(p2marker.id === "p2markero") {
                        p2marker.disabled = false;
                    }
                }
            }
            if(e.target.id === "p1markero" && e.target.checked) {
                for(let p2marker of p2markers) {
                    if(p2marker.id === "p2markero") {
                        p2marker.disabled = true;
                    }
                    if(p2marker.id === "p2markerx") {
                        p2marker.disabled = false;
                    }
                }
            }
        })
    }
    
    for(let marker of p2markers) {
        marker.addEventListener("change", (e) => {
            if(e.target.id === "p2markerx" && e.target.checked) {
                for(let p1marker of p1markers) {
                    if(p1marker.id === "p1markerx") {
                        p1marker.disabled = true;
                    }
                    if(p1marker.id === "p1markero") {
                        p1marker.disabled = false;
                    }
                }
            }
            if(e.target.id === "p2markero" && e.target.checked) {
                for(let p1marker of p1markers) {
                    if(p1marker.id === "p1markero") {
                        p1marker.disabled = true;
                    }
                    if(p1marker.id === "p1markerx") {
                        p1marker.disabled = false;
                    }
                }
            }
        })
    }

    displayController.startGame();
}

if (document.querySelector(".container")) {
    GameController.startGame();
    displayController.displayMove();
}