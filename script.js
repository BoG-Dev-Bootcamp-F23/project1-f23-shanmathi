const pokeContainer = document.querySelector(".pokemon-container");
const moveList = document.querySelector(".moves-list");
const infoList = document.querySelector(".info-list");
const nameContainer = document.querySelector(".poke-name");
const leftButton = document.getElementById("left-button");
const rightButton = document.getElementById("right-button");
const infoButton = document.getElementById("info-button");
const movesButton = document.getElementById("moves-button");
const output = document.getElementById("output");
const statsList = document.querySelectorAll(".stat");

function getTypeBackgroundColor(typeName) {
  switch (typeName) {
    case 'normal':
      return '#A8A77A';
    case 'fire':
      return '#EE8130';
    case 'water':
      return '#6390F0';
    case 'electric':
      return '#F7D02C';
    case 'grass':
      return '#7AC74C';
    case 'ice':
      return '#96D9D6';
    case 'fighting':
      return '#C22E28';
    case 'poison':
      return '#A33EA1';
    case 'ground':
      return '#E2BF65';
    case 'flying':
      return '#A98FF3';
    case 'psychic':
      return '#F95587';
    case 'bug':
      return '#A6B91A';
    case 'rock':
      return '#B6A136';
    case 'ghost':
      return '#735797';
    case 'dragon':
      return '#6F35FC';
    case 'dark':
      return '#705746';
    case 'steel':
      return '#B7B7CE';
    case 'fairy':
      return '#D685AD';
    default:
      return '#000000';
  }
}

let currentIndex = 1;
let currentData = null; 

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
      typeBubble.textContent = type.type.name;
      typeBubble.style.backgroundColor = getTypeBackgroundColor(type.type.name);
      typeBubble.classList.add('type-bubble');
      typeContainer.appendChild(typeBubble);
    });
    
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
  }
}




async function displayMoves(i) {
  try {
    if (!currentData) {
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

async function displayInfo(i) {
  try {
    if (!currentData) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      currentData = await response.json();
    }

    const infoList = document.querySelector(".info-list");
    infoList.innerHTML = ''; 

    const height = currentData.height / 10; 
    const weight = currentData.weight / 10; 
    const pokemonStats = currentData.stats;

    const pokemonStatData = document.createElement("div");
    pokemonStatData.innerHTML = `
      <p>height: ${height}m</p>
      <p>weight: ${weight}kg</p>
      <p>hp: ${pokemonStats[0]["base_stat"]}</p>
      <p>attack: ${pokemonStats[1]["base_stat"]}</p>
      <p>defense: ${pokemonStats[2]["base_stat"]}</p>
      <p>special-attack: ${pokemonStats[3]["base_stat"]}</p>
      <p>special-defense: ${pokemonStats[4]["base_stat"]}</p>
      <p>speed: ${pokemonStats[5]["base_stat"]}</p>
    `;

    infoList.appendChild(pokemonStatData);
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
  }
}

function handleButtonClick(direction) {
  if (direction === 'right' && currentIndex < 1000) {
    currentIndex++;
  } else if (direction === 'left' && currentIndex > 1) {
    currentIndex--;
  }

  currentData = null; 
  displayPoke(currentIndex);

  if (movesButton.classList.contains("green-button")) {
    displayMoves(currentIndex);
  }
  if (infoButton.classList.contains("green-button")) {
    displayInfo(currentIndex);
  }


}

window.addEventListener("load", function() {
  displayInfo(currentIndex);
  output.textContent = "Info";
  infoButton.classList.add("green-button");
  movesButton.classList.remove("green-button");

});
rightButton.addEventListener("click", () => {
  handleButtonClick('right');
  console.log("Right button clicked");

});

leftButton.addEventListener("click", () => {
  handleButtonClick('left');
  console.log("l;eft button clicked");

});

infoButton.addEventListener("click", function() {
  output.textContent = "Info";
  infoButton.classList.add("green-button");
  movesButton.classList.remove("green-button");
  moveList.innerHTML = ''; 
  displayInfo(currentIndex);

});

movesButton.addEventListener("click", function() {
  output.textContent = "Moves";
  movesButton.classList.add("green-button");
  infoButton.classList.remove("green-button");
  displayMoves(currentIndex);
  infoList.innerHTML = ''; 

});

displayPoke(currentIndex);

