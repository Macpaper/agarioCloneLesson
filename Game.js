import CircleGuy from "./CircleGuy.js";
import Player from "./Player.js";
import Map from "./map.js";
import Spawner from "./Spawner.js";

export default class Game {
  constructor(WIDTH, HEIGHT) {
    this.gameWidth = WIDTH;
    this.gameHeight = HEIGHT;

    this.circles = [];
    this.projectiles = [];
    this.foods = [];
    this.player = new Player(this);
    this.map = new Map(this);
    this.spawner = new Spawner(this);

    this.currentScale = 1;
    this.allCircles = [...this.circles, this.player];
  }

  update() {
    this.allCircles = [...this.circles, this.player];
    this.spawner.update();
    this.map.update();
    if (!this.player.dead) this.player.update();
    this.circles.forEach((c) => {
      c.update();
    });
    this.projectiles.forEach((p) => {
      p.update();
    });
    this.circles = this.circles.filter((c) => !c.consumed);
    this.foods.forEach((f) => {
      f.update();
    });
  }

  draw(ctx) {
    this.map.draw(ctx);
    this.foods.forEach((f) => {
      f.draw(ctx);
    });
    this.circles.forEach((c) => {
      c.draw(ctx);
    });
    this.projectiles.forEach((p) => {
      p.draw(ctx);
    });
    if (!this.player.dead) this.player.draw(ctx);
  }

  zoom(num, zFactor) {
    let zScale = 0.1;
    let zoomFactor;
    if (!zFactor) {
      zoomFactor = Math.abs(zScale + num);
    } else {
      zoomFactor = zFactor;
    }

    // if (num == 1) {
    //   zoomFactor = 1.1;
    // } else {
    //   zoomFactor = 0.9;
    // }

    this.currentScale = this.currentScale * zoomFactor;
    console.log(this.currentScalze);
    //save old player position
    let oldPlayerX = this.player.getX();
    let oldPlayerY = this.player.getY();

    // PLAYER SCALING UP
    this.player.setR(this.player.getR() * zoomFactor);
    this.player.speed = this.player.speed * zoomFactor;
    this.player.accelX = this.player.accelX * zoomFactor;
    this.player.accelY = this.player.accelY * zoomFactor;
    this.player.x = this.player.x * zoomFactor;
    this.player.y = this.player.y * zoomFactor;

    // need this difference for everything
    let diffX = oldPlayerX - this.player.x;
    let diffY = oldPlayerY - this.player.y;
    this.player.x += diffX;
    this.player.y += diffY;

    // CIRCLE SCALING UP
    this.circles.forEach((c) => {
      c.setR(c.getR() * zoomFactor);
      c.dx = c.dx * zoomFactor;
      c.dy = c.dy * zoomFactor;
      c.x = c.x * zoomFactor;
      c.y = c.y * zoomFactor;
      c.speed = c.speed * zoomFactor;
      c.x += diffX;
      c.y += diffY;
    });

    this.foods.forEach((f) => {
      f.setR(f.getR() * zoomFactor);
      f.dx = f.dx * zoomFactor;
      f.dy = f.dy * zoomFactor;
      f.x = f.x * zoomFactor;
      f.y = f.y * zoomFactor;
      f.x += diffX;
      f.y += diffY;
    });

    // MAP SCALING UP
    this.map.tileSize = this.map.tileSize * zoomFactor;
    this.map.tiles.forEach((t) => {
      t.x = t.x * zoomFactor;
      t.y = t.y * zoomFactor;
      t.x += diffX;
      t.y += diffY;
    });
  }
}

// zoomIn() {
//   let zoomFactor = 1.1;

//   // PLAYER SCALING UP
//   let oldPlayerX = this.player.getX();
//   let oldPlayerY = this.player.getY();
//   this.player.setR(this.player.getR() * zoomFactor);
//   this.player.speed = this.player.speed * zoomFactor;
//   this.player.accelX = this.player.accelX * zoomFactor;
//   this.player.accelY = this.player.accelY * zoomFactor;
//   this.player.x = this.player.x * zoomFactor;
//   this.player.y = this.player.y * zoomFactor;
//   let diffX = oldPlayerX - this.player.x;
//   let diffY = oldPlayerY - this.player.y;
//   this.player.x += diffX;
//   this.player.y += diffY;

//   // CIRCLE SCALING UP
//   this.circles.forEach((c) => {
//     c.setR(c.getR() * zoomFactor);
//     c.dx = c.dx * zoomFactor;
//     c.dy = c.dy * zoomFactor;
//     c.x = c.x * zoomFactor;
//     c.y = c.y * zoomFactor;
//     c.x += diffX;
//     c.y += diffY;
//   });

