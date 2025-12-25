/* CUSTOM CURSOR */
const cursor = document.querySelector('.cursor');
window.addEventListener('mousemove', e=>{
  cursor.style.left = e.clientX+'px';
  cursor.style.top = e.clientY+'px';
});

/* SCROLL REVEAL */
const reveals = document.querySelectorAll('.reveal');
const revealOnScroll = ()=>{
  reveals.forEach(el=>{
    if(el.getBoundingClientRect().top < window.innerHeight-100){
      el.classList.add('active');
    }
  });
};
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

/* PARTICLE BACKGROUND */
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

let particles = [];
const COUNT = 90;
let merge = true;
let timer = 0;

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

class Particle{
  constructor(){
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height;
    this.vx = (Math.random()-0.5)*0.6;
    this.vy = (Math.random()-0.5)*0.6;
    this.r = 2;
  }
  update(){
    this.x += this.vx;
    this.y += this.vy;
  }
  draw(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
    ctx.fillStyle = "#4fd1c5";
    ctx.fill();
  }
}

for(let i=0;i<COUNT;i++) particles.push(new Particle());

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  timer++;
  if(timer>600){
    merge = !merge;
    timer = 0;
  }

  const cx = canvas.width/2;
  const cy = canvas.height/2;

  particles.forEach(p=>{
    if(merge){
      p.vx += (cx - p.x)*0.00005;
      p.vy += (cy - p.y)*0.00005;
    }else{
      p.vx += (Math.random()-0.5)*0.002;
      p.vy += (Math.random()-0.5)*0.002;
    }
    p.update();
    p.draw();
  });

  requestAnimationFrame(animate);
}
animate();
