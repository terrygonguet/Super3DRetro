class Indicator extends Shape3D {

  constructor (x, y, z) {
    super(x, y, z);
    this.addVertex($V([0,0,0]));
    this.addVertex($V([1,0,0]));
    this.addVertex($V([0,1,0]));
    this.addVertex($V([0,0,1]));

    this.addEdge(0,1);
    this.addEdge(0,2);
    this.addEdge(0,3);
  }

  update (e) {
    this.vertices[0] = $V([10,0,0]);// game.camera.position.add(game.camera.i.x(5));
    this.vertices[1] = this.vertices[0].add(game.camera.i);
    this.vertices[2] = this.vertices[0].add(game.camera.j);
    this.vertices[3] = this.vertices[0].add(game.camera.k);
  }

  render (camera) {
    camera.color("#E11").drawLine(
      this.vertices[this.edges[0].from], this.vertices[this.edges[0].to]);
    camera.color("#1E1").drawLine(
      this.vertices[this.edges[1].from], this.vertices[this.edges[1].to]);
    camera.color("#11E").drawLine(
      this.vertices[this.edges[2].from], this.vertices[this.edges[2].to]);
  }

}
