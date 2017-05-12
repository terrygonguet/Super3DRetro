class Object3D extends createjs.DisplayObject {

  constructor(x, y, z) {
    super();
    this.position  = $V([x, y, z]);
  }

  render (camera) {
    
  }

}
