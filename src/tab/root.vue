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
      <input id="gitHost" placeholder="github.example.com">
      <br>
      <label>Git Host Type: </label>
      <select id="gitType">
        <option value="github.com">github.com (Not Yet Supported)</option>
        <option value="bitbucket.org">bitbucket.org (Not Yet Supported)</option>
        <option value="gitlab.com">gitlab.com (Not Yet Supported)</option>
        <option value="gitea.io">gitlea.com (Not Yet Supported)</option>
      </select>
      <button id="save">Add</button>

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
  import {optionsKey} from '../js/contants'
  export default {
    data: () => ({
      test: 'candy1',
      currentOptions: null
    }),
    computed: { },
    created () { },
    mounted () {
    },
    methods: {
      save_options: function () {
        console.log("saving options")
        var type = document.getElementById('gitType').value
        var url = document.getElementById('gitHost').value

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
          this.updateLiOptions()
          // setTimeout(function () {
          //     document.getElementById('git-hosts').innerHTML = urlsHtml
          // }, 750)
        })
      }
    },
    updateLiOptions: function () {
      var urlsHtml = ``
      for (let i = 0; i < this.currentOptions.length; i++) {
        console.log(this.currentOptions[i])
        // create bullet points
        urlsHtml += `<li>` + this.currentOptions[i].url + ` : ` + this.currentOptions[i].type + ` <button class="deleteOption" id="url-` + i + `" onclick="deleteOption()">Remove</button> </li>`
      }
      document.getElementById('git-hosts').innerHTML = urlsHtml
      var deleteBtns = document.querySelectorAll(`.deleteOption`)
      if (deleteBtns && deleteBtns.length) {
        for (let i = 0; i < deleteBtns.length; i++) {
          deleteBtns[i].onclick = this.deleteOption
        }
      }
    },
    deleteOption: function (e) {
      console.log(e)
      console.log(e.srcElement.id)
      var optionIndex = parseInt(e.srcElement.id.replace("url-"))
      // remove from local object
      this.currentOptions.splice(optionIndex, 1)
      console.log(this.currentOptions)
      // update storage
      // update li
      chrome.storage.sync.set({
        [optionsKey]: this.currentOptions
      }, function () {
        this.updateLiOptions()
      })
    }
  }
</script>
<style lang="scss">
  div {
    color: blue
  }
</style>