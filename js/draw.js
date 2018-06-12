const lineInactiveColor = "#face50";
const lineActiveColor = "#aaffff";
const elementColor = "#252525";
const elementPushColor = "#aa0000";
const textColor = "#dddddd"
const backgroundColor = "#105010";

const activeColor = "#00DD00";
const inactiveColor = "#330000";

const gridSize = 25;

const canvas = document.getElementById("graphCanvas");
const canvasGraphic = canvas.getContext("2d");

var difficulty = 1;

function setDifficulty() {
	difficulty = document.getElementById("difficulty").value;
	drawAllElements();
}

function drawAllElements() {
	if (!winCondition) {
		canvasGraphic.clearRect(0, 0, canvas.width, canvas.height);

		if (currentID) {
			drawLevelID()
		}

		elements.slice().reverse().forEach(element => {
			checkConnection(element)
		})

		elements.slice().reverse().forEach(element => {
			drawConnection(element)
		})

		elements.slice().reverse().forEach(element => {
			drawElement(element)
		})

		textOnField.slice().reverse().forEach(element => {
			drawText(element)
		})

		checkWin()
	}
}

function drawConnection(element) {
	if (element.output != undefined) {
		element.output.forEach(outputID => {
			element.output.forEach(outputID => {
				for (let index = 0; index < elements[outputID].input.length; index++) {
					if (elements[outputID].input[index] == element.id) {

						//outline
						canvasGraphic.strokeStyle = backgroundColor;


						canvasGraphic.lineWidth = gridSize / 3;
						var startX = (+element.x + +(element.width / 2)) * +gridSize;
						var startY = (+element.y + +(element.height / 2)) * +gridSize;
						var endX = (+elements[outputID].x + index + +0.5) * +gridSize;
						var endY = (+elements[outputID].y) * +gridSize + +gridSize * +1;

						canvasGraphic.beginPath();
						canvasGraphic.moveTo(startX, startY);

						canvasGraphic.lineTo(startX, endY + (2 * gridSize));

						canvasGraphic.lineTo(endX, endY + (2 * gridSize));

						canvasGraphic.lineTo(endX, endY);

						canvasGraphic.stroke();

						// line
						canvasGraphic.strokeStyle = lineInactiveColor;
						if (checkActive(element) && difficulty < 2)
							canvasGraphic.strokeStyle = lineActiveColor;

						canvasGraphic.lineWidth = gridSize / 7.5;
						var startX = (+element.x + +(element.width / 2)) * +gridSize;
						var startY = (+element.y + +(element.height / 2)) * +gridSize;
						var endX = (+elements[outputID].x + index + +0.5) * +gridSize;
						var endY = (+elements[outputID].y) * +gridSize + +gridSize * +1;

						canvasGraphic.beginPath();
						canvasGraphic.moveTo(startX, startY);

						canvasGraphic.lineTo(startX, endY + (2 * gridSize));

						canvasGraphic.lineTo(endX, endY + (2 * gridSize));

						canvasGraphic.lineTo(endX, endY);

						canvasGraphic.stroke();
					}
				}
			});
		});
	}
}

function drawElement(element) {
	switch (element.type) {
		case "INPUT":
			canvasGraphic.beginPath();
			canvasGraphic.arc((element.x + element.width / 2) * gridSize, (element.y + element.height / 2) * gridSize, element.width / 2 * gridSize, 0, 2 * Math.PI, false);

			if (checkPushed(element)) {
				canvasGraphic.fillStyle = elementPushColor;
			} else {
				canvasGraphic.fillStyle = inactiveColor;
			}
			canvasGraphic.fill();
			canvasGraphic.lineWidth = gridSize / 30;
			canvasGraphic.strokeStyle = textColor;
			canvasGraphic.stroke();

			break;
		default:
			canvasGraphic.fillStyle = elementColor;
			canvasGraphic.fillRect(element.x * gridSize, element.y * gridSize, element.width * gridSize, element.height * gridSize);

			if (element.output != undefined) {
				if (checkActive(element) && difficulty < 3)
					canvasGraphic.fillStyle = activeColor;
				else if (!checkActive(element) && difficulty < 3) {
					canvasGraphic.fillStyle = inactiveColor;
				}
				canvasGraphic.fillRect((element.x + element.width - 0.5) * gridSize, (element.y + 0.25) * gridSize, gridSize / 4, gridSize / 4);
			}

			canvasGraphic.fillStyle = elementColor;
			canvasGraphic.lineWidth = gridSize / 50;

			canvasGraphic.strokeStyle = textColor;
			canvasGraphic.strokeRect(element.x * gridSize, element.y * gridSize, element.width * gridSize, element.height * gridSize);
			break;
	}

	if (element.type != "INPUT") {
		canvasGraphic.fillStyle = textColor;
		canvasGraphic.textAlign = "center";
		canvasGraphic.font = (gridSize / 2) + "px Consolas";
		canvasGraphic.fillText(element.type, (element.x + (element.width / 2)) * gridSize, (element.y + (element.height / 1.75)) * gridSize);
	}
}

function drawText(element) {
	canvasGraphic.fillStyle = textColor;
	canvasGraphic.textAlign = "left";
	canvasGraphic.font = (gridSize / 2) + "px Consolas";
	canvasGraphic.fillText(element.text, element.x * gridSize, element.y * gridSize);
}

function drawLevelID() {
	canvasGraphic.fillStyle = textColor;
	canvasGraphic.textAlign = "left";
	canvasGraphic.font = (gridSize / 2) + "px Consolas";
	canvasGraphic.fillText("LVL:" + currentID, gridSize / 2, gridSize / 2);
}