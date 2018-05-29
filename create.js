var elements = new Array;

function createElement(x, y, type) {
    var element = new Object();
    element.id = elements.length;

    element.x = x;
    element.y = y;

    element.type = type

    switch (type) {
        case "INPUT":
            element.width = 1;
            element.height = 1;
            break;
        default:
            element.width = 3;
            element.height = 2;
            break;
    }
    element.output = new Array;
    element.input = new Array;
    element.activeInputs = new Array;

    elements.push(element);
}

function connectElement(from, to, slot) {
    elements[from].output.push(to);
    elements[to].input[slot] = from;
}