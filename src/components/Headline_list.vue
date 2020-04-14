<template>
    <li>
        <a :href="item.url" target="_blank">
          <span v-if="!isTranslation">{{item.title}}</span> 
          <span v-else>{{ item.translated_text }}</span>
          [{{item.source.name}}]
        </a>   
        <button @click="translationData(item.title,item_index)">
            <span v-if="!isTranslation">번역</span> 
            <span v-else>원본</span>
        </button>        
    </li>
</template>

<script>
export default {
    props:['item','item_index'],
    data(){
        return {
            isTranslation:false
        }
    },
    methods:{
        translationData(title,index){
            let obj = {target:title,index:index}
            this.$emit("translationData",obj)
            this.isTranslation = !this.isTranslation
        }        
    },
    
}
</script>

<style>

</style>