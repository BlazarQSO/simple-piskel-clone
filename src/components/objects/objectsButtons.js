import { downloadGif } from '../toolsBox/downloadGif';
import { downloadApng } from '../toolsBox/downloadApng';
import { fullScreen } from '../toolsBox/fullScreen';
import { signOut } from '../toolsBox/signOut';
import { servicesClass } from '../services/servicesClass';
import { tools } from './objectsTools';
import { frames } from './objectsFrames';

const buttons = {
    "key": {
        default: "K",
        current: "K",
        onClickHandler: function () {
            return () => servicesClass.openShortcuts(Object.assign(frames, buttons, tools));
        }
    },
    "closeShortcuts": {
        default: "Q",
        current: "Q",
        onClickHandler: function () {
            return () => servicesClass.closeShortcuts(frames, tools, buttons);
        }
    },
    "defaultShortcuts": {
        default: "D",
        current: "D",
        onClickHandler: function () {
            return () => servicesClass.setDefaultShortcuts(Object.assign(frames, tools, buttons));
        }
    },
    "downloadGif": {
        default: "G",
        current: "G",
        onClickHandler: function () {
            return () => downloadGif();
        }
    },
    "downloadApng": {
        default: "M",
        current: "M",
        onClickHandler: function () {
            return () => downloadApng();
        }
    },
    "fullScreen": {
        default: "U",
        current: "U",
        onClickHandler: function () {
            return () => fullScreen();
        }
    },
    "signOut": {
        default: "X",
        current: "X",
        onClickHandler: function () {
            return () => signOut();
        }
    },
    "landingBtnCreateSprite": {
        default: ".",
        current: ".",
        onClickHandler: function () {
            return () => servicesClass.openEditor();
        }
    },
}

export { buttons }
