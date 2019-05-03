// Saves options to chrome.storage
function save_options() {
    console.log("saving options")
    var type = document.getElementById('gitType').value;
    var url = document.getElementById('gitHost').value;

    if (!type || !url) {
        console.warn("missing url or type")
        return
    }

    if (!currentOptions || !currentOptions.length)
        currentOptions = []

    currentOptions.push({ type, url })

    console.log(currentOptions)


    chrome.storage.sync.set({
        [optionsKey]: currentOptions
    }, function () {
        // Update status to let user know options were saved.
        // var urlsHtml = ``
        // for (let i = 0; i < currentOptions.length; i++) {
        //     console.log(currentOptions[i])
        //     // create bullet points
        //     urlsHtml += `<li>` + currentOptions[i].url + ` : ` + currentOptions[i].type + ` <button id="url-` + i + `">Remove</button> </li>`
        // }
        updateLiOptions()
        // setTimeout(function () {
        //     document.getElementById('git-hosts').innerHTML = urlsHtml
        // }, 750);
    });
}

const optionsKey = "git-kanban"

var currentOptions = null

function deleteOption(e) {
    console.log(e)
    console.log(e.srcElement.id)
    var optionIndex = parseInt(e.srcElement.id.replace("url-"))
    // remove from local object
    currentOptions.splice(optionIndex, 1)
    console.log(currentOptions)
    // update storage
    // update li
    chrome.storage.sync.set({
        [optionsKey]: currentOptions
    }, function () {
        updateLiOptions()
    });
}

function updateLiOptions() {
    var urlsHtml = ``
    for (let i = 0; i < currentOptions.length; i++) {
        console.log(currentOptions[i])
        // create bullet points
        urlsHtml += `<li>` + currentOptions[i].url + ` : ` + currentOptions[i].type + ` <button class="deleteOption" id="url-` + i + `" onclick="deleteOption()">Remove</button> </li>`
    }
    document.getElementById('git-hosts').innerHTML = urlsHtml
    var deleteBtns = document.querySelectorAll(`.deleteOption`)
    if (deleteBtns && deleteBtns.length)
        for (let i = 0; i < deleteBtns.length; i++) {
            deleteBtns[i].onclick = deleteOption
        }
}

function retrieveManifest() {
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    var response = null;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            response = JSON.parse(this.responseText)
            if (response.name.indexOf("Self Hosted") != -1) {
                // unhide urls
                var myClasses = document.querySelectorAll('.custom-options'),
                    i = 0,
                    l = myClasses.length;

                for (i; i < l; i++) {
                    myClasses[i].style.display = '';
                }

                // restore urls
                chrome.storage.sync.get([optionsKey], function (result) {

                    if (result && result[optionsKey] && result[optionsKey].length) {
                        currentOptions = result[optionsKey];
                        updateLiOptions()
                    } else {
                        currentOptions = []
                    }
                    // document.getElementById('color').value = items.favoriteColor;
                    // document.getElementById('like').checked = items.likesColor;
                });
            }
        }
    });

    xhr.open("GET", "./manifest.json");

    xhr.send(data);
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    retrieveManifest();
    // Use default value color = 'red' and likesColor = true.
    console.log("restoring options")
    // chrome.storage.sync.get({
    //     favoriteColor: 'red',
    //     likesColor: true
    // }, function (items) {
    //     document.getElementById('color').value = items.favoriteColor;
    //     document.getElementById('like').checked = items.likesColor;
    // });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);