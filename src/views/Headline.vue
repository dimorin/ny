<template>
  <q-page class="q-pa-lg">
      <h5 class="q-mt-none">Headline</h5>
      <ul>
      <li v-for="(item,i) in country_headline" :key="i">
        <a :href="item.url" target="_blank">
          <span>{{item.title}}</span> [{{item.source.name}}]
        </a>   
        <button @click="translationData(item.title,i)">translation</button>
      </li>
    </ul>
  </q-page>
</template>

<script>
import { mapState, mapActions} from 'vuex'
//import axios from 'axios'
export default {
  data(){
    return{
 
    }
  },
  computed:{
    ...mapState(['country_headline']),
  },
  methods:{
    ...mapActions(['SET_COUNTRY_HEADLINE', 'SET_TRANSLATION_DATA']),
   
    translationData(target,index){
      let obj = {src_lang:'en',target_lang:'kr',target:target,index:index};
      this.SET_TRANSLATION_DATA(obj);  
    }
  },
  created(){
    this.SET_COUNTRY_HEADLINE('us')
  }
}
</script>

<style>

</style>