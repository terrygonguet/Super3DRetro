class Camera extends createjs.Shape {

  constructor(game) {
    super();
    this.position      = Vector.Zero(3);
    this.i             = Vector.i.dup();
    this.j             = Vector.j.dup();
    this.k             = Vector.k.dup();
    this.fovW          = Math.PI / 2;
    this.fovH          = this.fovW * (game.canvas.height / game.canvas.width);
    this.speed         = 10;
    this.transferMatrx = $M([
      [this.i.e(1), this.j.e(1), this.k.e(1)],
      [this.i.e(2), this.j.e(2), this.k.e(2)],
      [this.i.e(3), this.j.e(3), this.k.e(3)]
    ]);
  }

  update (e) {
    this.transferMatrx = $M([
      [this.i.e(1), this.j.e(1), this.k.e(1)],
      [this.i.e(2), this.j.e(2), this.k.e(2)],
      [this.i.e(3), this.j.e(3), this.k.e(3)]
    ]);
  }

  render (camera) {
    this.graphics.c();
  }

  move (vect) {
    this.position = this.position.add(vect);
  }

  getDispCoords (point3d) {
    let camCoords = this.transferMatrx.x(point3d.subtract(this.position));
    let angleX = $V([camCoords.e(1), camCoords.e(2), 0]).angleFrom(Vector.i);
    let angleY = $V([camCoords.e(1), 0, camCoords.e(3)]).angleFrom(Vector.i);

    if (angleX < this.fovW + 1 && angleY < this.fovH + 1) {
      let dispCoords = {
        x: (angleX*Math.PI/this.fovW*Math.sign(camCoords.e(2)) + 1) * game.canvas.width / 2,
        y: (angleY*Math.PI/this.fovH*Math.sign(camCoords.e(3)) + 1) * game.canvas.height / 2
      };
      return dispCoords;
    } else return false;
  }

  color(val) {
    this.graphics.s(val);
    return this;
  }

  drawPoint (coords) {
    let dispCoords = this.getDispCoords(coords);
    if (dispCoords) {
      this.graphics.r(dispCoords.x, dispCoords.y, 1, 1);
    }
  }

  drawLine (ptFrom, ptTo) {
    let a = this.getDispCoords(ptFrom);
    let b = this.getDispCoords(ptTo);
    if (a && b) {
      this.graphics.mt(a.x, a.y).lt(b.x, b.y);
    }
  }

}
