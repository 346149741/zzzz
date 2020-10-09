<template>
  <div class="app-container">
    <el-card class="app-body">
      <div
        slot="header"
        class="clearfix"
      >
        <span>训练考核</span>
      </div>
      <!--搜索条件-->
      <div class="filter-container">
        <el-form
          :inline="true"
          class="demo-form-inline"
        >
          <el-form-item
            label="考核类型:"
            class="filter-item"
          >
            <el-select
              v-model="listQuery.params.unit"
              placeholder="请选择考核类型"
              clearable
              class="filter-item mr10"
            >
              <el-option
                v-for="item in khlxList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="考核对象:"
            class="filter-item"
          >
            <el-select
              v-model="listQuery.params.unit"
              placeholder="请选择考核对象"
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
            label="考核时间："
            class="filter-item"
          >
            <el-date-picker
              v-model="listQuery.params.trainTime"
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
            >{{ $t('table.search') }}</el-button>
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconsousuo"
              @click="handleCreate"
            >创建考核</el-button>

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
          align="center"
          label="序号"
        >
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="考核类型"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.khlx }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="考核对象"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.khdx }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="考核内容"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.khnr }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="考核要求"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.khyq }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="考核时间"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.khsj }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="考核地点"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.khdd }}</span>
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
          align="center"
          :label="$t('table.actions')"
          class-name="small-padding fixed-width"
          width="200px"
          fixed="right"
        >
          <template slot-scope="scope">
            <div class="t-col-operate">
              <el-button
                class="el-button--primary"
                size="small"
                @click="handleView(scope.row)"
              >详情</el-button>
              <el-button
                class="el-button--primary"
                size="small"
                @click="handleEdit(scope.row)"
              >编辑</el-button>
              <el-button
                class="el-button--primary"
                size="small"
                @click="handleDelete(scope.row)"
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
    </el-card>

    <!--新增/修改弹出层-->
    <el-dialog
      class="abow_dialog"
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="600px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form
            ref="dataForm"
            :rules="rules"
            :model="form"
            label-width="120px"
          >
            <el-row :gutter="20">
              <el-col
                :md="24"
                :lg="24"
              >
                <el-form-item
                  label="考核类型："
                  prop="code"
                >
                  <el-select
                    v-model="listQuery.params.unit"
                    placeholder="请选择考核类型"
                    clearable
                    class="form-item1"
                  >
                    <el-option
                      v-for="item in khlxList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="考核对象："
                  prop="code"
                >
                  <el-select
                    v-model="listQuery.params.unit"
                    placeholder="请选择考核对象"
                    clearable
                    class="form-item1"
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
                  label="考核时间："
                  prop="code"
                >
                  <el-date-picker
                    v-model="listQuery.params.trainTime"
                    class="form-item1"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  />
                </el-form-item>
                <el-form-item
                  label="考核内容："
                  prop="code"
                >
                  <el-input
                    v-model="form.code"
                    class="form-item1"
                    placeholder="请输入考核内容："
                    :disabled="dialogStatus =='view'"
                  />
                </el-form-item>
                <el-form-item
                  label="考核要求："
                  prop="code"
                >
                  <el-input
                    v-model="form.code"
                    class="form-item1"
                    placeholder="请输入考核要求："
                    :disabled="dialogStatus =='view'"
                  />
                </el-form-item>
                <el-form-item
                  label="考核地点："
                  prop="code"
                >
                  <el-input
                    v-model="form.code"
                    class="form-item1"
                    placeholder="请输入考核地点："
                    :disabled="dialogStatus =='view'"
                  />
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
      width="600px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form
            :model="form"
            label-width="120px"
          >
            <el-row :gutter="20">
              <el-col
                :md="24"
                :lg="24"
              >
                <el-form-item label="考核类型：">普考</el-form-item>
              </el-col>
              <el-col
                :md="24"
                :lg="24"
              >
                <el-form-item label="考核对象：">
                  第129师
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col
                :md="24"
                :lg="24"
              >
                <el-form-item label="考核时间：">2020-02-02 10:00:00</el-form-item>
              </el-col>
              <el-col
                :md="24"
                :lg="24"
              >
                <el-form-item label="考核内容">
                  年度规定的训练科（课）目
                </el-form-item>
              </el-col>
              <el-col
                :md="24"
                :lg="24"
              >
                <el-form-item label="考核要求">
                  按照军事训练大纲要求
                </el-form-item>
              </el-col>
              <el-col
                :md="24"
                :lg="24"
              >
                <el-form-item label="考核地点">
                  综合训练场
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
  name: 'Xl',
  components: {},
  filters: {},
  data() {
    return {
      transferValue: '',
      selectList: [],
      registerTime: null,
      khlxList: [
        { key: '普考', value: '普考' },
        { key: '抽考', value: '抽考' }
      ],
      unitList: [
        { key: '司令部', value: '司令部' },
        { key: '政治部', value: '政治部' },
        { key: '后勤部', value: '后勤部' },
        { key: '参谋部', value: '参谋部' }
      ],
      subjectList: [
        { key: '体能', value: '体能' },
        { key: '技能', value: '技能' },
        { key: '操法', value: '操法' },
        { key: '装备操作', value: '装备操作' },
        { key: '武装越野', value: '武装越野' }
      ],
      contentList: [
        { key: '仰卧起坐', value: '仰卧起坐' },
        { key: '5000米负重', value: '5000米负重' },
        { key: '60米肩梯', value: '60米肩梯' },
        { key: '10楼负重', value: '10楼负重' },
        { key: '5*40折返跑', value: '5*40折返跑' }
      ],
      tableKey: 0,
      list: [
        {
          khlx: '普考',
          khdx: '第53团26营',
          khnr: '年度规定的训练科（课）目',
          khyq: '按照军事训练大纲要求',
          khsj: '2019-01-02 08:00-09:00',
          khdd: '综合训练场',
          zt: '已结束'
        },
        {
          khlx: '抽考',
          khdx: '第127师',
          khnr: '战斗运动',
          khyq: '按照军事训练大纲要求',
          khsj: '2020-11-02 09:00-11:00',
          khdd: '综合训练场',
          zt: '未开始'
        },
        {
          khlx: '普考',
          khdx: '第53团12营',
          khnr: '年度规定的训练科（课）目',
          khyq: '按照军事训练大纲要求',
          khsj: '2019-11-02 08:00-09:00',
          khdd: '特训中心',
          zt: '已结束'
        }

      ],
      total: null,
      detailList: [
        {
          name: '王建国',
          zhiwu: '作战科科长',
          gangwei: '遥测',
          time: '1分10秒',
          quality: '优秀'
        },
        {
          name: '王建国',
          zhiwu: '作战科科长',
          gangwei: '遥测',
          time: '1分20秒',
          quality: '优秀'
        },
        {
          name: '王建国',
          zhiwu: '作战科科长',
          gangwei: '遥测',
          time: '1分15秒',
          quality: '优秀'
        },
        {
          name: '王建国',
          zhiwu: '作战科科长',
          gangwei: '遥测',
          time: '1分30秒',
          quality: '良好'
        },
        {
          name: '王建国',
          zhiwu: '作战科科长',
          gangwei: '遥测',
          time: '1分45秒',
          quality: '合格'
        }
      ],
      checkdetail: false,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          unit: '',
          content: '',
          subject: '',
          trainTime: ''
        }
      },
      form: {
        code: '',
        type: '',
        name: '',
        model: '',
        brand: '',
        protocolInterface: '',
        port: '',
        ip: '',
        deviceStatus: '', // 设备状态
        useStatus: '' // 设备状态
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
  watch: {
    dialogFormVisible(val) {
      if (!val) {
        // 表单隐藏，清理拾取地图信息，再次打开表单，不选项目可以打开坐标拾取
        this.resetMapOpts()
      }
    }
  },
  created() {},
  methods: {
    // 多选勾选时触发
    handleSelectionChange(val) {
      this.selectList = val.map(function(item) {
        return item.id
      })
    },
    async handleCreate(row) {
      this.dialogStatus = 'create'
      this.form.area = row.area
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    handleDelete(row) {
      this.$notify.success({
        title: '成功',
        message: '删除成功'
      })
    },
    handleEdit(row) {
      this.dialogStatus = 'update'
      this.checkdetail = true
      this.form.title = row.title
      this.form.mark = row.mark
      this.form.useStatus = row.useStatus
    },
    handleView(row) {
      this.checkdetail = true
    }
  }
}
</script>
<style lang="scss" scoped>
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

