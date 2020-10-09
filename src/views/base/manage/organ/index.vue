<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>机构管理</span>
      </div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="组织机构列表" name="first">
          <div class="filter-container">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item class="filter-item">
                <el-button
                  v-if="tableData.length === 0"
                  class="filter-item btn-base filter-add-btn"
                  style="margin-left: 10px;margin-right:10px"
                  icon="mr10 iconfont iconxinzengh"
                  @click="handleCreate"
                >
                  添加一级机构
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
              field="organizationName"
              title="组织机构名称"
              tree-node
            />
            <vxe-table-column
              field="commandOfficerName"
              title="军队指挥官"
            />
            <vxe-table-column
              align="center"
              field="politicalCommissarName"
              title="军队政委"
            />
            <vxe-table-column
              field="outstationName"
              title="驻扎地点"
            />
            <vxe-table-column title="操作" width="190px">
              <template v-slot="{ row }">
                <div class="t-col-operate">
                  <i class="el-icon-folder-add info table-i" title="新增子级" @click="handleSaveChild(row)" />
                  <i class="el-icon-tickets primary table-i" title="查看" @click="handleView(row)" />
                  <i class="el-icon-edit-outline warning table-i" title="编辑" @click="handleUpdate(row)" />
                  <i class="el-icon-delete danger table-i" title="删除" @click="handleDelete(row)" />
                </div>
              </template>
            </vxe-table-column>
          </vxe-table>
        </el-tab-pane>
        <el-tab-pane label="组织机构图" name="second">
          <TreeChart v-if="treeData" ref="treeChart" :tree-data="treeData" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!--添加编辑弹窗-->
    <el-dialog
      class="abow_dialog"
      :title="dialogForm.title"
      :visible.sync="dialogForm.visible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="60%"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="130px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="上级机构：" prop="pid">
                  <el-cascader v-model="dataForm.pid" :options="tableData" class="form-item1" :props="{ checkStrictly: true }" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="机构名称：" prop="organizationName">
                  <el-input v-model="dataForm.organizationName" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="指挥官：" prop="commandOfficer">
                  <el-input v-model="dataForm.commandOfficerName" class="form-item1">
                    <i slot="suffix" class="el-input__icon el-input_txt" @click="chosePeople('commandOfficer', dataForm.commandOfficer)">选择</i>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="政委：" prop="politicalCommissar">
                  <el-input v-model="dataForm.politicalCommissarName" class="form-item1">
                    <i slot="suffix" class="el-input__icon el-input_txt" @click="chosePeople('politicalCommissar', dataForm.politicalCommissar)">选择</i>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="驻扎地区域坐标：" prop="outstationLocation">
                  <el-input v-model="dataForm.outstationLocation" class="form-item1 form-suffix">
                    <i slot="suffix" class="el-input__icon el-input_txt" @click="handOperateCoords">拾取位置</i>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="驻扎地名称：" prop="outstationName">
                  <el-input v-model="dataForm.outstationName" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="显示序号：" prop="viewCode">
                  <el-input-number v-model="dataForm.viewCode" :min="0" :max="1000" :precision="0" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注：" prop="organizationDescription">
                  <el-input
                    v-model="dataForm.organizationDescription"
                    class="form-item1"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    maxlength="30"
                    show-word-limit
                  />
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
    <!--详情查看弹窗-->
    <el-dialog
      class="abow_dialog detail-form"
      :title="detailForm.title"
      :visible.sync="detailForm.visible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="60%"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form :model="dataForm" label-width="150px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="上级机构：" prop="pid">
                  {{ dataForm.pid }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="机构名称：" prop="organizationName">
                  {{ dataForm.organizationName }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="指挥官：" prop="commandOfficer">
                  {{ dataForm.commandOfficerName }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="政委：" prop="politicalCommissar">
                  {{ dataForm.politicalCommissarName }}
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="驻扎地区域坐标：" prop="outstationLocation">
                  {{ dataForm.outstationLocation }}
                  <el-button style="float: right;" @click="handleMapView">查看</el-button>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item class="form-item1" label="驻扎地名称：" prop="outstationName">
                  {{ dataForm.outstationName }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="显示序号：" prop="viewCode">
                  {{ dataForm.viewCode }}
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注：" prop="organizationDescription">
                  {{ dataForm.organizationDescription }}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <!--人员选择框-->
    <allPeoples ref="peopleSelect" :msg="msg" @peopleSelect="peopleSelect" />
    <!--坐标拾取组件-->
    <CoordinatesPickerCmpt ref="coords" data-type="Polygon" :display-type="mapDataDisplayType" :coords="dataForm.outstationLocation" @handleOK="handleRegionOK" />
  </div>
</template>

<script>
import { getOrgTree, orgCreate, getAllOrg, getOrgById, orgEdit, orgDelete } from '@/api/base/organ.js'
import allPeoples from '@/components/peoples/choicePeoples'
import TreeChart from './TreeChart.vue'
import CoordinatesPickerCmpt from '@/components/OLMap/service/CoordinatesPickerCmpt'
export default {
  name: 'Index',
  components: { TreeChart, allPeoples, CoordinatesPickerCmpt },
  data() {
    return {
      mapDataDisplayType: 'create',
      activeName: 'first',
      loading: false,
      tableData: [],
      treeData: null,
      dialogForm: {
        visible: false,
        title: '',
        type: 'add',
        id: ''
      },
      dataForm: {
        pid: '',
        organizationName: '',
        commandOfficer: '',
        commandOfficerName: '',
        politicalCommissar: '',
        politicalCommissarName: '',
        outstationLocation: '',
        outstationName: '',
        viewCode: '',
        organizationDescription: ''
      },
      rules: {
        organizationName: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ],
        commandOfficer: [
          { required: true, message: '请选择指挥官', trigger: 'change' }
        ],
        politicalCommissar: [
          { required: true, message: '请选择政委', trigger: 'change' }
        ],
        viewCode: [
          { required: true, message: '请输入序号', trigger: 'blur' }
        ]
      },
      dialogUserVisible: false,
      peopleType: '1',
      detailForm: {
        visible: false,
        title: '查看',
        id: ''
      },
      msg: {
        type: 'radio // checkbox',
        id: '',
        idArr: []
      }
    }
  },
  watch: {
    'dataForm.outstationLocation': function() {

    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      getAllOrg().then(res => {
        res.data.forEach(item => {
          item.value = item.id
          item.label = item.organizationName
        })
        this.tableData = this.toTree(res.data)
        this.treeData = this.tableData[0]
      })
    },
    handleCreate() {
      this.resetForm()
      this.dialogForm.visible = true
      this.dialogForm.title = '新增一级机构'
      this.dialogForm.type = 'add'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          orgCreate(this.dataForm).then(() => {
            this.dialogForm.visible = false
            this.getList()
            this.$notify.success({
              title: '成功',
              message: '机构添加成功!'
            })
          })
        }
      })
    },
    handleSaveChild(info) {
      this.resetForm()
      this.dialogForm.visible = true
      this.dialogForm.title = '新增下级机构'
      this.dialogForm.type = 'add'
      this.dataForm.pid = info.id
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(info) {
      this.resetForm()
      this.dialogForm.visible = true
      this.dialogForm.title = '编辑机构'
      this.dialogForm.type = 'edit'
      getOrgById(info.id).then(res => {
        this.dataForm = res.data
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          orgEdit(this.dataForm).then(() => {
            this.dialogForm.visible = false
            this.getList()
            this.$notify.success({
              title: '成功',
              message: '编辑成功!'
            })
          })
        }
      })
    },
    handleView(info) {
      this.detailForm.visible = true
      this.detailForm.title = '查看机构'
      getOrgById(info.id).then(res => {
        this.dataForm = res.data
      })
    },
    handleDelete(info) {
      if (info.children) {
        this.$message.error('有下级机构，不能删除', 2000)
        return true
      }
      this.$confirm('确认删除' + info.organizationName + '？').then(() => {
        orgDelete(info.id).then(res => {
          this.getList()
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
        })
      })
    },
    resetForm() {
      this.dataForm = {
        pid: '',
        organizationName: '',
        commandOfficer: '',
        politicalCommissar: '',
        outstationLocation: '',
        outstationName: '',
        viewCode: '',
        organizationDescription: ''
      }
    },
    chosePeople(type, val) {
      this.dialogUserVisible = true
      this.peopleType = type
      this.msg.id = val
      this.$refs.peopleSelect.open()
    },
    handOperateCoords() {
      this.mapDataDisplayType = 'create'
      if (this.dataForm.outstationLocation.length > 0) {
        this.mapDataDisplayType = 'update'
      }
      this.$refs.coords.dialogVisible = true
    },
    handleMapView() {
      this.mapDataDisplayType = 'view'
      this.$refs.coords.dialogVisible = true
    },
    handleRegionOK(res) {
      this.dataForm.outstationLocation = JSON.stringify(res)
    },
    peopleSelect(info) {
      console.log(this.peopleType)
      if (this.peopleType === 'politicalCommissar') {
        this.dataForm.politicalCommissar = info[0].id
        this.dataForm.politicalCommissarName = info[0].name
      } else {
        this.dataForm.commandOfficer = info[0].id
        this.dataForm.commandOfficerName = info[0].name
      }
      this.dialogUserVisible = false
    },
    toTree(data) {
      const result = []
      if (!Array.isArray(data)) {
        return result
      }
      data.forEach(item => {
        delete item.children
      })
      const map = {}
      data.forEach(item => {
        map[item.id] = item
      })
      data.forEach(item => {
        const parent = map[item.pid]
        if (parent) {
          (parent.children || (parent.children = [])).push(item)
        } else {
          result.push(item)
        }
      })
      return result
    }
  }
}
</script>

<style>
  .form-suffix .el-input__inner {
    padding-right: 76px;
  }
</style>
