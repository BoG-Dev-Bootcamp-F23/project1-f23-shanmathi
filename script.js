const pokeContainer = document.querySelector(".pokemon-container");
const moveList = document.querySelector(".moves-list");
const infoList = document.querySelector(".info-list");
const nameContainer = document.querySelector(".poke-name"); // Assuming you have a container for the name
const leftButton = document.getElementById("left-button");
const rightButton = document.getElementById("right-button");
const buttonInfo = document.getElementById("button-info");
const infoButton = document.getElementById("info-button");
const movesButton = document.getElementById("moves-button");
const output = document.getElementById("output");


let currentIndex = 1;

async function displayPoke(i) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data = await response.json();

    const pokeImg = document.createElement("img");
    pokeImg.src = data.sprites.front_default; 
    pokeContainer.innerHTML = "";
    pokeContainer.appendChild(pokeImg);

    const pokeName = document.createElement("span"); // Create a <span> for the name
    pokeName.textContent = data.name; // Set the text content to display the name
    nameContainer.innerHTML = "";
    nameContainer.appendChild(pokeName);

    moveList.innerHTML = '';

    // Loop through the moves and create a list item for each move
    data.moves.forEach(move => {
      const moveItem = document.createElement('li');
      moveItem.textContent = move.move.name;
      moveList.appendChild(moveItem);
    });
    
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
  }
}
displayPoke(currentIndex);

// Event listener for the right button
rightButton.addEventListener("click", () => {
  if (currentIndex < 1000) {
    currentIndex++;
    buttonInfo.textContent = currentIndex;
    displayPoke(currentIndex);
  }
});

// Event listener for the left button
leftButton.addEventListener("click", () => {
  if (currentIndex > 1) {
    currentIndex--;
    buttonInfo.textContent = currentIndex;
    displayPoke(currentIndex);
  }
});


infoButton.addEventListener("click", function() {
  output.textContent = "Info";
  infoButton.classList.toggle("green-button");
  movesButton.classList.remove("green-button");

});

movesButton.addEventListener("click", function() {
  output.textContent = "Moves";
  movesButton.classList.toggle("green-button");
  infoButton.classList.remove("green-button");

});
