<template>
  <q-page class="q-pa-lg">
      <h5 class="q-mt-none">Headline</h5>
      <ul>
      <li v-for="item in articles_items" :key="item.title">
        <a :href="item.url" target="_blank">
          {{item.title}} [{{item.source.name}}]
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
      
      articles_items:[],
      
    }
  },
  methods:{
    fetchData(){
      
      axios.get(`http://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.VUE_APP_NEWS_KEY}`)
      .then(response => {
        //console.log(response.data.articles);
        this.articles_items = response.data.articles;
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