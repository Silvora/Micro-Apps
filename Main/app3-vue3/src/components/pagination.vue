<template>
        <div class="paginationDiv">
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
        </div>
</template>

<script setup>
import { reactive,defineEmits,defineProps, watchEffect } from 'vue';

let Query = reactive({
    page: 1,
    pageCount: 10
})

// type Props = {
//     page: number,
//     limit: number
// }

// defineProps<Props>()
const data = defineProps({total: {type:Number}})

const emit = defineEmits(["onPage"])

const handleCurrentChange = (val)=>{
    emit("onPage", val)
}

watchEffect(()=>{
   //console.log(data.total)
    Query.pageCount = Math.ceil(data.total/6)
})

// return {
//     ...toRefs(Query)
// }

</script>

<style scoped lang="less">
.paginationDiv{
    width: 100%; 
    display: flex; 
    text-align: center;  
}
:deep(.el-pagination){
   margin: 0 auto;
}
</style>