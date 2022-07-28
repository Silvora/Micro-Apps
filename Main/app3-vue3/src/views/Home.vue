<template>
    <div class="home">
        <div class="title">{{name}}</div>
        <div class="video">
            <el-row :gutter="20">
            <el-col :span="8" v-for="item in videoList" :key="item.id">
                <router-link :to="'/video/'+ item.id">
                <el-card shadow="hover"> 
                    <el-image :src="urlData + item.imgUrl" />
                    <div class="userInfo">
                    <div><el-icon><User /></el-icon><span>{{item.admin}}</span></div>
                    <div><el-icon><View /></el-icon><span>1.3k</span></div>
                    <div><el-icon><Star /></el-icon><span>4.5k</span></div>
                    </div>
                    <div class="videoTitle">
                        {{item.introduce}}
                    </div>
                    </el-card>
                    </router-link>
                </el-col>
        </el-row>
        </div>
        <footer>
            <Pagination @onPage="onPage" :total="total" :key="total"></Pagination>
        </footer>
    </div>
</template>


<script setup>
import Pagination from "../components/pagination.vue"
import {reactive, onMounted, ref, watchEffect} from "vue"
import { getVideos } from "../api/video"
import { useRoute } from "vue-router"

    const route = useRoute()
    let Query = reactive({
        page: 1,
        selected: ""
    })

    const videoList = ref(null)

    const urlData = ref("http://api.757909.xyz/images/")
    //const urlData = ref("http://192.168.1.10:12345/images/")
    let total = ref(0)
    const name = ref("")
    let path= ref("")
    name.value =  route.meta.title
    path.value = route.path
    //console.log(route.meta.title,route.path)
    const onPage = (val)=>{

        Query.page = val

        getVideosList()

    }

const getVideosList = ()=>{
     getVideos(Query).then(res=>{
           if(res.code == 200){
                total.value = res.count
                //console.log(total.value)
                videoList.value = res.data
           // console.log(videoList.value)

           }
        })
}
onMounted(
    ()=>{
        getVideosList()
    }
)


watchEffect(()=>{
    //console.log(route.meta.title)
    name.value = route.meta.title
    Query.selected = route.meta.title
    getVideosList()

})
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
.el-col{
    margin-bottom: 20px;
}
.title{
    font-size: 32px;
    margin-bottom: 20px;
}
.el-card{
    width: 100%;
    height: 250px;
    background-color: rgba(110, 109, 109, 0.2);
    padding: 0;
    padding: 0;
    border: 1px solid #ccc;
    color: #fff;
}
.el-image {
    width: 100%;
    height: 190px;
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
    font-size: 12px;
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
a{
  text-decoration: none;
}
</style>