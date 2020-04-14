import Vue from 'vue'
import Vuex from 'vuex'
import {fetchCountryHeadline, translationData} from '../api/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    country_headline:[]
  },
  mutations: {
    SET_COUNTRY_HEADLINE(state, articles){
      state.country_headline = articles
    },
    SET_TRANSLATION_DATA(state, translated_text){
      console.log(translated_text)
    }
  },
  actions: {
    async SET_COUNTRY_HEADLINE({commit}, country){
      const response = await fetchCountryHeadline(country);
      commit('SET_COUNTRY_HEADLINE', response.data.articles)
    },
    async SET_TRANSLATION_DATA({commit},obj){
      const response = await translationData(obj.src_lang, obj.target_lang, obj.target);      
      let translated_text = response.data.translated_text[0][0]
      commit('SET_TRANSLATION_DATA',translated_text);
    }
  },
  modules: {
  }
})
