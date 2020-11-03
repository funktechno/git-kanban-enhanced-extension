const bitbucketVariables = {
  menuBtnId: `git-kanban-menu`,
  menuExpanded: false,
  menuBtn: {
    aClass: "Item-z6qfkt-1 btQpif",
    aActiveClass: "Item-z6qfkt-1 btQpif",
    spanOuterClass:
      "ItemParts__Before-sc-14xek3m-2 kLhAJo ItemParts__BeforeAfterBase-sc-14xek3m-1 hCmnxL",
    spanInnerClass: "sc-bwzfXH bjPjXo"
  }
};
/**
 * default page setup
 */
export default {
  addMenu: function(preMenuBtn: HTMLElement) {
    // is-over is-showing-fly-out
    // style display:block; transform: translate3d(220px, 150px, 0px);
    // add selected to class
    const kanbanBtn =
      `<a id="` +
      bitbucketVariables.menuBtnId +
      `" class="` +
      bitbucketVariables.menuBtn.aClass +
      `" aria-disabled="false" href="#git-kanban?board">
        <span class="ItemParts__Before-sc-14xek3m-2 kLhAJo ItemParts__BeforeAfterBase-sc-14xek3m-1 hCmnxL">
            <div class="NavigationItemIcon-sc-1mxkiut-0 eqoAfN">
                <span class="aui-icon aui-icon-large aui-iconfont-macro-status css-otp1j3">
                </span>
            </div>
        </span>
            <span class="ItemParts__ContentWrapper-sc-14xek3m-4 eDgbRC">
            <span class="ItemParts__Content-sc-14xek3m-5 jRBaLt">Kanban</span>
            </span>
        </a>`;

    // `<span id="` + bitbucketVariables.menuBtnId + `" itemscope="" itemtype="http://schema.org/ListItem" itemprop="itemListElement">
    // <a class="js-selected-navigation-item reponav-item" itemprop="url" data-hotkey="g c" data-selected-links="repo_source repo_downloads repo_commits repo_releases repo_tags repo_branches repo_packages" href="#git-kanban?board">
    // <svg class="octicon octicon-project" viewBox="0 0 15 16" version="1.1" width="15" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M10 12h3V2h-3v10zm-4-2h3V2H6v8zm-4 4h3V2H2v12zm-1 1h13V1H1v14zM14 0H1a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1z"></path></svg>          <span itemprop="name">Kanban</span>
    //   <meta itemprop="position" content="1">
    // </a>  </span>`

    preMenuBtn.insertAdjacentHTML("afterend", kanbanBtn);
    (document.getElementById(
      bitbucketVariables.menuBtnId
    ) as HTMLButtonElement).onclick = this.expandMenu;
    if (window.location.hash.indexOf("git-kanban") !== -1) {
      this.expandMenu();
    }
    if (!bitbucketVariables.menuExpanded) {
      // no mouseover
      // document.getElementById(bitbucketVariables.menuBtnId).onmouseover = function () { mouseOver() }
      // document.getElementById(bitbucketVariables.menuBtnId).onmouseout = function () { mouseOut() }
      // function clearHoverMenu() {
      //     var hoverMenu = document.querySelector(`.is-over.is-showing-fly-out`)
      //     if (hoverMenu) {
      //         hoverMenu.className = ""
      //         hoverMenu.querySelector(`ul`).style = ""
      //     }
      // }
      // function mouseOver() {
      //     clearHoverMenu()
      //     document.getElementById(bitbucketVariables.menuBtnId).className = "is-over is-showing-fly-out"
      //     document.querySelector(`#` + bitbucketVariables.menuBtnId + ` > ul`).style = "display:block; transform: translate3d(220px, 105px, 0px);"
      //     // .setAttribute("style", "display:block; transform: translate3d(220px, 150px, 0px);")
      // }
      // function mouseOut() {
      //     clearHoverMenu()
      //     document.getElementById(bitbucketVariables.menuBtnId).className = ""
      //     document.querySelector(`#` + bitbucketVariables.menuBtnId + ` > ul`).style = ""
      // }
    }
  },
  expandMenu: function(e: MouseEvent | null = null) {
    // may not be a button press
    if (e) {
      e.preventDefault();
    }
    if (!window.location.hash) {
      window.location.hash = "git-kanban?board";
    }
    bitbucketVariables.menuExpanded = !bitbucketVariables.menuExpanded;
    if (bitbucketVariables.menuExpanded) {
      const activeItem = document.querySelector(
        `.` + bitbucketVariables.menuBtn.aActiveClass.replace(" ", ".")
      );
      if (activeItem) {
        activeItem.className = bitbucketVariables.menuBtn.aClass;
      }
      (document.getElementById(
        bitbucketVariables.menuBtnId
      ) as HTMLButtonElement).className =
        bitbucketVariables.menuBtn.aActiveClass;
    } else {
      (document.getElementById(
        bitbucketVariables.menuBtnId
      ) as HTMLButtonElement).className = bitbucketVariables.menuBtn.aClass;
    }
  },
  render: function() {
    // check if project or overview
    console.log("rendering bitbucket kanban");
    // bitbucket uses dynamic generated css classes, will have to iterate to find
    const allElements = document.getElementsByTagName("div");
    let menuList: HTMLElement | null = null,
      menuLabels: NodeListOf<HTMLAnchorElement> | null = null;
    for (let i = 0; i < allElements.length; i++) {
      if (
        allElements[i].className.indexOf("ScrollHintScrollContainer") !== -1
      ) {
        menuList = allElements[i];
      }
    }
    console.log(menuList);
    // second part of class is active if different from others Item-z6qfkt-1 btQpif
    // best thing would be to save to storage and retrieve from there checking and updating if different, b/c won't be able to retrieve active when navigating inside
    // of board skip active for now
    if (menuList) {
      menuLabels = menuList.querySelectorAll(`a`);
      if (menuLabels && menuLabels.length) {
        // don't double render
        for (let i = 0; i < menuLabels.length; i++) {
          if (menuLabels[i].innerText.indexOf("Kanban") !== -1) {
            return false;
          }
        }
        for (let i = 0; i < menuLabels.length; i++) {
          if (
            menuLabels[1] &&
            menuLabels[i].innerText.indexOf("Issues") !== -1
          ) {
            this.addMenu(menuLabels[i] as HTMLElement);
            return true;
          }
        }
        // only add kanban if issues enabled
        // if (menuLabels[1].querySelector(`span[itemprop="name"]`).innerText.indexOf("Issues") !== -1) {
        //     this.addMenu(menuLabels[1])
        // }
      }
    }
    // get issues if either true
  }
};
