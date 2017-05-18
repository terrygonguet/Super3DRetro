class Shape3D extends Object3D {

  constructor(x, y, z) {
    super(x, y, z);
    this.vertices = [];
    this.polygons = [];
    this.edges    = [];
    this.forceRender = false;
    this.isShape = true;
  }

  update (e) {

  }

  render (camera) {
    let v = this.vertices, c = camera.position; // shorthands

    let dist = this.position.distanceFrom(c);
    if (dist <= 2000 || this.forceRender) {
      if (this.polygons.length) {
        let distances = this.polygons
          .map(poly => {
            let avg = Vector.Zero(3);
            poly.points.forEach(pt => {
              avg = avg.add(v[pt]);
            });
            avg = avg.x(1/poly.points.length);

            return {
              dist:avg.distanceFrom(c),
              poly
            }
          });
        distances = _.sortBy(distances, 'dist').reverse();
        distances
          .map(poly => {
            return {
              border: poly.poly.border,
              inner: poly.poly.inner,
              points: poly.poly.points.map(pt => v[pt])
            };
          })
          .forEach(poly =>
            camera
              .color(poly.border, poly.inner)
              .drawPoly(
                poly.points,
                this.forceRender
              )
          );

      }
      if (this.edges.length)
        this.edges.forEach(edge =>
          camera
            .color(edge.color)
            .drawLine(
              this.vertices[edge.from],
              this.vertices[edge.to],
              this.forceRender
            )
        );
    } else if (dist <= 5000) {
      camera.color(this.border).drawPoint(this.position);
    }
  }

  move (vect) {
    this.position = this.position.add(vect);
    this.vertices = this.vertices.map(vertex => vertex.add(vect));
  }

  rotate (angleI, angleJ, angleK) {
    if (angleI) {
      this.vertices = this.vertices.map(vertex =>
        vertex.rotate(angleI, $L(this.position, this.i))
      );
      let rotation = Matrix.Rotation(angleI, this.i);
      this.j = rotation.x(this.j);
      this.k = rotation.x(this.k);
    }
    if (angleJ) {
      this.vertices = this.vertices.map(vertex =>
        vertex.rotate(angleJ, $L(this.position, this.j))
      );
      let rotation = Matrix.Rotation(angleJ, this.j);
      this.i = rotation.x(this.i);
      this.k = rotation.x(this.k);
    }
    if (angleK) {
      this.vertices = this.vertices.map(vertex =>
        vertex.rotate(angleK, $L(this.position, this.k))
      );
      let rotation = Matrix.Rotation(angleK, this.k);
      this.i = rotation.x(this.i);
      this.j = rotation.x(this.j);
    }
  }

  addVertex (vertex) {
    let nV = this.i.x(vertex.e(1)).add(this.j.x(vertex.e(2))).add(this.k.x(vertex.e(3)));
    if (nV) this.vertices.push(nV.add(this.position));
    return this.vertices.length - 1;
  }

  addPolygon(points, borderColor, innerColor) {
    let correct = points.length >= 3 && !points.some(pt => !this.vertices[pt]);
    if (correct) {
      this.polygons.push({
        points,
        border: borderColor || this.border,
        inner: innerColor || this.inner
      });
    }
  }

  addEdge (vFrom, vTo, color) {
    if (this.vertices[vFrom] && this.vertices[vTo]) {
      this.edges.push({
        from: vFrom,
        to: vTo,
        color: (color || this.border)
      });
    }
  }

}
