const tests = require('../src/components/services/servicesClass');

describe('setDefaultShortcuts function', () => {
    const allBtns = {
        "pencil": {
            id: "pencil",
            indicated: false,
            default: "P",
            current: "P",

            onClickHandler: function () {
                return () => {
                    servicesClass.resetBtn(tools, this.id);
                    pencil(this, canvas, context);
                }
            },
        },
    }
    let resFunc;
    beforeEach(() => {
        resFunc = tests.servicesClass.setDefaultShortcuts;
    })
    window.document = innerHeight = "";
    window.document.body.innerHTML = `<div id="shortcut_pencil"></div>`;
    it ('set default shortcuts P key', () => {
        resFunc(allBtns);
        expect(window.document.getElementById("shortcut_pencil").textContent).toEqual("P");
    })
});
