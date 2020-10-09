<!--人员管理-->
<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>养生保健</span>
      </div>
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
            >
              <el-table-column align="center" fixed label="序号" width="50px">
                <template slot-scope="scope">
                  <span>{{ scope.$index + 1 }}</span>
                </template>
              </el-table-column>
              <el-table-column fixed label="姓名" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.a }}</span>
                </template>
              </el-table-column>
              <el-table-column fixed label="性别" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.b }}</span>
                </template>
              </el-table-column>
              <el-table-column label="身份证号" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.e }}</span>
                </template>
              </el-table-column>
              <el-table-column label="出生日期" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.f }}</span>
                </template>
              </el-table-column>
              <el-table-column label="联系电话" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.j }}</span>
                </template>
              </el-table-column>
              <el-table-column label="身高" show-overflow-tooltip width="60">
                <template slot-scope="scope">
                  <span>{{ scope.row.c }}</span>
                </template>
              </el-table-column>
              <el-table-column label="体重" show-overflow-tooltip width="60">
                <template slot-scope="scope">
                  <span>{{ scope.row.d }}</span>
                </template>
              </el-table-column>
              <el-table-column label="学历" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.n }}</span>
                </template>
              </el-table-column>
              <el-table-column label="民族" show-overflow-tooltip width="60">
                <template slot-scope="scope">
                  <span>{{ scope.row.m }}</span>
                </template>
              </el-table-column>
              <el-table-column label="婚姻状况" show-overflow-tooltip width="80">
                <template slot-scope="scope">
                  <span>{{ scope.row.o }}</span>
                </template>
              </el-table-column>
              <el-table-column label="血型" show-overflow-tooltip width="60">
                <template slot-scope="scope">
                  <span>{{ scope.row.p }}</span>
                </template>
              </el-table-column>
              <el-table-column label="是否高血压" show-overflow-tooltip width="100">
                <template slot-scope="scope">
                  <span>{{ scope.row.s }}</span>
                </template>
              </el-table-column>
              <el-table-column label="部门" show-overflow-tooltip>
                <template slot-scope="scope">
                  <span>{{ scope.row.k }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="60" fixed="right">
                <template slot-scope="scope">
                  <div class="t-col-operate">
                    <i class="el-icon-tickets primary table-i" title="详情" @click="details(scope.row)" />
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
    </el-card>
    <!--详情弹出层-->
    <el-dialog
      class="abow_dialog detail-form"
      title="详情"
      :visible.sync="dialog2"
      :close-on-click-modal="false"
      width="1260px"
      @close="resetForm"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form
            ref="dataForm"
            :model="form"
            label-position="right"
            label-width="100px"
          >
            <div class="dialog-item-title">基本信息</div>
            <el-row :gutter="20">
              <el-col :md="24" :lg="8">
                <el-form-item label="姓名：">
                  {{ form.a }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-form-item label="性别：">
                  {{ form.b }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-form-item label="身高">
                  {{ form.c }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-form-item label="体重：">
                  {{ form.d }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-form-item label="身份证号码：">
                  {{ form.e }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-form-item label="出生日期：">
                  {{ form.f }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-form-item label="出生地：">
                  {{ form.g }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-form-item label="户籍地：">
                  {{ form.h }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-form-item label="办公电话：">
                  {{ form.i }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-form-item label="手机电话：">
                  {{ form.j }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-form-item label="工作单位：">
                  {{ form.k }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-form-item label="住址：">
                  {{ form.l }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-form-item label="民族：">
                  {{ form.m }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-form-item label="文化程度：">
                  {{ form.n }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-form-item label="婚姻状况：">
                  {{ form.o }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-form-item label="血型：">
                  {{ form.p }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-form-item label="既往史：">
                  {{ form.q }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-form-item label="家族史：">
                  {{ form.r }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-form-item label="遗传病史：">
                  {{ form.s }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-form-item label="残疾情况：">
                  {{ form.t }}
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
import MeAPI from '@/api/logistics/hyg-archives'
import { getAllOrg } from '@/api/base/organ'
import { delchildren } from '@/utils/index'

export default {
  data() {
    return {
      value1: null,
      value: true,
      isEdit: '',
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          a: ''
        }
      },
      list: [],
      total: 0,
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
      dialogStatus: '',
      dialogFormVisible: false,
      dialog2: false,
      textMap: {
        view: '查看',
        update: '编辑',
        create: '新增'
      },
      form: {
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
        o: '',
        p: '',
        q: '',
        r: '',
        s: '',
        t: '',
        x: '',
        y: '',
        z: ''
      }
    }
  },
  watch: {
  },
  created() {
    this.getTree()
  },
  methods: {
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
        this.orgDeptTreeData = delchildren(this.orgDeptTreeData)
        this.$nextTick(() => {
          this.$refs.tree.setCurrentKey(this.orgDeptTreeData[0].id)
          this.getList()
        })
      })
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList()
    },
    getList() {
      const res = MeAPI.page(this.listQuery)
      this.listLoading = false
      this.total = res.data.totalElements
      this.list = res.data.content
    },
    deptChange(id) {
      const checkedNode = this.$refs.cascader.getCheckedNodes()[0]
      this.form.unitName = checkedNode.data.label
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
      this.$refs['dataForm'].clearValidate()
      this.form = {
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
        o: '',
        p: '',
        q: '',
        r: '',
        s: '',
        t: '',
        x: '',
        y: '',
        z: ''
      }
    },
    details(info) {
      this.dialog2 = true
      this.form = Object.assign({}, info)
    },
    findRootNode(node) {
      // 递归获取子节点的根节点
      if (node.level === 1) {
        return node.data
      } else {
        return this.findRootNode(node.parent)
      }
    },
    cascaderRadioClick(val, name) {
      this.form.unitId = val
      this.form.unitName = name
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
<style lang='scss'>
  // .rt_input /deep/ .el-form-item__label{
  // 	width: 76px!important;
  // }
  // .rt_input /deep/ .el-form-item__content{
  // 	margin-left: 76px!important;
  // }
  // .el-upload{
  //   height: 180px !important;
  // }
</style>
