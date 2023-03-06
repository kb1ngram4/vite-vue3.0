<template>
    <div class="home">
        <h3>我是{{name}},今年{{age}}</h3>
        <button @click="plusAge">+</button>
    </div>
</template>
<script lang="ts">
import { defineComponent,ref } from 'vue'

export default defineComponent({
    // data(){
    //     return {
    //         name:'xxxx'
    //     }
    // },
    setup() {
        const name = ref('小帅');
        const age = ref(18)
        function plusAge() {
            age.value++
        }
        return{
            name,age,plusAge
        }
    },
    mounted(){
        // console.log(this);
        
    }
})
</script>
