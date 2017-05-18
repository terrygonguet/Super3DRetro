class Point3D extends Object3D  {

  constructor(x, y, z, color="#EEE") {
    super(x, y, z);
    this.is3D = true;
    this.border = color;
  }

  update (e) {

  }

  render (camera) {
    camera.color(this.border).drawPoint(this.position);
  }

}
