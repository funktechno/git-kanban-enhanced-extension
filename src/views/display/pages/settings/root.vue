<template>
  <div>
    settings:
    <!-- <span v-if="currentOptions && optionIndex !== -1">{{currentOptions[optionIndex]}}</span> -->
    <!-- <br> -->
    <!-- {{optionIndex}} -->
    <!-- <span v-if="currentOptions && optionIndex !== -1 && currentOptions[optionIndex].repos && currentOptions[optionIndex].repos[repoName]">{{currentOptions[optionIndex].repos[repoName]}} {{currentOptions[optionIndex].repos[repoName].stages}}</span> -->
    <div>
      <h3>Kanban Labels:</h3>
      <ul
        v-if="
          currentOptions &&
            optionIndex !== -1 &&
            currentOptions[optionIndex].repos &&
            currentOptions[optionIndex].repos[repoName]
        "
      >
        <li
          v-for="(stage, index) in currentOptions[optionIndex].repos[repoName]
            .stages"
          v-bind:key="index"
        >
          <div
            class="ui label has-emoji"
            v-bind:style="labelStyle(stage)"
            style="color: #000"
          >
            <i class="octicon octicon-tag"></i> {{ stage }}
          </div>
          <button v-if="index != 0" v-on:click="moveUp(index)">
            <i class="octicon octicon-arrow-up"></i>
          </button>
          <button
            v-if="
              index !=
                currentOptions[optionIndex].repos[repoName].stages.length - 1
            "
            v-on:click="moveDown(index)"
          >
            <i class="octicon octicon-arrow-down"></i>
          </button>
          <button v-on:click="deleteLabel(index)">Remove</button>
        </li>
      </ul>
    </div>
    <!-- {{labels}} -->
    <br />
    <label
      >Label:
      <div
        class="ui label has-emoji"
        v-if="labelIndex != null && labelIndex != -1"
        v-bind:style="{
          'background-color': '#' + availableLabels[labelIndex].color
        }"
        style="color: #000"
      >
        <i class="octicon octicon-tag"></i>
        {{ availableLabels[labelIndex].name }}
      </div>
    </label>
    <select id="gitHost" v-model="labelIndex">
      <option
        v-for="(l, index) in availableLabels"
        v-bind:key="l.id"
        :value="index"
        ><span v-bind:style="{ color: '#' + l.color }">{{
          l.name
        }}</span></option
      >
    </select>
    <br />
    <button id="save" v-on:click="addLabel">Add Label</button>
    <br />
    <span v-if="errors">{{ errors }}</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { optionsKey } from "@/utils/constants";

