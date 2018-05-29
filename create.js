var elements = new Array;

function createElement(x, y, type) {
    var element = new Object();
    element.id = elements.length;

    element.x = x;
    element.y = y;

    element.width = 3;
    element.height = 2;
    element.type = type
    element.output;
    element.input = new Array;
    element.activeInputs = new Array;

    elements.push(element);
}

function connectElement(from, to, slot) {
    elements[from].output = to;
    elements[to].input[slot] = from;
}