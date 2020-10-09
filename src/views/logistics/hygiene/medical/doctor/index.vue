<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>在线就诊</span>
      </div>
      <!--操作按钮-->
      <div class="filter-container">
        <el-button
          v-waves
          class="filter-item btn-base"
          type="primary"
          icon="mr10 iconfont iconxinzengh"
          style="float: right;margin-right: 24px;"
          @click="handleCreate"
        >我的预约</el-button>
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

    <!--我的预约弹出框-->
    <el-dialog
      class="abow_dialog"
      title="我的预约"
      :visible.sync="dialogForm.visible"
      :close-on-click-modal="false"
      width="70%"
    >
      <div class="dialog-content">
        <div style="border-left: 3px solid #2D8DEA;padding-left: 12px;font-size: 16px;font-weight: 600;margin-left: 24px;">我的预约</div>
        <el-row :gutter="20" style="margin: 24px;">
          <el-col :span="10">
            <div style="border: 1px solid #9E9E9E;">
              <div>
                <div class="pre-a">姓名</div>
                <div class="pre-b">周广</div>
              </div>
              <div>
                <div class="pre-a">性别</div>
                <div class="pre-b">男</div>
              </div>
              <div>
                <div class="pre-a">身份证号</div>
                <div class="pre-b">410257198901262145</div>
              </div>
              <div>
                <div class="pre-a">手机号</div>
                <div class="pre-b">18524753663</div>
              </div>
              <div>
                <div class="pre-a">看诊时间</div>
                <div class="pre-b">2019-02-01</div>
              </div>
              <div>
                <div class="pre-a" style="border-bottom-width: 0;">科室</div>
                <div class="pre-b" style="border-bottom-width: 0;">普外科</div>
              </div>
            </div>
          </el-col>
          <el-col :span="7">
            <img src="/upload/hygiene/aaa.png" style="width: 100%;height: auto;vertical-align: middle;">
            <div style="text-align: center;font-weight: 600;">病历</div>
          </el-col>
          <el-col :span="7">
            <img src="/upload/hygiene/bbb.png" style="width: 100%;height: auto;vertical-align: middle;">
            <div style="text-align: center;font-weight: 600;">X光片</div>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="un-primary-btn" @click="dialogForm.visible = false">返回</el-button>
        <el-button type="primary" @click="handleOnline">远程看诊</el-button>
      </span>
    </el-dialog>
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
          <el-table
            :data="doctorData"
            :span-method="objectSpanMethod"
            border
          >
            <el-table-column prop="a" label="医生列表" width="180">
              <template slot-scope="scope">
                <div style="position: relative;font-size: 12px;">
                  <img src="/upload/head/20200721/8cb02f5cdffd4bf49398060817c08035.png" style="width: 30px;height: 30px;">
                  <div style="font-weight: 600;line-height: 30px;margin-top: -38px;margin-left: 40px;position: absolute;">{{ scope.row.a }}</div>
                </div>
                <div style="position: relative;font-size: 12px;">{{ '昵称：'+ scope.row.x }}</div>
                <div style="position: relative;font-size: 12px;">{{ '擅长：'+ scope.row.y }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="b" label="时间段" width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.b }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="c" :label="thList[0]">
              <template slot-scope="scope">
                <span :style="{color: scope.row.c === '已满' ? 'red' : 'LimeGreen'}">{{ scope.row.c }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="d" :label="thList[1]">
              <template slot-scope="scope">
                <span :style="{color: scope.row.d === '已满' ? 'red' : 'LimeGreen'}">{{ scope.row.d }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="e" :label="thList[2]">
              <template slot-scope="scope">
                <span :style="{color: scope.row.e === '已满' ? 'red' : 'LimeGreen'}">{{ scope.row.e }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="f" :label="thList[3]">
              <template slot-scope="scope">
                <span :style="{color: scope.row.f === '已满' ? 'red' : 'LimeGreen'}">{{ scope.row.f }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="g" :label="thList[4]">
              <template slot-scope="scope">
                <span :style="{color: scope.row.g === '已满' ? 'red' : 'LimeGreen'}">{{ scope.row.g }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="h" :label="thList[5]">
              <template slot-scope="scope">
                <span :style="{color: scope.row.h === '已满' ? 'red' : 'LimeGreen'}">{{ scope.row.h }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="i" :label="thList[6]">
              <template slot-scope="scope">
                <span :style="{color: scope.row.i === '已满' ? 'red' : 'LimeGreen'}">{{ scope.row.i }}</span>
              </template>
            </el-table-column>
          </el-table>
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
import MeAPI from '@/api/logistics/hyg-doctor'
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
