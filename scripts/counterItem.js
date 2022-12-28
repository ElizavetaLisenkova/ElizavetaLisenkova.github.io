function addItem() {
    let clicks = parseInt(document.getElementById("count").innerText);
  clicks += 1;
  document.getElementById("count").innerHTML = clicks;
};

function removeItem() {
    let clicks = parseInt(document.getElementById("count").innerText);
  clicks -= 1;
  document.getElementById("count").innerHTML = clicks;
};