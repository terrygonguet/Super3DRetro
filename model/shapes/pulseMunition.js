class PulseMunition extends Shape3D {

  /*
   * position { Vector3 }
   * direction { [Vector3, Vector3, Vector3] }
   * speed { Number }
   */
  constructor(position, direction, speed, type="player") {
    super(position.e(1), position.e(2), position.e(3));
    this.i = direction[0];
    this.j = direction[1];
    this.k = direction[2];
    this.speed = speed;
    this.type = type;
    this.border = "#ED1C1C";
    this.inner = "rgba(189,43,43,0.2)";
    this.isPulsemun = true;

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
    this.collide(this.position, this.speed * e.delta / 1000);
    this.move(this.i.x(this.speed * e.delta / 1000));
    if (this.position.distanceFrom(game.camera.position) > 50000) game.removeChild(this);
  }

  impact (pos, poly) {
    let type = (poly.shieldGroup && poly.shieldGroup.working ? "circle" : "point");
    let impact = new Impact(pos.e(1), pos.e(2), pos.e(3), 50, this.border, type);
    poly.getHit(5);
    game.addChild(impact);
    game.removeChild(this);
  }

  collide (pos, dist) {
    let line = $L(pos, this.i);
    let cont = true;
    game.shapes.forEach(obj => {
      if (
        !cont ||
        (obj === game.player && this.type === "player") ||
        (obj !== game.player && this.type === "enemy") ||
        pos.distanceFrom(obj.position) >= 2000 ||
        obj.isPulsemun
      ) return;
      const v = obj.vertices; // shorthand
      obj.polygons && obj.polygons.forEach(poly => {
        let hit = poly.intersects(line);
        if (hit && hit.distanceFrom(pos) <= dist) {
          cont = false;
          this.impact(hit, poly);
        }
      });
    });
  }

}
