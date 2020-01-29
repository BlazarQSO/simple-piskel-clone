import { servicesClass } from '../services/servicesClass';

function colorSwap(swaper, canvas, context) {
    if (!swaper.indicated) {
        swaper.indicated = true;
        canvas.classList.add("cursor-bucket");
        document.getElementById(swaper.id).classList.add("activeBtn");

        eventSwaper(canvas, context);
    } else {
        swaper.indicated = false;
        canvas.classList.remove("cursor-bucket");
        document.getElementById(swaper.id).classList.remove("activeBtn");
        canvas.onmousedown = "none";
    }
}

function eventSwaper(canvas, context) {
    canvas.onmousedown = function (e) {
        let x = e.offsetX;
        let y = e.offsetY;
        const canvasW = +getComputedStyle(canvas).width.replace("px", "");
        const canvasH = +getComputedStyle(canvas).height.replace("px", "");
        x = Math.trunc(x / (canvasW / canvas.width));
        y = Math.trunc(y / (canvasH / canvas.width));

        let imgData = context.getImageData(0, 0, canvas.width, canvas.width);

        const RGBA_ARGS = 4;

        let curColor = servicesClass.findColor(e);
        let colorPick = context.getImageData(x, y, 1, 1).data;
        let curRGBA = [
            colorPick[0],
            colorPick[1],
            colorPick[2],
            colorPick[3],
        ];

        for (let i = 0; i < imgData.data.length / RGBA_ARGS; i += 1) {
            if (imgData.data[i * 4] === curRGBA[0]
                && imgData.data[i * 4 + 1] === curRGBA[1]
                && imgData.data[i * 4 + 2] === curRGBA[2]
                && imgData.data[i * 4 + 3] === curRGBA[3]) {

                imgData.data[i * 4] = curColor[0];
                imgData.data[i * 4 + 1] = curColor[1];
                imgData.data[i * 4 + 2] = curColor[2];
                imgData.data[i * 4 + 3] = curColor[3];
            }
        }

        context.putImageData(imgData, 0, 0);
        servicesClass.drawIntoFrame(imgData);
    }
}

function findColor(e) {
    let curColor;
    const LEFT_MOUSE_BTN = 1;
    if (e.which === LEFT_MOUSE_BTN) {
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

export { colorSwap }
