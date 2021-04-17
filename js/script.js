let numberOfRows = 16;
let numberOfColumns = 16;

const containerDiv = document.querySelector(".container");

containerDiv.style.gridTemplateRows = "repeat(" + numberOfRows + ", 1fr)";
containerDiv.style.gridTemplateColumns = "repeat(" + numberOfColumns + ", 1fr)";

for (let i = 0; i < 16*16; i++) {
  const pixelDiv = document.createElement("div");
  pixelDiv.classList.add("pixel");
  pixelDiv.classList.add("inactive");
  pixelDiv.textContent = "";

  containerDiv.appendChild(pixelDiv);
}

const pixels = Array.from(document.querySelectorAll('.pixel'));

pixels.forEach(pixel => {
    pixel.addEventListener('mouseenter',lightPixel); // mouseEnter
    pixel.addEventListener('mouseout',dimPixel);
})

function lightPixel(e) {
    e.target.classList.remove('inactive');
    e.target.classList.add('active');
}

function dimPixel(e) {
    e.target.classList.remove('active');
    e.target.classList.add('inactive');
}

const resetButton = document.que