import { changeFPS } from "./changeFPS";

function openFile(canvas, context) {
    document.getElementById('open').addEventListener('change', function () {
        const file = document.getElementById("open").files[0];
        const reader = new FileReader();
        reader.onloadend = function () {
            let img = new Image();
            img.src = reader.result;

            img.onload = function () {
                context.drawImage(img, 0, 0, canvas.width, canvas.width);
                const frames = document.getElementById('frames');
                const framesLength = frames.children.length;
                let frameNumberId = 0;
                for (let i = 0; i < framesLength; i += 1) {
                    if (frames.children[i].classList.length > 1) {
                        frameNumberId = i;
                        break;
                    }
                }
                const frameCanvas = frames.children[frameNumberId].children[0];
                frameCanvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.width);
                changeFPS(0);
            }
        }
        if (file) {
            reader.readAsDataURL(file);
        }
    }, true);
    document.getElementById('open').innerHTML = "";
}

export { openFile }
