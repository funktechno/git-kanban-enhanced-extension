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
        var kanbanBtn = `<a class="item" id="` + gitea_variables.menuBtnId + `" href="#git-kanban?board">
            <i class="octicon octicon-eye"></i> Kanban 
        </a>`
        preMenuBtn.insertAdjacentHTML('afterend', kanbanBtn);
        document.getElementById(gitea_variables.menuBtnId).onclick = this.expandMenu;

        if (!gitea_variables.menuExpanded) {
            //no mouseover
            // document.getElementById(gitea_variables.menuBtnId).onmouseover = function () { mouseOver() };
            // document.getElementById(gitea_variables.menuBtnId).onmouseout = function () { mouseOut() };
            // function clearHoverMenu() {
            //     var hoverMenu = document.querySelector(`.is-over.is-showing-fly-out`)
            //     if (hoverMenu) {
            //         hoverMenu.className = ""
            //         hoverMenu.querySelector(`ul`).style = ""
            //     }
            // }

            // function mouseOver() {
            //     clearHoverMenu()
            //     document.getElementById(gitea_variables.menuBtnId).className = "is-over is-showing-fly-out"
            //     document.querySelector(`#` + gitea_variables.menuBtnId + ` > ul`).style = "display:block; transform: translate3d(220px, 105px, 0px);"
            //     // .setAttribute("style", "display:block; transform: translate3d(220px, 150px, 0px);");
            // }

            // function mouseOut() {
            //     clearHoverMenu()
            //     document.getElementById(gitea_variables.menuBtnId).className = ""
            //     document.querySelector(`#` + gitea_variables.menuBtnId + ` > ul`).style = ""
            // }
        }
    },
    expandMenu: function (e) {
        e.preventDefault();
        gitea_variables.menuExpanded = !gitea_variables.menuExpanded || gitea_variables.menuExpanded == false;
        if (gitea_variables.menuExpanded) {
            var activeItem = document.querySelector(`.item.active`)
            if(activeItem)
                activeItem.className = "item"
            document.getElementById(gitea_variables.menuBtnId).className = "active item"
            // document.querySelector(`#` + gitea_variables.menuBtnId + ` > ul`).style = ""
        } else {
            document.getElementById(gitea_variables.menuBtnId).className = "item"
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