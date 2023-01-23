import { createMarkUp } from "./detail-card.js";
const poke_container = document.getElementById("poke-container");
const searchBar = document.querySelector(".search");
const header = document.querySelector(".header");
// menu
const menuBtn = document.querySelector(".menuBtn");
const menuBar = document.querySelector(".menuBar");
//
const loadMoreBtn = document.querySelector(".loadMore");
const spinner = document.querySelector(".spinner");
const pokemon_count = 10;
const colors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

// get number of pokemon datas
const allPokeData = async function (number, curNum = 1) {
  const datas = [];
  for (let i = curNum; i < number + 1; i++) {
    const data = await getPokeData(i);
    datas.push(data);
  }
  return datas;
};
// get one pokemon data by id
const getPokeData = async function (id) {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data) throw new Error("no pokemon found");
    // console.log(data);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const format = function (str) {
  return str[0].toUpperCase() + str.slice(1);
};

// poke card template
const createPokeCard = function (data) {
  const id = data.id < 100 ? data.id.toString().padStart(3, "0") : data.id;
  const mainType = data.types[0].type.name;

  const name = format(data.name);
  const formatType = function (types, number) {
    return format(types[number].type.name);
  };

  return `
    <div class="pokemon" data-id=${data.id} style="background-color:${colors[mainType]}">
      <div class="img-container">
        <img
          
          src="https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png"
          alt=""
        />
      </div>
      
    
      <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">${formatType(data.types, 0)}</small>
        ${data.types[1] ? `<small class="type">/ ${formatType(data.types, 1)}</small>` : ""}
      </div>
    </div>
  `;
};

// render main page
const render = async function (number, curNum = 1) {
  try {
    const datas = await allPokeData(number, curNum);
    if (!datas) throw new Error("did not get data");
    let template = [];
    await datas.forEach((data) => {
      template.push(createPokeCard(data));
    });
    const markup = template.join("");
    // console.log(markup);
    poke_container.insertAdjacentHTML("beforeend", markup);
  } catch (error) {
    console.log(error);
  }
};

// update more datas
let dexNum = pokemon_count + 1;

const updateTen = async function () {
  try {
    await render(dexNum + 20, dexNum);
    dexNum += 21;
  } catch (error) {
    console.log(error);
  }
};

// loading spinner
const renderSpinner = async function (handler) {
  spinner.classList.remove("none");
  await handler();
  spinner.classList.add("none");
};

const cardBack = function () {
  const html = `<div class="card-pad" id="card-pad"></div>`;
  header.insertAdjacentHTML("afterend", html);
};

// listen details card
const pokeCard = async function (id) {
  try {
    const data = await getPokeData(id);
    const data2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
    const species = await data2.json();
    let text = species.flavor_text_entries.find((el) => {
      return el.language.name === "en";
    })?.flavor_text;
    if (text) {
      text = text.includes("\f") ? text.replace("\f", " ") : text;
    } else {
      text = "No descriptions yet";
    }

    data.name = format(data.name);
    const html = createMarkUp(data, text);
    poke_container.insertAdjacentHTML("beforebegin", html);

    // close card function
    const cardBack = document.querySelector("#card-pad");
    const card = document.querySelector("#cards");
    closeCard(cardBack, card);

    // change card func
    const prev = document.querySelector(".prevCard");
    const next = document.querySelector(".nextCard");

    const changeCard = function (element, id) {
      element.addEventListener("click", function () {
        // id need to be valid to continue
        if (id < 1 || id > 1008) return;
        // only re-render the card, not background
        card.remove();
        pokeCard(id);
      });
    };
    changeCard(prev, +id - 1);
    changeCard(next, +id + 1);
    //
  } catch (error) {
    console.log(error);
  }
};

// close card
const closeCard = function (element1, element2) {
  element1.addEventListener("click", () => {
    element1.remove();
    element2.remove();
  });
};

// open menu
const menuFunc = function () {
  menuBtn.addEventListener("click", function () {
    if (menuBar.classList.length > 1) {
      menuBar.classList.remove("none");
      menuBtn.innerHTML = "Menu ▿";
      console.log();
    } else {
      menuBar.classList.add("none");
      menuBtn.innerHTML = "Menu ▹";
    }
  });
};

// render main page
const init = async function () {
  render(pokemon_count);
  spinner.classList.add("none");
  loadMoreBtn.addEventListener("click", () => {
    renderSpinner(updateTen);
  });
  let id;

  // click openCard();
  poke_container.addEventListener("click", function (e) {
    const clickCard = e.target.closest(".pokemon");
    if (!clickCard) return;
    id = clickCard.dataset["id"];
    cardBack();
    pokeCard(id);
  });

  // listen menu button
  menuFunc();

  // listen search result
  searchBar.addEventListener("keydown", function (e) {
    if (e.keyCode !== 13) return;
    const id = +searchBar.value;
    if (!id || typeof id !== "number" || id > 1008 || id < 1) {
      alert("please enter a number between 1-1008");
      searchBar.value = "";
    }
    cardBack();
    pokeCard(id);
    searchBar.value = "";
  });
};

init();
