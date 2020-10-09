<template>
  <div class="app-container">
    <el-card class="app-body">
      <div
        slot="header"
        class="clearfix"
      >
        <span>成绩评估</span>
      </div>
      <!--搜索条件-->
      <div class="filter-container">
        <el-form
          :inline="true"
          class="demo-form-inline"
        >
          <el-form-item
            label="评估对象:"
            class="filter-item"
          >
            <el-select
              v-model="listQuery.params.unit"
              placeholder="请选择评估对象"
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
            label="评估时间:"
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
              @click="CJLR"
            >成绩录入</el-button>
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
          label="评估对象"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.khdx }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="评估内容"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.khnr }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="评估要求"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.khyq }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="评估时间"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.khsj }}</span>
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
          fixed="right"
        >
          <template slot-scope="scope">
            <div class="t-col-operate">
              <el-button
                class="el-button--primary"
                size="small"
                @click="handleView(scope.row)"
              >成绩详情</el-button>
              <el-button
                class="el-button--primary"
                size="small"
                @click="TJGL(scope.row)"
              >统计概览</el-button>
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
      title="统计概览"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="1100px"
    >
      <xxtj />
    </el-dialog>
    <!--详情查看-->
    <el-dialog
      class="abow_dialog"
      :title="textMap[dialogStatus]"
      :visible.sync="checkdetail"
      :close-on-click-modal="false"
      width="50%"
    >
      <div class="dialog-item">
        <el-form
          :model="form"
          label-width="120px"
        >
          <el-form-item
            v-if="dialogStatus != 'view'"
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
          <el-row>
            <el-col :span="24">
              <!--分页内容-->
              <el-table
                :key="tableKey"
                :header-cell-style="{background:'#FAFAFA',color:'#A2A2B2','font-size':'14px'}"
                stripe
                :data="detailList"
                highlight-current-row
                class="t-bd"
                border
                @selection-change="handleSelectionChange"
              >
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
                  align="center"
                  label="姓名"
                  fixed="left"
                  width="140px"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="个人训练成绩"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.grxlcj }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="战术训练成绩"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.zsxlcj }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="个人年度成绩"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.grndcj }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="单位单科目成绩"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.dwdkmcj }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="综合评定"
                >
                  <template slot-scope="scope">
                    <span>{{ scope.row.zhpd }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { SingleCamera_Com } from '@/components/DialogCmpts/pops.js'
import { createPop } from '@/components/DialogCmpts'
import xxtj from './xxtj.vue'
export default {
  name: 'CameraManage',
  components: { xxtj },
  filters: {},
  data() {
    return {
      dialogStatus: '',
      textMap: {
        view: '成绩详情',
        update: '编辑',
        create: '成绩录入'
      },
      selectList: [],
      registerTime: null,
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
          name: '张建国',
          grxlcj: '88，良好',
          zsxlcj: '96，优秀',
          grndcj: '93，优秀',
          dwdkmcj: '96，优秀',
          zhpd: '优秀'
        },
        {
          name: '王强',
          grxlcj: '73，及格',
          zsxlcj: '92，优秀',
          grndcj: '88，良好',
          dwdkmcj: '86，良好',
          zhpd: '良好'
        },
        {
          name: '李娟',
          grxlcj: '91，优秀',
          zsxlcj: '78，良好',
          grndcj: '85，良好',
          dwdkmcj: '85，良好',
          zhpd: '优秀'
        },
        {
          name: '张帆',
          grxlcj: '79，良好',
          zsxlcj: '86，良好',
          grndcj: '75，及格',
          dwdkmcj: '88，良好',
          zhpd: '良好'
        },
        {
          name: '刘国义',
          grxlcj: '89，良好',
          zsxlcj: '92，优秀',
          grndcj: '96，优秀',
          dwdkmcj: '98，优秀',
          zhpd: '优秀'
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
      rules: {
        code: [{ required: true, message: '请填写设备编号', trigger: 'blur' }],
        name: [{ required: true, message: '请填写设备名称', trigger: 'blur' }],
        type: [{ required: true, message: '请填写设备类型', trigger: 'blur' }],
        brand: [{ required: true, message: '请选择设备品牌', trigger: 'blur' }],
        ip: [{ required: true, message: '请填写ip', trigger: 'blur' }],
        port: [{ required: true, message: '请填写端口', trigger: 'blur' }]
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
    handleVideo(url) {
      const cmpt = new SingleCamera_Com({ url: '', title: '训练视频' })
      createPop(cmpt, 'cameraPopUp')
    },
    TJGL(row) {
      this.dialogFormVisible = true
    },
    handleDelete(row) {
      this.$notify.success({
        title: '成功',
        message: '删除成功'
      })
    },
    CJLR() {
      this.dialogStatus = 'create'
      this.checkdetail = true
    },
    handleView(row) {
      this.dialogStatus = 'view'
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
/deep/ .dialog-item{
      margin: 0 30px;
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

