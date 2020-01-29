import UPNG from './library/UPNG';

function downloadApng() {
    const frames = document.getElementById('frames').children;
    const countFrames = frames.length;
    const fps = +document.getElementById('fps').textContent;
    let delay = 500;
    if (fps !== 0) {
        delay = Math.round(1000 / fps);
    }

    const TAG_NUMBER = 0;
    const FIRST_FRAME = 0;
    const width = frames[FIRST_FRAME].children[TAG_NUMBER].width;
    const height = frames[FIRST_FRAME].children[TAG_NUMBER].height;
    const arrImageData = [];

    for (let i = 0; i < countFrames; i += 1) {
        const ctx = frames[i].children[TAG_NUMBER].getContext('2d');
        const imgData = ctx.getImageData(0, 0, width, height)
        arrImageData[i] = imgData.data.buffer;
    }

    const data = UPNG.encode(arrImageData, width, height, 0, new Array(countFrames).fill(delay));
    const blob = new Blob([data], { type: 'image/apng' });

    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = URL.createObjectURL(blob);
    link.download = "imageApng.png";
    link.click();
    document.body.removeChild(link);
}

export { downloadApng }