export default Vue.extend({
  data: () => ({
    test: "4",
    labelIndex: null as null | number,
    labels: null as null | any[],
    loading: false as boolean | null,
    error: (null as unknown) as any,
    errors: (null as unknown) as any,
    availableLabels: null as null | any[],
    optionIndex: (null as unknown) as null | number,
    currentOptions: (null as unknown) as null | any[]
  }),
  computed: {
    repoName() {
      const url = window.location.pathname.split("/");
      return url[1] + "/" + url[2];
    }
  },
  // created() {},
  mounted() {
    const vm = this,
      url = window.location.pathname.split("/"),
      user = url[1],
      repo = url[2],
      data = user + "/" + repo;
    chrome.storage.sync.get([optionsKey], function(result) {
      // console.log("result is")
      // console.log(result)
      if (result && result[optionsKey] && result[optionsKey].length) {
        vm.currentOptions = result[optionsKey];
        const currentOptions = vm.currentOptions;
        if (currentOptions) {
          vm.optionIndex = currentOptions.findIndex(
            x => x.url.indexOf(window.location.host) !== -1
          );
          if (vm.optionIndex === -1) {
            vm.errors = "error finding option index";
          }
        }
      } else {
        // should never hit b/c won't be enabled
        vm.errors = "this should never display";
      }
      // document.getElementById('color').value = items.favoriteColor;
      // document.getElementById('like').checked = items.likesColor;
    });
    this.$http
      .get(window.location.origin + "/api/v1/repos/" + data + "/labels")
      .then(
        response => {
          this.loading = false;
          // console.log(response)
          // this.message = response.data.message;
          if (response.status === 200) {
            // console.log(JSON.parse(JSON.stringify(response.data)))
            this.labels = response.data;

            // TODO: populate this.av from this.labels and this.currentoptions
            const currentOptions = vm.currentOptions;
            const optionIndex = vm.optionIndex;
            if (
              currentOptions &&
              optionIndex &&
              this.labels &&
              optionIndex !== -1 &&
              currentOptions[optionIndex].repos &&
              currentOptions[optionIndex].repos[vm.repoName] &&
              currentOptions[optionIndex].repos[vm.repoName].stages &&
              currentOptions[optionIndex].repos[vm.repoName].stages.length > 0
            ) {
              vm.availableLabels = this.labels.filter(function(el) {
                return (
                  currentOptions[optionIndex].repos[vm.repoName].stages.indexOf(
                    el.name
                  ) === -1
                );
              });
            } else {
              this.availableLabels = this.labels;
            }
          } else {
            this.errors = "Failed to Load";
          }
        },
        (error: any) => {
          this.errors = "Failed to Retrieve labels";
          console.log(error);
          this.loading = null;
        }
      );
  },
  methods: {
    labelStyle(labelName: string) {
      if (this.labels) {
        const lIndex = this.labels.findIndex(x => x.name === labelName);
        if (lIndex !== -1) {
          return { "background-color": "#" + this.labels[lIndex].color };
        }
      }

      return null;
    },
    deleteLabel: function(e: number) {
      const vm = this;
      const currentOptions = vm.currentOptions;
      const optionIndex = vm.optionIndex;
      if (
        currentOptions &&
        optionIndex &&
        optionIndex !== -1 &&
        currentOptions[optionIndex].repos &&
        currentOptions[optionIndex].repos[vm.repoName] &&
        currentOptions[optionIndex].repos[vm.repoName].stages &&
        currentOptions[optionIndex].repos[vm.repoName].stages.length > 0
      ) {
        // remove from local object
        currentOptions[optionIndex].repos[this.repoName].stages.splice(e, 1);
        // update storage
        // update li
        chrome.storage.sync.set(
          {
            [optionsKey]: this.currentOptions
          },
          function() {
            //
          }
        );
        if (this.labels)
          this.availableLabels = this.labels.filter(function(el) {
            return (
              currentOptions[optionIndex].repos[vm.repoName].stages.indexOf(
                el.name
              ) === -1
            );
          });
      }
    },
    swapArrayElements: function(arr: any[], indexA: number, indexB: number) {
      const temp = arr[indexA];
      arr[indexA] = arr[indexB];
      arr[indexB] = temp;
      return arr;
    },
    moveUp: function(e: number) {
      // debugger
      // remove from local object
      const vm = this;
      const currentOptions = vm.currentOptions;
      const optionIndex = vm.optionIndex;
      if (
        currentOptions &&
        optionIndex &&
        optionIndex !== -1 &&
        currentOptions[optionIndex].repos &&
        currentOptions[optionIndex].repos[vm.repoName] &&
        currentOptions[optionIndex].repos[vm.repoName].stages &&
        currentOptions[optionIndex].repos[vm.repoName].stages.length > 0
      ) {
        const stages = currentOptions[optionIndex].repos[this.repoName].stages;
        currentOptions[optionIndex].repos[
          this.repoName
        ].stages = this.swapArrayElements(stages, e, e - 1);
        this.currentOptions = JSON.parse(JSON.stringify(this.currentOptions));

        // this.currentOptions[this.optionIndex].repos[this.repoName].stages.splice(e, 1)
        // update storage
        // update li
        chrome.storage.sync.set(
          {
            [optionsKey]: this.currentOptions
          },
          function() {
            //
          }
        );
      }
    },
    moveDown: function(e: number) {
      // debugger
      // remove from local object
      // this.currentOptions[this.optionIndex].repos[this.repoName].stages.splice(e, 1)
      let currentOptions = this.currentOptions;
      const optionIndex = this.optionIndex;
      if (
        currentOptions &&
        optionIndex &&
        optionIndex !== -1 &&
        currentOptions[optionIndex].repos &&
        currentOptions[optionIndex].repos[this.repoName] &&
        currentOptions[optionIndex].repos[this.repoName].stages &&
        currentOptions[optionIndex].repos[this.repoName].stages.length > 0
      ) {
        const stages = currentOptions[optionIndex].repos[this.repoName].stages;
        currentOptions[optionIndex].repos[
          this.repoName
        ].stages = this.swapArrayElements(stages, e, e + 1);
        currentOptions = JSON.parse(JSON.stringify(currentOptions));

        // update storage
        // update li
        chrome.storage.sync.set(
          {
            [optionsKey]: this.currentOptions
          },
          function() {
            //
          }
        );
      }
    },
    addLabel() {
      const vm = this;

      if (
        this.availableLabels == null ||
        this.labelIndex === null ||
        this.labelIndex === -1
      ) {
        this.errors = "missing label text";
        return;
      }

      const label = this.availableLabels[this.labelIndex];

      // var index = this.currentOptions.findIndex(x => window.location.host.indexOf(x.url) !== -1)
      // console.log("inde:" + index)
      // console.log(this.currentOptions)
      if (!this.currentOptions) {
        this.currentOptions = [];
      }

      if (this.optionIndex !== null && this.optionIndex !== -1) {
        if (!this.currentOptions[this.optionIndex].repos) {
          this.currentOptions[this.optionIndex].repos = {};
        }
        if (!this.currentOptions[this.optionIndex].repos[this.repoName]) {
          this.currentOptions[this.optionIndex].repos[this.repoName] = {
            stages: [label.name]
          };
        } else {
          this.currentOptions[this.optionIndex].repos[
            this.repoName
          ].stages.push(label.name);
        }
      } else {
        const ignoreList = [
            "github.com",
            "bitbucket.org",
            "gitlab.com",
            "gitea.com"
          ],
          host = window.location.host;

        if (ignoreList.indexOf(host) !== -1) {
          this.currentOptions.push({
            url: host,
            repos: {
              [this.repoName]: {
                stages: [label.name]
              }
            }
          });
          this.optionIndex = this.currentOptions.findIndex(
            x => x.url.indexOf(host) !== -1
          );
        }

        // TODO init from scratch
      }
      this.currentOptions = JSON.parse(JSON.stringify(this.currentOptions));
      // console.log(this.currentOptions)
      // save storage memory
      chrome.storage.sync.set(
        {
          [optionsKey]: vm.currentOptions
        },
        function() {
          //
        }
      );
      // console.log(this.availableLabels)
      // TODO: remove from available
      const currentOptions = vm.currentOptions;
      const optionIndex = vm.optionIndex;
      if (
        currentOptions &&
        optionIndex &&
        this.labels &&
        optionIndex !== -1 &&
        currentOptions[optionIndex].repos &&
        currentOptions[optionIndex].repos[vm.repoName] &&
        currentOptions[optionIndex].repos[vm.repoName].stages &&
        currentOptions[optionIndex].repos[vm.repoName].stages.length > 0
      ) {
        this.availableLabels = this.labels.filter(function(el) {
          return (
            currentOptions[optionIndex].repos[vm.repoName].stages.indexOf(
              el.name
            ) === -1
          );
        });
      }

      this.labelIndex = null;
    }
  }
});
</script>
