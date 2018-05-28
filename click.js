document.getElementById("graphCanvas").addEventListener('click', (e) => {
    const pos = {
        x: e.pageX - e.currentTarget.offsetLeft,
        y: e.pageY - e.currentTarget.offsetTop
    };

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
        (point.x - element.x * gridSize <= element.width * gridSize && point.x - element.x * gridSize >= 0) &&
        (point.y - element.y * gridSize <= element.height * gridSize && point.y - element.y * gridSize >= 0))
        return true;
}