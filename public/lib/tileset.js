class Tileset {
  constructor(
    imageSource,
    tileSize,
    tilesetColumns,
    tilesetRows,
    canvasTileSize,
    margin,
    xZero = 0,
    yZero = 0
  ) {
    this.source = imageSource;
    this.originalTileSize = tileSize;
    this.numWid = tilesetColumns;
    this.numHei = tilesetRows;
    this.tileSize = canvasTileSize;
    this.margin = margin
    this.xZero = xZero;
    this.yZero = yZero;
    this.blockList = []
    this.clueList = []
  }

  preload() {
    this.source = loadImage(this.source)
  }

  drawTile(n, x, y, size,imageModeString) {
    if(n=="-1"){
      
    }else{
    let { tileX, tileY } = this.tileNumToPos(n);
    if (imageModeString)
      imageMode(imageModeString);
    image(
      this.source,
      x,
      y,
      size,
      size,
      tileX,
      tileY,
      this.originalTileSize-this.margin,
      this.originalTileSize-this.margin
    );}
  }

  tileNumToPos(n) {
    return {
      tileX: (n % this.numWid) * this.originalTileSize,
      tileY: Math.floor(n / this.numWid) * this.originalTileSize,
    };
  }

 

  drawMap(tileMap, ifBlock) {
    for (let y = 0; y < tileMap.length; y++) {
      for (let x = 0; x < tileMap[y].length; x++) {
        if(ifBlock && tileMap[y][x]!=-1 ){
                  this.blockList.push( [x * this.tileSize + this.xZero,
                y * this.tileSize + this.yZero])
                }
        this.drawTile(
          tileMap[y][x],
          x * this.tileSize + this.xZero,
          y * this.tileSize + this.yZero,
          this.tileSize,
        );
      }
    }
  }
}