class Clue {
  // the clueOccupyList = startX(n), startY(n), width, height]
  //this.location = [x, maxX, y, maxY]
  constructor(clueIdx, imageSource, clueOccupyList, tileSize, clueInfo, clueDetail, clueType, sound) {
    this.clueIdx = clueIdx
    this.imageSource = imageSource
    this.clueOccupyList = clueOccupyList
    this.tileSize = tileSize
    this.clueInfo = clueInfo
    this.clueDetail = clueDetail
    this.ifCollide = false
    this.ifActivated = false
    this.clueType = clueType
    this.location = [clueOccupyList[0] * tileSize, clueOccupyList[0] * tileSize + clueOccupyList[2] * tileSize, clueOccupyList[1] * tileSize, clueOccupyList[1] * tileSize + clueOccupyList[3] * tileSize]
    this.sound = sound
  }


  showInfo() {
    if (key_list.indexOf(" ") !== -1) {
       console.log(this.clueType)
       if(!this.sound.isPlaying()){
        this.sound.play()
        }
       
      if (this.clueType === "clue") {
        let info = document.getElementById("interaction")
        info.innerHTML = this.clueInfo + "<br>Do you want to keep it?"

        document.getElementById('yes').style.display = "block"
        document.getElementById('no').style.display = "block"
        let clue = document.getElementById("clue")
        clue.innerHTML = this.clueDetail

      }

      if (this.clueType === "plain") {
        let info = document.getElementById("interaction");
        info.innerHTML = this.clueInfo
        let clue = document.getElementById("clue")
        clue.innerHTML = this.clueDetail
      }

      if (this.clueType === "opendoor") {
        let info = document.getElementById("interaction");
        info.innerHTML = this.clueInfo
    document.getElementById('enter').style.display = "block";
      }
      if (this.clueType === "hallway") {
        let info = document.getElementById("interaction");
        info.innerHTML = this.clueInfo;
        let clue = document.getElementById("clue");
        clue.innerHTML = this.clueDetail;
      }
      if (this.clueType === "database") {
        let info = document.getElementById("interaction");
        info.innerHTML = this.clueInfo;
        for (const key in this.clueDetail) {
          if (this.clueDetail.hasOwnProperty(key)) {
            const value = this.clueDetail[key];
            info.innerHTML += "<br><input class=\"database_button\" style=\"display:block;\" id=\"enter\" type=\"button\" value=" + key + " onclick=\"database('" + value + "')\"><br>"
          }
        }
      }

      if (this.clueType === "dialogue") {
        let info = document.getElementById("interaction");
        info.innerHTML = this.clueInfo;
        let num = 0
        let total = Object.keys(this.clueDetail).length
        console.log(total)
        for (const key in this.clueDetail) {
          if (this.clueDetail.hasOwnProperty(key)) {
            let thisID = "dialogue" + num
            num = num+1
            const value = this.clueDetail[key];
            if(num == 1){
              info.innerHTML += "<br><input class=\"database_button\" style=\"display:block;\" id=" + thisID + " type=\"button\" value=" + key + " onclick=\"dialogue('" + value+"',"+ num+ ")\"><br>"

            }else if(num == total){
              info.innerHTML += "<br><input class=\"database_button\" style=\"display:none;\" id=" + "dialogue"+ (num-1) + " type=\"button\" value=" + key + " onclick=" + value+"><br>"
            }
            else{
              info.innerHTML += "<br><input class=\"database_button\" style=\"display:none;\" id=" + thisID + " type=\"button\" value=" + key + " onclick=\"dialogue('" + value+"',"+ num+ ")\"><br>"
            }
          }
        }
      }

      if (this.clueType === "passwordchest") {
        let info = document.getElementById("interaction");
        info.innerHTML = this.clueInfo;
        info.innerHTML += "<br><input class=\"pass\" style=\"display:block;\" id=\"pass\" type=\"text\" \"><br><input class=\"pass_button\" style=\"display:block;\" id=\"pass_button\" value=\"->\" type=\"button\" onclick = \"password()\" \">"

      
      let clue = document.getElementById("clue");
      clue.innerHTML = this.clueDetail;
    }

    if (this.clueType === "chest") {
      let info = document.getElementById("interaction");
      info.innerHTML = this.clueInfo
      let clue = document.getElementById("clue")
      clue.innerHTML = this.clueDetail
      document.getElementById('A').style.display = "block";
      document.getElementById('B').style.display = "block";
      document.getElementById('C').style.display = "block";
    }

    if (this.clueType === "door") {
      let info = document.getElementById("interaction");
      info.innerHTML = this.clueInfo;

      document.getElementById('openIt').style.display = "block";

    }
    return [this.clueIdx, this.clueType]
  }
   return false
}



}