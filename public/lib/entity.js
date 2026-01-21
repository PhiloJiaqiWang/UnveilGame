class Entity {
  constructor(tileSet, size) {
    this.tileSet = tileSet
    this.position = {}
    this.spriteAnimations = new Map()
    this.currentAnimation = ''
    this.currentAnimationIdx = 0
    this.size = size
    this.ifBlock = false
    this.timeSinceLastFrame = 0
    this.clueList = []
    this.allClue = false
    this.trueClue = []
    this.backpack = 2
    this.speed = 3
    this.glass = null
    this.hint = ""
    this.name = ""
  }

  preload() {
    this.tileSet.preload()
    this.position = createVector(0, 0)
    this.glass = loadImage('./assets/magnifying-glass.png');
  }

  setPosition(point) {
    this.position.x = point.x
    this.position.y = point.y
  }


  setSize(size) {
    this.size = size
  }

  addAnimation(name, cycle, time) {
    this.spriteAnimations.set(name, {cycle, time})
  }

  setCurrentAnimation(name) {
    this.currentAnimation = name
  }

  get center() {
    return { x: this.position.x + 0.5 * this.size, y: this.position.y + 0.5 * this.size }
  }

  PointIn(tileX, tileY, tileMaxX, tileMaxY) {
    let yOffset = 0
    let xOffset = 0
    if (key_list.indexOf("ArrowUp") !== -1) { yOffset = 0 }
    if (key_list.indexOf("ArrowLeft") !== -1) { xOffset = -0.5, yOffset = .2 }
    if (key_list.indexOf("ArrowRight") !== -1) { xOffset = +0.5, yOffset = .2 }
    if (key_list.indexOf("ArrowDown") !== -1) { yOffset = +0.5 }
    if ((this.center.x + xOffset * this.size) >= tileX && (this.center.x + xOffset * this.size) <= tileMaxX && (this.center.y + yOffset * this.size) >= tileY && (this.center.y + yOffset * this.size) <= tileMaxY) {
      return true
    }


    return false
  }



  blockMove(blockList, tileSize) {

    for (let i = 0, len = blockList.length; i < len; i++) {

      let blockTemp = this.PointIn(blockList[i][0], blockList[i][1], blockList[i][0] + tileSize, blockList[i][1] + tileSize)
      if (blockTemp) {
        this.ifBlock = true
        break
      }

    }

  }

  ifClue(clue) {
    let tileX = clue.location[0]
    let tileMaxX = clue.location[1]
    let tileY = clue.location[2]
    let tileMaxY = clue.location[3]
    let xtpr = 0
    let xtpl = 0
    let ytpu = 0
    let ytpd = 0
    if (this.currentAnimation == "walkUp")  { ytpd = 25 }
    if (this.currentAnimation == "walkDown")  { ytpu = 25 }
    if (this.currentAnimation == "walkLeft")  { xtpr = 25 }
    if (this.currentAnimation == "walkRight")  { xtpl = 25 }
    
    let clueTemp = this.PointIn(tileX - xtpl, tileY - ytpu, tileMaxX + xtpr, tileMaxY + ytpd)

    if (clueTemp) {
      let ifCheck = clue.showInfo()

      image(this.glass, this.position.x - 10, player.position.y - 15, 20, 20);
      if (ifCheck){
        return ifCheck
      }else{
        return false
      }
    }
  
  }

  move(blockList, tileSize) {
    this.blockMove(blockList, tileSize)
    key_list = key_list.filter(item => item !== 'v');
    if (key_list.indexOf("ArrowDown") !== -1 ||key_list.indexOf("ArrowLeft") !== -1 || key_list.indexOf("ArrowUp") !== -1|| key_list.indexOf("ArrowRight") !== -1) {
      let info = document.getElementById("interaction");
      info.innerHTML = this.hint;
      let clue = document.getElementById("clue");
      clue.innerHTML = "";
      document.getElementById('yes').style.display = "none";
      document.getElementById('no').style.display = "none";
      document.getElementById('A').style.display = "none";
      document.getElementById('B').style.display = "none";
      document.getElementById('C').style.display = "none";
      document.getElementById('throw').style.display = "none";
      document.getElementById('openIt').style.display = "none";
      document.getElementById('enter').style.display = "none";
      if (key_list.length == 2) {

      } else {
        let pushBack = 3
        let speed = this.speed
        if (key_list.indexOf("ArrowUp") !== -1) {
          if (this.ifBlock) {
            this.position.y = this.position.y + pushBack +2
          } else {
            player.setCurrentAnimation('walkUp')
            this.position.y = this.position.y - speed
          }
        }
        if (key_list.indexOf("ArrowDown") !== -1) {
          if (this.ifBlock) {
            this.position.y = this.position.y - pushBack -2
          } else {
            player.setCurrentAnimation('walkDown')
            this.position.y = this.position.y + speed
          }
        }
        if (key_list.indexOf("ArrowLeft") !== -1) {
          if (this.ifBlock) {
            this.position.x = this.position.x + pushBack 
          } else {
            player.setCurrentAnimation('walkLeft')
            this.position.x = this.position.x - speed
          }
        }
        if (key_list.indexOf("ArrowRight") !== -1) {
          if (this.ifBlock) {
            this.position.x = this.position.x - pushBack 
          } else {
            player.setCurrentAnimation('walkRight');
            this.position.x = this.position.x + speed
          }
        }
        if (this.ifBlock) this.ifBlock = false
        if (this.position.y < 0) {
          this.position.y = 0
        }
        if (this.position.y > (height - 50)) {
          this.position.y = height - 50
        }
        if (this.position.x < 0) {
          this.position.x = 0
        }
        if (this.position.x > (width - this.size)) {
          this.position.x = width - this.sized
        }

      }


    }
  }

  drawClues() {
    for (let i = 0, len = this.backpack; i < len; i++) {
      let idName = "clue" + (i + 1)
      let clue = document.getElementById(idName);
      clue.src = "";
    }
    for (let i = 0, len = this.clueList.length; i < len; i++) {
      let idName = "clue" + (i + 1)
      let clue = document.getElementById(idName);
      clue.src = this.clueList[i].imageSource;

    }
  }

  arrayIsIn(arr1, arr2) {
    if (arr1.length > arr2.length) {
      return false;
    }
    for (var i = 0; i < arr1.length; i++) {
      if (!arr2.includes(arr1[i])) {
        return false
      }
    }
    return true;
  }

  ifAllCuleHasFound() {
    this.ifAllClue = this.arrayIsIn(this.trueClue, this.clueList)
  }

  drawBackpack() {
    // document.getElementById("backpack").innerHTML = "<img src='images/mouse.png' width=35%></img>"
    // document.getElementById("backpack").innerHTML += "<div class='notebook' ><img src='images/notebook.png' width=100%></img></div>"
    for (var i = 0; i < this.backpack; i++) {

      document.getElementById("backpack").innerHTML +=
        "<div class='clue' ><img id='clue" + (i + 1) + "' src='' onclick='showClue(this.id);' width=100% /></div>"
    }
  }

  draw() {
    const currentAnimationList = this.spriteAnimations.get(this.currentAnimation).cycle
    const currentSprite = currentAnimationList[this.currentAnimationIdx]
    if (this.timeSinceLastFrame <= 0) {
      this.timeSinceLastFrame = this.spriteAnimations.get(this.currentAnimation).time
      this.currentAnimationIdx = (this.currentAnimationIdx + 1) % currentAnimationList.length
    }
    this.tileSet.drawTile(currentSprite, this.position.x, this.position.y, this.size)
    this.timeSinceLastFrame--
    this.drawClues()
  }

//   record(a){
//     var $x = this.position.x;
//     var $y = this.position.y;
//     var $time = new Date().getTime();
//     var $events = "checkClue";
//     var $detail = a[1];
//     var $index = a[0];
//     var xhr = new XMLHttpRequest();
//     xhr.open("get", `/pro/v1?x=${$x}&y=${$y}&time=${$time}&events=${$events}&detail=${$detail}&index=${$index}`, true);
//     xhr.send();
//   }
}