const shuffle = () => {
  let memoryGame = document.getElementById("memory-game");
  var elementsArray = Array.from(memoryGame.getElementsByClassName('game-cards'));
  // sama dengan
  // var elementsArray = Array.prototype.slice.call(memoryGame.getElementsByClassName('game-cards'));

  elementsArray.forEach(function (element) {
    memoryGame.removeChild(element);
  })
  shuffleArray(elementsArray);
  elementsArray.forEach(function (element) {
    memoryGame.appendChild(element);
  })
}

const shuffleArray = array => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array;
}