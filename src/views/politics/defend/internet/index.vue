<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>互联网备案</span>
      </div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="入户开网备案" name="first">
          <index1 />
        </el-tab-pane>
        <el-tab-pane label="网站域名备案" name="second">
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

</style>
