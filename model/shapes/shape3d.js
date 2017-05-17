class Shape3D extends Object3D {

  constructor(x, y, z) {
    super(x, y, z);
    this.vertices = [];
    this.polygons = [];
    this.edges    = [];
  }

  update (e) {

  }

  render (camera) {
    let v = this.vertices, c = camera.position; // shorthands

    let dist = this.position.distanceFrom(c);
    if (dist >= 5000) {} // nothing
    else if (dist >= 2000) {
      camera.color(this.border).drawPoint(this.position);
    } else {
      if (this.polygons.length) {
        let distances = this.polygons
          .map(poly => {
            return {
            dist:v[poly.v1].add(v[poly.v2]).add(v[poly.v3]).x(1/3).distanceFrom(c),
            poly
            }
          });
        distances = _.sortBy(distances, 'dist').reverse();
        distances
          .map(poly => poly.poly)
          .forEach(poly =>
            camera.color(poly.border, poly.inner)
              .drawPoly(this.vertices[poly.v1], this.vertices[poly.v2], this.vertices[poly.v3])
          );

      }
      if (this.edges.length)
        this.edges.forEach(edge =>
          camera.color(edge.color).drawLine(this.vertices[edge.from], this.vertices[edge.to])
        );
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

  addPolygon(v1, v2, v3, borderColor, innerColor) {
    if (this.vertices[v1] && this.vertices[v2] && this.vertices[v3]) {
      this.polygons.push({
        v1, v2, v3,
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
