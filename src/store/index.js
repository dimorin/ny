import Vue from 'vue'
import Vuex from 'vuex'
import {fetchCountryHeadline, translationData, fetchSources} from '../api/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    country_headline:[],
    sources:[],
    country_by:'us',
    category_by:'general',
  },
  mutations: {
    SET_COUNTRY_HEADLINE(state, articles){
      articles.map(article => {
        /*
        아티클 출처 아이디나 
        sources의 country 매칭으로는 src_lang을 뽑아낼 수 없다
        따라서 따로 국가별 언어 테이블을 만들어 가져온다.
        */
        //let match_source = state.sources.find(source => source.id == article.source.id)
        //if(match_source == undefined){
          //console.log(article.source)
        //}
        //console.log('match_source.language');
        //console.log(match_source) 

        //let match_source = state.sources.find(source => source.id == article.source.id)
        

        Object.assign(article,{translated_text:'',src_lang:''})
      })
      state.country_headline = articles
    },
    SET_TRANSLATION_DATA(state, obj){
      //console.log(obj.translated_text);
      state.country_headline[obj.index].translated_text = obj.translated_text;
    },
    SETCOUNTRYBY(state,value){
      state.country_by = value;
    },
    SETCATEGORYBY(state,value){
      state.category_by = value;
    },
    RESETCATEGORYBY(state){
      state.category_by = 'general';
    },
    SETSOURCES(state, sources){
      state.sources = sources
    }
  },
  actions: {
    async SETSOURCES({commit}){
      const response = await fetchSources();
      let sources = response.data.sources
      commit('SETSOURCES',sources)
    },
    async SET_COUNTRY_HEADLINE({commit, state}){      
      const response = await fetchCountryHeadline(state.country_by, state.category_by);
      const articles = response.data.articles;            
      commit('SET_COUNTRY_HEADLINE', articles)
    },
    async SET_TRANSLATION_DATA({commit},obj){
      const response = await translationData(obj.src_lang, obj.target_lang, obj.target);      
      let translated_obj = {translated_text:response.data.translated_text[0][0], index:obj.index};      
      commit('SET_TRANSLATION_DATA',translated_obj);
    },
    SETCOUNTRYBY({dispatch,commit}, value){      
      commit('SETCOUNTRYBY',value)
      commit('RESETCATEGORYBY')
      dispatch('SET_COUNTRY_HEADLINE')
    },
    SETCATEGORYBY({dispatch,commit},value){
      commit('SETCATEGORYBY',value)
      dispatch('SET_COUNTRY_HEADLINE')
    }
  },
  modules: {
  }
})
