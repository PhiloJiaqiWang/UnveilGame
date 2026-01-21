var textList = ["Regaining consciousness, I wave away the Mosaic in my mind, and see myself in a very strange room.", "YOU -> I stand up, barely, looking around, wondering one thing --- where is this place?", "YOU -> And most importantly, who am I...", "YOU -> I see a backpack next to the bed, it might be useful, I think to myself. I take the backpack.", "YOU -> Now I feel extremely hungry. Maybe I should find something to eat first so I can survive before figuring it out and unveiling what is behind the mist in my brain."]
var delay = 40;
var elem = document.getElementById("intro");
var currentIndex = 0;
var button;

function createButton(index) {
  var button = document.createElement("span");
  button.className = "start";
  button.textContent = "YOU -> ";
  button.onclick = function () {
    handleButtonClick(index);
  };
  return button;
}

function handleButtonClick(index) {
  elem.removeChild(button);
  addTextByDelay(index, textList[index], elem, delay);
  // Remove the event listener after the first click
  button.removeEventListener("click", handleButtonClick);
}

function addTextByDelay(i, text, elem, delay) {
  if (text.length > 0) {
    elem.append(text[0]);
    setTimeout(function () {
      addTextByDelay(i, text.slice(1), elem, delay);
    }, delay);
  } else {
    if (i < textList.length - 1) {
      elem.appendChild(document.createElement("br")); // Add line break
      button = createButton(i + 1);
      elem.appendChild(button);
    } else {
      elem.innerHTML +=
        "<br /> <span class='start' onclick=\"start()\">START -> </span>";
    }
  }
}

// Initial call
addTextByDelay(0, textList[0], elem, delay);

function start(){
  window.location.href='game.html';
}




