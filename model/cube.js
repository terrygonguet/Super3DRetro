class Cube extends Shape3D {

  constructor(x, y, z, side, color = "#EEE") {
    super(x, y, z);
    this.color = color
    this.addVertex($V([-side / 2,-side / 2,-side / 2]));
    this.addVertex($V([side / 2,-side / 2,-side / 2]));
    this.addVertex($V([-side / 2,side / 2,-side / 2]));
    this.addVertex($V([-side / 2,-side / 2,side / 2]));
    this.addVertex($V([side / 2,-side / 2,side / 2]));
    this.addVertex($V([side / 2,side / 2,-side / 2]));
    this.addVertex($V([-side / 2,side / 2,side / 2]));
    this.addVertex($V([side / 2,side / 2,side / 2]));

    this.addEdge(0, 1);
    this.addEdge(0, 2);
    this.addEdge(0, 3);
    this.addEdge(7, 4);
    this.addEdge(7, 5);
    this.addEdge(7, 6);
    this.addEdge(1, 4);
    this.addEdge(1, 5);
    this.addEdge(2, 6);
    this.addEdge(2, 5);
    this.addEdge(3, 4);
    this.addEdge(3, 6);
  }

  update (e) {
    super.update(e);
  }

}
