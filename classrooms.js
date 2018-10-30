// Tagging the premade divisions
var divEmojiBoard = document.getElementById("emojiboarddiv");
var divStudentBoard = document.getElementById("studentboarddiv");

var divStudentProfile = document.getElementById("studentprofilediv");
var studentProfileExitButton = document.getElementById("profileexitbutton")
var studentProfileNameTitle = document.getElementById("studentprofiletitle")
var divStudentProfileEmojiLog = document.getElementById("emojilogdiv");

//Reseting the divions to their starting displays,
divStudentProfile.style.display = "none";
divEmojiBoard.style.display = "block";
divStudentBoard.style.display = "block";

// 

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

var emojiArray = ['smile', 'sad', 'annoyed'];

// 1 = good, -1 = bad, 0 = neutral
var emojiAlignmentDictionary = {
	"smile": 1,
	"sad": -1,
	"annoyed": 0,
}

// UI Movement and Editing Functions
function loadEmojiLog(student, classid, contentElement, date, displaytype, ) {

	let loggedEmojis = [];

	let classArray;
	// identifying which class is the emoji
	for (let i = 0; i < student.classes.length; i++) {
		let itteratingClassArray = student.classes[i];
		if (itteratingClassArray.classid == classid) {
			classArray = itteratingClassArray;
			break;
		}

	}

	//Taking emojis from the class and adding them to the list if they match the date
	for (let i = 0; i < classArray.emojis.length; i++) {
		if (classArray.emojis[i].timestamp == date) {
			loggedEmojis.push(classArray.emojis[i]);
		}
	}
	// Now that all the emojis are displayed, icons will be added to the content element
	for (let i = 0; i < loggedEmojis.length; i++) {
		let miniemojidiv = document.createElement('div');
		miniemojidiv.classList.toggle("logemojiicon");
		let emojifile = 'url("images/emojis/' + loggedEmojis[i].emoji + '.png")';

		// Adding background properties
		miniemojidiv.style.backgroundImage = emojifile;

		let alignment = emojiAlignmentDictionary[loggedEmojis[i].emoji];
		if (alignment == 1 || alignment == -1) {
			miniemojidiv.style.borderWidth = "3px";
			miniemojidiv.style.borderStyle = "solid";
			if (alignment == 1) {
				miniemojidiv.style.borderColor = "green";
			} else {
				miniemojidiv.style.borderColor = "red";
			}

		}


		contentElement.appendChild(miniemojidiv);
	}
}

function returnDateString() {
	// Adding a timestamp
	let today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth() + 1; //January is 0!
	let yyyy = today.getFullYear();

	if (dd < 10) {
		dd = '0' + dd
	}

	if (mm < 10) {
		mm = '0' + mm
	}

	today = mm + '/' + dd + '/' + yyyy;

	return (today);
}


function loadStudentProfileUI(student, classid) {

	console.log("Loading " + student.name + "'s profile");

	// clearing previous tabs in the log
	divStudentProfileEmojiLog.innerHTML = '';

	divStudentBoard.style.display = "none";
	divEmojiBoard.style.display = "none";
	divStudentProfile.style.display = "block";

	studentProfileNameTitle.innerHTML = student.name;

	//Creating today's data
	let primaryTab = document.createElement('Button');
	primaryTab.innerHTML = "Today";
	primaryTab.classList.toggle("logtab");

	let primaryContent = document.createElement('div');
	primaryContent.classList.toggle("logcontent");

	divStudentProfileEmojiLog.appendChild(primaryTab);
	divStudentProfileEmojiLog.appendChild(primaryContent);

	primaryContent.style.display = "block";
	loadEmojiLog(student, classid, primaryContent, returnDateString());


	primaryTab.addEventListener("click", function () {
		if (primaryContent.style.display == "block") {
			primaryContent.style.display = "none";
		} else {
			primaryContent.style.display = "block";
		}
	});



}

studentProfileExitButton.addEventListener('mousedown', function (e) {
	divStudentBoard.style.display = "block";
	divEmojiBoard.style.display = "block";
	divStudentProfile.style.display = "none";


}, true);


// Load Data 
var nestedClassDataForStudent = {
	classid: 1,
	emojis: [],
};

var testStudentAlphaArray = {


	name: "Albert",
	id: 1,

	classes: [nestedClassDataForStudent],
};


