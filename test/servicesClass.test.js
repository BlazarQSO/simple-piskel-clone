const tests = require('../src/components/services/servicesClass');

describe('checkArrowRevers function', () => {
    let resFunc;
    beforeEach(() => {
        resFunc = tests.servicesClass.checkArrowRevers;
    })
    it ('To be defined', () => {
        expect(resFunc('N')).toBeDefined();
    })
    it ('Type of string', () => {
        expect(resFunc('2')).toEqual(expect.any(String));
    })
    it('The ↑ argument is accepted, its returned event.key length is more then 6 charachter', () => {
        expect(resFunc('↑').length).toBeGreaterThan(6);
    })
    it('The ↓ argument is accepted, its returned event.key length equal 9', () => {
        expect(resFunc('↓').length).toEqual(9);
    })
    it('The ← argument is accepted, its returned event.key includes "LEFT"', () => {
        expect(resFunc('←').includes('LEFT')).toBeTruthy();
    })
    it('The DELETE argument is accepted, its returned event.key will not be +', () => {
        expect(resFunc('DELETE').includes('+')).toBeFalsy();
    })
    it('The → argument is accepted, its returned event.key "ARROWRIGHT"', () => {
        expect(resFunc('←')).toMatch(/ARROWLEFT/);
    })
    it('The ↑ argument is accepted, its returned event.key "ARROWUP"', () => {
        expect(resFunc('↑')).toEqual('ARROWUP');
    })
});


describe('checkArrow function', () => {
    let resFunc;
    beforeEach(() => {
        resFunc = tests.servicesClass.checkArrow;
    })
    it ('To be defined', () => {
        expect(resFunc('E')).toBeDefined();
    })
    it ('Type of string', () => {
        expect(resFunc('0')).toEqual(expect.any(String));
    })
    it('The ARROWUP argument is accepted, its returned the symbol length is less then 2 charachter', () => {
        expect(resFunc('ARROWUP').length).toBeLessThan(2);
    })
    it('The ARROWDOWN argument is accepted, its returned the symbol is ↓', () => {
        expect(resFunc('ARROWDOWN')).toContain('↓');
    })
    it('The ARROWLEFT argument is accepted, its returned the symbol is ←', () => {
        expect(resFunc('ARROWLEFT').includes('←')).toBeTruthy();
    })
    it('The ARROWRIGHT argument is accepted, its returned the symbol is →', () => {
        expect(resFunc('ARROWRIGHT')).toEqual('→');
    })
    it('The ARROWUP argument is accepted, its returned the symbol is ↑', () => {
        expect(resFunc('ARROWUP')).toMatch(/↑/);
    })
});

describe('findColor function', () => {
    let resFunc;
    const e = {
        which: 1,
    }
    beforeEach(() => {
        resFunc = tests.servicesClass.findColor;
    })
    it ('Check left mouse button, rgba(0,0,255,255) => [0,0,255,255]', () => {
        window.document.body.innerHTML = `<div id="colorLeft">ok</div>`;
        window.document.getElementById("colorLeft").style.backgroundColor = "rgba(0, 0, 255, 255)";
        expect(resFunc(e)).toEqual([0, 0, 255, 255]);
    })
    it('Check right mouse button, rgba(0,0,0,0) => [0,0,0,0]', () => {
        window.document.body.innerHTML = `<div id="colorRight">ok</div>`;
        window.document.getElementById("colorRight").style.backgroundColor = "rgba(0, 0, 0, 0)";
        e.which = 2;
        expect(resFunc(e)).toEqual([0, 0, 0, 0]);
    })
});

describe('resetBtn function', () => {
    const tools = {
        "colorSwap": {
            id: "colorSwap",
            indicated: false,
            onClickHandler: function () {
                return () => {}
            },
        }
    }
    const id = "pen";
    let resFunc;
    beforeEach(() => {
        resFunc = tests.servicesClass.resetBtn;
    })
    it ('Check false indicated button', () => {
        expect(resFunc(tools, id)).toEqual(undefined);
    })
    it ('Check indicated button', () => {
        tools.colorSwap.indicated = true;
        expect(resFunc(tools, id)).toEqual(undefined);
    })
});


describe('onKeyDown function', () => {
    const allBtns = {
        "pencil": {
            id: "pencil",
            indicated: false,
            default: "P",
            current: "P",
            onClickHandler: function () {
                return () => {}
            },
        },
    }
    const e = {
        key: "P"
    }
    let resFunc;
    beforeEach(() => {
        resFunc = tests.servicesClass.onKeyDown;
    })

    it ('On key down P => pencil', () => {
        expect(resFunc(e, allBtns)).toEqual(true);
    })
    const e2 = { key : "A" };
    it ('On key down A => undefined', () => {
        expect(resFunc(e2, allBtns)).toEqual(undefined);
    })
});

describe('Bresenham line algorithm ', () => {
    let resFunc;
    beforeEach(() => {
        resFunc = tests.servicesClass.drawLine;
    })
    const x1 = 1, y1 = 2, x2 = 5, y2 = 7;
    const color = [255, 255, 0, 255], width = 1;
    const context = {
        createImageData: (a, b) => {
            return { data: [0, 0, 0, 0] };
        },
        putImageData: (a, b, c) =>{
            return {};
        }
    }

    it ('Bresenham line algorithm', () => {
        expect(resFunc(x1, y1, x2, y2, color, context, width)).toEqual(undefined);
    })
});
