<template>
  <div class="home">
    <DataList />
    <el-row :gutter="20">
      <el-col :span="16"
        ><div class="grid-content bg-purple">
          <DataBar /></div
      ></el-col>
      <el-col :span="8"
        ><div class="grid-content bg-purple">
          <DataGaugeVue />
          <el-card class="box-card"> 111111111111111111 </el-card>
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
import DataList from "../components/Home/dataList.vue";
import DataBar from "../components/Home/dataBar.vue";
import DataGaugeVue from "../components/Home/dataGauge.vue";
export default {
  name: "Home",
  components: {
    DataList,
    DataBar,
    DataGaugeVue,
  },
};
</script>

<style lang="less" scoped>
.el-row {
  margin: 20px 0;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple {
  box-shadow: 1px 2px 5px #000;
  background-color: #fff !important;
}

.grid-content {
  border-radius: 4px;
  //min-height: 36px;
  height: calc(100vh - 260px);
}
.box-card {
  border: none;
  width: 90%;
  margin: 0 auto;
  height: 45%;
}
</style>

