const tests = require('../src/components/services/servicesClass');

describe('openShortcuts function', () => {
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
        resFunc = tests.servicesClass.openShortcuts;
    })
    window.document.body.innerHTML = `<div id="shortcut_pencil"></div><div id="shortcuts"></div>`;
    window.document.body.className = "body";

    it ('set P key', () => {
        setTimeout(() => {
            resFunc(allBtns);
            expect(window.document.getElementById("shortcut_pencil").textContent).toEqual("P");
        }, 100);
    })
});
