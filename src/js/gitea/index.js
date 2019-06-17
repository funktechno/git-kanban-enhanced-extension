import { optionsKey } from '../constants'
import giteaVariables from './giteaVariables'
import initDisplay from '../display'
var display = initDisplay(giteaVariables)

/**
 * default page setup
 */
export default {
  addMenu: function (preMenuBtn) {
    // is-over is-showing-fly-out
    // style display:block; transform: translate3d(220px, 150px, 0px);
    // octicon-project, not in the list eye or inbox might be fine though
    var kanbanBtn = `<a class="item" id="` + giteaVariables.menuBtnId + `" href="#` + optionsKey + `?board">
            <i class="octicon octicon-eye"></i> Kanban 
        </a>`
    preMenuBtn.insertAdjacentHTML('afterend', kanbanBtn)
    document.getElementById(giteaVariables.menuBtnId).onclick = this.expandMenu

    if (window.location.hash.indexOf(optionsKey) !== -1) {
      this.expandMenu()
    }

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
  expandMenu: function (e) {
    // may not be a button press
    if (e) {
      e.preventDefault()
    }

    giteaVariables.menuExpanded = !giteaVariables.menuExpanded || giteaVariables.menuExpanded === false
    if (!window.location.hash) {
      window.location.hash = optionsKey + '?board'
      display.renderDisplay()
    }

    if (giteaVariables.menuExpanded) {
      var activeItem = document.querySelector(`.item.active`)
      if (activeItem) {
        activeItem.className = "item"
      }
      document.getElementById(giteaVariables.menuBtnId).className = "active item"
      // document.querySelector(`#` + giteaVariables.menuBtnId + ` > ul`).style = ""
    } else {
      document.getElementById(giteaVariables.menuBtnId).className = "item"
    }
  },
  render: function () {
    // check if project or overview
    console.log("rendering gitea kanban")

    var menuLabels = document.querySelectorAll(`.ui.tabular.stackable.menu.navbar > a`)
    console.log(menuLabels)
    if (menuLabels && menuLabels.length) {
      // only add kanban if issues enabled
      if (menuLabels[1].innerText.indexOf("Issues") !== -1) {
        this.addMenu(menuLabels[1])
      }
    }
    if (window.location.hash.indexOf(optionsKey) !== -1) {
      display.renderDisplay()
    }
    // get issues if either true
  }
}
