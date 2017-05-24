class UI extends createjs.Container {

  constructor() {
    super();
    this.uX = 0.01 * window.innerWidth;
    this.uY = 0.01 * window.innerHeight;

    this.crosshair = new createjs.Shape();
    this.setShieldUI();
    this.setCrosshair();

    game.on("tick", e => this.update(e));
  }

  setShieldUI () {
    this.bg = new createjs.Shape();
    this.enthropyGauge = new createjs.Shape();
    this.txtenthropy = new QuickText({ text: "enthropy" });
    this.meters = new createjs.Shape();
    this.shieldBubble = new createjs.Shape();
    this.startAngle = 0.5;
    this.endAngle = -Math.PI/2;
    this.totalAngle = (this.endAngle-this.startAngle) * 1.2;
    this.bottomLeft = $V([7 * this.uX, 90 * this.uY]);

    this.enthropyGauge.set({
      x: this.bottomLeft.e(1), y: this.bottomLeft.e(2),
      zero: this.startAngle * 57.2958,
      rotation: this.startAngle * 57.2958
    });

    this.txtenthropy.set({
      x: this.bottomLeft.e(1), y: this.bottomLeft.e(2) + 30,
      textAlign: "center"
    });

    this.bg.graphics
      .ss(2).s("#EEE").f("#111")
      .dc(this.bottomLeft.e(1), this.bottomLeft.e(2), 10 * this.uX+2);
    this.shieldBubble.graphics
      .s("#44E").f("rgba(17,17,255,0.2)")
      .dc(this.bottomLeft.e(1), this.bottomLeft.e(2), 10 * this.uX);
    this.meters.graphics
      .ss(10).s("#EEE")
      .a(this.bottomLeft.e(1), this.bottomLeft.e(2), 7 * this.uX, this.startAngle, this.endAngle, true)
      .ss(15).s("#E11")
      .a(
        this.bottomLeft.e(1), this.bottomLeft.e(2), 7 * this.uX,
        this.endAngle, this.totalAngle + this.startAngle, true);
    this.enthropyGauge.graphics
      .ss(3).s("#AAA")
      .mt(0,0).lt(8 * this.uX, 0);

    this.addChild(this.bg);
    this.addChild(this.shieldBubble);
    this.addChild(this.meters);
    this.addChild(this.txtenthropy);
    this.addChild(this.enthropyGauge);
  }

  setCrosshair () {
    let coords = null;
    for (let shape of game.shapes) {
      if (shape === game.player) continue;
      if (game.player.i.angleFrom(shape.position.subtract(game.player.position)) <= Math.PI) {
        for (let poly of shape.polygons) {
          coords = poly.intersects($L(game.player.position, game.player.i));
          if (coords) break;
        }
      }
      if (coords) break;
    }

    if (!coords) {
      coords = game.camera.getDispCoords(game.player.position.add(game.player.i.x(10000)));
    } else {
      coords = game.camera.getDispCoords(coords);
    }

    this.crosshair.set({
      x: coords.x, y: coords.y
    });
    this.crosshair.graphics.c().ss(1).s("#E11").dc(0,0,10);

    this.addChild(this.crosshair);
  }

  update (e) {
    let shield = game.player.shields["default"];
    let ratio = (shield.amount / shield.maxAmount);
    this.enthropyGauge.rotation = this.enthropyGauge.zero + this.totalAngle * shield.enthropy * 57.2958;
    this.shieldBubble.graphics
      .c().s("#44E").f("rgba(17,17,255,0.2)")
      .dc(this.bottomLeft.e(1), this.bottomLeft.e(2), 10 * this.uX * ratio);
    this.txtenthropy.color = (shield.working ? "#EEE" : "#E11");

    this.setCrosshair();
  }

}
