import { Frames } from '../frames/frames';

const frames = {
    "addFrame": {
        default: "N",
        current: "N",
        onClickHandler: function () {
            return () => Frames.addFrame();
        }
    },
    "frmDelete_1": {
        default: "",
        current: "",
        onClickHandler: function () {
            return () => Frames.deleteFrame("frmDelete_1", false)();
        }
    },
    "frmDeleteNaN": {
        default: "DELETE",
        current: "DELETE",
        onClickHandler: function () {
            return () => Frames.deleteFrame("frmDelete_1", true)();
        }
    },
    "frmDuplicate_1": {
        default: "",
        current: "",
        onClickHandler: function () {
            return () => Frames.duplicateFrame("frmDuplicate_1", false)();
        }
    },
    "frmDuplicateNaN": {
        default: "D",
        current: "D",
        onClickHandler: function () {
            return () => Frames.duplicateFrame("frmDuplicate_1",true)();
        }
    },
    "frmDD_1": {
        default: "",
        current: "",
        onClickHandler: function (event) {
            Frames.dragFrame(event, "frmDD_1");
        }
    },
    "frames": {
        default: "",
        current: "",
        onClickHandler: function (event) {
            Frames.selectFrame(event, 0);
        }
    },
     "framesNaN_U": {
         default: "ARROWUP",
         current: "ARROWUP",
         onClickHandler: function (event) {
            return () => Frames.selectFrame(event, -1);
         }
     },
     "framesNaN_D": {
         default: "ARROWDOWN",
         current: "ARROWDOWN",
         onClickHandler: function (event) {
            return () => Frames.selectFrame(event, 1);
         }
     },
}

export { frames }
