<template>
  <q-page class="q-pa-lg">
      <h5 class="q-mt-none">Headline</h5>
      <div class="q-gutter-md row items-start">
        <q-select outlined  v-model="countryBy" :options="countryByOptions" label="country" emit-value map-options class="col"></q-select>
        <q-select outlined  v-model="categoryBy" :options="categoryByOptions" label="category" emit-value map-options class="col"></q-select>
      </div>
      <p style="display:none;">
        headline article 내용 중 source(출처)를 가지고,<br>
        source에서 name을 매칭하여 language를 알아내야 함.
      </p>
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
      countryByOptions: [ 
                {label:'Argentina',value:'ar'},
                {label:'Australia',value:'au'},
                {label:'Austria',value:'at'},
                {label:'Belgium',value:'be'},
                {label:'Brazil',value:'br'},
                {label:'Bulgaria',value:'bg'},
                {label:'Canada',value:'ca'},
                {label:'China',value:'cn'},
                {label:'Colombia',value:'co'},
                {label:'Cuba',value:'cu'},
                {label:'Czech Republic',value:'cz'},
                {label:'Egypt',value:'eg'},
                {label:'France',value:'fr'},
                {label:'Germany',value:'de'},
                {label:'Greece',value:'gr'},
                {label:'Hong Kong',value:'hk'},
                {label:'Hungary',value:'hu'},
                {label:'India',value:'in'},
                {label:'Indonesia',value:'id'},
                {label:'Ireland',value:'ie'},
                {label:'Israel',value:'il'},
                {label:'Italy',value:'it'},
                {label:'Japan',value:'jp'},
                {label:'Latvia',value:'lv'},
                {label:'Lithuania',value:'lt'},
                {label:'Malaysia',value:'my'},
                {label:'Mexico',value:'mx'},
                {label:'Morocco',value:'ma'},
                {label:'Netherlands',value:'nl'},
                {label:'New Zealand',value:'nz'},
                {label:'Nigeria',value:'ng'},
                {label:'Norway',value:'no'},
                {label:'Philippines',value:'ph'},
                {label:'Poland',value:'pl'},
                {label:'Portugal',value:'pt'},
                {label:'Romania',value:'ro'},
                {label:'Russia',value:'ru'},
                {label:'Saudi Arabia',value:'sa'},
                {label:'Serbia',value:'rs'},
                {label:'Singapore',value:'sg'},
                {label:'Slovakia',value:'sk'},
                {label:'Slovenia',value:'si'},
                {label:'South Africa',value:'za'},
                {label:'South Korea',value:'kr'},
                {label:'Sweden',value:'se'},
                {label:'Switzerland',value:'ch'},
                {label:'Taiwan',value:'tw'},
                {label:'Thailand',value:'th'},
                {label:'Turkey',value:'tr'},
                {label:'UAE',value:'ae'},
                {label:'Ukraine',value:'ua'},
                {label:'United Kingdom',value:'gb'},
                {label:'United States',value:'us'},
                {label:'Venuzuela',value:'ve'}
        ],
      categoryByOptions: [ 
        {label:"all", value:"general"},
        {label:"business", value:"business"},
        {label:"entertainment", value:"entertainment"},        
        {label:"health", value:"health"},
        {label:"science", value:"science"},
        {label:"sports", value:"sports"},
        {label:"technology", value:"technology"} 
        ]
    }
  },
  components:{
    Headline_list
  },
  computed:{
    ...mapState(['country_headline','country_by', 'category_by']),
    countryBy:{
      get(){
        return this.country_by
      },
      set(value){
        this.SETCOUNTRYBY(value)
      }
    },
    categoryBy:{
      get(){
        return this.category_by
      },
      set(value){
        this.SETCATEGORYBY(value)
      }
    }
  },  
  methods:{
    ...mapActions(['SET_COUNTRY_HEADLINE', 'SET_TRANSLATION_DATA','SETCOUNTRYBY','SETCATEGORYBY']),
   
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