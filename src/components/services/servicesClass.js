import { sortcutsId } from '../objects/shortcutsId';
import { Frames } from '../frames/frames';
import { changeFPS } from '../toolsBox/changeFPS';

class servicesClass {
    static resetBtn(tools, id) {
        for (let key in tools) {
            if (key !== id && tools[key].indicated) {
                tools[key].onClickHandler()();
            }
        }
    }

    static findColor(e) {
        let curColor;
        if (e.which === 1) {
            curColor = getComputedStyle(document.getElementById("colorLeft")).backgroundColor;
        } else {
            curColor = getComputedStyle(document.getElementById("colorRight")).backgroundColor;
        }
        curColor = curColor.match(/\d{1,3}/g);
        let alpha = 255;
        if (curColor[3] !== undefined) {
            alpha = +curColor[3];
        }
        const rgba = [
            +curColor[0],
            +curColor[1],
            +curColor[2],
            alpha,
        ];
        return rgba;
    }

    static drawIntoFrame(imageData) {
        const frames = document.getElementById('frames');
        let frame;
        for (let i = 0; i < frames.children.length; i += 1) {
            if (frames.children[i].classList.length === 2) {
                frame = frames.children[i];
            }
        }

        const TAG_NUMBER = 0;
        const frameCanvas = frame.children[TAG_NUMBER];
        const frameContext = frameCanvas.getContext('2d');
        frameContext.putImageData(imageData, 0, 0);

        const asideCanvas = document.getElementById('asideCanvas');
        let asideContext = asideCanvas.getContext('2d');
        asideContext.putImageData(imageData, 0, 0);
    }

    static setDefaultShortcuts(allBtns) {
        let shortcutId = '';
        let keyPress = '';
        for (let key in allBtns) {
            shortcutId = "shortcut_" + key;
            if (sortcutsId.includes(shortcutId)) {
                keyPress = servicesClass.checkArrow(allBtns[key]["default"]);
                document.getElementById(shortcutId).textContent = keyPress;
            }
        }
    }

    static onKeyDown(e, allBtns) {
        for (let key in allBtns) {
            let keyPress = e.key.toUpperCase();

            if (keyPress === allBtns[key]["current"]) {
                allBtns[key].onClickHandler()();
                return true;
            }
        }
    }

    // Bresenham's line algorithm

    static plot(x, y, context, width) {
        if (isFinite(x) && isFinite(y)) {
            servicesClass.setPixel(x, y, servicesClass.plot.color, context, width);
        }
    }

    static setPixel(x, y, color, context, width) {
        let point = context.createImageData(width, width);
        const RGBA_ARGS = 4;
        for (let i = 0; i < point.data.length / RGBA_ARGS; i++) {
            point.data[i * 4] = color[0];
            point.data[i * 4 + 1] = color[1];
            point.data[i * 4 + 2] = color[2];
            point.data[i * 4 + 3] = color[3];
        }

        x = x - Math.trunc(width / 2);
        y = y - Math.trunc(width / 2);
        context.putImageData(point, x, y);
    }

    static drawLine(x1, y1, x2, y2, color, context, width) {
        if (color) {
            servicesClass.plot.color = color;
        } else {
            servicesClass.plot.color = [0, 0, 0, 0];
        }
        let deltaX = Math.abs(x2 - x1);
        let deltaY = Math.abs(y2 - y1);
        let signX = x1 < x2 ? 1 : -1;
        let signY = y1 < y2 ? 1 : -1;

        let error = deltaX - deltaY;

        servicesClass.plot(x2, y2, context, width);
        while (x1 != x2 || y1 != y2) {
            servicesClass.plot(x1, y1, context, width);
            let error2 = error * 2;

            if (error2 > -deltaY) {
                error -= deltaY;
                x1 += signX;
            }
            if (error2 < deltaX) {
                error += deltaX;
                y1 += signY;
            }
        }
    }

    // Shortcuts

    static inputShortcuts(e) {
        const curId = e.target.id;
        const curInput = document.getElementById(curId);
        if (sortcutsId.includes(curId)) {
            sortcutsId.map((id) => {
                if (id !== curId) {
                    document.getElementById(id).classList.remove('selectedShortcut');
                }
            });

            curInput.classList.add('selectedShortcut');
            curInput.onkeydown = function (e) {
                let keyPress = e.key.toUpperCase();
                const ENTER = "ENTER";
                const SPACE = ' ';
                if (!e.ctrlKey && !e.shiftKey && !e.altKey && keyPress !== ENTER && keyPress !== SPACE) {
                    keyPress = servicesClass.checkArrow(keyPress);
                    curInput.innerHTML = keyPress;
                    sortcutsId.map((id) => {
                        if (document.getElementById(id).innerHTML === keyPress && id !== curId) {
                            document.getElementById(id).innerHTML = "???";
                        }
                    })
                    curInput.classList.remove('selectedShortcut');
                    curInput.onkeydown = null;
                }
            }
        }
    }

