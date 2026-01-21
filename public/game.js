
let tileMap = new Tileset("./assets/map.png", 17, 57, 31, 50, 1)

let playerTileset = new Tileset("./assets/little_boy.png", 16, 3, 4, 45, 0)

var lgname = null

var player = new Entity(playerTileset, 45)

var musicon = true
var level = 0

var detail = ""

var ifNew = 1

var index = ""

var state = "solving"

var clueList = []

let key_list = []

let levels = []

var hint = "(Try walking around.)"

var gameState = "logIn"

let levelLis = []

var cnv

var events = ""

var soundDic = {}

var bgmLis = []

var leftPage = 0;
var rightPage = 1;

var nextPageButton = null
var lastPageButton = null



function preload() {
  tileMap.preload()
  player.preload()
  loadAllLevel(24)
  bgm1 = loadSound('assets/bgm1.mp3');
  bgmLis.push(bgm1)
  bgm2 = loadSound('assets/bgm2.mp3');
  bgmLis.push(bgm2)
  bgm3 = loadSound('assets/bgm3.mp3');
  bgmLis.push(bgm3)
  createSoundDic()
  notebook = loadImage('images/openNote.png');
}

function createSoundDic(){
  let cluePage = loadSound('assets/clue_page.wav');
  soundDic["clue_page"] = cluePage
  let no = loadSound('assets/no.wav');
  soundDic["no"] = no
  let take = loadSound('assets/take.wav');
  soundDic["take"] = take
  let discard = loadSound('assets/throw.wav');
  soundDic["throw"] = discard
  let food = loadSound('assets/food.wav');
  soundDic["food"] = food
  let lockedDoor = loadSound('assets/lockedDoor.wav');
  soundDic["lockedDoor"] = lockedDoor
  let openDoor = loadSound('assets/openDoor.wav');
  soundDic["openDoor"] = openDoor
  let lockedChest = loadSound('assets/lockedChest.wav');
  soundDic["lockedChest"] = lockedChest
  let plate = loadSound('assets/plate.wav');
  soundDic["plate"] = plate
  let bottle = loadSound('assets/bottle.wav');
  soundDic["bottle"] = bottle
  let soft = loadSound('assets/soft.wav');
  soundDic["soft"] = soft
  let show = loadSound('assets/show.wav');
  soundDic["show"] = show
  let openChest= loadSound('assets/chestOpen.wav');
  soundDic["openChest"] = openChest
  let crowd= loadSound('assets/crowd.wav');
  soundDic["crowd"] = crowd
  let database= loadSound('assets/database.wav');
  soundDic["database"] = database
  let click= loadSound('assets/click.mp3');
  soundDic["click"] = click
  let hello= loadSound('assets/hello.wav');
  soundDic["hello"] = hello
  let hey= loadSound('assets/hey.mp3');
  soundDic["hey"] = hey
  let white= loadSound('assets/white.mp3');
  soundDic["white"] = white
  let what = loadSound('assets/what.mp3');
  soundDic["what"] = what
  let mushroom= loadSound('assets/mushroom.wav');
  soundDic["mushroom"] = mushroom
  let testimony = loadSound('assets/testimony.wav');
  soundDic["testimony"] = testimony
  let drink = loadSound('assets/drink.wav');
  soundDic["drink"] = drink
  let correct= loadSound('assets/correct.wav');
  soundDic["correct"] = correct
  let sewing= loadSound('assets/sewing.wav');
  soundDic["sewing"] = sewing
}


function loadAllLevel(a) {
  for (let i = 0, len = a; i < len; i++) {
    le = loadJSON("./assets/level" + i + ".json")
    levels.push(le)
  }
}


