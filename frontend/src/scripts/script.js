// IDENTIDADE VISUAL DINÂMICA - MEDIALAB UERJ 
// Desenvolvimento: Jesus Baro e Vinicius Correa
// Orientação: Barbara Castro

///////////////////
// var pdf;
let m;
let mArray = [];
let a = 0; // variável que será usada para controlar o ângulo no polar perlin noise loop
let noiseLoopX, noiseLoopY;
let ref;
let jost;

let xx = -2730;
let yy = -1540;
let s = 15;

function preload(){
	jost = loadFont('Jost-VariableFont_wght.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // pdf = createPDF();
  // pdf.beginRecord();
  colorMode(RGB);
  // o primeiro valor se refere a velocidade. quanto maior, mais rápido. os outros dois se referem ao valor mínimo e máximo, respectivamente
  noiseLoopX = new NoiseLoop(0.25, -1, width);
  noiseLoopY = new NoiseLoop(0.30, -1, height);
  frameRate(30);
	pixelDensity(2)
	
		xx = random(-5000, -7000);
	yy = random(-1500, -3000);
	
	textFont(jost);
 
}
function draw() {
  background(255);

  
  // clear();
  push();
	translate(xx,yy);
	scale(s);
  drawM();
  pop();
	

	
	noStroke();
	fill(200,0,0);
	textSize(18);
	text("laboratório experimental de mídias da UERJ", 300, 0);
	text("escola superior de desenho industrial", 300, 30);
	textSize(14);
	text("ENTRE",300, 60);
}

function drawM() {
  // aqui desenhamos o M
  a -= radians(1);

  let x = noiseLoopX.value(a);
  let y = noiseLoopY.value(a);


  //noStroke();
  m = new M(x / 2, y / 2);
  mArray.push(m);

  for (let ms of mArray) {
    ms.show();
    ms.move();
    ms.update();
  }

  if (mArray.length >= 100) {
    // alterar esse valor deixa o rastro mais longo
    mArray.splice(0, 1);
  }
}

class M {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    let xCenter = width / 2;
    let yCenter = height / 2;

    this.x1 = xCenter - 105; //PE DO M - abertura
    this.y1 = yCenter + 100; //PE DO M - altura
    this.x2 = xCenter - 105;
    this.y2 = yCenter - 115; // topo 1
    this.x3 = xCenter - 70; // LARGURA SUPERIOR
    this.y3 = yCenter - 115; // topo 2
    this.x4 = xCenter + 4;
    this.y4 = yCenter + 60; //ALTURA MEIO 1
    // this.x4A = xCenter+3;
    // this.y4A = yCenter+70 ; //ALTURA MEIO 1
    this.x5 = xCenter + 77; // LARGURA SUPERIOR
    this.y5 = yCenter - 115; // topo 3
    this.x6 = xCenter + 110;
    this.y6 = yCenter - 115; // topo 4
    this.x7 = xCenter + 110;
    this.y7 = yCenter + 100; //PE DO M ALTURA

    this.life = 1;
    this.alpha = 0.01;
  }
  show() {
    push();
    translate(this.x - width / 2, this.y - height / 2);
    noFill();
    strokeWeight(map(noise(this.alpha), 0, 1, 0,7));

    // //---- COR
    stroke(182, 37, 32, this.alpha); //preto
    // stroke(115, 24, 20, this.alpha); //vermelho 1
     // stroke(79, 16, 13, this.alpha); //vermelho 2
    beginShape();
    vertex(this.x1, this.y1);
    vertex(this.x2, this.y2);
    vertex(this.x3, this.y3);
    // vertex(this.x4A, this.y4A);
    vertex(this.x4, this.y4);
    vertex(this.x5, this.y5);
    vertex(this.x6, this.y6);
    vertex(this.x7, this.y7);
    endShape();
    pop();
  }
  move() {
    this.x1 = map(cos(frameCount * 0.1), -1, 1,
    this.x1 + 0.07,this.x1 + 0.3);
    // this.y1 = map(sin(frameCount * 0.1), -1, 1,
    //   this.y1 -0.2, this.y1 + 0.01 );
    this.x2 = map(cos(frameCount * 0.1), -1, 1, 
    this.x2 + 0.1, this.x2 + 0.2);
    this.y2 = map(sin(frameCount *0.01), -1, 1,
    this.y2 +0.5, this.y2 +0.5);
    this.x3 = map(cos(frameCount * 0.1),-1,1,
    this.x3 + 0.1 ,this.x3 - 0.1);
    this.y3 = map(cos(frameCount * 0.1), -1, 1,
    this.y3 + 1, this.y3 +0.7);
    this.x4 = map(cos(frameCount * 0.0001),-1,1,
    this.x4 - 0.01,this.x4 - 0.05);
    this.y4 = map(cos(frameCount * 0.00001),-1,1,
    this.y4 + 0.2,this.y4 + 0.2); 
    this.x5 = map(cos(frameCount * 0.1), -1, 1, 
    this.x5 + 0.01, this.x5 + 0.02);
    this.y5 = map(cos(frameCount * 0.01), -1, 1,
    this.y5 +0.5, this.y5 + 0.5 );
    this.x6 = map(cos(frameCount * 0.1), -1, 1, 
    this.x6 -0.3, this.x6 - 0.3);
    this.y6 = map(cos(frameCount * 0.1), -1, 1, 
    this.y6 +0.3, this.y6 + 0.3);
    this.x7 = map(cos(frameCount * 0.1), -1, 1, 
    this.x7 - 0.3,this.x7 - 0.3);
    //   this.y7 = map(sin(frameCount * 0.1), -1, 1,
    // this.y7 -0.5, this.y7 + 0.2 );
  }
  update() {
    this.life -= 0.01;
    this.alpha = map(this.life, 0, 1, 0, 50); //oficial
  }
}

////EDITAR O MOVIMENTO AQUI
class NoiseLoop {
  constructor(diameter, min, max) {
    
    this.diameter = diameter /1.5 ; // VERSAO SLOW
    // this.diameter = diameter *2 ; // VERSAO FAST
    
    this.min = min;
    this.max = max;

    this.cx = random(100000000);
    this.cy = random(100000000);
  }
  value(a) {
    let xoff = map(cos(a), 0, -1, this.cx, this.cx + this.diameter);
    let yoff = map(-sin(a), 0, 100000, this.cy, this.cy - this.diameter);
    let r = noise(xoff, yoff);
    return map(r, 0, 1.5, this.min, this.max); //teste
  }
}

 function keyPressed() {
   if(keyCode === LEFT_ARROW){
		 xx-=150;
	 }
	 if(keyCode === RIGHT_ARROW){
		 xx+=150;
	 }
	 if(keyCode === UP_ARROW){
		 yy+=150;
	 }
	 if(keyCode === DOWN_ARROW){
		 yy-=150;
	 }
	 
	 if(key === 's'){
		 s+=1;
	 }
	 if(key === 'd'){
		 s-=1;
	 }
	 
	 
	 
	 console.log(xx,yy,s);
 }

// function keyPressed() {
//   if (keyCode === ENTER) {
//     let fs = fullscreen();
//     fullscreen(!fs);
//   }
// }

// function mousePressed() {
// save("Logo-EditpoP5js"+ frameCount + ".png");
// }