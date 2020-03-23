<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>
       
        

        
      </q-toolbar>
      <div class="q-px-lg q-pt-xl q-mb-md">
          <div class="text-h3">Todo</div>
          <div class="text-subtitle1">{{todayDate}}</div>
        </div>
        
        <q-img src="https://placeimg.com/500/300/nature" class="header-image absolute-top" />
        
    </q-header>

    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        :width="250"
        :breakpoint="600"
      >
        <q-scroll-area style="height: calc(100% - 192px); margin-top: 192px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item to="/" exact clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>

              <q-item-section>
                Todo
              </q-item-section>
            </q-item>

            <q-item to="/help" exact clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="help" />
              </q-item-section>

              <q-item-section>
                Help
              </q-item-section>
            </q-item>

            <q-item to="/sources" exact clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="help" />
              </q-item-section>

              <q-item-section>
                Sources
              </q-item-section>
            </q-item>

            <q-item to="/headline" exact clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="help" />
              </q-item-section>

              <q-item-section>
                Headline
              </q-item-section>
            </q-item>

            <q-item to="/ny" exact clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="code" />
              </q-item-section>

              <q-item-section>
                NY
              </q-item-section>
            </q-item>
            <q-item to="/nytop" exact clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="code" />
              </q-item-section>

              <q-item-section>
                NYTop
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-img class="absolute-top" src="https://placeimg.com/500/300/nature" style="height: 192px"><!-- https://cdn.quasar.dev/img/material.png -->
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">dimorin</div>
            <div>@dimorin</div>
          </div>
        </q-img>
      </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      
    </q-page-container>
  </q-layout>
</template>

<script>

import { date } from 'quasar'
export default {
  name: 'LayoutDefault',

  components: {

  },

  data () {
    return {
      leftDrawerOpen: false
    }
  },
  computed:{
    todayDate(){
      let timeStamp = Date.now()
      return date.formatDate(timeStamp, 'dddd D MMMM')
    }
  }
}
</script>

<style>
.header-image{height:100%;z-index:-1;opacity:0.2;filter:grayscale(100%)}
</style>
