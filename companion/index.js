import * as cbor from 'cbor';
import { outbox } from 'file-transfer';
import { settingsStorage } from 'settings';
import * as messaging from 'messaging';
import { geolocation } from 'geolocation';
import { apiKey } from './keys';
import { me as companion } from "companion";


let categorie;
let currentFact;
let likedFacts;







if (!companion.permissions.granted("run_background")) {
  console.warn("We're not allowed to access to run in the background!");
}
const MILLISECONDS_PER_MINUTE = 1000 * 60;
// Tell the Companion to wake once a day
companion.wakeInterval = 1440 * MILLISECONDS_PER_MINUTE;
/* on wake facts refreshe;*/
if (companion.launchReasons.wokenUp) {
  fetchRandFact();
  fetchChuckFact();
  fetchCatFact();
}


/* Settings */
function sendSettings() {
  const settings = {

    list: settingsStorage.getItem('list')
      ? JSON.parse(settingsStorage.getItem('list')).map((item) => item.value)
      : [],
    letter: settingsStorage.getItem('letter')
      ? JSON.parse(settingsStorage.getItem('letter')).values[0].value
      : '',
  };
    categorie = settings.letter;

  outbox
    .enqueue('settings.cbor', cbor.encode(settings))
    .then(() => console.log('settings sent'))
    .catch((error) => console.log(`send error: ${error}`));
    updateCategorie();
}

settingsStorage.addEventListener('change', sendSettings);



/* API Fetch */



async function fetchRandFact() {

  const urlFacts = `https://api.api-ninjas.com/v1/facts/`;
  /*.json?access_token=${apiKey}*/
  const response = await fetch(urlFacts ,{
    headers: { 'X-Api-Key': 'UeJg/2dbydFzKullRzdLEw==GTgOpN0ULPRaJUF6'}} );
  const json = await response.json();

  let temp = JSON.stringify(json);
  temp = temp.slice(10);
  let temp1 = temp.length - 3;
  temp = temp.slice(0, temp1);


  const factToSend = temp;
  currentFact = factToSend;

  outbox
  .enqueue('factToSend.cbor', cbor.encode({factToSend}))
  .then(() => console.log( factToSend +' sent fact'))
  .catch((error) => console.log(`send error: ${error}`));

}

async function fetchChuckFact() {

  const urlChuckFacts = `https://api.chucknorris.io/jokes/random`;
  const response = await fetch(urlChuckFacts);
  const json = await response.json();



  const factToSend = json.value;
  currentFact = factToSend;

  outbox
  .enqueue('factToSend.cbor', cbor.encode({factToSend}))
  .then(() => console.log( factToSend +' sent fact'))
  .catch((error) => console.log(`send error: ${error}`));

}

async function fetchCatFact() {

  const urlFacts = `https://catfact.ninja/fact`;
  /*.json?access_token=${apiKey}*/
  const response = await fetch(urlFacts ,{
    headers: { 'accept' : 'application/json', 'X-CSRF-TOKEN' : 'CWGPsSSh05X9QjKLDe73TtDxGvox3NR9QmjvPlyG'}} );
  const json = await response.json();


  const factToSend = json.fact;
  currentFact = factToSend;

  outbox
  .enqueue('factToSend.cbor', cbor.encode({factToSend}))
  .then(() => console.log( factToSend +' sent fact'))
  .catch((error) => console.log(`send error: ${error}`));

}

sendSettings();
updateCategorie();

function updateCategorie(){

  if (categorie == "randFact") {
    fetchRandFact();
  } else if (categorie == "chuckFact") {
    fetchChuckFact();
  }else if (categorie == "catFact") {
    fetchCatFact();
  }

}

async function saveLikedFacts(){

  const saveFacts = likedFacts;

  outbox
  .enqueue('saveFacts.cbor', cbor.encode({saveFacts}))
  .then(() => console.log( saveFacts +' saved fact'))
  .catch((error) => console.log(`send error: ${error}`));


}

messaging.peerSocket.addEventListener("message", (evt) => {
  if (evt.data.liked = true) {
    likedFacts = currentFact;
    saveLikedFacts();
  }
});
