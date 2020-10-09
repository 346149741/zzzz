<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>民情社情</span>
      </div>
      <div style="padding-bottom: 10px">
        <el-row :gutter="12">
          <el-col class="cards">
            <el-card shadow="hover">
              <i class="el-icon-discount" style="font-size: 70px" />
              <span>5个生活区</span>
            </el-card>
          </el-col>
          <el-col class="cards">
            <el-card shadow="hover">
              <i class="el-icon-office-building" style="font-size: 70px" />
              <span>33栋住宅楼</span>
            </el-card>
          </el-col>
          <el-col class="cards">
            <el-card shadow="hover">
              <i class="el-icon-school" style="font-size: 70px" />
              <span>99个单元</span>
            </el-card>
          </el-col>
          <el-col class="cards">
            <el-card shadow="hover">
              <i class="el-icon-price-tag" style="font-size: 70px" />
              <span>396个家庭</span>
            </el-card>
          </el-col>
          <el-col class="cards">
            <el-card shadow="hover">
              <i class="el-icon-user" style="font-size: 70px" />
              <span>1108口人</span>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="民情社情档案" name="first">
          <index1 />
        </el-tab-pane>
        <el-tab-pane label="民情社情动态" name="second">
          <index2 />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import index1 from './index1'
import index2 from './index2'
export default {
  name: 'Index',
  components: { index1, index2 },
  data() {
    return {
      activeName: 'first'
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style scoped>
  .cards{
    height: 140px;
    width: 20%;
  }
</style>
