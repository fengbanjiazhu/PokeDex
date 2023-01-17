export const createMarkUp = function (data, text) {
  const { abilities, stats } = data;
  const [hp, atk, def, spa, spd, spe] = stats.map((el) => {
    return el["base_stat"];
  });

  return `
  <div class="card-pad" id="card-pad"></div>

  <div class="cards" id="cards" data-id="${data.id}">
    <div class="details basic">
      <div class="image" id="detailImage"><img src="./images/pokemon/${data.id}.png" alt="" /></div>
      <div class="info-wrapper">
        <span class="number">ID: ${data.id}</span>
        <h3 class="name">${data.name}</h3>
        <p>height: ${data.height / 10}m</p>
        <p>weight: ${data.weight / 10}kg</p>
      </div>
    </div>

    <div class="details abilities">
      <div class="normal-abl">
        <p>${abilities[0].ability.name}</p>
        ${abilities.length > 2 ? `<p> ${abilities[1].ability.name} </p>` : ""}
        
      </div>
      <div class="hidden-abl">
      ${abilities.length > 2 ? `<p> ${abilities[2].ability.name} </p>` : `<p> ${abilities[1].ability.name} </p>`}
      </div>
    </div>

    <div class="details stats">
      <table>
        <tr class="stat hp">
          <th>Hp</th>
          <td>
            <small>${hp}</small>
            <span style="width: calc(${hp} / 255 * 25rem)"> </span>
          </td>
        </tr>
        <tr class="stat atk">
          <th>Attack</th>
          <td>
            <small>${atk}</small>
            <span style="width: calc(${atk} / 255 * 25rem)"></span>
          </td>
        </tr>
        <tr class="stat def">
          <th>Defense</th>
          <td>
            <small>${def}</small>
            <span style="width: calc(${def} / 255 * 25rem)"></span>
          </td>
        </tr>
        <tr class="stat spA">
          <th>sp-Atk</th>
          <td>
            <small>${spa}</small>
            <span style="width: calc(${spa} / 255 * 25rem)"></span>
          </td>
        </tr>
        <tr class="stat spD">
          <th>sp-Def</th>
          <td>
            <small>${spd}</small>
            <span style="width: calc(${spd} / 255 * 25rem)"></span>
          </td>
        </tr>
        <tr class="stat spe">
          <th>Speed</th>
          <td>
            <small>${spe}</small>
            <span style="width: calc(${spe} / 255 * 25rem)"></span>
          </td>
        </tr>
      </table>
    </div>

    <div class="details description">
      <p>${text}</p>
    </div>
  </div>`;
};
