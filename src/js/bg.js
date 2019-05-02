(function () {
    "use strict";
    /* Multiple requests from same page will be served from this variable instead of pinging Github's API */
    var isMetaReady = false;
    var STORAGE = chrome.storage.sync;

    var bakeHtml = function (metaCreationTimestamp, metaUpdatedTimestamp) {

        var created_on = new Date(metaCreationTimestamp),
            updated_on = new Date(metaUpdatedTimestamp),
            responseHtml = '<div style="float: right;">' +
                '<span class="ext-meta-container" title="' + created_on.toLocaleString() + '">' +
                '<span class="ext-meta-label">Created</span>' +
                '<span class="ext-meta-value">' + created_on.toLocaleDateString().replace(/\/+/g, "/") + '</span>' +
                '</span>' +
                '<span class="ext-meta-container" title="' + updated_on.toLocaleString() + '">' +
                '<span class="ext-meta-label">Last updated</span>' +
                '<span class="ext-meta-value">' + updated_on.toLocaleDateString().replace(/\/+/g, "/") + '</span>' +
                '</span>' +
                '</div>';


        return responseHtml;
    };

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        console.log(request)
        if(request["getIssues"]){
            var issueRequest = JSON.parse(request["getIssues"])
            console.log(issueRequest)
            if(issueRequest.location.host=="github.com"){
                console.log("get github issues")
            }
            // console.log(window.location)
            // get issues check url
        }

        if (request["getRepoMeta"])
            STORAGE.get("metaCache", function (res) {

                var repoURL = request["getRepoMeta"],
                    cache = res.metaCache;


                if (typeof cache === "object" && cache.hasOwnProperty(repoURL)) {
                    cache = cache[repoURL];
                    if (cache.meta_updated == new Date().toDateString()) {
                        console.log("sent from cache");
                        sendResponse(bakeHtml(cache.repo_creation_timestamp, cache.repo_updated_timestamp));
                        return;
                    }
                }

                console.log("Fetching from API");
                // else get it from Github API
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (xhttp.readyState === 4 && xhttp.status === 200) {
                        var res = JSON.parse(xhttp.response),
                            meta = {};

                        meta[repoURL] = {
                            "meta_updated": new Date().toDateString(),
                            "repo_creation_timestamp": res.created_at,
                            "repo_updated_timestamp": res.pushed_at
                        };

                        STORAGE.set({ "metaCache": meta });
                        sendResponse(bakeHtml(res.created_at, res.pushed_at));
                    }
                };

                xhttp.open("GET", "https://api.github.com/repos/" + repoURL, true);
                xhttp.send();
            });
        return true;
    });
}());
