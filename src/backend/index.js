import {optionsKey} from '../js/constants'

console.log('background !')
let backEnd = function () {
  "use strict"
  /* Multiple requests from same page will be served from this variable instead of pinging Github's API */
  // var isMetaReady = false
  var STORAGE = chrome.storage.sync

  chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
      var url = tabs[0].url
      if (url && (url.indexOf("github.com") !== -1 || url.indexOf("bitbucket.org") !== -1)) {
        // must inject manifest and vendor before running inject
        chrome.tabs.executeScript(null, {
          file: 'js/manifest.js',
          runAt: 'document_end'},
        function (result) {
          console.log("done loading file manifest" + JSON.stringify(result))
        })
        chrome.tabs.executeScript(null, {
          file: 'js/vendor.js',
          runAt: 'document_end'},
        function (result) {
          console.log("done loading file vendor" + JSON.stringify(result))
        })
        chrome.tabs.executeScript(null, {
          file: 'js/inject.js',
          runAt: 'document_end'},
        function (result) {
          console.log("done loading file inject:" + JSON.stringify(result))
        })
      }
    })
    // if(chrome.runtime.lastError) {
    //     console.error("Script injection failed: " + chrome.runtime.lastError.message)
    //   }
  })

  /* var bakeHtml = function (metaCreationTimestamp, metaUpdatedTimestamp) {
    var createdOn = new Date(metaCreationTimestamp),
      updatedOn = new Date(metaUpdatedTimestamp),
      responseHtml = '<div style="float: right;">' +
        '<span class="ext-meta-container" title="' + createdOn.toLocaleString() + '">' +
        '<span class="ext-meta-label">Created</span>' +
        '<span class="ext-meta-value">' + createdOn.toLocaleDateString().replace(/\/+/g, "/") + '</span>' +
        '</span>' +
        '<span class="ext-meta-container" title="' + updatedOn.toLocaleString() + '">' +
        '<span class="ext-meta-label">Last updated</span>' +
        '<span class="ext-meta-value">' + updatedOn.toLocaleDateString().replace(/\/+/g, "/") + '</span>' +
        '</span>' +
        '</div>'

    return responseHtml
  } */
  console.log("adding listener")
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request)
    var storageRequest = null
    // debugger
    if (request["getStorage"]) {
      console.log("retrieving storage")
      storageRequest = JSON.parse(request["getStorage"])
      console.log(storageRequest)
      storageRequest += ''
      return
      STORAGE.get([optionsKey], function (result) {
        if (result && result[optionsKey] && result[optionsKey].length) {
          sendResponse(result)
        } else {
          sendResponse(null)
        }
      })
    }
    if (request["setStorage"]) {
      console.log("retrieving storage")
      storageRequest = JSON.parse(request["setStorage"])
      console.log(storageRequest)
      return
      STORAGE.sync.set({
        [optionsKey]: this.currentOptions
      }, function () {
      })
    }
    if (request["getIssues"]) {
      var issueRequest = JSON.parse(request["getIssues"])
      console.log(issueRequest)
      if (issueRequest.location.host === "github.com") {
        console.log("get github issues")
      }
      // console.log(window.location)
      // get issues check url
    }

    /* if (request["getRepoMeta"])
      STORAGE.get("metaCache", function (res) {

      var repoURL = request["getRepoMeta"],
          cache = res.metaCache

      if (typeof cache === "object" && cache.hasOwnProperty(repoURL)) {
          cache = cache[repoURL]
          if (cache.meta_updated === new Date().toDateString()) {
              console.log("sent from cache")
              sendResponse(bakeHtml(cache.repo_creation_timestamp, cache.repo_updated_timestamp))
              return
          }
      }

      console.log("Fetching from API")
      // else get it from Github API
      var xhttp = new XMLHttpRequest()
      xhttp.onreadystatechange = function () {
          if (xhttp.readyState === 4 && xhttp.status === 200) {
              var res = JSON.parse(xhttp.response),
                  meta = {}

              meta[repoURL] = {
                  "meta_updated": new Date().toDateString(),
                  "repo_creation_timestamp": res.created_at,
                  "repo_updated_timestamp": res.pushed_at
              }

              STORAGE.set({ "metaCache": meta })
              sendResponse(bakeHtml(res.created_at, res.pushed_at))
          }
      }

      xhttp.open("GET", "https://api.github.com/repos/" + repoURL, true)
      xhttp.send()
    }) */
    return true
  })
}

backEnd()