function setup() {
  record()
  ifNew = 0
  clueList = clueListGenerate(level)
  player.drawBackpack()
  player.hint = hint
  let cnv = createCanvas(500, 500);
  cnv.parent('myCanvas');
  noSmooth()
  player.addAnimation('walkLeft', [9, 10, 11, 10], 10)
  player.addAnimation('walkUp', [0, 1, 2, 1], 10)
  player.addAnimation('walkDown', [6, 7, 8, 7], 10)
  player.addAnimation('walkRight', [3, 4, 5, 4], 10)
  player.setCurrentAnimation('walkDown')
  player.setPosition({ x: 50, y: 350 })
  player.speed = 5
  // frameRate(60)

  //login
  createLogIn("")

  //notebook
  nextPageButton = createButton('next page');
  lastPageButton = createButton('last page');
  lastPageButton.position(50, 470);
  nextPageButton.position(420, 470);
  nextPageButton.addClass('page');
  lastPageButton.addClass('page');
  lastPageButton.hide()
  nextPageButton.hide()


}

function createLogIn(a){
  background("#091138")
  inputName = createInput();
  inputName.position(width/2 - inputName.width/2, height/2-inputName.height/2);
  inputName.addClass("login");

  inputPassword = createInput();
  inputPassword.position(width/2 - inputName.width/2, height/2+ inputName.height/2*2);
  inputPassword.addClass("login");

  inputCode= createInput();
  inputCode.position(width/2 - inputName.width/2, height/2+ inputName.height/2*5);
  inputCode.addClass("login");

  button = createButton('Start Again');
  button.position(width/2 - inputName.width*1.5, height/2+ inputName.height/2*10);
  button.mousePressed(newGame);
  button.addClass("round_button_throw")
  button.style('font-size', '12px');

  button2 = createButton('Load Old Memory');
  button2.position(width/2 - inputName.width*1.5, height/2+ inputName.height/2*10 + button.height * 3);
  button2.mousePressed(loadGame);
  button2.addClass("round_button_throw")
  button2.style('font-size', '12px');

  button3 = createButton('New Player');
  button3.position(width/2, height/2+ inputName.height/2*10);
  button3.mousePressed(register);
  button3.addClass("round_button_throw")
  button3.style('font-size', '12px');

  inputNameLabel = createElement('p', 'name');
  inputNameLabel.position(width/2 - inputName.width*1.5, height/2-inputName.height/2);
  inputNameLabel.style('color', '#e33c5a');
  inputNameLabel.style('font-size', '16px');
  inputNameLabel.style('font-family', "'Press Start 2P', cursive");

  inputCodeLabel = createElement('p', 'ProlificID');
  inputCodeLabel.position(width/2 - inputName.width*1.5, height/2+ inputName.height/2*5);
  inputCodeLabel.style('color', '#e33c5a');
  inputCodeLabel.style('font-size', '16px');
  inputCodeLabel.style('font-family', "'Press Start 2P', cursive");


  inputPassLabel = createElement('p', '3 letters');
  inputPassLabel.position(width/2 - inputName.width*1.5, height/2+ inputName.height/2*2);
  inputPassLabel.style('color', '#e33c5a');
  inputPassLabel.style('font-size', '16px');
  inputPassLabel.style('font-family', "'Press Start 2P', cursive");


  inputExplain = createElement('p', 'Enter your Prolific ID and password(3 random letters) <br> to resume your game or start a new game. <br><br>If you are a new player,<br> you can enter any name <br>and password (3 random letters) and press New Player to start.<br><br>Enter activation code if you have any, <br> otherwise leave it blank.');
  inputExplain.position(width/2 - inputName.width*1.5, height/2-inputName.height/2*18);
  inputExplain.style('font-size', '15px');
  inputExplain.style('color', 'white');

 if(a == "repeat"){
    errorLabel = createElement('p', 'Name already exists, please input another name.');
    
  }else if(a == "wrong"){
    errorLabel = createElement('p', 'Not match. If you are a new player, please press New Player.');
  }else if(a == "pass"){
    errorLabel = createElement('p', 'Please input three letters.');
  }else if(a == "empty"){
    errorLabel = createElement('p', 'Please enter your name, password and your Prolific ID');
  }else{
    errorLabel = createElement('p', '');
  }
  errorLabel.position(width/4, height/2+ inputName.height/2*8);
  errorLabel.style('color', '#e33c5a');
  errorLabel.style('font-size', '16px');


  
}

