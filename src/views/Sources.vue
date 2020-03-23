<template>
  <q-page class="q-pa-lg">
      <h5 class="q-mt-none">Sources</h5>
      <ul>
      <li v-for="item in sources_items" :key="item._id">
        <a :href="item.url" target="_blank">
          {{item.name}} [{{item.country}}]
        </a>        
      </li>
    </ul>
  </q-page>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      
      sources_items:[],
      
    }
  },
  methods:{
    fetchData(){
      console.log('sources fetch');
      axios.get(`https://newsapi.org/v2/sources?apiKey=${process.env.VUE_APP_NEWS_KEY}`)
      .then(response => {
        console.log(response.data.sources);
        this.sources_items = response.data.sources;
      })            
    },
      
  },
  created(){
    this.fetchData();
  }
}
</script>

<style>

</style>