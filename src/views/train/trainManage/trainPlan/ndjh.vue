<template>
  <div>
    <!--搜索条件-->
    <div class="filter-container">
      <el-form
        :inline="true"
        class="demo-form-inline"
      >
        <el-form-item
          label="参训年度:"
          class="filter-item"
        >
          <el-input
            v-model="listQuery.params.title"
            placeholder="请输入参训年度"
            prefix-icon="el-icon-search"
            class="filter-item mr10"
            @keyup.enter.native="handleFilter"
          />
        </el-form-item>
        <el-form-item
          label="训练单位:"
          class="filter-item"
        >
          <el-input
            v-model="listQuery.params.xldw"
            placeholder="请输入"
            prefix-icon="el-icon-search"
            class="filter-item mr10"
            @keyup.enter.native="handleFilter"
          />
        </el-form-item>
        <el-form-item
          label="状态:"
          class="filter-item"
        >
          <el-select
            v-model="listQuery.params.status"
            placeholder="请选择状态"
            clearable
            class="filter-item mr10"
            @change="handleFilter"
          >
            <el-option
              v-for="item in statusList"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
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
            class="filter-item btn-base"
            type="primary"
            icon="mr10 iconfont iconxinzengh"
            @click="handleCreate"
          >新增计划</el-button>
          <el-button
            class="filter-item btn-base"
            type="primary"
            icon="mr10 iconfont iconxinzengh"
          >数据导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--分页内容-->
    <el-table
      :key="tableKey"
      :header-cell-style="{background:'#FAFAFA',color:'#A2A2B2','font-size':'14px'}"
      stripe
      :data="list"
      highlight-current-row
      class="t-bd"
      border
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        align="center"
        label="序号"
        fixed="left"
      >
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="发布日期"
        fixed="left"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.fbrq }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="参训年度"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.cxnd }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="参训兵力"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.cxbl }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="训练时间"
        align="center"
        width="200px"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.xlsj }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="训练内容"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.xlnr }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="质量指标"
        align="center"
        width="200px"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.zlzb }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.zt }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="最后更新"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.zhgx }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        class-name="small-padding fixed-width"
        fixed="right"
        label="操作"
        width="220px"
      >
        <template slot-scope="scope">
          <div class="t-col-operate">
            <el-button
              type="primary"
              size="mini"
              @click="handleView(scope.row)"
            >详情</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="handleDeit(scope.row)"
            >编辑</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="deleteRow(scope.$index, list)"
            >删除</el-button>
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
      />
    </div>
    <!--添加媒体库-->
    <el-dialog
      class="abow_dialog"
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="650px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form
            ref="dataForm"
            :model="form"
            label-width="120px"
          >
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="参训年度：">
                  <el-date-picker
                    v-model="year"
                    type="year"
                    class="form-item1"
                    placeholder="选择年"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="参训兵力：">
                  <el-select
                    v-model="bl"
                    placeholder="请选择兵力"
                    clearable
                    class="filter-item mr10 form-item1"
                    @change="handleFilter"
                  >
                    <el-option
                      v-for="item in blList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="训练时间">
                  <el-date-picker
                    v-model="date"
                    type="daterange"
                    class="form-item1"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="训练内容：">
                  <el-input
                    v-model="form.title"
                    class="form-item1"
                    placeholder="请输入内容"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="训练指标：">
                  <el-input
                    v-model="form.title"
                    class="form-item1"
                    placeholder="请输入训练指标："
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="培养计划：">
                  <el-upload
                    class="upload-demo btn-base"
                    multiple
                    :limit="3"
                    action=""
                  >
                    <el-button
                      size="small"
                      type="primary"
                    >上传附件</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div
        v-if="dialogStatus!=='view'"
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          v-if="dialogStatus=='create'"
          type="primary"
          @click="createData"
        >{{ $t('table.confirm') }}</el-button>
        <el-button
          v-else
          type="primary"
          @click="updateData"
        >{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <!--详情查看-->
    <el-dialog
      class="abow_dialog detail-form"
      :title="textMap[dialogStatus]"
      :visible.sync="checkdetail"
      :close-on-click-modal="false"
      width="650px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form
            :model="form"
            label-width="120px"
          >
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="参训年度：">2021年度训练计划</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="参训兵力">
                  第129师
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="训练时间">
                  2021-03-01至2021-12-31
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="训练内容">
                  2021年军事训练大纲
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="训练指标">
                  综合成绩必须达到及格以上标准
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="训练大纲"><span style="color:red;cursor:pointer;">2021年军事训练大纲</span></el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-bottom: 17px;margin-left: 65px;">
              <div><span>——————————————训练任务变动——————————————</span></div>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="变动内容" />
              </el-col>
              <el-col :span="24">
                <el-form-item label="变动事由" />
              </el-col>
              <el-col :span="24">
                <el-form-item label="变动材料">
                  <el-upload
                    v-if="dialogStatus=='update'"
                    class="upload-demo btn-base"
                    style="float:right;"
                    multiple
                    :limit="3"
                    action=""
                  >
                    <el-button
                      size="small"
                      type="primary"
                    >上传附件</el-button>
                  </el-upload>
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
export default {
  name: 'CameraManage',
  components: {},
  filters: {},
  data() {
    return {
      date: '',
      year: '',
      bl: '',
      registerTime: '',
      transferValue: '',
      blList: [
        { key: '第129师', value: '第129师' },
        { key: '第36师', value: '第36师' },
        { key: '第56师', value: '第56师' }
      ],
      statusList: [
        { key: '未开始', value: '未开始' },
        { key: '进行中', value: '进行中' },
        { key: '已结束', value: '已结束' }
      ],
      tableKey: 0,
      list: [
        {
          fbrq: '2021-12-01',
          cxnd: '2021',
          cxbl: '第36师',
          xlsj: '2021-12-23至2021-12-31',
          xlnr: '2021年军事大纲',
          zlzb: '综合成绩必须达到及格及以上标准',
          zt: '未开始',
          zhgx: '2021-12-02'
        },
        {
          fbrq: '2020-12-01',
          cxnd: '2020',
          cxbl: '第135师',
          xlsj: '2020-12-23至2020-12-31',
          xlnr: '2020年军事大纲',
          zlzb: '综合成绩必须达到及格及以上标准',
          zt: '进行中',
          zhgx: '2020-12-02'
        },
        {
          fbrq: '2019-12-01',
          cxnd: '2019',
          cxbl: '第52师',
          xlsj: '2019-12-23至2019-12-31',
          xlnr: '2019年军事大纲',
          zlzb: '综合成绩必须达到及格及以上标准',
          zt: '已结束',
          zhgx: '2019-12-02'
        }
      ],
      total: null,
      checkdetail: false,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          area: '',
          isPlaying: false,
          program: ''
        }
      },
      form: {
        title: '',
        isPlaying: false,
        program: '',
        goal:
          '1、培养全面发展型军事人才是打赢现代化战争的关键  2、培养“指技合融”全面型军事人才是实现我军跨越式发展的有力支撑'
      },
      dialogFormVisible: false,
      distribDialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        view: '查看',
        update: '编辑',
        create: '新增计划'
      }
    }
  },
  watch: {},
  created() {},
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    enable(row) {
      // 启用
      this.$notify({
        title: '成功',
        message: '更新成功',
        type: 'success',
        duration: 2000
      })
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
    },
    handleFilter() {
      this.listQuery.pageNo = 1
    },
    resetForm() {
      this.form = {
        area: '',
        isPlaying: false,
        program: ''
      }
    },
    async handleCreate(row) {
      this.resetForm()
      this.dialogStatus = 'create'
      this.form.area = row.area
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    addClickRegion(name) {
      this.list.push({ area: name, program: '', isPlaying: false })
    },
    createData() {
      this.list.push({
        title: this.form.title,
        publishTime: '2020-09-18',
        publishpeople: '王建国',
        status: '待审核'
      })
      this.$notify.success({
        title: '成功',
        message: '选择成功!'
      })
      this.dialogFormVisible = false
    },
    selectProgram(row) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.form.isPlaying = row.isPlaying
      this.form.area = row.area
      this.form.program = row.program
    },
    updateData() {
      var me = this
      this.list.forEach((item, index) => {
        if (item.area === me.form.area) {
          item.program = me.form.program
        }
      })
      this.dialogFormVisible = false
      this.$notify({
        title: '成功',
        message: '更新成功',
        type: 'success',
        duration: 2000
      })
    },
    handleDelete(row) {
      this.$notify.success({
        title: '成功',
        message: '删除成功'
      })
    },
    handleView(row) {
      this.dialogStatus = 'view'
      this.checkdetail = true
      this.form.title = row.title
      this.form.mark = row.mark
      this.form.useStatus = row.useStatus
    },
    handleDeit(row) {
      this.dialogStatus = 'update'
      this.checkdetail = true
      this.form.title = row.title
      this.form.mark = row.mark
      this.form.useStatus = row.useStatus
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-form-item {
  margin-bottom: 10px !important;
}
.detail-form .el-textarea__inner {
  border: none !important;
}
.el-textarea__inner {
  height: 200px !important;
}
.transfer-footer {
  margin-left: 20px;
  padding: 6px 5px;
}
.dialog-item {
  margin: 0px 48px 0px 48px !important;
}

.list-query {
  width: 340px;
  margin-right: 22px;
}
.t-col-operate i.table-i {
  margin-right: 0px;
}
// .el-col {
//   margin-right: 20px;
//   &:last-child {
//     margin-right: 0;
//   }
// }
.area {
  text-align: center;
  margin-bottom: 10px;
  height: 25px;
}

.area .area-icon {
  margin: 0 5px;
}

.retate {
  transform: rotate(180deg);
}

.el-button + .el-button {
  margin-left: 0px !important;
}

.el-tag-info {
  margin: 2px;
}

.map-footer {
  text-align: center;
}

.map-footer .el-button {
  margin: 20px 15px 0px;
}
</style>

