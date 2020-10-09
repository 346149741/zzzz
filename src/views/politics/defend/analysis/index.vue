<template>
  <!--案例分析-->
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>案例分析</span>
      </div>

      <!--操作按钮-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item class="filter-item">
            <el-input v-model="dataForm.name" placeholder="请输入案例标题/案例概要/关键字" style="width: 250px" />
            <el-button type="primary">搜索</el-button>
          </el-form-item>
          <el-form-item class="filter-item" style="float: right;margin-right: 3%">
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconsousuo"
              @click="handleAdd"
            >{{ $t('table.add') }}</el-button>
            <!--<el-button-->
            <!--v-waves-->
            <!--class="filter-item btn-base"-->
            <!--type="primary"-->
            <!--icon="mr10 iconfont iconsousuo"-->
            <!--@click="handleFilter"-->
            <!--&gt;{{ $t('table.search') }}</el-button>-->
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconsousuo"
              @click="handleFilter"
            >{{ $t('table.export') }}</el-button>
            <!--<el-button-->
            <!--v-waves-->
            <!--class="filter-item btn-base"-->
            <!--type="primary"-->
            <!--icon="mr10 iconfont iconxinzengh"-->
            <!--@click="handleCreate"-->
            <!--&gt;重置</el-button>-->
          </el-form-item>
        </el-form>
      </div>
      <!--固定车辆分页内容-->
      <el-table
        v-loading="listLoading"
        :data="tableData"
        :header-cell-style="{background:'#FAFAFA',color:'#A2A2B2','font-size':'14px'}"
        stripe
        class="t-bd"
        border
      >
        <el-table-column label="ID" fixed width="50px">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="案例编号" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.a }}</span>
          </template>
        </el-table-column>
        <el-table-column label="案例标题" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.b }}</span>
          </template>
        </el-table-column>
        <el-table-column label="案例概要" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.c }}</span>
          </template>
        </el-table-column>
        <el-table-column label="处理结论" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.d }}</span>
          </template>
        </el-table-column>
        <el-table-column label="相关资料" show-overflow-tooltip>
          <template>
            <span><i class="el-icon-picture" style="font-size: 30px;color: dodgerblue;" /></span>
            <span><i class="el-icon-picture" style="font-size: 30px;color: dodgerblue;" /></span>
            <span><i class="el-icon-picture" style="font-size: 30px;color: dodgerblue;" /></span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="$t('table.actions')"
          fixed="right"
          class-name="small-padding fixed-width"
          width="160px"
        >
          <template slot-scope="scope">
            <div class="t-col-operate">
              <i class="el-icon-tickets primary table-i" title="查看" @click="handleView(scope.row)" />
              <i class="el-icon-edit-outline warning table-i" title="编辑" @click="handleUpdate(scope.row)" />
              <i class="el-icon-delete danger table-i" title="注销" @click="handleDelete(scope.row)" />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!--分页工具条-->
      <div class="pagination-container">
        <el-pagination
          background
          :current-page="listQuery.pageNo"
          :page-sizes="[10,20,30, 50]"
          :page-size="listQuery.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!--添加/编辑弹出框-->
    <el-dialog
      class="abow_dialog"
      :title="dialogForm.title"
      :visible.sync="dialogForm.visible"
      :close-on-click-modal="false"
      width="70%"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="案例编号：" prop="a">
                  <el-input v-model="dataForm.a" class="form-item1" placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="案例标题：" prop="b">
                  <el-input v-model="dataForm.b" class="form-item1" placeholder="请输入" />
                </el-form-item>
              </el-col>

              <el-col :md="24" :lg="12">
                <el-form-item label="案例概要：" prop="c">
                  <el-input
                    v-model="dataForm.c"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="处理结论：" prop="d">
                  <el-input
                    v-model="dataForm.d"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="24">
                <el-form-item label="处理结论：" prop="e">
                  <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple
                  >
                    <i class="el-icon-upload" />
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="un-primary-btn" @click="dialogForm.visible = false">取 消</el-button>
        <el-button v-if="dialogForm.type === 'add'" type="primary" @click="createData">{{ $t('table.confirm') }}</el-button>
        <el-button v-if="dialogForm.type === 'edit'" type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>

    <!--详情查看-->
    <el-dialog
      class="abow_dialog detail-form"
      title="查看"
      :visible.sync="checkdetail"
      :close-on-click-modal="false"
      width="70%"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form :model="dataForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="案例编号：">{{ dataForm.a }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="案例标题：">{{ dataForm.b }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="案例概要：">{{ dataForm.c }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="处理结论：">{{ dataForm.d }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="相关资料：">
                  <span><i class="el-icon-picture" style="font-size: 30px;color: dodgerblue;" /></span>
                  <span><i class="el-icon-picture" style="font-size: 30px;color: dodgerblue;" /></span>
                  <span><i class="el-icon-picture" style="font-size: 30px;color: dodgerblue;" /></span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MeAPI from '@/api/demo/aaa'
