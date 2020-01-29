import { servicesClass } from '../services/servicesClass';

function pencil(pencil, canvas, context) {
    if (!pencil.indicated) {
        document.getElementById(pencil.id).classList.add("activeBtn");
        canvas.classList.add("cursor-pencil");
        pencil.indicated = true;

        if (pencil.id !== "eraser") {
            eventPencil(canvas, context, false);
        } else {
            eventPencil(canvas, context, true);
        }
    } else {
        document.getElementById(pencil.id).classList.remove("activeBtn");
        canvas.classList.remove("cursor-pencil");
        canvas.onmousedown = "none";
        canvas.onmousemove = "none";
        pencil.indicated = false;
    }
}

function eventPencil(canvas, context, eraser) {
    canvas.onmousedown = function (e) {
        const width = +document.getElementById("count").textContent;
        let oldX = e.offsetX;
        let oldY = e.offsetY;
        let newX = 0;
        let newY = 0;
        const canvasW = +getComputedStyle(canvas).width.replace("px", "");
        const canvasH = +getComputedStyle(canvas).height.replace("px", "");

        oldX = Math.trunc(oldX / (canvasW / canvas.width));
        oldY = Math.trunc(oldY / (canvasH / canvas.width));

        let curColor = ["0", "0", "0", "0"];
        if (!eraser) {
            curColor = servicesClass.findColor(e);
        }

        servicesClass.setPixel(oldX, oldY, curColor, context, width);
        const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        servicesClass.drawIntoFrame(imgData);

        let start = false;
        canvas.onmousemove = function (e) {
            if (start) {
                oldX = newX;
                oldY = newY;
                newX = e.offsetX;
                newY = e.offsetY;
            } else {
                newX = e.offsetX;
                newY = e.offsetY;
                start = true;
            }

            newX = Math.trunc(newX / (canvasW / canvas.width));
            newY = Math.trunc(newY / (canvasH / canvas.width));

            servicesClass.drawLine(oldX, oldY, newX, newY, curColor, context, width);
            const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
            servicesClass.drawIntoFrame(imgData);
        };
    };

    canvas.addEventListener("mouseup", function () {
        canvas.onmousemove = "none";
    }, false);
}

export { pencil };
