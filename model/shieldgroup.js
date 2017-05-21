class ShieldGroup {

  constructor(name) {
    this.name = name;
    this.polygons = [];
    this.maxAmount = 100;
    this.amount = this.maxAmount;
    this.enthtopy = 0;
    this.regenRate = 10;
    this.dissipationRate = 0.002;
    this.absorbRate = 0.005;
    this.working = true;

    game.on("tick", e => this.update(e));
  }

  addPolygon(poly) {
    if (this.polygons.indexOf(poly) === -1) this.polygons.push(poly);
  }

  getHit(amount) {
    if (this.amount >= amount)
      this.amount -= amount;
    else {
      this.enthtopy += (amount - this.amount) * 3 * this.absorbRate;
      this.amount = 0;
    }
  }

  update (e) {
    if (this.working) {
      let regen = (this.maxAmount - this.amount).clamp(0,e.delta/1000*this.regenRate);
      if (this.enthtopy >= 1) {
        this.overload();
      } else {
        this.enthtopy += regen * this.absorbRate;
        this.amount += regen;
        this.enthtopy = (this.enthtopy - this.dissipationRate).clamp(0, 1);
        this.polygons.forEach(poly => poly.inner = "rgba(0,0,255," + (1-this.amount/this.maxAmount) + ")");
      }
    }
  }

  overload() {
    this.working = false;
    this.polygons.forEach(poly => poly.inner = "rgba(255,0,0,0.2)");
  }

}