export default {
  name: 'Index',
  data() {
    return {
      fileList: [{ name: '某某某通知综合政审材料.pdf', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],

      roomList: [],
      performanceList: [],
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
        z: ''
      },
      rules: {
        a: [{ required: true, message: '请输入', trigger: 'blur' }],
        b: [{ required: true, message: '请输入', trigger: 'blur' }],
        c: [{ required: true, message: '请选择', trigger: 'blur' }],
        d: [{ required: true, message: '请选择', trigger: 'blur' }],
        e: [{ required: true, message: '请输入', trigger: 'blur' }],
        f: [{ required: true, message: '请输入', trigger: 'blur' }],

        g: [{ required: true, message: '请输入', trigger: 'blur' }],
        h: [{ required: true, message: '请选择', trigger: 'blur' }],
        i: [{ required: true, message: '请选择', trigger: 'blur' }],
        j: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      checkdetail: false
    }
  },
  mounted() {
    this.geDictList()
  },
  methods: {
    // 新增
    handleAdd() {
      this.resetForm()
      this.dialogForm.visible = true
      this.dialogForm.title = '新增'
      this.dialogForm.type = 'add'
      this.dataForm = {}
      this.tableDataEle = []// 点击新增时清空tableDataEle家庭成员信息部分数据
      this.dataTestForm = []
      // MeAPI.detail(info.id).then(res => {
      //   this.dataForm = Object.assign({}, info)
      //   this.$nextTick(() => {
      //     this.$refs['dataForm'].clearValidate()
      //   })
      // })
    },
    geDictList() {
      const res = MeAPI.dict()
      this.roomList = res.data['01']
      this.performanceList = res.data['02']
      this.departList = res.data['03']
      this.getList()
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList()
    },
    getList() {
      // const res = MeAPI.page(this.listQuery)
      this.listLoading = false
      // this.total = res.data.totalElements
      // this.tableData = res.data.content
      this.tableData = [
        {
          a: 'AL-202002022020200001',
          b: '李先生提出重要树木悬挂名牌',
          c: '保护绿化成功，加大门前三包责任制',
          d: '对重要树木进行普查编号归档，制作统一名牌',
          e: '资料'

        }, {
          a: 'AL-202002022020200002',
          b: '李先生提出重要树木悬挂名牌',
          c: '保护绿化成功，加大门前三包责任制',
          d: '对重要树木进行普查编号归档，制作统一名牌',
          e: '资料'
        }, {
          a: 'AL-202002022020200003',
          b: '李先生提出重要树木悬挂名牌',
          c: '保护绿化成功，加大门前三包责任制',
          d: '对重要树木进行普查编号归档，制作统一名牌',
          e: '资料'
        }
      ]
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
    // 编辑
    handleUpdate(info) {
      this.tableDataEle = [{
        a: '儿子',
        b: '张小一',
        c: '男',
        d: '20',
        e: '121212200006083322',
        f: '团员',
        g: '常德职业技术学院，大二在读'
      }, {
        a: '女儿',
        b: '张小美',
        c: '女',
        d: '18',
        e: '121212200006083322',
        f: '团员',
        g: '北京电影学院，大一在读'
      }]
      this.dataTestForm = {
        area: '第一生活区',
        levelNum: '1号楼',
        liveUnit: '2单元',
        floorNum: '2楼',
        bornDate: '1989-08-22',
        workDeptid: '技术一部'
      }
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
      this.tableDataEle = [{
        a: '儿子',
        b: '张小一',
        c: '男',
        d: '20',
        e: '121212200006083322',
        f: '团员',
        g: '常德职业技术学院，大二在读'
      }, {
        a: '女儿',
        b: '张小美',
        c: '女',
        d: '18',
        e: '121212200006083322',
        f: '团员',
        g: '北京电影学院，大一在读'
      }]
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
  .cards{
    height: 140px;
    width: 20%;
  }
</style>
