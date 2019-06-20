<template>
  <div>Board
    <!-- <ul>
      <li v-for="(issue, index) in resources" v-bind:key="issue.id">
        {{index}}: {{issue}}
      </li>
      <li v-for="(issue, index) in labels" v-bind:key="issue.id">
        {{index}}: {{issue}}
      </li>
      <li v-for="(issue, index) in milestones" v-bind:key="issue.id">
        {{index}}: {{issue}}
      </li>
    </ul> -->
    <kanban-board :stages="stages" :blocks="resources" @update-block="updateBlock">
        <div v-for="stage in stages" :slot="stage" :key="stage">
          <h2>{{ stage }}</h2> 
        </div>
        <div v-for="block in resources" :slot="block.id" :key="block.id">
          <div>
            <strong>id:</strong> {{ block.id }}
          </div>
          <div>
            {{ block.title }}
          </div>
          <div v-if="block.closed">
            Closed!
          </div>
          <a :href="block.url">Link</a>
      </div>
    </kanban-board>

  </div>
</template>

<script>
import {optionsKey} from '../../../constants'

export default {
  data: () => ({
    test: "5",
    loading: false,
    error: null,
    milestones: null,
    labels: null,
    resources: [],
    oToken: null,
    stages: ['Backlog', 'Analysis', 'In-Progress', 'Testing', 'Done'],
    blocks: [
      {
        id: 1,
        status: 'Backlog',
        title: 'Test'
      }
    ]
  }),
  computed: {
    repoName () {
      var url = window.location.pathname.split("/")
      return url[1] + "/" + url[2]
    }
  },
  created () {
    var vm = this
    chrome.storage.sync.get([optionsKey], function (result) {
      if (result && result[optionsKey] && result[optionsKey].length) {
        var currentOptions = result[optionsKey]
        var optionIndex = currentOptions.findIndex(x => x.url.indexOf(window.location.host) !== -1)
        if (vm.optionIndex === -1) {
          vm.error = "error finding option index"
        } else {
          vm.oToken = currentOptions[optionIndex].oToken
          if (currentOptions[optionIndex].repos && currentOptions[optionIndex].repos[vm.repoName] && currentOptions[optionIndex].repos[vm.repoName].stages && currentOptions[optionIndex].repos[vm.repoName].stages.length > 0) {
            vm.stages = currentOptions[optionIndex].repos[vm.repoName].stages
          }
        }
      } else {
        // should never hit b/c won't be enabled
        vm.error = "this should never display"
      }
      // document.getElementById('color').value = items.favoriteColor;
      // document.getElementById('like').checked = items.likesColor;
    })
    this.fetchData()
  },
  mounted () {

  },
  methods: {
    getBlock (id) {
      return this.resources.find(({ id: _id }) => _id === id)
    },
    getStageByName (name) {
      return this.labels.find(({ name: _name }) => _name === name)
    },
    addLabels: async function (issueID, labelIDs) {
      // console.log(this.addLabels.name)
      // console.log(issueID)
      // console.log(labelIDs)
      var url = window.location.pathname.split("/"),
        user = url[1],
        repo = url[2],
        data = user + "/" + repo
      // console.log(data)
      // console.log(this.oToken)
      var oToken = this.oToken
      return this.$http.post(`/api/v1/repos/${data}/issues/${issueID}/labels`, {
        labels: labelIDs
      }, {
        cache: "no-cache",
        headers: {
          Authorization: `token ${oToken}`,
          "Content-Type": "application/json"
        }
      })
    },
    deleteLabel: async function (issueID, labelID) {
      // console.log(this.deleteLabel.name)
      // console.log(issueID)
      // console.log(labelID)
      var url = window.location.pathname.split("/"),
        user = url[1],
        repo = url[2],
        data = user + "/" + repo
      // console.log(data)
      // console.log(this.oToken)
      var oToken = this.oToken

      return this.$http.delete(`/api/v1/repos/${data}/issues/${issueID}/labels/${labelID}`, {
        cache: "no-cache",
        headers: {
          Authorization: `token ${oToken}`,
          "Content-Type": "application/json"
        }
      })
    },
    updateBlock: async function (issueID, newStage) {
      console.log(this.updateBlock.name)
      // console.log(issueID)
      // console.log(newStage)
      this.$emit("loading", true)
      const block = this.getBlock(Number.parseInt(issueID, 10))
      // console.log(block)
      const stage = this.getStageByName(newStage)
      // console.log(stage)

      // console.log("end")
      if (stage.isClosedStage) {
        // await this.client.closeIssue(issueID as any);
        block.closed = true
      } else if (block.closed) {
        // await this.client.openIssue(issueID as any);
        block.closed = false
      }

      // TODO: oauth token from users/settings/application appears to be required to make changes
      if (this.oToken) {
        await this.replaceLabelOfIssue(issueID, block.statusID, stage.id)
        this.updateStageOfBlock(block, stage)
      }
      // console.log(block)
      this.$emit("loading", false)
      // debugger
      // this.blocks.find(b => b.id === Number(id)).status = status
    },
    replaceLabelOfIssue: async function (issueID, oldLabelID, newLabelID) {
      await this.deleteLabel(issueID, oldLabelID).then(function (response) {
        // console.log(response)
      }).catch(function (errors) {
        // console.log(errors)
      })
      await this.addLabels(issueID, [newLabelID]).then(function (response) {
        // console.log(response)
      }).catch(function (errors) {
        // console.log(errors)
      })
    },
    updateStageOfBlock (block, { name, id }) {
      block.status = name
      block.statusID = id
    },
    fetchData () {
      console.log(this.fetchData.name)
      this.error = this.milestones = this.labels = null
      this.resources = []
      this.loading = true
      var url = window.location.pathname.split("/"),
        user = url[1],
        repo = url[2],
        data = user + "/" + repo
      // console.log(data)
      // if (!repo) {
      //   metaStatus = "na"
      //   return
      // }
      this.$http.get("/api/v1/repos/" + data + "/issues").then((response) => {
        this.loading = false
        // console.log(response)
        // this.message = response.data.message;
        if (response.status === 200) {
          // console.log(JSON.parse(JSON.stringify(response.data)))
          var resources = response.data

          for (let i = 0; i < resources.length; i++) {
            resources[i].status = 'Backlog'
            resources[i].url = resources[i].url.replace("/api/v1/repos", "")
            for (let k = 0; k < resources[i].labels.length; k++) {
              if (this.stages.indexOf(resources[i].labels[k].name) !== -1) {
                resources[i].status = resources[i].labels[k].name
                resources[i].statusID = resources[i].labels[k].id
                resources[i].id = resources[i].number
                break
              }
            }
          }
          this.resources = resources
        } else {
          this.errors = "Failed to Load"
        }
      }).catch((error) => {
        this.errors = "Failed to Retrieve issues"
        console.log(error)
        this.loading = null
      })
      this.$http.get("/api/v1/repos/" + data + "/milestones").then((response) => {
        this.loading = false
        // console.log(response)
        // this.message = response.data.message;
        if (response.status === 200) {
          // console.log(JSON.parse(JSON.stringify(response.data)))
          this.milestones = response.data
        } else {
          this.errors = "Failed to Load"
        }
      }).catch((error) => {
        this.errors = "Failed to Retrieve milestones"
        console.log(error)
        this.loading = null
      })
      this.$http.get("/api/v1/repos/" + data + "/labels").then((response) => {
        this.loading = false
        // console.log(response)
        // this.message = response.data.message;
        if (response.status === 200) {
          // console.log(JSON.parse(JSON.stringify(response.data)))
          this.labels = response.data
        } else {
          this.errors = "Failed to Load"
        }
      }).catch((error) => {
        this.errors = "Failed to Retrieve labels"
        console.log(error)
        this.loading = null
      })
      // getPost(this.$route.params.id, (err, post) => {
      //   this.loading = false
      //   if (err) {
      //     this.error = err.toString()
      //   } else {
      //     this.post = post
      //   }
      // })
    }
  }
}
</script>

<style lang="scss">
  @import '../../../../css/kanban.scss';
</style> 