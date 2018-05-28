var elements = new Array;

function test() {
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

    createElement(10, 6, "AND")
    connectElement(7, 0, 1)

    createElement(8, 12, "CLOCK")
    connectElement(8, 7, 0)
    createElement(12, 12, "CLOCK")
    connectElement(9, 7, 2)
    createElement(16, 12, "CLOCK")
    connectElement(10, 8, 2)
    createElement(2, 14, "CLOCK")
    connectElement(11, 8, 0)

    drawAllElements();
}


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