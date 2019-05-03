// Saves options to chrome.storage
function save_options() {
    console.log("saving options")
    var type = document.getElementById('gitType').value;
    var url = document.getElementById('gitHost').checked;
    chrome.storage.sync.set({
        favoriteColor: color,
        likesColor: likesColor
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

function retrieveManifest() {
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    var response = null;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            response = JSON.parse(this.responseText)
            if (response.name == "Git Kanban Self Hosted") {
                // unhide urls
                var myClasses = document.querySelectorAll('.custom-options'),
                    i = 0,
                    l = myClasses.length;

                for (i; i < l; i++) {
                    myClasses[i].style.display = '';
                }
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