let intervalHandler;

function changeFPS(keyChange) {
    clearInterval(intervalHandler);
    const labelFPS = document.getElementById('fps');
    const rangeInput = document.getElementById('range');
    let fps = Number(rangeInput.value);
    const MAX_FPS = 24;
    if (keyChange === -1 && fps >= 1) {
        fps += keyChange;
    } else if (keyChange === 1 && fps < MAX_FPS) {
        fps += keyChange;
    }

    labelFPS.innerHTML = fps;
    rangeInput.value = fps;
    let sideCanvas = document.getElementById('asideCanvas');
    let sideContext = sideCanvas.getContext('2d');

    const canvasWidth = document.getElementById('mainCanvas').width;
    const canvasHeight = document.getElementById('mainCanvas').height;

    if (fps === 0) {
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

export { changeFPS }
