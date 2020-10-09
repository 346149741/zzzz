<template>
  <div class="app-container">
    <el-card class="app-body">
      <div
        slot="header"
        class="clearfix"
      >
        <span>违章处理</span>
      </div>
      <!--搜索条件-->
      <div class="filter-container">
        <el-form
          :inline="true"
          class="demo-form-inline"
        >
          <el-form-item
            label="车牌号:"
            class="filter-item"
          >
            <el-input
              v-model="listQuery.params.title"
              placeholder="请输入车牌号"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item
            label="违章类别："
            class="filter-item"
          >
            <el-select
              class="form-item1"
              v-model="listQuery.params.type"
            >
              <el-option
                v-for="item in wzList"
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
          label="车牌号"
          fixed="left"
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
          label="抓拍时间"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.zpsj }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="违章地点"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.wzdd }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="违章类型"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.wzlx }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="路段限速"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.ldxs }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="瞬时车速"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.sscs }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="超速比例"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.csbl }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="违章照片"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              class="videoButton"
              @click="openVideo(scope.row)"
            >抓拍图片</el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          class-name="small-padding fixed-width"
          fixed="right"
          label="违章处理"
          width="250px;"
        >
          <template slot-scope="scope">
            <div class="t-col-operate">
              <el-button
                type="primary"
                size="small"
              >短信通知</el-button>
              <el-button
                type="primary"
                size="small"
              >车辆布控</el-button>
              <el-button
                type="primary"
                size="small"
                @click="deleteRow(scope.$index, list)"
              >忽略</el-button>
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
                <el-form-item label="主题：">
                  <el-input
                    v-model="form.title"
                    class="form-item1"
                    placeholder="请输入主题"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="培养目标：">
                  <el-input
                    v-model="form.goal"
                    type="textarea"
                    placeholder="请输入内容"
                    maxlength="300"
                    show-word-limit
                    height="300"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="培养计划：">
                  <el-upload
                    class="upload-demo btn-base"
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
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="审核人">
                  <el-select
                    class="form-item1"
                    v-model="form.goal"
                  >
                    <el-option
                      v-for="item in sheheList"
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
                <el-form-item label="主题：">{{ form.title }}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="培养目标：">
                  {{ form.goal }}
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="培养计划："><span style="color:red;cursor:pointer;">2017级人才培养计划.exe</span></el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="审核人"><span>张建国</span></el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { PlayBackCamera_Com } from "@/components/DialogCmpts/pops";
import { createPop } from "@/components/DialogCmpts/index.js";
export default {
  name: "CameraManage",
  components: {},
  filters: {},
  data() {
    return {
      registerTime: "",
      transferValue: "",
      wzList: [
        { key: "逆行", value: "逆行" },
        { key: "超速", value: "超速" },
        { key: "压实线", value: "压实线" },
        { key: "违章变道", value: "违章变道" },
        { key: "未系安全带", value: "未系安全带" },
      ],
      tableKey: 0,
      list: [
        {
          cph: "湘JPJ452",
          cpys: "蓝",
          zpsj: "2020-02-02 20:20:20",
          wzdd: "营区南路东侧",
          wzlx: "压白线",
          ldxs: "100",
          sscs: "110",
          csbl: "10%",
        },
        {
          cph: "湘J9M8H0",
          cpys: "蓝",
          zpsj: "2020-02-04 18:06:20",
          wzdd: "卫华东路",
          wzlx: "超速",
          ldxs: "60",
          sscs: "130",
          csbl: "116.67%",
        },
        {
          cph: "湘JN7H20",
          cpys: "蓝",
          zpsj: "2020-01-02 16:25:20",
          wzdd: "营区南路西侧",
          wzlx: "违章变道",
          ldxs: "80",
          sscs: "75",
          csbl: "————",
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
    // 视频联动
    openVideo(row) {
      const list = [
        {
          url: "11",
          img: require("@/assets/watchPoint/ZP.png"),
        },
        { url: "11", img: require("@/assets/watchPoint/ZP.png") },
        { url: "11", img: require("@/assets/watchPoint/ZP2.jpg") },
        { url: "11", img: require("@/assets/watchPoint/ZP3.jpg") },
        { url: "11", img: require("@/assets/watchPoint/ZP3.jpg") },
        { url: "11", img: require("@/assets/watchPoint/ZP2.jpg") },
        { url: "11", img: require("@/assets/watchPoint/ZP3.jpg") },
        { url: "11", img: require("@/assets/watchPoint/ZP2.jpg") },
      ];
      const cmpt = new PlayBackCamera_Com({ list: list });
      createPop(cmpt, "cameraPopUp");
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

