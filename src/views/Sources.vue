<template>
  <q-page class="q-pa-lg">
      <h5 class="q-mt-none">Sources</h5>
      <ul>
      <li v-for="item in sources" :key="item._id">
        <a :href="item.url" target="_blank">
          {{item.name}} 
        </a>    
        <p>{{item.description}}</p>    
        <p>category : {{item.category}}</p>    
        <p>language : {{item.language}}</p>    
        <p>country : {{item.country}}</p>    
      </li>
    </ul>
  </q-page>
</template>

<script>
//import axios from 'axios'
import {mapState, mapActions} from 'vuex'
export default {
  computed:{
    ...mapState(['sources'])
  },
  methods:{
    ...mapActions(['SETSOURCES']),   
  },
  created(){
    if(this.sources.length == 0){
        this.SETSOURCES()
    }       
  }
}
</script>

<style>

</style>