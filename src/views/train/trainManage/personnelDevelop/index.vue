<template>
  <div class="app-container">
    <el-row :gutter="15">
      <el-col :span="24">
        <el-card class="box-card">
          <el-tabs
            v-model="activeName"
            type="card"
            @tab-click="handleClick"
          >
            <el-tab-pane
              label="人才培养计划"
              name="人才培养计划"
            >
              <div class="el-tab-content">
                <rcpy />
              </div>
            </el-tab-pane>
            <el-tab-pane
              label="人才信息档案"
              name="人才信息档案"
            >
              <div class="el-tab-content">
                <xxda />
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import rcpy from './rcpy.vue'
import xxda from './xxda.vue'
export default {
  components: { rcpy, xxda },
  data() {
    return {
      controlXxtj: false,
      activeName: '人才培养计划'
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  beforeDestroy: function() {},
  created() {},
  methods: {
    handleClick(tab, event) {
      if (tab.name === '信息统计') {
        this.controlXxtj = true
      } else {
        this.controlXxtj = false
      }
    }
  }
}
</script>
<style scoped>
</style>