var ClassDataArray = {

	name: "Test Class",
	studentids: [1],
	classid: 1,
};

var RegisteredStudents = [testStudentAlphaArray, ];
var RegisteredClasses = [ClassDataArray, ];
// Function to create student data
function createStudentData(name, givenClassId) {


	// givenClassId is the id of the class the student profile was created for
	console.log('Creating ' + name + "'s data");
	var newStudentData = {

		name: name,
		id: (RegisteredStudents.length + 1),
		classes: [],
	};
	if (givenClassId) {
		// If give created in a class screen, the students data will have the class data
		let newClassData = {
			classid: givenClassId,
			emojis: [],
		};
		newStudentData.classes.push(newClassData);

		// Adding the students id to the class dataset
		for (let i = 0; i < RegisteredClasses.length; i++) {
			if (RegisteredClasses[i].classid == givenClassId) {
				RegisteredClasses[i].studentids.push(newStudentData.id);
			}
		}
	}
	RegisteredStudents.push(newStudentData);
}

// Adding new student
createStudentData("Bert", 1);

// LOADS IN THE CLASSES
function loadClass(currentClassId) {


	console.log('Deleting previous elements');
	//Removing Old Students and Emojis
	for (let i = 0; i < divStudentBoard.length; i++) {
		let child = divStudentBoard[i];
		if (child) {
			divStudentBoard.removeChild(child);
		}
	}
	for (let i = 0; i < divEmojiBoard.length; i++) {
		let child = divEmojiBoard[i];
		if (child) {
			divEmojiBoard.removeChild(child);
		}
	}

	console.log('Loading new class.');


	// Loading student icons

	// Function will find the student data from the id given from the class array
	function returnStudentData(id) {
		for (let i = 0; i < RegisteredStudents.length; i++) {
			if (RegisteredStudents[i].id == id) {
				return RegisteredStudents[i];
			}
		}
	}

	// Main sequencer, grabs student data from the id in the class array then creates icons for each student

	var currentStudents = [];
	var currentStudentIcons = [];

	function loadclassboard(classarray) {


		//reseting the current data arrays
		currentStudentIcons = [];
		currentStudents = [];

		console.log('Loading in ' + classarray.name);
		// Gathering list of students
		for (let i = 0; i < classarray.studentids.length; i++) {
			let currentStudent = returnStudentData(classarray.studentids[i]);
			if (currentStudent) {
				currentStudents.push(currentStudent);
				console.log('Confirmed ' + currentStudent.name);
			}
		}
		console.log(currentStudents.length + " student(s) in class");

		// Adding icons for each student
		for (let i = 0; i < currentStudents.length; i++) {

			let studentIcon = document.createElement('div');

			// setting properties
			studentIcon.style.width = studenttilesize + "px";
			studentIcon.style.height = studenttilesize + "px";
			studentIcon.style.position = "absolute";
			studentIcon.style.borderRadius = '50%';

			studentIcon.style.zIndex = '1';


			// Adding background properties
			let imagefile = 'url("images/studentdefaulticon.png")';

			studentIcon.style.backgroundImage = imagefile;
			studentIcon.style.backgroundSize = studenttilesize + 'px ' + studenttilesize + 'px';

			// Adding name label
			/*var namelabel = document.createElement('p')
			namelabel.innerHTML = currentStudents[i].name;
			
			studentIcon.appendChild(namelabel);*/

			// Adding div to the student board and pushing it to current array
			divStudentBoard.appendChild(studentIcon);
			console.log("Added " + currentStudents[i].name + "'s tile");
			currentStudentIcons.push(studentIcon);


			// Adding hover property
			// Creating an invisible division that is above both the emoji and the basic div
			let snapDiv = document.createElement('div');
			snapDiv.style.width = studenttilesize + "px";
			snapDiv.style.height = studenttilesize + "px";
			snapDiv.style.position = "absolute";
			snapDiv.style.borderRadius = '50%';
			snapDiv.style.backgroundColor = "red";
			snapDiv.style.zIndex = "3";
			snapDiv.style.opacity = "0";

			divStudentBoard.appendChild(snapDiv);

			// Adding properties
			studentIcon.mousehover = false;
			studentIcon.student = currentStudents[i];


			snapDiv.addEventListener('mouseenter', function (event) {
				studentIcon.mousehover = true;
			}, true);
			snapDiv.addEventListener('mouseout', function (event) {
				studentIcon.mousehover = false;
			}, true);

			// Moving the icons to be a list
			studentIcon.style.left = ((studenttilesize) * i + (i * studenttilepadding) + (studenttilepadding / 2)) + 'px';
			snapDiv.style.left = ((studenttilesize) * i + (i * studenttilepadding) + (studenttilepadding / 2)) + 'px';

			snapDiv.addEventListener('mousedown', function (event) {
				loadStudentProfileUI(studentIcon.student, currentClassId);
			}, true);

		}

	}

	// Loading the fake class data
	loadclassboard(ClassDataArray);

	function giveEmojiToStudent(studenttile, emojiname) {

		let studentData = studenttile.student;
		let classesArray = studentData.classes;
		// Finding the current class in the data
		for (let i = 0; i < classesArray.length; i++) {
			if (classesArray[i].classid == currentClassId) {

				// Adding a timestamp
				let today = new Date();
				let dd = today.getDate();
				let mm = today.getMonth() + 1; //January is 0!
				let yyyy = today.getFullYear();

				if (dd < 10) {
					dd = '0' + dd
				}

				if (mm < 10) {
					mm = '0' + mm
				}

				today = mm + '/' + dd + '/' + yyyy;

				var emojiDataSet = {
					emoji: emojiname,
					timestamp: today,

				};

				classesArray[i].emojis.push(emojiDataSet);
				console.log("Gave " + studentData.name + " a " + emojiname + " emoji!");

			}
		}
	}

	function checkIfMouseOverStudents(emojiname) {
		for (let i = 0; i < currentStudentIcons.length; i++) {
			let tile = currentStudentIcons[i];
			if (tile.mousehover) {
				giveEmojiToStudent(tile, emojiname);
			}
		}
	}


	// Creating emoji board
	for (let index = 0; index < emojiArray.length; index++) {


		var divEmoji = document.createElement('div');

		// setting properties
		divEmoji.style.width = emojitilesize + "px";
		divEmoji.style.height = emojitilesize + "px";
		divEmoji.style.position = "absolute";
		divEmoji.style.cursor = 'grab';
		divEmoji.style.borderRadius = '50%';

		divEmoji.emojiname = emojiArray[index];

		let emojifile = 'url("images/emojis/' + emojiArray[index] + '.png")';

		// Adding background properties
		divEmoji.style.backgroundImage = emojifile;
		divEmoji.style.backgroundSize = emojitilesize + 'px ' + emojitilesize + 'px';


		divEmojiBoard.appendChild(divEmoji);
		console.log('Adding ' + emojiArray[index] + ' emoji');
	}
	// Setting the emojis in a line and letting them be dragged
	let items = divEmojiBoard.children;

	for (let i = 0; i < items.length; i++) {

		let item = items[i];
		item.style.left = ((emojitilesize) * i + (i * emojitilepadding) + (emojitilepadding / 2)) + 'px';

		let originPosition = [item.style.left, item.style.top];

		item.style.zIndex = 1;
		let isDown = false;


		item.addEventListener('ondrag', function () {
			return false;
		}, true);

		item.addEventListener('mousedown', function (event) {
			isDown = true;
			item.style.zIndex = 2;
			event.preventDefault();
			mousePosition = {
				x: event.clientX - 256,
				y: event.clientY - 64
			};
			item.style.left = (mousePosition.x - (emojitilesize / 2)) + 'px';
			item.style.top = (mousePosition.y - (emojitilesize / 2)) + 'px';
		}, true);

		document.addEventListener('mouseup', function (event) {
			if (isDown) {
				mousePosition = {
					x: event.clientX,
					y: event.clientY
				};
				isDown = false;
				item.style.zIndex = 1;
				item.style.left = originPosition[0];
				item.style.top = originPosition[1];

				// checking tiles
				checkIfMouseOverStudents(item.emojiname);
			}

		}, true);

		document.addEventListener('mousemove', function (event) {
			if (isDown) {
				event.preventDefault();
				mousePosition = {
					x: event.clientX - 256,
					y: event.clientY - 64
				};
				item.style.left = (mousePosition.x - (emojitilesize / 2)) + 'px';
				item.style.top = (mousePosition.y - (emojitilesize / 2)) + 'px';
			}
		}, true);

	}


}

loadClass(1);
console.log('Complete');
