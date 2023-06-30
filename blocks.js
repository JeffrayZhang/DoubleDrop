class Tetris {
    constructor(element, playerNum) {
        this.element = element;
        this.playerNum = playerNum;
        
        this.canvas = element.querySelector('canvas');
        this.context = this.canvas.getContext('2d');
        this.context.scale(20, 20);

        this.arena = new Arena(12, 20);
        this.player = new Player(this);

        this.colors = [
            null,
            '#5f3248',
            '#ad4250',
            '#ad6071',
            '#f0a3a1',
            '#daa9a3',
            '#b58ca6',
            '#e2627b',
          '#FF0000',
          '#5f3248',
          '#ad4250',
          '#ad6071',
          '#f0a3a1',
          '#daa9a3',
        ];

        let lastTime = 0;
        let elapsedTime = 0;
        const update = (time = 0) => {
            const deltaTime = time - lastTime;
            lastTime = time;

            elapsedTime += deltaTime;
            if (elapsedTime >= 15000) {
                this.player.increaseDropSpeed();
                elapsedTime -= 15000;
            }

            this.player.update(deltaTime);

            this.draw();
            requestAnimationFrame(update);
        };
        update();
        startTimer();
    }

    draw() {
        this.context.fillStyle = 'rgba(0, 0, 0, 0)';
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw the current state of the game
        this.drawMatrix(this.arena.matrix, { x: 0, y: 0 });
        this.drawMatrix(this.player.matrix, this.player.pos);
    }
    drawMatrix(matrix, offset) {
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.context.fillStyle = this.colors[value];
                    this.context.fillRect(
                        x + offset.x,
                        y + offset.y,
                        1, 1
                    );
                }
            });
        });
    }
}

