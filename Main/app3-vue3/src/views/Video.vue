<template>
   <div class="videos">
            <div class="win">
                <div class="title">{{title}}</div>
               <Videos :options = "options" v-if="isVideo"></Videos>
               <div class="info">
                   <div class="user">
                         <el-avatar
                     :size="30"
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                    />
                    <span class="name">{{admin}}</span>
                   </div>
                   <div class="context">
                       {{context}}
                   </div>
                   <div class="handle">
                    <div><el-icon><AlarmClock /></el-icon><span>{{date}}</span></div>
                    <div><el-icon><View /></el-icon><span>1.3k</span></div>
                    <div><el-icon><Star /></el-icon><span>4.5k</span></div>
                    <div><el-icon><Pointer /></el-icon><span>4.5k</span></div>
                   </div>
               </div>
            </div>
   </div>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity"
import { onMounted } from "@vue/runtime-core"
import { useRoute } from "vue-router"
import Videos from "../components/videos.vue"
import {getVideo} from "../api/video"


const route = useRoute()

const options = reactive({
    playbackRates: [0.5,1.0,1.5,2.0],
    controls: true,
    muted: true,
    fluid: true,
    reload: "auto",
    aspectRatio: "18:9",
    poster:"",
    //poster: "http://192.168.1.10:12345/images/7824be47-09ae-417b-ba92-e5e270122712.png",
    sources: [{
        //src: "http://192.168.1.10:12345/videos/7399c2bc-504f-46f5-b492-158ba5df4e8f.mp4",
        src:"",
        type: "video/mp4"
    }],
    notSupportedMessage:"此视频无法正常播放，请稍后再试",
    controBar:{
        timeDivder: true,
        durationDisplay: true,
        remainingTimeDisplay: false,
        fullscreenToggle: true
    }
})
let isVideo = ref(false)
let admin = ref("")
let title = ref("")
let context = ref("")
let date = ref("")
//const urlData = "http://192.168.1.10:12345/images/"
const urlData = "http://api.757909.xyz/images/"
onMounted(()=>{
   getVideo(route.params.id).then(res=>{
       console.log(res)
       let urlList = res.data.videoUrl.split(".")
       if(res.code == 200){
           let data = res.data
           options.poster = urlData+data.imgUrl
           options.sources[0].src = urlData+data.videoUrl
           options.sources[0].type = "video/" + urlList[1]
            admin.value = data.admin
            title.value = data.name
            context.value = data.introduce
            date.value = data.date
            isVideo.value = true
       }
   })

})
</script>

<style scoped lang="less">
.videos{
    width: 100%;
    height: calc(100vh - 110px);
    color: #fff;
    .title{
        display: block;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 30px;
        font-weight: bold;
        padding: 5px 0;
        background-color: rgba(26, 27, 28, 0.9);
    }
   .win{
       width: 80%;
       margin: 0 auto;
   }
   .info{
       width: 100%;
       padding: 5px 0;
        background-color: rgba(26, 27, 28, 0.9);
       .user{
           display: flex;
           .name{
               padding: 2px 5px;
           }
       }
       .context{
           margin: 5px 0;
           overflow: hidden;
           text-overflow: ellipsis;
           white-space: nowrap;
       }
       .handle{
           display: flex;
           width: 80%;
           margin: 0 auto;
           font-size: 12px;
           justify-content: space-between;
           div{
               text-align: center;
               span{
                   display: block;
               }
           }
       }
   }
}
</style>