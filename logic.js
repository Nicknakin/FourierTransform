let spiroParent;
let backgroundImage;
let shouldDraw = true;
let tempGraphics;
let spirograph;
let freqSlider;
let lasts;

function setup(){
    createCanvas(windowWidth, windowHeight);
    lasts = new Array(width-height);
    freqSlider = createSlider(0, 5, 1, 0.01);
    freqSlider.position(20, height-80);
    freqSlider.style('width', '160px');
    shouldDrawButton = createButton("Draw Circles");
    shouldDrawButton.position(20, height-40);
    shouldDrawButton.mousePressed(() => shouldDraw = !shouldDraw);
    backgroundImage = createGraphics(width, height);
    tempGraphics = createGraphics(windowWidth, height)
    backgroundImage.stroke(255);
    backgroundImage.strokeWeight(2);
    const Epsilon = TWO_PI/60/5;
    spiroParent = new Compass(height/2, height/2, height/2, 0, Epsilon);
    spirograph = [spiroParent].concat(new Array(50).fill().map((_, i) => 
        temp = new Compass(0, 0, spiroParent.r/(i*2-1), 0, (i*2-1)*Epsilon)).splice(2));
    background(0);
}

function draw(){
    const RoC = 5;
    for(let i = 0; i < RoC; i++){
        update(RoC);
    }
}

function update(RoC){
    background(0);
    const freq = freqSlider.value()/RoC;
    spirograph.forEach((value, index, arr) => {
        if(index != 0){
            value.move(arr[index-1])
            push();
            stroke(255);
            fill(255);
            line(value.pos.x, value.pos.y, arr[index-1].pos.x, arr[index-1].pos.y);
            pop();
        }
        value.rotate(freq);
        value.draw();
    });
    lasts.splice(0,0,spirograph[spirograph.length-1].pos.y+sin(spirograph[spirograph.length-1].angle)*spirograph[spirograph.length-1].r/2);
    if(lasts.length >= (width-height)*RoC) lasts.pop();
    push();
    fill(255);
    stroke(255);
    line(
        spirograph[spirograph.length-1].pos.x+cos(spirograph[spirograph.length-1].angle)*spirograph[spirograph.length-1].r/2
        , spirograph[spirograph.length-1].pos.y+sin(spirograph[spirograph.length-1].angle)*spirograph[spirograph.length-1].r/2
        , height
        , spirograph[spirograph.length-1].pos.y+sin(spirograph[spirograph.length-1].angle)*spirograph[spirograph.length-1].r/2);
    lasts.forEach((p, it) => {
        if(p)
            point(it/RoC+height, p);
    })
    pop();
}
