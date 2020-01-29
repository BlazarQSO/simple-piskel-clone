import GIF from './library/gif';

function downloadGif() {
    const frames = document.getElementById('frames').children;
    const countFrames = frames.length;
    const fps = +document.getElementById('fps').textContent;
    const delay = Math.round(1000 / fps);

    const TAG_NUMBER = 0;
    const gif = new GIF({
        workers: 2,
        quality: 10,
        repeat: 0,
        width: frames[0].children[TAG_NUMBER].width,
        height: frames[0].children[TAG_NUMBER].height,
        background: "#f2f3f4",
    });

    for (let i = 0; i < countFrames; i += 1) {
        gif.addFrame(frames[i].children[TAG_NUMBER], { delay: delay });
    }
    gif.on('finished', (blob) => {
        const link = document.createElement("a");
        document.body.appendChild(link);
        link.href = URL.createObjectURL(blob);
        link.download = "imageApng.png";
        link.click();
        document.body.removeChild(link);
    });

    gif.render();
}

export { downloadGif }
