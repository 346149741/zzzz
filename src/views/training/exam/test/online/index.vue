<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>在线考试</span>
      </div>
      <!--选择考试-->
      <el-row v-if="!checkdetail" :gutter="20">
        <el-col v-for="item in tableData" :span="8">
          <el-card class="box-card" style="text-align: center;font-weight: 600;font-size: 18px;line-height: 40px;">
            <div>{{ item.a }}</div>
            <div>考试时间：{{ item.e }}</div>
            <div>考试时长：{{ item.g }}分钟</div>
            <div>负责人：{{ item.d }}</div>
            <div><el-button type="primary" @click="handleView(item)">开始考试</el-button></div>
          </el-card>
        </el-col>
      </el-row>
      <div v-if="checkdetail">
        <div v-for="(item, index) in dataForm" :key="index">
          <div style="margin-top: 16px;font-size: 16px;font-weight: 600;">{{ (++index)+'. '+item.title }}</div>
          <div style="border: 1px solid #DCDFE6;padding: 12px 24px;margin-top: 16px;margin-right: 300px;">
            <div v-for="(a,b) in item.content" :key="b">
              <div style="font-size: 14px;font-weight: 600;line-height: 26px;margin-top: 18px;">{{b+1+'. '+a.c}}</div>
              <div v-if="a.b !== '01'" style="font-size: 12px;line-height: 26px;">
                <el-radio-group v-model="a.e">
                  <el-radio v-for="(x,y) in a.d" :key="y" :label="radioArr[y]" style="display: block;margin-top: 16px;">{{radioArr[y]+'. '+x.content}}</el-radio>
                </el-radio-group>
              </div>
              <div v-if="a.b === '01'" style="font-size: 12px;line-height: 26px;">
                <el-checkbox-group v-model="a.f">
                  <el-checkbox v-for="(x,y) in a.d" :key="y" :label="radioArr[y]" style="display: block;margin-top: 16px;">{{radioArr[y]+'. '+x.content}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="checkdetail" style="position: absolute;width: 260px;border: 1px solid #DCDFE6;top: 100px;right: 40px;">
        <div style="font-size: 14px;line-height: 30px;color: red;float: right;margin-right: 18px;">{{ h + ':' + m + ':' + s }}</div>
        <div style="display: flex;margin-top: 60px;flex-wrap: wrap;justify-content: space-around;">
          <div v-for="a in dataNum" :key="a" class="aa-bb">{{a++}}</div>
        </div>
        <div style="text-align: center;padding-top: 16px;">
          <el-button type="primary" @click="submitPaper">交卷</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import MeAPI from '@/api/training/exam-online'
  export default {
    name: 'Index',
    data() {
      return {
        tableData: [],
        dataForm: [],
        checkdetail: false,
        radioArr: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
        endTime: 0,
        h: '',
        m: '',
        s: '',
        dataNum: 30
      }
    },
    mounted() {
      this.geDictList()
    },
    methods: {
      geDictList() {
        const res = MeAPI.testPlan()
        this.tableData = res.data
      },
      handleFilter() {
        this.listQuery.pageNo = 1
        this.getList()
      },
      getList() {
        const res = MeAPI.page(this.listQuery)
        this.listLoading = false
        this.total = res.data.totalElements
        this.tableData = res.data.content
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
        this.dialogForm.title = '新增装备'
        this.dialogForm.type = 'add'
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
              message: '保存成功!'
            })
          }
        })
      },
      handleUpdate(info) {
        this.resetForm()
        this.dialogForm.visible = true
        this.dialogForm.title = '编辑装备信息'
        this.dialogForm.type = 'edit'
        this.dataForm = Object.assign({}, info)
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate(valid => {
          if (valid) {
            this.dialogForm.visible = false
            this.tableData.forEach((item, index) => {
              if (item.id === this.dataForm.id) {
                this.$set(this.tableData, index, this.dataForm)
              }
            })
            this.$notify.success({
              title: '成功',
              message: '编辑成功!'
            })
          }
        })
      },
      handleView(info) {
        this.$confirm('确认开始考试？').then(() => {
          this.checkdetail = true
          this.dataForm = Object.assign({}, info.content)
          //设置截止时间
          this.endTime = new Date().getTime() + info.g * 60 * 1000
          console.log(this.dataForm)
          this.countTime()
        })
      },
      handleDelete(info) {
        this.$confirm('确认删除' + info.a + '？').then(() => {
          this.tableData = this.tableData.filter(item => {
            return item.id !== info.id
          })
          console.log(this.tableData)
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
        })
      },
      resetForm() {
        this.dataForm = []
      },
      beforeExcelUpload(file) {
        const fileName = file.name.toLowerCase()
        const isMODO =
          fileName.indexOf('.xlsx') >= 0 ||
          fileName.indexOf('.xls') >= 0
        const isLt2M = file.size / 1024 / 1024 < 4

        if (!isMODO) {
          this.$message.error('上传图片只能是xlsx/xls格式!')
          return
        }
        if (!isLt2M) {
          this.$message.error('上传模型大小不能超过4MB!')
          return
        }
        const formatFile = new FormData()
        formatFile.append('file', file)
        MeAPI.upload(formatFile).then(res => {
        })
        return false
      },
      countTime() {
        //获取当前时间
        const now = new Date().getTime()
        //时间差
        const leftTime = this.endTime - now
        //定义变量 d,h,m,s保存倒计时的时间
        if (leftTime >= 0) {
          this.h = Math.floor((leftTime / 1000 / 60 / 60) % 24)
          this.m = Math.floor((leftTime / 1000 / 60) % 60)
          this.s = Math.floor((leftTime / 1000) % 60)
        }
        //递归每秒调用countTime方法，显示动态时间效果
        setTimeout(this.countTime, 1000)
      },
      submitPaper() {
        this.$confirm('确认交卷？').then(() => {
          this.checkdetail = false
          this.$notify.success({
            title: '成功',
            message: '提交成功'
          })
        })
      }
    }
  }
</script>

<style scoped>
  .aa-bb{
    border: 1px dashed #DCDFE6;
    font-size: 12px;
    line-height: 40px;
    height: 40px;
    width: 40px;
    text-align: center;
    cursor: pointer;
    margin-top: 8px;
  }
  .aa-bb:hover{
    border-color: #2D8DEA;
    color: #2D8DEA;
  }
</style>
