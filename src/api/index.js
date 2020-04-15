import axios from 'axios'

function fetchCountryHeadline(country, category){
    let category_value = category || 'general'
    return axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.VUE_APP_NEWS_KEY}&category=${category_value}`)
}
function translationData(src_lang,  target_lang, target){
    return axios.get(`http://localhost:8080/v1/translation/translate?src_lang=${src_lang}&target_lang=${target_lang}&query=${target}`,
        {headers: {
          'Authorization': `KakaoAK ${process.env.VUE_APP_TRANSLATION_KEY}`,
          }}
      )
}
function fetchSources(){
    return axios.get(`https://newsapi.org/v2/sources?apiKey=${process.env.VUE_APP_NEWS_KEY}`)
}
export {fetchCountryHeadline, translationData, fetchSources}