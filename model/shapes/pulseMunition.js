class PulseMunition extends Shape3D {

  /*
   * position { Vector3 }
   * direction { [Vector3, Vector3, Vector3] }
   * speed { Number }
   */
  constructor(position, direction, speed) {
    super(position.e(1), position.e(2), position.e(3));
    this.i = direction[0];
    this.j = direction[1];
    this.k = direction[2];
    this.speed = speed;
    this.border = "#ED1C1C";
    this.inner = "rgba(189,43,43,0.2)";

    this.addVertex($V([0,-0.5,-0.5]));
    this.addVertex($V([0,0.5,-0.5]));
    this.addVertex($V([0,0,0.5]));
    this.addVertex($V([-30,0,0]));

    this.addPolygon([0,1,2]);
    this.addPolygon([0,1,3]);
    this.addPolygon([1,2,3]);
    this.addPolygon([2,0,3]);
  }

  update (e) {
    this.move(this.i.x(this.speed * e.delta / 1000));
    if (this.position.distanceFrom(game.camera.position) > 50000) game.removeChild(this);
  }

}
