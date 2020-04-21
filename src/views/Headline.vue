<template>
  <q-page class="q-pa-lg">
      <h5 class="q-mt-none">Headline </h5>
      <p>
        infinite scroll,지도, load할 때 axios bar, 이미지 로딩<br>
        news api 출처 밝히기, 관심 나라 즐겨찾기
      </p>
      <div class="q-gutter-md row items-start">
        <q-select outlined  v-model="countryBy" :options="countryByOptions" label="country" emit-value map-options class="col">
          <template v-slot:option="scope">
            <q-item
              v-bind="scope.itemProps"
              v-on="scope.itemEvents"
            >
              <q-item-section avatar>
                <!-- <q-icon :name="scope.opt.icon" /> -->
                <q-avatar rounded>
                  <img :src="scope.opt.icon">
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label v-html="scope.opt.label" />
                <q-item-label caption>{{ scope.opt.continent }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
        <q-select outlined  v-model="categoryBy" :options="categoryByOptions" label="category" emit-value map-options class="col"></q-select>
      </div>
    
      
      <q-infinite-scroll @load="onLoad" :offset="100" class="row q-col-gutter-md">
        <Headline_list v-for="(item,i) in country_headline" :key="i" :item="item" :item_index="i" @translationData="translationData"></Headline_list>
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
      </q-infinite-scroll>
      
  </q-page>
</template>

<script>
import { mapState, mapActions, mapMutations} from 'vuex'
import Headline_list from '../components/Headline_list'

export default {
  data(){
    return{
      
    }
  },
  components:{
    Headline_list
  },
  computed:{
    ...mapState(['countryByOptions','categoryByOptions','country_headline','country_by', 'category_by']),    
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
    ...mapMutations(['test']),
    translationData(obj){
      let target_obj = {src_lang:obj.lang,target_lang:'kr',target:obj.target,index:obj.index};
      this.SET_TRANSLATION_DATA(target_obj);  
    },
    onLoad (index,done) {
      console.log('onload : '+index)
      // index를 state에 보내기
      // country_headline의 사본 state를 만들기 list는 사본에서 가져오기
      this.test(index)
        if(index <10){
          done()      
        }else{
          done(true);//로드 중지
        }
      
    }
  },
  created(){    
      this.SET_COUNTRY_HEADLINE()             
  }
}
</script>

<style>

</style>