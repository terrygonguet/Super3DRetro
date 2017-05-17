class CapitalShip extends Shape3D {

  constructor(x,y,z) {
    super(x,y,z);
    this.forceRender = true;
    this.border = "#EEE";
    this.inner = "#555";

    // VERTICES -----------------------------------------------------
    // Main hull
    this.addVertex($V([-500, -200, -100])); // backside top left 0
    this.addVertex($V([-500, 0, -100])); // backside top middle 1
    this.addVertex($V([-500, 200, -100])); // backside top right 2
    this.addVertex($V([-500, -130, 100])); // backside bottom left 3
    this.addVertex($V([-500, 130, 100])); // backside bottom right 4
    this.addVertex($V([500, -200, -100])); // front top left 5
    this.addVertex($V([500, 0, -100])); // front top middle 6
    this.addVertex($V([500, 200, -100])); // front top right 7
    this.addVertex($V([400, -130, 100])); // front bottom left 8
    this.addVertex($V([400, 130, 100])); // front bottom right 9
    // Bridge
    this.addVertex($V([0, -50, -100])); // foot bottom front left 10
    this.addVertex($V([0, 50, -100])); // foot bottom front right 11
    this.addVertex($V([-350, -50, -100])); // foot bottom back left 12
    this.addVertex($V([-350, 50, -100])); // foot bottom back right 13
    this.addVertex($V([-100, -50, -250])); // foot top front left 14
    this.addVertex($V([-100, 50, -250])); // foot top front right 15
    this.addVertex($V([-350, -50, -250])); // foot top back left 16
    this.addVertex($V([-350, 50, -250])); // foot top back right 17
    this.addVertex($V([0, -75, -250])); // bridge bottom front left 18
    this.addVertex($V([0, 75, -250])); // bridge bottom front right 19
    this.addVertex($V([-400, -75, -250])); // bridge bottom back left 20
    this.addVertex($V([-400, 75, -250])); // bridge bottom back right 21
    this.addVertex($V([-50, -75, -350])); // bridge top front left 22
    this.addVertex($V([-50, 75, -350])); // bridge top front right 23
    this.addVertex($V([-400, -75, -350])); // bridge top back left 24
    this.addVertex($V([-400, 75, -350])); // bridge top back left 25

    // POLYGONS -----------------------------------------------------
    // Main hull
    this.addPolygon(0,1,3); // backside
    this.addPolygon(1,3,4);
    this.addPolygon(1,2,4);
    this.addPolygon(0,3,5); // sides
    this.addPolygon(3,5,8);
    this.addPolygon(2,4,7);
    this.addPolygon(4,7,9);
    this.addPolygon(5,6,8); // front
    this.addPolygon(6,8,9);
    this.addPolygon(6,7,9);
    this.addPolygon(0,1,5); // top
    this.addPolygon(1,2,7);
    this.addPolygon(5,7,1);
    this.addPolygon(3,4,8); // bottom
    this.addPolygon(8,9,4);
    // Bridge
    this.addPolygon(10,11,14); // foot front
    this.addPolygon(14,15,11);
    this.addPolygon(12,13,16); // foot back
    this.addPolygon(16,17,13);
    this.addPolygon(12,10,16); // foot sides
    this.addPolygon(14,16,10);
    this.addPolygon(11,13,17);
    this.addPolygon(15,17,11);
    this.addPolygon(18,19,22); // bridge front
    this.addPolygon(22,23,19);
    this.addPolygon(20,21,24); // bridge back
    this.addPolygon(24,25,21);
    this.addPolygon(18,20,24); // bridge sides
    this.addPolygon(24,22,18);
    this.addPolygon(19,21,25);
    this.addPolygon(25,23,19);
    this.addPolygon(22,23,24); // bridge top
    this.addPolygon(23,24,25);
    this.addPolygon(18,19,20); // bridge bottom
    this.addPolygon(19,20,21);
  }

  update (e) {
    this.rotate(0,0,e.delta/5000);
  }
}
