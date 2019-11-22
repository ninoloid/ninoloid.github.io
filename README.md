# **DOCUMENTATION**
Project ini menggunakan 2 file HTML, 2 file CSS, dan 4 file JS, dengan struktur sebagai berikut :

1. **index.html**
   * style.css
   * script.js
2. **memorygame.html**
   * memorygame.css
   * memorygame.js
   * mgShuffle.js
   * timer.js
---


### **memorygame.js**
Langkah awal, ambil semua element dengan class "game-cards" dan mereturn NodeList object (array-like object). Pada bagian ini, variable juga di deklarasikan.
```javascript
const cards = document.querySelectorAll('.game-cards')

let cardIsFlipped = false,
  locked = false,
  counter = 0,
  first, second;
```

**Fungsi flipCard()** akan memutar kartu yg di klik dan meng-assign kartu ke variable first & second
```javascript
function flipCard() {
  // locked dignakan untuk mengunci area permainan agar kartu tidak bisa di klik. sedangkan classList.toggle untuk menambahkan class "flip" pada element kartu yang di klik dan akan memutar kartu 180 derajat.
  if (locked) return;
  this.classList.toggle('flip')

  // jika cardIsFlipped false, maka assign kartu yg di klik ke variable first.
  if (!cardIsFlipped) {
    cardIsFlipped = true;
    first = this;

    // jika cardIsFlipped true, maka kartu pertama telah di klik dan assign kartu kedua yg di klik ke variable second.
  } else {
    if (this === first) return;
    cardIsFlipped = false;
    second = this;

    // Panggil fungsi isMatch untuk mengecek apakah kartu pertama sama dengan kartu kedua.
    isMatch();
  }
}
```

**Fungsi isMatch()** akan mencocokkan kartu pertama dan kartu kedua
```javascript
const isMatch = () => {
  let aCouple = first.dataset.image === second.dataset.image;
  aCouple ? (counter += 1, disableClick()) : reRotateCard();

  // jika kedua kartu yg di klik sama, jalankan fungsi disableClick(). jika tidak, jalankan fungsi reRotateCard().
```

**Fungsi disableClick()** akan membuat dua kartu yg cocok tidak bisa di klik, kemudian akan disembunyikan dari tampilan. Fungsi ini juga akan menghitung berapa pasang sisa kartu yang harus dibuka.
```javascript
const disableClick = () => {
  // penghitungan sisa pasang kartu sekaligus tampilkan hasilnya
  const score = document.getElementById('score');
  counter <= 10 ? score.innerHTML = 12 - counter + ' couples left' :
    score.innerHTML = 'a couple left'

// menghilangkan click event handler pada kartu yg telah cocok sehingga kartu tidak bisa di klik lagi.
  first.removeEventListener('click', flipCard);
  second.removeEventListener('click', flipCard);

// mengunci area permainan
  locked = true;

  // menyembunyikan kartu yang telah cocok dari area permainan.
  setTimeout(() => {
    first.classList.toggle('solved');
    second.classList.toggle('solved');
    locked = false;
  }, 1000)

// jika semua kartu telah berpasangan, maka jalankan fungsi congrats().
  if (counter === 12) {
    setTimeout(() => {
      congrats();
    }, 500)
  }
}
```

**Fungsi reRotateCard** akan menghapus class 'flip' di kedua kartu yg telah di klik. Kedua kartu akan kembali diputar ke posisi awal, tapi dia masih ngedetect event click untuk reassign flip class.
```javascript
const reRotateCard = () => {
  // kunci area permainan selama delay penghapusan class flip
  locked = true;
  setTimeout(() => {
    first.classList.remove('flip');
    second.classList.remove('flip');
    // kembalikan akses ke area permainan
    locked = false;
  }, 1000)
}
```

**Fungsi startGame()** akan membaca parameter yang dikirim dari halaman memorygame.html sesuai dengan level permainan yang dipilih. Fungsi ini juga akan memanggil fungsi lain untuk melakukan penghitungan mundur dan menampilkan hasilnya di halaman memorygame.html.
```javascript
const startGame = (menit) => {
  let timer = Number(menit) * 60,
    display = document.getElementById('timer');

// tampilan awal pada timer
  display.innerHTML = '00:10';

  // menambahkan class "flip" pada setiap element kartu untuk membuka semua kartu sebagai preview kartu sebelum permainan dimulai. Kartu akan dikembalikan ke posisi tertutup di fungsi startTimer().
  cards.forEach(card => card.classList.toggle('flip'));

// menambahkan click event handler pada setiap element kartu namun dengan delay 11,25 detik, supaya saat preview kartunya tidak bisa di klik
  setTimeout(() => {
    cards.forEach(card => {
      card.addEventListener('click', flipCard);
    });
  }, 11250)

  startTimer(timer, display);
};
```

