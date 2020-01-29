import { changeFPS } from "../toolsBox/changeFPS";

class Frames {

    static addFrame(frameId, dataUrl, width) {
        const frames = document.getElementById('frames');

        let orderNumber = frames.childElementCount + 1;
        if (frameId !== undefined) {
            const INTEGER_IN_ID = 1;
            orderNumber = +frameId.split('_')[INTEGER_IN_ID] + 1;
        }
        const li = document.createElement('li');
        li.id = "frm_" + orderNumber;
        li.className = "main--aside-frames-wrap-item";
        li.classList.add('selected');

        for (let i = 0; i < frames.children.length; i += 1) {
            frames.children[i].classList.remove('selected');
        }

        const canvasWidth = document.getElementById('mainCanvas').width;
        const canvasHeight = document.getElementById('mainCanvas').height;
        const newCanvas = document.createElement('canvas');
        newCanvas.width = canvasWidth;
        newCanvas.height = canvasHeight;
        newCanvas.id = "frmCanvas_" + orderNumber;
        newCanvas.className = "main--aside-frames-wrap-item-canvas";

        const btnNumber = document.createElement('button');
        btnNumber.id = "frmNumber_" + orderNumber;
        btnNumber.className = "main--aside-frames-wrap-item-toggle";
        btnNumber.textContent = orderNumber;

        const btnDelete = document.createElement('button');
        btnDelete.id = "frmDelete_" + orderNumber;
        btnDelete.className = "main--aside-frames-wrap-item-delete";
        btnDelete.onclick = Frames.deleteFrame(btnDelete.id);

        const btnDuplicate = document.createElement('button');
        btnDuplicate.id = "frmDuplicate_" + orderNumber;
        btnDuplicate.className = "main--aside-frames-wrap-item-duplicate";
        btnDuplicate.onclick = Frames.duplicateFrame(btnDuplicate.id);

        const divDD = document.createElement('div');
        divDD.id = "frmDD_" + orderNumber;
        divDD.className = "main--aside-frames-wrap-item-dd";
        divDD.onmousedown = (e) => Frames.dragFrame(e, divDD.id);

        li.append(newCanvas);
        li.append(btnNumber);
        li.append(btnDelete);
        li.append(btnDuplicate);
        li.append(divDD);

        if (frameId === undefined) {
            frames.append(li);
            document.getElementById('mainCanvas').getContext('2d').clearRect(0, 0, canvasWidth, canvasHeight);
            document.getElementById('asideCanvas').getContext('2d').clearRect(0, 0, canvasWidth, canvasHeight);
        } else {
            frames.insertBefore(li, frames.children[orderNumber - 1]);
        }

        Frames.addDataInFrame(dataUrl, width, newCanvas);
        return orderNumber;
    }

    static addDataInFrame(dataUrl, width, canvas) {
        if (dataUrl !== undefined && width !== undefined) {
            canvas.width = width;
            canvas.height = width;
            let context = canvas.getContext('2d');
            let img = new Image;
            img.src = dataUrl;
            img.onload = () => context.drawImage(img, 0, 0);
        }
        changeFPS(0);
    }

    static deleteFrame(id, keyPress) {
        return () => {
            const frames = document.getElementById('frames');
            let numberId = 0;
            if (frames.childElementCount > 1) {
                if (keyPress) {
                    for (let i = 0; i < frames.children.length; i += 1) {
                        if (frames.children[i].classList.length > 1) {
                            numberId = i + 1;
                            document.getElementById('frmDelete_' + numberId).parentNode.remove();
                        }
                    }
                } else {
                    document.getElementById(id).parentNode.remove();
                    numberId = +id.replace('frmDelete_', '');
                }
                Frames.rewriteId(numberId, frames);

                if (keyPress) {
                    Frames.drawSelected(numberId, frames.children.length);
                }
            }
            changeFPS(0);
        }
    }

    static duplicateFrame(frameId, keyPress) {
        return () => {
            const frames = document.getElementById('frames');
            if (keyPress) {
                for (let i = 0; i < frames.children.length; i += 1) {
                    if (frames.children[i].classList.length > 1) {
                        frameId = frames.children[i].id
                    }
                }
            }
            const orderNumber = Frames.addFrame(frameId);
            this.rewriteId(orderNumber, frames);

            const TAG_NUMBER = 0;
            const canvasWidth = document.getElementById('mainCanvas').width;
            const canvasHeight = document.getElementById('mainCanvas').height;
            const DIFF_PREV_ID = 2;
            const contextPrev = frames.children[orderNumber - DIFF_PREV_ID].children[TAG_NUMBER].getContext('2d');
            const imageData = contextPrev.getImageData(0, 0, canvasWidth, canvasHeight);

            frames.children[orderNumber - 1].children[TAG_NUMBER].getContext('2d').putImageData(imageData, 0, 0);
            document.getElementById('mainCanvas').getContext('2d').putImageData(imageData, 0, 0);
            changeFPS(0);
        }
    }

