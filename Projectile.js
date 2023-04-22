export default class Projectile {
  constructor(game, player, mouseX, mouseY) {
    this.game = game;
    this.player = player;
    this.mx = mouseX;
    this.my = mouseY;

    this.x = player.x;
    this.y = player.y;
    this.r = 15;

    // console.log(this.x);
    // console.log(this.y);

    let diffX = player.x - mouseX;
    let diffY = player.y - mouseY;

    this.speed = 15;

    let angle = Math.atan2(diffY, diffX) + Math.PI;

    this.dx = this.speed * Math.cos(angle);
    this.dy = this.speed * Math.sin(angle);
  }
  update() {
    this.x += this.dx;
    this.y += this.dy;
  }
  draw(ctx) {
    ctx.fillStyle = "rgb(90, 200, 170)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fill();
  }
}
