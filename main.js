import {
	MDCList
} from "@material/list";
const list = MDCList.attachTo(document.querySelector('.mdc-list'));
list.wrapFocus = true;
import {
	MDCTopAppBar
} from '@material/top-app-bar/index';

// Instantiation
const topAppBarElement = document.querySelector('.mdc-top-app-bar');
const topAppBar = new MDCTopAppBar(topAppBarElement);

var divStudentCard = document.getElementById("studentcard");
var cln = divStudentCard.cloneNode(true);
document.body.appendChild(cln);


// Getting the boards
var divEmojiBoard = document.getElementById("emojiboarddiv");
var divStudentBoard = document.getElementById("studentboarddiv");
