// たくさん出てくるアニメーション
let balls;
let targets; // 追加（ボールを当てる的）
let sum_hit;

function setup(){
  createCanvas(windowWidth, windowHeight);
  balls = [];
  targets = [];
  sum_hit = 0;
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  background(160, 192, 255);

  // 的のアニメーション（注意：追加しないと何も起きない）
  for(let i = 0; i < targets.length; i++){
    let t = targets[i];
    fill(0);
    ellipse(t.x, t.y, t.size);
    t.x += t.vx;
    t.y += t.vy;
    t.size += 2;
  }

  // ボールのアニメーション
  for(let i = 0; i < balls.length; i++){
    let b = balls[i];
    fill(255);
    ellipse(b.x, b.y, b.size);
    b.x += b.vx;
    b.y += b.vy;
  }

  // 画面外に出たボールを配列から削除する
  const ballsInCanvas = []; // 画面内のボールを一時的に保持する配列
  for(let i = 0; i < balls.length; i++){
    let b = balls[i];
    if(b.x > 0 && b.x < width && b.y > 0 && b.y < height){ // 画面内
      ballsInCanvas.push(b);
    }
  }
  balls = ballsInCanvas; // 画面内のボールだけを残す

  // 補足：filter 関数を使うともっと簡単に書ける
  // balls = balls.filter(insideCanvas);

  if(frameCount % 20 === 0) { // 20フレームごとに新しい的を追加する
    // BLANK[1] 新しい的オブジェクトを作成して targets 配列に追加しよう
    let gene_t = {x: width/2, y: height/2, size: 100, vx: random(-5, 5), vy: random(-5, 5)}
    targets.push(gene_t)
  }

  // ボールに当たった or 大きくなりすぎた的を配列から削除する
  const activeTargets = []; // 生き残った的を一時的に保持する配列
  for(let i = 0; i < targets.length; i++){
    let t = targets[i];
    if(t.size < 300){ // 大きくなりすぎていない
      let hit = false;
      for(let j = 0; j < balls.length; j++){ // すべてのボールと衝突判定
        let b = balls[j];
        if ((Math.abs(t.x - b.x) < t.size/2*0.8) && (Math.abs(t.y - b.y) < t.size/2*0.8)) {
          hit = true;
          sum_hit ++;
        }
      }
      if(!hit) activeTargets.push(t); // 衝突していなければ生き残る
    }
  }
  targets = activeTargets; // 生き残った的だけを残す

  textSize(32); // 文字サイズを32に設定
  textAlign(CENTER, CENTER); // 文字の基準位置を中央に設定
  text(String(sum_hit)+" ヒット！", width / 2, height-50); // 画面中央に描く
}

function mouseDragged(){
  const dx = mouseX - pmouseX;
  const dy = mouseY - pmouseY;
  if(mag(dx, dy) > 5){
    const b = { x: mouseX, y: mouseY, size: 20, vx: dx, vy: dy };
    balls.push(b);
  }
}

function insideCanvas(b) {
  return b.x > 0 && b.x < width && b.y > 0 && b.y < height;
}