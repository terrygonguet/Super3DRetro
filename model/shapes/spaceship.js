class Spaceship extends Shape3D {

  constructor(x, y, z) {
    super(x, y, z);

    this.speed        = [-60, 0, 60];
    this.cameraOffset = $V([-100, 0, -20]);
    // this.cameraOffset = $V([-200, 0, 5]);
    this.hint = new QuickText({ x: 10, y: 70, text: "ZQSD+MOUSE  to  control (azerty  ftw)" });
    this.autorotate = true;
    this.rotaI = 0;
    this.dblTap = { key: "", time: 0 };
    this.barrelTime = 0;
    this.barrelSide = 0;
    this.blasterTime = 0;
    this.blasterRate = 6;
    this.blasterSide = 1;

    input.on("keydown", () => this.autorotate = false, null, true);
    input.on("keydown", e => {
      if (e.original.repeat) return;
      if (this.dblTap.key !== e.original.key) {
        if (this.dblTap.time <= 0) this.dblTap = { key: e.original.key, time: 200 };
      } else if (this.dblTap.time > 0) {
        this.dispatchEvent(new createjs.Event("dblTap").set({ key: this.dblTap.key }));
        this.dblTap = { key: "", time: 1000 };
      } else {
        this.dblTap = { key: e.original.key, time: 200 };
      }
      if (e.original.key === "p") this.shields["default"].getHit(5);
    });

    this.on("tick", () => {
      game.addChild(this.hint);
    }, null, true);
    this.on("dblTap", e => {
      switch (e.key) {
        case input.bindings.left:
          this.barrelRoll("left");
          break;
        case input.bindings.right:
          this.barrelRoll("right");
          break;
      }
    });

    this.addShieldgroup("default");

    this.addVertex($V([-10,-5,3])); // backside top left 0
    this.addVertex($V([-10,5,3])); // backside top right 1
    this.addVertex($V([-10,-5,-3])); // backside bottom left 2
    this.addVertex($V([-10,5,-3])); // backside bootom right 3
    this.addVertex($V([-5,-10,0])); // left wing 4
    this.addVertex($V([-5,10,0])); // right wing 5
    this.addVertex($V([40,0,0])); // nose  6
    this.addVertex($V([-5,-30,0])); // left wing thin  7
    this.addVertex($V([-5,30,0])); // right wing thin 8
    this.addVertex($V([10,-10,0])); // half wing left 9
    this.addVertex($V([10,10,0])); // half wing right 10

    this.addVertex($V([-10,0,2])); // thruster top left 11
    this.addVertex($V([-10,2,0])); // thruster top right 12
    this.addVertex($V([-10,-2,0])); // thruster bottom left 13
    this.addVertex($V([-10,0,-2])); // thruster bottom right 14
    this.addVertex($V([-20,0,0])); // thruster flame 15

    this.addPolygon([0,1,3,2]).addToShieldgroup("default"); // backside
    this.addPolygon([0,2,4]).addToShieldgroup("default"); // backside to wings
    this.addPolygon([1,3,5]).addToShieldgroup("default");
    this.addPolygon([4,7,9]).addToShieldgroup("default"); // wings thin
    this.addPolygon([5,8,10]).addToShieldgroup("default");
    this.addPolygon([0,4,9]).addToShieldgroup("default"); // wings thick
    this.addPolygon([2,4,9]).addToShieldgroup("default");
    this.addPolygon([1,5,10]).addToShieldgroup("default");
    this.addPolygon([3,5,10]).addToShieldgroup("default");
    this.addPolygon([0,1,6]).addToShieldgroup("default"); // top hull
    this.addPolygon([0,9,6]).addToShieldgroup("default");
    this.addPolygon([1,10,6]).addToShieldgroup("default");
    this.addPolygon([2,3,6]).addToShieldgroup("default"); // bottom hull
    this.addPolygon([2,9,6]).addToShieldgroup("default");
    this.addPolygon([3,10,6]).addToShieldgroup("default");
    this.border = "#1E6CD9"; this.inner = "rgba(30,108,217,0.2)";
    this.addPolygon([11,12,15]); // thruster
    this.addPolygon([11,13,15]);
    this.addPolygon([13,14,15]);
    this.addPolygon([14,12,15]);

    // this.rotate(0,-Math.PI/2,0);
  }

  update (e) {
    if (this.dblTap.time > 0) this.dblTap.time -= e.delta;
    this.rotate(
      (this.barrelSide ? 0 : -this.rotaI) - (1-this.barrelTime/1000)*Math.PI*2*this.barrelSide,
      0,
      0); // because I'm too lazy to make a proper quaternion
    if (this.barrelTime >= 0) this.barrelTime -= e.delta;
    else this.barrelSide = 0;

    let speed = this.speed[1 + (input.keys.forward-input.keys.backward)];
    this.vertices[15] = this.position.add(this.i.x(-speed/2-10));
    this.move(this.i.x(speed * e.delta / 1000));
    if (this.barrelSide)
      this.move(this.j.x(-this.barrelSide*60*e.delta/1000))
    else
      this.move(this.j.x(speed / 2 * e.delta / 1000 * (input.keys.right-input.keys.left)));

    let curOffset = this.i.x(this.cameraOffset.e(1) - speed/5);
    curOffset = curOffset.add(this.k.x(this.cameraOffset.e(3)));
    game.camera.position = this.position.add(curOffset);

    this.rotaI = (input.keys.left-input.keys.right) * 0.3;
    let rotaIkeys = (input.keys.up-input.keys.down) * Math.PI/2 * e.delta/1000;
    this.rotate(
      (this.barrelSide ? 0 : this.rotaI + rotaIkeys) + (1-this.barrelTime/1000)*Math.PI*2*this.barrelSide,
      0,0
    );

    if (input.aimDelta.modulus() >= 30) {
      this.rotate(
        0,
        input.aimDelta.e(2)/1500*e.delta/1000,
        -input.aimDelta.e(1)/1500*e.delta/1000
      );
    }
    input.aimDelta = input.aimDelta.x(1 - (0.9 * e.delta / 1000));

    game.camera.i = this.i;
    game.camera.j = this.j;
    game.camera.k = this.k;
    game.camera.rotate(
      (this.barrelSide ? 0 : -this.rotaI) - (1-this.barrelTime/1000)*Math.PI*2*this.barrelSide,
      0.03,
      0);

    this.blasterTime += e.delta;
    if (input.keys.mouse1 && this.blasterTime >= 1000 / this.blasterRate) {
      this.blasterTime = 0;
      game.addChild(new PulseMunition(
        this.position.add(this.j.x(this.blasterSide * 5)), [this.i, this.j, this.k], 3000
      ));
      this.blasterSide = -this.blasterSide;
    }
    // game.camera.position = this.position.add(this.cameraOffset);
    // if (this.autorotate) {
    //   this.rotate(Math.PI / 7000 * e.delta,0,0);
    // }
    // this.rotate(
    //   (input.keys.left-input.keys.right) * Math.PI * e.delta / 3600,
    //   (input.keys.forward-input.keys.backward) * Math.PI * e.delta / 3600,
    //   (input.keys.up-input.keys.down) * Math.PI * e.delta / 3600
    // );
  }

  barrelRoll (side) {
    this.barrelTime = 1000;
    this.barrelSide = (side === "right" ? -1 : 1);
  }

}
