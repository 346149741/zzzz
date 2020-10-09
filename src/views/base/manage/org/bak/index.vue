<template>
  <div class="app-container">
    <!--搜索条件-->
    <div class="filter-container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="名称：" class="filter-item">
          <el-input v-model="listQuery.params.name" class="filter-item list-query" prefix-icon="el-icon-search" placeholder="请输入机构名称" @keyup.enter.native="handleFilter" />
        </el-form-item>
        <el-form-item label="类型：" class="filter-item">
          <el-select v-model="filterOrgType" clearable placeholder="请选择机构类型" class="filter-item" style="width: 224px;" @change="orgChangea">
            <el-option
              v-for="item in orgTypeList"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item class="filter-item">
          <el-button v-waves class="filter-item btn-base" type="primary" style="margin-left: 10px;" icon="mr10 iconfont iconsousuo" @click="handleFilter">
            {{ $t('table.search') }}
          </el-button>
          <el-button class="filter-item btn-base filter-add-btn" style="margin-left: 10px;" icon="mr10 iconfont iconxinzengh" @click="handleCreate">
            {{ $t('table.add') }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--分页内容-->
    <el-table :key="tableKey" v-loading="listLoading" :header-cell-style="{background:'#ECF5FC',color:'#A2A2B2','font-size':'14px'}" border stripe :data="list" highlight-current-row class="t-bd">
      <el-table-column align="center" label="序号" fixed width="50px">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="机构编号" fixed show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="机构名称" fixed show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" label="机构类型" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.orgTypeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="机构负责人" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.contacts }}</span>
        </template>
      </el-table-column>
      <el-table-column label="负责人手机号" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.contactsTel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="机构地址" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.orgAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.actions')" fixed="right" class-name="small-padding fixed-width" width="240px">
        <template slot-scope="scope">
          <div class="t-col-operate">
            <el-button size="mini" icon="el-icon-tickets" class="operatefont iconchakanb" @click="handleView(scope.row)">
              查看
            </el-button>
            <el-button size="mini" icon="el-icon-edit-outline" class="operatefont iconbianjib" @click="handleUpdate(scope.row)">
              编辑
            </el-button>
            <el-button size="mini" icon="el-icon-delete" class="operatefont iconshanchub" @click="handleDelete(scope.row)">
              删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!--分页工具条-->
    <div class="pagination-container">
      <el-pagination background :current-page="listQuery.pageNo" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>

    <!--新增/修改弹出层-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" left width="750px">
      <div class="dialogBox">
        <el-form ref="dataForm" :rules="rules" :model="form" label-position="right" label-width="100px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item v-if="dialogStatus=='update'" label="机构ID">
                <el-input v-model="form.id" placeholder="请输入机构编号" :disabled="dialogStatus=='update'" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="dialogStatus=='create'" label="机构编号" prop="code">
                <el-input v-model="form.code" placeholder="请输入机构编号" :disabled="dialogStatus=='update'" />
              </el-form-item>
              <el-form-item v-else label="机构编号">
                <el-input v-model="form.code" placeholder="请输入机构编号" :disabled="dialogStatus=='update'" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="机构类型" prop="orgType" label-width="100px">
                <el-select v-model="form.orgType" clearable placeholder="选择机构类型" class="filter-item" @change="orgChange">
                  <el-option
                    v-for="item in orgTypeList"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="机构名称" prop="name">
                <el-input v-model="form.name" placeholder="请输入机构名称" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="显示序号" prop="sort">
                <el-input-number v-model="form.sort" placeholder="请输入序号" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="机构负责人">
                <el-input v-model="form.contacts" placeholder="请输入机构负责人" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="负责人手机号" prop="contactsTel">
                <el-input v-model="form.contactsTel" placeholder="请输入负责人手机号" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="机构地址">
                <el-input v-model="form.orgAddress" placeholder="请输入机构地址" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input v-model="form.remark" placeholder="请输入备注" />
              </el-form-item>
            </el-col>
          </el-row>
          <!--<el-form-item label="活动区域">-->
          <!--<el-select v-model="form.region" placeholder="请选择活动区域">-->
          <!--<el-option label="区域一" value="shanghai"></el-option>-->
          <!--<el-option label="区域二" value="beijing"></el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
        </el-form>
      </div>
      <div v-if="dialogStatus!=='view'" slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{ $t('table.confirm') }}
        </el-button>
        <el-button v-else type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog title="查看" :visible.sync="checkdetail" left width="750px">
      <el-form :model="form" label-position="right" label-width="120px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="机构编号：">
                {{form.code}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="机构类型：">
                <template v-for="(item) in orgTypeList">
                  <template v-if="item.key==form.orgType">{{item.value}}</template>
                </template>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="机构名称：">
                {{form.name}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="显示序号：">
                {{form.sort}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="机构负责人：">
                {{form.contacts}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="负责人手机号：" >
                {{form.contactsTel}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="机构地址：">
                {{form.orgAddress}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注：">
                {{form.remark}}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
    </el-dialog>
    <!--    <Details :form="form" :dialog-form-visible="dialogFormVisibleView" @close="dialogFormVisibleView=false" />-->
  </div>
</template>

<script>
import { getOrgListByPage, checkOrgId, createOrgItem, updateOrgItem, deleteOrgItem, genCode } from '@/api/base/org'
import { dictOrg } from '@/api/base/dictDetail'
import { isTel } from '@/utils/baseformValidate.js'
// import Details from './details'

export default {
  name: 'OrgPage',
  // components: { Details },
  data() {
    return {
      dialogFormVisibleView: false,
      orgTypeList: [],
      operatingRoleId: null,
      filterText: '',
      filterOrgType: '',
      defaultCheckedKeys: null,
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      checkdetail:false,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {}
      },
      form: {
        id: '',
        code: '',
        contacts: '',
        contactsTel: '',
        name: '',
        orgAddress: '',
        orgType: '',
        remark: '',
        orgTypeName: '',
        sort: 0
      },
      dialogFormVisible: false,
      dialogPermissionVisible: false,
      options: {
        uid: null,
        userRole: null,
        allRole: null
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      dialogStatus: '',
      textMap: {
        view: '查看',
        update: '编辑',
        create: '新增'
      },
      rules: {
        code: [
          { required: true, message: '请填写机构编号', trigger: 'blur' },
          { validator: this.valiOrgCode, trigger: 'blur' }
        ],
        name: [{ required: true, message: '请填写机构名称', trigger: 'blur' }],
        orgType: [{ required: true, message: '请填写机构类型', trigger: 'change' }],
        contactsTel: [{ required: false, validator: isTel, trigger: 'blur' }]
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.getList()
    dictOrg().then(res => {
      this.orgTypeList = res.data
    })
  },
  methods: {
    valiOrgCode(rule, value, callback) {
      checkOrgId(value).then(response => {
        if (response.data) {
          callback(new Error('机构编号重复'))
        } else {
          callback()
        }
      })
    },
    orgChange(val) {
      const item = this.orgTypeList.find(item => {
        return item.key === val
      })
      this.form.orgTypeName = item.value
    },
    orgChangea() {
      this.listQuery.pageNo = 1
      this.listQuery.params.orgType = this.filterOrgType
      this.getList()
    },
    getList() {
      this.listLoading = true
      getOrgListByPage(this.listQuery).then(response => {
        this.list = response.data.content
        this.total = response.data.totalElements
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.getList()
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      this.listQuery.params.orgType = this.filterOrgType
      this.getList()
    },
    resetForm() {
      this.form = {
        id: '',
        code: '',
        contacts: '',
        contactsTel: '',
        name: '',
        orgAddress: '',
        orgType: '',
        remark: '',
        orgTypeName: ''
      }
    },
    async handleCreate() {
      this.resetForm()
      this.dialogStatus = 'create'
      const res = await genCode()
      this.form.code = res.data
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createOrgItem(this.form).then(() => {
            this.dialogFormVisible = false
            this.getList()
            this.$notify.success({
              title: '成功',
              message: '机构添加成功!'
            })
          }).catch(res => {
            this.$notify.error({
              title: '失败',
              message: res.message
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.form = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          updateOrgItem(this.form).then(() => {
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$confirm('确认删除 “' + row.name + '” 的记录？').then(() => {
        deleteOrgItem(row.id).then(() => {
          this.getList()
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
        }).catch(res => {
          this.$notify.error({
            title: '失败',
            message: res.message
          })
        })
      })
    },
    handleView(row) {
      this.form = Object.assign({}, row) // copy obj
      this.checkdetail = true
      // this.dialogStatus = 'view'
      // this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
    }
  }
}
</script>
<style lang="scss" scoped>
  .list-query {
    width: 340px;
    margin-right: 22px;
  }

  .el-col {
    margin-right: 0;
    &:last-child {
      margin-right: 0;
    }
  }

  .dialogBox {
    border: 1px solid #eee;
    box-sizing: border-box;
    padding: 20px 20px 0 20px;
    background-color: #fff;
  }

</style>
