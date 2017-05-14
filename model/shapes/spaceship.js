class Spaceship extends Shape3D {

  constructor(x, y, z) {
    super(x, y, z);

    this.speed        = 10;
    this.cameraOffset = $V([-200, 0, 5]);
    this.indic = new Indicator(this.position.e(1),this.position.e(2),this.position.e(3));
    this.hint = new QuickText({ x: 10, y: 70, text: "ZQSD+AE  to  rotate (azerty  ftw)" });

    this.on("tick", () => {
      game.addChild(this.indic);
      game.addChild(this.hint);
    }, null, true);

    this.addVertex($V([-3,0,3])); // middle top 0
    this.addVertex($V([-3,0,-3])); // middle bottom 1
    this.addVertex($V([-5,-10,0])); // left wing 2
    this.addVertex($V([-5,10,0])); // right wing 3
    this.addVertex($V([40,0,0])); // nose 4
    this.addVertex($V([-5,-30,0])); // left wing thin 5
    this.addVertex($V([-5,30,0])); // right wing thin 6
    this.addVertex($V([10,-10,0])); // half wing left 7
    this.addVertex($V([10,10,0])); // half wing right 8

    this.addEdge(0,1); // top to bottom
    this.addEdge(0,2); // top to wing
    this.addEdge(0,3);
    this.addEdge(0,7); // top to half
    this.addEdge(0,8);
    this.addEdge(1,7); // bottom to half
    this.addEdge(1,8);
    this.addEdge(1,2); // bottom to wing
    this.addEdge(1,3);
    this.addEdge(2,7); // wing to half
    this.addEdge(3,8);
    this.addEdge(2,5); // wing to thin left
    this.addEdge(3,6); // wing to thin right
    this.addEdge(0,4); // top to nose
    this.addEdge(1,4); // bottom to nose
    this.addEdge(5,7); // thin to half left
    this.addEdge(6,8); // thin to half right
    this.addEdge(7,4); // half to nose
    this.addEdge(8,4); // half to nose
  }

  update (e) {
    this.move(game.camera.i.x(this.speed * e.delta / 1000));
    // let curOffset = this.i.x(this.cameraOffset.e(1));
    // curOffset = curOffset.add(this.k.x(this.cameraOffset.e(3)));
    game.camera.position = this.position.add(this.cameraOffset);
    // if (input.aimDelta.modulus() > 50) {
    //   this.rotate(
    //     0,
    //     -input.aimDelta.e(2)/3600*e.delta/1000,
    //     -input.aimDelta.e(1)/3600*e.delta/1000
    //   );
    // }
    // game.camera.i = this.i;
    // game.camera.j = this.j;
    // game.camera.k = this.k;
    // game.camera.rotate(0,0.1,0);
    this.rotate(
      (input.keys.left-input.keys.right) * Math.PI * e.delta / 3600,
      (input.keys.forward-input.keys.backward) * Math.PI * e.delta / 3600,
      (input.keys.up-input.keys.down) * Math.PI * e.delta / 3600
    );
    this.indic.vertices[0] = this.position.dup();
    this.indic.vertices[1] = this.i.x(5).add(this.position);
    this.indic.vertices[2] = this.j.x(5).add(this.position);
    this.indic.vertices[3] = this.k.x(5).add(this.position);
  }

}
