export default class Map {
  constructor(game) {
    this.tileSize = 200;
    this.tiles = [];
    this.game = game;
    this.mapTileLength = 25;

    for (let i = -this.mapTileLength; i < this.mapTileLength; i++) {
      for (let j = -this.mapTileLength; j < this.mapTileLength; j++) {
        this.tiles.push({
          x: i * this.tileSize + this.game.gameWidth / 2,
          y: j * this.tileSize + this.game.gameHeight / 2,
          width: this.tileSize,
          height: this.tileSize,
          hasEnemy: false,
        });
      }
    }
    this.lowerMapBoundsX = this.tiles[0].x;
    this.upperMapBoundsX = this.tiles[this.tiles.length - 1].x + this.tileSize;
    this.lowerMapBoundsY = this.tiles[0].y;
    this.upperMapBoundsY = this.tiles[this.tiles.length - 1].y + this.tileSize;
  }
  update() {
    this.lowerMapBoundsX = this.tiles[0].x;
    this.upperMapBoundsX = this.tiles[this.tiles.length - 1].x + this.tileSize;
    this.lowerMapBoundsY = this.tiles[0].y;
    this.upperMapBoundsY = this.tiles[this.tiles.length - 1].y + this.tileSize;
    this.tiles.forEach((t) => {});
  }
  draw(ctx) {
    ctx.fillStyle = "rgba(0, 0, 0)";
    ctx.strokeStyle = "rgba(0, 0, 0)";
    this.tiles.forEach((t) => {
      ctx.beginPath();
      ctx.rect(t.x, t.y, this.tileSize, this.tileSize);
      ctx.stroke();
    });
    // for (let y = 0; y <= 10; y++) {
    //   let startX = 0;
    //   let startY = y;
    //   let endX = 10;
    //   let endY = y;

    //   let pixel_sx, pixel_sy, pixel_ex, pixel_ey;

    //   pixel_sx = this.WorldtoScreen(sx, sy).nScreenX;
    //   pixel_sy = this.WorldtoScreen(sx, sy).nScreenY;
    //   pixel_ex = this.WorldtoScreen(ex, ey).nScreenX;
    //   pixel_ey = this.WorldtoScreen(ex, ey).nScreenX;

    //   ctx.fillStyle = "rgb(255, 255, 255)";

    //   ctx.beginPath();
    //   ctx.rect(pixel_sx, pixel_sy, pixel_ex, pixel_ey);
    //   // ctx.moveTo(pixel_sx, pixel_sy);
    //   // ctx.lineTo(pixel_ey, pixel_ey);
    //   ctx.stroke();
    // }
  }
  WorldtoScreen(fWorldX, fWorldY) {
    return {
      // set screenx to nscreenx and y
      nScreenX: fWorldX - this.fOffsetX,
      nScreenY: fWorldY - this.fOffsetY,
    };
  }
  ScreenToWorld(nScreenX, nScreenY) {
    return {
      fWorldX: nScreenX + this.fOffsetX,
      fWorldY: nScreenY + this.fOffsetY,
    };
  }
}
