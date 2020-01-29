const tests = require('../src/components/services/servicesClass');

describe('getLocalStorageShortcuts function', () => {
    window.localStorage.clear();
    const allBtns = {
        "pencil": {
            id: "pencil",
            indicated: false,
            default: "P",
            current: "O",

            onClickHandler: function () {
                return () => {}
            },
        },
    }
    let resFunc;
    beforeEach(() => {
        resFunc = tests.servicesClass.getLocalStorageShortcuts;
    })

    window.document.body.innerHTML = `<div id="shortcut_pencil">D</div><div id="shortcuts"></div>
    <div id="pencil" data-tooltip="Pencil (X)"></div>`;
    window.document.body.className = "body";

    window.localStorage.setItem("data-tooltip", "Pencil (Z)");
    window.localStorage.setItem("pencil", "Z");

    it ('get key from localStorage', () => {
        resFunc(allBtns);
        expect(allBtns.pencil.current).toEqual("Z");
    })
    it ('get tooltip from localStorage', () => {
        expect(window.document.getElementById("pencil").getAttribute("data-tooltip")).toEqual("Pencil (Z)");
    })
});
