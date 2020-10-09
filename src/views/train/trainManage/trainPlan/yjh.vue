<template>
  <div>
    <!--搜索条件-->
    <div class="filter-container">
      <el-form
        :inline="true"
        class="demo-form-inline"
      >
        <el-form-item
          label="参训月份:"
          class="filter-item"
        >
          <el-date-picker
            v-model="value2"
            type="month"
            placeholder="选择月"
          />
        </el-form-item>
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
            @click="handleDeit"
          >申请变动</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--分页内容-->
    <el-table
      :key="tableKey"
      :header-cell-style="{background:'#49a9ad',color:'#ffffff','font-size':'14px'}"
      :data="list"
      highlight-current-row
      class="t-bd"
      border
    >
      <el-table-column
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.xs }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="第一周"
        align="center"
        type:html
      >
        <template slot-scope="scope">
          <span>{{ scope.row.dyz }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="第二周"
        align="center"
        type:html
      >
        <template slot-scope="scope">
          <span>{{ scope.row.dez }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="第三周"
        align="center"
        type:html
      >
        <template slot-scope="scope">
          <span>{{ scope.row.dsz }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="第四周"
        align="center"
        width="200px"
        type:html
      >
        <template slot-scope="scope">
          <span>{{ scope.row.dsz }}</span>
        </template>
      </el-table-column>
    </el-table>

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
                <el-form-item label="参训月份：">
                  <el-date-picker
                    v-model="value2"
                    type="month"
                    placeholder="选择月"
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
                <el-form-item label="训练科目：">
                  <el-select
                    v-model="bl4"
                    placeholder="请选择第一周科目"
                    clearable
                    class="filter-item mr10 form-item1"
                    @change="handleFilter"
                  >
                    <el-option
                      v-for="item in xlkmList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    />
                  </el-select>
                  <el-select
                    v-model="bl3"
                    style="margin-top:10px"
                    placeholder="请选择第二周科目"
                    clearable
                    class="filter-item mr10 form-item1"
                    @change="handleFilter"
                  >
                    <el-option
                      v-for="item in xlkmList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    />
                  </el-select>
                  <el-select
                    v-model="bl2"
                    style="margin-top:10px"
                    placeholder="请选择第三周科目"
                    clearable
                    class="filter-item mr10 form-item1"
                    @change="handleFilter"
                  >
                    <el-option
                      v-for="item in xlkmList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    />
                  </el-select>
                  <el-select
                    v-model="bl1"
                    style="margin-top:10px"
                    placeholder="请选择第四周科目"
                    clearable
                    class="filter-item mr10 form-item1"
                    @change="handleFilter"
                  >
                    <el-option
                      v-for="item in xlkmList"
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
                <el-form-item label="质量指标：">
                  <el-input
                    v-model="form.title"
                    class="form-item1"
                    placeholder="请输入质量指标："
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="训练依据：">2021年第一阶段训练计划<span style="color:red;cursor:pointer;"> 查看</span></el-form-item>

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
      class="abow_dialog"
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
                <el-form-item label="参训月份：">
                  <el-date-picker
                    v-model="value2"
                    type="month"
                    placeholder="选择月"
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
                <el-form-item label="训练科目：">
                  <el-select
                    v-model="bl4"
                    placeholder="请选择第一周科目"
                    clearable
                    class="filter-item mr10 form-item1"
                    @change="handleFilter"
                  >
                    <el-option
                      v-for="item in xlkmList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    />
                  </el-select>
                  <el-select
                    v-model="bl3"
                    style="margin-top:10px"
                    placeholder="请选择第二周科目"
                    clearable
                    class="filter-item mr10 form-item1"
                    @change="handleFilter"
                  >
                    <el-option
                      v-for="item in xlkmList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    />
                  </el-select>
                  <el-select
                    v-model="bl2"
                    style="margin-top:10px"
                    placeholder="请选择第三周科目"
                    clearable
                    class="filter-item mr10 form-item1"
                    @change="handleFilter"
                  >
                    <el-option
                      v-for="item in xlkmList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    />
                  </el-select>
                  <el-select
                    v-model="bl1"
                    style="margin-top:10px"
                    placeholder="请选择第四周科目"
                    clearable
                    class="filter-item mr10 form-item1"
                    @change="handleFilter"
                  >
                    <el-option
                      v-for="item in xlkmList"
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
                <el-form-item label="质量指标：">
                  <el-input
                    v-model="form.title"
                    class="form-item1"
                    placeholder="请输入质量指标："
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="训练依据：">2021年第一阶段训练计划<span style="color:red;cursor:pointer;"> 查看</span></el-form-item>

              </el-col>
            </el-row>
            <el-row style="margin-bottom: 17px;margin-left: 65px;">
              <div><span>——————————————训练任务变动——————————————</span></div>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="变动内容">
                  <el-input
                    class="form-item1"
                    placeholder="请输入质量指标："
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="变动事由">
                  <el-input
                    class="form-item1"
                    placeholder="请输入质量指标："
                  />
                </el-form-item>
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
      value2: '',
      date: '',
      year: '',
      bl: '',
      bl1: '',
      bl2: '',
      bl3: '',
      bl4: '',
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
          xs: '集中训练',
          dyz: '停止间转法\n实弹射击\n战斗运动\n仰卧起坐\n30米X2蛇形跑',
          dez: '400米疏散物资\n实弹射击\n列队训练\n仰卧起坐\n3000米跑',
          dsz: '实弹射击\n60米肩梯跑\n列队训练\n仰卧起坐\n100米负重',
          dsz: '3000米跑\n400米疏散物资\n战斗运动\n仰卧起坐\n停止间转法'
        },
        {
          xs: '知识讲座',
          dyz: '政治学习\n党团活动\n国防法规\n国际战略环境\n高技术战争',
          dez: '政治学习\n党团活动\n军事思想\n现代国防\n战伤救护',
          dsz:
            '政治学习\n党团活动\n单兵战术\n视图用图\n人民军队的性质、宗旨和光荣传统',
          dsz: '政治学习\n党团活动\n单兵战术\n军事思想\n高技术战争'
        }
      ],
      xlkmList: [
        { key: '停止间转法', value: '停止间转法' },
        { key: '实弹射击', value: '实弹射击' },
        { key: '战斗运动', value: '战斗运动' },
        { key: '仰卧起坐', value: '仰卧起坐' },
        { key: '30米*2蛇形跑', value: '30米*2蛇形跑' },
        { key: '3000米跑', value: '3000米跑' }
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
        update: '申请变动',
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
/deep/ .el-table th {
  border: 1px solid #dfe6ec;
}
/deep/ .el-table .cell {
  white-space: pre-line;
}
/deep/ .el-table__header thead tr:first-of-type th:first-of-type:before {
  content: "形式";
  text-align: center;
  position: absolute;
  width: 152px;
  height: 1px;
  bottom: 25px;
  right: 15px;
}

/deep/ .el-table__header thead tr:first-of-type th:first-of-type:after {
  content: "时间";
  text-align: center;
  position: absolute;
  width: 152px;
  top: 2px;
  left: 0;
}
/deep/ .el-table__header thead tr:first-of-type th:first-of-type .cell {
  position: absolute;
  top: 0;
  left: 0;
  width: 152px;
  height: 1px;
  background-color: #ebeef5;
  display: block;
  text-align: center;
  transform: rotate(22deg);
  transform-origin: top left;
  -ms-transform: rotate(22deg);
  -ms-transform-origin: top left;
  -webkit-transform: rotate(22deg);
  -webkit-transform-origin: top left;
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

