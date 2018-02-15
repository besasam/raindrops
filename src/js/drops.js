var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
gradient.addColorStop(0, "#323991");
gradient.addColorStop(1, "#000");

var x = Math.random() * 800;
var y = 0;

var vx = 0;
var vy = 1;

var ground = [];

for(var i = 0; i < 800; i++) {
  ground.push(599);
}

var particles = {},
  particleIndex = 0,
  settings = {
    size: 1,
    density: 100
  }

function Particle() {
  this.x = Math.round(Math.random() * 800);
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  particleIndex++;
  particles[particleIndex] = this;
  this.id = particleIndex;
}

Particle.prototype.draw = function() {
  this.x += this.vx;
  if(this.y == ground[this.x]) {
    this.vy = 0;
    ground[this.x] = this.y - 1;
  } else { this.y += this.vy; }
  ctx.clearRect(settings.leftWall, settings.groundLevel, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.fillRect(this.x,this.y,1,1);
}

setInterval(function() {
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for(var i = 0; i < settings.density; i++) {
    if(Math.random() > 0.995) {
      new Particle();
    }
  }

  for(var i in particles) {
    particles[i].draw();
  }
}, 10);
