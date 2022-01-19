import document from 'document';
import { switchPage } from '../navigation';

let $buttonDetail = null;

export function destroy() {
  console.log('destroy index page');
  $buttonDetail = null;

}

export function init() {
  console.log('init index page');
  $buttonDetail = document.getElementById('detail-button');


  $buttonDetail.onclick = () => {
    switchPage('detail');
  };
}
