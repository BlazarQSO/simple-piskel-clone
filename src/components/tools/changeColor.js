function changeColor(elemId, changeColorId) {
    const changeColor = document.getElementById(changeColorId);
    changeColor.click();
    changeColor.onchange = function () {
        document.getElementById(elemId).classList.remove("bg-default");
        document.getElementById(elemId).style.background = changeColor.value;
    }
}

export { changeColor }
