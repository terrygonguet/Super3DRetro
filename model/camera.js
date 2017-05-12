class Camera extends createjs.Shape {

  constructor(game) {
    super();
    this.position      = Vector.Zero(3);
    this.i             = Vector.i.dup();
    this.j             = Vector.j.dup();
    this.k             = Vector.k.dup().x(-1);
    this.forward       = this.i;
    this.fovW          = Math.PI / 2;
    this.fovH          = this.fovW * (game.canvas.height / game.canvas.width);
    this.speed         = 5;
    this.transferMatrx = $M([
      [this.i.e(1), this.j.e(1), this.k.e(1)],
      [this.i.e(2), this.j.e(2), this.k.e(2)],
      [this.i.e(3), this.j.e(3), this.k.e(3)]
    ]);

    input.on("lockedmousemove", e => {
      let rotaK = input.mouseDelta.e(1) / 3600;
      let rotaJ = input.mouseDelta.e(2) / 3600;
      this.i = Matrix.Rotation(rotaK, this.k).x(this.i);
      this.j = Matrix.Rotation(rotaK, this.k).x(this.j);
      this.i = Matrix.Rotation(rotaJ, this.j).x(this.i);
      this.k = Matrix.Rotation(rotaJ, this.j).x(this.k);
    });
  }

  render (camera, e) {
    this.position = this.position.add(
      this.i.x(input.keys.forward-input.keys.backward).x(this.speed * e.delta / 1000)
    );
    this.position = this.position.add(
      this.j.x(input.keys.right-input.keys.left).x(this.speed * e.delta / 1000)
    );
    this.position = this.position.add(
      this.k.x(input.keys.down-input.keys.up).x(this.speed * e.delta / 1000)
    );
    this.transferMatrx = $M([
      [this.i.e(1), this.j.e(1), this.k.e(1)],
      [this.i.e(2), this.j.e(2), this.k.e(2)],
      [this.i.e(3), this.j.e(3), this.k.e(3)]
    ]);
    this.graphics.c();
  }

  move (vect) {
    this.position = this.position.add(vect);
    // this.i        = this.i.add(vect).toUnitVector();
    // this.j        = this.j.add(vect).toUnitVector();
    // this.k        = this.k.add(vect).toUnitVector();
  }

  getDispCoords (point3d) {
    let camCoords = this.transferMatrx.x(coords.subtract(this.position));
    let angleX = $V([camCoords.e(1), camCoords.e(2), 0]).angleFrom(Vector.i);
    let angleY = $V([camCoords.e(1), 0, camCoords.e(3)]).angleFrom(Vector.i);

    if (angleX < this.fovW && angleY < this.fovH) {
      let dispCoords = {
        x: (angleX / this.fovW * Math.sign(camCoords.e(2)) + 1) * game.canvas.width / 2,
        y: (angleY / this.fovH * Math.sign(camCoords.e(3)) + 1) * game.canvas.height / 2
      };
      return dispCoords;
    } else return false;
  }

  drawPoint (coords) {
    let dispCoords = this.getDispCoords(coords);
    if (dispCoords) {
      this.graphics.s("#EEE").r(dispCoords.x, dispCoords.y, 1, 1);
    }
  }

  drawLine (ptFrom, ptTo) {
    let a = this.getDispCoords(ptFrom);
    let b = this.getDispCoords(ptTo);
    if (a && b) {
      this.graphics.s("#EEE").mt(a.x, a.y).lt(b.x, b.y);
    }
  }

}