<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--部门树-->
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>选择部门</span>
          </div>
          <el-tree
            ref="tree"
            class="filter-tree"
            :data="treeData"
            node-key="id"
            :props="defaultProps"
            highlight-current
            default-expand-all
            :expand-on-click-node="false"
            @node-click="getNodeData"
          />
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
                  v-model="listQuery.params.name"
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
                >{{ $t('table.search') }}
                </el-button>
                <el-button
                  class="filter-item btn-base filter-add-btn"
                  type="primary"
                  icon="mr10 iconfont iconxinzengh"
                  @click="handleCreate"
                >新增
                </el-button>
              </el-form-item>
            </el-form>
          </div>

          <!--分页内容-->
          <el-table
            v-loading="listLoading"
            stripe
            :data="list"
            class="t-bd"
            :header-cell-style="{background:'#ECF5FC',color:'#A2A2B2','font-size':'14px'}"
            border
            fit
            highlight-current-row
          >
            <el-table-column align="center" label="序号" fixed width="50px">
              <template slot-scope="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="部门编号" fixed show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>
            <el-table-column label="部门名称" fixed show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="拼音码" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.pinyin }}</span>
              </template>
            </el-table-column>
            <el-table-column label="备注" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.remark }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              :label="$t('table.actions')"
              class-name="small-padding fixed-width"
              width="240px"
              fixed="right"
            >
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
    </el-row>
    <!--新增/修改弹出层-->
    <el-dialog top="10vh" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" left width="800px">
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
              <el-form-item label="上级部门">
                <el-input v-model="form.label" :disabled="true" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="dialogStatus==='update'" label="部门ID">
                <el-input v-model="form.id" placeholder="请输入部门ID" :disabled="dialogStatus==='update'" />
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
          <!--<el-row :gutter="20">-->
          <!--<el-col :span="12">-->
          <!--<el-form-item label="联系人姓名">-->
          <!--<el-input v-model="form.contacts" placeholder="请输入联系人姓名" />-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="12">-->
          <!--<el-form-item label="联系人电话" prop="contactsTel">-->
          <!--<el-input v-model="form.contactsTel" placeholder="请输入联系人电话" />-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--</el-row>-->
          <el-form-item label="备注">
            <el-input v-model="form.remark" placeholder="请输入备注信息" />
          </el-form-item>
          <div v-if="dialogStatus==='view'">
            <el-row>
              <i class="line" />
            </el-row>
            <!--          <el-row :gutter="20">-->
            <!--            <el-col :span="12">-->
            <!--              <el-form-item label="创建人">-->
            <!--                <el-input v-model="form.createUser" :disabled="true" />-->
            <!--              </el-form-item>-->
            <!--            </el-col>-->
            <!--            <el-col :span="12">-->
            <!--              <el-form-item label="创建时间" :disabled="true">-->
            <!--                <el-input v-model="form.createTime" />-->
            <!--              </el-form-item>-->
            <!--            </el-col>-->
            <!--          </el-row>-->
            <!--          <el-row :gutter="20">-->
            <!--            <el-col :span="12">-->
            <!--              <el-form-item label="最后修改人" :disabled="true">-->
            <!--                <el-input v-model="form.updateUser" />-->
            <!--              </el-form-item>-->
            <!--            </el-col>-->
            <!--            <el-col :span="12">-->
            <!--              <el-form-item label="最后修改时间" :disabled="true">-->
            <!--                <el-input v-model="form.updateTime" />-->
            <!--              </el-form-item>-->
            <!--            </el-col>-->
            <!--          </el-row>-->
          </div>
        </el-form>
      </div>
      <div v-if="dialogStatus!=='view'" slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          v-if="dialogStatus==='create'"
          type="primary"
          @click="createData"
        >{{ $t('table.confirm') }}
        </el-button>
        <el-button v-else type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog title="查看" :visible.sync="checkdetail" left width="800px">
      <el-form
        :model="form"
        left
        label-width="120px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="上级部门：">
              {{ form.label }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序：">
              {{ form.sort }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="部门编号：">
              {{ form.code }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="拼音助记码：">
              {{ form.pinyin }}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="部门名称：">
              {{ form.name }}
            </el-form-item>
          </el-col>
          <el-col :span="12">
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
import DeptAPI from '@/api/base/dept'
import chineseToPinYin from '@/utils/KTestpinyin'
import { isTel } from '@/utils/baseformValidate'

export default {
  data() {
    return {
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          name: null
        }
      },
      list: null,
      total: null,
      listLoading: true,
      treeData: null,
      checkdetail: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      selectedTree: {
        type: '',
        id: '',
        pid: '',
        label: '',
        pLabel: ''
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
        contacts: '',
        contactsTel: '',
        name: '',
        pid: '',
        pinyin: '',
        sort: 0,
        label: '',
        remark: '',
        orgId: ''
      },
      rules: {
        code: [
          { required: true, message: '请填写部门编号', trigger: 'blur' },
          { validator: this.valiDeptCode, trigger: 'blur' }
        ],
        name: [{ required: true, message: '请填写部门名称', trigger: 'blur' }],
        pid: [{ required: true, message: '请输入上级部门', trigger: 'blur' }],
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
    this.getTree()
  },
  methods: {
    valiDeptCode(rule, value, callback) {
      DeptAPI.checkCode(value, this.form.id).then(response => {
        if (response.data) {
          callback(new Error('部门编号重复'))
        } else {
          callback()
        }
      })
    },
    // change(e){
    //   this.$forceUpdate()
    // },
    getTree() {
      DeptAPI.getOrgDeptTree()
        .then(response => {
          this.treeData = response.data
          const userInfo = this.$store.getters.userInfo
          this.$nextTick(() => {
            this.$refs.tree.setCurrentKey(userInfo.deptId)
            const currentNode = this.$refs.tree.getNode(userInfo.deptId)
            this.getSelectedTree(currentNode)
            this.getList()
          })
        })
        .catch(res => {
          this.$message.error(res.message)
        })
    },
    getSelectedTree(currentNode) {
      const id = currentNode.data.id
      const label = currentNode.data.label
      let pid = ''
      if (currentNode.level === 1) {
        pid = id
      } else {
        pid = currentNode.parent.data.id
      }
      let orgId = ''
      const parentOrg = this.getParentOrgId(currentNode)
      orgId = parentOrg.data.id
      this.selectedTree = { id, label, pid, orgId }
    },
    getParentOrgId(node) {
      // 递归获取子节点的祖宗节点
      if (node.level === 1) {
        return node
      } else {
        return this.getParentOrgId(node.parent)
      }
    },
    updateTree() {
      DeptAPI.getOrgDeptTree()
        .then(response => {
          this.treeData = response.data
          this.$nextTick(() => {
            this.$refs.tree.setCurrentKey(this.selectedTree.id)
          })
        })
        .catch(res => {
          this.$message.error(res.message)
        })
    },
    resetFilter() {
      this.listQuery.params.name = ''
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList()
    },
    getList() {
      this.listLoading = true
      this.listQuery.params.pid = this.selectedTree.id
      DeptAPI.getDeptList(this.listQuery)
        .then(response => {
          this.list = response.data.content
          this.total = response.data.totalElements
          this.listLoading = false
        })
        .catch(res => {
          this.listLoading = true
          this.$message.error(res.message)
        })
    },
    getNodeData(data, node) {
      this.resetFilter()
      this.getSelectedTree(node)
      this.getList()
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
        id: '',
        code: '',
        contacts: '',
        contactsTel: '',
        name: '',
        pid: '',
        pinyin: '',
        label: '',
        sort: 0,
        remark: '',
        orgId: ''
      }
    },
    handleCreate() {
      this.resetForm()
      DeptAPI.genCode(this.selectedTree.orgId).then((res) => {
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.form.pid = this.selectedTree.id
        this.form.label = this.selectedTree.label
        this.form.orgId = this.selectedTree.orgId
        this.form.code = res.data
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          DeptAPI.save(this.form)
            .then(() => {
              this.dialogFormVisible = false
              this.getList()
              this.$notify.success({
                title: '成功',
                message: '部门添加成功!'
              })
              this.getList()
              this.updateTree()
            })
            .catch(res => {
              this.$notify.error({
                title: '失败',
                message: res.message
              })
            })
        }
      })
    },
    handleUpdate(row) {
      this.form = { ...row }
      this.form.label = this.selectedTree.label
      this.form.pid = this.selectedTree.id
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          DeptAPI.updateItem(this.form).then(() => {
            this.dialogFormVisible = false
            this.getList()
            this.updateTree()
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
        DeptAPI.delete(row.id)
          .then(() => {
            this.getList()
            this.updateTree()
            this.$notify.success({
              title: '成功',
              message: '删除成功'
            })
          })
          .catch(res => {
            this.$notify.error({
              title: '失败',
              message: res.message
            })
          })
      })
    },
    handleView(row) {
      this.form = Object.assign({}, row) // copy obj
      this.form.label = this.selectedTree.label
      this.form.pid = this.selectedTree.id
      // this.dialogStatus = 'view'
      this.checkdetail = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      // })
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
