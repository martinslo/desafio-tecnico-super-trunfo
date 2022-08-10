const gameInitial = document.querySelector(".gameInfo");
const cardSelect = document.querySelector(".cardSelect");
const inputName = document.querySelector("#username");
const URL_API = "https://api-super-trunfo.fredes.vercel.app/cartas/sorteio";
let username;

function getSortCards() {
  gameInitial.style.display = "none";
  fetch(URL_API)
    .then((response) => response.json())
    .then((result) => {
      result.map(function (data, index) {
        cardSelect.innerHTML += getCard(data.tipo, data.bandeira, data.nome, data.aparicao_copas, data.ataque, data.defesa, data.meio, data.titulos);
      });
      console.log(result);
    })
    .catch((err) => {
      console.error("Failed retrieving information", err);
    });
}

function verifyStartGame(){
  const savedUsername = localStorage.getItem('super_trunfo_username');
  if(savedUsername){
    getSortCards();
    username = savedUsername;
    console.log(savedUsername);
  } 
}

function getCard(
  type,
  flag,
  name,
  cupsParticipation,
  attack,
  defense,
  middle,
  titles
) {
  return `<div class="card">
  ${getCardType(type)}
  ${getCardFlag(flag)}
  ${getCardCaracteristics(
    name,
    cupsParticipation,
    attack,
    defense,
    middle,
    titles
  )}
  </div>`;
}

function getCardType(type) {
  return `<div class="cardType">
  <span>${type}</span>
  </div>`;
}

function getCardFlag(flag) {
  return `<div class="cardFlag">
  <img src="${flag}">
  </div>`;
}

function getCardCaracteristics(
  name,
  cupsParticipation,
  attack,
  defense,
  middle,
  titles
) {
  return `<div class="cardCaracteristics">
          <h3>${name}</h3>
          <ul>
            <li><a href="#" onclick="comparativeCard('cups_participation', ${cupsParticipation});">Aparição em Copas: ${cupsParticipation}</a></li>
            <li><a href="#" onclick="comparativeCard('attack', ${attack});">Ataque: ${attack}</a></li>
            <li><a href="#" onclick="comparativeCard('defense', ${defense});">Defesa: ${defense}</a></li>
            <li><a href="#" onclick="comparativeCard('middle', ${middle});">Meio: ${middle}</a></li>
            <li><a href="#" onclick="comparativeCard('titles', ${titles});">Títulos: ${titles}</a></li>
          </ul>
        </div>`;
}

function gameStart(){
  localStorage.setItem('super_trunfo_username', inputName.value);
  verifyStartGame();
}

verifyStartGame();
