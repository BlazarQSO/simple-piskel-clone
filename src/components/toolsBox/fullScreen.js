function fullScreen() {
    const checkScreen = document.getElementById("fullScreen").classList.length
    if (checkScreen > 1) {
        return;
    }
    document.getElementById("fullScreen").classList.add("startScreen");

    const widthCanvas = document.getElementById('mainCanvas').width;
    const heightCanvas = document.getElementById('mainCanvas').height;
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    const ALIGN_WIDTH = 20;
    const sizeNewWindow = `width=${innerWidth - ALIGN_WIDTH},height=${innerHeight},top=5,left=5`

    const newWin = window.open('about:blank', 'animation', sizeNewWindow);
    const body = newWin.document.body;

    const canvas = newWin.document.createElement('canvas');
    canvas.width = widthCanvas;
    canvas.height = heightCanvas;
    canvas.style.width = "45vw";
    canvas.style.height = "45vw";

    canvas.style.border = "2px solid goldenrod";
    canvas.style.backgroundColor = "rgba(100, 100, 100, 0.2)";
    canvas.style.marginLeft = "26vw";
    canvas.style.imageRendering = "pixelated";
    body.append(canvas);

    animation(canvas);

    newWin.onbeforeunload = function () {
        document.getElementById("fullScreen").classList.remove("startScreen");
    };
}

let intervalHandler;

function animation(canvas) {
    clearInterval(intervalHandler);
    const labelFPS = document.getElementById('fps');
    const rangeInput = document.getElementById('range');
    const fps = rangeInput.value;
    labelFPS.innerHTML = fps;

    let sideContext = canvas.getContext('2d');

    const canvasWidth = document.getElementById('mainCanvas').width;
    const canvasHeight = document.getElementById('mainCanvas').height;

    if (fps === "0") {
        const imgDataMainCanvas = document.getElementById('mainCanvas')
            .getContext('2d')
            .getImageData(0, 0, canvasWidth, canvasHeight);
        sideContext.putImageData(imgDataMainCanvas, 0, 0);
        return;
    }

    frames = document.getElementById('frames').children;
    const CANVAS_CHILD = 0;
    const dataImages = [];
    for (let i = 0; i < frames.length; i += 1) {
        dataImages[i] = frames[i].children[CANVAS_CHILD]
            .getContext('2d')
            .getImageData(0, 0, canvasWidth, canvasHeight);
    }

    let index = 0;
    const length = dataImages.length;
    intervalHandler = setInterval(function () {
        sideContext.putImageData(dataImages[index], 0, 0);
        index += 1;
        if (index === length) {
            index = 0;
        }
    }, 1000 / fps);
}


export { fullScreen }
