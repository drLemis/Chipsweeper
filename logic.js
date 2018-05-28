function checkActive(type, activeInputs) {
    result = false;
    if (activeInputs) {
        var active = activeInputs.filter(v => v).length;
        switch (type) {
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

            case "CLOCK":
                if (active != 0)
                    result = true;
                break;
            default:
                break;
        }
    }
    return result;
}