// const updateTen = async function () {
//   try {
//     const datas = await allPokeData(dexNum + 20, dexNum);
//     if (!datas) throw new Error("did not get data");
//     let template = [];
//     await datas.forEach((data) => {
//       template.push(createPokeCard(data));
//     });
//     const markup = template.join("");
//     // console.log(markup);
//     poke_container.insertAdjacentHTML("beforeend", markup);
//     dexNum += 21;
//   } catch (error) {
//     console.log(error);
//   }
// };

// 小图;
//  https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png

// 大图
// https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png

// src="./images/pokemon/${data.id}.png"

{
  /* <a class="toTop" href="#Title">Back to top</a> */
}
