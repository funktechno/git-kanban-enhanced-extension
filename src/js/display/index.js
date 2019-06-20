// import { optionsKey } from '../constants'
// import initBoard from './pages/board'
import Vue from 'vue'
// import root from 'root'
// import VueRouter from 'vue-router'
import initRouter from './router'
import VueResource from 'vue-resource'
import vueKanban from 'vue-kanban'

// import routes from './routes'
// import { optionsKey } from '../constants'

// setup vue page here

export default function (variables) {
  return {
    // renderBoard: initBoard(variables).renderBoard,
    // renderBoard: function () {
    //   console.log("renderingBoard")
    //   // hide current board
    //   // var currentBoard = document.querySelector(variables.repositoryDisplay).style.display="none"
    //   // create a new board
    // },
    renderDisplay: function () {
      console.log(this.renderDisplay.name)
      // var page = window.location.hash.replace("#" + optionsKey + "?", "")
      var currentBoard = document.querySelector(variables.repositoryDisplay)
      currentBoard.style.display = "none"
      var displayHTML = `<div class="ui container" id="` + variables.displayId + `">
          test
        </div>`
      // console.log(currentBoard)
      currentBoard.insertAdjacentHTML('afterend', displayHTML)

      // setup vue, maybe should use router to 2share preferences and rerender accordingly
      Vue.use(VueResource)
      Vue.use(vueKanban)
      // Vue.use(VueRouter)
      Vue.config.devtools = true
      console.log(variables.displayId)
      const router = initRouter(variables)

      /* eslint-disable no-new */
      new Vue({
        el: '#' + variables.displayId,
        render: h => h(router)
        // router,
        // template: `
        // <div class="ui container" id="` + variables.displayId + `">
        //   <div class="sideMenu">
        //     <router-link class="item" to="/` + optionsKey + `-burndown">
        //      Burndown
        //     </router-link>
        //   </div>
        //   <router-view class="view"></router-view>
        // </div>
        // `
        // render: h => h(root)
      })
      // switch (page) {
      //   case "board":
      //     this.renderBoard()
      //     break
      //   default:
      //     console.log(page = " is not implemented: 404")
      //     //
      //     break
      // }
    }
  }
}
