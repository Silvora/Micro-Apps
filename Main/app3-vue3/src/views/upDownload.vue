<template>
    <el-form 
    ref="ruleFormRef"
    :model="form" 
    label-width="120px"
    label-position="top"
    >

    <el-form-item label="视频标题：">
      <el-input v-model="form.name" />
    </el-form-item>

     <el-form-item label="视频类型：">
      <el-select v-model="form.region" placeholder="请选择视频类型？">
        <el-option v-for="item in routes" :key="item.name" :label="item.meta.title" :value="item.meta.title"/>
      </el-select>
    </el-form-item>


     <el-form-item label="视频简介：">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>


    <el-form-item label="上传视频：">
        <el-row :gutter="20">
            <el-col :span="16">
            <el-input v-model="videoFileUrl" disabled/></el-col>
            <el-col :span="8">
                 <el-upload
                    ref="upload"
                    class="upload-demo"
                    :show-file-list="false"
                    :before-upload="beforeUpDownload"
                   
                    :http-request="upDownloadVideos"
                    accept=".mp4, .webm, .ogg"
                >
                <template #trigger>
                    <el-button type="primary">选择视频</el-button>
                    
                </template>
                 <el-button @click="onLookVideos"> 
                    查看视频
                </el-button>
                </el-upload>
                
           </el-col>
        </el-row>
    </el-form-item>


 <el-form-item label="展示图片：">

  <el-upload
    v-model:file-list="fileList"
    list-type="picture-card" 
    :http-request="upDownloadImages"
    :on-change="changeImages"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemoveImages"
      accept=".png, .jpg, .jpeg"
    >
    <el-icon><Plus /></el-icon>
  </el-upload>

 </el-form-item>

    <el-form-item>
      <el-button type="primary" size="large" class="btn" @click="onSubmit">上传</el-button>
      <el-button class="btn" size="large" @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
    
    </el-form>

    <el-dialog
    v-model="videos"
    :title="videoFileUrl"
    width="60%"
    :destroy-on-close="true"
  >
    <video class="videoUrl" controls>
  <source :src="videosUrl" type="video/mp4">
  <source :src="videosUrl" type="video/webm">
  <source :src="videosUrl" type="video/ogg">
    您的浏览器不支持Video标签。
</video>
  </el-dialog>

   <el-dialog v-model="dialogVisible"  :title="imagesUrl">
    <img w-full :src="dialogImageUrl" alt="Preview Image" class="imgUrl"/>
  </el-dialog>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { reactive,ref } from 'vue'
import { addVideo } from '../api/video';
import { Routes } from "../store/routes"
// do not use same name with ref

const fileList = []



const store = Routes()
const routes = store.routes
const ruleFormRef = ref()
const form = reactive({
  name: '',
  region: '',
  desc: '',
  // uploadVideoFile: new FormData(),
  // uploadImagesFile: new FormData()
})
const videos = ref(false)
let uploadVideoFile =  new FormData()
let uploadImagesFile =  new FormData()
let videosUrl = ref("")
let imagesUrl = ref("")
let videoFileUrl = ref("")
// const handleClose = ()=>{
//     videos.value = false
// }
const onLookVideos = ()=>{
    if(videoFileUrl.value != ''){
        videos.value = true   
    }else{
         ElMessage({
            message: '请选择视频！！！',
            type: 'warning',
        })
    }
}

const onSubmit = () => {
  console.log('submit!')
  let data = {
    ...form,
    imgFile: uploadImagesFile,
    videoFile: uploadVideoFile
  }

  addVideo(data).then(res=>{
    console.log(res)
  })
}
const resetForm = (formEl) => {
  if (!formEl) return
  console.log(formEl)
  formEl.resetFields()
}



const beforeUpDownload = (file)=>{
   // uploadVideoFile =  new FormData()
    //console.log(file)
    uploadVideoFile.append("file", file.raw)
    uploadVideoFile.append("name", file.name)
    videoFileUrl.value = file.name
    videosUrl.value = window.webkitURL.createObjectURL(file)

    //console.log(uploadFile)
}

const upDownloadVideos = ()=>{
    
}
const upDownloadImages= ()=>{

}


const dialogImageUrl = ref('')
const dialogVisible = ref(false)
//const disabled = ref(false)

const changeImages = (file,fileList) => {
  //console.log(file )
  if([...fileList].length >= 2){
    fileList = fileList.splice(0,1)
  }
  uploadImagesFile.append("file", file.raw)
  uploadImagesFile.append("name", file.name)

}

const handleRemoveImages = (file, fileList)=>{
  console.log(file, fileList)
}

// const handleRemove = (uploadFile, uploadFiles) => {
//   console.log(uploadFile, uploadFiles)
//   handleRemoveImages()
// }

const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
  imagesUrl.value = file.name
}

// const handleDownload = (file) => {
//   console.log(file)
// }
</script>


<style scoped>
.el-form{
    color: #fff;
}
:deep(.el-form-item__label){
    color: #fff;
}
:deep(.el-select){
    width: 100%;
}
:deep(.el-textarea__inner){
    background-color: #000;
    color: #fff;
}
.el-form :deep(.el-input__wrapper){
    background-color: #000;
}
.el-row{
    width: 100%;
}
.el-row .el-button{
    margin: 0 0 3px 20px;
}
.videoUrl{
    width: 100%;
    height: 100%;
}
/* .el-form-item__content .el-button{
    width: 200px;
} */
.btn{
    width: 180px;
}
.imgUrl{
  display: block;
  width: 100%;
  height: 100%;
}
</style>