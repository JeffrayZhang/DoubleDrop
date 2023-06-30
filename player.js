
class Player {
    constructor(tetris) {
        this.DROP_SLOW = 1000;
        this.DROP_FAST = 50;
        this.DROP_INTERVAL_DECREASE = 50; // Decrease interval by 50 milliseconds

        this.tetris = tetris;
        this.arena = tetris.arena;

        this.dropCounter = 0;
        this.dropInterval = this.DROP_SLOW;

        this.pos = { x: 0, y: 0 };
        this.matrix = null;
        this.score = 0;
        this.reset();
    }

    drop() {
        this.pos.y++;
        if (this.arena.collide(this)) {
            this.pos.y--;
            this.arena.merge(this);
            this.reset();
            this.score += this.arena.sweep();
            
            document.querySelector(`#p${this.tetris.playerNum + 1}score`).innerHTML = `Player ${this.tetris.playerNum + 1} Score: ${this.score}`
        }
        this.dropCounter = 0;
    }

    move(dir) {
        this.pos.x += dir;
        if (this.arena.collide(this)) {
            this.pos.x -= dir;
        }
    }

 reset() {
    const pieces = 'ILJOTSZXUPW';
    this.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
    this.pos.y = 0;
    this.pos.x = (this.arena.matrix[0].length / 2 | 0) -
        (this.matrix[0].length / 2 | 0);
    if (this.arena.collide(this)) {
        this.arena.clear();
        this.score = 1; // Update the score to 1
        gameOver(); // Call the game over function to display the message
    }
}

    rotate(dir) {
        const pos = this.pos.x;
        let offset = 1;
        this._rotateMatrix(this.matrix, dir);
        while (this.arena.collide(this)) {
            this.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > this.matrix[0].length) {
                this._rotateMatrix(this.matrix, -dir);
                this.pos.x = pos;
                return;
            }
        }
    }

    _rotateMatrix(matrix, dir) {
        for (let y = 0; y < matrix.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [
                    matrix[x][y],
                    matrix[y][x],
                ] = [
                    matrix[y][x],
                    matrix[x][y],
                ];
            }
        }

        if (dir > 0) {
            matrix.forEach(row => row.reverse());
        } else {
            matrix.reverse();
        }
    }

    update(deltaTime) {
        this.dropCounter += deltaTime;
        if (this.dropCounter > this.dropInterval) {
            this.drop();
        }
    }

    increaseDropSpeed() {
        if (this.dropInterval > this.DROP_FAST) {
            this.dropInterval -= this.DROP_INTERVAL_DECREASE;
        }
    }
}