class Point3D extends Object3D  {

  constructor(x, y, z) {
    super(x, y, z);
  }

  render (camera) {
    camera.drawPoint(this.position);
  }

}
