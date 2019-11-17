const cards = document.querySelectorAll('.game-cards')

let cardIsFlipped = false,
  locked = false,
  counter = 0,
  first, second;

function flipCard() {
  if (locked) return;
  // untuk mencegah isMatch = true saat 1 kartu di klik 2 kali karena dataset imagenya dianggap sama
  if (this === first) return;


  this.classList.toggle('flip')

  // klik kartu pertama
  if (!cardIsFlipped) {
    cardIsFlipped = true;
    first = this;

    // klik kartu kedua
  } else {
    cardIsFlipped = false;
    second = this;
    isMatch();
  }
}

// cek kartunya sama atau engga
const isMatch = () => {
  // kalau sama, event listener untuk flip kartu dihapus, jd kartu gaakan keputer lg meskipun di klik
  // kalau beda, class 'flip' di kartu akan dihapus, dia kembali ke posisi awal tapi dia masih ngedetect event click buat reassign flip class 
  let aCouple = first.dataset.image === second.dataset.image;
  aCouple ? (counter += 1, disableClick()) : reRotateCard();

  // if (aCouple) {
  //   counter += 1;
  //   disableClick();
  // } else reRotateCard();
}

const disableClick = () => {
  first.removeEventListener('click', flipCard);
  second.removeEventListener('click', flipCard);
  console.log(counter)
  if (counter === 12) {
    setTimeout(() => {
      congrats();
    }, 500)
  }
}

const reRotateCard = () => {
  locked = true;
  setTimeout(() => {
    first.classList.remove('flip');
    second.classList.remove('flip');
    locked = false;
  }, 1000)
}

cards.forEach(card => card.addEventListener('click', flipCard))

const startGame = (menit) => {
  var timer = Number(menit) * 60,
    display = document.querySelector('#timer');
  startTimer(timer, display);
};

const myFunction = () => {
  var x = document.getElementById("show");
  if (x.style.display === "flex") {
    x.style.display = "none";
  } else {
    x.style.display = "flex";
  }
  removeElement()
}

const removeElement = () => {
  // hapus element dari document
  var element = document.getElementById("btnLevel");
  element.parentNode.removeChild(element);
}

const congrats = () => {
  if (confirm(`Selamat, kamu memenangkan permainan!\nMulai permainan baru?`)) {
    location.reload();
  } else window.open("index.html", "_self")
}

/*
STRUKTUR JAVASCRIPT

*/