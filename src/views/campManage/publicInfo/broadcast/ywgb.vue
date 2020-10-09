<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="iframeDiv">
          <iframe src="http://www.1234.me/bianqian/#" class="iframeDiv" />
        </div></el-col>
    </el-row>
    <el-row style="margin-top:20px;">
      <el-col :span="12">
        <div>
          <el-input
            v-model="textarea"
            type="textarea"
            placeholder="请输入内容"
            maxlength="300"
            show-word-limit
            height="300"
          />
        </div>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-col :span="24">
            <div style="margin-left:20px;">
              <div class="adjustDiv">
                <span class="demonstration">音乐音量：</span>
                <span class="demonstration">小</span>
                <el-slider v-model="value1" />
                <span class="demonstration">大</span>
              </div>
              <div class="adjustDiv">
                <span class="demonstration">主播音量：</span>
                <span class="demonstration">小</span>
                <el-slider v-model="value2" />
                <span class="demonstration">大</span>
              </div>
              <div class="adjustDiv">
                <span class="demonstration">主播语调：</span>
                <span class="demonstration">低</span>
                <el-slider v-model="value3" />
                <span class="demonstration">高</span>
              </div>
              <div class="adjustDiv">
                <span class="demonstration">朗读速度：</span>
                <span class="demonstration">快</span>
                <el-slider v-model="value3" />
                <span class="demonstration">慢</span>
              </div>
              <el-button
                class="filter-item btn-base"
                type="primary"
                icon="mr10 iconfont iconxinzengh"
              >点击试听</el-button>
              <el-button
                class="filter-item btn-base"
                type="primary"
                icon="mr10 iconfont iconxinzengh"
              >加入清单</el-button>
              <el-button
                class="filter-item btn-base"
                type="primary"
                icon="mr10 iconfont iconxinzengh"
              >立即播放</el-button>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'CameraManage',
  components: {
  },
  filters: {
  },
  data() {
    return {
      textarea: '',
      value1: 50,
      value2: 50,
      value3: 50
    }
  },
  watch: {
  },
  created() {

  },
  methods: {
  }
}
</script>
<style>
.el-textarea__inner{
  height:200px !important;
}
</style>
<style lang="scss" scoped>
.el-slider{
  width:300px;
  margin:0px  15px;
}
.adjustDiv{
  padding:5px;
      display: flex;
    align-items: center;
}
.iframeDiv{
     width: 100%;
    height: 300px;
}
.dialog-item{
      margin: 0px 48px 0px 48px !important;
}
.list-query {
  width: 340px;
  margin-right: 22px;
}
.t-col-operate i.table-i{
  margin-right: 0px;
}
// .el-col {
//   margin-right: 20px;
//   &:last-child {
//     margin-right: 0;
//   }
// }
.area {
  text-align: center;
  margin-bottom: 10px;
  height: 25px;
}

.area .area-icon {
  margin: 0 5px;
}

.retate {
  transform: rotate(180deg);
}

.el-button + .el-button {
  margin-left: 0px !important;
}

.el-tag-info {
  margin: 2px;
}

.map-footer {
  text-align: center;
}

.map-footer .el-button {
  margin: 20px 15px 0px;
}
</style>

