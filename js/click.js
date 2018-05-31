const overlap = 0.4;

document.getElementById("graphCanvas").addEventListener('click', (e) => {
    const pos = {
        x: e.pageX - e.currentTarget.offsetLeft,
        y: e.pageY - e.currentTarget.offsetTop
    };

    if (winCondition && panelActive) {
        if (pos.x - (canvas.width / 3 + gridSize) >= 0 && pos.y - (canvas.height / 2 - gridSize) >= 0 &&
            pos.x - (canvas.width / 3 * 2 - gridSize) < 0 && pos.y - (canvas.height / 2 + 0.5 * gridSize) < 0) {
            loadLast();
        } else if (currentID && getNextLevel() && pos.x - (canvas.width / 3 + gridSize) >= 0 && pos.y - (canvas.height / 2 + 1.5 * gridSize) >= 0 &&
            pos.x - (canvas.width / 3 * 2 - gridSize) < 0 && pos.y - (canvas.height / 2 + 3 * gridSize) < 0) {
            loadNext();
        }
    }

    elements.forEach(element => {
        if (isIntersect(pos, element)) {
            element.activeInputs[5] = !element.isActive;
            element.isActive = !element.isActive;

            drawAllElements();
        }
    });
});

function isIntersect(point, element) {
    if (element.type == "INPUT" &&
        (point.x - (element.x - overlap) * gridSize <= (element.width + 2 * overlap) * gridSize && point.x - (element.x - overlap) * gridSize >= 0) &&
        (point.y - (element.y - overlap) * gridSize <= (element.height + 2 * overlap) * gridSize && point.y - (element.y - overlap) * gridSize >= 0))
        return true;
}