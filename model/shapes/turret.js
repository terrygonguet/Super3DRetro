class Turret extends Shape3D {

  constructor(x, y, z) {
    super(x, y, z);

    this.time = 0;
    this.fireRate = 1;

    this.addVertex($V([-10,0,0])); // back 0
    this.addVertex($V([0,-10,0])); // left 1
    this.addVertex($V([0,10,0])); // right 2
    this.addVertex($V([0,0,-10])); // top 3
    this.addVertex($V([0,0,10])); // bottom 4
    this.addVertex($V([25,0,0])); // cannon 5

    this.addPolygon([0,1,3]);
    this.addPolygon([0,2,3]);
    this.addPolygon([0,1,4]);
    this.addPolygon([0,2,4]);
    this.addPolygon([5,1,3]);
    this.addPolygon([5,2,3]);
    this.addPolygon([5,1,4]);
    this.addPolygon([5,2,4]);
  }

  update (e) {
    this.time += e.delta;

    if (game.player.position.distanceFrom(this.position) <= 1000) {
      const transferMatrix = $M([
        [this.i.e(1), this.i.e(2), this.i.e(3)],
        [this.j.e(1), this.j.e(2), this.j.e(3)],
        [this.k.e(1), this.k.e(2), this.k.e(3)]
      ]);
      let camCoords = transferMatrix.x(game.player.position.subtract(this.position));
      let angleX = $V([camCoords.e(1), camCoords.e(2), 0]).angleFrom(Vector.i.x(-1));
      let angleY = $V([camCoords.e(1), 0, camCoords.e(3)]).angleFrom(Vector.i.x(-1));

      this.rotate(0, angleY, angleX);

      if (this.time >= 1000/this.fireRate) {
        this.time = 0;
        this.shoot();
      }
    }
  }

  shoot () {
    game.addChild(new PulseMunition(this.position, [
      this.i, this.j, this.k
    ], 1500, "enemy"));
  }

}
