export class Snowflake {
  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id
    this.dead = false;
    this.size = 45;
  }

  update() {
    this.y += 5;
    if (this.y > canvas.height - 50)
    {
        this.dead = true; 
    }
  }

  isClicked(mouseX, mouseY) {
    return  this.x - this.size / 2 <= mouseX && mouseX <= (this.x + this.size / 2) && this.y <= mouseY && mouseY <= (this.y + this.size)  
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = '#4C6589';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';

    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.size);
    ctx.moveTo(this.x - (this.size / 2), this.y + (this.size / 2));
    ctx.lineTo(this.x + (this.size / 2), this.y + (this.size / 2));
    ctx.moveTo(this.x - (this.size / 5 * 1.8), this.y + (this.size / 5));
    ctx.lineTo(this.x + (this.size / 5 * 1.8), this.y + (this.size / 5 * 4));

    ctx.moveTo(this.x + (this.size / 5 * 1.8), this.y + (this.size / 5));
    ctx.lineTo(this.x - (this.size / 5 * 1.8), this.y + (this.size / 5 * 4));

    ctx.moveTo(this.x - (this.size / 6), this.y);
    ctx.lineTo(this.x, this.y + (this.size / 5));
    ctx.moveTo(this.x + (this.size / 6), this.y);
    ctx.lineTo(this.x, this.y + (this.size / 5));

    ctx.moveTo(this.x, this.y + (this.size - (this.size / 5)));
    ctx.lineTo(this.x - (this.size / 6), this.y + this.size);
    ctx.moveTo(this.x, this.y + (this.size - (this.size / 5)));
    ctx.lineTo(this.x + (this.size / 6), this.y + this.size);

    ctx.moveTo(this.x - (this.size / 2), this.y + (this.size / 2) + (this.size / 6));
    ctx.lineTo(this.x - (this.size / 3), this.y + (this.size / 2));

    ctx.moveTo(this.x - (this.size / 2), this.y + (this.size / 2) - (this.size / 6));
    ctx.lineTo(this.x - (this.size / 3), this.y + (this.size / 2));

    ctx.moveTo(this.x + (this.size / 2), this.y + (this.size / 2) + (this.size / 6));
    ctx.lineTo(this.x + (this.size / 3), this.y + (this.size / 2));

    ctx.moveTo(this.x + (this.size / 2), this.y + (this.size / 2) - (this.size / 6));
    ctx.lineTo(this.x + (this.size / 3), this.y + (this.size / 2));

    ctx.stroke();
  }
}
