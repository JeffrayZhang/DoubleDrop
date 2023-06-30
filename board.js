class Arena
{
    constructor(w, h)
    {
        const matrix = [];
        while (h--) {
            matrix.push(new Array(w).fill(0));
           this.gameOver = false;
        }
        this.matrix = matrix;
    }

    clear()
    {
        this.matrix.forEach(row => row.fill(0));
    }

collide(player) {
    const [m, o] = [player.matrix, player.pos];
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
                (this.matrix[y + o.y] &&
                this.matrix[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}


    sweep()
    {
        let rowCount = 1;
        let score = 0;
        outer: for (let y = this.matrix.length - 1; y > 0; --y) {
            for (let x = 0; x < this.matrix[y].length; ++x) {
                if (this.matrix[y][x] === 0) {
                    continue outer;
                }
            }

            const row = this.matrix.splice(y, 1)[0].fill(0);
            this.matrix.unshift(row);
            ++y;

            score += rowCount * 10;
            rowCount *= 2;
        }
        return score;
    }
  merge(player) {
    player.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.matrix[y + player.pos.y][x + player.pos.x] = value;
        }
      });
    });

    // Check if the player has collided with the top row
    if (player.pos.y <= 0) {
      this.gameOver = true;
      // Game over condition, handle it here (e.g., display game over message, restart game, etc.)
      gameOver();
    }
  }
}
let timer = 180; // 180 seconds = 3 minutes

function startTimer() {
  const timeDisplay = document.getElementById('time-display');

  // Update the timer display immediately
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  timeDisplay.innerText = `Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  timer--;

  const intervalId = setInterval(() => {
    if (timer <= 0 || Arena.gameOver) {
      clearInterval(intervalId);
      displayWinner();
    } else {
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;
      timeDisplay.innerText = `Time: ${minutes.toString().padStart(1, '0')}:${seconds.toString().padStart(1, '0')}`;
      timer--;
    }
  }, 2000); // Execute the interval every 2 seconds
}

function displayWinner() {
  const scores = tetri.map((t) => t.player.score);
  const maxScore = Math.max(...scores);
  const winners = tetri.filter((t) => t.player.score === maxScore);
  
  let winnerMessage;
  if (winners.length === 1) {
    winnerMessage = `Player ${winners[0].player.id + 1} wins with a score of ${maxScore}! Press the reset button to play again`;
  } else {
    const winnerNames = winners.map((w) => `Player ${w.player.id + 1}`);
    winnerMessage = `It's a tie with a score of ${maxScore}! Press the reset button to play again`;
  }

  alert(winnerMessage);
}

function gameOver() {
alert('Game Over! You touched the top, the other player wins!. Press the reset button to play again');
}