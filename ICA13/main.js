const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// helper functions
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomRGB() {
  return `rgb(${random(0, 255)} ${random(0, 255)} ${random(0, 255)})`;
}

// Ball class
class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width || this.x - this.size <= 0) {
      this.velX = -this.velX;
    }

    if (this.y + this.size >= height || this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
  for (const ball of balls) {
    if (this !== ball) {
      const dx = ball.x - this.x;
      const dy = ball.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const minDist = this.size + ball.size;

      if (distance < minDist) {
        // normalize collision vector
        const nx = dx / distance;
        const ny = dy / distance;

        // relative velocity
        const dvx = this.velX - ball.velX;
        const dvy = this.velY - ball.velY;

        // dot product of velocity and normal
        const impactSpeed = dvx * nx + dvy * ny;

        // only resolve if balls are moving toward each other
        if (impactSpeed > 0) continue;

        // simple elastic collision response (swap along normal)
        const impulse = 2 * impactSpeed / 2; // equal mass assumption

        this.velX -= impulse * nx;
        this.velY -= impulse * ny;
        ball.velX += impulse * nx;
        ball.velY += impulse * ny;

        // separate overlapping balls so they don't stick
        const overlap = minDist - distance;
        const separationX = (overlap / 2) * nx;
        const separationY = (overlap / 2) * ny;

        this.x -= separationX;
        this.y -= separationY;
        ball.x += separationX;
        ball.y += separationY;
      }
    }
  }
}
}

// create balls
const balls = [];

while (balls.length < 25) {
  const size = random(10, 20);

  const ball = new Ball(
    random(size, width - size),
    random(size, height - size),
    random(-7, 7) || 1,
    random(-7, 7) || 1,
    randomRGB(),
    size
  );

  balls.push(ball);
}

// animation loop
function loop() {
  ctx.fillStyle = "rgb(0 0 0 / 25%)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();