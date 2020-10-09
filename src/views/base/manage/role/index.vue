<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="15">
        <el-card class="box-card app-body">
          <div slot="header" class="clearfix">
            <span>角色列表</span>
          </div>
          <div class="filter-container">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="系统：" class="filter-item">
                <el-select
                  v-model="choseSys.value"
                  placeholder="请选择"
                  class="mr10"
                  style="width:220px;display:inline-block"
                  @change="handleChange"
                >
                  <el-option
                    v-for="(item,index) in sysItems"
                    :key="index"
                    :value="item.value"
                    :label="item.label"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="机构类型：" class="filter-item">
                <el-select
                  v-model="listQuery.params.orgType"
                  placeholder="请选择机构类型"
                  class="mr10"
                  style="width:220px;display:inline-block"
                  clearable
                  @change="handleOrgChange"
                >
                  <el-option
                    v-for="(item,index) in OrgTypes"
                    :key="index"
                    :value="item.key"
                    :label="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item class="filter-item">
                <el-button
                  class="filter-item btn-base"
                  type="primary"
                  icon="mr10 iconfont iconxinzengh"
                  style="margin-bottom:0"
                  @click="handleCreate"
                >新增
                </el-button>
              </el-form-item>
            </el-form>
          </div>

          <!--分页内容-->
          <el-table
            :key="tableKey"
            v-loading="listLoading"
            stripe
            :data="list"
            class="t-bd"
            fit
            @row-click="handleRoleChange"
          >
            <el-table-column align="center" label="序号" fixed width="50px">
              <template slot-scope="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="所属系统" fixed show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.clientName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="角色名称" fixed show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="描述" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.remark }}</span>
              </template>
            </el-table-column>
            <el-table-column label="启用">
              <template slot-scope="scope">
                <span>{{ scope.row.enable?'启用':'禁用' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="系统内置">
              <template slot-scope="scope">
                <span>{{ scope.row.sys?'是':'否' }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              :label="$t('table.actions')"
              class-name="small-padding fixed-width"
              width="240px"
              fixed= 'right'
            >
              <template slot-scope="scope">
                <div class="t-col-operate">
                  <el-switch
                    v-model="scope.row.enable"
                    class="switchStyle"
                    style="margin-right: 10px"
                    active-text="启用"
                    inactive-text="禁用"
                    @change="handleEnable(scope.row)"
                  />
                  <!-- <el-button size="mini" icon="el-icon-edit-outline" class="operatefont iconbianjib" @click="handleUpdate(scope.row)">
                    编辑
                  </el-button> -->
                  <i class="el-icon-edit-outline warning table-i" title="编辑" @click="handleUpdate(scope.row)" />
                  <!-- <el-button size="mini" icon="el-icon-delete" class="operatefont iconshanchub" @click="handleDelete(scope.row)">
                    删除
                  </el-button> -->
                  <i class="el-icon-delete danger table-i" title="删除" @click="handleDelete(scope.row)" />
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
      </el-col>

      <el-col :span="9">
        <el-card class="box-card box-tree">
          <div slot="header" class="clearfix">
            <span>权限</span>
          </div>

          <el-tree
            ref="tree"
            show-checkbox
            node-key="id"
            :data="allTreeData"
            :props="defaultProps"
            default-expand-all
            :expand-on-click-node="false"
          />
        </el-card>
      </el-col>
    </el-row>

    <!--新增/修改弹出层-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" left>
      <div class="dialogBox">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form
              ref="dataForm"
              :rules="rules"
              :model="form"
              label-position="left"
              label-width="110px"
            >
              <el-form-item label="所属系统">
                <el-input v-model="form.clientName" :disabled="true" />
              </el-form-item>
              <el-form-item label="角色名称" prop="name">
                <el-input v-model="form.name" placeholder="请输入角色名称" />
              </el-form-item>
              <el-form-item label="角色说明">
                <el-input v-model="form.remark" placeholder="请输入角色说明" />
              </el-form-item>
              <el-form-item label="所属机构类型" prop="orgType">
                <el-select
                  v-model="form.orgType"
                  placeholder="请选择所属机构类型"
                  @change="filterFormOrgName"
                >
                  <el-option
                    v-for="(item,index) in OrgTypes"
                    :key="index"
                    :value="item.key"
                    :label="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="启用">
                <div class="t-row-operate">
                  <el-switch
                    v-model="form.enable"
                    class="switchStyle"
                    active-color="#42B983"
                    inactive-color="#A2A9BA"
                    active-text="启用"
                    inactive-text="禁用"
                  />
                </div>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="12" class="box-tree-mini">
            <el-tree
              ref="roleTree"
              show-checkbox
              node-key="id"
              :data="allTreeData"
              :props="defaultProps"
              default-expand-all
              :expand-on-click-node="true"
            />
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          v-if="dialogStatus=='create'"
          type="primary"
          @click="createData"
        >{{ $t('table.confirm') }}
        </el-button>
        <el-button v-else type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  client,
  page,
  create,
  update,
  del,
  enable,
  getRolePermission,
  getAuthorityTree
} from '@/api/base/role'
import { dictOrg } from '@/api/base/dictDetail'

export default {
  name: 'RolePage',
  data() {
    return {
      allTreeData: null,
      operatingRoleId: null,
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {}
      },
      choseSys: {},
      sysItems: [],
      OrgTypes: [],
      currentRole: null,
      form: {
        authorityIds: [],
        clientId: '',
        orgType: '',
        clientName: '',
        name: '',
        remark: '',
        enable: true
      },
      dialogFormVisible: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      rules: {
        name: {
          required: true,
          message: '请填写角色名称',
          trigger: 'blur'
        },
        orgType: [{ required: true, message: '请填写机构类型', trigger: 'change' }]
      }
    }
  },
  created() {
    this.getClientList().then(() => {
      dictOrg().then(res => {
        this.OrgTypes = res.data
      })
      this.getList()
      this.initAuthorityTree()
    })
  },
  methods: {
    getClientList() {
      return client().then(res => {
        this.sysItems = res.data.map(function(item) {
          return {
            value: item.clientId,
            label: item.clientName
          }
        })
        this.choseSys = JSON.parse(JSON.stringify(this.sysItems[0]))
        this.listQuery.params.clientId = this.choseSys.value
      })
    },
    initAuthorityTree() {
      this.allTreeData = null
      getAuthorityTree(this.choseSys.value).then(res => {
        this.allTreeData = { ...res }.data
      })
    },
    processTreeData(data, bool) {
      // todo 保留后续使用
      data.forEach(item => {
        if (item.hasOwnProperty('children')) {
          this.processTreeData(item['children'], bool)
        } else {
          item.disabled = bool
        }
      })
    },
    filterFormOrgName(val) {
      const cell = this.OrgTypes.find(function(item) {
        return item.key === val
      })
      this.form.orgTypeName = cell.value
    },
    handleChange(val) {
      const item = this.sysItems.find(function(item) {
        return item.value === val
      })
      this.choseSys.label = item.label
      this.listQuery.params.clientId = val
      this.listQuery.params.orgType = ''
      this.getList()
      this.initAuthorityTree()
    },
    handleOrgChange() {
      this.getList()
      this.initAuthorityTree()
    },
    handleRoleChange(val) {
      this.currentRole = val
      this.getRoleTree()
    },
    getRoleTree() {
      getRolePermission(this.currentRole.id).then(res => {
        this.$refs['tree'].setCheckedKeys(res.data)
      })
    },
    getList() {
      this.listLoading = true
      page(this.listQuery).then(response => {
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
    resetForm() {
      this.form = {
        authorityIds: [],
        clientId: '',
        clientName: '',
        name: '',
        remark: '',
        enable: true
      }
    },
    handleCreate() {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.form.clientId = this.choseSys.value
      this.form.clientName = this.choseSys.label
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
        this.$refs['roleTree'].setCheckedKeys([])
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.form.authorityIds = this.$refs['roleTree'].getCheckedKeys()
          create(this.form).then(() => {
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.form = { ...row, ...{ clientName: this.choseSys.label }}
      getRolePermission(row.id).then(res => {
        this.$refs['roleTree'].setCheckedKeys(res.data)
      })
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.form.authorityIds = this.$refs['roleTree'].getCheckedKeys()
          update(this.form).then(() => {
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
      console.log(row)
      this.$confirm(`确认删除${row.name}？`).then(() => {
        del(row.id).then(() => {
          this.getList()
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    handleEnable(row) {
      enable(row.id)
        .then(() => {
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: 'success',
            duration: 2000
          })
        })
        .catch(res => {
          this.$notify({
            title: '失败',
            message: res.message,
            type: 'fail',
            duration: 2000
          })
        })
    }
  }
}
</script>
<style scoped>
  .box-card.box-tree {
    max-height: calc(98vh - 150px);
    overflow: auto;
  }

  .box-tree-mini {
    height: calc(54vh);
    overflow: auto;
  }
</style>
