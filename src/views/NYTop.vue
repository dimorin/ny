<template>
  <div>
    <h2>NYtimes Top Stories</h2>
    <img src="../assets/logo.png">

    <q-list bordered padding class="rounded-borders">      
      <q-item clickable v-ripple v-for="(item,index) in getData" :key="index" @click="link(item.short_url)">
        
        <q-item-section top thumbnail>
          <img :src="item.multimedia[1].url">
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{item.title}}</q-item-label>
          <q-item-label caption>{{item.updated_date}}</q-item-label>
        </q-item-section>

        
      </q-item>        
    </q-list>



    <div class="q-pa-lg flex flex-center">
      <q-pagination v-model="currentPage" :max="Math.ceil(ny_items.length/maxPost)" :boundary-links="true"></q-pagination>
    </div>

  </div>
</template>

<script>
import {openURL} from 'quasar'
import axios from 'axios'
export default {
  computed:{
		getData(){
			return 	this.ny_items.slice((this.currentPage-1)*this.maxPost,(this.currentPage-1)*this.maxPost+this.maxPost)
		}
	},
  data(){
    return{
      ny_items:[],
      currentPage: 1,    
      maxPost:10,
    }
  },
  methods:{
    fetchData(){      
      axios.get(`https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${process.env.VUE_APP_ID}`)
      .then(response => {        
        console.log(response.data.results);
        this.ny_items = response.data.results;
      })            
    }, 
    link(url){      
      openURL(url)
    }
  },
  created(){
    this.fetchData();
  }
}
</script>

<style>

</style>