function isThreeLetters(str) {
  return /^[a-zA-Z]{3}$/.test(str);
}

function register(){
  let loginName = inputName.value();
  let pass = inputPassword.value();
  let code = inputCode.value();
  console.log(code)
  console.log("register")
  loginRemove()
  if(code == ""){
    createLogIn("empty")
  }else{
  if(isThreeLetters(pass)){
 
  var xhr = new XMLHttpRequest();
  let url = "/pro/new?name="+loginName + "&pass=" + pass + "&code=" + code
  xhr.open("get", url, true);
  xhr.send(); 
  xhr.onreadystatechange = function () {
    if (xhr.status == 200 && xhr.readyState == 4) {
        if(xhr.responseText == "1"){
          lgname =  loginName 
          gameState = "game"
          if(!bgmLis[levels[level]["bgm"]].isLooping()){
            if(levels[level]["bgm"]!= 0){
              bgmLis[levels[level]["bgm"]-1].stop();
            }
            bgmLis[levels[level]["bgm"]].loop();
            bgmLis[levels[level]["bgm"]].setVolume(0.5);
          }
        }else{
          createLogIn("repeat")
        }
    }

} 
}else{
  createLogIn("pass")
} 
  }
}
function newGame(){
  logIn(1)
}
function loadGame(){
  logIn(0)
}
function logIn(b){

  let loginName = inputName.value();
  let pass = inputPassword.value();
  let code = inputCode.value();
  loginRemove()

  var xhr = new XMLHttpRequest();
  let url = "/pro/login?name="+loginName + "&pass=" + pass + "&code=" + code

  xhr.open("get", url, true);

  xhr.send(); 

  xhr.onreadystatechange = function () {
    if (xhr.status == 200 && xhr.readyState == 4) {
      if(xhr.responseText == "-1"){
        createLogIn("wrong")
        }else{
          if(b==0){
          level =  xhr.responseText}else{
            level =  0
          }
          lgname =  loginName 
          gameState = "game"
          if(!bgmLis[levels[level]["bgm"]].isLooping()){
            if(levels[level]["bgm"]!= 0){
              bgmLis[levels[level]["bgm"]-1].stop();
            }
            bgmLis[levels[level]["bgm"]].loop();
            bgmLis[levels[level]["bgm"]].setVolume(0.5);
          }
          goIntoLevel(level)
        }

    }
}

}

function loginRemove(){
  errorLabel.remove()
  inputName.remove()
  inputPassword.remove()
  inputCode.remove()
  inputNameLabel.remove()
  inputPassLabel.remove()
  inputCodeLabel.remove()
  button.remove()
  button2.remove()
  inputExplain.remove()
  button3.remove()
  
}

function drawMap(level) {
  let map = levels[level]["mapLis"]
  for (let i = 0, len = map["basic"].length; i < len; i++) {
    tileMap.drawMap(map["basic"][i], false) // the wall and the floor
  }
  tileMap.blockList = []
  tileMap.drawMap(map[state], true)
  for (let i = 0, len = map["basic2"].length; i < len; i++) {
    tileMap.drawMap(map["basic2"][i], false) // the wall and the floor
  }
  player.move(tileMap.blockList, tileMap.tileSize)
  player.hint = levels[level]["hint"]

}

