<template>
  <div>
    <div class="custom-options" style="display:none">
      <h3>Custom Git Platform:</h3>
      <ul id="git-hosts">
        <li v-if="!currentOptions || !currentOptions.length>0">Example - git.coolaj86.com : gitea.io <button>Remove</button> </li>
        <li v-for="(opt, index) in currentOptions" v-bind:key="opt.url">
          {{opt.url}} : {{opt.type}} <button v-on:click="deleteOption(index)">Remove</button>
        </li>
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
      <h3>Kanban Labels:</h3>
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
        // this.updateLiOptions()
        this.$http.get("/manifest.json").then((response) => {
          // this.updateLiOptions()
          this.loading = false
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
            chrome.storage.sync.get([optionsKey], function (result) {
              if (result && result[optionsKey] && result[optionsKey].length) {
                vm.currentOptions = result[optionsKey]
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
          url = this.url

        if (!type || !url) {
          console.warn("missing url or type")
          return
        }

        if (!this.currentOptions || !this.currentOptions.length) {
          this.currentOptions = []
        }

        this.currentOptions.push({ type, url })

        chrome.storage.sync.set({
          [optionsKey]: this.currentOptions
        }, function () {
        })
      },
      deleteOption: function (e) {
        console.log(e)
        // remove from local object
        this.currentOptions.splice(e, 1)
        console.log(this.currentOptions)
        // update storage
        // update li
        chrome.storage.sync.set({
          [optionsKey]: this.currentOptions
        }, function () {
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