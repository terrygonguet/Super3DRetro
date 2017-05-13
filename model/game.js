/*
 * The main class handling updates and graphics
 */

class Game extends createjs.Stage {

  constructor (canvasName) {
    super(canvasName);

    this.tickEnabled  = true;
    this.txtFps       = new QuickText({ x: 10, y: 10 });
    this.camera       = new Camera(this);
    this.objects3D    = [ this.camera ];

    this.setHandlers();

    this.addChild(this.txtFps);
    this.addChild(this.camera);
    this.addChild(new Cube(100,0,0,10,"#D22"));
  }

  setHandlers () {
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.framerate = 60;
    createjs.Ticker.on("tick", this.update, this);
  }

  update (e) {
    this.txtFps.text = createjs.Ticker.getMeasuredFPS().toFixed(0) + " FPS";
    if (!e.paused) {
      super.update(e);
      this.objects3D.forEach(child => child.update(e));
      this.objects3D.forEach(child => child.render(this.camera));
    }
  }

  addChild (child) {
    if (child instanceof Object3D) this.objects3D.push(child);
    super.addChild(child);
  }

  removeChild (child) {
    if (child instanceof Object3D) this.objects3D.splice(this.objects3D.indexOf(child), 1);
    super.removeChild(child);
  }

}
