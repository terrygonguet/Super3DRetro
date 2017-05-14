/*
 * The main class handling updates and graphics
 */

class Game extends createjs.Stage {

  constructor (canvasName) {
    super(canvasName);

    this.tickEnabled  = true;
    this.txtFps       = new QuickText({ x: 10, y: 10 });
    this.txtrendered  = new QuickText({ x: 10, y: 30 });
    this.txtrendertime= new QuickText({ x: 10, y: 50 });
    this.camera       = new Camera(this);
    this.objects3D    = [ this.camera ];
    this.stardust     = new Stardust();
    this.player       = new Spaceship(0,0,0);
    this.nbRendered   = 0;
    this.rendertime   = 0;

    this.setHandlers();

    this.addChild(this.txtFps);
    this.addChild(this.txtrendered);
    this.addChild(this.txtrendertime);
    this.addChild(this.camera);
    this.addChild(this.stardust);
    this.addChild(this.player);
  }

  setHandlers () {
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.framerate = 60;
    createjs.Ticker.on("tick", this.update, this);
  }

  update (e) {
    this.txtFps.text = createjs.Ticker.getMeasuredFPS().toFixed(0) + " FPS";
    this.txtrendered.text = this.nbRendered + " Objects rendered";
    this.nbRendered = 0;
    this.rendertime = 0;
    if (!e.paused) {
      let time = performance.now();
      super.update(e);
      this.objects3D.forEach(child => child.update(e));
      this.objects3D.forEach(child => child.render(this.camera));
      this.rendertime += (performance.now() - time);
    }
    this.txtrendertime.text = this.rendertime.toPrecision(3) + " ms render time";
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
