class Shape3D extends Object3D {

  constructor(x, y, z) {
    super(x, y, z);
    this.vertices = [];
    this.edges    = [];
  }

  update (e) {

  }

  render (camera) {
    camera.color(this.color);
    this.edges.forEach(edge =>
      camera.color(edge.color).drawLine(this.vertices[edge.from], this.vertices[edge.to])
    );
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
    let nV = $V([
      vertex.e(1) + this.position.e(1),
      vertex.e(2) + this.position.e(2),
      vertex.e(3) + this.position.e(3)
    ]);
    if (nV) this.vertices.push(nV);
    return this.vertices.length - 1;
  }

  addEdge (vFrom, vTo, color) {
    if (this.vertices[vFrom] && this.vertices[vTo]) {
      this.edges.push({
        from: vFrom,
        to: vTo,
        color: (color ? color : this.color)
      });
    }
  }

}
