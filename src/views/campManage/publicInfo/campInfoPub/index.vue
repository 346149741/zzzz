<template>
  <div class="app-container">
    <el-card class="app-body">
      <div
        slot="header"
        class="clearfix"
      >
        <span>信息发布</span>
      </div>
      <!--搜索条件-->
      <div class="filter-container">
        <el-form
          :inline="true"
          class="demo-form-inline"
        >
          <el-form-item
            label="所属区域:"
            class="filter-item"
          >
            <el-input
              v-model="listQuery.params.area"
              placeholder="请输入主题名称"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item
            label="设备类型："
            class="filter-item"
          >
            <el-select
              class="form-item1"
              v-model="listQuery.params.type"
            >
              <el-option
                v-for="item in shebieList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="设备状态："
            class="filter-item"
          >
            <el-select
              class="form-item1"
              v-model="listQuery.params.status"
            >
              <el-option
                v-for="item in statusList"
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
          </el-form-item>
        </el-form>
      </div>
      <div class="filter-container">
        <el-form
          :inline="true"
          class="demo-form-inline"
        >
          <el-form-item
            label="多媒体设备功能:"
            class="filter-item"
          >
          </el-form-item>
          <el-form-item class="filter-item">
            <el-button class="filter-item btn-base">开启屏幕</el-button>
            <el-button class="filter-item btn-base">关闭屏幕</el-button>
            <el-button class="filter-item btn-base">设置亮度</el-button>
            <el-button class="filter-item btn-base">屏幕截图</el-button>
            <el-button class="filter-item btn-base">停止播放</el-button>
            <el-button class="filter-item btn-base">恢复播放</el-button>
            <el-button class="filter-item btn-base">同步设备</el-button>
            <el-button
              style="margin-left:30px;"
              class="filter-item btn-base"
              type="primary"
              @click="handleView"
            >节目列表</el-button>
            <el-button
              class="filter-item btn-base"
              type="primary"
              @click="handleCreate"
            >添加节目</el-button>
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
          label="在线设备"
          fixed="left"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.zxsb }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="标识号"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.bsh }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="设备类型"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.sblx }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="所属区域"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.ssqy }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="节目状态"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.jmzt }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="节目内容"
          align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.jmnr }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          class-name="small-padding fixed-width"
          fixed="right"
        >
          <template slot-scope="scope">
            <div class="t-col-operate">
              <el-button
                type="primary"
                size="small"
              >预览</el-button>
              <el-button
                type="primary"
                size="small"
              >推送节目</el-button>
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
                <el-form-item label="节目名称：">
                  <el-input
                    v-model="form.title"
                    class="form-item1"
                    placeholder="请输入节目名称"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="节目类型：">
                  <el-radio
                    v-model="radio"
                    label="1"
                  >自选节目</el-radio>
                  <el-radio
                    v-model="radio"
                    label="2"
                  >节目源推流</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="节目内容">
                  <el-input
                    v-model="form.title"
                    class="form-item1"
                    placeholder="请输入节目直播源推流地址"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="节目时长">
                  <el-input
                    v-model="form.title"
                    class="form-item1"
                    placeholder="请输入节目时长"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="节目分辨率">
                  <el-input
                    v-model="form.title"
                    class="form-item1"
                    placeholder="请输入节目分辨率"
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
      width="50%"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-table
            :key="tableKey"
            :header-cell-style="{background:'#FAFAFA',color:'#A2A2B2','font-size':'14px'}"
            stripe
            :data="jmlist"
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
              label="节目名称"
              fixed="left"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.jmmc }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="节目类型"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.jmlx }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="节目内容"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.jmnr }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="节目时长"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.jmsc }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="节目分辨率"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.jmfbl }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="操作"
              class-name="small-padding fixed-width"
              fixed="right"
              width="150px"
            >
              <template slot-scope="scope">
                <div class="t-col-operate">
                  <el-button
                    type="primary"
                    size="small"
                  >编辑</el-button>
                  <el-button
                    type="primary"
                    size="small"
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
        </div>
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
      radio: "1",
      registerTime: "",
      transferValue: "",
      sheheList: [
        { key: "张建", value: "张建" },
        { key: "王文国", value: "王文国" },
        { key: "张小川", value: "张小川" },
      ],
      tableKey: 0,
      statusList: [
        { key: "播放中", value: "播放中" },
        { key: "轮播中", value: "轮播中" },
        { key: "回放中", value: "回放中" },
      ],
      shebieList: [
        { key: "液晶屏", value: "液晶屏" },
        { key: "触控一体机", value: "触控一体机" },
        { key: "全新LED屏", value: "全新LED屏" },
      ],
      list: [
        {
          zxsb: "一连广播室",
          bsh: "CMP00000001",
          sblx: "全彩LED屏",
          ssqy: "探鹰一连",
          jmzt: "播放中",
          jmnr: "领导欢迎词",
        },
        {
          zxsb: "二连操场",
          bsh: "CMP00000001",
          sblx: "液晶屏",
          ssqy: "探鹰二连",
          jmzt: "轮播中",
          jmnr: "连队宣传片",
        },
        {
          zxsb: "一连阅览室",
          bsh: "CMP00000001",
          sblx: "触控一体机",
          ssqy: "探鹰三连",
          jmzt: "播放中",
          jmnr: "转播《新闻联播》",
        },
        {
          zxsb: "二连大厅",
          bsh: "CMP00000001",
          sblx: "全彩LED屏",
          ssqy: "探鹰一连",
          jmzt: "播放中",
          jmnr: "连队公告",
        },
        {
          zxsb: "一连办公楼",
          bsh: "CMP00000001",
          sblx: "双基色LED屏",
          ssqy: "探鹰一连",
          jmzt: "回放中",
          jmnr: "视频会议直播",
        },
        {
          zxsb: "一连广播室",
          bsh: "CMP00000001",
          sblx: "IP网络防水音柱",
          ssqy: "探鹰一连",
          jmzt: "播放中",
          jmnr: "连队公告",
        },
      ],
      jmlist: [
        {
          jmmc: "领导欢迎词",
          jmlx: "自选节目",
          jmnr: "点击预览",
          jmsc: "3600″",
          jmfbl: "1920X1080",
        },
        {
          jmmc: "转播《新闻联播》",
          jmlx: "直播源推流",
          jmnr: "点击预览",
          jmsc: "30′",
          jmfbl: "1920X1080",
        },
        {
          jmmc: "连队宣传片",
          jmlx: "自选节目",
          jmnr: "点击预览",
          jmsc: "60′",
          jmfbl: "1920X1080",
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
          type: "",
          status: "",
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
        create: "新增节目",
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
  margin-left: 0px;
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

