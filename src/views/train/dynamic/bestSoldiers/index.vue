<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>训练标兵</span>
      </div>
      <div style="margin-bottom:20px">
        <el-button class="filter-item btn-base filter-add-btn">新增</el-button>
      </div>
      <el-row :gutter="12">
        <el-col :span="8">
          <h3>年度训练标兵</h3>
          <img src="@/assets/common/soldier.jpg"/>
          <p>姓名：张某某</p>
          <p>单位：a连三班</p>
          <p>军衔：下士</p>
          <p>训练成绩：3分16秒</p>
          <p>日期：2020年二季度</p>
        </el-col>
        <el-col :span="8">
          <h3>季度训练标兵</h3>
          <img src="@/assets/common/soldier.jpg"/>
          <p>姓名：张某某</p>
          <p>单位：a连三班</p>
          <p>军衔：下士</p>
          <p>训练成绩：3分16秒</p>
          <p>日期：2020年二季度</p>
        </el-col>
        <el-col :span="8">
          <h3>月训练标兵</h3>
          <img src="@/assets/common/soldier.jpg" />
          <p>姓名：王某某</p>
          <p>单位：c连五班</p>
          <p>军衔：中士</p>
          <p>训练成绩：3分10秒</p>
          <p>日期：2020年8月</p>
        </el-col>
      </el-row>
      <h3>往期训练标兵</h3>
      <el-row :gutter="12">
        <el-col :span="6">
          <img src="@/assets/common/soldier.jpg"  style="width:100%"/>
          <p>姓名：张某某</p>
          <p>单位：a连三班</p>
          <p>军衔：下士</p>
          <p>训练成绩：3分16秒</p>
          <p>日期：2020年一季度</p>
        </el-col>
        <el-col :span="6">
          <img src="@/assets/common/soldier.jpg" style="width:100%" />
          <p>姓名：张某某</p>
          <p>单位：a连三班</p>
          <p>军衔：下士</p>
          <p>训练成绩：3分16秒</p>
          <p>日期：2020年7月</p>
        </el-col>
        <el-col :span="6">
          <img src="@/assets/common/soldier.jpg" style="width:100%" />
          <p>姓名：张某某</p>
          <p>单位：a连三班</p>
          <p>军衔：下士</p>
          <p>训练成绩：3分16秒</p>
          <p>日期：2020年6月</p>
        </el-col>
        <el-col :span="6">
          <img src="@/assets/common/soldier.jpg"  style="width:100%"/>
          <p>姓名：张某某</p>
          <p>单位：a连三班</p>
          <p>军衔：下士</p>
          <p>训练成绩：3分16秒</p>
          <p>日期：2020年5月</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
  <!-- 
  上月训练标兵
  上周训练标兵

  往期训练标兵查询

  添加训练标兵（周、月）
  
   -->
<script>
export default {
  data () {
    return {

    }
  },
  created () {

  },
  methods: {

  }
}
</script>
<style scoped>
h3 {
  margin: 0 0 10px 0;
  color: #1c9399;
}
</style>