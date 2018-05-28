const lineInactiveColor = "#face50";
const lineActiveColor = "#aaffff";
const elementColor = "#252525";
const elementPushColor = "#101010";
const textColor = "#dddddd"
const backgroundColor = "#004010";

const activeColor = "#00DD00";
const inactiveColor = "#330000";

const gridSize = 25.8;

const canvas = document.getElementById("graphCanvas");
const canvasGraphic = canvas.getContext("2d");

var difficulty = 1;

function setDifficulty() {
    difficulty = document.getElementById("sliderDifficulty").value;
    drawAllElements();
}

function drawAllElements() {
    canvasGraphic.clearRect(0, 0, canvas.width, canvas.height);

    elements.slice().reverse().forEach(element => {
        checkConnection(element)
    })

    elements.slice().reverse().forEach(element => {
        drawConnection(element)
    })

    elements.slice().reverse().forEach(element => {
        drawElement(element)
    })
}

function checkPushed(element) {
    var result = false;
    if (element.activeInputs[5]) {
        result = true;
    }
    return result;
}

function checkConnection(element) {
    if (element.output != undefined) {
        switch (checkActive(element.type, element.activeInputs)) {
            case true:
                elements[element.output].activeInputs[elements[element.output].input.indexOf(element.id)] = true;
                break;
            default:
                elements[element.output].activeInputs[elements[element.output].input.indexOf(element.id)] = false;
                break;
        }
    }
}

function drawConnection(element) {
    if (element.output != undefined) {

        canvasGraphic.strokeStyle = lineInactiveColor;
        if (checkActive(element.type, element.activeInputs) && difficulty < 2)
            canvasGraphic.strokeStyle = lineActiveColor;

        canvasGraphic.lineWidth = gridSize / 10;

        var startX = (+element.x + +(element.width / 2)) * +gridSize;
        var startY = (+element.y + +(element.height / 2)) * +gridSize;
        var endX = (+elements[element.output].x + +elements[element.output].input.indexOf(element.id) + +0.5) * +gridSize;
        var endY = (+elements[element.output].y) * +gridSize + +gridSize * +2;

        canvasGraphic.beginPath();
        canvasGraphic.moveTo(startX, startY);

        canvasGraphic.lineTo(startX, endY + gridSize);

        canvasGraphic.lineTo(endX, endY + gridSize);

        canvasGraphic.lineTo(endX, endY);

        canvasGraphic.stroke();
    }
}

function drawElement(element) {
    canvasGraphic.fillStyle = elementColor;
    if (checkPushed(element)) {
        canvasGraphic.fillStyle = elementPushColor;
    }
    canvasGraphic.fillRect(element.x * gridSize, element.y * gridSize, element.width * gridSize, element.height * gridSize);

    canvasGraphic.fillStyle = canvasGraphic.fillStyle;
    if (element.output != undefined) {
        if (checkActive(element.type, element.activeInputs) && difficulty < 3)
            canvasGraphic.fillStyle = activeColor;
        else if (!checkActive(element.type, element.activeInputs) && difficulty < 3) {
            canvasGraphic.fillStyle = inactiveColor;
        }
        canvasGraphic.fillRect((element.x + element.width - 0.5) * gridSize, (element.y + 0.25) * gridSize, gridSize / 4, gridSize / 4);
    }

    canvasGraphic.lineWidth = gridSize / 50;

    canvasGraphic.strokeStyle = textColor;
    canvasGraphic.strokeRect(element.x * gridSize, element.y * gridSize, element.width * gridSize, element.height * gridSize);

    if (element.type) {
        canvasGraphic.fillStyle = textColor;
        canvasGraphic.textAlign = "center";
        canvasGraphic.font = (gridSize / 2) + "px Consolas";
        canvasGraphic.fillText(element.type, (element.x + (element.width / 2)) * gridSize, (element.y + (element.height / 1.75)) * gridSize);
    }
}