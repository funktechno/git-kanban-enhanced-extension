<template>
  <div>
    <h2>Board</h2>
    
    <v-style scoped>
      {{ styleKanban }}
    </v-style>
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
    <kanban-board
      :stages="stages"
      :blocks="resources"
      @update-block="updateBlock"
    >
      <div v-for="stage in stages" :slot="stage" :key="stage">
        <h2>{{ stage }}</h2>
      </div>
      <div v-for="block in resources" :slot="block.id" :key="block.id">
        <div><strong>id:</strong> {{ block.id }}</div>
        <div>
          {{ block.title }}
        </div>
        <div v-if="block.closed">Closed!</div>
        <a :href="block.url">Link</a>
      </div>
    </kanban-board>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { optionsKey } from "@/utils/constants";
import styleKanban from "@/css/kanban.css.ts";

interface LabelI {
  id: string;
  isClosedStage: boolean;
  name: string;
}
interface IssueI {
  status: string;
  statusID: string;
  closed: boolean;
  id: number | string;
}
export default Vue.extend({
  data: () => ({
    test: "5",
    styleKanban: styleKanban,
    loading: false as boolean | null,
    error: (null as unknown) as any,
    errors: (null as unknown) as any,
    milestones: null,
    labels: (null as unknown) as LabelI[] | null,
    resources: [] as IssueI[],
    oToken: null,
    stages: ["Backlog", "Analysis", "In-Progress", "Testing", "Done"],
    blocks: [
      {
        id: 1,
        status: "Backlog",
        title: "Test",
      },
    ],
  }),
  computed: {
    repoName() {
      const url = window.location.pathname.split("/");
      return url[1] + "/" + url[2];
    },
  },
  created() {
    const vm = this;
    chrome.storage.sync.get([optionsKey], function (result) {
      if (result && result[optionsKey] && result[optionsKey].length) {
        const currentOptions = result[optionsKey];
        const optionIndex = currentOptions.findIndex(
          (x: any) => x.url.indexOf(window.location.host) !== -1
        );
        if (optionIndex === -1) {
          vm.error = "error finding option index";
        } else {
          vm.oToken = currentOptions[optionIndex].oToken;
          if (
            currentOptions[optionIndex].repos &&
            currentOptions[optionIndex].repos[vm.repoName] &&
            currentOptions[optionIndex].repos[vm.repoName].stages &&
            currentOptions[optionIndex].repos[vm.repoName].stages.length > 0
          ) {
            vm.stages = currentOptions[optionIndex].repos[vm.repoName].stages;
            vm.stages.unshift("Backlog");
          }
        }
      } else {
        // should never hit b/c won't be enabled
        vm.error = "this should never display";
      }
      // document.getElementById('color').value = items.favoriteColor;
      // document.getElementById('like').checked = items.likesColor;
    });
    this.fetchData();
  },
  // mounted() {},
  methods: {
    getBlock(id: number): IssueI | null | undefined {
      return this.resources.find(({ id: _id }) => _id === id);
    },
    getStageByName(name: string): LabelI | null | undefined {
      return this.labels
        ? this.labels.find(({ name: _name }) => _name === name)
        : null;
    },
    addLabels: async function (issueID: string, labelIDs: string[]) {
      // console.log(this.addLabels.name)
      // console.log(issueID)
      // console.log(labelIDs)
      const url = window.location.pathname.split("/"),
        user = url[1],
        repo = url[2],
        data = user + "/" + repo;
      // console.log(data)
      // console.log(this.oToken)
      const oToken = this.oToken;
      return this.$http.post(
        window.location.origin +
          `/api/v1/repos/${data}/issues/${issueID}/labels`,
        {
          labels: labelIDs,
        },
        {
          // cache: 'no-cache',
          headers: {
            Authorization: `token ${oToken}`,
            "Content-Type": "application/json",
          },
        }
      );
    },
    deleteLabel: async function (issueID: string, labelID: string) {
      // console.log(this.deleteLabel.name)
      // console.log(issueID)
      // console.log(labelID)
      const url = window.location.pathname.split("/"),
        user = url[1],
        repo = url[2],
        data = user + "/" + repo;
      // console.log(data)
      // console.log(this.oToken)
      const oToken = this.oToken;

      return this.$http.delete(
        window.location.origin +
          `/api/v1/repos/${data}/issues/${issueID}/labels/${labelID}`,
        {
          cache: "no-cache",
          headers: {
            Authorization: `token ${oToken}`,
            "Content-Type": "application/json",
          },
        }
      );
    },
    updateBlock: async function (issueID: string, newStage: string) {
      console.log(this.updateBlock.name);
      // console.log(issueID)
      // console.log(newStage)
      this.$emit("loading", true);
      const block = this.getBlock(Number.parseInt(issueID, 10));
      // console.log(block)
      const stage = this.getStageByName(newStage);
      // console.log(stage)

      if (block && stage) {
        // console.log("end")
        if (stage.isClosedStage) {
          // await this.client.closeIssue(issueID as any);
          block.closed = true;
        } else if (block.closed) {
          // await this.client.openIssue(issueID as any);
          block.closed = false;
        }

        // TODO: oauth token from users/settings/application appears to be required to make changes
        if (this.oToken) {
          await this.replaceLabelOfIssue(issueID, block.statusID, stage.id);
          this.updateStageOfBlock(block, stage);
        }
        // console.log(block)
        this.$emit("loading", false);
        // debugger
        // this.blocks.find(b => b.id === Number(id)).status = status
      }
    },
    replaceLabelOfIssue: async function (
      issueID: string,
      oldLabelID: string,
      newLabelID: string
    ) {
      await this.deleteLabel(issueID, oldLabelID)
        .then(function (response) {
          // console.log(response)
        })
        .catch(function (errors) {
          // console.log(errors)
        });
      await this.addLabels(issueID, [newLabelID])
        .then(function (response) {
          // console.log(response)
        })
        .catch(function (errors) {
          // console.log(errors)
        });
    },
    updateStageOfBlock(block: IssueI, { name, id }: LabelI) {
      block.status = name;
      block.statusID = id;
    },
    fetchData() {
      console.log(this.fetchData.name);
      this.error = this.milestones = this.labels = null;
      this.resources = [];
      this.loading = true;
      const url = window.location.pathname.split("/"),
        user = url[1],
        repo = url[2],
        data = user + "/" + repo;
      // console.log(data)
      // if (!repo) {
      //   metaStatus = "na"
      //   return
      // }
      this.$http
        .get(window.location.origin + "/api/v1/repos/" + data + "/issues")
        .then(
          (response) => {
            this.loading = false;
            // console.log(response)
            // this.message = response.data.message;
            if (response.status === 200) {
              // console.log(JSON.parse(JSON.stringify(response.data)))
              const resources = response.data;

              for (let i = 0; i < resources.length; i++) {
                resources[i].status = "Backlog";
                resources[i].url = resources[i].url.replace(
                  "/api/v1/repos",
                  ""
                );
                for (let k = 0; k < resources[i].labels.length; k++) {
                  if (this.stages.indexOf(resources[i].labels[k].name) !== -1) {
                    resources[i].status = resources[i].labels[k].name;
                    resources[i].statusID = resources[i].labels[k].id;
                    resources[i].id = resources[i].number;
                    break;
                  }
                }
              }
              this.resources = resources;
            } else {
              this.errors = "Failed to Load";
            }
          },
          (error: any) => {
            this.errors = "Failed to Retrieve issues";
            console.log(error);
            this.loading = null;
          }
        );
      this.$http
        .get(window.location.origin + "/api/v1/repos/" + data + "/milestones")
        .then(
          (response) => {
            this.loading = false;
            // console.log(response)
            // this.message = response.data.message;
            if (response.status === 200) {
              // console.log(JSON.parse(JSON.stringify(response.data)))
              this.milestones = response.data;
            } else {
              this.errors = "Failed to Load";
            }
          },
          (error: any) => {
            this.errors = "Failed to Retrieve milestones";
            console.log(error);
            this.loading = null;
          }
        );
      this.$http
        .get(window.location.origin + "/api/v1/repos/" + data + "/labels")
        .then(
          (response) => {
            this.loading = false;
            // console.log(response)
            // this.message = response.data.message;
            if (response.status === 200) {
              // console.log(JSON.parse(JSON.stringify(response.data)))
              this.labels = response.data;
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
      // getPost(this.$route.params.id, (err, post) => {
      //   this.loading = false
      //   if (err) {
      //     this.error = err.toString()
      //   } else {
      //     this.post = post
      //   }
      // })
    },
  },
});
</script>
