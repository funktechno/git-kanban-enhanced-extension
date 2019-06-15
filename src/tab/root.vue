<template>
  <div>
    <div class="custom-options" style="display:none;">
      <h3>Custom Git Platform:</h3>
      <ul id="git-hosts">
        <li>git.coolaj86.com : gitea.io <button>Remove</button> </li>
      </ul>
    </div>
    <p></p>
    <div class="custom-options" style="display:none;">
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
  export default {
    data: () => ({
      test: 'candy1'
    }),
    computed: { },
    created () { },
    mounted () {
      console.log("saving options")
      var type = document.getElementById('gitType').value
      var url = document.getElementById('gitHost').value
      console.log(type + url)
    },
    methods: { }
  }
</script>
<style lang="scss">
  div {
    color: blue
  }
</style>