import document from 'document';
import { switchPage } from '../navigation';
import { state } from '../state';

let $listregion = null;
let $listregion1 = null;
let $listregion2 = null;
let $listregion3 = null;
let $listregion4 = null;
let $listregion5 = null;
let $listregion6 = null;
let $listregion7 = null;
let $listregion8 = null;



export function destroy() {
  console.log('destroy list page');
  let $listregion = null;
  let $listregion1 = null;
  let $listregion2 = null;
  let $listregion3 = null;
  let $listregion4 = null;
  let $listregion5 = null;
  let $listregion6 = null;
  let $listregion7 = null;
  let $listregion8 = null;

}

export function init() {
  console.log('init list page');
  console.log(state.likedFacts[1]);
  $listregion = document.getElementById('listregion');
  $listregion1 = document.getElementById('listregion1');
  $listregion2 = document.getElementById('listregion2');
  $listregion3 = document.getElementById('listregion3');
  $listregion4 = document.getElementById('listregion4');
  $listregion5 = document.getElementById('listregion5');
  $listregion6 = document.getElementById('listregion6');
  $listregion7 = document.getElementById('listregion7');
  $listregion8 = document.getElementById('listregion8');

  draw();
}

function draw() {
$listregion.text = state.likedFacts[1];
$listregion1.text = state.likedFacts[2];
$listregion2.text = state.likedFacts[3];
$listregion3.text = state.likedFacts[4];
$listregion4.text = state.likedFacts[5];
$listregion5.text = state.likedFacts[6];
$listregion6.text = state.likedFacts[7];
$listregion7.text = state.likedFacts[8];

}
