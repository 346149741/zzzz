<template>
  <div class="app-container">
    <el-card class="app-body">
      <div
        slot="header"
        class="clearfix"
      >
        <span>雷达测速管理</span>
      </div>
      <!--搜索条件-->
      <div class="filter-container">
        <el-form
          :inline="true"
          class="demo-form-inline"
        >
          <el-form-item
            label="测速路段："
            class="filter-item"
          >
            <el-select
              class="form-item1"
              v-model="listQuery.params.type"
            >
              <el-option
                v-for="item in csldList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="设备列表："
            class="filter-item"
          >
            <el-select
              class="form-item1"
              v-model="listQuery.params.area"
            >
              <el-option
                v-for="item in sbList"
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
            >信息导出</el-button>
            <el-button
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconxinzengh"
              @click="handleCreate"
            >关联设备</el-button>

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
          label="测速路段"
          fixed="left"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.csld }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="设备列表"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.sblb }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="车道信息"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.cdxx }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="来车方向"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.lcfx }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="过车计数"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.gcjs }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="超速车辆"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.cscl }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="超速占比"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.cszb }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          class-name="small-padding fixed-width"
          fixed="right"
        >
          <template slot-scope="scope">
            <div class="t-col-operate">
              <el-button
                type="primary"
                size="mini"
                @click="handleView(scope.row)"
              >查看</el-button>
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
    </el-card>
    <!--添加媒体库-->
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
            :model="form"
            label-width="120px"
          >
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="测速路段：">
                  <el-input
                    v-model="form.title"
                    class="form-item1"
                    placeholder="请输入测速路段："
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="车道数量">
                  <el-input
                    v-model="form.title"
                    class="form-item1"
                    placeholder="请输入车道数量："
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="来车方向">
                  <el-input
                    v-model="form.title"
                    class="form-item1"
                    placeholder="请输入来车方向："
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="设备IP">
                  <el-input
                    v-model="form.title"
                    class="form-item1"
                    placeholder="请输入设备IP："
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="设备网关">
                  <el-input
                    v-model="form.title"
                    class="form-item1"
                    placeholder="请输入设备网关："
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="MAC地址">
                  <el-input
                    v-model="form.title"
                    class="form-item1"
                    placeholder="请输入MAC地址："
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
      title="查看"
      :visible.sync="checkdetail"
      :close-on-click-modal="false"
      width="70%"
    >
      <intelligentCapture />
    </el-dialog>
  </div>
</template>

<script>
import intelligentCapture from "../intelligentCapture/index";
export default {
  name: "CameraManage",
  components: { intelligentCapture },
  filters: {},
  data() {
    return {
      registerTime: "",
      transferValue: "",
      csldList: [
        { key: "营区南路", value: "营区南路" },
        { key: "营区北二路", value: "营区北二路" },
        { key: "卫华路", value: "卫华路" },
      ],
      sbList: [
        { key: "192.168.1.2", value: "192.168.1.2" },
        { key: "192.168.1.3", value: "192.168.1.3" },
        { key: "192.168.1.4", value: "192.168.1.4" },
      ],
      tableKey: 0,

      list: [
        {
          csld: "卫华路",
          sblb: "192.168.99.4",
          cdxx: "3",
          lcfx: "西向东",
          gcjs: "22",
          cscl: "0",
          cszb: "0",
        },
        {
          csld: "追鹰二路北侧",
          sblb: "192.168.99.6",
          cdxx: "3",
          lcfx: "东向西",
          gcjs: "42",
          cscl: "2",
          cszb: "4.76%",
        },
        {
          csld: "营区南路东侧",
          sblb: "192.168.99.3",
          cdxx: "5",
          lcfx: "南向北",
          gcjs: "199",
          cscl: "18",
          cszb: "9.04%",
        },
      ],
      total: null,
      checkdetail: false,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          area: "",
          isPlaying: false,
          program: "",
        },
      },
      form: {
        title: "",
        isPlaying: false,
        program: "",
        goal:
          "1、培养全面发展型军事人才是打赢现代化战争的关键  2、培养“指技合融”全面型军事人才是实现我军跨越式发展的有力支撑",
      },
      dialogFormVisible: false,
      distribDialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        view: "查看",
        update: "编辑",
        create: "新增计划",
      },
    };
  },
  watch: {},
  created() {},
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    enable(row) {
      // 启用
      this.$notify({
        title: "成功",
        message: "更新成功",
        type: "success",
        duration: 2000,
      });
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val;
    },
    handleFilter() {
      this.listQuery.pageNo = 1;
    },
    resetForm() {
      this.form = {
        area: "",
        isPlaying: false,
        program: "",
      };
    },
    async handleCreate(row) {
      this.resetForm();
      this.dialogStatus = "create";
      this.form.area = row.area;
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    addClickRegion(name) {
      this.list.push({ area: name, program: "", isPlaying: false });
    },
    createData() {
      this.list.push({
        title: this.form.title,
        publishTime: "2020-09-18",
        publishpeople: "王建国",
        status: "待审核",
      });
      this.$notify.success({
        title: "成功",
        message: "选择成功!",
      });
      this.dialogFormVisible = false;
    },
    selectProgram(row) {
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.form.isPlaying = row.isPlaying;
      this.form.area = row.area;
      this.form.program = row.program;
    },
    updateData() {
      var me = this;
      this.list.forEach((item, index) => {
        if (item.area === me.form.area) {
          item.program = me.form.program;
        }
      });
      this.dialogFormVisible = false;
      this.$notify({
        title: "成功",
        message: "更新成功",
        type: "success",
        duration: 2000,
      });
    },
    handleDelete(row) {
      this.$notify.success({
        title: "成功",
        message: "删除成功",
      });
    },
    handleView(row) {
      this.checkdetail = true;
      this.form.title = row.title;
      this.form.mark = row.mark;
      this.form.useStatus = row.useStatus;
    },
  },
};
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

