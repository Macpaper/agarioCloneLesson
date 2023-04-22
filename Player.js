import Inputs from "./Inputs.js";
import Projectile from "./Projectile.js";
export default class Player {
  constructor(game) {
    this.game = game;
    this.x = game.gameWidth / 2;
    this.y = game.gameHeight / 2;
    this.maxSpeed = 10;
    this.dx = 0;
    this.dy = 0;
    this.accelX = 0.6;
    this.accelY = 0.6;

    this.r = 50;
    this.inputs = new Inputs(game, this);

    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;

    this.shooting = false;
    this.mouseX = 0;
    this.mouseY = 0;

    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;

    this.color = `rgba(${r}, ${g}, ${b})`;
    this.consumed = false;

    this.shootingTimer = Date.now();
    this.shootingDelay = 200;
  }
  update() {
    // SHOOTING
    if (this.shooting) {
      let currentTime = Date.now();
      let diffTime = currentTime - this.shootingTimer;

      if (diffTime >= this.shootingDelay) {
        // console.log("pew!");
        let pew = new Projectile(this.game, this, this.mouseX, this.mouseY);
        this.game.projectiles.push(pew);
        this.shootingTimer = Date.now();
      }
    }

    // CAPS SPEED
    if (this.dx > this.maxSpeed) {
      this.dx = this.maxSpeed;
    }
    if (this.dx < -this.maxSpeed) {
      this.dx = -this.maxSpeed;
    }

    if (this.dy > this.maxSpeed) {
      this.dy = this.maxSpeed;
    }
    if (this.dy < -this.maxSpeed) {
      this.dy = -this.maxSpeed;
    }

    // // FRICTION
    this.dx = this.dx * 0.88;
    this.dy = this.dy * 0.88;

    // MOVEMENT
    if (this.left) {
      this.dx += -this.accelX;
    }
    if (this.right) {
      this.dx += this.accelX;
    }
    if (this.up) {
      this.dy += -this.accelY;
    }
    if (this.down) {
      this.dy += this.accelY;
    }

    // let xLBound = this.game.map.lowerMapBounds + this.game.map.mapRelativeX;
    // let xRBound = this.game.map.upperMapBounds + this.game.map.mapRelativeX;

    // let yLBound = this.game.map.lowerMapBounds + this.game.map.mapRelativeY;
    // let yUBound = this.game.map.upperMapBounds + this.game.map.mapRelativeY;
    // use these to stop player moving from each bound

    if (
      (this.up && this.left) ||
      (this.up && this.right) ||
      (this.down && this.left) ||
      (this.down && this.right)
    ) {
      this.game.circles.forEach((c) => {
        c.x -= (1 / Math.sqrt(2)) * this.dx;
        c.y -= (1 / Math.sqrt(2)) * this.dy;
      });
      this.game.map.tiles.forEach((t) => {
        t.x -= (1 / Math.sqrt(2)) * this.dx;
        t.y -= (1 / Math.sqrt(2)) * this.dy;
      });
      this.game.projectiles.forEach((t) => {
        t.x -= (1 / Math.sqrt(2)) * this.dx;
        t.y -= (1 / Math.sqrt(2)) * this.dy;
      });
      this.game.foods.forEach((f) => {
        f.x -= (1 / Math.sqrt(2)) * this.dx;
        f.y -= (1 / Math.sqrt(2)) * this.dy;
      });
      this.game.map.mapRelativeX -= (1 / Math.sqrt(2)) * this.dx;
      this.game.map.mapRelativeY -= (1 / Math.sqrt(2)) * this.dy;
    } else {
      this.game.circles.forEach((c) => {
        c.x -= this.dx;
        c.y -= this.dy;
      });
      this.game.map.tiles.forEach((t) => {
        t.x -= this.dx;
        t.y -= this.dy;
      });
      this.game.projectiles.forEach((t) => {
        t.x -= this.dx;
        t.y -= this.dy;
      });
      this.game.foods.forEach((f) => {
        f.x -= this.dx;
        f.y -= this.dy;
      });
      this.game.map.mapRelativeX -= this.dx;
      this.game.map.mapRelativeY -= this.dy;
      // console.log("map relative x (middle): " + this.game.map.mapRelativeX);
      // console.log("map relative y (middle): " + this.game.map.mapRelativeY);
    }

    // console.log(this.game.map.lowerMapBounds - this.game.map.mapRelativeY);
  }
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.font = "15px Arial";
    ctx.fillStyle = "rgba(255, 255, 255)";
    ctx.fillText("x: " + this.mouseX, this.mouseX + 15, this.mouseY);
    ctx.fillText("y: " + this.mouseY, this.mouseX + 15, this.mouseY + 15);
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  getR() {
    return this.r;
  }
  setR(r) {
    this.r = r;
  }
  setX(x) {
    this.x = x;
  }
  setY(y) {
    this.y = y;
  }
  getArea() {
    return Math.PI * this.r * this.r;
  }
}

// export default function Player(game) {
//   this.game = game;
//   this.x = game.gameWidth / 2;
//   this.y = game.gameHeight / 2;
//   this.dx = 10;
//   this.dy = 10;
//   this.accelX = 0;
//   this.accelY = 0;

//   this.r = 50;

//   this.inputs = new Inputs(game, this);

//   this.left = false;
//   this.right = false;
//   this.up = false;
//   this.down = false;

//   let r = Math.random() * 255;
//   let g = Math.random() * 255;
//   let b = Math.random() * 255;
//   this.color = `rgba(${r}, ${g},${b})`;
// }

// Player.prototype.draw = function (ctx) {
//   ctx.fillStyle = this.color;
//   ctx.beginPath();
//   ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
//   ctx.fill();
// };

// Player.prototype.update = function () {
//   let accelBounds = 0.03;
//   if (this.accelX > 3) {
//     this.accelX = 3;
//   }
//   if (this.accelX < -3) {
//     this.accelX = -3;
//   }
//   if (this.accelY > 3) {
//     this.accelY = 3;
//   }
//   if (this.accelY < -3) {
//     this.accelY = -3;
//   }
//   if (this.accelX > 0) {
//     this.accelX -= 0.05;
//   }
//   if (this.accelX < 0) {
//     this.accelX += 0.05;
//   }

//   if (Math.abs(this.accelX - accelBounds) <= accelBounds) {
//     this.accelX = 0;
//   }
//   if (this.accelY > 0) {
//     this.accelY -= accelBounds;
//   }
//   if (this.accelY < 0) {
//     this.accelY += accelBounds;
//   }
//   if (Math.abs(this.accelY - accelBounds) <= accelBounds) {
//     this.accelY = 0;
//   }

//   if (this.left) {
//     this.accelX += -0.6;
//   }
//   if (this.right) {
//     this.accelX += 0.6;
//   }
//   if (this.up) {
//     this.accelY += -0.6;
//   }
//   if (this.down) {
//     this.accelY += 0.6;
//   }
//   this.dx += this.accelX;
//   this.dy += this.accelY;
//   this.x += this.dx;
//   this.y += this.dy;
//   this.dx = 0;
//   this.dy = 0;
// };
