<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>人才培养</span>
      </div>
      <!--搜索条件-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="主题:" class="filter-item">
            <el-input
              v-model="listQuery.params.title"
              placeholder="请输入主题名称"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="发布时间：" class="filter-item">
            <el-date-picker
              v-model="registerTime"
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
              @click="handleFilter"
            >{{ $t('table.search') }}</el-button>
            <el-button
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconxinzengh"
              @click="handleCreate"
            >新增计划</el-button>

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
        <el-table-column align="center" label="序号" fixed="left">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="主题" fixed="left" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.publishTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布人" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.publishpeople }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.status }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          class-name="small-padding fixed-width"
          fixed="right"
        >
          <template slot-scope="scope">
            <div class="t-col-operate">
              <el-button type="primary" size="mini" @click="handleView(scope.row)">详情</el-button>
              <el-button type="primary" size="mini" @click="deleteRow(scope.$index, list)">删除</el-button>
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
                <el-form-item label="主题：" >
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
                <el-form-item label="培养计划：" >
                  <el-upload
                    class="upload-demo btn-base"
                    multiple
                    :limit="3"
                    action=""
                  >
                    <el-button size="small" type="primary">上传附件</el-button>
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
      <div v-if="dialogStatus!=='view'" slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          v-if="dialogStatus=='create'"
          type="primary"
          @click="createData"
        >{{ $t('table.confirm') }}</el-button>
        <el-button v-else type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
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
          <el-form :model="form" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="主题：">{{ form.title }}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="培养目标：">
                  {{ form.goal }}
                </el-form-item></el-col>
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

export default {
  name: 'CameraManage',
  components: {
  },
  filters: {
  },
  data() {
    return {
      registerTime: '',
      transferValue: '',
      sheheList: [{ key: '张建', value: '张建' }, { key: '王文国', value: '王文国' }, { key: '张小川', value: '张小川' }],
      tableKey: 0,
      transferdata:
[{ label: '红旗飘飘-孙楠', type: 'mp3', key: 0, time: "4'15″", url: 'http://music.163.com/song/media/outer/url?id=145754.mp3' },
  { label: '歌唱祖国-东方红合唱团', type: 'mp3', key: 1, time: "3'08″", url: 'http://music.163.com/song/media/outer/url?id=5234256.mp3' },
  { label: '中国人民解放军进行曲', type: 'mp3', key: 2, time: "3'05″", url: 'http://music.163.com/song/media/outer/url?id=1304301596.mp3' }],
      list: [{ title: '关于2017级人才培养的通知', publishTime: '2020-09-16', publishpeople: '王建国', status: '待审核' },
        { title: '关于2018级人才培养的通知', publishTime: '2020-09-16', publishpeople: '陈伟', status: '已发布' },
        { title: '关于2019级人才培养的通知', publishTime: '2020-09-16', publishpeople: '张建', status: '已发布' }],
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
        goal: '1、培养全面发展型军事人才是打赢现代化战争的关键  2、培养“指技合融”全面型军事人才是实现我军跨越式发展的有力支撑'
      },
      dialogFormVisible: false,
      distribDialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        view: '查看',
        update: '编辑',
        create: '新增计划'
      }
    }
  },
  watch: {
  },
  created() {

  },
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
.detail-form .el-textarea__inner{
  border:none !important;
}
.el-textarea__inner{
  height:200px !important;
}
  .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
.dialog-item{
      margin: 0px 48px 0px 48px !important;
}

.list-query {
  width: 340px;
  margin-right: 22px;
}
.t-col-operate i.table-i{
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

