<template>
  <div class="app-container">
    <el-card class="app-body">
      <div
        slot="header"
        class="clearfix"
      >
        <span>训练标兵</span>
      </div>
      <!--搜索条件-->
      <div class="filter-container">
        <el-form
          :inline="true"
          class="demo-form-inline"
        >
          <el-form-item
            label="标题:"
            class="filter-item"
          >
            <el-input
              v-model="listQuery.params.title"
              placeholder="请输入标题"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item
            label="发布时间："
            class="filter-item"
          >
            <el-date-picker
              v-model="registerTime"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item
            label="部门:"
            class="filter-item"
          >
            <el-input
              v-model="listQuery.params.department"
              placeholder="请输入部门"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              @keyup.enter.native="handleFilter"
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
            >新增</el-button>

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
          label="标题"
          fixed="left"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="部门"
          fixed="left"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.department }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="月份"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.monthTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="发布日期"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.publishTime }}</span>
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
                <el-form-item
                  label="标题："
                  prop="name"
                >
                  <el-input
                    v-model="form.title"
                    class="form-item1"
                    placeholder="请输入标题"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item
                  label="表彰姓名："
                  prop="name"
                >
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
                <el-form-item
                  label="表彰月份："
                  prop="name"
                >
                  <el-date-picker
                    type="month"
                    placeholder="选择月"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item
                  label="表彰词"
                  prop="name"
                >
                  <el-input
                    v-model="form.goal"
                    type="textarea"
                    placeholder="请输入表彰词"
                    maxlength="300"
                    show-word-limit
                    height="300"
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
      class="abow_dialog"
      :visible.sync="checkdetail"
      :close-on-click-modal="false"
      width="635px"
    >
      <div class="dialog-content">
        <h3 style="text-align:center;">2019年07月体能标兵</h3>
        <h4 style="text-align:center;">训练标兵：赵明</h4>
        <el-card class="box-card">
          <div class="publishTitle">
            发布单位：<span style="margin-right:60px;">司令部</span> 发布时间：<span>2019-08-06</span>
          </div>
          <p style="text-indent:2em;font-weight: bold;">赵明在年度体能综合考核中成绩优异，位列第一，特此评为7月份体能训练标兵。</p>
          <div style="text-align:center;"><img
              src="@/assets/watchPoint/junren1.jpg"
              style="height:200px;"
            /></div>
        </el-card>
      </div>
    </el-dialog>
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
          title: "2019年06月体能标兵",
          monthTime: "2019-06",
          publishTime: "2020-09-16",
          department: "政治部",
        },
        {
          title: "2019年07月射击标兵",
          monthTime: "2019-07",
          publishTime: "2020-09-16",
          department: "后勤部",
        },
        {
          title: "2019年08月武装越野标兵",
          monthTime: "2019-08",
          publishTime: "2020-09-16",
          department: "装备部",
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
      },
      dialogFormVisible: false,
      distribDialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        view: "查看",
        update: "编辑",
        create: "新增",
      },
    };
  },
  watch: {},
  created() {},
  methods: {
    deleteRow(index, rows) {
      rows.splice(index, 1);
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
<style  scoped>
.publishTitle {
  text-align: center;
  font-size: 15px;
  font-family: bold;
  color: black;
}
.box-card {
  width: 90%;
  margin-left: 5%;
  height: 430px;
  background: url("~@/assets/watchPoint/bzbj.png");
}
.dialog-content {
  margin-top: -24px;
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