//   // MAP SCALING UP
//   this.map.tileSize = this.map.tileSize * zoomFactor;
//   this.map.tiles.forEach((t) => {
//     t.x = t.x * zoomFactor;
//     t.y = t.y * zoomFactor;
//     t.x += diffX;
//     t.y += diffY;
//   });
// }
// zoomOut() {
//   let zoomFactor = 0.9;

//   // PLAYER SCALING DOWN
//   let oldPlayerX = this.player.getX();
//   let oldPlayerY = this.player.getY();
//   this.player.setR(this.player.getR() * zoomFactor);
//   this.player.speed = this.player.speed * zoomFactor;
//   this.player.accelX = this.player.accelX * zoomFactor;
//   this.player.accelY = this.player.accelY * zoomFactor;
//   this.player.x = this.player.x * zoomFactor;
//   this.player.y = this.player.y * zoomFactor;
//   let diffX = oldPlayerX - this.player.x;
//   let diffY = oldPlayerY - this.player.y;
//   this.player.x += diffX;
//   this.player.y += diffY;

//   // CIRCLES SCALING DOWN
//   this.circles.forEach((c) => {
//     c.setR(c.getR() * zoomFactor);
//     c.x = c.x * zoomFactor;
//     c.y = c.y * zoomFactor;
//     c.dx = c.dx * zoomFactor;
//     c.dy = c.dy * zoomFactor;
//     c.x += diffX;
//     c.y += diffY;
//   });

//   // MAP SCALING DOWN
//   this.map.tileSize = this.map.tileSize * zoomFactor;
//   this.map.tiles.forEach((t) => {
//     t.x = t.x * zoomFactor;
//     t.y = t.y * zoomFactor;
//     t.x += diffX;
//     t.y += diffY;
//   });
// }
// console.log("first tile y: " + this.map.tiles[0].y);
// console.log("before tile x: " + this.map.tiles[0].x);
// let oldX = this.map.tiles[0].x;

// this.map.mapRelativeY = this.map.mapRelativeY * zoomFactor;
// this.map.lowerMapBoundsX = this.map.tiles[0].x;
// this.map.upperMapBoundsX =
//   this.map.tiles[this.map.tiles.length - 1].x + this.map.tileSize;
// this.map.lowerMapBoundsY = this.map.tiles[0].y;
// this.map.upperMapBoundsY =
//   this.map.tiles[this.map.tiles.length - 1].y + this.map.tileSize;

// this.map.mapRelativeX =
//   (this.map.upperMapBoundsX - this.map.lowerMapBoundsX) / 2 +
//   this.map.lowerMapBoundsX;
// this.map.mapRelativeY =
//   (this.map.upperMapBoundsY - this.map.lowerMapBoundsY) / 2 +
//   this.map.lowerMapBoundsY;
// console.log("lower x bounds of map: " + this.map.lowerMapBoundsX);
// console.log("upper x bounds of map: " + this.map.upperMapBoundsX);
// console.log("lower y bounds of map: " + this.map.lowerMapBoundsY);
// console.log("upper y bounds of map: " + this.map.upperMapBoundsY);
// console.log("map x: " + this.map.mapRelativeX);
// console.log("map y: " + this.map.mapRelativeY);
// console.log("player x: " + this.player.x);
// console.log("player y: " + this.player.y);
// console.log(oldX - this.map.tiles[0].x);
// console.log("after tile x: " + this.map.tiles[0].x);

// console.log(this.map.lowerMapBounds);
// console.log(this.map.upperMapBounds);
// this.map.lowerMapBoundsX = this.map.tiles[0].x;
// this.map.upperMapBoundsX =
//   this.map.tiles[this.map.tiles.length - 1].x + this.map.tileSize;
// this.map.lowerMapBoundsY = this.map.tiles[0].y;
// this.map.upperMapBoundsY =
//   this.map.tiles[this.map.tiles.length - 1].y + this.map.tileSize;

// this.map.mapRelativeX =
//   (this.map.upperMapBoundsX - this.map.lowerMapBoundsX) / 2 +
//   this.map.lowerMapBoundsX;
// this.map.mapRelativeY =
//   (this.map.upperMapBoundsY - this.map.lowerMapBoundsY) / 2 +
//   this.map.lowerMapBoundsY;

// console.log("lower x bounds of map: " + this.map.lowerMapBoundsX);
// console.log("upper x bounds of map: " + this.map.upperMapBoundsX);
// console.log("lower y bounds of map: " + this.map.lowerMapBoundsY);
// console.log("upper y bounds of map: " + this.map.upperMapBoundsY);
// console.log("map x: " + this.map.mapRelativeX);
// console.log("map y: " + this.map.mapRelativeY);
// console.log("player x: " + this.player.x);
// console.log("player y: " + this.player.y);
