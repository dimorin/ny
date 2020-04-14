import Vue from 'vue'
import Vuex from 'vuex'
import {fetchCountryHeadline, translationData} from '../api/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    country_headline:[],
    country_headline_translated:[],
  },
  mutations: {
    SET_COUNTRY_HEADLINE(state, articles){
      state.country_headline = articles
    },
    SET_TRANSLATION_DATA(state, obj){
      //console.log(obj.translated_text);
      state.country_headline[obj.index].translated_text = obj.translated_text;
    }
  },
  actions: {
    async SET_COUNTRY_HEADLINE({commit}, country){
      const response = await fetchCountryHeadline(country);
      const articles = response.data.articles;
      articles.map(article => Object.assign(article,{translated_text:''}))
      commit('SET_COUNTRY_HEADLINE', articles)
    },
    async SET_TRANSLATION_DATA({commit},obj){
      const response = await translationData(obj.src_lang, obj.target_lang, obj.target);      
      let translated_obj = {translated_text:response.data.translated_text[0][0], index:obj.index};      
      commit('SET_TRANSLATION_DATA',translated_obj);
    }
  },
  modules: {
  }
})
