<template>
    <div class="video">
        <video ref="videoPlayer" class="video-js vjs-default-skin vjs-big-play-centered"></video>
    </div>
</template>

<script setup>
import "video.js/dist/video-js.css"
import VideoJs from "video.js"
import {onBeforeUnmount, onMounted,defineProps,ref} from "vue"


let videoPlayer = ref(null)
//let videosOptions = ref("")
//let videosOptions = null
const props = defineProps({options:{type: Object}})
console.log(props.options)
//videosOptions = props.options

// let videoStatic = null
// console.log(videoStatic)
// videoStatic = props.options

let player = null


onMounted(()=>{
    player = VideoJs(videoPlayer.value, props.options, function onPlaye(){
        console.log("open")
    })
})
onBeforeUnmount(()=>{
    if(player){
        player.dispose()
    }
})
</script>

<style scoped>
/* .video{
    width: 100%;
    height: 100%;
    color: #fff;
} */
.video{
    width: 100%;
}

vjs-paused .vjs-big-play-button,
vjs-paused.vjs-has-started .vjs-big-play-button{
    display:block;
}
</style>