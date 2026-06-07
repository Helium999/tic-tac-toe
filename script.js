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

