function createPiece(type) {
    if (type === 'T') {
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ];
    } else if (type === 'O') {
        return [
            [2, 2],
            [2, 2],
        ];
    } else if (type === 'L') {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3],
        ];
    } else if (type === 'J') {
        return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0],
        ];
    } else if (type === 'I') {
        return [
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
        ];
    } else if (type === 'S') {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if (type === 'Z') {
        return [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0],
        ];
    }else if (type === 'X') {
    return [
        [0, 9, 0],
        [0, 9, 0],
        [0, 9, 0],
    ];
}

else if (type === 'U') {
    return [
        [10, 0, 10],
        [10, 10, 10],
        [0, 0, 0],
    ];
}

else if (type === 'P') {
    return [
        [11, 11, 0],
        [11, 11, 11],
        [0, 0, 0],
    ];
}

else if (type === 'W') {
    return [
        [0, 12, 12],
        [12, 12, 0],
        [12, 0, 0],
    ];
}
    }





const tetri = [];

const playerElements = document.querySelectorAll('.player');
[...playerElements].forEach((element, index) => {
    const tetris = new Tetris(element, index);
    tetri.push(tetris);
});

const keyListener = (event) => {
    [
        [65, 68, 81, 69, 83], // A, D, Q, E, S (Player 1 controls)
        [37, 39, 38, 32, 40], // Arrow Left, Arrow Right, Arrow Up, Arrow Down, Space
    ].forEach((key, index) => {
        const player = tetri[index].player;
        if (event.type === 'keydown') {
            if (event.keyCode === key[0]) {
                player.move(-1);
            } else if (event.keyCode === key[1]) {
                player.move(1);
            } else if (event.keyCode === key[2]) {
                player.rotate(-1);
            } else if (event.keyCode === key[3]) {
                player.rotate(1);
            }
        }

        if (event.keyCode === key[4]) {
            if (event.type === 'keydown') {
                if (player.dropInterval !== player.DROP_FAST) {
                    player.drop();
                    player.dropInterval = player.DROP_FAST;
                }
            } else {
                player.dropInterval = player.DROP_SLOW;
            }
        }
    });
};

document.addEventListener('keydown', keyListener);
document.addEventListener('keyup', keyListener);