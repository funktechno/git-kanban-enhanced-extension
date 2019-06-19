<template>
  <div>Board {{test}}
    <ul>
      <li v-for="(issue, index) in resources" v-bind:key="issue.id">
        {{index}}: {{issue}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({
    test: "4",
    loading: false,
    error: null,
    resources: null
  }),
  computed: {},
  created () {
    this.fetchData()
  },
  mounted () {

  },
  methods: {
    fetchData () {
      console.log(this.fetchData.name)
      this.error = this.resources = null
      this.loading = true
      var url = window.location.pathname.split("/"),
        user = url[1],
        repo = url[2],
        data = user + "/" + repo
      console.log(data)
      // if (!repo) {
      //   metaStatus = "na"
      //   return
      // }
      this.$http.get("/api/v1/repos/" + data + "/issues").then((response) => {
        this.loading = false
        console.log(response)
        // this.message = response.data.message;
        if (response.status === 200) {
          console.log(JSON.parse(JSON.stringify(response.data)))
          this.resources = response.data
        } else {
          this.errors = "Failed to Load"
        }
      }).catch((error) => {
        this.errors = "Failed to Retrieve Latitude and Longitude"
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