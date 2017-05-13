class Spaceship extends Shape3D {

  constructor(x, y, z) {
    super(x, y, z);

    this.speed     = 10;

    this.addVertex($V([-5,0,5])); // middle top
    this.addVertex($V([-5,0,-5])); // middle bottom
    this.addVertex($V([-5,-30,0])); // left wing
    this.addVertex($V([-5,30,0])); // right wing
    this.addVertex($V([40,0,0])); // nose

    this.addEdge(0,2);
    this.addEdge(0,3);
    this.addEdge(1,2);
    this.addEdge(1,3);
    this.addEdge(0,4);
    this.addEdge(2,4);
    this.addEdge(3,4);
  }

  update (e) {
    this.move(this.i.x(this.speed * e.delta / 1000));
    game.camera.move(this.i.x(this.speed * e.delta / 1000));
    // this.rotate(0,0,e.delta/1000*Math.PI/20);
  }

}
