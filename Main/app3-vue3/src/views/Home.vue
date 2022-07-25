<template>
    <div class="home">
        <div class="title">aaaa</div>
        <div class="video">
            <el-row :gutter="40">
            <el-col :span="8"><el-card shadow="hover"> 
                 <el-image :src="src" />
                <div class="userInfo">
                   <div><el-icon><User /></el-icon><span>1212121</span></div>
                   <div><el-icon><AlarmClock /></el-icon><span>20.01.12</span></div>
                   <div><el-icon><View /></el-icon><span>1.3k</span></div>
                   <div><el-icon><Star /></el-icon><span>4.5k</span></div>
                </div>
                <div class="videoTitle">
                    年底薩德薩俄方速度好2v3jh21vdsadsadsadasd3j12h3vj213vdsadsadas
                </div>
                </el-card></el-col>
            <el-col :span="8"><el-card shadow="hover"> Never </el-card></el-col>
            <el-col :span="8"><el-card shadow="hover"> Never </el-card></el-col>
        </el-row>

        <el-row :gutter="40">
            <el-col :span="8"><el-card shadow="hover"> 
                 <el-image :src="src" />
                <div class="userInfo">
                   <div><el-icon><User /></el-icon><span>1212121</span></div>
                   <div><el-icon><AlarmClock /></el-icon><span>20.01.12</span></div>
                   <div><el-icon><View /></el-icon><span>1.3k</span></div>
                   <div><el-icon><Star /></el-icon><span>4.5k</span></div>
                </div>
                <div class="videoTitle">
                    年底薩德薩俄方速度好2v3jh21vdsadsadsadasd3j12h3vj213vdsadsadas
                </div>
                </el-card></el-col>
            <el-col :span="8"><el-card shadow="hover"> Never </el-card></el-col>
            <el-col :span="8"><el-card shadow="hover"> Never </el-card></el-col>
        </el-row>
        </div>
        <footer>
            <Pagination @onPage="onPage"></Pagination>
        </footer>
    </div>
</template>

<script setup>
import Pagination from "../components/pagination.vue"
import {reactive} from "vue"
const src =
  'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'

    let Query = reactive({
        page: 1,
        limit: 6
    })

    const onPage = (val)=>{
        Query.page = val
        console.log(val)
    }
</script>

<style scoped>
.home{
    width: 100%;
    height: calc(100vh - 110px);
    color: #fff;
   /* overflow: hidden;
   overflow-y: scroll; */
}
.video{
    width: 100%;
    height: calc(100vh - 200px);
   overflow: hidden;
   overflow-y: auto;
}
.el-row{
    margin-bottom: 40px;
}
.title{
    font-size: 32px;
    margin-bottom: 20px;
}
.el-card{
    width: 100%;
    height: 360px;
    background-color: thistle;
    padding: 0;
    padding: 0;
}
.el-image {
    width: 100%;
    height: 300px;
}
:deep(.el-card__body){
     padding: 0;
}
.userInfo{
    display: flex;
    justify-content: space-around;
    font-weight: bold;
    margin: 5px 0;
}
.userInfo div{
    display: flex;
}
.userInfo div span{
    font-size: 14px;
    align-items: center;
}
.userInfo .el-icon{
    display: inline-block;
    margin-right: 3px;
   
}
.videoTitle{
    width: 100%;
    height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-indent: 0.5em;
}
</style>