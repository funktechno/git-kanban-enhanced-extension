import { optionsKey } from "@/utils/constants";
import giteaVariables from "./giteaVariables";
// import initDisplay from '../display'
import Vue from "vue";
// import VueRouter from 'vue-router'
// import menu from './menu'
import { singleMenu } from "../display/router";
import { browser } from "webextension-polyfill-ts";

// import router from '../display/routes'

// var display = initDisplay(giteaVariables)

/**
 * default page setup
 */
export default {
  addMenu: function(preMenuBtn: HTMLElement) {
    console.log(this.addMenu.name);
    // is-over is-showing-fly-out
    // style display:block; transform: translate3d(220px, 150px, 0px);
    // octicon-project, not in the list eye or inbox might be fine though
    const kanbanBtn =
      `<a class="item" id="` +
      giteaVariables.menuBtnId +
      `" href="#` +
      optionsKey +
      `?board">
        <i class="octicon octicon-eye"></i> Kanban 
    </a>`;
    // const Home = { template: '<div>home</div>' }

    preMenuBtn.insertAdjacentHTML("afterend", kanbanBtn);
    // var path = window.location.pathname
    // if (path.substr(path.length - 1, 1) !== '/') {
    //   path += '/'
    // }
    // ` + path + `
    // console.log(optionsKey)
    // document.getElementById(giteaVariables.menuBtnId).onclick = this.expandMenu
    // kanbanBtn = `<router-link class="item" to="/` + optionsKey + `-board"><i class="octicon octicon-eye"></i> Kanban2</router-link>`

    // <a class="item" id="` + giteaVariables.menuBtnId + `" href="#` + optionsKey + `-board">
    //       <i class="octicon octicon-eye"></i> Kanban2
    //   </a>`
    // Vue.use(VueResource)
    // Vue.use(VueRouter)
    Vue.config.devtools = true;
    Vue.component("v-style", {
      render: function(createElement) {
        return createElement("style", this.$slots.default);
      }
    });
    // global.browser = browser;
    Vue.prototype.$browser = browser;

    /* eslint-disable no-new */
    new Vue({
      el: "#" + giteaVariables.menuBtnId,
      // router,
      // base: __dirname,
      // template: kanbanBtn
      render: h => h(singleMenu)
    });

    // if (window.location.hash.indexOf(optionsKey) !== -1) {
    //   this.expandMenu()
    // }

    if (!giteaVariables.menuExpanded) {
      // no mouseover
      // document.getElementById(giteaVariables.menuBtnId).onmouseover = function () { mouseOver() }
      // document.getElementById(giteaVariables.menuBtnId).onmouseout = function () { mouseOut() }
      // function clearHoverMenu() {
      //     var hoverMenu = document.querySelector(`.is-over.is-showing-fly-out`)
      //     if (hoverMenu) {
      //         hoverMenu.className = ""
      //         hoverMenu.querySelector(`ul`).style = ""
      //     }
      // }
      // function mouseOver() {
      //     clearHoverMenu()
      //     document.getElementById(giteaVariables.menuBtnId).className = "is-over is-showing-fly-out"
      //     document.querySelector(`#` + giteaVariables.menuBtnId + ` > ul`).style = "display:block; transform: translate3d(220px, 105px, 0px);"
      //     // .setAttribute("style", "display:block; transform: translate3d(220px, 150px, 0px);")
      // }
      // function mouseOut() {
      //     clearHoverMenu()
      //     document.getElementById(giteaVariables.menuBtnId).className = ""
      //     document.querySelector(`#` + giteaVariables.menuBtnId + ` > ul`).style = ""
      // }
    }
  },
  render: function() {
    // check if project or overview
    console.log("rendering gitea kanban");

    const menuLabels = document.querySelectorAll(
      `.ui.tabular.stackable.menu.navbar > a`
    );
    if (menuLabels && menuLabels.length) {
      // only add kanban if issues enabled
      // && !menuLabels[1].target // don't remember what this does
      if (
        menuLabels[1] &&
        (menuLabels[1] as HTMLElement).innerText.indexOf("Issues") !== -1
      ) {
        this.addMenu(menuLabels[1] as HTMLElement);
      }
    }
    // if (window.location.hash.indexOf(optionsKey) !== -1) {
    //   display.renderDisplay()
    // }
    // get issues if either true
  }
};
