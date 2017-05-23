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
    this.objects3D    = [];
    this.shapes       = [];
    this.stardust     = new Stardust();
    this.player       = null;
    this.ui           = null;
    this.nbRendered   = 0;
    this.rendertime   = 0;

    this.setHandlers();

    this.addChild(this.txtFps);
    this.addChild(this.txtrendered);
    this.addChild(this.txtrendertime);
    this.addChild(this.camera);
    this.addChild(this.stardust);
  }

  setHandlers () {
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.framerate = 60;
    createjs.Ticker.on("tick", this.update, this);

    this.on("tick", e => {
      this.addChild(new CapitalShip(1300,0,-300));
      this.player = new Spaceship(0,0,0);
      this.addChild(this.player);
      this.ui = new UI();
      this.addChildAt(this.ui, this.children.length-1);
      // this.addChild(new Cube(500,0,0,200));
    }, null, true);
  }

  update (e) {
    this.txtFps.text = createjs.Ticker.getMeasuredFPS().toFixed(0) + " FPS";
    this.txtrendered.text = this.nbRendered + " Objects rendered";
    this.nbRendered = 0;
    this.rendertime = 0;
    let time = performance.now();
    if (!e.paused) {
      super.update(e);
      this.camera.update(e);
      this.camera.render(e);
      let sorted = this.shapes.map(obj => {
        return { dist:obj.position.distanceFrom(this.camera.position), obj };
      });
      sorted = _.sortBy(sorted, 'dist').map(obj => obj.obj);
      sorted.reverse();
      sorted.forEach(child => child.update(e));
      sorted.forEach(child => child.render(this.camera));
      this.objects3D.forEach(child => child.update && child.update(e));
      this.objects3D.forEach(child => child.render(this.camera));
    }
    game.rendertime += (performance.now() - time);
    this.txtrendertime.text = this.rendertime.toPrecision(3) + " ms render time";
  }

  addChild (child) {
    if (child.isShape) this.shapes.push(child);
    else if (child.is3D) this.objects3D.push(child);
    super.addChild(child);
  }

  removeChild (child) {
    if (child.isShape) this.shapes.splice(this.shapes.indexOf(child), 1);
    if (child.is3D) this.objects3D.splice(this.objects3D.indexOf(child), 1);
    super.removeChild(child);
  }

}