    static openShortcuts(allBtns) {
        document.getElementById("shortcuts").style.display = "block";
        document.querySelector(".body").onkeydown = null;

        let shortcutId = '';
        let keyPress = '';
        for (let key in allBtns) {
            shortcutId = "shortcut_" + key;
            if (sortcutsId.includes(shortcutId)) {
                keyPress = servicesClass.checkArrow(allBtns[key].current);
                document.getElementById(shortcutId).textContent = keyPress;
            }
        }
    }

    static closeShortcuts(frames, tools, buttons) {
        const allBtns = Object.assign(frames, tools, buttons);
        let shortcutId = '';
        let keyPress = '';
        for (let key in allBtns) {
            shortcutId = "shortcut_" + key;
            if (sortcutsId.includes(shortcutId)) {
                keyPress = servicesClass.checkArrowRevers(document.getElementById(shortcutId).textContent);
                allBtns[key].current = keyPress;

                const ATTRIBUTE = "data-tooltip";
                const elem = document.getElementById(key);
                if (elem !== null && elem.hasAttribute(ATTRIBUTE)) {
                    let titleAtt = elem.getAttribute(ATTRIBUTE);
                    const indexCut = titleAtt.indexOf('(');
                    titleAtt = titleAtt.substr(0, indexCut + 1) + keyPress + ")";
                    elem.setAttribute(ATTRIBUTE, titleAtt)
                }
            }
        }

        document.getElementById("shortcuts").style.display = "none";
        document.querySelector(".body").onkeydown = (e) => servicesClass.onKeyDown(e, frames, buttons, tools);
    }

    static checkArrowRevers(keyPress) {
        switch (keyPress) {
            case "↑": {
                keyPress = "ARROWUP";
                break;
            }
            case "↓": {
                keyPress = "ARROWDOWN";
                break;
            }
            case "←": {
                keyPress = "ARROWLEFT";
                break;
            }
            case "→": {
                keyPress = "ARROWRIGHT";
                break;
            }
        }
        return keyPress;
    }

    static checkArrow(keyPress) {
        switch (keyPress) {
            case "ARROWUP": {
                keyPress = "↑";
                break;
            }
            case "ARROWDOWN": {
                keyPress = "↓";
                break;
            }
            case "ARROWLEFT": {
                keyPress = "←";
                break;
            }
            case "ARROWRIGHT": {
                keyPress = "→";
                break;
            }
        }
        return keyPress;
    }

    // localStorage

    static setLocalStorage(frames, tools, buttons) {
        return () => {
            localStorage.clear();
            const colorLeft = document.getElementById("colorLeft").style.background;
            localStorage.setItem("colorRgbL", colorLeft);
            const colorRight = document.getElementById("colorRight").style.background;
            localStorage.setItem("colorRgbR", colorRight);
            const sizePen = document.getElementById("count").textContent;
            localStorage.setItem("sizePen", sizePen);
            const fps = document.getElementById('fps').textContent;
            localStorage.setItem("fps", fps);

            for (let key in tools) {
                if (document.getElementById(key).classList.length > 1) {
                    const toolsId = key;
                    localStorage.setItem("toolSelected", toolsId);
                    break;
                }
            }

            if (document.getElementById("r_first").checked) {
                localStorage.setItem("sizeCanvasId", "r_first");
            } else if (document.getElementById("r_second").checked) {
                localStorage.setItem("sizeCanvasId", "r_second");
            } else {
                localStorage.setItem("sizeCanvasId", "r_third");
            }

            const framesList = document.getElementById("frames").children;
            const lengthFrames = framesList.length;
            localStorage.setItem("lengthFrames", lengthFrames);
            for (let i = 0; i < lengthFrames; i += 1) {
                const TAG_NUMBER = 0;
                const frame = framesList[i].children[TAG_NUMBER];
                localStorage.setItem(i, frame.toDataURL());
                if (frame.classList.length > 1) {
                    localStorage.setItem("selectedFrame", i);
                }
            }

            const allBtns = Object.assign(frames, tools, buttons);
            let shortcutId = '';
            for (let key in allBtns) {
                shortcutId = "shortcut_" + key;
                if (sortcutsId.includes(shortcutId)) {
                    localStorage.setItem(key, allBtns[key]["current"]);
                }
            }
        }
    }

