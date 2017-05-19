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

  impact (pos) {
    let impact = new Impact(pos.e(1), pos.e(2), pos.e(3), 50, this.border);
    game.addChild(impact);
  }

  collide (pos, dist) {
    let line = $L(pos, this.i);
    let cont = true;
    game.shapes.forEach(obj => {
      if (
        !cont ||
        (obj === game.player && this.type === "player") ||
        pos.distanceFrom(obj.position) >= 2000 ||
        obj.isPulsemun
      ) return;
      const v = obj.vertices; // shorthand
      obj.polygons && obj.polygons.forEach(poly => {
        let plane = $P(
          v[poly.points[0]],
          v[poly.points[1]],
          v[poly.points[2]]
        );
        let hit = plane.intersectionWith(line);
        if (hit && pos.distanceFrom(hit) <= dist) {
          let hit2points = poly.points.map(pt => v[pt].subtract(hit));
          let angle = 0;
          for (var i = 0; i < hit2points.length; i++) {
            angle += hit2points[i].angleFrom(hit2points[(i<hit2points.length-1 ? i+1 : 0)]);
          }
          if (Math.abs(angle-Math.PI*2) <= 0.01) {
            game.removeChild(this);
            cont = false;
            this.impact(hit);
          }
        }
      });
    });
  }

}
