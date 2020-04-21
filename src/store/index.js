import Vue from 'vue'
import Vuex from 'vuex'
import {fetchCountryHeadline, translationData, fetchSources} from '../api/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    country_headline:[],
    sources:[],
    countryByOptions: [ 
      {label:'UAE',value:'ae',continent:'Asia',icon:'statics/United Arab Emirates.png',lang:'ar'},
      {label:'Argentina',value:'ar',continent:'America',icon:'statics/Argentina.png',lang:'es'},
      {label:'Austria',value:'at',continent:'Europe',icon:'statics/Austria.png',lang:'de'},
      {label:'Australia',value:'au',continent:'Oceania',icon:'statics/Australia.png',lang:'en'},                
      {label:'Belgium',value:'be',continent:'Europe',icon:'statics/Belgium.png',lang:'fr'},
      {label:'Brazil',value:'br',continent:'America',icon:'statics/Brazil.png',lang:'pt'},
      {label:'Bulgaria',value:'bg',continent:'Europe',icon:'statics/Bulgaria.png',lang:'ru'},
      {label:'Canada',value:'ca',continent:'America',icon:'statics/Canada.png',lang:'en'},
      {label:'Switzerland',value:'ch',continent:'Europe',icon:'statics/Swaziland.png',lang:'de'},
      {label:'China',value:'cn',continent:'Asia',icon:'statics/China.png',lang:'cn'},
      {label:'Colombia',value:'co',continent:'America',icon:'statics/Colombia.png',lang:'es'},
      {label:'Cuba',value:'cu',continent:'America',icon:'statics/Cuba.png',lang:'es'},
      {label:'Czech Republic',value:'cz',continent:'Europe',icon:'statics/Czech Republic.png',lang:''},
      {label:'Germany',value:'de',continent:'Europe',icon:'statics/Germany.png',lang:'de'},
      {label:'Egypt',value:'eg',continent:'Asia',icon:'statics/Egypt.png',lang:'ar'},
      {label:'France',value:'fr',continent:'Europe',icon:'statics/France.png',lang:'fr'},
      {label:'United Kingdom',value:'gb',continent:'Europe',icon:'statics/United Kingdom.png',lang:'en'},             
      {label:'Greece',value:'gr',continent:'Europe',icon:'statics/Greece.png',lang:''},
      {label:'Hong Kong',value:'hk',continent:'Asia',icon:'statics/Hong Kong.png',lang:'cn'},
      {label:'Hungary',value:'hu',continent:'Europe',icon:'statics/Hungary.png',lang:''},
      {label:'Indonesia',value:'id',continent:'Asia',icon:'statics/Indonesia.png',lang:'id'},
      {label:'Ireland',value:'ie',continent:'Europe',icon:'statics/Ireland.png',lang:'en'},
      {label:'Israel',value:'il',continent:'Asia',icon:'statics/Israel.png',lang:''},
      {label:'India',value:'in',continent:'Asia',icon:'statics/India.png',lang:'en'}, 
      {label:'Italy',value:'it',continent:'Europe',icon:'statics/Italy.png',lang:'it'},
      {label:'Japan',value:'jp',continent:'Asia',icon:'statics/Japan.png',lang:'jp'},
      {label:'South Korea',value:'kr',continent:'Asia',icon:'statics/South Korea.png',lang:''},
      {label:'Lithuania',value:'lt',continent:'Europe',icon:'statics/Lithuania.png',lang:''},
      {label:'Latvia',value:'lv',continent:'Europe',icon:'statics/Latvia.png',lang:''},                
      {label:'Morocco',value:'ma',continent:'Africa',icon:'statics/Morocco.png',lang:'fr'},
      {label:'Mexico',value:'mx',continent:'America',icon:'statics/Mexico.png',lang:'es'},
      {label:'Malaysia',value:'my',continent:'Asia',icon:'statics/Malaysia.png',lang:'en'},                
      {label:'Nigeria',value:'ng',continent:'Africa',icon:'statics/Nigeria.png',lang:'en'},
      {label:'Netherlands',value:'nl',continent:'Europe',icon:'statics/Netherlands.png',lang:'nl'},
      {label:'Norway',value:'no',continent:'Europe',icon:'statics/Norway.png',lang:''},
      {label:'New Zealand',value:'nz',continent:'Oceania',icon:'statics/New Zealand.png',lang:'en'},
      {label:'Philippines',value:'ph',continent:'Asia',icon:'statics/Philippines.png',lang:'en'},
      {label:'Poland',value:'pl',continent:'Europe',icon:'statics/Poland.png',lang:''},
      {label:'Portugal',value:'pt',continent:'Europe',icon:'statics/Portugal.png',lang:'pt'},
      {label:'Romania',value:'ro',continent:'Europe',icon:'statics/Romania.png',lang:''},
      {label:'Serbia',value:'rs',continent:'Europe',icon:'statics/Serbia.png',lang:''},
      {label:'Russia',value:'ru',continent:'Asia',icon:'statics/Russian Federation.png',lang:'ru'},
      {label:'Saudi Arabia',value:'sa',continent:'Asia',icon:'statics/Saudi Arabia.png',lang:'ar'},
      {label:'Sweden',value:'se',continent:'Europe',icon:'statics/Sweden.png',lang:''},
      {label:'Singapore',value:'sg',continent:'Asia',icon:'statics/Singapore.png',lang:'en'},
      {label:'Slovenia',value:'si',continent:'Europe',icon:'statics/Slovenia.png',lang:''},
      {label:'Slovakia',value:'sk',continent:'Europe',icon:'statics/Slovakia.png',lang:''},
      {label:'Thailand',value:'th',continent:'Asia',icon:'statics/Thailand.png',lang:'th'},
      {label:'Turkey',value:'tr',continent:'Asia',icon:'statics/Turkey.png',lang:'tr'},
      {label:'Taiwan',value:'tw',continent:'Asia',icon:'statics/Taiwan.png',lang:'cn'},
      {label:'Ukraine',value:'ua',continent:'Europe',icon:'statics/Ukraine.png',lang:'ru'},
      {label:'United States',value:'us',continent:'America',icon:'statics/United States of America.png',lang:'en'},
      {label:'Venuzuela',value:'ve',continent:'America',icon:'statics/Venezuela.png',lang:'es'},
      {label:'South Africa',value:'za',continent:'Africa',icon:'statics/South Africa.png',lang:'en'}
    ],
    categoryByOptions: [ 
      {label:"all", value:"general"},
      {label:"business", value:"business"},
      {label:"entertainment", value:"entertainment"},        
      {label:"health", value:"health"},
      {label:"science", value:"science"},
      {label:"sports", value:"sports"},
      {label:"technology", value:"technology"} 
    ],
    country_by:'us',
    category_by:'general',
    totalResults:0,
  },
  mutations: {
    test(state, index){
      console.log('mutations : '+index)
      console.log(state.country_headline.slice(0,index*20))
      state.country_headline = state.country_headline.slice(0,index*20);
    },
    SET_COUNTRY_HEADLINE(state, articles){
      let country = state.countryByOptions.find(item => item.value == state.country_by);
      let lang = country.lang
      articles.map(article => {
        Object.assign(article,{translated_text:'',src_lang:lang})
      })
      state.country_headline = articles
    },
    SETTOTLRESULTS(state,total){
      state.totalResults = total
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
      const total = response.data.totalResults
      commit('SETTOTLRESULTS',total)
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
