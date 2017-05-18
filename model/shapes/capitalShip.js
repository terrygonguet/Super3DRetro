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
    this.addVertex($V([100, -50, -100])); // foot bottom front left 10
    this.addVertex($V([100, 50, -100])); // foot bottom front right 11
    this.addVertex($V([-350, -50, -100])); // foot bottom back left 12
    this.addVertex($V([-350, 50, -100])); // foot bottom back right 13
    this.addVertex($V([20, -50, -250])); // foot top front left 14
    this.addVertex($V([20, 50, -250])); // foot top front right 15
    this.addVertex($V([-350, -50, -250])); // foot top back left 16
    this.addVertex($V([-350, 50, -250])); // foot top back right 17
    this.addVertex($V([100, -75, -250])); // bridge bottom front left 18
    this.addVertex($V([100, 75, -250])); // bridge bottom front right 19
    this.addVertex($V([-400, -75, -250])); // bridge bottom back left 20
    this.addVertex($V([-400, 75, -250])); // bridge bottom back right 21
    this.addVertex($V([50, -75, -350])); // bridge top front left 22
    this.addVertex($V([50, 75, -350])); // bridge top front right 23
    this.addVertex($V([-400, -75, -350])); // bridge top back left 24
    this.addVertex($V([-400, 75, -350])); // bridge top back right 25

    // POLYGONS -----------------------------------------------------
    // Main hull
    this.addPolygon([0,2,4,3]); // backside
    this.addPolygon([0,3,8,5]); // sides
    this.addPolygon([2,4,9,7]);
    this.addPolygon([5,7,9,8]); // front
    this.addPolygon([0,2,7,5]); // top
    this.addPolygon([3,4,9,8]); // bottom
    // Bridge
    this.addPolygon([10,11,15,14]); // foot front
    this.addPolygon([12,13,17,16]); // foot back
    this.addPolygon([11,13,17,15]); // foot sides
    this.addPolygon([10,12,16,14]);
    this.addPolygon([20,21,25,24]); // bridge back
    this.addPolygon([18,19,23,22]); // bridge front
    this.addPolygon([18,20,24,22]); // bridge sides
    this.addPolygon([19,21,25,23]);
    this.addPolygon([22,23,25,24]); // bridge top
    this.addPolygon([19,19,21,20]); // bridge bottom
  }

  update (e) {
    this.rotate(0,0,e.delta/5000);
  }
}
