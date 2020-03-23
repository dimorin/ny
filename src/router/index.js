import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Todo from '@/views/Todo.vue'
import Help from '@/views/Help.vue'
import Sources from '@/views/Sources.vue'
import Headline from '@/views/Headline.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
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
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
