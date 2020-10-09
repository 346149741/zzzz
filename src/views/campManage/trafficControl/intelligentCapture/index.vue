<template>
  <div class="app-container">
    <el-row>
      <el-col :span="10">
        <el-row>
          <el-card class="box-card">
            <div
              slot="header"
              class="clearfix"
            >
              <span>实时监控</span>
            </div>
            <img
              src="@/assets/watchPoint/ZP.png"
              style="width: 100%;height: 260px;"
            />
          </el-card>
        </el-row>
        <el-row>
          <el-card class="box-card">
            <div
              slot="header"
              class="clearfix"
            >
              <span>获取车牌信息</span>
            </div>
            <div style="text-align:center; "><img
                src="@/assets/watchPoint/CP.png"
                style="height: 77px;"
              /></div>
          </el-card>
        </el-row>
        <el-row>
          <el-card class="box-card">
            <div
              slot="header"
              class="clearfix"
            >
              <span>实际车牌信息</span>
            </div>
            <div style="text-align:center;font-weight: bold;font-size: 40px;height:50px;"><span>蓝 浙A9WK55</span></div>
          </el-card>
        </el-row>
      </el-col>
      <el-col :span="14">
        <el-card class="box-card">
          <div
            slot="header"
            class="clearfix"
          >
            <span>实时抓拍</span>
          </div>
          <img
            style="width:100%;height:567px;"
            src="@/assets/watchPoint/ZP.png"
          />
        </el-card>
      </el-col>
    </el-row>
    <el-card class="app-body">
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
          label="通过车道"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.tgcd }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="抓拍时间"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.zpsj }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="车牌号"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.cph }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="车牌颜色"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.cpys }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="车身颜色"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.csys }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="车速"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.cs }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="事件"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.sj }}</span>
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

  </div>
</template>

<script>
export default {
  name: "CameraManage",
  components: {},
  filters: {},
  data() {
    return {
      registerTime: "",
      transferValue: "",
      sheheList: [
        { key: "张建", value: "张建" },
        { key: "王文国", value: "王文国" },
        { key: "张小川", value: "张小川" },
      ],
      tableKey: 0,
      list: [
        {
          csld: "营区南路",
          tgcd: "1",
          zpsj: "2020-02-04 18:06:02",
          cph: "浙A9WK55",
          cpys: "蓝",
          csys: "白",
          cs: "88",
          sj: "超速",
        },
        {
          csld: "营区东路",
          tgcd: "2",
          zpsj: "2020-02-10 14:00:02",
          cph: "浙A98MP2",
          cpys: "蓝",
          csys: "白",
          cs: "102",
          sj: "超速",
        },
        {
          csld: "卫华东路",
          tgcd: "1",
          zpsj: "2020-01-04 10:06:02",
          cph: "浙A89JS0",
          cpys: "蓝",
          csys: "白",
          cs: "68",
          sj: "违规占用车道",
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
/deep/ .el-card__header {
  height: 44px;
  line-height: 44px;
  display: flex;
  padding: 0px 20px;
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

