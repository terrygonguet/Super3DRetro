class Cube extends Shape3D {

  constructor(x, y, z, side, color = "#EEE") {
    super(x, y, z);
    this.color = color;
    this.inner = null;
    this.addVertex($V([-side / 2,-side / 2,-side / 2])); // - - - 0
    this.addVertex($V([side / 2,-side / 2,-side / 2])); // + - - 1
    this.addVertex($V([-side / 2,side / 2,-side / 2])); // - + - 2
    this.addVertex($V([-side / 2,-side / 2,side / 2])); // - - + 3
    this.addVertex($V([side / 2,-side / 2,side / 2])); // + - + 4
    this.addVertex($V([side / 2,side / 2,-side / 2])); // + + - 5
    this.addVertex($V([-side / 2,side / 2,side / 2])); // - + + 6
    this.addVertex($V([side / 2,side / 2,side / 2])); // + + + 7

    this.addPolygon([0,1,4,3]);
    // this.addPolygon([0,1,3,4]);
    // this.addPolygon([]);
    // this.addPolygon([]);
    // this.addPolygon([]);
    // this.addPolygon([]);
  }

  update (e) {
    super.update(e);
  }

}
