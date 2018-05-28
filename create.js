var elements = new Array;


function demo() {
    elements = new Array;

    createElement(2, 0, "UNIT")
    createElement(2, 3, "OR")
    createElement(0, 6, "INPUT")
    createElement(4, 6, "INPUT")
    connectElement(1, 0, 1)
    connectElement(2, 1, 0)
    connectElement(3, 1, 2)

    createElement(10, 0, "UNIT")
    createElement(10, 3, "NOR")
    createElement(8, 6, "INPUT")
    createElement(12, 6, "INPUT")
    connectElement(5, 4, 1)
    connectElement(6, 5, 0)
    connectElement(7, 5, 2)

    createElement(18, 0, "UNIT")
    createElement(18, 3, "XOR")
    createElement(16, 6, "INPUT")
    createElement(20, 6, "INPUT")
    connectElement(9, 8, 1)
    connectElement(10, 9, 0)
    connectElement(11, 9, 2)

    createElement(26, 0, "UNIT")
    createElement(26, 3, "XNOR")
    createElement(24, 6, "INPUT")
    createElement(28, 6, "INPUT")
    connectElement(13, 12, 1)
    connectElement(14, 13, 0)
    connectElement(15, 13, 2)


    createElement(2, 9, "UNIT")
    createElement(2, 12, "AND")
    createElement(0, 15, "INPUT")
    createElement(4, 15, "INPUT")
    connectElement(17, 16, 1)
    connectElement(18, 17, 0)
    connectElement(19, 17, 2)

    createElement(10, 9, "UNIT")
    createElement(10, 12, "NAND")
    createElement(8, 15, "INPUT")
    createElement(12, 15, "INPUT")
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
    createElement(26, 12, "INPUT")
    createElement(24, 15, "INPUT")
    createElement(28, 15, "INPUT")
    connectElement(29, 28, 1)
    connectElement(30, 29, 0)
    connectElement(31, 29, 2)


    drawAllElements();
}


function simple() {
    elements = new Array;

    createElement(14, 1, "UNIT")
    createElement(8, 4, "OR")
    createElement(6, 8, "INPUT")
    createElement(10, 8, "INPUT")
    createElement(20, 4, "AND")
    createElement(18, 8, "INPUT")
    createElement(22, 8, "INPUT")
    createElement(14, 5, "AND")
    createElement(12, 11, "INPUT")
    createElement(16, 11, "INPUT")
    createElement(20, 11, "INPUT")
    createElement(6, 13, "INPUT")

    connectElement(1, 0, 0)
    connectElement(2, 1, 0)
    connectElement(3, 1, 2)
    connectElement(4, 0, 2)
    connectElement(5, 4, 0)
    connectElement(6, 4, 2)
    connectElement(7, 0, 1)
    connectElement(8, 7, 0)
    connectElement(9, 7, 2)
    connectElement(10, 8, 2)
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