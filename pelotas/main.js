// setuo canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

//funtion to generate random color 

function randomRGB() {
    return 'rgb ({random(0, 255)},${random(0, 255},${random(0, 255)})'
}

function random(min, max){
    var num= Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

function Ball (x, y, velX, velY, color, size) {
    this.x = x; //posicion horizontal
    this.y = y; // psosicion vertical
    this.velX = velX; // velocidad horizontal
    this.velY = velY; // velocidad vertical
    this.color = color; // color
    this.size = size; // tama
}

Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

var testBall = new Ball(50, 100, 4, 4, 'blue', 10);
testBall.x
testBall.size
testBall.color
testBall.draw()

Ball.prototype.update = function() {
    
    if ((this.x + this.size) >= width) {
        this.velX =  -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if ((this.y + this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY
}

var balls = [];

function loop() {
    ctx.fillStyle = 'rgba(24, 2, 223, 0.25)';
    ctx.fillRect(0, 0, width, height);

    while (balls.length < 25) {
        var size = random(10,20); 
        var ball = new Ball(
            //la posicion de las pelotudas, se dibujara al menos siempre
            //como minimo a un ancho de la pelota de distancia al bordedel canvas, para evistar errores en el dibujo
        random(0 + size, width - size), 
        random(0 + size, height - size),
        random(-7,7),
        random(-7,7),
        'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')', size
        );
        balls.push(ball);
    }

    for(var i = 0; i < balls.length; i++) {
        balls [i].draw();
        balls[i].update();
    }

    requestAnimationFrame(loop);
}

loop();

Ball.prototype.collisionDetect = function() {
    for (var j = 0; j < balls.length; j++) {
      if (!(this === balls[j])) {
        var dx = this.x - balls[j].x;
        var dy = this.y - balls[j].y;
        var distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + balls[j].size) {
          balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
        }
      }
    }
  }

balls[i].update();
 
balls[i].collisionDetect();