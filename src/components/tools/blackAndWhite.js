import { changeFPS } from '../toolsBox/changeFPS';

function blackAndWhite(canvas, context, callBackDrawIntoFrame) {
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    const RGBA_ARGS = 4;
    for (let i = 0; i < data.length; i += RGBA_ARGS) {
        let mid = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = mid;
        data[i + 1] = mid;
        data[i + 2] = mid;
    }
    context.putImageData(imageData, 0, 0);
    callBackDrawIntoFrame(imageData);
    changeFPS(0);
}

export { blackAndWhite }
