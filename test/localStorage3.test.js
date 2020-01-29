const tests = require('../src/components/services/servicesClass');


describe('setLocalStoragePartal function', () => {
    const tools = {
        "pencil": {
            id: "pencil",
            indicated: false,
            default: "P",
            current: "P",

            onClickHandler: function () {
                return () => { }
            },
        },
    }
    let resFunc;
    beforeEach(() => {
        resFunc = tests.servicesClass.setLocalStoragePartal;
    })

    window.document.body.innerHTML = `<div id="fps">10</div><div id="count">4</div>
    <div id="colorRight"></div><div id="colorLeft"></div>
    <div id="pencil" class="pencil selected"></div>`;
    window.document.getElementById("colorLeft").style.background = "rgba(0,0,0,255)";
    window.document.getElementById("colorRight").style.background = "rgba(255,255,255,255)";
    it ('set fps in LocalStorage', () => {
        setTimeout(() => {
            resFunc(tools);
            expect(window.localStorage.getItem("fps")).toEqual("10");
        }, 100);
    })
    it ('set size Pen in LocalStorage', () => {
        setTimeout(() => {
            expect(window.localStorage.getItem("sizePen")).toEqual("4");
        }, 100);
    })
    it ('set fps in LocalStorage', () => {
        setTimeout(() => {
            expect(window.localStorage.getItem("colorRgbL")).toEqual("rgb(0, 0, 0)");
        }, 100);
    })
    it ('set fps in LocalStorage', () => {
        setTimeout(() => {
            expect(window.localStorage.getItem("colorRgbR")).toEqual("rgb(255, 255, 255)");
        }, 100);
    })
    it ('set fps in LocalStorage', () => {
        setTimeout(() => {
            expect(window.localStorage.getItem("toolSelected")).toEqual("pencil");
        }, 100);
    })
});
