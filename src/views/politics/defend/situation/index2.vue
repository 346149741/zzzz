<template>
  <!--民情社情动态-->
  <div>
    <!--操作按钮-->
    <div class="filter-container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="事件类型：" class="filter-item">
          <el-select v-model="dataForm.type" placeholder="请选择" style="width: 200px;">
            <el-option
              v-for="item in [{label:'民生',value:'民生'},{label:'市政',value:'市政'},{label:'教育',value:'教育'},{label:'城建',value:'城建'},{label:'就业',value:'就业'},{label:'环保',value:'环保'}]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="发生地：" class="filter-item">
          <el-select v-model="dataForm.liveArea" placeholder="请选择" style="width: 200px;">
            <el-option
              v-for="item in [{label:'第一生活区',value:'第一生活区'},{label:'第二生活区',value:'第二生活区'},{label:'第三生活区',value:'第三生活区'}]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="办结情况：" class="filter-item">
          <el-select v-model="dataForm.endStatus" placeholder="请选择" style="width: 200px;margin-left: 15px;">
            <el-option
              v-for="item in [{label:'核实中',value:'核实中'},{label:'办结中',value:'办结中'},{label:'已办结',value:'已办结'},{label:'已挂起',value:'已挂起'}]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="内容：" class="filter-item">
          <el-input v-model="dataForm.text" placeholder="请输入" style="width: 200px" />
        </el-form-item>
        <el-form-item label="办结时间：" class="filter-item">
          <el-date-picker v-model="dataForm.endDate" placeholder="请选择" style="width: 200px;" />
        </el-form-item>

        <el-form-item label="标题：" class="filter-item">
          <el-input v-model="dataForm.title" placeholder="请输入" style="width: 200px;margin-left: 15px;" />
        </el-form-item>
        <el-form-item label="动态负责人：" class="filter-item">
          <el-input v-model="dataForm.person" placeholder="请输入" style="width: 200px" />
        </el-form-item>

        <el-form-item class="filter-item" style="float: right;margin-right: 6%">
          <el-button
            v-waves
            class="filter-item btn-base"
            type="primary"
            icon="mr10 iconfont iconsousuo"
            @click="handleAdd"
          >{{ $t('table.add') }}</el-button>
          <el-button
            v-waves
            class="filter-item btn-base"
            type="primary"
            icon="mr10 iconfont iconsousuo"
            @click="handleFilter"
          >{{ $t('table.search') }}</el-button>
          <el-button
            v-waves
            class="filter-item btn-base"
            type="primary"
            icon="mr10 iconfont iconsousuo"
            @click="handleFilter"
          >{{ $t('table.export') }}</el-button>
          <el-button
            v-waves
            class="filter-item btn-base"
            type="primary"
            icon="mr10 iconfont iconxinzengh"
            @click="handleCreate"
          >重置</el-button>
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
      <el-table-column label="标题" fixed show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.a }}</span>
        </template>
      </el-table-column>
      <el-table-column label="内容" fixed show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.b }}</span>
        </template>
      </el-table-column>
      <el-table-column label="事件类型" fixed show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.c }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发生地" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.d }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系信息" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.e }}</span>
        </template>
      </el-table-column>
      <el-table-column label="办结情况" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.f }}</span>
        </template>
      </el-table-column>
      <el-table-column label="动态负责人" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.g }}</span>
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
                <el-form-item label="标题：" prop="a">
                  <el-input v-model="dataForm.a" class="form-item1" placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="事件类型：" prop="b">
                  <el-select v-model="dataForm.c" class="form-item1" placeholder="请选择">
                    <el-option
                      v-for="item in [{label:'民生',value:'民生'},{label:'教育',value:'教育'},{label:'城建',value:'城建'},{label:'环保',value:'环保'}]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="发生地：" prop="d">
                  <el-select v-model="dataForm.d" class="form-item1" placeholder="请选择">
                    <el-option
                      v-for="item in [{label:'第一生活区',value:'第一生活区'},{label:'第二生活区',value:'第二生活区'},{label:'第三生活区',value:'第三生活区'},{label:'第四生活区',value:'第四生活区'}]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="内容：" prop="b">
                  <el-input v-model="dataForm.b" class="form-item1" placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="联系信息：" prop="e">
                  <el-input v-model="dataForm.e" class="form-item1" placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="办结情况：" prop="f">
                  <el-select v-model="dataForm.f" class="form-item1" placeholder="请选择">
                    <el-option
                      v-for="item in [{label:'核实中',value:'核实中'},{label:'办结中',value:'办结中'},{label:'已办结',value:'已办结'},{label:'已挂起',value:'已挂起'}]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :md="24" :lg="12">
                <el-form-item label="动态联系人：" prop="g">
                  <el-input v-model="dataForm.g" class="form-item1" placeholder="请输入" />
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
                <el-form-item label="事件类型：">{{ dataForm.c }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="发生地：">{{ dataForm.d }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="标题：">{{ dataForm.a }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="内容：">{{ dataForm.b }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="联系信息：">{{ dataForm.e }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="办结情况：">{{ dataForm.f }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="动态联系人：">{{ dataForm.g }}</el-form-item>
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
      dataTestForm: {
        area: '第一生活区',
        levelNum: '1号楼',
        liveUnit: '2单元',
        floorNum: '2楼'
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
        f: [{ required: true, message: '请选择', trigger: 'blur' }],

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
          'id': 'a',
          'a': '某采油厂原油泄漏事件引发驻地群众饮水安全恐慌',
          'b': '某区某路某幼儿园，疫情期间，从2...【查看全文】',
          'c': '民生',
          'd': '第五生活区',
          'e': '13800138000',
          'f': '待核实',
          'g': '张三'
        },
        {
          'id': 'b',
          'a': '某区主干道路靠近人民医院段进行路基整修',
          'b': '某区某路某幼儿园，疫情期间，从2...【查看全文】',
          'c': '市政',
          'd': '第五生活区',
          'e': '13800138000',
          'f': '处理中',
          'g': '李四'
        },
        {
          'id': 'c',
          'a': 'xx教育近一半老师无教资证上岗，挂名师收年费',
          'b': '某区某路某幼儿园，疫情期间，从2...【查看全文】',
          'c': '教育',
          'd': '第五生活区',
          'e': '13800138000',
          'f': '已办结',
          'g': '王久'
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
    // 编辑
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
