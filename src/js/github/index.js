var github_variables = {
    menuBtnId: `git-kanban-menu`,
    menuExpanded: false
}
/**
 * default page setup
 */
var github = {
    addMenu: function (preMenuBtn) {
        // is-over is-showing-fly-out
        // style display:block; transform: translate3d(220px, 150px, 0px);
        // add selected to class
        var kanbanBtn = `<span id="` + github_variables.menuBtnId + `" itemscope="" itemtype="http://schema.org/ListItem" itemprop="itemListElement">
        <a class="js-selected-navigation-item reponav-item" itemprop="url" data-hotkey="g c" data-selected-links="repo_source repo_downloads repo_commits repo_releases repo_tags repo_branches repo_packages" href="#git-kanban?board">
        <svg class="octicon octicon-project" viewBox="0 0 15 16" version="1.1" width="15" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M10 12h3V2h-3v10zm-4-2h3V2H6v8zm-4 4h3V2H2v12zm-1 1h13V1H1v14zM14 0H1a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1z"></path></svg>          <span itemprop="name">Kanban</span>
          <meta itemprop="position" content="1">
        </a>  </span>`

        preMenuBtn.insertAdjacentHTML('afterend', kanbanBtn);
        document.getElementById(github_variables.menuBtnId).onclick = this.expandMenu;

        if (!github_variables.menuExpanded) {
            //no mouseover
            // document.getElementById(github_variables.menuBtnId).onmouseover = function () { mouseOver() };
            // document.getElementById(github_variables.menuBtnId).onmouseout = function () { mouseOut() };
            // function clearHoverMenu() {
            //     var hoverMenu = document.querySelector(`.is-over.is-showing-fly-out`)
            //     if (hoverMenu) {
            //         hoverMenu.className = ""
            //         hoverMenu.querySelector(`ul`).style = ""
            //     }
            // }

            // function mouseOver() {
            //     clearHoverMenu()
            //     document.getElementById(github_variables.menuBtnId).className = "is-over is-showing-fly-out"
            //     document.querySelector(`#` + github_variables.menuBtnId + ` > ul`).style = "display:block; transform: translate3d(220px, 105px, 0px);"
            //     // .setAttribute("style", "display:block; transform: translate3d(220px, 150px, 0px);");
            // }

            // function mouseOut() {
            //     clearHoverMenu()
            //     document.getElementById(github_variables.menuBtnId).className = ""
            //     document.querySelector(`#` + github_variables.menuBtnId + ` > ul`).style = ""
            // }
        }
    },
    expandMenu: function (e) {
        e.preventDefault();
        github_variables.menuExpanded = !github_variables.menuExpanded || github_variables.menuExpanded == false;
        if (github_variables.menuExpanded) {
            var activeItem = document.querySelector(`.js-selected-navigation-item.selected`)
            if (activeItem)
                activeItem.classList.remove('selected');
            document.getElementById(github_variables.menuBtnId).querySelector(`a`).className += " selected"
        } else {
            document.getElementById(github_variables.menuBtnId).querySelector(`a`).classList.remove('selected');
        }
    },
    render: function () {
        // check if project or overview
        console.log("rendering github kanban")

        var menuLabels = document.querySelectorAll(`nav.js-sidenav-container-pjax > span`)
        if (menuLabels && menuLabels.length) {
            // avoid double render
            for (let i = 0; i < menuLabels.length; i++) {
                var nameProp = menuLabels[i].querySelector(`span[itemprop="name"]`)
                if (nameProp && nameProp.innerText.indexOf("Kanban") != -1) {
                    return
                }
            }
            // only add kanban if issues enabled
            if (menuLabels[1].querySelector(`span[itemprop="name"]`).innerText.indexOf("Issues") != -1) {
                this.addMenu(menuLabels[1])
            }
        }
        // get issues if either true
    }
}