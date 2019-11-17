function startTimer(duration, display) {
  let timer = duration,
    counting = false,
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

      if (--timer < 0) {
        timer = duration;
      }

      if (minutes == 0 && seconds == 0) {
        if (confirm("Maaf, kamu gagal. Mulai dari awal?")) {
          location.reload()
        } else window.open("index.html", "_self")
      }
    }, 1000);
  }
}