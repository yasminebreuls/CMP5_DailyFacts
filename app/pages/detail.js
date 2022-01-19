import document from 'document';
import { getStateItem, setStateCallback, removeStateCallback } from '../state';
import { outbox } from 'file-transfer';
import * as cbor from 'cbor';
import * as messaging from 'messaging';
import { settingsStorage } from 'settings';
import { switchPage } from '../navigation';

let $backbutton = null;
let $likebutton = null;
let $fact = null;
let like = false;



function draw() {

    $fact.text = getStateItem('factoftheday');
    //setStateCallback('factoftheday', draw);
}

export function destroy() {
  console.log('destroy detail page');
  $fact = null;
  $backbutton = null;
  $likebutton = null;
}

export function init() {
  console.log('init detail page');
  $fact = document.getElementById('facts');
  $backbutton = document.getElementById('back-button');
  $likebutton = document.getElementById('like-button');
  like = false;
  draw();
  $backbutton.onclick = () => {
    switchPage('listliked', true);
  };
  $likebutton.onclick = () => {
    like = true;
    if (messaging.peerSocket.readyState === messaging.peerSocket.CLOSED) {
      console.log("Display error message");
    }
    messaging.peerSocket.send( {liked : like});
    like = false;

    }
  }



  setStateCallback('detail', 'draw');
  //draw();
