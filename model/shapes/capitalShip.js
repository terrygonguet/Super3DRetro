class CapitalShip extends Shape3D {

  constructor(x,y,z) {
    super(x,y,z);
    this.forceRender = true;
    this.border = "#EEE";
    this.inner = null;//"#111";

    this.addShieldgroup("hull");
    this.addShieldgroup("bridge");
    this.addShieldgroup("thrusters");
    this.addShieldgroup("com");

    // VERTICES -----------------------------------------------------
    // Main hull
    this.addVertex($V([-500, -200, -100])); // backside top left 0
    this.addVertex($V([-170, -200, -100])); // halfway top left 1
    this.addVertex($V([-500, 200, -100])); // backside top right 2
    this.addVertex($V([-500, -130, 100])); // backside bottom left 3
    this.addVertex($V([-500, 130, 100])); // backside bottom right 4
    this.addVertex($V([500, -200, -100])); // front top left 5
    this.addVertex($V([-170, 200, -100])); // halfway top right 6
    this.addVertex($V([500, 200, -100])); // front top right 7
    this.addVertex($V([400, -130, 100])); // front bottom left 8
    this.addVertex($V([400, 130, 100])); // front bottom right 9
    // Bridge
    this.addVertex($V([-170, -50, -100])); // foot bottom front left 10
    this.addVertex($V([-170, 50, -100])); // foot bottom front right 11
    this.addVertex($V([-350, -50, -100])); // foot bottom back left 12
    this.addVertex($V([-350, 50, -100])); // foot bottom back right 13
    this.addVertex($V([-230, -50, -250])); // foot top front left 14
    this.addVertex($V([-230, 50, -250])); // foot top front right 15
    this.addVertex($V([-350, -50, -250])); // foot top back left 16
    this.addVertex($V([-350, 50, -250])); // foot top back right 17
    this.addVertex($V([-100, -75, -250])); // bridge bottom front left 18
    this.addVertex($V([-100, 75, -250])); // bridge bottom front right 19
    this.addVertex($V([-400, -75, -250])); // bridge bottom back left 20
    this.addVertex($V([-400, 75, -250])); // bridge bottom back right 21
    this.addVertex($V([-50, -75, -350])); // bridge top front left 22
    this.addVertex($V([-50, 75, -350])); // bridge top front right 23
    this.addVertex($V([-400, -75, -350])); // bridge top back left 24
    this.addVertex($V([-400, 75, -350])); // bridge top back right 25
    // Thrusters
    this.addVertex($V([-500, -100, -50])); // back top left 26
    this.addVertex($V([-500, 100, -50])); // back top right 27
    this.addVertex($V([-500, -100, 50])); // back bottom left 28
    this.addVertex($V([-500, 100, 50])); // back bottom right 29
    this.addVertex($V([-540, -100, -50])); // furthest top left 30
    this.addVertex($V([-540, 100, -50])); // furthest top right 31
    this.addVertex($V([-540, -100, 50])); // furthest bottom left 32
    this.addVertex($V([-540, 100, 50])); // furthest bottom right 33
    this.addVertex($V([-540, -75, -30])); // flame1 top left 34
    this.addVertex($V([-540, -15, -30])); // flame1 top right 35
    this.addVertex($V([-540, -75, 30])); // flame1 bottom left 36
    this.addVertex($V([-540, -15, 30])); // flame1 bottom right 37
    this.addVertex($V([-600, -55, 0])); // flame1 tip 38
    this.addVertex($V([-540, 75, -30])); // flame2 top left 39
    this.addVertex($V([-540, 15, -30])); // flame2 top right 40
    this.addVertex($V([-540, 75, 30])); // flame2 bottom left 41
    this.addVertex($V([-540, 15, 30])); // flame2 bottom right 42
    this.addVertex($V([-600, 55, 0])); // flame2 tip 43
    // Com array
    this.addVertex($V([300, -50, -100])); // base front left 44
    this.addVertex($V([300, 50, -100])); // base front right 45
    this.addVertex($V([200, -50, -100])); // base back left 46
    this.addVertex($V([200, 50, -100])); // base back right 47
    this.addVertex($V([280, -30, -130])); // hinge front left 48
    this.addVertex($V([280, 30, -130])); // hinge front right 49
    this.addVertex($V([220, -30, -130])); // hinge back left 50
    this.addVertex($V([220, 30, -130])); // hinge back right 51
    this.addVertex($V([320, -30, -150])); // parabola front forward left 52
    this.addVertex($V([320, 30, -150])); // parabola front forward right 53
    this.addVertex($V([280, -70, -150])); // parabola front left front 54
    this.addVertex($V([220, -70, -150])); // parabola front left back 55
    this.addVertex($V([280, 70, -150])); // parabola front right front 56
    this.addVertex($V([220, 70, -150])); // parabola front right back 57
    this.addVertex($V([180, -30, -150])); // parabola back left 58
    this.addVertex($V([180, 30, -150])); // parabola back right 59

    // POLYGONS -----------------------------------------------------
    // Main hull
    this.addPolygon([0,2,4,3]).addToShieldgroup("hull"); // backside
    this.addPolygon([0,3,8,5]).addToShieldgroup("hull"); // sides
    this.addPolygon([2,4,9,7]).addToShieldgroup("hull");
    this.addPolygon([5,7,9,8]).addToShieldgroup("hull"); // front
    this.addPolygon([0,2,6,1]).addToShieldgroup("hull"); // top
    this.addPolygon([6,1,5,7]).addToShieldgroup("hull");
    this.addPolygon([3,4,9,8]).addToShieldgroup("hull"); // bottom
    // Bridge
    this.addPolygon([10,11,15,14]).addToShieldgroup("bridge"); // foot front
    this.addPolygon([12,13,17,16]).addToShieldgroup("bridge"); // foot back
    this.addPolygon([11,13,17,15]).addToShieldgroup("bridge"); // foot sides
    this.addPolygon([10,12,16,14]).addToShieldgroup("bridge");
    this.addPolygon([20,21,25,24]).addToShieldgroup("bridge"); // bridge back
    this.addPolygon([18,19,23,22]).addToShieldgroup("bridge"); // bridge front
    this.addPolygon([18,20,24,22]).addToShieldgroup("bridge"); // bridge sides
    this.addPolygon([19,21,25,23]).addToShieldgroup("bridge");
    this.addPolygon([22,23,25,24]).addToShieldgroup("bridge"); // bridge top
    this.addPolygon([18,19,21,20]).addToShieldgroup("bridge"); // bridge bottom
    // Thrusters
    this.addPolygon([26,27,31,30]).addToShieldgroup("thrusters"); // sides
    this.addPolygon([28,29,33,32]).addToShieldgroup("thrusters");
    this.addPolygon([26,28,32,30]).addToShieldgroup("thrusters");
    this.addPolygon([27,29,33,31]).addToShieldgroup("thrusters");
    this.addPolygon([30,31,33,32]).addToShieldgroup("thrusters");
    this.border = "#ED1C1C"; this.inner = "rgba(189,43,43,0.2)";
    this.addPolygon([34,35,38]); // flame1
    this.addPolygon([34,36,38]);
    this.addPolygon([35,37,38]);
    this.addPolygon([36,37,38]);
    this.addPolygon([39,40,43]); // flame2
    this.addPolygon([39,41,43]);
    this.addPolygon([40,42,43]);
    this.addPolygon([41,42,43]);
    this.border = "#EEE"; this.inner = null;
    // Com array
    this.addPolygon([44,45,49,48]).addToShieldgroup("com"); // base sides
    this.addPolygon([46,47,51,50]).addToShieldgroup("com");
    this.addPolygon([44,46,50,48]).addToShieldgroup("com");
    this.addPolygon([45,47,51,49]).addToShieldgroup("com");
    this.addPolygon([48,49,51,50]).addToShieldgroup("com"); // base top
    this.addPolygon([52,53,49,48]).addToShieldgroup("com"); // parabola
    this.addPolygon([54,55,50,48]).addToShieldgroup("com");
    this.addPolygon([56,57,51,49]).addToShieldgroup("com");
    this.addPolygon([58,59,51,50]).addToShieldgroup("com");
    this.addPolygon([52,54,48]).addToShieldgroup("com");
    this.addPolygon([53,56,49]).addToShieldgroup("com");
    this.addPolygon([55,58,50]).addToShieldgroup("com");
    this.addPolygon([57,59,51]).addToShieldgroup("com");
  }

  update (e) {
    // this.rotate(0,0,e.delta/5000);
  }
}
