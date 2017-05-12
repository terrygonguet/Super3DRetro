/*
 * The main class handling updates and graphics
 */

class Game extends createjs.Stage {

  constructor (canvasName) {
    super(canvasName);

    this.tickEnabled  = true;
    this.txtFps       = new createjs.Text("-- FPS", "20px ArcadeClassic", "#EEE");

    this.setHandlers();

    this.addChild(this.txtFps);
  }

  setHandlers () {
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.framerate = 60;
    createjs.Ticker.on("tick", this.update, this);
  }

  update (e) {
    this.txtFps.text = createjs.Ticker.getMeasuredFPS().toFixed(0) + " FPS";
    !e.paused && super.update(e);
  }

  addChild (child) {
    super.addChild(child);
  }

  removeChild (child) {
    super.removeChild(child);
  }

}
