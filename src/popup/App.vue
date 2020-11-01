<template>
  <div>
    <button type="button" @click="tab" class="el-button el-button--primary">
      <span>Git Kanban Options</span>
    </button>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data: () => ({}),
  computed: {},
  created() {},
  mounted() {},
  methods: {
    tab() {
      chrome.tabs.create({ url: '/tab/tab.html' });
    },
  },
});
</script>
<style lang="css">
.el-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.el-button,
.el-transfer-panel {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.el-button,
.el-checkbox {
  -webkit-user-select: none;
  -ms-user-select: none;
}
.el-button--primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
div {
  color: blue;
}
</style>
