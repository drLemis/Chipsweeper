document.getElementById("loadFrom").value = 'create (15, 6, "UNIT")\ncreate (15, 10, "AND")\ncreate (16, 14, "INPUT")\nconnect (1, 0, 1)\nconnect (2, 1, 0)\nconnect (2, 1, 2)';


var lastLoad;
var listLevels = new Array;

function refreshLevelList() {
	listLevels = new Array;
	var selectList = document.getElementById('levelSelect');
	var i;
	for (i = selectList.options.length - 1; i > 0; i--) {
		selectList.remove(i);
	}

	var url = "https://raw.githubusercontent.com/drLemis/Chipsweeper/master/level/levelList";

	fetch(url)
		.then(function (response) {
			response.text().then(function (text) {
				text.match(/[^\r\n]+/g).forEach(element => {
					var opt = document.createElement('option');
					opt.value = element;
					opt.innerHTML = element;
					selectList.appendChild(opt);
					listLevels.push(element);
				});
				if (listLevels && listLevels.length > 0) {
					openFrom(listLevels[0])
				}
			});
		});
}


function openFrom(id) {
	if (id) {
		currentID = id;
		document.getElementById('levelSelect').value = currentID;
		var url = "https://raw.githubusercontent.com/drLemis/Chipsweeper/master/level/" + id;
		var storedText;

		fetch(url)
			.then(function (response) {
				response.text().then(function (text) {
					storedText = text;
					done();
				});
			});

		function done() {
			loadFrom(storedText, true);
		}
	}
}

function loadFrom(input, isOriginal) {
	if (input) {

		if (!isOriginal) {
			currentID = null;
		}
		var inputTextArray = input.match(/[^\r\n]+/g);
		elements = new Array;
		textOnField = new Array;
		units = new Array;
		lastLoad = input;
		panelActive = false;

		if (inputTextArray && inputTextArray.length > 0) {
			inputTextArray.forEach(line => {
				if (/(create *\(\d+, *\d+, *\"*.+?\"*\))/i.test(line)) {
					var reg = /\((\d+), *(\d+), *\"*(.+?)\"*\)/;
					var match;
					if ((match = reg.exec(line)) !== null) {
						createElement(parseInt(match[1]), parseInt(match[2]), match[3])
					}
				} else if (/(connect *\(\d+, *\d+, *[0-3]\))/i.test(line)) {
					var reg = /\((\d+), *(\d+), *([0-3])\)/;
					var match;
					if ((match = reg.exec(line)) !== null) {
						connectElement(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]))
					}
				} else if (/(write *\(\d+, *\d+, *\"*.+?\"*\))/i.test(line)) {
					var reg = /\((\d+), *(\d+), *\"*(.+?)\"*\)/;
					var match;
					if ((match = reg.exec(line)) !== null) {
						createText(parseInt(match[1]), parseInt(match[2]), match[3])
					}
				}
			});
			drawAllElements();
		}
	}
}

function loadLast() {
	if (currentID) {
		openFrom(currentID)
	} else {
		loadFrom(lastLoad)
	}
}

function loadNext() {
	openFrom(getNextLevel(currentID))
}

function getNextLevel() {
	if (currentID && listLevels.includes(currentID)) {
		if (listLevels.length >= listLevels.indexOf(currentID) + 1) {
			return (listLevels[listLevels.indexOf(currentID) + 1])
		}
	}
}