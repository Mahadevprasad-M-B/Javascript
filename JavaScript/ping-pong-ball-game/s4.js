let can = document.getElementById("table"); 
let draw_= can.getContext('2d');
const ball = {
    x: can.width/2,
    y: can.height/2,
    radius: 10,
    velx: 5,
    vely : 5,
    speed : 5,
    color: "green"
  };

  const user = {

    x: 0,
    y: (can.height - 100)/2,
    width: 10,
    height: 100,
    score: 0,
    color : "red"
    
    };

    const cpu={
      x:can.width-10,
      y:(can.height-100)/2,
      width:10,
      height:100,
      score:0,
      color:"red"
    }

    const sep = {
      x: (can.width-2)/2,
      y:0,
      height:10,
      width:2,
      color:"orange"
    }

    function drawRectangle(x,y,w,h,color) {
      draw_.fillStyle = color;
      draw_.fillRect(x,y,w,h);
    }

    function drawCircle(x,y,r,color) {
      draw_.fillStyle = color;
      draw_.beginPath();
      draw_.arc(x,y,r,0,Math.PI*2,false);
      draw_.closePath();
      draw_.fill();
    }

    function drawScore(text,x,y) {
      draw_.fillStyle = "white";
      draw_.font = "60px Arial";
      draw_.fillText(text,x,y);
    }


    function drawSeperator() {
      for(let i = 0; i< can.height;i+=20) {
        drawRectangle(sep.x,sep.y + i ,sep.width,sep.height);
      }
    }

    can.addEventListener("mousemove",getMousePos);

    function getMousePos(evt) {
    let rect = can.getBoundingClientRect();
    user.y = evt.clientY - rect.top - user. height/2;
    }

    function helper() {
      drawRectangle(0,0,can.width,can.height,"black");
      drawScore(0,can.width/4,can.height/5);
      drawScore(0,3*can.width/4,can.height/5);
      drawSeperator();
      drawRectangle(user.x,user.y,user.width,user.height,user.color);
      drawRectangle(cpu.x,cpu.y,cpu.width,cpu.height,cpu.color);
      drawCircle(ball.x,ball.y,ball.radius,ball.color);
 
    }

    function call_back(){
      // updates
      helper();
    }

    
function detect_collision(ball,player) {
  player.top = player.y;
  player.bottom = player.y+player.height;
  player.left = player.x;
  player.right = player.x+player.width;

  ball.top = ball.y - ball.radius;
  ball.bottom = ball.y+ball.radius;
  ball.left = ball.x-ball.radius;
  ball.right = ball.x+ball.radius;

  return player.left < ball.right && player.top < ball.bottom && player.right > ball.left && player.bottom >ball.top;
}
    
function updates() {
  if (ball.x-ball.radius < 0) {
    cpu.score++;
    restart();
  }
  else if(ball.x+ball.radius > can.width) {
    user.score++;
    restart(); 
  }
  ball.x += ball.velx;
  ball.y += ball.vely;

  cpu_movement();

  if(ball.y - ball.radius < 0 || ball.y + ball.radius > can.height) {
    ball.vely = -ball.vely;
  }

  let player = (ball.x + ball.radius < can.width/2) ? user : cpu; 

  if(detect_collision(ball,player)) {
    let collidePoint = (ball.y - (player.y + player.height/2));
    collidePoint = collidePoint / (player.height/2);

    let angleRad = (Math.PI/4) * collidePoint;

    let direction = (ball.x + ball.radius< can.width);

    ball.velx = direction * ball.speed*Math.cos(45);
    ball.vely = ball.speed * Math.sin(angleRad);
    
    ball.speed+=1;
  }
  
}

function restart() {
  ball.x = can.width/2;
  ball.y = can.height/2;
  ball.velx = -ball.velx;
  ball.speed = 5;
}

function cpu_movement() {
  if(cpu.y<ball.y) {
    cpu.y+=5;
  }
  else {
    cpu.y-=5;
  }
}

Mathematics :
cpu.y +=((ball.y - (cpu.y + cpu.height/2)));

Random :
cpu.y = Math.random()*can.height;

let fPS = 50;
let looper = setInterval(call_back,1000/fPS);



