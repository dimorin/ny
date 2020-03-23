<template>
  <q-page class="flex flex-center">
    
    <q-input filled :value="begin_date" label="begin date" readonly>
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy>
            <q-date v-model="begin_date" mask="YYYYMMDD"></q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
    <q-input filled :value="end_date" label="end date" readonly>
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy>
            <q-date v-model="end_date" mask="YYYYMMDD"></q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>


    <q-input filled type="search" v-model="ny_q" @keyup.enter="fetchData">
      <template v-slot:append>
          <q-icon name="search" />
        </template>
    </q-input>
    <q-btn color="white" text-color="black" @click="fetchData" label="load" />

    <!-- <ul>
      <li v-for="item in ny_items" :key="item._id">
        <a :href="item.web_url" target="_blank">
          {{item.abstract}}
        </a>        
      </li>
    </ul> -->


    <q-table
      grid
      title="News"
      :data="ny_items"
      :columns="columns"
      row-key="_id"
      :filter="filter"
      color="primary"
      :loading="loading"
      hide-header
    >
    </q-table>


    <div>
      해야될 거<br>
      localstorage에 저장하고 불러오기<br>
      udemy 강좌<br>
      지도<br>
      newsapi https supoort<br>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import axios from 'axios'
import {date} from 'quasar'
export default {
  name: 'HelloWorld',
  data(){
      return{
        loading:false,
        filter: '',
      columns: [
        { name: 'abstract', required: true, label: 'abstract',align: 'left', field: 'abstract', sortable: true},
        { name: 'web_url', align: 'center', label: 'web_url', field: 'web_url', sortable: true },
        { name: '_id', label: '_id', field: '_id', sortable: true },
      ],
        ny_q:'',
        ny_items:[],
        begin_date:null,
        end_date:null,
      }
    },
    methods:{
      
      fetchData(){
        this.loading = true;
        axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${this.ny_q}&api-key=${process.env.VUE_APP_ID}&begin_date=${this.begin_date}&end_date=${this.end_date}`)
        .then(response => {          
          this.ny_items = response.data.response.docs;
          this.loading = false;
        })            
      },
      pad(num){
        return (num < 10)? '0'+num:num;
      },
       
    },
    created(){
      let today = Date.now();
      let formattedToday = date.formatDate(today, 'YYYYMMDD');
      this.begin_date = formattedToday;
      this.end_date = formattedToday;
    }
}
</script>
