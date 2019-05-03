var gitlab_variables = {
    menuBtnId: `git-kanban-menu`,
    menuExpanded: false
}
/**
 * default page setup
 */
var gitlab = {
    addMenu: function (preMenuBtn) {
        // is-over is-showing-fly-out
        // style display:block; transform: translate3d(220px, 150px, 0px);
        var kanbanBtn = `<li id="` + gitlab_variables.menuBtnId + `" class=""><a class="shortcuts-issues qa-issues-item" href="#git-kanban?board"><div class="nav-icon-container">
        <svg><use xlink:href="https://gitlab.com/assets/icons-b2073af7ca0641787eb4596951b695079519da1937a262a886bb12c2b0fac181.svg#blame"></use></svg>
        </div>
        <span class="nav-item-name">
        Kanban
        </span>
        </a><ul class="sidebar-sub-level-items fly-out-list" style="">
        <li class="fly-out-top-item"><a href="#git-kanban?board"><strong class="fly-out-top-item-name">
        Kanban2
        </strong>
        </a></li><li class="divider fly-out-top-item"></li>
        <li class=""><a title="Board" href="#git-kanban?board"><span>
        Board
        </span>
        </a></li><li class=""><a title="Overview" href="#git-kanban?overview"><span>
        Overview
        </span>
        </a></li><li class=""><a title="Burndown Report" class="qa-labels-link" href="#git-kanban?reports/burndown"><span>
        Burndown Report
        </span>
        </a></li>
        <li class=""><a title="Velocity Tracking" class="qa-milestones-link" href="#git-kanban?reports/burndown"><span>
        Velocity Tracking
        </span>
        </a></li>
        <li class=""><a title="Release Report" class="qa-milestones-link" href="#git-kanban?reports/release"><span>
        Release Report
        </span>
        </a></li>
        </ul>
        </li>`
        preMenuBtn.insertAdjacentHTML('afterend', kanbanBtn);
        document.getElementById(gitlab_variables.menuBtnId).onclick = this.expandMenu;

        if (!gitlab_variables.menuExpanded) {
            document.getElementById(gitlab_variables.menuBtnId).onmouseover = function () { mouseOver() };
            document.getElementById(gitlab_variables.menuBtnId).onmouseout = function () { mouseOut() };
            function clearHoverMenu(){
                var hoverMenu = document.querySelector(`.is-over.is-showing-fly-out`)
                if(hoverMenu){
                    hoverMenu.className = ""
                    hoverMenu.querySelector(`ul`).style = ""
                }
            }

            function mouseOver() {
                clearHoverMenu()
                document.getElementById(gitlab_variables.menuBtnId).className = "is-over is-showing-fly-out"
                document.querySelector(`#` + gitlab_variables.menuBtnId + ` > ul`).style = "display:block; transform: translate3d(220px, 105px, 0px);"
                // .setAttribute("style", "display:block; transform: translate3d(220px, 150px, 0px);");
            }

            function mouseOut() {
                clearHoverMenu()
                document.getElementById(gitlab_variables.menuBtnId).className = ""
                document.querySelector(`#` + gitlab_variables.menuBtnId + ` > ul`).style = ""
            }
        }
    },
    expandMenu: function (e) {
        e.preventDefault();
        gitlab_variables.menuExpanded = !gitlab_variables.menuExpanded || gitlab_variables.menuExpanded == false;
        if (gitlab_variables.menuExpanded) {
            document.getElementById(gitlab_variables.menuBtnId).className = "active"
            document.querySelector(`#` + gitlab_variables.menuBtnId + ` > ul`).style = ""
        } else {
            document.getElementById(gitlab_variables.menuBtnId).className = ""
        }
    },
    render: function () {
        // check if project or overview
        console.log("rendering gitlab kanban")

        var menuLabels = document.querySelectorAll(`ul.sidebar-top-level-items > li`)
        if (menuLabels && menuLabels.length) {
            if (menuLabels[0].querySelector(`a`).innerText == "Project") {
                this.addMenu(menuLabels[0])
            } else if (menuLabels[0].querySelector(`a`).innerText == "Overview") {
                this.addMenu(menuLabels[0])
            }
        }
        // get issues if either true
    }
}