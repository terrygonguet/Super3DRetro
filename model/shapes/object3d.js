class Object3D extends createjs.DisplayObject {

  constructor(x, y, z) {
    super();
    this.position  = $V([x, y, z]);
    this.i         = Vector.i.dup();
    this.j         = Vector.j.dup();
    this.k         = Vector.k.x(-1);
    this.border    = "#EEE";
    this.inner     = "#111";
  }

  render (camera) {

  }

}
