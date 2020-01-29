const tests = require('../src/components/services/servicesClass');

describe('getLocalStorage function', () => {
    const tools = {
        "pencil": {
            id: "pencil",
            indicated: false,
            default: "P",
            current: "T",
            onClickHandler: function () {
                return () => { }
            },
        },
    }
    const buttons = {
        "fullScreen": {
            default: "U",
            current: "U",
            onClickHandler: function () {
                return () => fullScreen();
            }
        },
    }
    const frames = {
        "addFrame": {
            default: "N",
            current: "N",
            onClickHandler: function () {
                return () => Frames.addFrame();
            }
        },
    }
    let resFunc;
    beforeEach(() => {
        resFunc = tests.servicesClass.getLocalStorage;
    })
    window.document.body.innerHTML = `<div id="colorLeft"></div><div id="colorRight"></div>
    <div id="count"></div><input id="range" type="range" value="0"><div id="penSize1"></div>
    <div id="penSize2"></div><div id="penSize3"></div><div id="penSize4"></div>`;

    window.localStorage.setItem('colorRgbL', "rgb(20, 20, 20)");
    window.localStorage.setItem('colorRgbR', "rgb(100, 100, 100)");
    window.localStorage.setItem('count', 1);
    window.localStorage.setItem('fps', 10);
    it ('get fps from LocalStorage', () => {
            resFunc(frames, tools, buttons);
            expect(window.document.getElementById("range").value).toEqual('10');
    })
    it ('get size pen from LocalStorage', () => {
        expect(window.document.getElementById("count").textContent).toEqual('1');
    })
    it ('get color left from LocalStorage', () => {
        expect(window.document.getElementById("colorLeft").style.background).toEqual('rgb(20, 20, 20)');
    })
    it ('set color right from LocalStorage', () => {
        expect(window.document.getElementById('colorRight').style.background).toEqual('rgb(100, 100, 100)');
    })
});
