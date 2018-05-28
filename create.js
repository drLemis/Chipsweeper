var elements = new Array;

function test() {
    elements = new Array;

    createElement(2, 0, "UNIT")
    createElement(2, 3, "OR")
    createElement(0, 6, "CLOCK")
    createElement(4, 6, "CLOCK")
    connectElement(1, 0, 1)
    connectElement(2, 1, 0)
    connectElement(3, 1, 2)

    createElement(10, 0, "UNIT")
    createElement(10, 3, "NOR")
    createElement(8, 6, "CLOCK")
    createElement(12, 6, "CLOCK")
    connectElement(5, 4, 1)
    connectElement(6, 5, 0)
    connectElement(7, 5, 2)

    createElement(18, 0, "UNIT")
    createElement(18, 3, "XOR")
    createElement(16, 6, "CLOCK")
    createElement(20, 6, "CLOCK")
    connectElement(9, 8, 1)
    connectElement(10, 9, 0)
    connectElement(11, 9, 2)

    createElement(26, 0, "UNIT")
    createElement(26, 3, "XNOR")
    createElement(24, 6, "CLOCK")
    createElement(28, 6, "CLOCK")
    connectElement(13, 12, 1)
    connectElement(14, 13, 0)
    connectElement(15, 13, 2)


    createElement(2, 9, "UNIT")
    createElement(2, 12, "AND")
    createElement(0, 15, "CLOCK")
    createElement(4, 15, "CLOCK")
    connectElement(17, 16, 1)
    connectElement(18, 17, 0)
    connectElement(19, 17, 2)

    createElement(10, 9, "UNIT")
    createElement(10, 12, "NAND")
    createElement(8, 15, "CLOCK")
    createElement(12, 15, "CLOCK")
    connectElement(21, 20, 1)
    connectElement(22, 21, 0)
    connectElement(23, 21, 2)

    createElement(18, 9, "HEAD")
    createElement(18, 12, "BODY")
    createElement(16, 15, "LEG")
    createElement(20, 15, "LEG")
    connectElement(25, 24, 1)
    connectElement(26, 25, 0)
    connectElement(27, 25, 2)


    createElement(26, 9, "UNIT")
    createElement(26, 12, "CLOCK")
    createElement(24, 15, "CLOCK")
    createElement(28, 15, "CLOCK")
    connectElement(29, 28, 1)
    connectElement(30, 29, 0)
    connectElement(31, 29, 2)


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