<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--机构树-->
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>机构信息</span>
          </div>
          <el-tree
            ref="tree"
            class="filter-tree"
            :data="orgTreeData"
            node-key="id"
            :props="defaultProps"
            highlight-current
            default-expand-all
            :expand-on-click-node="false"
            @node-click="selectOrg"
          >
            <span slot-scope="{ node }">
              <i class="el-icon-house" />
              <span class="el-tree-node__label">{{ node.label }}</span>
            </span>
          </el-tree>
        </el-card>
      </el-col>
      <!--部门列表-->
      <el-col :span="18">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>部门管理</span>
          </div>
          <!--搜索条件-->
          <div class="filter-container">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="部门名称/拼音助记码：" class="filter-item">
                <el-input
                  v-model="nameOrPinyin"
                  type="text"
                  style="width: 340px;"
                  prefix-icon="el-icon-search"
                  class="filter-item mr10"
                  placeholder="请输入部门名称/拼音助记码"
                  @keyup.enter.native="handleFilter"
                />
              </el-form-item>
              <el-form-item class="filter-item">
                <el-button
                  v-waves
                  class="filter-item btn-base"
                  type="primary"
                  icon="mr10 iconfont iconsousuo"
                  @click="handleFilter"
                >{{ $t('table.search') }}</el-button>
                <el-button
                  class="filter-item btn-base filter-add-btn"
                  type="primary"
                  icon="mr10 iconfont iconxinzengh"
                  @click="handleCreate"
                >新增</el-button>
              </el-form-item>
            </el-form>
          </div>

          <!--分页内容-->
          <vxe-table
            ref="xTree"
            stripe
            resizable
            highlight-hover-row
            :loading="loading"
            :tree-config="{children: 'children', expandAll: true}"
            :data="tableData"
          >
            <vxe-table-column field="name" title="部门名称" width="300" tree-node />
            <vxe-table-column field="code" title="部门编号" />
            <vxe-table-column align="center" width="100" field="sort" title="序号" />
            <vxe-table-column field="pinyin" title="拼音码" />
            <vxe-table-column field="remark" title="备注" />
            <vxe-table-column title="操作" width="150px">
              <template v-slot="{ row }">
                <div class="t-col-operate">
                  <!-- <el-button size="mini" icon="el-icon-tickets" class="operatefont iconchakanb" @click="handleView(row)">
                    查看
                  </el-button>
                  <el-button size="mini" icon="el-icon-edit-outline" class="operatefont iconbianjib" @click="handleUpdate(row)">
                    编辑
                  </el-button>
                  <el-button size="mini" icon="el-icon-delete" class="operatefont iconshanchub" @click="handleDelete(row)">
                    删除
                  </el-button>-->
                  <i class="el-icon-tickets primary table-i" title="查看" @click="handleView(row)" />
                  <i class="el-icon-edit-outline warning table-i" title="编辑" @click="handleUpdate(row)" />
                  <i class="el-icon-delete danger table-i" title="删除" @click="handleDelete(row)" />
                </div>
              </template>
            </vxe-table-column>
          </vxe-table>
        </el-card>
      </el-col>
    </el-row>
    <!--新增/修改弹出层-->
    <el-dialog
      top="10vh"
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      left
      width="800px"
    >
      <div class="dialogBox">
        <el-form
          ref="dataForm"
          :rules="rules"
          :model="form"
          label-position="right"
          label-width="100px"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="所属机构">
                <el-input v-model="selectOrgName" :disabled="true" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上级部门" prop="pid">
                <el-cascader
                  v-model="form.pid"
                  style="display: block;"
                  :options="deptTreeData"
                  :props="treeProps"
                  clearable
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="部门编号" prop="code">
                <el-input
                  v-model="form.code"
                  placeholder="请输入机构编号"
                  :disabled="dialogStatus==='update'"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="显示排序">
                <el-input-number v-model.number="form.sort" :min="0" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="部门名称" prop="name">
                <el-input v-model.lazy="form.name" placeholder="请输入部门名称" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="拼音助记码">
                <el-input v-model="form.pinyin" placeholder="请输入助记码" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="备注">
            <el-input v-model="form.remark" placeholder="请输入备注信息" />
          </el-form-item>
          <div v-if="dialogStatus==='view'">
            <el-row>
              <i class="line" />
            </el-row>
          </div>
        </el-form>
      </div>
      <div v-if="dialogStatus!=='view'" slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          v-if="dialogStatus==='create'"
          type="primary"
          @click="createData"
        >{{ $t('table.confirm') }}</el-button>
        <el-button v-else type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!--查看-->
    <el-dialog title="查看" :visible.sync="viewDetail" left width="800px">
      <el-form :model="form" left label-width="120px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="部门名称：">{{ form.name }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门编号：">{{ form.code }}</el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="拼音助记码：">{{ form.pinyin }}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序：">{{ form.sort }}</el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="备注：">{{ form.remark }}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import DeptAPI from '@/api/base/dept'
