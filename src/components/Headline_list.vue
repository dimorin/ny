<template>
    <div class="col-md-4 col-lg-3">
        <q-card class="my-card" flat bordered>
            <img :src="item.urlToImage">
            <q-card-section>
                <div class="text-h6">
                    <a :href="item.url" target="_blank">
                        <span v-if="!stateoftranslation">{{item.title}}</span> 
                        <span v-else>{{ item.translated_text }}</span>          
                    </a>
                </div>
                <div class="text-subtitle2">by {{item.author}}</div>
            </q-card-section>
            <q-separator />
            <q-card-actions>            
                <span>{{item.publishedAt}}</span>
                <span>{{item.source.name}}</span>
                <q-btn flat color="primary" v-if="item.src_lang" @click="translationData(item.title,item_index,item.src_lang)">
                    <span v-if="!stateoftranslation">번역</span> 
                    <span v-else>원본</span>
                </q-btn> 
                <span>{{item_index}}</span>
            </q-card-actions>

    
            
            <!-- <button v-if="item.src_lang" @click="translationData(item.title,item_index,item.src_lang)">
                <span v-if="!stateoftranslation">번역</span> 
                <span v-else>원본</span>
            </button>  -->       
        </q-card>
    </div>
    
</template>

<script>
export default {
    props:{
        'item':Object,
        'item_index':Number
        },    
    data(){
        return {
            stateToggle:false
        }
    },   
    computed:{
        stateoftranslation(){
            let value;
            /*            
            this.item.translated_text == '' && this.stateToggle == false ------> 번역 하기 전 상태, 첫번째 나라 세팅 상태 ---> 원문이 나와야함
            this.item.translated_text != '' && this.stateToggle == false ------> 번역 한 상태, 토글 버튼을 두 번 누른 상태 --> 원문이 나와야 함
            this.item.translated_text == '' && this.stateToggle == true ------> 번역 하기 전 상태이면서, 두번째 나라 세팅상태 --> 원문이 나와야 함
            this.item.translated_text != '' && this.stateToggle == true ------> 번역 한 상태, 토글 누른 상태 ---> 번역한 것이 나와야 함
            */
           if(this.item.translated_text != '' && this.stateToggle == true){
               value = true
           }else{
               value = false
           }
            return value
        }
    },
    methods:{
        translationData(title,index,lang){
            let obj = {target:title,index:index,lang:lang}
            this.$emit("translationData",obj)
            this.stateToggle = !this.stateToggle
        }        
    },

}
</script>

<style>

</style>