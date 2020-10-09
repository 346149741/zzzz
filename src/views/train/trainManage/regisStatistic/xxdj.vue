<template>
  <div>

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
            placeholder="请选择兵力"
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
          <el-button
            v-waves
            class="filter-item btn-base"
            type="primary"
            icon="mr10 iconfont iconsousuo"
            @click="handleCreate"
          >信息登记</el-button>
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
        label="训练兵力"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.xlbl }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="平均训练时长(小时)"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.pjsc }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="早操训练"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.zcsc }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="上午训练"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.swsc }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="下午训练"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.xwsc }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="晚上训练"
        align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.wssc }}</span>
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
                  placeholder="请选择兵力"
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
            :data="djlist"
            highlight-current-row
            class="t-bd"
            border
          >
            <el-table-column
              label="参训人员"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.cxry }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="平均训练时长(小时)"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.pjsc }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="早操训练"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.zcsc }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="上午训练"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.swsc }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="下午训练"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.xwsc }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="晚上训练"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.wssc }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
    <!--详情查看-->
    <el-dialog
      class="abow_dialog"
      title="查看"
      :visible.sync="checkdetail"
      :close-on-click-modal="false"
      width="1000px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <xlxq />
        </div>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import { SingleCamera_Com } from '@/components/DialogCmpts/pops.js'
import { createPop } from '@/components/DialogCmpts'
import xlxq from './xlxq.vue'
export default {
  name: 'CameraManage',
  components: { xlxq },
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
          xlbl: '第39团一营',
          pjsc: '5.5',
          zcsc: '0.5',
          swsc: '3',
          xwsc: '1.5',
          wssc: '0.5'
        },
        {
          xlbl: '第31团二营',
          pjsc: '4.3',
          zcsc: '0.3',
          swsc: '2',
          xwsc: '2',
          wssc: '0'
        },
        {
          xlbl: '第56团三营',
          pjsc: '4.3',
          zcsc: '1',
          swsc: '1',
          xwsc: '2',
          wssc: '0.3'
        }
      ],
      djlist: [
        {
          cxry: '张强',
          pjsc: '5.5',
          zcsc: '0.5',
          swsc: '3',
          xwsc: '1.5',
          wssc: '0.5'
        },
        {
          cxry: '王建',
          pjsc: '4.3',
          zcsc: '0.3',
          swsc: '2',
          xwsc: '2',
          wssc: '0'
        },
        {
          cxry: '刘一',
          pjsc: '4.3',
          zcsc: '1',
          swsc: '1',
          xwsc: '2',
          wssc: '0.3'
        },
        {
          cxry: '张爽',
          pjsc: '4.3',
          zcsc: '1',
          swsc: '1',
          xwsc: '2',
          wssc: '0.3'
        },
        {
          cxry: '王晗',
          pjsc: '5.3',
          zcsc: '1',
          swsc: '2',
          xwsc: '2.3',
          wssc: '0'
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
          name: '张亮',
          zhiwu: '作战科科长',
          gangwei: '遥测',
          time: '1分20秒',
          quality: '优秀'
        },
        {
          name: '王国强',
          zhiwu: '作战科科长',
          gangwei: '遥测',
          time: '1分15秒',
          quality: '优秀'
        },
        {
          name: '赵刘强',
          zhiwu: '作战科科长',
          gangwei: '遥测',
          time: '1分30秒',
          quality: '良好'
        },
        {
          name: '王雪',
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
        create: '信息登记'
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
    async handleCreate(row) {
      this.dialogStatus = 'create'
      this.form.area = row.area
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleVideo(url) {
      const cmpt = new SingleCamera_Com({ url: '', title: '训练视频' })
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
/deep/ .el-dialog__body {
  padding: 0px 0 0px 0;
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

