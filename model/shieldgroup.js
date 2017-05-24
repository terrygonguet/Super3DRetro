class ShieldGroup {

  constructor(shape, name, hp) {
    this.name = name;
    this.shape = shape;
    this.polygons = [];
    this.maxAmount = 100;
    this.amount = this.maxAmount;
    this.enthropy = 0;
    this.regenRate = 15;
    this.dissipationRate = 0.05;
    this.absorbRate = 0.01;
    this.working = true;
    this.hp = hp;
    this.fullcolor = $V([0,0,255]);
    this.emptycolor = $V([255,0,0]);
    this.colorvect = this.emptycolor.subtract(this.fullcolor);

    game.on("tick", e => this.update(e));
  }

  addPolygon(poly) {
    if (this.polygons.indexOf(poly) === -1) this.polygons.push(poly);
  }

  getHit(amount) {
    if (this.isProtective()) {
      if (this.amount >= amount)
        this.amount -= amount;
      else {
        this.enthropy += (amount - this.amount) * 3 * this.absorbRate;
        this.amount = 0;
      }
    } else {
      if (--this.hp <= 0) {
        this.polygons.forEach(poly => this.shape.removePolygon(poly));
      }
    }
  }

  update (e) {
    if (this.working) {
      let regen = (this.maxAmount - this.amount).clamp(0,e.delta/1000*this.regenRate);
      if (this.enthropy >= 1) {
        this.overload();
      } else {
        this.enthropy += regen * this.absorbRate;
        this.amount += regen;
        this.enthropy = (this.enthropy - this.dissipationRate * e.delta / 1000).clamp(0, 1);
      }
    } else {
      this.enthropy = (this.enthropy - this.dissipationRate * e.delta / 1000).clamp(0, 1);
      this.working = this.enthropy === 0;
    }
    if (this.amount === this.maxAmount || this.amount === 0) {
      this.polygons.forEach(poly => !poly.noColor && (poly.inner = null));
    } else {
      let color = this.colorvect.x(1-this.amount/this.maxAmount).add(this.fullcolor);
      this.polygons.forEach(poly => !poly.noColor && (poly.inner = "rgba("+color.e(1)+","+color.e(2)+","+color.e(3)+",0.2)"));
    }
  }

  isProtective () {
    return !(this.amount === 0 && this.enthropy > 0.8);
  }

  overload() {
    this.working = false;
    this.polygons.forEach(poly => !poly.noColor && (poly.inner = null));
  }

}
