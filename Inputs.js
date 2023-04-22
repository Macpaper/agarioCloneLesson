export default class Inputs {
  constructor(game, player) {
    this.game = game;
    this.player = player;

    document.addEventListener("mousedown", (e) => {
      if (e.button == 0) {
        // console.log("left click");
        this.player.mouseX = e.clientX;
        this.player.mouseY = e.clientY;
        this.player.shooting = true;
      }
      if (e.button == 2) {
        // console.log("right click");
      }
    });

    document.addEventListener("mousemove", (e) => {
      this.player.mouseX = e.clientX;
      this.player.mouseY = e.clientY;
    });

    document.addEventListener("mouseup", (e) => {
      if (e.button == 0) {
        this.player.shooting = false;
      }
    });
    document.addEventListener("scroll", (e) => {
      // console.log(e);
    });

    document.addEventListener("wheel", (e) => {
      if (e.wheelDelta > 0) {
        this.game.zoom(1);
      } else {
        this.game.zoom(-1);
      }
    });

    document.addEventListener("keydown", (e) => {
      // console.log(e.key);
      this.handleKeys(e.key.toLowerCase(), true);
    });

    document.addEventListener("keyup", (e) => {
      this.handleKeys(e.key.toLowerCase(), false);
    });
  }
  handleKeys(key, isPressed) {
    if (key == "w") {
      this.player.up = isPressed;
    }
    if (key == "a") {
      this.player.left = isPressed;
    }
    if (key == "s") {
      this.player.down = isPressed;
    }
    if (key == "d") {
      this.player.right = isPressed;
    }
    if (key == "arrowdown") {
    }
    if (key == "arrowup") {
    }
  }
}
