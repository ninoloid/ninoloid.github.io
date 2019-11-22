function startTimer(duration, display) {
  let timer = 9,
    counting = false,
    isPlaying = false,
    minutes, seconds;

  if (confirm("Mulai permainan?")) {
    myFunction()
    counting = true;
  } else window.open("index.html", "_self")

  if (counting === true) {
    setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      timer--;
      // if (--timer < 0) {
      //   timer = duration;
      // }

      if (timer <= 0 && !isPlaying) {
        timer = duration;
        isPlaying = true;
        setTimeout(() => {
          cards.forEach(card => {
            card.classList.remove('flip');
          });
        }, 1000)
      }

      if (minutes == 0 && seconds == 0 && isPlaying) {
        isPlaying = false;
        if (confirm("Maaf, kamu gagal. Mulai dari awal?")) {
          location.reload()
          timer = duration;
        } else window.open("index.html", "_self")
      }
    }, 1000);
  }
}

//       if (timer >= 0) {
//         timer--;
//       } else if (timer === -1) {
//         counting = false;
//         if (confirm("Maaf, kamu gagal. Mulai dari awal?")) {
//           location.reload()
//           timer = duration;
//         } else window.open("index.html", "_self")
//       }
//     }, 1000);
//   }
// }

// if (--timer < 0) {
//   if (confirm("Maaf, kamu gagal. Mulai dari awal?")) {
//     location.reload()
//     timer = duration;
//   } else window.open("index.html", "_self")
// }
// }, 1000);
// }
// }