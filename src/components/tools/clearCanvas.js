import { changeFPS } from '../toolsBox/changeFPS';

function clearCanvas(canvas, context) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    const asideCanvas = document.getElementById('asideCanvas');
    let asideContext = asideCanvas.getContext('2d');
    asideContext.clearRect(0, 0, canvas.width, canvas.height);

    const frames = document.getElementById('frames');
    let frame;
    for (let i = 0; i < frames.children.length; i += 1) {
        if (frames.children[i].classList.length === 2) {
            frame = frames.children[i];
        }
    }

    if (frame) {
        const TAG_NUMBER = 0;
        const frameCanvas = frame.children[TAG_NUMBER];
        const frameContext = frameCanvas.getContext('2d');
        frameContext.clearRect(0, 0, canvas.width, canvas.height);
    }
    changeFPS(0);
}

export { clearCanvas }
