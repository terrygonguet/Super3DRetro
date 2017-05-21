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
  /*

  this.polygons.forEach((poly,i) => poly.i = i);
  this.polygons
    .sort((a,b) => {
      for (let pt of a.getGlobals()) {
        let line = $L(c, pt.subtract(c));
        let hit = b.intersects(line);
        if (hit && hit.distanceFrom(c) > pt.distanceFrom(c)) {
          return -1;
        }
      }
      for (let pt of b.getGlobals()) {
        let line = $L(c, pt.subtract(c));
        let hit = a.intersects(line);
        if (hit && hit.distanceFrom(c) > pt.distanceFrom(c)) {
          return 1;
        }
      }
      return a.i - b.i;
    })
    .forEach(poly => {
      camera.color(poly.border, poly.inner).drawPoly(poly.getGlobals(), this.forceRender);
    });
  */

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
          .forEach(poly =>
            camera
              .color(poly.poly.border, poly.poly.inner)
              .drawPoly(
                poly.poly.getGlobals(),
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

  addPolygon(points, borderColor=this.border, innerColor=this.inner) {
    let correct = points.length >= 3 && !points.some(pt => !this.vertices[pt]);
    if (correct) {
      this.polygons.push(new Polygon(this, points, borderColor, innerColor));
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

class Polygon {

  constructor(shape, points, borderColor, innerColor) {
    this.points = points;
    this.border = borderColor;
    this.inner = innerColor;
    this.shape = shape;
  }

  getGlobals() {
    return this.points.map(pt => this.shape.vertices[pt]);
  }

  intersects (line) {
    const points = this.getGlobals();
    const plane = $P(points[0], points[1], points[2]);
    const hit = plane.intersectionWith(line);
    if (hit) {
      let hit2points = points.map(pt => pt.subtract(hit));
      let angle = 0;
      for (var i = 0; i < hit2points.length; i++) {
        angle += hit2points[i].angleFrom(hit2points[(i<hit2points.length-1 ? i+1 : 0)]);
      }
      return (Math.abs(angle-Math.PI*2) <= 0.01 ? hit : false);
    } else return false;
  }

}
