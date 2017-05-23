class Impact extends Shape3D {

  constructor(x, y, z, size, color, type="circle") {
    super(x, y, z);
    this.size = size;
    this.time = 0;
    this.color = color;
    this.type = type;
  }

  update (e) {
    this.time += e.delta;
    if (this.time >= 2000) game.removeChild(this);
  }

  render (camera) {
    switch (this.type) {
      case "circle":
        camera
          .color(hexToRgbA(this.color, 1-this.time/2000))
          .drawCircle(this.position,this.time/2000*this.size);
        break;
      case "point":
        camera
          .color(hexToRgbA(this.color, 1-this.time/2000))
          .drawPoint(this.position);
        break;
    }
  }

}
