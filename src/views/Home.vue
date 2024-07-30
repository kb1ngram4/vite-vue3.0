<template>
  <div class="home">
    <h3>我是{{ name }},今年{{ age }}</h3>
    <button @click="plusAge">+</button>
    <tableCom></tableCom>
  </div>
</template>
<script lang="ts" setup>
    import {  onMounted, ref } from "vue";
    import tableCom from '../components/TableCom.vue';
    import {user,square,triangle} from '../utils/example'
    const mounted=()=> {
      // labelFn
    }
    interface labelValue {
      name:string
    }
    const labelValue1: labelValue = {
      name:'我是接口'
    }
    const labelValue2:labelValue = {
      name:'我是接口2'
    }
    const name = ref("小帅");
    const age = ref(18);
    function plusAge() {
        age.value++;
        console.log(123213)
        labelFn('sadasd')
        ces(labelValue1)
        ces(labelValue2)
    }
    
    function labelFn(label:string) {
      console.log(12323123,label);
      
    }
    function ces(labelValue:labelValue):string {
      console.log(labelValue);
      return labelValue.name
      
    }
    onMounted(()=>{
      console.log(user);
      console.log(square.calcPerimeter());
      console.log(triangle.calcPerimeter());
      
    })

</script>
