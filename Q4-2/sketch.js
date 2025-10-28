// 折れ線グラフ
function setup(){
  createCanvas(400, 400);
  background(240);

  // 配列をランダムに初期化する
  let scores = [];
  for(let i = 0; i < 10; i++){
    scores[i] = random(20, 100); // 60以上100未満のランダムな数を代入
  }

  // 横線を引く
  const n = 10;
  for(let i = 0; i < n; i++){ line(0, height * i / n, width, height * i / n); }

  // ここからが本番
  fill(0);
  const dx = width / scores.length;
  let nx, ny, px, py; // 線を引くために一つ前の点を覚えておく変数
  for(let i = 1; i < scores.length; i++){
    nx = dx/2+i*dx
    ny = height - height * scores[i] / 100;
    px = dx/2+(i-1)*dx
    py = height - height * scores[i-1] / 100;

    line(px, py, nx, ny)
    ellipse(px, py, 5, 5)

    if (i+1 == scores.length) {
      ellipse(nx, ny, 5, 5)
    }
  }
}
