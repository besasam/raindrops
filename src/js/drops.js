var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var bgColorTop = "#323991";
var bgColorBot = "#000000"
var sfColor = "#ffffff";

var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
gradient.addColorStop(0, bgColorTop);
gradient.addColorStop(1, bgColorBot);

var flakes = 5;

var x = Math.random() * 800;
var y = 0;

var vx = 0;
var vy = 1;

var ground = [];

for(var i = 0; i < 800; i++) {
  ground.push(599);
}

var flakesControl = document.getElementById("flakes-control");
flakesControl.oninput = function() {
  flakes = +this.value;
  if(flakes > 8) {
    flakes *= 3;
  } else if(flakes > 5) {
    flakes *= 2;
  }
}

var windControl = document.getElementById("wind-control");
windControl.oninput = function() {
  vx = +this.value;
  for(var i in particles) {
    if(particles[i].vy > 0) {
      particles[i].vx = vx;
    }
  }
}

var gravityControl = document.getElementById("gravity-control");
gravityControl.oninput = function() {
  vy = +this.value;
  for(var i in particles) {
    if(particles[i].vy > 0) {
      particles[i].vy = vy;
    }
  }
}

var bgColorTopSelect = document.getElementById("bg-color-1-select");
bgColorTopSelect.oninput = function() {
  bgColorTop = this.value;
  gradient.addColorStop(0, bgColorTop);
}

var bgColorBotSelect = document.getElementById("bg-color-2-select");
bgColorBotSelect.oninput = function() {
  bgColorBot = this.value;
  gradient.addColorStop(0.9999, bgColorBot);
}

var sfColorSelect = document.getElementById("sf-color-select");
sfColorSelect.oninput = function() {
  sfColor = this.value;
}

var particles = {},
  particleIndex = 0,
  settings = {
    size: 1,
    density: 100
  }

function Particle() {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.color = sfColor;
  particleIndex++;
  particles[particleIndex] = this;
  this.id = particleIndex;
}

Particle.prototype.draw = function() {
  if(this.y == ground[this.x] || this.y < ground[this.x] && this.y >= ground[this.x] - vy) {
    if(this.y != ground[this.x]) {
      this.y = ground[this.x];
    }
    this.vy = 0;
    this.vx = 0;
    ground[this.x] -= 1;
  } else {
    this.y += this.vy;
    this.x += this.vx;
  }
  ctx.clearRect(settings.leftWall, settings.groundLevel, canvas.width, canvas.height);
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x,this.y,1,1);
}

setInterval(function() {
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if(vx == 0 || vx >= 0 && Math.random() >= 0.5 || vx <= 0 && Math.random() >= 0.5) {
      x = Math.round(Math.random() * 800);
      y = 0;
    } else if(vx >= 0) {
      x = 0;
      y = Math.round(Math.random() * 600);
    } else {
      x = 800;
      y = Math.round(Math.random() * 600);
    }
  for(var i = 0; i < settings.density; i++) {
    if(Math.random() > (1 - (flakes / 1000))) {
      new Particle();
    }
  }

  for(var i in particles) {
    particles[i].draw();
  }
}, 10);
