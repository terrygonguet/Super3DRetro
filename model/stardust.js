class Stardust extends createjs.DisplayObject {

  constructor(radius = 200, density = 0.00001) {
    super();
    this.on("tick", e => this.update(e));
    this.stars   = [];
    this.radius  = radius;
    this.density = density;
  }

  update (e) {
    this.stars.forEach(star => {
      if (star.position.distanceFrom(game.camera.position) > this.radius) {
        this.stars.splice(this.stars.indexOf(star), 1);
        game.removeChild(star);
      }
    });
    while(this.stars.length < Math.pow(this.radius, 3) * 4/3 * Math.PI * this.density) {
      let pos = $V([
        Math.randFloat(-1, 1), Math.randFloat(-1, 1), Math.randFloat(-1, 1)
      ]).toUnitVector().x(this.radius).add(game.camera.position);
      let star = new Point3D(pos.e(1), pos.e(2), pos.e(3));

      this.stars.push(star);
      game.addChild(star);
    }
  }

}
