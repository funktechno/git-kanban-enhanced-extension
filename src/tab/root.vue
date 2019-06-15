<template>
  <div>
    <div class="custom-options" style="display:none">
      <h3>Custom Git Platform:</h3>
      <ul id="git-hosts">
        <li>git.coolaj86.com : gitea.io <button>Remove</button> </li>
      </ul>
    </div>
    <p></p>
    <div class="custom-options" style="display:none">
      <h3>Add a custom git platform:</h3>
      <label>Url Host: </label>
      <input id="gitHost" v-model="url" placeholder="github.example.com">
      <br>
      <label>Git Host Type: </label>
      <select id="gitType" v-model="type">
        <option value="github.com">github.com (Not Yet Supported)</option>
        <option value="bitbucket.org">bitbucket.org (Not Yet Supported)</option>
        <option value="gitlab.com">gitlab.com (Not Yet Supported)</option>
        <option value="gitea.io">gitlea.com (Not Yet Supported)</option>
      </select>
      <button id="save" v-on:click="save_options">Add</button>

    </div> 
    <!-- end option add -->

    <div id="status"></div>

    <div>
      <h3>Kanban Labels: {{test}}</h3>
      <ul>
        <li>backlog</li>
        <li>analysis</li>
        <li>in-progress</li>
        <li>testing</li>
        <li>closed</li>
      </ul>
    </div>
  </div>
    <!-- div Git Kanban Options
    div {{test}} -->
</template>
<script>
  // import constants from '../js/constants'
  import {optionsKey} from '../js/constants'

  export default {
    data: () => ({
      test: 'candy1',
      type: null,
      url: null,
      loading: false,
      currentOptions: null
    }),
    computed: { },
    created () { },
    mounted () {
      console.log(optionsKey)
      // function restoreOptions () {
      // }
      // this.updateLiOptions()
      this.retrieveManifest()
      // restoreOptions()
    },
    methods: {
      retrieveManifest: function () {
        var vm = this

        this.loading = true
        console.log(this.loading)
        // this.updateLiOptions()
        this.$http.get("/manifest.json").then((response) => {
          // this.updateLiOptions()
          console.log(this.loading)
          this.loading = false
          console.log(this.loading)
          console.log(response)
          // response = JSON.parse(this.responseText)
          if (response.body.name.indexOf("Self Hosted") !== -1) {
            // unhide urls
            var myClasses = document.querySelectorAll('.custom-options'),
              i = 0,
              l = myClasses.length

            for (i; i < l; i++) {
              myClasses[i].style.display = ''
            }

            // restore urls
            console.log('2')
            console.log(optionsKey)
            chrome.storage.sync.get([optionsKey], function (result) {
              debugger
              if (result && result[optionsKey] && result[optionsKey].length) {
                vm.currentOptions = result[optionsKey]
                vm.updateLiOptions()
              } else {
                vm.currentOptions = []
              }
              // document.getElementById('color').value = items.favoriteColor;
              // document.getElementById('like').checked = items.likesColor;
            })
          }
          // response = response
        })
      }, // end retrieve manifest
      save_options: function () {
        console.log("saving options")
        var type = this.type,
          url = this.url,
          vm = this

        if (!type || !url) {
          console.warn("missing url or type")
          return
        }

        if (!this.currentOptions || !this.currentOptions.length) {
          this.currentOptions = []
        }

        this.currentOptions.push({ type, url })

        console.log(this.currentOptions)

        chrome.storage.sync.set({
          [optionsKey]: this.currentOptions
        }, function () {
          // Update status to let user know options were saved.
          // var urlsHtml = ``
          // for (let i = 0 i < this.currentOptions.length i++) {
          //     console.log(this.currentOptions[i])
          //     // create bullet points
          //     urlsHtml += `<li>` + this.currentOptions[i].url + ` : ` + this.currentOptions[i].type + ` <button id="url-` + i + `">Remove</button> </li>`
          // }
          vm.updateLiOptions()
          // setTimeout(function () {
          //     document.getElementById('git-hosts').innerHTML = urlsHtml
          // }, 750)
        })
      },
      updateLiOptions: function () {
        var urlsHtml = ``,
          deleteBtns
        for (let i = 0; i < this.currentOptions.length; i++) {
          console.log(this.currentOptions[i])
          // create bullet points
          urlsHtml += `<li>` + this.currentOptions[i].url + ` : ` + this.currentOptions[i].type + ` <button class="deleteOption" id="url-` + i + `" onclick="deleteOption()">Remove</button> </li>`
        }
        document.getElementById('git-hosts').innerHTML = urlsHtml
        deleteBtns = document.querySelectorAll(`.deleteOption`)
        if (deleteBtns && deleteBtns.length) {
          for (let i = 0; i < deleteBtns.length; i++) {
            deleteBtns[i].onclick = this.deleteOption
          }
        }
      },
      deleteOption: function (e) {
        console.log(e)
        console.log(e.srcElement.id)
        var optionIndex = parseInt(e.srcElement.id.replace("url-")),
          vm = this
        // remove from local object
        this.currentOptions.splice(optionIndex, 1)
        console.log(this.currentOptions)
        // update storage
        // update li
        chrome.storage.sync.set({
          [optionsKey]: this.currentOptions
        }, function () {
          vm.updateLiOptions()
        })
      }
    }
  }
</script>
<style lang="scss">
  div {
    color: blue
  }
</style>