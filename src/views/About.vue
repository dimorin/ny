<template>
  <div>
    
    <input type="text" v-model="ny_q">
    <button @click="fetchData">load</button>
    <ul>
      <li v-for="item in ny_items" :key="item._id">
        <a :href="item.web_url" target="_blank">
          {{item.abstract}}
        </a>        
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      ny_q:'',
      ny_items:[],
      ny_today:'',
    }
  },
  methods:{
    fetchData(){
      var today = new Date();    
      this.ny_today = today.getFullYear() + this.pad(today.getMonth()+1) + this.pad(today.getDate());
      console.log(this.ny_today);
      axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${this.ny_q}&api-key=${process.env.VUE_APP_ID}&begin_date=20200320&end_date=${this.ny_today}`)
      .then(response => {
        console.log(response.data.response.docs);
        this.ny_items = response.data.response.docs;
      })            
    },
    pad(num){
      return (num < 10)? '0'+num:num;
    }    
  },
  created(){
    
  }
}
</script>

<style>

</style>