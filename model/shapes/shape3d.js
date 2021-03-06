class Shape3D extends Object3D {

  constructor(x, y, z) {
    super(x, y, z);
    this.vertices = [];
    this.polygons = [];
    this.edges    = [];
    this.shields  = {};
    this.attached = [];
    this.forceRender = false;
    this.isShape = true;
  }

  update (e) {

  }

  render (camera) {
    let v = this.vertices, c = camera.position; // shorthands

    let dist = this.position.distanceFrom(c);
    if (dist <= 2000 || this.forceRender) {
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
              .drawPoly(poly.poly.getGlobals(), this.forceRender)
            );

      if (this.edges.length)
        this.edges.forEach(edge =>
          camera
            .color(edge.color)
            .drawLine(this.vertices[edge.from], this.vertices[edge.to], this.forceRender)
        );
    } else if (dist <= 5000) {
      camera.color(this.border).drawPoint(this.position);
    }
  }

  attach (shape) {
    shape.isShape && this.attached.push(shape);
  }

  detach (shape) {
    let i = this.attached.indexOf(shape);
    i !== -1 && this.attached.splice(i, 1);
  }

  move (vect) {
    this.position = this.position.add(vect);
    this.vertices = this.vertices.map(vertex => vertex.add(vect));
    this.attached.forEach(shape => shape.move(vect));
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

  addPolygon(points, borderColor=this.border, innerColor=this.inner, noCollide=false, noColor=false) {
    let correct = points.length >= 3 && !points.some(pt => !this.vertices[pt]);
    if (correct) {
      let poly = new Polygon(this, points, borderColor, innerColor, noCollide, noColor);
      this.polygons.push(poly);
      return poly;
    }
  }

  removePolygon (poly) {
    let i = this.polygons.indexOf(poly);
    i !== -1 && this.polygons.splice(i,1);
    if (!this.polygons.length) this.die();
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

  addShieldgroup (name, hp, noShield=false) {
    if (!this.shields[name]) this.shields[name] = new ShieldGroup(this, name, hp, noShield);
  }

  die () {
    game.removeChild(this);
  }

}

class Polygon {

  constructor(shape, points, borderColor, innerColor, noCollide=false, noColor=false) {
    this.points = points;
    this.border = borderColor;
    this.inner = innerColor;
    this.shape = shape;
    this.noCollide = noCollide;
    this.noColor = noColor;
    this.shieldGroup = null;
  }

  getGlobals() {
    return this.points.map(pt => this.shape.vertices[pt]);
  }

  intersects (line) {
    if (this.noCollide) return false;
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

  getHit(amount) {
    this.shieldGroup && this.shieldGroup.getHit(amount);
  }

  addToShieldgroup (group) {
    this.shieldGroup = this.shape.shields[group];
    this.shieldGroup.addPolygon(this);
    return this;
  }

}
