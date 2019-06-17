import { optionsKey } from '../constants'
import initBoard from './pages/board'
// setup vue page here

export default function (variables) {
  return {
    renderBoard: initBoard(variables).renderBoard,
    // renderBoard: function () {
    //   console.log("renderingBoard")
    //   // hide current board
    //   // var currentBoard = document.querySelector(variables.repositoryDisplay).style.display="none"
    //   // create a new board
    // },
    renderDisplay: function () {
      console.log(this.renderDisplay.name)
      var page = window.location.hash.replace("#" + optionsKey + "?", "")
      var currentBoard = document.querySelector(variables.repositoryDisplay)
      currentBoard.style.display = "none"
      var displayHTML = `<div class="ui container" id="` + variables.displayId + `">
          test
        </div`
      console.log(currentBoard)
      currentBoard.insertAdjacentHTML('afterend', displayHTML)

      // setup vue
      switch (page) {
        case "board":
          this.renderBoard()
          break
        default:
          console.log(page = " is not implemented: 404")
          //
          break
      }
    }
  }
}
