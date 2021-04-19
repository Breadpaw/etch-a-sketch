// init with 16 per row
addPixels(16);

const resetButton = document.querySelector(".reset-button");

resetButton.addEventListener("click", resetSketch);

function addPixels(squaresPerSide) {
  let totalSquares = squaresPerSide * squaresPerSide;

  const containerDiv = document.querySelector(".container");

  containerDiv.style.gridTemplateRows = "repeat(" + squaresPerSide + ", 1fr)";
  containerDiv.style.gridTemplateColumns = "repeat(" + squaresPerSide + ", 1fr)";

  for (let i = 0; i < totalSquares; i++) {
    const pixelDiv = document.createElement("div");
    pixelDiv.classList.add("pixel");
    pixelDiv.classList.add("inactive");
    pixelDiv.textContent = "";

    containerDiv.appendChild(pixelDiv);
  }

  const pixels = Array.from(document.querySelectorAll(".pixel"));

  pixels.forEach((pixel) => {
    pixel.addEventListener("mouseenter", lightPixel);
  });
}

function lightPixel(e) {
  // const radioSelected = document.querySelector("input[type=\"radio\"");
  const radioList = Array.from(document.querySelectorAll('input[type="radio"'));

  radioList.forEach((option) => {
    if (option.checked) {
      const optionValue = option.value;

      switch (optionValue) {
        case "standard":
          lightPixelStandard(e);
          break;
        case "random":
          lightPixelRandom(e);
          break;
        case "grayscale":
          lightPixelGrayscale(e);
          break;
      }
    }
  });
}

function lightPixelStandard(e) {
  // Other functions might assign a style locally. Remove this.
  e.target.style.backgroundColor = "";

  e.target.classList.remove("inactive");
  e.target.classList.add("active");
}

function lightPixelRandom(e) {
  e.target.classList.remove("inactive");
  e.target.classList.add("active");

  const randomR = Math.random() * 255;
  const randomG = Math.random() * 255;
  const randomB = Math.random() * 255;

  e.target.style.backgroundColor = `rgb(${randomR} ,${randomG}, ${randomB})`;
}

function lightPixelGrayscale(e) {
  // Random function might assign an RGB value as BG with 1.0 opacity (OR no backgroundColor is set).
  // rgba(0,0,0,1.0) does not exist, becomes rgb(0,0,0) so filter that, too.

  if (
    (e.target.style.backgroundColor.substring(0, 4) === "rgb(" &&
      e.target.style.backgroundColor.replaceAll(" ", "") !== "rgb(0,0,0)") ||
    e.target.style.backgroundColor === ""
  ) {
    e.target.style.backgroundColor = "rgba(0,0,0,0.1)";
  } else {
    const opacity = parseFloat(e.target.style.backgroundColor.substring(14, 17));

    if (opacity !== 1) {
      const newBackgroundColor = "rgba(0,0,0," + (opacity + 0.1) + ")";

      e.target.style.backgroundColor = newBackgroundColor;
    }
  }
}

function removePixels() {
  const pixels = Array.from(document.querySelectorAll(".pixel"));
  pixels.forEach((pixel) => pixel.parentNode.removeChild(pixel));
}

function resetSketch(e) {
  const squaresPerSide = prompt("How many squares do you want per side?");

  if (squaresPerSide > 64) {
    removePixels();
    addPixels(64);
    alert("The maximum squares per side is 64");
  } else {
    removePixels();
    addPixels(squaresPerSide);
  }
}
