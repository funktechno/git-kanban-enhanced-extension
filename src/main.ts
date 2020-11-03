import gitea from "./views/gitea";
import github from "./views/github";
import bitbucket from "./views/bitbucket";
import gitlab from "./views/gitlab";
import { optionsKey } from "./utils/constants";

console.log("content-script!");

let metaStatus = "wait";

let currentOptions: any;

function getKanbanDetails() {
  const url = window.location.pathname.split("/"),
    // user = url[1],
    repo = url[2];
  // data = user + "/" + repo
  if (!repo || metaStatus === "waiting") {
    metaStatus = "na";
    return;
  } else {
    metaStatus = "waiting";
  }
  // console.log("check storage")
  // console.log(chrome.storage)
  // console.log(manifest)
  // console.log(optionsKey)
  // var issueRequest = JSON.stringify({ data, location: window.location })
  // debugger
  // chrome.runtime.sendMessage({ "getStorage": {optionsKey} }, function (result) {
  //   // console.log(data)
  //   console.log(result)
  //   // repoMetaHtml = result
  //   return
  //   metaStatus = "ready"
  //   if (callback) {
  //     callback()
  //   }
  // })
  chrome.storage.sync.get([optionsKey], function (result) {
    if (result && result[optionsKey] && result[optionsKey].length) {
      currentOptions = result[optionsKey];
    }
    let ignoreList = ["github.com", "bitbucket.org", "gitlab.com", "gitea.com"],
      host: string | null = window.location.host;

    chrome.storage.sync.get([optionsKey + "_type"], function (typeResult) {
      if (
        typeResult &&
        typeResult[optionsKey + "_type"] &&
        typeResult[optionsKey + "_type"].name.indexOf("Self Hosted") !== -1
      ) {
        ignoreList = [];
        host = null;
      }

      if (
        host &&
        ignoreList.indexOf(host) === -1 &&
        currentOptions &&
        currentOptions.length
      ) {
        console.log(currentOptions);
        console.log(window.location.host);
        for (let i = 0; i < currentOptions.length; i++) {
          // if host = option url then set host to type
          if (currentOptions[i].url === window.location.host) {
            host = currentOptions[i].type;
          }
        }
      }

      // add kanban on left if in a group or repo view
      switch (host) {
        case "github.com":
          github.render();
          break;
        case "bitbucket.org":
          console.log(bitbucket.render());
          break;
        case "gitlab.com":
          gitlab.render();
          break;
        case "gitea.io":
        case "gitea.com":
          gitea.render();
          break;

        default:
          console.log(host + ":custom url is not added in the options page");
          // get project type from options
          break;
      }
    });

    // document.getElementById('color').value = items.favoriteColor
    // document.getElementById('like').checked = items.likesColor
  });

  // chrome.runtime.sendMessage({"getIssues" : issueRequest}, function (htmlResponse) {
  //     console.log(data)
  //     console.log(htmlResponse)
  //     repoMetaHtml = htmlResponse
  //     metaStatus = "ready"
  //     if (callback) {
  //         callback()
  //     }
  // })
}

/* Inject the html into page pseudo */
// const insertMetaInPage = function () {
//   var targetEl = document.getElementsByClassName("pagehead")[0].getElementsByClassName("container")[1]
//   targetEl.insertAdjacentHTML('beforeend', repoMetaHtml)
// }

/* Inject the html into page safely */
const inject = function () {
  if (metaStatus === "na") {
    return;
  }
  /* If meta is still not ready, try fetching it again, this time pass the callback to care of the rest */
  if (metaStatus === "wait") {
    // getRepoMetaHtml(insertMetaInPage)
    getKanbanDetails();
  } else {
    // insertMetaInPage()
  }
};

window.onload = function () {
  inject();
};

getKanbanDetails();
// getRepoMetaHtml()