    static dragFrame(event, frameId) {
        let currentDroppable = null;

        const drag = document.getElementById(frameId);
        const parent = drag.parentNode;
        const clone = parent.cloneNode(true);
        parent.classList.add('dragStyle');

        const canvasChild = 0;
        const parentCanvasId = parent.children[canvasChild].id;
        const parentCanvas = document.getElementById(parentCanvasId);
        let parentContext = parentCanvas.getContext('2d');
        const canvasWidth = document.getElementById('mainCanvas').width;
        const canvasHeight = document.getElementById('mainCanvas').height;
        let imgDataParent = parentContext.getImageData(0, 0, canvasWidth, canvasHeight);
        clone.children[canvasChild].style.marginLeft = "-22px";

        let cloneContext = clone.children[canvasChild].getContext('2d');
        cloneContext.putImageData(imgDataParent, 0, 0);

        clone.style.left = getComputedStyle(parent).left;
        clone.style.top = getComputedStyle(parent).top;

        let shiftX = event.clientX - parent.getBoundingClientRect().left;
        let shiftY = event.clientY - parent.getBoundingClientRect().top;

        clone.classList.add('clone');
        document.body.append(clone);

        moveAt(event.pageX, event.pageY);

        function moveAt(pageX, pageY) {
            const LIMIT_LEFT_PX = 120;
            const LIMIT_RIGHT_PX = 250;
            const ALIGN_X = 7;
            const ALIGN_Y = 10;
            const curX = pageX - shiftX - ALIGN_X;
            const LIMIT_BOTTOM = window.innerHeight - 140;
            const LIMIT_TOP = 0;
            const curY = pageY - shiftY - ALIGN_Y;

            if (curX > LIMIT_LEFT_PX && curX < LIMIT_RIGHT_PX) {
              clone.style.left = `${curX}px`;
            }
            if (curY < LIMIT_BOTTOM && curY > LIMIT_TOP) {
              clone.style.top = `${curY}px`;
            }
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);

            clone.hidden = true;
            let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            clone.hidden = false;

            if (!elemBelow) return;

            let droppableBelow = elemBelow.closest("li");
            if (currentDroppable !== droppableBelow) {
                if (currentDroppable) {
                    currentDroppable.classList.remove('dragOver');
                }
                currentDroppable = droppableBelow;
                if (currentDroppable) {
                    currentDroppable.classList.add('dragOver');
                }
            }
        }

        document.addEventListener('mousemove', onMouseMove);

        clone.onmouseup = function () {
            Frames.dragEnd(clone, parent, onMouseMove);
        };

