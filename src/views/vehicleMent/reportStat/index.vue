<template>
  <div class="app-container">
    <el-row>
        <img :src="carTj" class="sidebar-logo">
    </el-row>
    
  </div>
</template>
<script>
const echarts = require("echarts");
export default {
  name: "ObjManage",

  data() {
    return {
      dataVal: "",
      carTj: require('@/assets/common/carTb.png'),
      carInfo:{
        'allcount':12500,
        'ysycount':10500,
        'xscount':8000,
        'alllc':20000000,
        'pjlc':100000,
        'allsc':36586032,
        'pjsc':120560,
      },
      listArr: [], // 已添加用户
      total: 6, // 总数
      listLoading: true,
      selectList: [],
    };
  },
  created() {},
  methods: {},
};
</script>
<style scoped>
.app-container {
  background: #081832;
}
.car{
  background:#034c6a;
  text-align:center;
  height:80px;
  line-height: 30px;
}
.car_title{
  color:#ffffff;
  margin-top: 12px;
  font-size: 14px;
}
.car_num{
  color:chocolate;
  font-weight: 600;
}
</style>
