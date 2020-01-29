function picker(picker, canvas, context) {
    if (!picker.indicated) {
        picker.indicated = true;
        document.getElementById(picker.id).classList.add("activeBtn");
        canvas.classList.add("cursor-picker");

        canvas.onmousedown = (e) => eventPicker(e, canvas, context);
    } else {
        canvas.classList.remove("cursor-picker");
        document.getElementById(picker.id).classList.remove("activeBtn");
        picker.indicated = false;
        document.onclick = "none";
    }
}

function eventPicker(e, canvas, context) {
    const canvasW = +getComputedStyle(canvas).width.replace("px", "");
    const canvasH = +getComputedStyle(canvas).height.replace("px", "");
    const devW = canvasW / canvas.width;
    const devH = canvasH / canvas.height;
    const pixelData = context.getImageData(e.offsetX / devH, e.offsetY / devW, 1, 1).data;

    let color = "rgba(" + pixelData[0] + "," + pixelData[1] + "," + pixelData[2] + "," + pixelData[3] / 255 + ")";
    const EMPTY_COLOR = "rgba(0,0,0,0)";
    const LEFT_MOUSE_BTN = 1;
    if (e.which === LEFT_MOUSE_BTN) {
        if (color !== EMPTY_COLOR) {
            document.getElementById("colorLeft").classList.remove("bg-default");
            document.getElementById("colorLeft").style.background = color;
        } else {
            document.getElementById("colorLeft").style = "none";
            document.getElementById("colorLeft").classList.add("bg-default");
        }
    } else {
        if (color !== EMPTY_COLOR) {
            document.getElementById("colorRight").classList.remove("bg-default");
            document.getElementById("colorRight").style.background = color;
        } else {
            document.getElementById("colorRight").style = "none";
            document.getElementById("colorRight").classList.add("bg-default");
        }
    }
}

export { picker }
