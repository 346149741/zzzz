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
              label="信息登记"
              name="信息登记"
            >
              <div class="el-tab-content">
                <xxdj />
              </div>
            </el-tab-pane>
            <el-tab-pane
              label="信息统计"
              name="信息统计"
            >
              <div class="el-tab-content">
                <xxtj v-if="controlXxtj" />
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import xxdj from './xxdj.vue'
import xxtj from './xxtj.vue'
export default {
  components: { xxdj, xxtj },
  data() {
    return {
      controlXxtj: false,
      activeName: '信息登记'
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
