const cards = document.querySelectorAll('.game-cards')

let cardIsFlipped = false,
  locked = false,
  counter = 0,
  first, second;

function flipCard() {
  if (locked) return;
  // untuk mencegah isMatch true saat 1 kartu di klik 2 kali karena dataset imagenya dianggap sama
  // if (this === first) return; dipindahin ke bawah saat kartu kedua di klik
  // console.log(this)
  // global object this merujuk ke kartu yg di klik


  this.classList.toggle('flip')

  // klik kartu pertama
  if (!cardIsFlipped) {
    cardIsFlipped = true;
    first = this;

    // klik kartu kedua
  } else {
    if (this === first) return;
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
  const score = document.getElementById('score');
  counter <= 10 ? score.innerHTML = 12 - counter + ' couples left' :
    score.innerHTML = 'a couple left'

  first.removeEventListener('click', flipCard);
  second.removeEventListener('click', flipCard);
  // console.log(counter)
  locked = true;
  setTimeout(() => {
    first.classList.toggle('solved');
    second.classList.toggle('solved');
    locked = false;
  }, 1000)

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


const startGame = (menit) => {
  let timer = Number(menit) * 60,
    display = document.getElementById('timer');
  // atau bisa juga pake Query Selector untuk ngambil element dgn id 'timer' pertama 
  // display = document.querySelector('#timer');

  display.innerHTML = '00:10';
  cards.forEach(card => card.classList.toggle('flip'));
  // sama dengan
  // for (let i = 0; i < cards.length; i++) {
  //   cards[i].classList.toggle('flip');
  // }

  setTimeout(() => {
    // console.log(cards);
    cards.forEach(card => {
      // card.classList.remove('flip'); dipindahin ke timer.js
      card.addEventListener('click', flipCard);
    });
    // console.log(cards);
  }, 11250)

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