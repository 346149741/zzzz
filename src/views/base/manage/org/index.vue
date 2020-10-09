<template>
  <div class="app-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>机构管理</span>
      </div>
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="名称：" class="filter-item">
            <el-input v-model="filterOrgName" class="filter-item list-query" prefix-icon="el-icon-search" placeholder="请输入机构名称" @keyup.enter.native="handleFilter" />
          </el-form-item>
          <el-form-item label="机构类型" class="filter-item">
            <el-select
              v-model="filterOrgType"
              class="filter-item mr10"
              placeholder="请选择"
              clearable
              @change="handleFilter"
            >
              <el-option
                v-for="item in orgType"
                :key="item.key"
                :value="item.key"
                :label="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item class="filter-item">
            <el-button v-waves class="filter-item btn-base" type="primary" style="margin-left: 10px;" icon="mr10 iconfont iconsousuo" @click="handleFilter">
              {{ $t('table.search') }}
            </el-button>
            <el-button class="filter-item btn-base filter-add-btn" style="margin-left: 10px;margin-right:10px" icon="mr10 iconfont iconxinzengh" @click="handleCreate">
              {{ $t('table.add') }}
            </el-button>
            <el-button-group class="filter-item btn-base">
              <el-button
                v-waves
                circle
                type="primary"
                icon="el-icon-arrow-down"
                @click="$refs.xTree.setAllTreeExpansion(true)"
              />
              <el-button
                v-waves
                circle
                type="primary"
                icon="el-icon-arrow-up"
                @click="$refs.xTree.clearTreeExpand()"
              />
            </el-button-group>
          </el-form-item>
        </el-form>
      </div>
      <vxe-table
        ref="xTree"
        stripe
        resizable
        highlight-hover-row
        :loading="loading"
        :tree-config="{children: 'children', expandAll: true}"
        :data="tableData"
      >
        <vxe-table-column
          field="name"
          title="机构名称"
          width="300"
          tree-node
        />
        <vxe-table-column
          field="code"
          title="机构编号"
          width="120"
        />
        <vxe-table-column
          align="center"
          width="50"
          field="sort"
          title="序号"
        />
        <vxe-table-column
          field="orgTypeName"
          title="机构类型"
          width="120"
        />
        <vxe-table-column
          field="contacts"
          title="负责人"
          width="90"
        />
        <vxe-table-column
          field="contactsTel"
          title="负责人手机号"
          width="120"
        />
        <vxe-table-column
          field="orgAddress"
          title="地址"
        />
        <vxe-table-column
          field="remark"
          title="备注"
        />
        <vxe-table-column title="操作" width="150px">
          <template v-slot="{ row }">
            <div class="t-col-operate">
              <!-- <el-button size="mini" icon="el-icon-tickets" class="operatefont iconchakanb" @click="handleView(row)">
                查看
              </el-button> -->
              <i class="el-icon-tickets primary table-i" title="查看" @click="handleView(row)" />
              <!-- <el-button size="mini" icon="el-icon-edit-outline" class="operatefont iconbianjib" @click="handleUpdate(row)">
                编辑
              </el-button> -->
              <i class="el-icon-edit-outline warning table-i" title="编辑" @click="handleUpdate(row)" />
              <!-- <el-button size="mini" icon="el-icon-delete" class="operatefont iconshanchub" @click="handleDelete(row)">
                删除
              </el-button> -->
              <i class="el-icon-delete danger table-i" title="删除" @click="handleDelete(row)" />
            </div>
          </template>
        </vxe-table-column>
      </vxe-table>
    </el-card>

    <!-- 新增/修改窗口 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" left width="750px">
      <div class="dialogBox">
        <el-form ref="dataForm" :rules="rules" :model="form" label-position="right" label-width="100px">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="上级机构" prop="pid">
                <el-cascader
                  v-model="form.pid"
                  style="display: block;"
                  :options="orgTreeData"
                  :props="treeProps"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="机构编号" prop="code">
                <el-input v-model="form.code" placeholder="请输入机构编号" :disabled="dialogStatus==='update'" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="机构类型" prop="orgType" label-width="100px">
                <el-select v-model="form.orgType" clearable placeholder="选择机构类型" class="filter-item" @change="orgChange">
                  <el-option
                    v-for="item in orgType"
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
        </el-form>
      </div>
      <div v-if="dialogStatus!=='view'" slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button v-if="dialogStatus==='create'" type="primary" @click="createData">{{ $t('table.confirm') }}
        </el-button>
        <el-button v-else type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!-- 查看窗口 -->
    <el-dialog title="查看" :visible.sync="viewDetail" left width="750px">
      <el-form :model="form" label-position="right" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="机构编号：">
              {{ form.code }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构类型：">
              {{ form.orgTypeName }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="机构名称：">
              {{ form.name }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示序号：">
              {{ form.sort }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="机构负责人：">
              {{ form.contacts }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责人手机号：">
              {{ form.contactsTel }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="机构地址：">
              {{ form.orgAddress }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注：">
              {{ form.remark }}
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import * as OrgApi from '@/api/base/org'
import { dictBatch } from '@/api/base/dictDetail'
import { isTel } from '@/utils/baseformValidate'

export default {
  name: 'OrgPage',
  data() {
    return {
      loading: null,
      allAlign: 'center',
      tableData: [],
      dialogFormVisible: false,
      orgType: [],
      filterOrgName: '',
      filterOrgType: '',
      viewDetail: false,
      orgTreeData: null,
      textMap: {
        view: '查看',
        update: '编辑',
        create: '新增'
      },
      dialogStatus: '',
      form: {
        id: '',
        pid: '',
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
      rules: {
        code: [
          { required: true, message: '请填写机构编号', trigger: 'blur' },
          { validator: this.validCode, trigger: 'blur' }
        ],
        name: [{ required: true, message: '请填写机构名称', trigger: 'blur' }],
        orgType: [{ required: true, message: '请填写机构类型', trigger: 'change' }],
        contactsTel: [{ required: false, validator: isTel, trigger: 'blur' }]
      },
      treeProps: {
        expandTrigger: 'hover',
        value: 'id',
        label: 'label',
        children: 'children',
        emitPath: false,
        checkStrictly: true
      }
    }
  },
  created() {
    this.getTree()
    this.initOrgType()
  },
  methods: {
    validCode(rule, value, callback) {
      OrgApi.validCode(value, this.form.id).then(response => {
        if (response.data) {
          callback(new Error('机构编号重复'))
        } else {
          callback()
        }
      })
    },
    getTree() {
      this.loading = true
      OrgApi.query(this.filterOrgName, this.filterOrgType).then(res => {
        // list -> tree
        this.tableData = this.XEUtil.toArrayTree(res.data, {
          strict: false,
          parentKey: 'pid',
          key: 'id',
          children: 'children'
        })
        console.log(this.tableData)
        this.loading = false
      })
    },
    initOrgType() {
      dictBatch([1003]).then(res => {
        this.orgType = res.data[1003]
      })
    },
    handleFilter() {
      this.getTree()
    },
    resetForm() {
      this.form = {
        id: '',
        pid: '',
        code: '',
        contacts: '',
        contactsTel: '',
        name: '',
        orgAddress: '',
        orgType: '',
        remark: '',
        orgTypeName: '',
        sort: 0
      }
    },
    async handleCreate() {
      this.resetForm()
      OrgApi.orgTree().then(res => {
        this.orgTreeData = res.data
      })
      this.dialogStatus = 'create'
      const res = await OrgApi.genCode()
      this.form.code = res.data
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    orgChange(val) {
      const item = this.orgType.find(item => {
        return item.key === val
      })
      this.form.orgTypeName = item.value
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          OrgApi.createOrgItem(this.form).then(() => {
            this.dialogFormVisible = false
            this.getTree()
            this.$notify.success({
              title: '成功',
              message: '机构添加成功!'
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.form = Object.assign({}, row) // copy obj
      OrgApi.orgTree().then(res => {
        this.orgTreeData = res.data
        this.removeTreeNode(this.orgTreeData, row.id)
      })
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    removeTreeNode(tree, id) {
      const that = this
      tree.forEach(function(item, index) {
        if (item.id === id) {
          tree.splice(index, 1)
        }
        const children = item.children
        if (children) {
          that.removeTreeNode(children, id)
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          OrgApi.updateOrgItem(this.form).then(() => {
            this.dialogFormVisible = false
            this.getTree()
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
        OrgApi.deleteOrgItem(row.id).then(() => {
          this.getTree()
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
        })
      })
    },
    handleView(row) {
      this.form = Object.assign({}, row)
      this.viewDetail = true
    }
  }
}
</script>

<style lang="scss">
.vxe-cell {
  .el-switch__label span {
    margin-left: 14px;
  }
}
</style>