        clone.ondragstart = function () {
            return false;
        };
    }

    static dragEnd(clone, parent, onMouseMove) {
        clone.hidden = true;
        parent.classList.remove('dragStyle');
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        document.removeEventListener('mousemove', onMouseMove);
        clone.onmouseup = null;
        clone.onmousedown = null;

        if (elemBelow && elemBelow.id.includes('_')) {
            const partIdIsNumber = 1;
            const dropId = elemBelow.id.split('_')[partIdIsNumber];
            const dragId = clone.id.split('_')[partIdIsNumber];

            if (dropId === dragId) {
                parent.classList.remove('dragOver');
            } else {
                elemBelow.classList.remove('dragOver');
                elemBelow.parentNode.classList.remove('dragOver');

                const canvasWidth = document.getElementById('mainCanvas').width;
                const canvasHeight = document.getElementById('mainCanvas').height;

                const frames = document.getElementById('frames');
                const TAG_NUMBER = 0;
                const dropCanvasId = frames.children[dropId - 1].children[TAG_NUMBER].id;
                const dropCanvas = document.getElementById(dropCanvasId);
                let dropContext = dropCanvas.getContext('2d');

                let dropImgData = dropContext.getImageData(0, 0, canvasWidth, canvasHeight);

                const dragCanvasId = clone.children[TAG_NUMBER].id;
                const dragCanvas = document.getElementById(dragCanvasId);
                let dragContext = dragCanvas.getContext('2d');
                let dragImgData = dragContext.getImageData(0, 0, canvasWidth, canvasHeight);

                let tempImgData = dragImgData;
                dragImgData = dropImgData;
                dropImgData = tempImgData;
                dropContext.putImageData(dropImgData, 0, 0);
                dragContext.putImageData(dragImgData, 0, 0);

                Frames.dragSelect(dropId);
            }
        }
        clone.remove();
        changeFPS(0);
    }

    static rewriteId(id, frames) {
        const quantityFramse = frames.childElementCount;
        const childrenFrames = frames.children;

        while (id <= quantityFramse) {
            const frame = childrenFrames[id - 1];
            frame.id = 'frm_' + id;
            const childrenFrame = frame.children;
            childrenFrame[0].id = "frmCanvas_" + id;

            childrenFrame[1].id = "frmNumber_" + id;
            childrenFrame[1].textContent = id;

            childrenFrame[2].id = "frmDelete_" + id;
            childrenFrame[2].onclick = Frames.deleteFrame(childrenFrame[2].id);

            childrenFrame[3].id = "frmDuplicate_" + id;
            childrenFrame[3].onclick = Frames.duplicateFrame(childrenFrame[3].id);

            childrenFrame[4].id = "frmDD_" + id;

            id += 1;
        }
    }

    static selectFrame(event, moveSelected) {
        if (event !== undefined && event.target !== undefined) {
            if (!event.target.id.includes("frm")) {
                return;
            }
        }
        const frames = document.getElementById('frames');

        const partIdIsNumber = 1;
        let frameNumberId = 0;
        const framesLength = frames.children.length;

        if (event !== undefined && event.target !== undefined) {
            if (!event.target.id.includes("frmDuplicate_")) {
                for (let i = 0; i < framesLength; i += 1) {
                    if (frames.children[i].classList.length > 1) {
                        frames.children[i].classList.remove('selected');
                        frameNumberId = i + 1;
                    }
                }
            } else {
                return;
            }
        } else {
            for (let i = 0; i < framesLength; i += 1) {
                if (frames.children[i].classList.length > 1) {
                    frames.children[i].classList.remove('selected');
                    frameNumberId = i + 1;
                }
            }
        }

        if (event !== undefined) {
            frameNumberId = +event.target.id.split('_')[partIdIsNumber];
        }

        if (moveSelected === -1 && frameNumberId > 1) {
            frameNumberId += moveSelected;
        } else if (moveSelected === 1 && frameNumberId < framesLength) {
            frameNumberId += moveSelected;
        }

        Frames.drawSelected(frameNumberId, framesLength);
    }

    static drawSelected(numberId, framesLength) {
        if (numberId > framesLength) {
            numberId = framesLength;
        }

        document.getElementById("frm_" + numberId).classList.add('selected');

        const mainCanvas = document.getElementById('mainCanvas');
        let mainContext = mainCanvas.getContext('2d');

        const frameCanvas = document.getElementById("frmCanvas_" + numberId);
        let frameContext = frameCanvas.getContext('2d');

        const canvasWidth = document.getElementById('mainCanvas').width;
        const canvasHeight = document.getElementById('mainCanvas').height;
        let getDataFrame = frameContext.getImageData(0, 0, canvasWidth, canvasHeight);
        mainContext.putImageData(getDataFrame, 0, 0);

        const asideCanvas = document.getElementById('asideCanvas');
        let asideContext = asideCanvas.getContext('2d');
        asideContext.putImageData(getDataFrame, 0, 0);
    }

    static dragSelect(frameId) {
        const frames = document.getElementById('frames');

        for (let i = 0; i < frames.children.length; i += 1) {
            frames.children[i].classList.remove('selected');
        }

        const frameNumberId = frameId;
        document.getElementById("frm_" + frameId).classList.add('selected');

        const mainCanvas = document.getElementById('mainCanvas');
        let mainContext = mainCanvas.getContext('2d');

        const frameCanvas = document.getElementById("frmCanvas_" + frameNumberId);
        let frameContext = frameCanvas.getContext('2d');
        const canvasWidth = document.getElementById('mainCanvas').width;
        const canvasHeight = document.getElementById('mainCanvas').height;
        let getDataFrame = frameContext.getImageData(0, 0, canvasWidth, canvasHeight);
        mainContext.putImageData(getDataFrame, 0, 0);

        const asideCanvas = document.getElementById('asideCanvas');
        let asideContext = asideCanvas.getContext('2d');
        asideContext.putImageData(getDataFrame, 0, 0);
    }
}

export { Frames }
