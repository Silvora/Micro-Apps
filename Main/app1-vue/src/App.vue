<template>
  <div id="app">
    <el-container>
      <el-aside
        width="230px"
        style="background-color: #1d2939; box-shadow: 3px 3px 5px #000"
      >
        <el-menu
          router
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#1d2939"
          text-color="#fff"
          active-text-color="#000"
          @select="handleSelect"
        >
          <template>
            <div class="logo">
              <img src="./assets/logo.jpeg" alt="" />
            </div>
          </template>
          <el-submenu
            v-for="item in MenuRouter"
            :key="item.id"
            :index="item.id"
          >
            <template slot="title"
              ><i :class="item.icon"></i>{{ item.name }}</template
            >
            <el-menu-item
              v-for="child in item.children"
              :key="child.id"
              :index="child.path"
              :class="urlName == child.path ? 'active' : ''"
              >{{ child.name }}</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{ name }}</span>
        </el-header>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import MenuRouter from "./static/menu";
import { mapState } from "vuex";
import { getToken } from "./utils/Token";
export default {
  data() {
    return {
      MenuRouter: MenuRouter,
      urlName: "",
    };
  },
  computed: {
    ...mapState(["User"]),
    name() {
      return this.User.name;
    },
  },
  mounted() {
    const name = getToken("name");
    //console.log(name);
    this.$store.commit("setUserName", name);
    //console.log(getToken("name"));
  },
  methods: {
    handleSelect(key) {
      this.urlName = key;
    },
  },
};
</script>


<style lang="less">
.el-container {
  margin: 0;
  padding: 0;
  width: 100% !important;
  height: 100vh;
}
.el-header {
  background-color: #30363f;
  color: #fff;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.el-menu {
  border-right: none !important;
}
//.el-menu-item is-active
.active {
  // display: inline-block;
  width: 100%;
  //height: 34px;
  //line-height: 34px;
  //margin: auto 0;
  background-color: #f0f5e8 !important;
  border-radius: 3px;
  color: #000 !important;
}
.header {
  text-align: right;
  margin-top: 5px;
  font-size: 12px;
  //background-color: #d3d7db;
  margin-left: 12px;
  //box-shadow: 60px -16px teal;
  box-shadow: 1px 2px 5px #000;
}
.main {
  margin-left: 12px;
  margin-top: 15px;
  //box-shadow: 60px -16px teal;
  box-shadow: 1px 1px 12px #000;
}
.logo {
  width: 100%;
  height: 65px;
  background-color: #fff;
  img {
    display: inline-block;

    margin-top: 3px;
  }
}
</style>
