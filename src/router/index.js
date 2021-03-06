import Vue from 'vue'
import VueRouter from 'vue-router'
import NY from '../views/NY.vue'
import Todo from '@/views/Todo.vue'
import Help from '@/views/Help.vue'
import Sources from '@/views/Sources.vue'
import Headline from '@/views/Headline.vue'
import USAmap from '@/views/USAmap.vue'
import Worldmap from '@/views/Worldmap.vue'
import Worldmap2 from '@/views/Worldmap2.vue'
import Datamap from '@/views/Datamap.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/ny',
    name: 'NY',
    component: NY
  },
  {
    path: '/',
    name: 'Todo',
    component: Todo
  },
  {
    path: '/help',
    name: 'Help',
    component: Help
  },
  {
    path: '/sources',
    name: 'Sources',
    component: Sources
  },
  {
    path: '/headline',
    name: 'headline',
    component: Headline
  },
  {
    path: '/nytop',
    name: 'NYTop',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/NYTop.vue')
  },
  {
    path: '/usamap',
    name: 'usamap',
    component: USAmap
  },
  {
    path: '/worldmap',
    name: 'worldmap',
    component: Worldmap
  },
  {
    path: '/worldmap2',
    name: 'worldmap2',
    component: Worldmap2
  },
  {
    path: '/datamap',
    name: 'datamap',
    component: Datamap
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
