class Point3D extends Object3D  {

  constructor(x, y, z) {
    super(x, y, z);
  }

  update (e) {

  }

  render (camera) {
    camera.color(this.color).drawPoint(this.position);
  }

}
