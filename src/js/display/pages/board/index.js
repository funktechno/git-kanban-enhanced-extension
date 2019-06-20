// import { optionsKey } from '../constants'
import Vue from 'vue'
import root from './root.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// setup vue page here

export default function (variables) {
  return {
    renderBoard: function () {
      console.log("renderingBoard")
      Vue.config.productionTip = false
      Vue.use(ElementUI)
      /* eslint-disable no-new */
      new Vue({
        el: '#' + variables.displayId,
        render: h => h(root)
      })
      // hide current board
      // var currentBoard = document.querySelector(variables.repositoryDisplay).style.display="none"
      // create a new board
    }
  }
}
