var inputText = document.getElementById("loadFrom");

inputText.value = "//create a node, (X, Y, TYPE)\ncreate(14, 2, UNIT)\ncreate(14, 5, AND)\ncreate(12, 9, INPUT)\ncreate(16, 9, INPUT)\n//connect nodes, (FROM, TO, SLOT)\nconnect(1, 0, 1)\nconnect(2, 1, 0)\nconnect(3, 1, 2)"




function loadFrom() {
    var inputTextArray = inputText.value.match(/[^\r\n]+/g);
    elements = new Array;

    if (inputTextArray && inputTextArray.length > 0) {
        inputTextArray.forEach(line => {
            if (/(create *\(\d+, *\d+, *.+?\))/i.test(line)) {
                var reg = /\((\d+), *(\d+), *(.+?)\)/;
                var match;
                if ((match = reg.exec(line)) !== null) {
                    createElement(parseInt(match[1]), parseInt(match[2]), match[3])
                }
            } else if (/(connect *\(\d+, *\d+, *[0-3]\))/i.test(line)) {
                var reg = /\((\d+), *(\d+), *([0-3])\)/;
                var match;
                if ((match = reg.exec(line)) !== null) {
                    connectElement(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]))
                }
            }
        });
        drawAllElements();
    }
}