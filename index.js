import { createMarkUp } from "./detail-card.js";
const poke_container = document.getElementById("poke-container");

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
  const id = data.id < 1000 ? data.id.toString().padStart(3, "0") : data.id;
  const mainType = data.types[0].type.name;

  const name = format(data.name);
  const formatType = function (types, number) {
    return format(types[number].type.name);
  };

  return `
    <div class="pokemon" data-id=${data.id} style="background-color:${colors[mainType]}">
      <div class="img-container">
        <img
          src="./images/pokemon/${data.id}.png"
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
const render = async function (number) {
  try {
    const datas = await allPokeData(number);
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
    const datas = await allPokeData(dexNum + 20, dexNum);
    if (!datas) throw new Error("did not get data");
    dexNum += 21;
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

// loading spinner
const renderSpinner = async function (handler) {
  spinner.classList.remove("none");
  await handler();
  spinner.classList.add("none");
};

// listen details card
const pokeCard = async function (id) {
  try {
    const data = await getPokeData(id);
    const data2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
    const species = await data2.json();
    let text = species.flavor_text_entries.find((el) => {
      return el.language.name === "en";
    }).flavor_text;
    text = text.includes("\f") ? text.replace("\f", " ") : text;
    data.name = format(data.name);
    const html = createMarkUp(data, text);
    poke_container.insertAdjacentHTML("beforebegin", html);

    const cardBack = document.querySelector("#card-pad");
    const card = document.querySelector("#cards");
    closeCard(cardBack, card);
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

// render main page
const init = async function () {
  render(pokemon_count);
  spinner.classList.add("none");
  loadMoreBtn.addEventListener("click", () => {
    renderSpinner(updateTen);
  });
  let id;

  // openCard();
  poke_container.addEventListener("click", function (e) {
    const clickCard = e.target.closest(".pokemon");
    if (!clickCard) return;
    id = clickCard.dataset["id"];
    pokeCard(id);
  });
};

init();