function draw() {
if(gameState == "logIn"){

}

if(gameState == "notebook"){
  background(notebook)
  textSize(20);
  textWrap(WORD);
  let notebookLis = levels[level]["notebook"]
  let headLis = levels[level]["notehead"]
  let pageAll = notebookLis.length
  lastPageButton.hide();
  nextPageButton.hide();
  if(rightPage + 1 < pageAll){
    nextPageButton.show()
  }
  if(leftPage > 1){
    lastPageButton.show()
  }

  nextPageButton.mousePressed(() => {
    if(!soundDic["clue_page"].isPlaying()){
      soundDic["clue_page"].play()
    }
    leftPage = leftPage + 2
    rightPage = rightPage + 2
  });

  lastPageButton.mousePressed(() => {
    if(!soundDic["clue_page"].isPlaying()){
      soundDic["clue_page"].play()
    }
    leftPage = leftPage - 2
    rightPage = rightPage - 2
  });
  fill("red")
  text(headLis[leftPage], 50, 105, 170)
  text(headLis[rightPage], 280, 105, 170)
  fill("black")
  text(notebookLis[leftPage], 50, 140, 170);
  text(notebookLis[rightPage], 280, 140, 180);

}

if(gameState == "game"){

  lastPageButton.hide()
  nextPageButton.hide()
  leftPage = 0;
  rightPage = 1;
  background(0)
  drawMap(level)
  for (let i = 0, len = clueList.length; i < len; i++) {
    let ifCheck = player.ifClue(clueList[i])
    if(ifCheck){
      events = "checkClue"
      detail = ifCheck[1]
      index = ifCheck[0]
      record()
      detail = ""
      index = ""
    }
  }
  player.draw()
  // logAction(player.position)
  // console.log(actionLog)
  if(levels[level]["ifNight"]){
  fill(0,0,0,150);
  rect(0,0,width,height);}
}
}

//clues
function clueListGenerate(level) {
  player.trueClue = []
  let clueList = []
  let clues = levels[level]["clueList"]
  for (let i = 0, len = clues.length; i < len; i++) {
    let thisClue = new Clue(clues[i]["clueIdx"], clues[i]["imageSource"], clues[i]["clueOccupyList"], tileMap.tileSize, clues[i]["clueInfo"], clues[i]["clueDetail"], clues[i]["clueType"], soundDic[clues[i]["sound"]])
    clueList.push(thisClue)
    if (clues[i]["ifTrue"] == 1) {
      player.trueClue.push(thisClue)
    }
  }
  return clueList
}

function getSpecial(type) {
  let key = null
  for (let i = 0, len = clueList.length; i < len; i++) {
    if (clueList[i]["clueType"] == type) {
      key = clueList[i]
    }
  }
  return key
}

function keyPressed() {
  //console.log('pressing')
  //console.log(key)
  key_list.push(key)
  events = "keyPressed"
  if(gameState == "game"){
  //console.log("reocrd?")
  record()
  }
  
  
}

function keyReleased() {
  key_list.splice(key_list.indexOf(key), 1)
}

function showClue(a) {
  events = "showClue"
  record()
  let idx = a.slice(-1) - 1
  let thisClue = player.clueList[idx].clueDetail
  let clue = document.getElementById("clue")
  clue.innerHTML = thisClue
  let info = document.getElementById("interaction");
  info.innerHTML = "Do you want to throw this out of your backpack?";
  document.getElementById('throw').style.display = "block";
  document.getElementById('yes').style.display = "none";
  document.getElementById('no').style.display = "none";
  document.getElementById('A').style.display = "none";
  document.getElementById('B').style.display = "none";
  document.getElementById('C').style.display = "none";
  document.getElementById('openIt').style.display = "none";
  document.getElementById('enter').style.display = "none";
}

function throwItOut() {
  if(!soundDic["throw"].isPlaying()){
    soundDic["throw"].play()
  }
  events = "throwClue"
  record()
  let source = document.getElementById("clue").innerHTML
  let info = document.getElementById("interaction")
  info.innerHTML = ""

  document.getElementById('throw').style.display = "none"
  for (let i = 0, len = player.clueList.length; i < len; i++) {
    if (player.clueList[i].clueDetail === source) {
      //console.log(player.clueList[i])
      if (player.clueList[i].clueType === "key") {
        clue.innerHTML = "It may not be a good idea to throw it out."
      } else {
        player.clueList.splice(i, 1)
        let clue = document.getElementById("clue")
        clue.innerHTML = ""
      }
    }
  }

}

