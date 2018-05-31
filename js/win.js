var winCondition = false;
var panelActive = false;

function checkWin() {
    if (units && units.length > 0 && !units.includes(false)) {
        elements.forEach(element => {
            if (element.type == "UNIT" && element.activeInputs) {
                var active = element.activeInputs.filter(v => v).length;

                if (element.input && active == element.input.filter(Boolean).length) {
                    elements = new Array;
                    drawOverlay();
                }
            }
        });
    }
}

function drawOverlay() {
    if (!winCondition) {
        winCondition = true;
        //fade out 
        setTimeout(function() {
            var actualAlpha = 0;
            var intervalID = setInterval(function() {
                    if (actualAlpha > 0.5 && winCondition == true) {
                        window.clearInterval(intervalID);
                        panelActive = true;

                        // panel
                        canvasGraphic.fillStyle = elementColor;
                        canvasGraphic.fillRect(canvas.width / 3, canvas.height / 3, canvas.width / 3, canvas.height / 3);

                        canvasGraphic.strokeStyle = textColor;
                        canvasGraphic.strokeRect(canvas.width / 3, canvas.height / 3, canvas.width / 3, canvas.height / 3);

                        //buttons
                        canvasGraphic.fillStyle = textColor;
                        canvasGraphic.fillRect(canvas.width / 3 + 1 * gridSize, canvas.height / 2 - 1 * gridSize, canvas.width / 3 - 2 * gridSize, 1.5 * gridSize);
                        if (currentID && getNextLevel()) {
                            canvasGraphic.fillRect(canvas.width / 3 + 1 * gridSize, canvas.height / 2 + 1.5 * gridSize, canvas.width / 3 - 2 * gridSize, 1.5 * gridSize);
                        }

                        //text
                        canvasGraphic.fillStyle = textColor;
                        canvasGraphic.textAlign = "center";
                        canvasGraphic.font = (gridSize) + "px Consolas";
                        canvasGraphic.fillText("YOU WON", canvas.width / 2, canvas.height / 2 - 2 * gridSize);

                        //buttons text
                        canvasGraphic.fillStyle = elementColor;
                        canvasGraphic.textAlign = "center";
                        canvasGraphic.font = (gridSize) + "px Consolas";
                        canvasGraphic.fillText("RETRY", canvas.width / 2, canvas.height / 2);
                        if (currentID && getNextLevel()) {
                            canvasGraphic.fillText("NEXT", canvas.width / 2, canvas.height / 2 + 2.5 * gridSize);
                        }
                    } else if (winCondition == false) {
                        window.clearInterval(intervalID);
                    }
                    canvasGraphic.fillStyle = "rgba(0, 0, 0, 0.025)";
                    canvasGraphic.fillRect(0, 0, canvas.width, canvas.height);
                    actualAlpha += 0.025;
                },
                50);
        }, 500);
    }
}