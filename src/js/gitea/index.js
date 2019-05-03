var gitea_variables = {
    menuBtnId: `git-kanban-menu`,
    menuExpanded: false
}
/**
 * default page setup
 */
var gitea = {
    addMenu: function (preMenuBtn) {
        // is-over is-showing-fly-out
        // style display:block; transform: translate3d(220px, 150px, 0px);
        // octicon-project, not in the list eye or inbox might be fine though
        var kanbanBtn = `<a class="item" id="` + gitlab_variables.menuBtnId + `" href="#git-kanban?board">
            <i class="octicon octicon-eye"></i> Kanban 
        </a>`
        preMenuBtn.insertAdjacentHTML('afterend', kanbanBtn);
        document.getElementById(gitlab_variables.menuBtnId).onclick = this.expandMenu;

        if (!gitlab_variables.menuExpanded) {
            //no mouseover
            // document.getElementById(gitlab_variables.menuBtnId).onmouseover = function () { mouseOver() };
            // document.getElementById(gitlab_variables.menuBtnId).onmouseout = function () { mouseOut() };
            // function clearHoverMenu() {
            //     var hoverMenu = document.querySelector(`.is-over.is-showing-fly-out`)
            //     if (hoverMenu) {
            //         hoverMenu.className = ""
            //         hoverMenu.querySelector(`ul`).style = ""
            //     }
            // }

            // function mouseOver() {
            //     clearHoverMenu()
            //     document.getElementById(gitlab_variables.menuBtnId).className = "is-over is-showing-fly-out"
            //     document.querySelector(`#` + gitlab_variables.menuBtnId + ` > ul`).style = "display:block; transform: translate3d(220px, 105px, 0px);"
            //     // .setAttribute("style", "display:block; transform: translate3d(220px, 150px, 0px);");
            // }

            // function mouseOut() {
            //     clearHoverMenu()
            //     document.getElementById(gitlab_variables.menuBtnId).className = ""
            //     document.querySelector(`#` + gitlab_variables.menuBtnId + ` > ul`).style = ""
            // }
        }
    },
    expandMenu: function (e) {
        e.preventDefault();
        gitlab_variables.menuExpanded = !gitlab_variables.menuExpanded || gitlab_variables.menuExpanded == false;
        if (gitlab_variables.menuExpanded) {
            document.querySelector(`.item.active`).className = "item"
            document.getElementById(gitlab_variables.menuBtnId).className = "active item"
            // document.querySelector(`#` + gitlab_variables.menuBtnId + ` > ul`).style = ""
        } else {
            document.getElementById(gitlab_variables.menuBtnId).className = "item"
        }
    },
    render: function () {
        // check if project or overview
        console.log("rendering gitea kanban")

        var menuLabels = document.querySelectorAll(`.ui.tabular.stackable.menu.navbar > a`)
        console.log(menuLabels)
        if (menuLabels && menuLabels.length) {
            // only add kanban if issues enabled
            if (menuLabels[1].innerText.indexOf("Issues") != -1) {
                this.addMenu(menuLabels[1])
            }
        }
        // get issues if either true
    }
}