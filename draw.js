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
    canvasGraphic.clearRect(0, 0, canvas.width, canvas.height);

    elements.slice().reverse().forEach(element => {
        checkConnection(element)
    })

    elements.slice().reverse().forEach(element => {
        drawConnection(element)
    })

    elements.slice().reverse().forEach(element => {
        drawConnection(element, true)
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
                element.output.forEach(outputID => {
                    for (let index = 0; index < elements[outputID].input.length; index++) {
                        if (elements[outputID].input[index] == element.id)
                            elements[outputID].activeInputs[index] = true;
                    }
                });
                break;
            default:
                element.output.forEach(outputID => {
                    for (let index = 0; index < elements[outputID].input.length; index++) {
                        if (elements[outputID].input[index] == element.id)
                            elements[outputID].activeInputs[index] = false;
                    }
                });
                break;
        }
    }
}

function drawConnection(element, drawActive) {
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
                        if (checkActive(element.type, element.activeInputs) && difficulty < 2 && drawActive)
                            canvasGraphic.strokeStyle = lineActiveColor;

                        canvasGraphic.lineWidth = gridSize / 10;
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
                if (checkActive(element.type, element.activeInputs) && difficulty < 3)
                    canvasGraphic.fillStyle = activeColor;
                else if (!checkActive(element.type, element.activeInputs) && difficulty < 3) {
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