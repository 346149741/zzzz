<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>反无人机设备布防</span>
      </div>
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="设备编号：" class="filter-item">
            <el-input
              v-model="listQuery.params.a"
              type="text"
              class="filter-item"
              placeholder="请输入设备编号"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="设备名称：" class="filter-item">
            <el-input
              v-model="listQuery.params.c"
              type="text"
              class="filter-item"
              placeholder="请输入设备名称"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="布防时间：" class="filter-item">
            <el-date-picker
              v-model="listQuery.params.value1"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item label="布防状态：" class="filter-item">
            <el-select
              v-model="listQuery.params.isshenpi"
              clearable
              class="form-item"
              placeholder="请选择布防状态"
            >
              <el-option label="布防" value="已通过1" />
              <el-option label="撤防" value="未通过2" />
            </el-select>
          </el-form-item>
          <el-form-item class="filter-item">
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont el-icon-search"
              @click="handleFilter"
            >{{ $t('table.search') }}
            </el-button>
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont el-icon-folder-add"
              @click="handleCreate"
            >新增
            </el-button>
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconxinzengh"
            >一键联动
            </el-button>
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconxinzengh"
            >一键布防
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table v-loading="listLoading" stripe :data="list" class="t-bd" fit highlight-current-row>
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="ID" width="50" />
        <el-table-column property="a" label="设备编号" />
        <el-table-column property="b" label="设备名称" />
        <el-table-column property="c" label="布防位置" />
        <el-table-column property="d" label="布防时间" />
        <el-table-column property="e" label="撤防时间" />
        <el-table-column property="f" label="布防状态" />
        <el-table-column property="g" label="设备联动">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.g"
              active-color="#42B983"
              inactive-color="#A2A9BA"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <div class="t-col-operate">
              <i
                class="el-icon-tickets primary table-i"
                title="详情"
                @click="details(1,scope.row.a,scope.row)"
              />
              <i
                class="el-icon-edit-outline warning table-i"
                title="编辑"
                @click="details(2,scope.row.a,scope.row)"
              />
              <i
                v-if="scope.row.f!=='布防'"
                class="iconfont iconjuecezhichi info table-i"
                title="布防"
                @click="details(2,scope.row.a,scope.row)"
              />
              <i
                v-else
                class="iconfont iconjuecezhichi  table-i"
                title="撤防"
                @click="details(2,scope.row.a,scope.row)"
              />
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
    <!--查看-->
    <el-dialog
      class="abow_dialog detail-form"
      title="详情"
      :visible.sync="dialog"
      :close-on-click-modal="false"
      width="800px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form :model="form" label-position="right" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="序号：">1</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="设备编号：">{{ form.a }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="设备名称：">{{ form.b }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="布防位置：">{{ form.c }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取消</el-button>
        <el-button type="primary" @click="dialog = false">确定</el-button>
      </div>
    </el-dialog>
    <!--编辑-->
    <el-dialog
      class="abow_dialog "
      :title="title"
      :visible.sync="dialog2"
      :close-on-click-modal="false"
      width="800px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form :model="form" label-position="right" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="设备编号：">
                  <el-input v-model="form.a" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="设备名称：">
                  <el-input v-model="form.b" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="布防位置：">
                  <el-input v-model="form.c" class="form-item1">
                    <i slot="suffix" class="el-input__icon el-input_txt" @click="handleOptCoord">拾取位置</i>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog2 = false">取消</el-button>
        <el-button type="primary" @click="dialog2 = false">确定</el-button>
      </div>
    </el-dialog>
    <CoordinatesPickerCmpt ref="coords" data-type="Point" :display-type="mapDataDisplayType" :coords="form.location" @handleOK="handleRegionOK" />
  </div>
</template>
<script>
import CoordinatesPickerCmpt from '@/components/OLMap/service/CoordinatesPickerCmpt'
export default {
  components: { CoordinatesPickerCmpt },
  data() {
    return {
      mapDataDisplayType: 'create',
      title: '编辑',
      treeData: [],
      value1: null,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          b: ''
        }
      },
      list: [
        {
          a: 'FZLD-00001',
          b: '无人机反制探测雷达',
          c: '[116.404844,39.913828]',
          d: '2020-02-02 20:20:20',
          e: '——',
          f: '布防',
          g: true
        }, {
          a: 'FZLD-00002',
          b: '无人机反制光电探测器',
          c: '[116.404844,39.913828]',
          d: '——',
          e: '2020-02-02 20:20:20',
          f: '撤防',
          g: false
        }
      ],
      form: {
        a: '',
        b: '',
        c: ''
      },
      total: null, // 总数
      listLoading: false,
      dialog: false,
      dialog2: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleRegionOK(res) {
      if (res.length === 2) res[2] = 0
      this.form.c = JSON.stringify(res)
    },
    handleOptCoord() {
      this.mapDataDisplayType = 'create'
      if (this.form.c.length > 0) {
        this.mapDataDisplayType = 'update'
      }
      this.$refs.coords.dialogVisible = true
    },
    handleCreate() {
      this.title = '新增'
      this.dialog2 = true
      this.form = {
        c: ''
      }
    },
    getList() { },
    cascaderRadioClick(val, name) {
      this.listQuery.params.b = val
    },
    handleFilter() {
      this.listQuery.pageNo = 1
    },
    details(e, id, row) {
      debugger
      if (e === 1) {
        this.dialog = true
      } else {
        this.title = '编辑'
        this.dialog2 = true
      }
      this.getdetails(id)
      this.form = { ...row }
    },
    getdetails(id) {
      // floorget(id).then((response) => {
      //   this.ruleForm = response.data
      // })
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.getList()
    }
  }
}
</script>
<style scoped>
  .photo {
    width: 100px;
    height: 100px;
  }
</style>
