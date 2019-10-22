// tombol kanan atas
function myFunction() {
  var x = document.getElementById("show");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

// DOM elements
const time = document.getElementById('time'),
  greeting = document.getElementById('greeting');

// tampilkan jam
function showJam() {
  let today = new Date(),
    jam = today.getHours(),
    menit = today.getMinutes(),
    detik = today.getSeconds();

  // AM atau PM
  const ampm = jam >= 12 ? 'PM' : 'AM';

  // ubah ke format 12 jam
  jam = jam % 12 || 12;

  // output
  time.innerHTML = `${jam}<span>:</span>${addNol(menit)}<span>:</span>${addNol(detik)}`;

  setTimeout(showJam, 1000);
}

// tambah 0 di menit dan detik
const addNol = n => (parseInt(n, 10) < 10 ? '0' : '') + n;

// set greeting
const setGreeting = () => {
  let today = new Date(),
    jam = today.getHours();

  if (jam < 12) {
    greeting.innerHTML = 'Selamat Pagi';
  } else if (jam < 18) {
    greeting.innerHTML = 'Selamat Siang';
  } else {
    greeting.innerHTML = 'Selamat Malam';
  }
}

// jalankan
showJam();
setGreeting();