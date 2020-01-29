function plus() {
    let countWidth = +document.getElementById("count").textContent;
    const MAX_PIXEL = 64;
    const SIZE_PEN_BTN_MAX = 4;
    if (countWidth < MAX_PIXEL) {
        if (countWidth < SIZE_PEN_BTN_MAX) {
            document.getElementById("penSize" + countWidth).classList.remove("bg-widthLine");
            countWidth += 1;
            document.getElementById("penSize" + countWidth).classList.add("bg-widthLine");
        } else {
            countWidth += 1;
        }

        document.getElementById("count").textContent = countWidth;
    }
}

function minus() {
    let countWidth = +document.getElementById("count").textContent;
    const MAX_PEN_SIZE_BTN = 4;
    if (countWidth > 1) {
        if (countWidth <= MAX_PEN_SIZE_BTN) {
            document.getElementById("penSize" + countWidth).classList.remove("bg-widthLine");
            countWidth -= 1;
            document.getElementById("penSize" + countWidth).classList.add("bg-widthLine");
        } else {
            countWidth -= 1;
        }

        document.getElementById("count").textContent = countWidth;
    }
}

function changeSize(size) {
    document.getElementById("penSize1").classList.remove("bg-widthLine");
    document.getElementById("penSize2").classList.remove("bg-widthLine");
    document.getElementById("penSize3").classList.remove("bg-widthLine");
    document.getElementById("penSize4").classList.remove("bg-widthLine");
    document.getElementById("penSize" + size).classList.add("bg-widthLine");
    document.getElementById("count").textContent = size;
}

export {
    plus,
    minus,
    changeSize
}
