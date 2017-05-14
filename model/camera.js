class Camera extends createjs.Shape {

  constructor(game) {
    super();
    this.position      = Vector.Zero(3);
    this.i             = Vector.i.dup();
    this.j             = Vector.j.dup();
    this.k             = Vector.k.x(-1);
    this.fovW          = Math.PI / 2;
    this.fovH          = this.fovW * (game.canvas.height / game.canvas.width);
    this.transferMatrix= null;
  }

  update (e) {
    this.transferMatrix = $M([
      [this.i.e(1), this.i.e(2), this.i.e(3)],
      [this.j.e(1), this.j.e(2), this.j.e(3)],
      [this.k.e(1), this.k.e(2), this.k.e(3)]
    ]);
  }

  rotate (angleI, angleJ, angleK) {
    if (angleI) {
      let rotation = Matrix.Rotation(angleI, this.i);
      this.j = rotation.x(this.j);
      this.k = rotation.x(this.k);
    }
    if (angleJ) {
      let rotation = Matrix.Rotation(angleJ, this.j);
      this.i = rotation.x(this.i);
      this.k = rotation.x(this.k);
    }
    if (angleK) {
      let rotation = Matrix.Rotation(angleK, this.k);
      this.i = rotation.x(this.i);
      this.j = rotation.x(this.j);
    }
  }

  render (camera) {
    this.graphics.c();
  }

  move (vect) {
    this.position = this.position.add(vect);
  }

  getDispCoords (point3d) {
    let retval = false;
    if (point3d.subtract(this.position).angleFrom(this.i) < this.fovW / 2) {
      let camCoords = this.transferMatrix.x(point3d.subtract(this.position));
      let angleX = $V([camCoords.e(1), camCoords.e(2), 0]).angleFrom(Vector.i);
      let angleY = $V([camCoords.e(1), 0, camCoords.e(3)]).angleFrom(Vector.i);

      retval = {
        x: (angleX*Math.PI/this.fovW*Math.sign(camCoords.e(2)) + 1) * game.canvas.width / 2,
        y: (angleY*Math.PI/this.fovH*Math.sign(camCoords.e(3)) + 1) * game.canvas.height / 2
      };
    }
    return retval;
  }

  color(val) {
    this.graphics.s(val);
    return this;
  }

  drawPoint (coords) {
    let dispCoords = this.getDispCoords(coords);
    if (dispCoords) {
      game.nbRendered++;
      this.graphics.r(dispCoords.x, dispCoords.y, 1, 1);
    }
  }

  drawLine (ptFrom, ptTo) {
    let a = this.getDispCoords(ptFrom);
    let b = this.getDispCoords(ptTo);
    if (a && b) {
      game.nbRendered++;
      this.graphics.mt(a.x, a.y).lt(b.x, b.y);
    }
  }

}
