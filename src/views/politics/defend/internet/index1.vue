<template>
  <!--互联网备案-->
  <div>
    <!--操作按钮-->
    <div class="filter-container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="IP地址：" class="filter-item">
          <el-input v-model="dataForm.name" placeholder="请输入IP地址" style="width: 200px" />
        </el-form-item>
        <el-form-item label="用户名：" class="filter-item">
          <el-input v-model="dataForm.name" placeholder="请输入用户名" style="width: 200px" />
        </el-form-item>
        <el-form-item label="入网方式：" class="filter-item">
          <el-select v-model="dataForm.liveArea" placeholder="请选择入网方式" style="width: 200px;margin-left: 16px">
            <el-option
              v-for="item in [{label:'VPN',value:'VPN'},{label:'LAN',value:'LAN'},{label:'Internet',value:'Internet'}]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="申请人名称：" class="filter-item">
          <el-input v-model="dataForm.name" placeholder="请输入申请人名称" style="width: 200px" />
        </el-form-item>

        <el-form-item class="filter-item" style="float: right;margin-right: 3%">
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
      <el-table-column label="IP地址" fixed show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.a }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" fixed show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.b }}</span>
        </template>
      </el-table-column>
      <el-table-column label="MAC地址" fixed show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.c }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入网方式" fixed show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.d }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请时间" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.e }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请人" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.f }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系方式" show-overflow-tooltip>
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
            <!--<i class="el-icon-edit-outline warning table-i" title="编辑" @click="handleUpdate(scope.row)" />-->
            <!--<i class="el-icon-delete danger table-i" title="注销" @click="handleDelete(scope.row)" />-->
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
          <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="140px">
            <el-row :gutter="20">
              <el-divider><span style="font-size: 18px;font-weight: 700;">备案开户信息</span></el-divider>
              <el-col :md="24" :lg="12">
                <el-form-item label="IP地址：" prop="a">
                  <el-input v-model="dataForm.a" class="form-item1" placeholder="请输入IP地址" />
                </el-form-item>
              </el-col>

              <el-col :md="24" :lg="12">
                <el-form-item label="用户名：" prop="b">
                  <el-input v-model="dataForm.b" class="form-item1" placeholder="请输入用户名" />
                </el-form-item>
              </el-col>

              <el-col :md="24" :lg="12">
                <el-form-item label="MAC地址：" prop="c">
                  <el-input v-model="dataForm.c" class="form-item1" placeholder="请输入MAC地址" />
                </el-form-item>
              </el-col>

              <el-col :md="24" :lg="12">
                <el-form-item label="入网方式：" prop="d">
                  <el-select v-model="dataForm.d" class="form-item1" placeholder="请选择入网方式">
                    <el-option
                      v-for="item in [{label:'VPN',value:'VPN'},{label:'LAN',value:'LAN'},{label:'Internet',value:'Internet'}]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :md="24" :lg="24">
                <el-divider><span style="font-size: 18px;font-weight: 700;">备案人员信息</span></el-divider>
              </el-col>

              <el-col :md="24" :lg="12">
                <el-form-item label="申请人：" prop="e">
                  <el-input v-model="dataForm.e" class="form-item1" placeholder="请输入申请人" />
                </el-form-item>
              </el-col>

              <el-col :md="24" :lg="12">
                <el-form-item label="联系方式：" prop="f">
                  <el-input v-model="dataForm.f" class="form-item1" placeholder="请输入联系方式" />
                </el-form-item>
              </el-col>

              <el-col :md="24" :lg="12">
                <el-form-item label="申请时间：" prop="g">
                  <el-input v-model="dataForm.g" class="form-item1" placeholder="请输入申请时间" />
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
          <el-form :model="dataForm" label-width="140px">
            <el-row :gutter="20">
              <el-divider><span style="font-size: 18px;font-weight: 700;">备案主体信息</span></el-divider>
              <el-col :md="24" :lg="12">
                <el-form-item label="IP地址：">{{ dataForm.a }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="用户名：">{{ dataForm.b }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="MAC地址：">{{ dataForm.c }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="入网方式：">{{ dataForm.d }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="24">
                <el-divider><span style="font-size: 18px;font-weight: 700;">备案网站信息</span></el-divider>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="申请时间：">{{ dataForm.e }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="申请人：">{{ dataForm.f }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="联系方式：">{{ dataForm.g }}</el-form-item>
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
          a: '114.114.114.114',
          b: 'useradmin01',
          c: '0000 0000 0001 - FFFF FFFF FFFD',
          d: 'VPN',
          e: '2020-02-02 20:20:20',
          f: '张三',
          g: '13800138000'

        }, {
          a: '114.114.114.114',
          b: 'useradmin01',
          c: '0000 0000 0001 - FFFF FFFF FFFD',
          d: 'LAN',
          e: '2020-02-02 20:20:20',
          f: '张三',
          g: '13800138000'

        }, {
          a: '114.114.114.114',
          b: 'useradmin01',
          c: '0000 0000 0001 - FFFF FFFF FFFD',
          d: 'Internet',
          e: '2020-02-02 20:20:20',
          f: '张三',
          g: '13800138000'

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
