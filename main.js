import {
    MDCList
} from "@material/list";
const list = MDCList.attachTo(document.querySelector('.mdc-list'));
list.wrapFocus = true;
import {MDCTopAppBar} from '@material/top-app-bar/index';

// Instantiation
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);
/*var myImage = document.querySelectorAll('img')[0]

myImage.onclick = function(){
	var mySrc = myImage.getAttribute('src')
	if(mySrc === 'images/gopher.png'){
		myImage.setAttribute('src','images/pope-gopher.png')
	}else{
		myImage.setAttribute('src','images/gopher.png')
	}
}

// Personalized welcome message code

var myButton = document.querySelector('button');
var myHeading = document.querySelectorAll('h1')[1];

function setUserName(){
	var myName = prompt('Pwees enta ur name uwu');
	localStorage.setItem('name',myName);
	myHeading.innerHTML = 'Mykale welcomes '+myName;
}

if(!localStorage.getItem('name')){
	setUserName();
}else{
	var storedName = localStorage.getItem('name');
	myHeading.innerHTML = 'Do not worry '+storedName+' mykale welcomes you';
}



myButton.onclick = function() {
  setUserName();
}
*/
