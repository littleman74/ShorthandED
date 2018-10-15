// Getting the boards
var divEmojiBoard = document.getElementById("emojiboarddiv");
var divStudentBoard = document.getElementById("studentboarddiv");

// Emoji Properties
var emojitilesize = "80";
// make the padding an even int
var emojitilepadding = "10";


// Student Tile Properties
var studenttilesize = "150";
var studenttilepadding = "20";

var mousePosition;

// Temporary Variables
var currentHoverElement = null;

var emojiArray = ['smile','sad','annoyed'];

var nestedClassDataForStudent = {
	classid: 1,
	emojis:[],
};

var testStudentAlphaArray = {
	name:"Albert",
	id:1,
	classes:[nestedClassDataForStudent],
};


var ClassDataArray = {
	name:"Test Class",
	studentids:[1],
	classid:1,
};

var RegisteredStudents = [testStudentAlphaArray,];

// Static variables
var currentClassId = 1


// Loading student icons

// Function will find the student data from the id given from the class array
function returnStudentData(id){
	for (let i = 0; i<RegisteredStudents.length; i++){
		if (RegisteredStudents[i].id == id){
			return RegisteredStudents[i];
		}
	}
}

// Main sequencer, grabs student data from the id in the class array then creates icons for each student

var currentStudents = [];
var currentStudentIcons = [];
function loadclassboard(classarray){
	
	//reseting the current data arrays
	currentStudentIcons = [];
	currentStudents = [];
	
	console.log('Loading in '+classarray.name);
	// Gathering list of students
	for (let i = 0; i<classarray.studentids.length; i++){
		let currentStudent = returnStudentData(classarray.studentids[i]);
		if (currentStudent) {
			currentStudents.push(currentStudent);
			console.log('Confirmed '+currentStudent.name);
		}
	}
	console.log(currentStudents.length+" student(s) in class");
	
	// Adding icons for each student
	for (let i = 0; i < currentStudents.length; i++){
		let studentIcon = document.createElement('div');
	
		// setting properties
		studentIcon.style.width = studenttilesize+"px";
		studentIcon.style.height = studenttilesize+"px";
		studentIcon.style.position = "absolute";
		studentIcon.style.borderRadius = '50%';

		studentIcon.style.zIndex = '1';
		
		
		// Adding background properties
		let imagefile = 'url("images/studentdefaulticon.png")';
		
		studentIcon.style.backgroundImage = imagefile;
		studentIcon.style.backgroundSize = studenttilesize+'px '+studenttilesize+'px';
		
		// Adding name label
		var namelabel = document.createElement('p')
		namelabel.innerHTML = currentStudents[i].name;
		
		studentIcon.appendChild(namelabel);
		
		// Adding div to the student board and pushing it to current array
		divStudentBoard.appendChild(studentIcon);
		console.log("Added "+currentStudents[i].name+"'s tile");
		currentStudentIcons.push(studentIcon);
		
	
		// Adding hover property
		// Creating an invisible division that is above both the emoji and the basic div
		let snapDiv = document.createElement('div');
		snapDiv.style.width = studenttilesize+"px";
		snapDiv.style.height = studenttilesize+"px";
		snapDiv.style.position = "absolute";
		snapDiv.style.borderRadius = '50%';
		snapDiv.style.backgroundColor = "red";
		snapDiv.style.zIndex = "3";
		snapDiv.style.opacity = "0";
		
		
		
		
		divStudentBoard.appendChild(snapDiv);
		
		// Adding properties
		studentIcon.mousehover = false;
		studentIcon.student = currentStudents[i];
		
		
		snapDiv.addEventListener('mouseenter', function(event) {
			studentIcon.mousehover = true;
		}, true);
		snapDiv.addEventListener('mouseout', function(event) {
			studentIcon.mousehover = false;
		}, true);
		
		// Moving the icons to be a list
		studentIcon.style.left = ((studenttilesize)*i+(i*studenttilepadding)+(studenttilepadding/2))+'px';
		snapDiv.style.left = ((studenttilesize)*i+(i*studenttilepadding)+(studenttilepadding/2))+'px';

		
	}
	
}

// Loading the fake class data
loadclassboard(ClassDataArray);

function giveEmojiToStudent(studenttile,emojiname){
	let studentData = studenttile.student;
	let classesArray = studentData.classes;

	// Finding the current class in the data
	
	for(let i = 0; i<classesArray.length;i++){
		if (classesArray[i].classid == currentClassId){
			classesArray[i].emojis.push(emojiname);
			console.log("Gave "+studentData.name+" a "+emojiname+" emoji!");
		}
	}
	
}

function checkIfMouseOverStudents(emojiname){
	for (let i=0;i<currentStudentIcons.length;i++){
		let tile = currentStudentIcons[i];
		if (tile.mousehover) {
			giveEmojiToStudent(tile,emojiname);
		}
	}
}


// Creating emoji board
for (let index = 0; index<emojiArray.length;index++){
	
	
	var divEmoji = document.createElement('div');
	
	// setting properties
	divEmoji.style.width = emojitilesize+"px";
	divEmoji.style.height = emojitilesize+"px";
	divEmoji.style.position = "absolute";
	divEmoji.style.cursor = 'grab';
	divEmoji.style.borderRadius = '50%';
	
	divEmoji.emojiname = emojiArray[index];
	
	let emojifile = 'url("images/emojis/'+emojiArray[index]+'.png")';
	
	// Adding background properties
	divEmoji.style.backgroundImage = emojifile;
	divEmoji.style.backgroundSize = emojitilesize+'px '+emojitilesize+'px';
	
	
	divEmojiBoard.appendChild(divEmoji);
	console.log('Adding '+emojiArray[index]+' emoji');
}
// Setting the emojis in a line and letting them be dragged
let items = divEmojiBoard.children;

for (let i = 0; i< items.length; i++){
	
	
	
	let item = items[i];
	item.style.left = ((emojitilesize)*i+(i*emojitilepadding)+(emojitilepadding/2))+'px';
	
	let originPosition = [item.style.left,item.style.top];
	
	item.style.zIndex = 1;
	let isDown = false;
	
	
	item.addEventListener('ondrag',function(){
		return false;
	}, true);
	
	item.addEventListener('mousedown', function(e) {
		isDown = true;
		item.style.zIndex = 2;
	
	}, true);

	document.addEventListener('mouseup', function(event) {
		if (isDown) {
			mousePosition = {
				x : event.clientX,
				y : event.clientY
			};
			isDown = false;
			item.style.zIndex = 1;
			item.style.left = originPosition[0];
			item.style.top = originPosition[1];
			
			// checking tiles
			checkIfMouseOverStudents(item.emojiname);
		}
		
	}, true);

	document.addEventListener('mousemove', function(event) {
		
		if (isDown) {
			event.preventDefault();
			mousePosition = {
				x : event.clientX,
				y : event.clientY
			};
			item.style.left = (mousePosition.x -(emojitilesize/2)) + 'px';
			item.style.top  = (mousePosition.y -(emojitilesize/2)) +'px';
		}
	}, true);
	
}




console.log('Complete')