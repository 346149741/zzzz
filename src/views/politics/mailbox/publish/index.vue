<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>意见发表</span>
      </div>
      <div>
        <div style="float: left;width: 400px;text-align: center;font-size: 14px;line-height: 30px;">
          <div style="font-weight: 600;">温馨提示</div>
          欢迎你来到首长信箱，你可以通过写信，提交你对军队的咨询，投诉和建议。写信前请仔细阅读写信须知。<br>
          <div style="font-weight: 600;">写信须知</div>
          <div style="text-align: left;">
            1.您信件的内容应遵守国家法律法规、社会公德，严禁利用首长信箱进行造谣、诽谤、传播反动言论等行为，违者将依法追究责任。<br>
            2.请勿涉及国家秘密、军队秘密、个人隐私的事项。<br>
            3.关于反应内容要真实...
          </div>

        </div>
        <el-card style="width: 800px;float: left;margin-left: 48px;">
          <div style="width: 100%;font-size: 18px;font-weight: 600;text-align: center;line-height: 40px;margin-bottom: 48px;">我要写信</div>
          <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="写信时间：" prop="a">
                  <el-date-picker
                    v-model="dataForm.a"
                    class="form-item1"
                    type="date"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="收信人：" prop="b">
                  <el-select v-model="dataForm.b" class="form-item1" placeholder="请选择收信人">
                    <el-option v-for="item in receiveList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="写信人：" prop="c">
                  <el-input v-model="dataForm.c" class="form-item1" readonly/>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="写信人部门：" prop="d">
                  <el-select v-model="dataForm.d" class="form-item1" placeholder="请选择存放库房">
                    <el-option v-for="item in departList" :key="item.key" :label="item.value" :value="item.key" readonly/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="信件类型：" prop="e">
                  <el-select v-model="dataForm.e" class="form-item1" placeholder="请选择收信人">
                    <el-option v-for="item in typeList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="信件主题：" prop="f">
                  <el-input v-model="dataForm.f" class="form-item1" placeholder="请输入信件主题" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="信件内容：" prop="g">
                  <el-input
                    v-model="dataForm.g"
                    class="form-item1"
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 6}"
                    placeholder="请输入内容"
                    maxlength="300"
                    show-word-limit
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div style="width: 100%;text-align: center;">
            <el-button>取消</el-button>
            <el-button type="primary">提交</el-button>
          </div>
        </el-card>

      </div>
    </el-card>
    <!--详情查看-->
  </div>
</template>

<script>
import MeAPI from '@/api/politics/mailBox'
export default {
  name: 'Index',
  data() {
    return {
      receiveList: [],
      typeList: [],
      departList: [],
      tableData: [],
      total: null,
      listLoading: true,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          carNo: '',
          unitId: '',
          carUseId: ''
        }
      },
      dialogForm: {
        visible: false,
        title: '',
        type: 'add'
      },
      dataForm: {
        a: '',
        b: '',
        c: '王池勇',
        d: '02',
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
        z: ''
      },
      rules: {
        a: [{ required: true, message: '请输入收信时间', trigger: 'blur' }],
        b: [{ required: true, message: '请输入数量', trigger: 'blur' }],
        c: [{ required: true, message: '请选择库房', trigger: 'change' }],
        d: [{ required: true, message: '请选择入库时间', trigger: 'change' }],
        e: [{ required: true, message: '请输入使用年限', trigger: 'blur' }]
      },
      checkdetail: false
    }
  },
  mounted() {
    this.geDictList()
  },
  methods: {
    geDictList() {
      const res = MeAPI.dict()
      this.receiveList = res.data['01']
      this.typeList = res.data['02']
      this.departList = res.data['03']
      this.getList()
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
      this.dialogForm.title = '新增'
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
      this.dialogForm.title = '编辑'
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
      this.checkdetail = true
      this.dataForm = Object.assign({}, info)
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
      this.dataForm = {
        a: '',
        b: '',
        c: '王池勇',
        d: '02',
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
        z: ''
      }
    },
    getFactory(val) {
      const result = this.roomList.find(item => {
        return item.key === val
      })
      return result ? result.value : ''
    },
    getPerform(val) {
      const result = this.performanceList.find(item => {
        return item.key === val
      })
      return result ? result.value : ''
    },
    getDepart(val) {
      const result = this.departList.find(item => {
        return item.key === val
      })
      return result ? result.value : ''
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
    }
  }
}
</script>

<style scoped>

</style>
