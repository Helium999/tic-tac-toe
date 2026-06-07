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
}

