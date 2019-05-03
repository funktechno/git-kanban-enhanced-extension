var bitbucket_variables = {
    menuBtnId: `git-kanban-menu`,
    menuExpanded: false,
    menuBtn: {
        aClass: "Item-z6qfkt-1 bklwvq",
        aActiveClass: "Item-z6qfkt-1 btQpif",
        spanOuterClass: "ItemParts__Before-sc-14xek3m-2 kLhAJo ItemParts__BeforeAfterBase-sc-14xek3m-1 hCmnxL",
        spanInnerClass: "sc-bwzfXH bjPjXo"
    }
}
/**
 * default page setup
 */
var bitbucket = {
    addMenu: function (preMenuBtn) {
        // is-over is-showing-fly-out
        // style display:block; transform: translate3d(220px, 150px, 0px);
        // add selected to class
        var kanbanBtn = `<a id="` + bitbucket_variables.menuBtnId + `" class="` + bitbucket_variables.menuBtn.aClass + `" aria-disabled="false" href="#git-kanban?board">
            <span class="`+ bitbucket_variables.menuBtn.spanOuterClass + `"><div class="NavigationItemIcon-sc-1mxkiut-0 eqoAfN">
                <span class="`+ bitbucket_variables.menuBtn.spanInnerClass + `" aria-label="Kanban"><svg width="24" height="24" viewBox="0 0 24 24" focusable="false" role="presentation">
                <g fill="currentColor" fill-rule="evenodd">
                <path d="M5 12.991c0 .007 14.005.009 14.005.009C18.999 13 19 5.009 19 5.009 19 5.002 4.995 5 4.995 5 5.001 5 5 12.991 5 12.991zM3 5.01C3 3.899 3.893 3 4.995 3h14.01C20.107 3 21 3.902 21 5.009v7.982c0 1.11-.893 2.009-1.995 2.009H4.995A2.004 2.004 0 0 1 3 12.991V5.01zM19 19c-.005 1.105-.9 2-2.006 2H7.006A2.009 2.009 0 0 1 5 19h14zm1-3a2.002 2.002 0 0 1-1.994 2H5.994A2.003 2.003 0 0 1 4 16h16z" fill-rule="nonzero"></path>
                <path d="M10.674 11.331c.36.36.941.36 1.3 0l2.758-2.763a.92.92 0 0 0-1.301-1.298l-2.108 2.11-.755-.754a.92.92 0 0 0-1.3 1.3l1.406 1.405z"></path></g></svg></span></div></span><span class="ItemParts__ContentWrapper-sc-14xek3m-4 eDgbRC"><span class="ItemParts__Content-sc-14xek3m-5 jRBaLt">Kanban
                </span>
            </span>
        </a>`


        // `<span id="` + bitbucket_variables.menuBtnId + `" itemscope="" itemtype="http://schema.org/ListItem" itemprop="itemListElement">
        // <a class="js-selected-navigation-item reponav-item" itemprop="url" data-hotkey="g c" data-selected-links="repo_source repo_downloads repo_commits repo_releases repo_tags repo_branches repo_packages" href="#git-kanban?board">
        // <svg class="octicon octicon-project" viewBox="0 0 15 16" version="1.1" width="15" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M10 12h3V2h-3v10zm-4-2h3V2H6v8zm-4 4h3V2H2v12zm-1 1h13V1H1v14zM14 0H1a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1z"></path></svg>          <span itemprop="name">Kanban</span>
        //   <meta itemprop="position" content="1">
        // </a>  </span>`

        preMenuBtn.insertAdjacentHTML('afterend', kanbanBtn);
        document.getElementById(bitbucket_variables.menuBtnId).onclick = this.expandMenu;

        if (!bitbucket_variables.menuExpanded) {
            //no mouseover
            // document.getElementById(bitbucket_variables.menuBtnId).onmouseover = function () { mouseOver() };
            // document.getElementById(bitbucket_variables.menuBtnId).onmouseout = function () { mouseOut() };
            // function clearHoverMenu() {
            //     var hoverMenu = document.querySelector(`.is-over.is-showing-fly-out`)
            //     if (hoverMenu) {
            //         hoverMenu.className = ""
            //         hoverMenu.querySelector(`ul`).style = ""
            //     }
            // }

            // function mouseOver() {
            //     clearHoverMenu()
            //     document.getElementById(bitbucket_variables.menuBtnId).className = "is-over is-showing-fly-out"
            //     document.querySelector(`#` + bitbucket_variables.menuBtnId + ` > ul`).style = "display:block; transform: translate3d(220px, 105px, 0px);"
            //     // .setAttribute("style", "display:block; transform: translate3d(220px, 150px, 0px);");
            // }

            // function mouseOut() {
            //     clearHoverMenu()
            //     document.getElementById(bitbucket_variables.menuBtnId).className = ""
            //     document.querySelector(`#` + bitbucket_variables.menuBtnId + ` > ul`).style = ""
            // }
        }
    },
    expandMenu: function (e) {
        e.preventDefault();
        bitbucket_variables.menuExpanded = !bitbucket_variables.menuExpanded || bitbucket_variables.menuExpanded == false;
        if (bitbucket_variables.menuExpanded) {
            var activeItem = document.querySelector(`.` + bitbucket_variables.menuBtn.aActiveClass.replace(" ", "."))
            if (activeItem)
                activeItem.className = bitbucket_variables.menuBtn.aClass
            document.getElementById(bitbucket_variables.menuBtnId).className = bitbucket_variables.menuBtn.aActiveClass
        } else {
            document.getElementById(bitbucket_variables.menuBtnId).className = bitbucket_variables.menuBtn.aClass
        }
    },
    render: function () {
        // check if project or overview
        console.log("rendering bitbucket kanban")
        // bitbucket uses dynamic generated css classes, will have to iterate to find
        var allElements = document.getElementsByTagName("div");
        var menuList = null;
        for (let i = 0; i < allElements.length; i++) {
            if (allElements[i].className.indexOf('ScrollHintScrollContainer') != -1)
                menuList = allElements[i];
        }
        console.log(menuList)
        // second part of class is active if different from others Item-z6qfkt-1 bklwvq
        // best thing would be to save to storage and retrieve from there checking and updating if different, b/c won't be able to retrieve active when navigating inside
        // of board skip active for now
        if (menuList) {
            var menuLabels = menuList.querySelectorAll(`a`)
            if (menuLabels && menuLabels.length) {
                // don't double render
                for (let i = 0; i < menuLabels.length; i++) {
                    if (menuLabels[i].innerText.indexOf("Kanban") != -1) {
                        return false;
                    }
                }
                for (let i = 0; i < menuLabels.length; i++) {
                    if (menuLabels[i].innerText.indexOf("Issues") != -1) {
                        this.addMenu(menuLabels[i])
                        return true;
                    }
                }
                // only add kanban if issues enabled
                // if (menuLabels[1].querySelector(`span[itemprop="name"]`).innerText.indexOf("Issues") != -1) {
                //     this.addMenu(menuLabels[1])
                // }
            }
        }
        // get issues if either true
    }
}