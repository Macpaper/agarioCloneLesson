export default class Food {
  constructor(game, x, y) {
    this.x = x;
    this.y = y;
    this.myTile = { tileX: x, tileY: y };
    this.r = 15;
    this.game = game;
    this.dx = 0;
    this.dy = 0;
    let red = Math.random() * 256;
    let green = Math.random() * 256;
    let blue = Math.random() * 256;
    this.color = `rgba(${red}, ${green}, ${blue})`;
    this.setToRespawn = false;

    this.spawnTimer = Date.now();
    this.spawnDelay = (Math.random() * (60 - 30) + 30) * 1000;
  }
  update() {
    this.x += this.dx;
    this.y += this.dy;
    let diffX = this.x - this.game.player.getX();
    let diffY = this.y - this.game.player.getY();

    let dist = Math.sqrt(diffX * diffX + diffY * diffY);

    if (this.setToRespawn) {
      let currentTime = Date.now();
      let diffTime = currentTime - this.spawnTimer;
      if (diffTime >= this.spawnDelay) {
        this.setToRespawn = false;
        this.spawnTimer = Date.now();
      }
    }
    if (
      dist < this.r + this.game.player.getR() &&
      !this.game.player.dead &&
      !this.setToRespawn
    ) {
      // let newArea = this.getArea() + this.game.player.getArea();
      let newPlayerRadius = Math.sqrt(
        this.r * this.r + this.game.player.getR() * this.game.player.getR()
      );
      // let ratio = this.game.player.getR() / newPlayerRadius;
      // this.game.zoom(1, ratio);
      this.game.player.setR(newPlayerRadius);
      this.setToRespawn = true;
    }
  }
  draw(ctx) {
    if (!this.setToRespawn) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
      ctx.fill();
    }
  }

  setR(r) {
    this.r = r;
  }
  getR() {
    return this.r;
  }
  setX(x) {
    this.x = x;
  }
  getX() {
    return this.x;
  }
  setY(y) {
    this.y = y;
  }
  getY() {
    return this.y;
  }
  getArea() {
    return Math.PI * this.r * this.r;
  }
}
