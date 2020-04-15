<template>
  <q-page class="q-pa-lg">
      <h5 class="q-mt-none">Headline</h5>
      <div class="q-gutter-md row items-start">
     
     

      <q-select outlined  v-model="countryBy" :options="options" label="country" emit-value map-options class="col">
      </q-select>
    </div>
      <ul>
        <Headline_list v-for="(item,i) in country_headline" :key="i" :item="item" :item_index="i" @translationData="translationData"></Headline_list>
      <!-- <li v-for="(item,i) in country_headline" :key="i">
        <a :href="item.url" target="_blank">
          <span>{{item.title}}</span> [{{item.source.name}}]
        </a>   
        <button @click="translationData(item.title,i)">translation</button>
        <p>{{ item.translated_text }}</p>
      </li> -->
    </ul>
  </q-page>
</template>

<script>
import { mapState, mapActions} from 'vuex'
import Headline_list from '../components/Headline_list'
//import axios from 'axios'
export default {
  data(){
    return{
      text:'',
      options: [ 
          {label:'USA',value:'us'},
          {label:'Austria',value:'au'},
          {label:'China',value:'ch'},
          {label:'Japan',value:'jp'},
          {label:'Korea',value:'kr'},
          {label:'Israel',value:'il'},
          {label:'Russia',value:'ru'} 
        ]
      //options: [ 'business','entertainment','general','health','science','sports','technology' ]
    }
  },
  components:{
    Headline_list
  },
  computed:{
    ...mapState(['country_headline','country_by']),
    countryBy:{
      get(){
        return this.country_by
      },
      set(value){
        this.SETCOUNTRYBY(value)
      }
    }
  },  
  methods:{
    ...mapActions(['SET_COUNTRY_HEADLINE', 'SET_TRANSLATION_DATA','SETCOUNTRYBY']),
   
    translationData(obj){
      let target_obj = {src_lang:'en',target_lang:'kr',target:obj.target,index:obj.index};
      this.SET_TRANSLATION_DATA(target_obj);  
    }
  },
  created(){
    this.SET_COUNTRY_HEADLINE()
  }
}
</script>

<style>

</style>