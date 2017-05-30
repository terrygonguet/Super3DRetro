class Camera extends createjs.Shape {

  constructor(game) {
    super();
    this.position      = Vector.Zero(3);
    this.i             = Vector.i.dup();
    this.j             = Vector.j.dup();
    this.k             = Vector.k.x(-1);
    this.fovW          = Math.PI / 2;
    this.fovH          = this.fovW * (game.canvas.height / game.canvas.width);
    this.transferMatrix= $M([
      [this.i.e(1), this.i.e(2), this.i.e(3)],
      [this.j.e(1), this.j.e(2), this.j.e(3)],
      [this.k.e(1), this.k.e(2), this.k.e(3)]
    ]);
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

  resize () {
    this.fovH = this.fovW * (game.canvas.height / game.canvas.width);
  }

  render (camera) {
    this.graphics.c();
  }

  move (vect) {
    this.position = this.position.add(vect);
  }

  getDispCoords (point3d, force=false) {
    let retval = false;
    if (force || point3d.subtract(this.position).angleFrom(this.i) < this.fovW) {
      let camCoords = this.transferMatrix.x(point3d.subtract(this.position));
      let diag = Math.sqrt(Math.pow(camCoords.e(1), 2) + Math.pow(camCoords.e(3), 2));
      let angleX = Math.atan(camCoords.e(2) / diag);
      diag = Math.sqrt(Math.pow(camCoords.e(1), 2) + Math.pow(camCoords.e(2), 2));
      let angleY = Math.atan(camCoords.e(3) / diag);

      retval = {
        x: (angleX/(this.fovW/2) + 1) * game.canvas.width / 2,
        y: (angleY/(this.fovH/2) + 1) * game.canvas.height / 2
      };
    }
    return retval;
  }

  color(border, inner) {
    this.graphics.s(border).f(inner);
    return this;
  }

  drawPoint (coords) {
    let dispCoords = this.getDispCoords(coords);
    if (dispCoords) {
      game.nbRendered++;
      this.graphics.r(dispCoords.x, dispCoords.y, 1, 1);
    }
    return this;
  }

  drawLine (ptFrom, ptTo, force=false) {
    let a = this.getDispCoords(ptFrom, force);
    let b = this.getDispCoords(ptTo, force);
    if (a && b) {
      game.nbRendered++;
      this.graphics.mt(a.x, a.y).lt(b.x, b.y);
    }
    return this;
  }

  drawCircle (coords, radius, force=false) {
    let dispCoords = this.getDispCoords(coords, force);
    if (dispCoords) {
      game.nbRendered++;
      this.graphics.dc(
        dispCoords.x, dispCoords.y,
        radius*(1-this.position.distanceFrom(coords)/2000).clamp(0.3,radius)
      );
    }
    return this;
  }

  drawPoly (points, force=false) {
    let coords = points.map(pt => {
      return this.getDispCoords(pt, force);
    });
    if (!coords[0]) return;
    game.nbRendered++;
    this.graphics.mt(coords[0].x, coords[0].y);
    coords.shift();
    coords.forEach(pt => this.graphics.lt(pt.x, pt.y));
    this.graphics.cp();

    return this;
  }

}
