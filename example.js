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

var elements = new Array;

function test() {
    canvasGraphic.clearRect(0, 0, canvas.width, canvas.height);

    elements = new Array;

    createElement(10, 1, "UNIT")

    createElement(4, 5, "OR")
    connectElement(1, 0, 0)

    createElement(2, 9, "CLOCK")
    connectElement(2, 1, 0)
    createElement(6, 9, "CLOCK")
    connectElement(3, 1, 2)

    createElement(16, 5, "AND")
    connectElement(4, 0, 2)

    createElement(14, 9, "CLOCK")
    connectElement(5, 4, 0)
    createElement(18, 9, "CLOCK")
    connectElement(6, 4, 2)


    drawAllElements();
}


function createElement(x, y, type) {
    var element = new Object();
    element.x = x;
    element.y = y;

    element.width = 3;
    element.height = 2;
    element.type = type
    if (type == "CLOCK") {
        element.isActive = Math.random() >= 0.5;
    } else {
        element.isActive = 0;
    }
    element.output;
    element.input = new Array;
    element.activeInputs = 0;

    elements.push(element);
}

function connectElement(from, to, slot) {
    elements[from].output = to;
    elements[to].input[slot] = from;
}

function checkActive(type) {
    result = undefined;
    switch (type) {
        case "OR":
            result = 1;
            break;
        case "AND":
            result = 2;
            break;
        default:
            break;
    }
    return result;
}

function drawAllElements() {
    elements.slice().reverse().forEach(element => {
        drawElement(element)
    })
}

function drawElement(element) {
    canvasGraphic.fillStyle = ecolor;
    canvasGraphic.fillRect(element.x * gridSize, element.y * gridSize, element.width * gridSize, element.height * gridSize);

    if (element.activeInputs >= checkActive(element.type))
        element.isActive = true

    if (element.output != undefined) {
        switch (element.isActive) {
            case true:
                canvasGraphic.fillStyle = activeColor;
                canvasGraphic.strokeStyle = lacolor;
                elements[element.output].activeInputs += 1;
                break;
            default:
                canvasGraphic.fillStyle = inactiveColor;
                canvasGraphic.strokeStyle = lcolor;
                break;
        }

        canvasGraphic.fillRect((element.x + element.width - 0.5) * gridSize, (element.y + 0.25) * gridSize, gridSize / 4, gridSize / 4);
        canvasGraphic.lineWidth = gridSize / 10;

        canvasGraphic.beginPath();
        canvasGraphic.moveTo((element.x + (element.width / 2)) * gridSize, element.y * gridSize);
        canvasGraphic.lineTo((elements[element.output].x + (elements[element.output].input.indexOf(elements.indexOf(element)))) * gridSize + gridSize / 2,
            (elements[element.output].y) * gridSize + gridSize * 2);
        canvasGraphic.stroke();
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