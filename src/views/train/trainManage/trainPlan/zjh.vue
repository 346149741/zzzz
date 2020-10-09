<template>
  <div>
    <!--搜索条件-->
    <div class="filter-container">
      <el-form
        :inline="true"
        class="demo-form-inline"
      >
        <el-form-item
          label="参训周期："
          class="filter-item"
        >
          <el-date-picker
            v-model="value2"
            type="week"
            format="yyyy 第 WW 周"
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
        label="日期"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.rq }}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="120"
        align="center"
        label="星期"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.xq }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="早操"
        align="center"
        type:html
      >
        <template slot-scope="scope">
          <span>{{ scope.row.zc }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="上午"
        align="center"
        type:html
      >
        <template slot-scope="scope">
          <span>{{ scope.row.sw }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="下午"
        align="center"
        type:html
      >
        <template slot-scope="scope">
          <span>{{ scope.row.xw }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="晚上"
        align="center"
        width="200px"
        type:html
      >
        <template slot-scope="scope">
          <span>{{ scope.row.ws }}</span>
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
                <el-form-item
                  label="参训周期："
                  class="filter-item"
                >
                  <el-date-picker
                    v-model="value2"
                    type="week"
                    format="yyyy 第 WW 周"
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
                    placeholder="请选择周一科目"
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
                    v-model="bl5"
                    style="margin-top:10px"
                    placeholder="请选择周二科目"
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
                    v-model="bl6"
                    style="margin-top:10px"
                    placeholder="请选择周三科目"
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
                    v-model="bl7"
                    style="margin-top:10px"
                    placeholder="请选择周四科目"
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
                    placeholder="请选择周五科目"
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
                    placeholder="请选择周六科目"
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
                    placeholder="请选择周日科目"
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
                <el-form-item
                  label="参训周期："
                  class="filter-item"
                >
                  <el-date-picker
                    v-model="value2"
                    type="week"
                    format="yyyy 第 WW 周"
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
                    placeholder="请选择周一科目"
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
                    v-model="bl5"
                    style="margin-top:10px"
                    placeholder="请选择周二科目"
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
                    v-model="bl6"
                    style="margin-top:10px"
                    placeholder="请选择周三科目"
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
                    v-model="bl7"
                    style="margin-top:10px"
                    placeholder="请选择周四科目"
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
                    placeholder="请选择周五科目"
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
                    placeholder="请选择周六科目"
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
                    placeholder="请选择周日科目"
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
      bl5: '',
      bl6: '',
      bl7: '',
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
          rq: '03-01  ',
          xq: '一',
          zc: '3000米跑',
          sw: '停止间转法\n单兵战术',
          xw: '实弹射击\n国防法规',
          ws: '政治学习\n党团活动'
        },
        {
          rq: '03-02',
          xq: '二',
          zc: '100米负重',
          sw: '400米输送物资\n战斗运动',
          xw: '高技术战争\n60米肩梯跑',
          ws: '政治学习\n党团活动'
        },
        {
          rq: '03-03',
          xq: '三',
          zc: '列队训练',
          sw: '400米输送物资\n仰卧起坐',
          xw: '高技术战争\n单兵战术',
          ws: '政治学习\n党团活动'
        },
        {
          rq: '03-04',
          xq: '四',
          zc: '列队训练',
          sw: '人民军队的性质、宗旨和光荣传统\n实弹射击',
          xw: '战斗运动\n仰卧起坐',
          ws: '政治学习\n党团活动'
        },
        {
          rq: '03-05',
          xq: '五',
          zc: '仰卧起坐',
          sw: '300米跑\n停止间转法',
          xw: '实弹射击\n军事思想',
          ws: '政治学习\n党团活动'
        },
        {
          rq: '03-06',
          xq: '六',
          zc: '仰卧起坐',
          sw: '30米X2蛇形跑\n视图用图',
          xw: '国际战略环境\n战伤救护',
          ws: '政治学习\n党团活动'
        },
        {
          rq: '03-07',
          xq: '日',
          zc: '整理内务',
          sw: '军事思想',
          xw: '现代国防',
          ws: '政治学习\n党团活动'
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

