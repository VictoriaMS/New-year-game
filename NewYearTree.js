export class NewYearTree {
  constructor(x, y, width, height, color_1, color_2, branch_count = 4, branch_length = 60, branch_width = 15) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color_1 = color_1;
    this.color_2 = color_2;
    this.branch_count = branch_count;
    this.branch_length = branch_length;
    this.branch_width = branch_width;
  }

  draw(ctx) {
    ctx.fillStyle = this.color_1;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.width/2, this.y + this.height);
    ctx.lineTo(this.x - this.width/2, this.y + this.height);
    ctx.fill();

    ctx.strokeStyle = this.color_2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.lineWidth = 5;

    ctx.moveTo(this.x, this.y + 140);
    ctx.lineTo(this.x, this.y + this.height - 5); 
    ctx.stroke();

    let height = this.y + 140;
    let secondHeight = this.y + 180;

    for (let i = 0; i < this.branch_count; i++) {
      ctx.moveTo(this.x, height);
      ctx.lineTo(this.x + this.branch_width, secondHeight); 
      ctx.stroke();

      ctx.moveTo(this.x, height);
      ctx.lineTo(this.x - this.branch_width, secondHeight); 
      ctx.stroke();

      height += this.branch_length;
      secondHeight += this.branch_length;
    }
  }
}