function keepIt(a) {

  if (a === "yes") {
    if(!soundDic["take"].isPlaying()){
      soundDic["take"].play()
    }
    events = "keepIt"
    record()
    if (player.clueList.length === player.backpack) {
      let info = document.getElementById("interaction");
      info.innerHTML = "Your backpack is full. You may consider dropping something to make room for this item.";
    } else {
      let info = document.getElementById("interaction");
      info.innerHTML = "";
      let source = document.getElementById("clue").innerHTML;
      for (let i = 0, len = clueList.length; i < len; i++) {
        if (clueList[i].clueDetail === source) {
          if (player.clueList.indexOf(clueList[i]) === -1) {
            player.clueList.push(clueList[i])
          }
        }
      }

    }
  } else {
    if(!soundDic["no"].isPlaying()){
      soundDic["no"].play()
    }
    let info = document.getElementById("interaction");
    info.innerHTML = "";
  }
  document.getElementById('yes').style.display = "none";
  document.getElementById('no').style.display = "none";
}


window.addEventListener("keydown", function(e) {
  if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
      e.preventDefault();
  }
//   if (event.keyCode === 13) {
//     // document.getElementById("pass_button").click();
//     document.getElementById("enter").click();

// }
}, false);


function database(a){
  let clue = document.getElementById("clue")
  clue.innerHTML = a
  if(!soundDic["clue_page"].isPlaying()){
    soundDic["clue_page"].play()
  }
}

function dialogue(a, button_num){
  if(!soundDic["click"].isPlaying()){
    soundDic["click"].play()
  }
  let clue = document.getElementById("clue")
  clue.innerHTML = a
  let next = document.getElementById("dialogue"+button_num)
  //console.log(next)
  if(next){
  next.style.display = "block";}
}

// The way to go to next level
function enterIt() {
  document.getElementById('enter').style.display = "none";
  this.goIntoNext()
}

function recordLevel(){
  var xhr = new XMLHttpRequest();
  let url = "/pro/levelUp?name="+lgname+ "&level=" + level
  //console.log(url)
  xhr.open("get", url, true);
  xhr.send(); 
}

function chestQ(a) {
  events = "Chest"
  record()
  let info = document.getElementById("interaction");
  info.innerHTML = "";
  document.getElementById('A').style.display = "none";
  document.getElementById('B').style.display = "none";
  document.getElementById('C').style.display = "none";
  let clue = document.getElementById("clue")
  player.ifAllCuleHasFound()
  if (a === levels[level]["key"]["True"] && player.ifAllClue) {
    clue.innerHTML = levels[level]["key"]["Right"]
    if (level == 0) {
      player.speed = player.speed + 2
      if(!soundDic["food"].isPlaying()){
        soundDic["food"].play()
      }
      // player.backpack = player.backpack + 2
      // player.drawBackpack()
      // console.log(player.backpack)
    }
    if (levels[level]["key"]["Type"] == "key") {
      let thisSound = levels[level]["key"]["sound"]
      if(!soundDic[thisSound].isPlaying()){
        soundDic[thisSound].play()
      }
      let key = getSpecial("key")
      player.clueList = [key]
      state = "unlocked"
    } else {
      this.goIntoNext()
    }
  } else {
    clue.innerHTML = levels[level]["key"]["Wrong"]
    if(!soundDic["no"].isPlaying()){
      soundDic["no"].play()
    }
  }
}

function goIntoNext() {
  events = "nextLevel"
  record()
   if(level == 22){
    window.location.href = 'https://illinois.qualtrics.com/jfe/form/SV_3yomVqNhQ94Z5LU';
  }
  level = int(level) + 1
    if(musicon){
  if(!bgmLis[levels[level]["bgm"]].isLooping()){
    if(levels[level]["bgm"]!= 0){
      bgmLis[levels[level]["bgm"]-1].stop();
    }
    bgmLis[levels[level]["bgm"]].loop();
    bgmLis[levels[level]["bgm"]].setVolume(0.5);
  }
}
  //console.log(level)
  recordLevel()
  //console.log(level)
  goIntoLevel(level)
}

