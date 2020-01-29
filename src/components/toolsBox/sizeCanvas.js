function sizeCanvas(radio, canvas, context) {
    let radioOrig = document.getElementById("r_original");
    if (radioOrig.checked) {
        const width = canvas.width;
        let imgData = context.getImageData(0, 0, width, width);
        canvas.width = radio.size.width;
        canvas.height = radio.size.height;
        context.putImageData(imgData, 0, 0);

        const asideCanvas = document.getElementById('asideCanvas');
        asideCanvas.width = radio.size.width;
        asideCanvas.height = radio.size.height;
        asideCanvas.getContext('2d').putImageData(imgData, 0, 0);

        frames = document.getElementById('frames').children;
        for (let i = 0; i < frames.length; i += 1) {
            const frame = frames[i].children[0];
            const frameContext = frame.getContext('2d');
            imgData = frameContext.getImageData(0, 0, width, width);
            frame.width = radio.size.width;
            frame.height = radio.size.height;
            frameContext.putImageData(imgData, 0, 0);
        }
    } else {
        let img = new Image();
        img.src = canvas.toDataURL();
        canvas.width = radio.size.width;
        canvas.height = radio.size.height;
        img.onload = function () {
            let coords = aspectsRatio(img.width, img.height, radio.size.width);
            context.drawImage(img, coords[0], coords[1], coords[2], coords[3]);
        }
    }
    document.getElementById(radio.id).checked = true;
}

function aspectsRatio(width, height, size) {
    let x1 = 0;
    let y1 = 0;
    let x2 = +size;
    let y2 = +size;
    if (width > height) {
        let ratio = height / width;
        width = size;
        height = Math.ceil(ratio * size);
        y1 = Math.ceil((size - height) / 2);
        y2 = height;
    } else {
        let ratio = width / height;
        height = size;
        width = Math.ceil(ratio * size);
        x1 = Math.ceil((size - width) / 2);
        x2 = width;
    }
    return [x1, y1, x2, y2];
}

export { sizeCanvas }
