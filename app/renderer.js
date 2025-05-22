const btn = document.getElementById("start");

btn.addEventListener("click", () => {
  if (btn.innerHTML == "connect") {
    window.sockAPI.sockConn();
    btn.innerHTML = "disconnect";
  } else {
    window.sockAPI.sockDiss();
    btn.innerHTML = "connect";
  }
});