function goIntoLevel(level){
  clueList = clueListGenerate(level)
  state = "solving"
  tileMap.blockList = []
  player.clueList = []
  if (levels[level]["position"]) {
    player.setPosition(levels[level]["position"])
  }
  let info = document.getElementById("interaction");
  info.innerHTML = "";
  tileMap.generateBlockList()
}

function openIt() {
  let info = document.getElementById("interaction");
  info.innerHTML = "";
  document.getElementById('openIt').style.display = "none";
  let clue = document.getElementById("clue")
  clue.innerHTML = "You can't open it at this point."
  for (let i = 0, len = player.clueList.length; i < len; i++) {
    if (player.clueList[i].clueType === "key") {
      clue.innerHTML = "Congratulations!";
      state = "solved"
      document.getElementById('enter').style.display = "block";
      if(!soundDic["openDoor"].isPlaying()){
        soundDic["openDoor"].play()
      }
    }
  }
}

function unlockHallway(){
  let hallway = getSpecial("hallway")
  hallway.clueType = "opendoor"

}

function password(){
  let password = document.getElementById("pass").value
  events = "enterPassword"
  detail = password
  record()
  player.ifAllCuleHasFound()
  if (password === levels[level]["password"] && player.ifAllClue) {
    if(!soundDic["openChest"].isPlaying()){
      soundDic["openChest"].play()
    }
    events = "chestUnlocked"
    record()
    let key = getSpecial("key")
    player.clueList = [key]
    state = "unlocked"
    unlockHallway()
    if(level == 7){
      clue.innerHTML = "You found the rest of the pages inside the safe. (With this, I will be able to go outside and convince the villagers.)"
    }else{
    clue.innerHTML = "You found a key inside the chest. (I should go back to the hallway and unlock the next door)."}

    
  }else{
    if(!soundDic["no"].isPlaying()){
      soundDic["no"].play()
    }
    let clue = document.getElementById("clue")
    clue.innerHTML = "Nothing happened. Your password is wrong or you didn't bring the right thing with you."
  }
}

function clearAll(){
  //console.log("ha")
  let info = document.getElementById("interaction");
  info.innerHTML = "";
  let clue = document.getElementById("clue");
  clue.innerHTML = "";
  player.hint = "I saw the villagers went back to their houses."
  hintnum = hintnum + 1
}

function record(){
  var $name = lgname;
	var $x = player.position.x;
	var $y = player.position.y;
  var $time = new Date().getTime();
  var $events = events;
  var $detail = detail;
  var $index= index;
  var $level = level;
  var $ifNew = ifNew;
	var xhr = new XMLHttpRequest();
xhr.open("get", `/pro/v1?name=${$name}&x=${$x}&y=${$y}&time=${$time}&events=${$events}&detail=${$detail}&index=${$index}&level=${$level}&ifNew=${$ifNew}`, true);
xhr.send();
}

function hoverNotebook(element) {
  element.style.content = 'url("images/openNote.png")';
}

function restoreOriginalStyle(element) {
  element.style.content = 'initial';
}

function gotoNotebook() {

  leftPage = 0;
  rightPage = 1;
  if(!soundDic["clue_page"].isPlaying()){
    soundDic["clue_page"].play()
  }
  if(gameState == "game"){
  events = "openNotebook"
    gameState = "notebook";
  }else if(gameState == "notebook"){
events = "closeNotebook"
      gameState = "game";
    }else{
      
    }

    record()
}

function musicOn(){
  if(musicon){
    musicon = false
    bgmLis[levels[level]["bgm"]].pause();
    let musicSrc = document.getElementById("music")
    musicSrc.innerHTML = "<img src='images/musicoff.png' width=70%></img>"
  }else{
    bgmLis[levels[level]["bgm"]].loop();
    musicon = true
    let musicSrc = document.getElementById("music")
    musicSrc.innerHTML = "<img src='images/musicon.png' width=70%></img>"
  }
}

