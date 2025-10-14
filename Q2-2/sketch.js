// チェッカー
function setup() {
  createCanvas(200, 200);
  const size = width / 8; // マスの一辺の長さ
  noStroke();
  for(let i = 0; i < 8; i++){
    for(let j = 0; j < 8; j++){
      if ((i+j) % 2 != 0){
        fill(100, 100, 100)
        rect(size * i, size * j, size, size)
      }

      if ((j < 3) && ((i+j) % 2 != 0)) {
        fill(255, 0, 0)
        ellipse(size*i + size*0.5, size*j+size*0.5, size*0.9, size*0.9)
      }

      if ((j > 4) && ((i+j) % 2 != 0)) {
        fill(0)
        ellipse(size*i + size*0.5, size*j+size*0.5, size*0.9, size*0.9)
      }
    }
  }
}