// document.getElementById("loadFrom").value = "//create a node, (X, Y, TYPE)\ncreate(14, 2, UNIT)\ncreate(14, 5, AND)\ncreate(12, 9, INPUT)\ncreate(16, 9, INPUT)\n//connect nodes, (FROM, TO, SLOT)\nconnect(1, 0, 1)\nconnect(2, 1, 0)\nconnect(3, 1, 2)"
document.getElementById("loadFrom").value = 'create (15, 6, "UNIT")\ncreate (15, 10, "AND")\ncreate (15, 14, "INPUT")\nconnect (1, 0, 1)\nconnect (2, 1, 0)\nconnect (2, 1, 2)';




function refreshLevelList() {
    var selectList = document.getElementById('levelSelect');
    var i;
    for (i = selectList.options.length - 1; i >= 0; i--) {
        selectList.remove(i);
    }

    var url = "https://rawgit.com/drLemis/Chipsweeper/master/level/levelList";

    fetch(url)
        .then(function(response) {
            response.text().then(function(text) {
                // console.log(text);
                text.match(/[^\r\n]+/g).forEach(element => {
                    var opt = document.createElement('option');
                    opt.value = element;
                    opt.innerHTML = element;
                    selectList.appendChild(opt);

                });

            });
        });

}


function openFrom(id) {
    var url = "https://rawgit.com/drLemis/Chipsweeper/master/level/" + id;
    var storedText;

    fetch(url)
        .then(function(response) {
            response.text().then(function(text) {
                storedText = text;
                done();
            });
        });

    function done() {
        loadFrom(storedText);
    }
}

function loadFrom(input) {
    var inputTextArray = input.match(/[^\r\n]+/g);
    elements = new Array;

    if (inputTextArray && inputTextArray.length > 0) {
        inputTextArray.forEach(line => {
            if (/(create *\(\d+, *\d+, *\"*.+?\"*\))/i.test(line)) {
                var reg = /\((\d+), *(\d+), *\"*(.+?)\"*\)/;
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