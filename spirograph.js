class Compass{
    constructor(x, y, r, angle, freq){
        this.r = r;
        this.angle = angle;
        this.freq = freq;
        this.pos = createVector(x, y);
        this.c = color(255);
        this.weight = 1;
    }

    draw(){
        if(shouldDraw){
            push();
            (() => {
                fill(this.c);
                stroke(this.c);
                strokeWeight(this.weight);
                noFill();
                circle(this.pos.x, this.pos.y, this.r);
            })();
            pop();
        }
    }
    rotate(freq){
        this.angle += this.freq*freq;
        this.angle %= TWO_PI;
    }

    move(parent){
        if(parent){
            this.pos = parent.pos.copy().add(p5.Vector.fromAngle(parent.angle).mult(parent.r/2));
        }
    }
}