    static getLocalStorage(frames, tools, buttons) {
        let colorLeft = localStorage.getItem("colorRgbL") || null;
        if (colorLeft !== null) {
            document.getElementById("colorLeft").style.background = colorLeft;
        }
        let colorRight = localStorage.getItem("colorRgbR") || null;
        if (colorRight !== null) {
            document.getElementById("colorRight").style.background = colorRight;
        }
        let sizePen = localStorage.getItem("sizePen");
        if (sizePen !== null) {
            document.getElementById("count").textContent = sizePen;
            if (sizePen === "1") {
                document.getElementById("penSize1").classList.add("bg-widthLine");
            } else if (sizePen === "2") {
                document.getElementById("penSize2").classList.add("bg-widthLine");
            } else if (sizePen === "3") {
                document.getElementById("penSize3").classList.add("bg-widthLine");
            } else {
                document.getElementById("penSize4").classList.add("bg-widthLine");
            }
        } else {
            document.getElementById("count").textContent = "1";
            document.getElementById("penSize1").classList.add("bg-widthLine");
        }
        const fps = localStorage.getItem('fps');
        document.getElementById('range').value = fps;

        let toolSelected = localStorage.getItem("toolSelected");
        if (toolSelected !== null) {
           tools[toolSelected].onClickHandler()();
        } else {
           tools.pencil.onClickHandler()();
        }

        const allBtns = Object.assign(frames, tools, buttons);
        servicesClass.getLocalStorageShortcuts(allBtns);
    }

    static getLocalStorageShortcuts(allBtns) {
        let shortcutId = '';
        let shortcut = null;
        for (let key in allBtns) {
            shortcutId = "shortcut_" + key;
            if (sortcutsId.includes(shortcutId)) {
                shortcut = localStorage.getItem(key);
                if (shortcut !== null && shortcut !== '') {
                    allBtns[key]["current"] = shortcut;

                    const ATTRIBUTE = "data-tooltip";
                    const elem = document.getElementById(key);
                    if (elem !== null && elem.hasAttribute(ATTRIBUTE)) {
                        let titleAtt = elem.getAttribute(ATTRIBUTE);
                        const indexCut = titleAtt.indexOf('(');
                        titleAtt = titleAtt.substr(0, indexCut + 1) + shortcut + ")";
                        elem.setAttribute(ATTRIBUTE, titleAtt)
                    }
                }
            }
        }
    }

    static getLocalStorageFrames() {
        const sizeCanvasId = localStorage.getItem("sizeCanvasId");
        let width = 128;
        if (sizeCanvasId !== null) {
            document.getElementById(sizeCanvasId).checked = true;
            width = document.getElementById(sizeCanvasId).value;
        }

        const DEFAULT_INDEX = 0;
        let dataUrl = localStorage.getItem(DEFAULT_INDEX);

        if (dataUrl !== null) {
            const framesList = document.getElementById("frames").children;
            const defaultCanvas = framesList[DEFAULT_INDEX].children[DEFAULT_INDEX];
            defaultCanvas.width = width;
            defaultCanvas.height = width;
            let defaultContext = defaultCanvas.getContext('2d');

            let imgFirst = new Image;
            imgFirst.src = dataUrl;
            imgFirst.onload = function () {
                defaultContext.drawImage(imgFirst, 0, 0);
            }

            const lengthFrames = localStorage.getItem("lengthFrames");
            for (let i = 1; i < lengthFrames; i += 1) {
                dataUrl = localStorage.getItem(i);
                Frames.addFrame(undefined, dataUrl, width);
            }

            const mainCanvas = document.getElementById("mainCanvas");
            mainCanvas.width = width;
            mainCanvas.height = width;
            const mainContext = mainCanvas.getContext('2d');

            const asideCanvas = document.getElementById("asideCanvas");
            asideCanvas.width = width;
            asideCanvas.height = width;
            const asideContext = asideCanvas.getContext('2d');
            let imgLast = new Image;
            imgLast.src = dataUrl;
            imgLast.onload = function () {
                mainContext.drawImage(imgLast, 0, 0);
                asideContext.drawImage(imgLast, 0, 0);
                changeFPS(0);
            }
        }
    }

    static openEditor() {
        document.getElementById("landing").style.display = "none";
        document.getElementById("main").style.display = "flex";
    }
}

export { servicesClass }
