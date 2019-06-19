import Vue from 'vue'
import routes from './routes'
import { optionsKey } from '../constants'
import initDisplay from './index'
import giteaVariables from '../gitea/giteaVariables'
import '../../css/main.css'
// import style here

var display = initDisplay(giteaVariables)

const EventBus = new Vue()

window.addEventListener('popstate', () => {
  EventBus.$emit('navigate')
})

const View = {
  name: 'router-view',
  template: `<component :is="currentView"></component>`,
  data  () {
    return {
      currentView: {}
    }
  },
  created () {
    if (this.getRouteObject() === undefined) {
      this.currentView = {
        template: `
          <h3 class="subtitle has-text-white">
            Not Found :(. Bad kanban url!
          </h3>
        `
      }
    } else {
      this.currentView = this.getRouteObject().component
    }

    // Event listener for link navigation
    EventBus.$on('navigate', (event) => {
      this.currentView = this.getRouteObject().component
    })
  },
  methods: {
    getRouteObject () {
      return routes.find(
        route => route.path === window.location.hash
      )
    }
  }
}

const Link = {
  name: 'router-link',
  props: {
    to: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: false
    },
    activeClass: {
      type: String,
      required: false
    }
  },
  data  () {
    return {
      activeRoute: ''
    }
  },
  created () {
    // var vm = this
    if (window.location.hash === this.to) {
      this.activeRoute = this.activeClass
    }

    EventBus.$on('navigate', (event) => {
      this.activeRoute = ''
      if (window.location.hash === this.to) {
        this.activeRoute = this.activeClass
      }
    })
  },
  template: `<a @click="navigate" v-bind:class="activeRoute" :href="to"><slot></slot></a>`,
  methods: {
    navigate (evt) {
      evt.preventDefault()
      window.history.pushState(null, null, this.to)
      EventBus.$emit('navigate')
    }
  }
}

export const singleMenu = {
  name: 'singleMenu',
  template: `
      <router-link class="item" v-bind:class="{ active: menuExpanded }" :to="menuLink" @click.native="expandMenu">
        <i class="octicon octicon-eye"></i> Kanban
      </router-link>
  `,
  data: () => ({
    optionsKey,
    menuExpanded: false
  }),
  computed: {
    menuLink: function () {
      return "#/" + this.optionsKey + "-board"
    }
  },
  created () {},
  mounted () {
    if (window.location.hash.indexOf(optionsKey) !== -1) {
      this.expandMenu()
    }
  },
  methods: {
    expandMenu: function (e) {
      console.log(this.expandMenu.name)
      // may not be a button press
      if (e) {
        e.preventDefault()
      }

      if (!window.location.hash) {
        // need /#
        // window.location.hash = '/' + optionsKey + '-board'
        // display.renderDisplay()
      } else {
        // !this.menuExpanded || this.menuExpanded === false

        if (!this.menuExpanded) {
          this.menuExpanded = true
          var activeItem = document.querySelector(`.item.active`)
          if (activeItem) {
            activeItem.className = "item"
          }
          // render
          display.renderDisplay()
          // document.getElementById(giteaVariables.menuBtnId).className = "active item"
          // document.querySelector(`#` + giteaVariables.menuBtnId + ` > ul`).style = ""
        } else {
          //   // document.getElementById(giteaVariables.menuBtnId).className = "item"
        }
      }
    }
  },
  // render: h => h(menu),
  components: {
    'router-view': View,
    'router-link': Link
  }
}

export default function (variables) {
  return {
    name: 'router',
    template: `
    <div class="ui container" id="` + variables.displayId + `">
      <div class="sideMenu">
        <ul>
          <li>
            <router-link class="item" activeClass="active" to="#/` + optionsKey + `-burndown">
              Burndown
            </router-link>
          </li>
          <li>
            <router-link class="item" activeClass="active" to="#/` + optionsKey + `-velocity">
              Velocity Tracking
            </router-link>
          </li>
          <li>
            <router-link class="item" activeClass="active" to="#/` + optionsKey + `-report">
              Release Report
            </router-link>
          </li>
          <li>
            <router-link class="item" activeClass="active" to="#/` + optionsKey + `-settings">
              Settings
            </router-link>
          </li>
        </ul>
      </div>
      <router-view class="view"></router-view>
    </div>
    `,
    components: {
      'router-view': View,
      'router-link': Link
    }
  }
}
