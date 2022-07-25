<template>
        <el-pagination 
            background 
            layout="prev, pager, next, jumper" 
            :hide-on-single-page="true"
            :page-size="6"
            :page-count="Query.pageCount"
            :pager-count="5"
            :default-current-page="1"
            @current-change="handleCurrentChange"
        />
</template>

<script setup>
import { reactive } from 'vue';

let Query = reactive({
    page: 1,
    pageCount: 10
})

// type Props = {
//     page: number,
//     limit: number
// }

// defineProps<Props>()

//const emit = defineEmits(["onPage"])

//let page = ref(1)
const handleCurrentChange = (val)=>{
   // Query.page = val
    console.log(val)
    //emit("onPage", val)
}

// return {
//     ...toRefs(Query)
// }

</script>

<style scoped>

.el-pagination{
   width: 480px;
   margin: 0 auto;
}
</style>