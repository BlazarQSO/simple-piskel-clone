import { servicesClass } from '../services/servicesClass';

function bucket(bucket, canvas, context) {
    if (!bucket.indicated) {
        bucket.indicated = true;
        document.getElementById(bucket.id).classList.add("activeBtn");
        canvas.classList.add("cursor-bucket");
        const canvasW = +getComputedStyle(canvas).width.replace("px", "");
        const canvasH = +getComputedStyle(canvas).height.replace("px", "");

        eventBucket(canvas, context, canvasW, canvasH);
    } else {
        bucket.indicated = false;
        document.getElementById("bucket").classList.remove("activeBtn");
        canvas.classList.remove("cursor-bucket");
        canvas.onmousedown = "none";
    }
}

function eventBucket(canvas, context, canvasW, canvasH) {
    canvas.onmousedown = function (e) {
        let x = e.offsetX;
        let y = e.offsetY;
        x = Math.trunc(x / (canvasW / canvas.width));
        y = Math.trunc(y / (canvasH / canvas.width));
        let color;
        if (e.which === 1) {
            color = getComputedStyle(document.getElementById("colorLeft")).backgroundColor;
        } else {
            color = getComputedStyle(document.getElementById("colorRight")).backgroundColor;
        }

        color = color.match(/\d{1,3}/g);
        let rgba = [
            +color[0],
            +color[1],
            +color[2],
            255,
        ];
        let curColor = context.getImageData(x, y, 1, 1).data;
        let curRGBA = [
            curColor[0],
            curColor[1],
            curColor[2],
            curColor[3],
        ];

        if (rgba[0] === curRGBA[0] && rgba[1] === curRGBA[1]
            && rgba[2] === curRGBA[2] && rgba[3] === curRGBA[3]) {
            return;
        }

        painting([x, y], canvas.width, context, curRGBA, rgba);
    }
}

function painting(point, canvasWidth, context, curRGBA, rgba) {
    let imgData = context.getImageData(0, 0, canvasWidth, canvasWidth);
    const dataWidth = canvasWidth * rgba.length;
    let stack = [];
    stack.push(point);
    let drawn = [];
    while (stack.length > 0) {
        let curPoint = stack.pop();
        let res = drawn.find((element) => {
            return element[0] === curPoint[0] && element[1] === curPoint[1];
        });
        if (res === undefined) {
            drawn.push(curPoint);
        }
        else {
            continue;
        }
        let leftX = curPoint[0] - 1;
        if (leftX >= 0 && leftX < canvasWidth) {
            if (checkColor(imgData.data, dataWidth, leftX, curPoint[1], curRGBA)) {
                if (!drawn.includes([leftX, curPoint[1]])) {
                    stack.push([leftX, curPoint[1]]);
                }
            }
        }
        let rightX = curPoint[0] + 1;
        if (rightX >= 0 && rightX < canvasWidth) {
            if (checkColor(imgData.data, dataWidth, rightX, curPoint[1], curRGBA)) {
                if (!drawn.includes([rightX, curPoint[1]])) {
                    stack.push([rightX, curPoint[1]]);
                }
            }
        }
        let topY = curPoint[1] - 1;
        if (topY >= 0 && topY < canvasWidth) {
            if (checkColor(imgData.data, dataWidth, curPoint[0], topY, curRGBA)) {
                if (!drawn.includes([curPoint[0], topY])) {
                    stack.push([curPoint[0], topY]);
                }
            }
        }
        let botY = curPoint[1] + 1;
        if (botY >= 0 && botY < canvasWidth) {
            if (checkColor(imgData.data, dataWidth, curPoint[0], botY, curRGBA)) {
                if (!drawn.includes([curPoint[0], botY])) {
                    stack.push([curPoint[0], botY]);
                }
            }
        }

        const curIndex = (curPoint[1] * dataWidth) + curPoint[0] * rgba.length;
        imgData.data[curIndex] = rgba[0];
        imgData.data[curIndex + 1] = rgba[1];
        imgData.data[curIndex + 2] = rgba[2];
        imgData.data[curIndex + 3] = rgba[3];
    }

    context.putImageData(imgData, 0, 0);
    servicesClass.drawIntoFrame(imgData);
}

function checkColor(imgData, dataWidth, x, y, curRGBA) {
    const curIndex = (y * dataWidth) + x * curRGBA.length;
    return imgData[curIndex] === curRGBA[0]
        && imgData[curIndex + 1] === curRGBA[1]
        && imgData[curIndex + 2] === curRGBA[2]
        && imgData[curIndex + 3] === curRGBA[3]
}

export { bucket }
