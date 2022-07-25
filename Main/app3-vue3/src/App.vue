<template>
    <el-container>
      <el-header>
         <el-row>
            <el-col :span="6"><div class="title">
                xxx影视
            </div></el-col>
            <el-col :span="12"><div>
                 <el-input
                    v-model="search"
                    class="w-50 m-2"
                    placeholder="Search"
                    :prefix-icon="Search"
                    @keyup.enter="handleSearch"
                    />
            </div></el-col>
            <el-col :span="6"><div>
                <div class="userInfo">
                    <router-link to="/upDownload"><span><el-icon><VideoCameraFilled /></el-icon></span></router-link>
                    <router-link  to="/messes"><span><el-icon><Opportunity /></el-icon></span></router-link>
                    <router-link to="/profile"><span><el-icon><UserFilled /></el-icon></span></router-link>
                </div>
            </div>
            </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside>
           <el-menu
            active-text-color="#ffd04b"
            class="el-menu-vertical-demo"
             background-color="#303133"
            default-active="1"
            text-color="#fff"
            active-background-color="#000"
            router
          >
           <el-menu-item index="/" >
         
           <el-icon><Menu/></el-icon>
         
          <span>首页</span>
        </el-menu-item>
           <el-menu-item v-for="(item,idx) in routes" :key="idx" :index="item.path" >
           <el-icon><component :is="item.meta.icon"/></el-icon>
          <span>{{item.meta.title}}</span>
        </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { Routes } from "./store/routes"
import { ref } from 'vue';
const store = Routes()
const routes = store.routes
//console.log(store.$patch("addRouter"))
store.addRouter()

//console.log()
const search = ref("")

const handleSearch =()=>{
  console.log(search.value)
}
</script>

<style scoped>
:global(*){
  padding: 0;
  margin: 0;
}
.el-container{
    width: 100vw;
    height: 100vh;
}
.el-header{
    width: 100vw;
    height: 70px;
    background-color: #303133;
}
.el-aside{
    width: 200px;
    background-color: #303133;
}
.el-menu{
   border-right: none;
}
.el-main{
  background-color: #000;
}
.el-row {
    height: 100%;
    line-height: 70px;
}
.title{
    font-size: 26px;
    font-weight: bold;
    color: #fff;
}
.userInfo{
    float: right;
}
:deep(.el-input__wrapper){
  background-color: #000;
}
:deep(.el-input__inner){
  color: #fff;
}
/* el-input__wrapper
el-input__prefix */
/* .el-input__inner{
  background-color: #000;
} */
.el-icon{
    font-size: 18px;
    margin: 0 8px;
    color: #fff;
}
</style>