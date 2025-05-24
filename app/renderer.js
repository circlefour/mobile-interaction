const btn = document.getElementById("start");

btn.addEventListener("click", () => {
  if (btn.innerHTML == "𝔠𝔬𝔫𝔫𝔢𝔠𝔱") {
    window.sockAPI.sockConn();
    btn.innerHTML = "𝔡𝔦𝔰𝔠𝔬𝔫𝔫𝔢𝔠𝔱";
  } else {
    window.sockAPI.sockDiss();
    btn.innerHTML = "𝔠𝔬𝔫𝔫𝔢𝔠𝔱";
  }
});
