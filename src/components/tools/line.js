import { servicesClass } from '../services/servicesClass';

function line(line, canvas, context) {
    if (!line.indicated) {
        document.getElementById(line.id).classList.add("activeBtn");
        canvas.classList.add("cursor-stroke");
        line.indicated = true;
        eventLine(canvas, context);
    } else {
        document.getElementById(line.id).classList.remove("activeBtn");
        canvas.classList.remove("cursor-stroke");
        canvas.onmousedown = "none";
        canvas.onmousemove = "none";
        line.indicated = false;
    }
}

function eventLine(canvas, context) {
    canvas.onmousedown = function (e) {
        const width = +document.getElementById("count").textContent;
        let oldX = e.offsetX;
        let oldY = e.offsetY;
        let newX = 0;
        let newY = 0;
        const canvasW = +getComputedStyle(canvas).width.replace("px", "");
        const canvasH = +getComputedStyle(canvas).height.replace("px", "");

        const canvasPrev = context.getImageData(0, 0, canvas.width, canvas.height);
        oldX = Math.trunc(oldX / (canvasW / canvas.width));
        oldY = Math.trunc(oldY / (canvasH / canvas.width));

        let curColor = servicesClass.findColor(e);
        servicesClass.setPixel(oldX, oldY, curColor, context, width);
        const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        servicesClass.drawIntoFrame(imgData);

        let start = false;
        canvas.onmousemove = function (e) {
            if (start) {
                newX = e.offsetX;
                newY = e.offsetY;
            } else {
                newX = e.offsetX;
                newY = e.offsetY;
                start = true;
            }

            newX = Math.trunc(newX / (canvasW / canvas.width));
            newY = Math.trunc(newY / (canvasH / canvas.width));

            context.putImageData(canvasPrev, 0, 0);
            servicesClass.drawLine(oldX, oldY, newX, newY, curColor, context, width);
            const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
            servicesClass.drawIntoFrame(imgData);
        };
    };

    canvas.addEventListener("mouseup", function () {
        canvas.onmousemove = "none";
    }, false);
}

export { line };
