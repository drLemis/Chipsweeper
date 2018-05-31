function checkPushed(element) {
    var result = false;
    if (element.activeInputs[5]) {
        result = true;
    }
    return result;
}

function checkConnection(element) {
    if (element.output != undefined) {
        element.output.forEach(outputID => {
            for (let index = 0; index < elements[outputID].input.length; index++) {
                if (elements[outputID].input[index] == element.id)
                    elements[outputID].activeInputs[index] = checkActive(element);
            }
        });
    }
}

function checkActive(element) {
    result = false;
    if (element.activeInputs) {
        var active = element.activeInputs.filter(v => v).length;

        switch (element.type) {
            case "OR":
                if (active != 0)
                    result = true;
                break;
            case "XOR":
                if (active == 1)
                    result = true;
                break;
            case "NOR":
                if (active == 0)
                    result = true;
                break;
            case "XNOR":
                if (active != 1)
                    result = true;
                break;

            case "AND":
                if (active == 2)
                    result = true;
                break;
            case "NAND":
                if (active != 2)
                    result = true;
                break;

            case "INPUT":
                if (active != 0)
                    result = true;
                break;

            case "UNIT":
                if (element.input && active == element.input.filter(Boolean).length) {
                    result = true;
                    units[element.id] = true;
                } else {
                    units[element.id] = false;
                }
                break;
            default:
                break;
        }
    }
    return result;
}