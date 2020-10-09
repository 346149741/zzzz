<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>绿色通道</span>
      </div>
      <!--门诊分类内容-->
      <div v-for="(a, b) in tableData" :key="b">
        <div style="border-left: 3px solid #2D8DEA;padding-left: 12px;font-size: 16px;font-weight: 600;">{{ a.title }}</div>
        <div style="display: flex;flex-wrap: wrap-reverse;padding-top: 16px;padding-bottom: 24px;">
          <div v-for="item in a.content" :key="item.id" class="hyg-item" @click="handleView(item)">
            <img :src="item.b" style="width: 60px;height: 60px;margin-left: 25px;margin-top: 15px;">
            <div style="line-height: 20px;font-size: 14px;font-weight: 600;text-align: center;">{{ item.a }}</div>
          </div>
        </div>
      </div>
    </el-card>
    <!--选择医生-->
    <el-dialog
      class="abow_dialog detail-form"
      title="选择医生"
      :visible.sync="checkdetail"
      :close-on-click-modal="false"
      width="70%"
    >
      <div class="dialog-content">
        <div class="dialog-item-title">呼吸内科</div>
        <div class="dialog-table">
          <el-row>
            <el-col v-for="(item, index) in doctorData" :key="index" :span="6" style="border: 1px solid #9E9E9E;padding: 20px;height: 220px;position: relative;">
              <div style="position: relative;font-size: 12px;margin-top: 16px;">
                <img src="/upload/head/20200721/8cb02f5cdffd4bf49398060817c08035.png" style="width: 30px;height: 30px;">
                <div style="font-weight: 600;line-height: 30px;margin-top: -38px;margin-left: 40px;position: absolute;">{{ item.a }}</div>
              </div>
              <div style="position: relative;font-size: 12px;line-height: 30px;">{{ '昵称：'+ item.x }}</div>
              <div style="position: relative;font-size: 12px;line-height: 30px;">{{ '擅长：'+ item.y }}</div>
              <div style="position: absolute;bottom: 10px;right: 10px;">
                <el-button type="primary" size="mini" @click="handleOnline">在线看诊</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-dialog>
    <!--在线就诊-->
    <el-dialog
      class="abow_dialog detail-form"
      title="在线就诊"
      :visible.sync="dialogVisible2"
      :close-on-click-modal="false"
      width="90%"
    >
      <div class="dialog-content">
        <div class="dialog-table">
          <el-row :gutter="20">
            <el-col :span="5">
              <img src="/upload/hygiene/aaa.png" style="width: 100%;height: auto;">
            </el-col>
            <el-col :span="13">
              <EasyPlayer
                id="myplayer"
                :video-url="url"
                :live="false"
                :fluent="true"
                autoplay="autoplay"
                stretch
              />
            </el-col>
            <el-col :span="6">
              <el-row :gutter="10">
                <el-col :span="12"><img src="/upload/hygiene/bbb.png" style="width: 100%;height: auto;"></el-col>
                <el-col :span="12"><img src="/upload/hygiene/bbb.png" style="width: 100%;height: auto;"></el-col>
                <el-col :span="12"><img src="/upload/hygiene/bbb.png" style="width: 100%;height: auto;"></el-col>
                <el-col :span="12"><img src="/upload/hygiene/bbb.png" style="width: 100%;height: auto;"></el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MeAPI from '@/api/logistics/hyg-green'
import moment from 'moment'
import EasyPlayer from '@easydarwin/easyplayer'
export default {
  name: 'Index',
  components: { EasyPlayer },
  data() {
    return {
      tableData: [],
      doctorData: [],
      dialogForm: {
        visible: false,
        title: '',
        type: 'add'
      },
      dataForm: {
        a: '',
        b: '',
        c: '',
        d: '',
        e: '',
        f: '',
        g: '',
        h: '',
        i: '',
        j: '',
        k: '',
        l: '',
        m: '',
        n: '',
        x: '',
        y: '',
        z: '',
        content: []
      },
      checkdetail: false,
      thList: [],
      dialogVisible2: false,
      url: ''
    }
  },
  mounted() {
    this.geDictList()
  },
  methods: {
    geDictList() {
      this.getList()
      for (let i = 1; i <= 7; i++) {
        const a = moment().add(i, 'days').format('MM-DD')
        this.thList.push(a)
      }
      console.log(this.thList)
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList()
    },
    getList() {
      const res = MeAPI.page(this.listQuery)
      this.tableData = res.data.content
      const r = MeAPI.page1(this.listQuery)
      this.doctorData = r.data.content
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.getList()
    },
    handleCreate() {
      this.resetForm()
      this.dialogForm.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.dialogForm.visible = false
          this.tableData.push(this.dataForm)
          this.$notify.success({
            title: '成功',
            message: '成功!'
          })
        }
      })
    },
    handleView(info) {
      this.checkdetail = true
      this.dataForm = Object.assign({}, info)
    },
    resetForm() {
      this.dataForm = {
        a: '',
        b: '',
        c: '',
        d: '',
        e: '',
        f: '',
        g: '',
        h: '',
        i: '',
        j: '',
        k: '',
        l: '',
        m: '',
        n: '',
        x: '',
        y: '',
        z: '',
        content: []
      }
    },
    handleOnline() {
      this.dialogVisible2 = true
    }
  }
}
</script>

<style scoped>
  .hyg-item{
    width: 110px;
    height: 110px;
    background-color: rgba(247,247,247,0.7);
    color: rgba(28,147,153,1);
    margin-right: 12px;
    cursor: pointer;
  }
  .pre-a{
    display: inline-block;
    width: 30%;
    height:50px;
    background-color: #1C9399;
    color: white;
    border-bottom: 1px solid #ffffff;
  }
  .pre-b{
    display: inline-block;
    width: 70%;
    height:50px;
    border-bottom: 1px solid #9E9E9E;
    margin-left: -5px;
  }
</style>
