<template>
  <div>settings:
    <span v-if="currentOptions">{{currentOptions[optionIndex]}}</span>
    <br>
    <span v-if="currentOptions && currentOptions[optionIndex].repos">{{currentOptions[optionIndex].repos[repoName]}} {{currentOptions[optionIndex].repos[repoName].stages}}</span>
    <div>
      <h3>Kanban Labels:</h3>
      <ul v-if="currentOptions && currentOptions[optionIndex].repos && currentOptions[optionIndex].repos[repoName]">
        <li v-for="(stage, index) in currentOptions[optionIndex].repos[repoName].stages" v-bind:key="index">
          {{stage}}<button v-on:click="deleteLabel(index)">Remove</button>
        </li>
      </ul>
    </div>
    <br>
    <label>Label: </label> 
    <input id="gitHost" v-model="label" placeholder="github.example.com">
    <br>
    <button id="save" v-on:click="addLabel">Add Label</button>
    <br>
    <span v-if="errors">{{errors}}</span>

  </div>
</template>

<script>
import {optionsKey} from '../../../constants'

export default {
  data: () => ({
    test: "4",
    label: null,
    optionIndex: null,
    currentOptions: null,
    errors: null
  }),
  computed: {
    repoName () {
      var url = window.location.pathname.split("/")
      return url[1] + "/" + url[2]
    }
  },
  created () {},
  mounted () {
    var vm = this
    chrome.storage.sync.get([optionsKey], function (result) {
      if (result && result[optionsKey] && result[optionsKey].length) {
        vm.currentOptions = result[optionsKey]
        vm.optionIndex = vm.currentOptions.findIndex(x => window.location.host.indexOf(x.url) !== -1)
        if (vm.optionIndex === -1) {
          vm.errors = "error finding option index"
        }
      } else {
        // should never hit b/c won't be enabled
        vm.errors = "this should never display"
      }
      // document.getElementById('color').value = items.favoriteColor;
      // document.getElementById('like').checked = items.likesColor;
    })
  },
  methods: {
    deleteLabel: function (e) {
      // remove from local object
      this.currentOptions[this.optionIndex].repos[this.repoName].stages.splice(e, 1)
      // update storage
      // update li
      // chrome.storage.sync.set({
      //   [optionsKey]: this.currentOptions
      // }, function () {
      // })
    },
    addLabel () {
      if (!this.label) {
        this.errors = "missing label text"
        return
      }
      // var index = this.currentOptions.findIndex(x => window.location.host.indexOf(x.url) !== -1)
      // console.log("inde:" + index)
      // console.log(this.currentOptions)

      if (this.optionIndex !== -1) {
        if (!this.currentOptions[this.optionIndex].repos) {
          this.currentOptions[this.optionIndex].repos = {}
        }
        if (!this.currentOptions[this.optionIndex].repos[this.repoName]) {
          this.currentOptions[this.optionIndex].repos[this.repoName] = {
            stages: [this.label]
          }
        } else {
          this.currentOptions[this.optionIndex].repos[this.repoName].stages.push(this.label)
        }
      }
      this.currentOptions = JSON.parse(JSON.stringify(this.currentOptions))
      console.log(this.currentOptions)
      // save storage memory
      // chrome.storage.sync.set({
      //   [optionsKey]: this.currentOptions
      // }, function () {
      // })
    }
  }
}
</script>