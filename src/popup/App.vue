<template>
  <div>
    <button type="button" @click="tab" class="el-button el-button--primary">
      <span>Git Kanban Options</span>
    </button>
  </div>
</template>
<script>
export default {
  data: () => ({}),
  computed: {},
  created() {},
  mounted() {},
  methods: {
    tab() {
      chrome.tabs.create({ url: 'pages/app.html' });
    },
  },
};
</script>
<style lang="css">

.el-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #FFF;
    border: 1px solid #DCDFE6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    -moz-user-select: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
}
.el-button, .el-transfer-panel {
    -webkit-box-sizing: border-box;
}
.el-button, .el-checkbox {
    -webkit-user-select: none;
    -ms-user-select: none;
}
.el-button--primary {
    color: #FFF;
    background-color: #409EFF;
    border-color: #409EFF;
}
div {
  color: blue;
}
</style>
