let divBoard = document.getElementById("emojiboarddiv");


var mousePosition;
var div;

var offset = [0,0];

var emojiArray = ['smile','sad','annoyed'];

// Emoji Properties
var tilesize = "150";



// Creating enough emojis per array

for (let index = 0; index<emojiArray.length;index++){
	var divEmoji = document.createElement('div');
	
	// setting properties
	divEmoji.style.width = tilesize+"px";
	divEmoji.style.height = tilesize+"px";
	divEmoji.style.position = "absolute";
	divEmoji.style.cursor = 'grab';
	divEmoji.style.borderRadius = '50%';

	
	let emojifile = 'url("images/emojis/'+emojiArray[index]+'.png")';
	console.log(emojifile);
	
	// Adding background properties
	divEmoji.style.background = "black "+emojifile+" no-repeat center";
	divEmoji.style.backgroundSize = tilesize+'px '+tilesize+'px';
	
	
	divBoard.appendChild(divEmoji);
	console.log('adding '+emojiArray[index]+' emoji');
}

let items = divBoard.children;

for (let i = 0; i< items.length; i++){
	console.log('setting drag function');
	let item = items[i];
	item.style.left = ((tilesize)*i)+'px';
	
	let originPosition = [item.style.left,item.style.top];
	
	item.style.zIndex = 1;
	let isDown = false;
	
	
	item.addEventListener('mousedown', function(e) {
		console.log('mouse click');
		isDown = true;
		item.style.zIndex = 3;
		offset = [
			-(tilesize/2),
			-(tilesize/2),
		];
	}, true);

	document.addEventListener('mouseup', function() {
		isDown = false;
		item.style.zIndex = 1;
		item.style.left = originPosition[0];
		item.style.top = originPosition[1];
	}, true);

	document.addEventListener('mousemove', function(event) {
		if (isDown) {
			console.log('dragging');
			event.preventDefault();
			mousePosition = {
				x : event.clientX,
				y : event.clientY
			};
			item.style.left = (mousePosition.x + offset[0]) + 'px';
			item.style.top  = (mousePosition.y + offset[1]) +'px';
		}
	}, true);
	
}