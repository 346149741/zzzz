<template>
  <div class="app-container">
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card class="box-card">
          <el-tabs
            v-model="activeName"
            type="card"
          >
            <el-tab-pane
              label="年度训练计划"
              name="年度训练计划"
            >
              <div class="el-tab-content">
                <ndjh />
              </div>
            </el-tab-pane>
            <el-tab-pane
              label="阶段训练计划"
              name="阶段训练计划"
            >
              <div class="el-tab-content">
                <jdjh />
              </div>
            </el-tab-pane>
            <el-tab-pane
              label="月训练计划"
              name="月训练计划"
            >
              <div class="el-tab-content">
                <yjh />
              </div>
            </el-tab-pane>
            <el-tab-pane
              label="周训练计划"
              name="周训练计划"
            >
              <div class="el-tab-content">
                <zjh />
              </div>
            </el-tab-pane>
            <el-tab-pane
              label="专项训练计划"
              name="专项训练计划"
            >
              <div class="el-tab-content">
                <zxjh />
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import ndjh from './ndjh.vue'
import jdjh from './jdjh.vue'
import yjh from './yjh.vue'
import zjh from './zjh.vue'
import zxjh from './zxjh.vue'
export default {
  components: { ndjh, jdjh, yjh, zjh, zxjh },
  data() {
    return {
      activeName: '年度训练计划'
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  beforeDestroy: function() {},
  created() {},
  methods: {}
}
</script>
<style scoped>
</style>
