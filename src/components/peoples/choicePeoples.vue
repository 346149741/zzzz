<!--人员管理-->
<template>
  <el-dialog class="abow_dialog" width="80%" title="新增用户" :visible.sync="dialogVisible" :close-on-click-modal="false" append-to-body left>
    <div class="dialog-content">
      <el-row :gutter="20">
        <!--部门树-->
        <el-col :span="5">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>组织机构名称</span>
            </div>
            <el-tree
              ref="tree"
              class="filter-tree"
              :data="orgDeptTreeData"
              node-key="id"
              :props="defaultProps"
              highlight-current
              default-expand-all
              :expand-on-click-node="false"
              @node-click="getList"
            />
          </el-card>
        </el-col>
        <!--人员列表-->
        <el-col :span="19">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>人员管理</span>
            </div>
            <div class="filter-container">
              <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="姓名：" class="filter-item">
                  <el-input
                    v-model="listQuery.params.name"
                    type="text"
                    class="filter-item"
                    placeholder="请输入姓名"
                    @keyup.enter.native="handleFilter"
                  />
                </el-form-item>
                <el-form-item label="文化程度：" class="filter-item">
                  <el-select
                    v-model="listQuery.params.educationBackgroundId"
                    class="filter-item"
                    placeholder="请选择文化程度"
                    @keyup.enter.native="handleFilter"
                  >
                    <el-option
                      v-for="(item,key) in eduList"
                      :key="key"
                      :label="item.value"
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="人员类型：" class="filter-item">
                  <el-select
                    v-model="listQuery.params.staffTypeId"
                    class="filter-item"
                    placeholder="请选择人员类型"
                    @keyup.enter.native="handleFilter"
                  >
                    <el-option
                      v-for="(item,key) in peoplestypeList"
                      :key="key"
                      :label="item.value"
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="军衔：" class="filter-item">
                  <el-select
                    v-model="listQuery.params.militaryRankId"
                    class="filter-item"
                    placeholder="请选择军衔"
                    @keyup.enter.native="handleFilter"
                  >
                    <el-option
                      v-for="(item,key) in ranksList"
                      :key="key"
                      :label="item.value"
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="入伍时间：" class="filter-item">
                  <el-date-picker
                    v-model="value1"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
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
                </el-form-item>
              </el-form>
            </div>
            <!--分页内容-->
            <el-table
              ref="multipleTable"
              v-loading="listLoading"
              stripe
              :data="list"
              class="t-bd"
              fit
              highlight-current-row
              @select="selected"
              @select-all="selectAll"
              @selection-change="handleSelectionChange"
            >
              <el-table-column v-if="msg.type!==undefined" type="selection" width="55" />
              <el-table-column align="center" fixed label="序号" width="50px">
                <template slot-scope="scope">
                  <span>{{ scope.$index + 1 }}</span>
                </template>
              </el-table-column>
              <el-table-column fixed label="编号" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.code }}</span>
                </template>
              </el-table-column>
              <el-table-column fixed label="姓名" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column label="性别" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.sex }}</span>
                </template>
              </el-table-column>
              <el-table-column label="出生日期" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.birthday.slice(0, 10) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="身份证号" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.idNo }}</span>
                </template>
              </el-table-column>
              <el-table-column fixed label="籍贯" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.nativePlace }}</span>
                </template>
              </el-table-column>
              <el-table-column label="政治面貌" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.politicsStatus }}</span>
                </template>
              </el-table-column>
              <el-table-column label="民族" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.nation }}</span>
                </template>
              </el-table-column>
              <el-table-column label="文化程度" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.educationBackground }}</span>
                </template>
              </el-table-column>
              <el-table-column label="专业" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.profession }}</span>
                </template>
              </el-table-column>
              <el-table-column label="人员类型" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.staffType }}</span>
                </template>
              </el-table-column>
              <el-table-column label="入伍时间" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.militaryTime.slice(0, 10) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="军衔" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.militaryRank }}</span>
                </template>
              </el-table-column>
              <el-table-column label="职务" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.job }}</span>
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
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">{{ $t('table.cancel') }}</el-button>
      <el-button type="primary" @click="getUser">{{ $t('table.confirm') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import EmpAPI from '@/api/base/employee'
import { dictEdu, dictRanks, dictSex, dictNation, dictPeoplestype } from '@/api/base/dictDetail'
import { dictBatch } from '@/api/base/dictDetail'
import { getAllOrg } from '@/api/base/organ'

export default {
  props: ['msg'],
  data() {
    return {
      dialogVisible: false,
      value1: null,
      value: true,
      isEdit: '',
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          name: '',
          educationBackground: '',
          staffTypeId: '',
          militaryRankId: '',
          militaryTime: ''
        }
      },
      postData: [],
      eduList: [],
      sexList: [],
      parentId: '',
      parentName: '',
      ranksList: [],
      nationList: [],
      peoplestypeList: [],
      list: null,
      total: null,
      listLoading: true,
      orgDeptTreeData: null,
      deptTreeData: null,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      treeProps: {
        expandTrigger: 'hover',
        value: 'id',
        label: 'label',
        emitPath: false,
        checkStrictly: true
      },
      multipleSelection: [],
      nativePlace: [],
      nativePlaceProps: {
        value: 'code',
        label: 'name',
        children: 'city'
      }
    }
  },
  watch: {},
  created() {
    this.getTree()
    dictBatch(['1001', '3001', '3002', '3003', '1002']).then(res => {
      this.sexList = res.data['1001']
      this.ranksList = res.data['3001']
      this.nationList = res.data['3002']
      this.peoplestypeList = res.data['3003']
      this.eduList = res.data['1002']
    })
  },
  methods: {
    open() {
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(this.orgDeptTreeData[0].id)
        this.getList()
      })
      console.log(this.orgDeptTreeData)
    },
    getTree() {
      getAllOrg().then(res => {
        res.data.forEach(item => {
          item.value = item.id
          item.label = item.organizationName
        })
        this.orgDeptTreeData = this.XEUtil.toArrayTree(res.data, {
          strict: false,
          parentKey: 'pid',
          key: 'id',
          children: 'children'
        })
      })
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList()
    },
    getList(data, node, e) {
      this.listLoading = true
      if (this.value1 != null) {
        this.listQuery.params.startTime = this.value1[0]
        this.listQuery.params.endTime = this.value1[1]
      }
      const currentNode = this.$refs.tree.getCurrentNode()
      this.parentId = currentNode.id
      this.parentName = currentNode.label
      if (currentNode) {
        this.listQuery.params.unitId = currentNode.id
        EmpAPI.getpeoplespage(this.listQuery).then(response => {
          this.list = response.data.content
          this.total = response.data.totalElements
          this.listLoading = false
        })
      }
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.getList()
    },
    findRootNode(node) {
      // 递归获取子节点的根节点
      if (node.level === 1) {
        return node.data
      } else {
        return this.findRootNode(node.parent)
      }
    },
    selected(selection, row) {
      if (this.msg.type === 2) {
        this.$refs.multipleTable.clearSelection()
        if (selection.length === 0) return
        this.$refs.multipleTable.toggleRowSelection(row, true)
      }
    },
    handleSelectionChange(val) {
      for (let i = 0; i < val.length; i++) {
        val[i].deptName = this.parentName
        val[i].parentId = this.parentId
      }
      this.multipleSelection = val
    },
    selectAll() {
      if (this.msg.type === 2) {
        this.$refs.multipleTable.clearSelection()
      }
    },
    getUser() {
      if (this.multipleSelection.length > 0) {
        this.$emit('peopleSelect', this.multipleSelection)
        this.dialogVisible = false
      } else {
        this.$message.error('请选择人员', 2000)
      }
    }
  }
}
</script>
<style lang='scss' scoped>
  .dialog-item-title {
    padding-left: 0;
    margin-bottom: 20px;
  }
  .photo {
  }
  .photo-icon-small {
    width: 40px;
    height: 40px;
  }

  /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  /deep/ .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }

  .avatar {
    // position: absolute;
    // top: 0;
    // left: 10%;
    width: 50px;
    height: 50px;
    display: block;
  }
  .dialogBox {
    border: 1px solid #eee;
    box-sizing: border-box;
    padding: 20px 20px 0 20px;
    background-color: #fff;
  }
  // /deep/ .el-upload{
  // 	width: 100%;
  // }
</style>
