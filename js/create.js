var elements = new Array;
var units = new Array;
var currentID;

function createElement(x, y, type) {
    winCondition = false
    var element = new Object();
    element.id = elements.length;

    element.x = x;
    element.y = y;

    element.type = type

    if (type == "INPUT") {
        element.width = 1;
        element.height = 1;
    } else {
        element.width = 3;
        element.height = 2;
    }

    element.output = new Array;
    element.input = new Array;
    element.activeInputs = new Array;

    elements.push(element);

    if (type == "UNIT") {
        units.push(element);
    }
}

function connectElement(from, to, slot) {
    elements[from].output.push(to);
    elements[to].input[slot] = from;
}