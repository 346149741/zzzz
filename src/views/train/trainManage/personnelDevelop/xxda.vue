<template>
  <div>
    <!--搜索条件-->
    <div class="filter-container">
      <el-form
        :inline="true"
        class="demo-form-inline"
      >
        <el-form-item
          label="姓名:"
          class="filter-item"
        >
          <el-input
            v-model="listQuery.params.title"
            placeholder="请输入姓名"
            prefix-icon="el-icon-search"
            class="filter-item mr10"
            @keyup.enter.native="handleFilter"
          />
        </el-form-item>
        <el-form-item
          label="发布单位:"
          class="filter-item"
        >
          <el-select
            v-model="listQuery.params.unit"
            placeholder="请选择发布单位"
            clearable
            class="filter-item mr10"
          >
            <el-option
              v-for="item in unitList"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="人才类型:"
          class="filter-item"
        >
          <el-select
            v-model="listQuery.params.rc"
            placeholder="请选择人才类型"
            clearable
            class="filter-item mr10"
          >
            <el-option
              v-for="item in rclxList"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="评选时间："
          class="filter-item"
        >
          <el-date-picker
            v-model="registerTime"
            type="date"
            placeholder="选择日期"
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
            class="filter-item btn-base"
            type="primary"
            icon="mr10 iconfont iconxinzengh"
            @click="handleCreate"
          >推选人才</el-button>

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
        label="姓名"
        fixed="left"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.xm }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="性别"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.xb }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="出生日期"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.csrq }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="身份证号"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.sfzh }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="籍贯"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.jg }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="政治面貌"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.zzmm }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="所在营区"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.szyq }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="人才类型"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.rclx }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="推选时间"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.txsj }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        class-name="small-padding fixed-width"
        fixed="right"
        label="操作"
        width="160px"
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
                <el-form-item label="姓名">
                  <el-input
                    v-model="form.title"
                    class="form-item1"
                    placeholder="请输入姓名"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="性别">
                  <el-radio v-model="radio" label="1">男</el-radio>
                  <el-radio v-model="radio" label="2">女</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="出生日期">
                  <el-input
                    v-model="form.title"
                    class="form-item1"
                    placeholder="请输入出生日期"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="身份证号">
                  <el-input
                    v-model="form.title"
                    class="form-item1"
                    placeholder="请输入身份证号"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="籍贯">
                  <el-input
                    v-model="form.title"
                    class="form-item1"
                    placeholder="请输入籍贯"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="政治面貌">
                  <el-input
                    v-model="form.title"
                    class="form-item1"
                    placeholder="请输入政治面貌"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="民族">
                  <el-input
                    v-model="form.title"
                    class="form-item1"
                    placeholder="请输入民族"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="人才类型">
                  <el-select
                    v-model="listQuery.params.rc"
                    placeholder="请选择人才类型"
                    clearable
                    class="form-item1"
                  >
                    <el-option
                      v-for="item in rclxList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    />
                  </el-select>
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
      title="查看"
      :visible.sync="checkdetail"
      :close-on-click-modal="false"
      width="50%"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form
            :model="form"
            label-width="120px"
          >
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="姓名：">王建国</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="性别：">
                  男
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="出生日期：">1992-09-01</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="身份证号：">410184199209010478</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="籍贯：">湖南常德</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="政治面貌：">党员</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="民族：">汉</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="人才类型：">高层次人才</el-form-item>
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
      radio: '1',
      registerTime: '',
      transferValue: '',
      sheheList: [
        { key: '张建', value: '张建' },
        { key: '王文国', value: '王文国' },
        { key: '张小川', value: '张小川' }
      ],
      tableKey: 0,
      unitList: [
        { key: '司令部', value: '司令部' },
        { key: '政治部', value: '政治部' },
        { key: '后勤部', value: '后勤部' },
        { key: '参谋部', value: '参谋部' }
      ],
      rclxList: [
        { key: '高层次人才', value: '高层次人才' },
        { key: '拔尖人才', value: '拔尖人才' },
        { key: '专业人才', value: '专业人才' },
        { key: '重点人才', value: '重点人才' }
      ],
      list: [
        {
          xm: '王建国',
          xb: '男',
          csrq: '1992-09-01',
          sfzh: '410184199209016428',
          jg: '湖南常德',
          zzmm: '党员',
          szyq: '八团三营',
          rclx: '高层次人才',
          txsj: '2020-09-18'
        },
        {
          xm: '王世民',
          xb: '男',
          csrq: '1989-10-02',
          sfzh: '410184198910024588',
          jg: '河南郑州',
          zzmm: '党员',
          szyq: '六团五营',
          rclx: '拔尖人才',
          txsj: '2020-09-16'
        },
        {
          xm: '张柳义',
          xb: '男',
          csrq: '1993-06-18',
          sfzh: '410184199306184876',
          jg: '湖南常德',
          zzmm: '党员',
          szyq: '三团四营',
          rclx: '专业人才',
          txsj: '2020-09-18'
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
        create: '新增'
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
      this.checkdetail = true
      this.form.title = row.title
      this.form.mark = row.mark
      this.form.useStatus = row.useStatus
    }
  }
}
</script>
<style lang="scss" scoped>
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

