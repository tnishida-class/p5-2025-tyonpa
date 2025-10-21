// 2D アニメーションゲームのようなインタラクション
let x, y;
let vx, vy;
let is_jump, jump_height;
const g = 5;

function setup(){
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height / 2;
  jump_height = height /2
  vx = 0;
  vy = 0;
  is_jump = false;
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  background(160, 192, 255);
  const size = height * 0.1; // キャラクターのサイズ

  // 地面を描く
  const groundY = height * 0.8;
  fill(64, 192, 64);
  rect(0, groundY, width, height - groundY);

  // BLANK[1] キャラクターの左右移動
  if(keyIsDown("S".charCodeAt(0))) {
    speed_up = 5;
  } else {
    speed_up = 0;
  }
  
  if(keyIsDown(RIGHT_ARROW)){ x += (5 + speed_up); }
  if(keyIsDown(LEFT_ARROW)){ x -= (5 + speed_up); }

  // BLANK[2] 重力とジャンプ
  if (!is_jump) {
    if (y <= groundY - size * 0.5) {
      vy += g
    } else {
      vy = 0
      // jump処理 
      if (keyIsDown(" ".charCodeAt(0))) {
        is_jump = true;
        vy -= 20;
      }
    }
  // jumpしている間は重力を無視
  } else if (y <= jump_height) {
    is_jump = false;
  }

  // 速くなりすぎないように制限
  vx = constrain(vx, -20, 20);
  vy = constrain(vy, -20, 20);

  // 位置を更新
  x += vx;
  y += vy;

  // キャラクターを描く
  fill(0);
  ellipse(x, y, size, size);
}