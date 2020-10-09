<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>装备技术力量</span>
      </div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="装备技术人员" name="first">
          <person />
        </el-tab-pane>
        <el-tab-pane label="装配技术培训" name="second">
          <train />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import person from './person'
import train from './train'
export default {
  name: 'Index',
  components: { person, train },
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
