class Spaceship extends Shape3D {

  constructor(x, y, z) {
    super(x, y, z);

    this.speed        = [10, 40, 60];
    this.cameraOffset = $V([-100, 0, -20]);
    // this.cameraOffset = $V([-200, 0, 5]);
    this.hint = new QuickText({ x: 10, y: 70, text: "ZQSD+MOUSE  to  control (azerty  ftw)" });
    this.autorotate = true;
    this.rotaI = 0;

    this.on("tick", () => {
      game.addChild(this.hint);
    }, null, true);
    input.on("keydown", () => this.autorotate = false, null, true);

    // start at 18
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

    this.addPolygon(0,1,2); // backside
    this.addPolygon(1,2,3);
    this.addPolygon(0,2,4); // backside to wings
    this.addPolygon(1,3,5);
    this.addPolygon(4,7,9); // wings thin
    this.addPolygon(5,8,10);
    this.addPolygon(0,4,9); // wings thick
    this.addPolygon(2,4,9);
    this.addPolygon(1,5,10);
    this.addPolygon(3,5,10);
    this.addPolygon(0,1,6); // top hull
    this.addPolygon(0,9,6);
    this.addPolygon(1,10,6);
    this.addPolygon(2,3,6); // bottom hull
    this.addPolygon(2,9,6);
    this.addPolygon(3,10,6);
    this.addPolygon(11,12,15,"#1E6CD9","#1E6CD930"); // thruster
    this.addPolygon(11,13,15,"#1E6CD9","#1E6CD930");
    this.addPolygon(13,14,15,"#1E6CD9","#1E6CD930");
    this.addPolygon(14,12,15,"#1E6CD9","#1E6CD930");

    // this.rotate(0,-Math.PI/2,0);
  }

  update (e) {
    this.rotate(-this.rotaI,0,0); // because I'm too lazy to make a proper quaternion

    let speed = this.speed[1 + (input.keys.forward-input.keys.backward)];
    this.vertices[15] = this.position.add(this.i.x(-speed/2-10));
    this.move(this.i.x(speed * e.delta / 1000));
    this.move(this.j.x(speed / 2 * e.delta / 1000 * (input.keys.right-input.keys.left)));

    let curOffset = this.i.x(this.cameraOffset.e(1) - speed/5);
    curOffset = curOffset.add(this.k.x(this.cameraOffset.e(3)));
    game.camera.position = this.position.add(curOffset);

    this.rotaI = (input.keys.left-input.keys.right) * 0.3;
    this.rotate(
      this.rotaI,
      input.aimDelta.e(2)/3600*e.delta/1000,
      -input.aimDelta.e(1)/3600*e.delta/1000
    );
    input.aimDelta = input.aimDelta.x(1 - (0.9 * e.delta / 1000));

    game.camera.i = this.i;
    game.camera.j = this.j;
    game.camera.k = this.k;
    game.camera.rotate(-this.rotaI,0.1,0);
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

}
