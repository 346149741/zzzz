<template>
  <div class="app-container">
    <el-card class="app-body">
      <div
        slot="header"
        class="clearfix"
      >
        <span>训练监管</span>
      </div>
      <!--搜索条件-->
      <div class="filter-container">
        <el-form
          :inline="true"
          class="demo-form-inline"
        >
          <el-form-item
            label="训练兵力:"
            class="filter-item"
          >
            <el-select
              v-model="listQuery.params.unit"
              placeholder="请选择状态"
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
            label="训练场地:"
            class="filter-item"
          >
            <el-input
              v-model="listQuery.params.code"
              placeholder="请输入训练场地"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
            />
          </el-form-item>

          <el-form-item
            label="训练时间："
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
          fixed="left"
        >
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
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
          label="科目名称"
          fixed="left"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.xlkm }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="教练员"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.jly }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="训练场地"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.xlcd }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="训练日期"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.xlrq }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="训练时段"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.xlsd }}</span>
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
                @click="handleVideo(scope.row)"
              >训练视频</el-button>
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
      width="50%"
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
                  label="设备编号"
                  prop="code"
                >
                  <el-input
                    v-model="form.code"
                    class="form-item1"
                    placeholder="请输入设备编号"
                    :disabled="dialogStatus =='view'"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
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
              <el-col
                :md="24"
                :lg="12"
              >
                <span style="font-size:16px;">参加人员(</span><span style="font-size:12px;color:red;">应到35人，实到33人</span><span style="font-size:16px;">)</span>
              </el-col>
            </el-row>
            <el-row>
              <el :span="24">
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
                    label="职务"
                  >
                    <template slot-scope="scope">
                      <span>{{ scope.row.zhiwu }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="岗位"
                  >
                    <template slot-scope="scope">
                      <span>{{ scope.row.gangwei }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    align="center"
                    label="考勤结果"
                  >
                    <template>
                      <span>√</span>
                    </template>
                  </el-table-column>
                </el-table>
              </el>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { SingleCamera_Com } from '@/components/DialogCmpts/pops.js'
import { createPop } from '@/components/DialogCmpts'
export default {
  name: 'CameraManage',
  components: {},
  filters: {},
  data() {
    return {
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
          xlkm: '仰卧起坐',
          cxbl: '一营',
          xlcd: '北华操场',
          jly: '张龙',
          xlrq: '2019-02-01',
          xlsd: '上午'
        },
        {
          xlkm: '5000米负重',
          cxbl: '三营',
          xlcd: '田径场',
          jly: '田亮',
          xlrq: '2019-01-02',
          xlsd: '上午'
        },
        {
          xlkm: '60米肩梯',
          cxbl: '四营',
          xlcd: '训练场',
          jly: '张龙生',
          xlrq: '2019-05-06',
          xlsd: '早上'
        },
        {
          xlkm: '10楼负重',
          cxbl: '一营',
          xlcd: '一号楼',
          jly: '王建国',
          xlrq: '2019-08-10',
          xlsd: '上午'
        },
        {
          xlkm: '5*40折返跑',
          cxbl: '五营',
          xlcd: '田径场',
          jly: '张一',
          xlrq: '2019-04-03',
          xlsd: '下午'
        }
      ],
      total: null,
      detailList: [
        { name: '王建国', zhiwu: '作战科科长', gangwei: '遥测' },
        { name: '王建国', zhiwu: '作战科科长', gangwei: '遥测' },
        { name: '王建国', zhiwu: '作战科科长', gangwei: '遥测' },
        { name: '王建国', zhiwu: '作战科科长', gangwei: '遥测' },
        { name: '王建国', zhiwu: '作战科科长', gangwei: '遥测' }
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
      },
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
      const cmpt = new SingleCamera_Com({
        url: '',
        title: '训练视频',
        img: ''
      })
      createPop(cmpt, 'cameraPopUp')
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

