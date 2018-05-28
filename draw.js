const lcolor = "#face50";
const lacolor = "#50cefa";
const ecolor = "#202020";
const tcolor = "#dddddd"
const bcolor = "#004010";

const activeColor = "#00DD00";
const inactiveColor = "#DD0000";

const gridSize = 35;

const canvas = document.getElementById("graphCanvas");
const canvasGraphic = canvas.getContext("2d");

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

function checkConnection(element) {
    if (element.output != undefined) {
        switch (checkActive(element.type, element.activeInputs)) {
            case true:
                elements[element.output].activeInputs[element.id] = true;
                break;
            default:
                elements[element.output].activeInputs[element.id] = false;
                break;
        }
    }
}

function drawConnection(element) {
    if (element.output != undefined) {
        switch (checkActive(element.type, element.activeInputs)) {
            case true:
                canvasGraphic.strokeStyle = lacolor;
                break;
            default:
                canvasGraphic.strokeStyle = lcolor;
                break;
        }

        canvasGraphic.lineWidth = gridSize / 10;

        var startX = (element.x + (element.width / 2)) * gridSize;
        var startY = (element.y + (element.height / 2)) * gridSize;
        var endX = (elements[element.output].x + (elements[element.output].input.indexOf(elements.indexOf(element)))) * gridSize + gridSize / 2;
        var endY = (elements[element.output].y) * gridSize + gridSize * 2;

        canvasGraphic.beginPath();
        canvasGraphic.moveTo(startX, startY);

        canvasGraphic.lineTo(startX, endY + gridSize);

        canvasGraphic.lineTo(endX, endY + gridSize);

        canvasGraphic.lineTo(endX, endY);

        canvasGraphic.stroke();
    }

    canvasGraphic.lineWidth = gridSize / 50;
}

function drawElement(element) {
    canvasGraphic.fillStyle = ecolor;
    canvasGraphic.fillRect(element.x * gridSize, element.y * gridSize, element.width * gridSize, element.height * gridSize);

    if (element.output != undefined) {
        switch (checkActive(element.type, element.activeInputs)) {
            case true:
                canvasGraphic.fillStyle = activeColor;
                break;
            default:
                canvasGraphic.fillStyle = inactiveColor;
                break;
        }

        canvasGraphic.fillRect((element.x + element.width - 0.5) * gridSize, (element.y + 0.25) * gridSize, gridSize / 4, gridSize / 4);
    }

    canvasGraphic.lineWidth = gridSize / 50;

    canvasGraphic.strokeStyle = tcolor;
    canvasGraphic.strokeRect(element.x * gridSize, element.y * gridSize, element.width * gridSize, element.height * gridSize);

    if (element.type) {
        canvasGraphic.fillStyle = tcolor;
        canvasGraphic.textAlign = "center";
        canvasGraphic.font = (gridSize / 2) + "px Consolas";
        canvasGraphic.fillText(element.type, (element.x + (element.width / 2)) * gridSize, (element.y + (element.height / 1.75)) * gridSize);
    }
}