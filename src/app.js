import './screens/canvas/style.scss';
import './screens/preview/preview.scss';
import './screens/shortcuts/shortcuts.scss';

import { tools } from './components/objects/objectsTools';
import { buttons } from './components/objects/objectsButtons';
import { frames } from './components/objects/objectsFrames';
import { servicesClass } from './components/services/servicesClass';
import { changeFPS } from './components/toolsBox/changeFPS';

window.onload = () => {

  for (let key in tools) {
    if (!key.includes("NaN")) {
      document.querySelector("#" + key).addEventListener("click", tools[key].onClickHandler(), false);
    }
  }

  for (let key in frames) {
    if (key !== "frmDD_1" && key !== "frames" && !key.includes("NaN")) {
      document.querySelector("#" + key).onclick = frames[key].onClickHandler();
    }
  }

  document.querySelector("#frmDD_1").onmousedown = (e) => frames["frmDD_1"].onClickHandler(e);
  document.querySelector("#frames").onclick = (e) => frames["frames"].onClickHandler(e);

  for (let key in buttons) {
    document.querySelector("#" + key).addEventListener("click", buttons[key].onClickHandler(), false);
  }

  document.querySelector(".body").onkeydown = (e) => servicesClass.onKeyDown(e, Object.assign(frames, buttons, tools));
  document.querySelector("#shortcuts").addEventListener("click", (e) => servicesClass.inputShortcuts(e), false);
  document.getElementById('mainCanvas').addEventListener("mouseup", () => changeFPS(0), false);

  servicesClass.getLocalStorageFrames(frames);
  servicesClass.getLocalStorage(frames, tools, buttons);

  window.onbeforeunload = servicesClass.setLocalStorage(frames, tools, buttons);
};
