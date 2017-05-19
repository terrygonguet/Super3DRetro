class Impact extends Shape3D {

  constructor(x, y, z, size, color) {
    super(x, y, z);
    this.size = size;
    this.time = 0;
    this.color = color;
  }

  update (e) {
    this.time += e.delta;
    if (this.time >= 2000) game.removeChild(this);
  }

  render (camera) {
    camera
      .color(hexToRgbA(this.color, 1-this.time/2000))
      .drawCircle(this.position,this.time/2000*this.size);
  }

}