**Fungsi showHide()** akan mengubah property display dari element html yg memiliki id "show". Fungsi ini mengubah display: none menjadi display: flex, vice versa.
```javascript
const showHide = () => {
  // element ber-id show adalah area permainan utama, yaitu kumpulan kartu. pada posisi awal area permainan, semua kartu tidak ditampilkan. fungsi ini akan dipanggil oleh fungsi startTimer() saat permainan dimulai, sehingga semua kartu akan tampil.
  let x = document.getElementById("show");
  if (x.style.display === "flex") {
    x.style.display = "none";
  } else {
    x.style.display = "flex";
  }
  // jalankan fungsi remove Element.
  removeElement()
}
```

**Fungsi removeElement()** akan menghapus tombol dari element html setelah permainan dimulai.
```javascript
const removeElement = () => {
  // hapus element tombol dari document
  let buttonLevel = document.getElementById("btnLevel"),
    howTo = document.getElementById("howto");
  buttonLevel.parentNode.removeChild(buttonLevel);
  howTo.parentNode.removeChild(howTo);
}
```

**Fungsi congrats()** menampilkan pilihan aoakah akan mengulang permainan atau tidak, setelah permainan berhasil diselesaikan.
```javascript
const congrats = () => {
  if (confirm(`Selamat, kamu memenangkan permainan!\nMulai permainan baru?`)) {
    // reload halaman permainan, atau buka index.html di tab yg sama
    location.reload();
  } else window.open("index.html", "_self")
}
```
---

### **timer.js**
**Fungsi startTimer()** akan memulai countdown dan menampilkan hasilnya ke halaman html.
```javascript
const startTimer = (duration, display) => {
  let timer = 9,
    counting = false,
    isPlaying = false,
    minutes, seconds;

  if (confirm("Mulai permainan?")) {
    // jika ya, jalankan fungsi showHide() untuk menampilkan kartu-kartu permainan, assign true ke counting agar timer berjalan.
    showHide();
    counting = true;
    // jika tidak, buka index.html di tab yg sama.
  } else window.open("index.html", "_self")

  if (counting === true) {
    setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

// untuk menampilkan timer pada halaman. parameter display akan di pass oleh memorygame.js. Katanya textContent lebih cepat daripada innerHTML
      display.textContent = minutes + ":" + seconds;
      timer--;

      if (timer <= 0 && !isPlaying) {
        timer = duration;
        isPlaying = true;
        // sebelum permainan, akan ditampilkan preview kartu di layar selama 10 detik (9 detik + 1 detik delay). setelah 10 detik tsb habis, countdown akan dimulai sesuai dengan parameter duration yang di pass dari memorygame.html melalui memorygame.js
        setTimeout(() => cards.forEach(card => card.classList.remove('flip')), 1000);
      }

      if (minutes == 0 && seconds == 0 && isPlaying) {
        isPlaying = false;
        // jika ya, reload halaman, mulai game dengan kartu otomatis teracak kembali. jika tidak, buka index.html di tab yg sama.
        if (confirm("Maaf, kamu gagal. Mulai dari awal?")) {
          location.reload()
          timer = duration;
        } else window.open("index.html", "_self")
      }
    }, 1000);
  }
}
```
---

### **mgShuffle.js**
**Fungsi shuffle()** akan menghapus element kartu, memanggil fungsi shuffleArray() untuk mengacak array yg berisi semua element kartu, lalu menampilkan kembali element kartu ke area permainan.
```javascript
const shuffle = () => {
  // assign elementsArray dengan semua class "game-cards" yg terdapat pada section ber-id "memory-game".
  let memoryGame = document.getElementById("memory-game");
  let elementsArray = Array.from(memoryGame.getElementsByClassName('game-cards'));

    // hapus child element kartu dari memorygame.
  elementsArray.forEach(element => memoryGame.removeChild(element));
  // panggil fungsi shuffleArray untuk mengacak array dari element kartu.
  shuffleArray(elementsArray);
  // tambahkan kembali semua child element kartu yg telah diacak ke "memoryGame"
  elementsArray.forEach(element => memoryGame.appendChild(element))
}
```

**Function shuffleArray()** akan mengacak urutan array secara random dengan bantuan built-in function Math.random
```javascript
const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    // swap value
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array;
}
```