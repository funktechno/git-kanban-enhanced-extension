<template>
  <div>settings:
    <span v-if="currentOptions">{{currentOptions[optionIndex]}}</span>
    <br>
    <span v-if="currentOptions && currentOptions[optionIndex].repos && currentOptions[optionIndex].repos[repoName]">{{currentOptions[optionIndex].repos[repoName]}} {{currentOptions[optionIndex].repos[repoName].stages}}</span>
    <div>
      <h3>Kanban Labels:</h3>
      <ul v-if="currentOptions && currentOptions[optionIndex].repos && currentOptions[optionIndex].repos[repoName]">
        <li v-for="(stage, index) in currentOptions[optionIndex].repos[repoName].stages" v-bind:key="index">
          <div class="ui label has-emoji" v-bind:style="labelStyle(stage)" style="color: #000">
            <i class="octicon octicon-tag"></i> {{stage}}
          </div>
          <button v-if="index!=0" v-on:click="moveUp(index)"><i class="octicon octicon-arrow-up"></i></button>
          <button v-if="index!=currentOptions[optionIndex].repos[repoName].stages.length-1" v-on:click="moveDown(index)"><i class="octicon octicon-arrow-down"></i></button>
          <button v-on:click="deleteLabel(index)">Remove</button>
        </li>
      </ul>
    </div>
    {{labels}}
    <br>
    <label>Label: 
      <div class="ui label has-emoji" v-if="labelIndex != null && labelIndex != -1" v-bind:style="{'background-color': '#' + availableLabels[labelIndex].color}" style="color: #000">
        <i class="octicon octicon-tag"></i> {{availableLabels[labelIndex].name}}
      </div>
    </label> 
    <select id="gitHost" v-model="labelIndex">
      <option v-for="(l,index) in availableLabels" v-bind:key="l.id" :value="index"><span v-bind:style="{color: '#' + l.color}">{{l.name}}</span></option>
    </select>
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
    labelIndex: null,
    labels: null,
    availableLabels: null,
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
    var vm = this,
      url = window.location.pathname.split("/"),
      user = url[1],
      repo = url[2],
      data = user + "/" + repo
    chrome.storage.sync.get([optionsKey], function (result) {
      if (result && result[optionsKey] && result[optionsKey].length) {
        vm.currentOptions = result[optionsKey]
        vm.optionIndex = vm.currentOptions.findIndex(x => x.url.indexOf(window.location.host) !== -1)
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
    this.$http.get("/api/v1/repos/" + data + "/labels").then((response) => {
      this.loading = false
      console.log(response)
      // this.message = response.data.message;
      if (response.status === 200) {
        console.log(JSON.parse(JSON.stringify(response.data)))
        this.labels = response.data

        // TODO: populate this.av from this.labels and this.currentoptions
        if (vm.currentOptions && vm.currentOptions[vm.optionIndex].repos && vm.currentOptions[vm.optionIndex].repos[vm.repoName] && vm.currentOptions[vm.optionIndex].repos[vm.repoName].stages && vm.currentOptions[vm.optionIndex].repos[vm.repoName].stages.length > 0) {
          vm.availableLabels = this.labels.filter(function (el) {
            return vm.currentOptions[vm.optionIndex].repos[vm.repoName].stages.indexOf(el.name) === -1
          })
        } else {
          this.availableLabels = this.labels
        }
      } else {
        this.errors = "Failed to Load"
      }
    }).catch((error) => {
      this.errors = "Failed to Retrieve labels"
      console.log(error)
      this.loading = null
    })
  },
  methods: {
    labelStyle (labelName) {
      if (this.labels) {
        var lIndex = this.labels.findIndex(x => x.name === labelName)
        if (lIndex !== -1) {
          return {'background-color': '#' + this.labels[lIndex].color}
        }
      }

      return null
    },
    deleteLabel: function (e) {
      var vm = this
      // remove from local object
      this.currentOptions[this.optionIndex].repos[this.repoName].stages.splice(e, 1)
      // update storage
      // update li
      chrome.storage.sync.set({
        [optionsKey]: this.currentOptions
      }, function () {
      })

      this.availableLabels = this.labels.filter(function (el) {
        return vm.currentOptions[vm.optionIndex].repos[vm.repoName].stages.indexOf(el.name) === -1
      })
    },
    swapArrayElements: function (arr, indexA, indexB) {
      var temp = arr[indexA]
      arr[indexA] = arr[indexB]
      arr[indexB] = temp
      return arr
    },
    moveUp: function (e) {
      // debugger
      // remove from local object

      var stages = this.currentOptions[this.optionIndex].repos[this.repoName].stages
      this.currentOptions[this.optionIndex].repos[this.repoName].stages = this.swapArrayElements(stages, e, e - 1)
      this.currentOptions = JSON.parse(JSON.stringify(this.currentOptions))

      // this.currentOptions[this.optionIndex].repos[this.repoName].stages.splice(e, 1)
      // update storage
      // update li
      chrome.storage.sync.set({
        [optionsKey]: this.currentOptions
      }, function () {
      })
    },
    moveDown: function (e) {
      // debugger
      // remove from local object
      // this.currentOptions[this.optionIndex].repos[this.repoName].stages.splice(e, 1)
      var stages = this.currentOptions[this.optionIndex].repos[this.repoName].stages
      this.currentOptions[this.optionIndex].repos[this.repoName].stages = this.swapArrayElements(stages, e, e + 1)
      this.currentOptions = JSON.parse(JSON.stringify(this.currentOptions))

      // update storage
      // update li
      chrome.storage.sync.set({
        [optionsKey]: this.currentOptions
      }, function () {
      })
    },
    addLabel () {
      var vm = this

      if (this.labelIndex === null || this.labelIndex === -1) {
        this.errors = "missing label text"
        return
      }

      var label = this.availableLabels[this.labelIndex]

      // var index = this.currentOptions.findIndex(x => window.location.host.indexOf(x.url) !== -1)
      // console.log("inde:" + index)
      // console.log(this.currentOptions)

      if (this.optionIndex !== -1) {
        if (!this.currentOptions[this.optionIndex].repos) {
          this.currentOptions[this.optionIndex].repos = {}
        }
        if (!this.currentOptions[this.optionIndex].repos[this.repoName]) {
          this.currentOptions[this.optionIndex].repos[this.repoName] = {
            stages: [this.label.name]
          }
        } else {
          this.currentOptions[this.optionIndex].repos[this.repoName].stages.push(label.name)
        }
      }
      this.currentOptions = JSON.parse(JSON.stringify(this.currentOptions))
      console.log(this.currentOptions)
      // save storage memory
      chrome.storage.sync.set({
        [optionsKey]: vm.currentOptions
      }, function () {
      })

      // TODO: remove from available
      this.availableLabels = this.labels.filter(function (el) {
        return vm.currentOptions[vm.optionIndex].repos[vm.repoName].stages.indexOf(el.name) === -1
      })

      this.labelIndex = null
    }
  }
}
</script>