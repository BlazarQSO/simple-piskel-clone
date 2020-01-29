import { servicesClass } from '../services/servicesClass';
import { pencil } from '../tools/pencil';
import { picker } from '../tools/picker';
import { changeColor } from '../tools/changeColor';
import { plus, minus, changeSize } from '../tools/width';
import { blackAndWhite } from '../tools/blackAndWhite';
import { line } from '../tools/line';
import { bucket } from '../tools/bucket';
import { clearCanvas } from '../tools/clearCanvas';
import { colorSwap } from '../tools/colorSwap';
import { sizeCanvas } from '../toolsBox/sizeCanvas';
import { openFile } from '../toolsBox/openFile';
import { changeFPS } from '../toolsBox/changeFPS';

const canvas = document.getElementById("mainCanvas");
let context = canvas.getContext("2d");
canvas.oncontextmenu = () => false;

const tools = {
    "bucket": {
        id: "bucket",
        indicated: false,
        painting: false,
        default: "B",
        current: "B",

        onClickHandler: function () {
            return () => {
                servicesClass.resetBtn(tools, this.id);
                bucket(this, canvas, context);
            }
        },
    },
    "colorSwap": {
        id: "colorSwap",
        indicated: false,
        painting: false,
        default: "S",
        current: "S",

        onClickHandler: function () {
            return () => {
                servicesClass.resetBtn(tools, this.id);
                colorSwap(this, canvas, context);
            }
        },
    },
    "pencil": {
        id: "pencil",
        indicated: false,
        default: "P",
        current: "P",

        onClickHandler: function () {
            return () => {
                servicesClass.resetBtn(tools, this.id);
                pencil(this, canvas, context);
            }
        },
    },
    "eraser": {
        id: "eraser",
        indicated: false,
        default: "E",
        current: "E",

        onClickHandler: function () {
            return () => {
                servicesClass.resetBtn(tools, this.id);
                pencil(this, canvas, context);
            }
        },
    },
    "line": {
        id: "line",
        indicated: false,
        default: "L",
        current: "L",

        onClickHandler: function () {
            return () => {
                servicesClass.resetBtn(tools, this.id);
                line(this, canvas, context);
            }
        }
    },
    "chooseColor": {
        id: "chooseColor",
        indicated: false,
        default: "I",
        current: "I",

        onClickHandler: function () {
            return () => {
                servicesClass.resetBtn(tools, this.id);
                picker(this, canvas, context);
            }
        },
    },
    "colorLeft": {
        indicated: false,
        default: "C",
        current: "C",

        onClickHandler: function () {
            return () => changeColor("colorLeft", "changeColorLeft");
        },
    },
    "colorRight": {
        indicated: false,
        default: "R",
        current: "R",

        onClickHandler: function () {
            return () => changeColor("colorRight", "changeColorRight");
        },
    },
    "minus": {
        default: "-",
        current: "-",

        onClickHandler: function () {
            return () => minus();
        },
    },
    "plus": {
        default: "=",
        current: "=",

        onClickHandler: function () {
            return () => plus();
        },
    },
    "penSize1": {
        default: "1",
        current: "1",

        onClickHandler: function () {
            return () => changeSize("1");
        }
    },
    "penSize2": {
        default: "2",
        current: "2",

        onClickHandler: function () {
            return () => changeSize("2");
        }
    },
    "penSize3": {
        default: "3",
        current: "3",

        onClickHandler: function () {
            return () => changeSize("3");
        }
    },
    "penSize4": {
        default: "4",
        current: "4",

        onClickHandler: function () {
            return () => changeSize("4");
        }
    },
    "clear": {
        default: "BACKSPACE",
        current: "BACKSPACE",

        onClickHandler: function () {
            return () => clearCanvas(canvas, context);
        }
    },
    "bw": {
        default: "W",
        current: "W",

        onClickHandler: function () {
            return () => blackAndWhite(canvas, context, servicesClass.drawIntoFrame);
        }
    },
    "r_first": {
        default: "5",
        current: "5",

        id: "r_first",
        size: {
            width: 32,
            height: 32,
        },
        onClickHandler: function () {
            return () => sizeCanvas(this, canvas, context);
        }
    },
    "r_second": {
        id: "r_second",
        size: {
            width: 64,
            height: 64,
        },
        default: "6",
        current: "6",

        onClickHandler: function () {
            return () => sizeCanvas(this, canvas, context);
        }
    },
    "r_third": {
        id: "r_third",
        size: {
            width: 128,
            height: 128,
        },
        default: "7",
        current: "7",

        onClickHandler: function () {
            return () => sizeCanvas(this, canvas, context);
        }
    },
    "open": {
        default: "",
        current: "",

        onClickHandler: function () {
            return () => openFile(canvas, context);
        }
    },
    "range": {
        default: "",
        current: "",

        onClickHandler: function () {
            return () => changeFPS(0);
        }
    },
    "rangeNaN_L": {
        default: "ARROWLEFT",
        current: "ARROWLEFT",

        onClickHandler: function () {
            return () => changeFPS(-1);
        }
    },
    "rangeNaN_R": {
        default: "ARROWRIGHT",
        current: "ARROWRIGHT",

        onClickHandler: function () {
            return () => changeFPS(1);
        }
    },
}

export { tools }
