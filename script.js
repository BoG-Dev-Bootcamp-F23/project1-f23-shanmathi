const pokeContainer = document.querySelector(".pokemon-container");
const moveList = document.querySelector(".moves-list");
const infoList = document.querySelector(".info-list");
const nameContainer = document.querySelector(".poke-name");
const leftButton = document.getElementById("left-button");
const rightButton = document.getElementById("right-button");
const buttonInfo = document.getElementById("button-info");
const infoButton = document.getElementById("info-button");
const movesButton = document.getElementById("moves-button");
const output = document.getElementById("output");

let currentIndex = 1;
let currentData = null; // To store the current Pokémon data

async function displayPoke(i) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    currentData = await response.json();

    const pokeImg = document.createElement("img");
    pokeImg.src = currentData.sprites.front_default;
    pokeContainer.innerHTML = "";
    pokeContainer.appendChild(pokeImg);

    const pokeName = document.createElement("span");
    pokeName.textContent = currentData.name;
    nameContainer.innerHTML = "";
    nameContainer.appendChild(pokeName);

    const typeContainer = document.getElementById("type-bubbles");
    typeContainer.innerHTML = "";

    currentData.types.forEach(type => {
      const typeBubble = document.createElement('div');
      typeBubble.classList.add('type-bubble');
      typeBubble.textContent = type.type.name;
      typeContainer.appendChild(typeBubble);
    });
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
  }
}

async function displayMoves(i) {
  try {
    if (!currentData) {
      // Fetch Pokémon data only if it's not already fetched
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      currentData = await response.json();
    }

    moveList.innerHTML = '';

    currentData.moves.forEach(move => {
      const moveItem = document.createElement('li');
      moveItem.textContent = move.move.name;
      moveList.appendChild(moveItem);
    });
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
  }
}

// Function to update data and display when left or right button is clicked
function handleButtonClick(direction) {
  if (direction === 'right' && currentIndex < 1000) {
    currentIndex++;
  } else if (direction === 'left' && currentIndex > 1) {
    currentIndex--;
  }

  buttonInfo.textContent = currentIndex;
  currentData = null; // Reset currentData when changing Pokémon
  displayPoke(currentIndex);
  if (movesButton.classList.contains("green-button")) {
    displayMoves(currentIndex);
  }

}


rightButton.addEventListener("click", () => {
  handleButtonClick('right');
});

leftButton.addEventListener("click", () => {
  handleButtonClick('left');
});

infoButton.addEventListener("click", function() {
  output.textContent = "Info";
  infoButton.classList.add("green-button");
  movesButton.classList.remove("green-button");
  moveList.innerHTML = ''; // Clear moves list
});

movesButton.addEventListener("click", function() {
  output.textContent = "Moves";
  movesButton.classList.add("green-button");
  infoButton.classList.remove("green-button");
  displayMoves(currentIndex);
});

// Initial display
displayPoke(currentIndex);