import { orgTree } from '@/api/base/org'
import chineseToPinYin from '@/utils/KTestpinyin'
import { isTel } from '@/utils/baseformValidate'

export default {
  data() {
    return {
      selectOrgId: '',
      selectOrgName: '',
      nameOrPinyin: '',
      tableData: null,
      loading: true,
      orgTreeData: null,
      deptTreeData: null,
      viewDetail: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      treeProps: {
        expandTrigger: 'hover',
        value: 'id',
        label: 'label',
        children: 'children',
        emitPath: false,
        checkStrictly: true
      },
      dialogStatus: '',
      dialogFormVisible: false,
      textMap: {
        view: '查看',
        update: '编辑',
        create: '新增'
      },
      form: {
        id: '',
        code: '',
        name: '',
        pid: '',
        pinyin: '',
        sort: 0,
        remark: '',
        orgId: ''
      },
      rules: {
        code: [
          { required: true, message: '请填写部门编号', trigger: 'blur' },
          { validator: this.validDeptCode, trigger: 'blur' }
        ],
        name: [{ required: true, message: '请填写部门名称', trigger: 'blur' }],
        contactsTel: [{ required: false, validator: isTel, trigger: 'blur' }]
      }
    }
  },
  watch: {
    'form.name'(value) {
      const pinYin = chineseToPinYin(value)
      const reg = /[A-Z]/g
      let res = ''
      if (pinYin !== '') {
        const mac = pinYin.match(reg)
        res = mac != null ? mac.join('') : pinYin
      }
      this.form.pinyin = res
    }
  },
  created() {
    this.initOrgTree()
  },
  methods: {
    validDeptCode(rule, value, callback) {
      DeptAPI.checkCode(value, this.form.id).then((response) => {
        if (response.data) {
          callback(new Error('部门编号重复'))
        } else {
          callback()
        }
      })
    },
    initOrgTree() {
      orgTree().then((res) => {
        if (res.data && res.data.length > 0) {
          this.orgTreeData = res.data
          this.$nextTick(() => {
            const id = this.orgTreeData[0].id
            this.selectOrgName = this.orgTreeData[0].label
            this.$refs.tree.setCurrentKey(id)
            this.selectOrgId = id
            this.getTree()
          })
        }
      })
    },
    getTree() {
      this.loading = true
      DeptAPI.query(this.selectOrgId, this.nameOrPinyin).then((res) => {
        // list -> tree
        this.tableData = this.XEUtil.toArrayTree(res.data, {
          strict: false,
          parentKey: 'pid',
          key: 'id',
          children: 'children'
        })
        this.loading = false
      })
    },
    handleFilter() {
      this.getTree()
    },
    selectOrg(data) {
      this.selectOrgId = data.id
      this.selectOrgName = data.label
      this.getTree()
    },
    resetForm() {
      this.form = {
        id: '',
        code: '',
        name: '',
        pid: '',
        pinyin: '',
        sort: 0,
        remark: '',
        orgId: ''
      }
    },
    handleCreate() {
      if (!this.selectOrgId) {
        this.$notify.warning('请选择机构')
        return
      }
      this.resetForm()
      DeptAPI.getDeptTree(this.selectOrgId).then((res) => {
        this.deptTreeData = res.data
      })
      DeptAPI.genCode(this.selectOrgId).then((res) => {
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.form.orgId = this.selectOrgId
        this.form.code = res.data
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          DeptAPI.save(this.form).then(() => {
            this.dialogFormVisible = false
            this.getTree()
            this.$notify.success({
              title: '成功',
              message: '添加成功!'
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.form = { ...row }
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      DeptAPI.getDeptTree(this.selectOrgId).then((res) => {
        this.deptTreeData = res.data
        this.removeTreeNode(this.deptTreeData, row.id)
      })
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
          DeptAPI.updateItem(this.form).then(() => {
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
        DeptAPI.delete(row.id).then(() => {
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
<style lang="scss" scoped>
.line {
  width: 100%;
  display: inline-block;
  border-bottom: 1px dashed #e5e5e5;
  margin: 20px 0;
}
</style>
