const tests = require('../src/components/services/servicesClass');

describe('getLocalStorageFrames function', () => {
    window.localStorage.clear();
    let resFunc;
    beforeEach(() => {
        resFunc = tests.servicesClass.getLocalStorageFrames;
    })

    window.document.body.innerHTML = `<ul id="frames"><li><div></div></li></ul><input type="radio" value=32 id="first" checked="true">`;
    window.localStorage.setItem('sizeCanvasId', 'first');

    it ('get frames from localStorage', () => {
        resFunc();
        expect(window.document.getElementById("frames").children.length).toEqual(1);
    })
});