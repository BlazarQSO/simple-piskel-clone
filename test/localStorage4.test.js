const tests = require('../src/components/services/servicesClass');

describe('closeShortcuts function', () => {
    const allBtns = {
        "pencil": {
            id: "pencil",
            indicated: false,
            default: "P",
            current: "T",

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
        resFunc = tests.servicesClass.closeShortcuts;
    })
    window.document.body.innerHTML = `<div id="shortcut_pencil">P</div><div id="shortcuts"></div>
    <div id="pencil" data-tooltip="Pencil (X)"></div>`;
    window.document.body.className = "body";

    it ('set P key to pencil current', () => {
        setTimeout(() => {
            resFunc(allBtns);
            expect(allBtns.pencil.current).toEqual("P");
        }, 100);
    })
    it ('set P key to tooltip', () => {
        setTimeout(() => {
            expect(window.document.getElementById("pencil").getAttribute("data-tooltip")).toEqual("Pencil (P)");
        }, 100);
    })
});