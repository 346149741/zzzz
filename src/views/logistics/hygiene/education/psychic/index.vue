<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>心理小常识</span>
      </div>
      <el-card v-for="(item, index) in dataList" :key="index" style="width: 80%;margin-bottom: 24px;">
        <div style="font-size: 18px;font-weight: 600;margin-bottom: 8px;">{{ item.a }}</div>
        <div style="font-size: 12px;margin-bottom: 18px;">{{ item.b }}</div>
        <div style="font-size: 12px;line-height: 24px;">
          {{ item.c }}
        </div>
        <div style="font-size: 13px;color: #2D8DEA;"><a href="javaScript:;" @click="handleView(item)">阅读全文</a></div>
      </el-card>
      <!--操作按钮-->
    </el-card>
    <!--详情查看-->
    <el-dialog
      class="abow_dialog detail-form"
      title="查看"
      :visible.sync="checkdetail"
      :close-on-click-modal="false"
      width="50%"
    >
      <div class="dialog-content">
        <div class="dialog-item" style="font-size: 14px;line-height: 22px;">
          <div v-for="(item, index) in dataForm.d" :key="index">{{ item }}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MeAPI from '@/api/logistics/hyg-psychic'
export default {
  name: 'Index',
  data() {
    return {
      checkdetail: false,
      dataList: [],
      dataForm: { a: '', b: '', c: '', d: [] }
    }
  },
  mounted() {
    this.geDictList()
  },
  methods: {
    geDictList() {
      this.getList()
    },
    getList() {
      const res = MeAPI.page(this.listQuery)
      this.listLoading = false
      this.total = res.data.totalElements
      this.dataList = res.data.content
    },
    handleView(info) {
      this.checkdetail = true
      this.dataForm = Object.assign({}, info)
    }
  }
}
</script>

<style scoped>

</style>
