<template>
  <div>
    <el-button
      class="filter-item btn-base"
      type="primary"
      icon="mr10 iconfont iconxinzengh"
      @click="handleCreate"
    >创建任务</el-button>
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
      <el-table-column align="center" label="序号" fixed="left" >
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务名称" fixed="left" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="是否启用" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.useStatus }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务状态" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.taskStatus }}</span>
        </template>
      </el-table-column>
      <el-table-column label="执行时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.taskTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="节目内容" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('table.actions')"
        class-name="small-padding fixed-width"
        width="180px"
        fixed="right"
      >
        <template slot-scope="scope">
          <div class="t-col-operate">
            <i v-if="scope.row.useStatus=='启用'" class="el-icon-tickets primary table-i" title="监听" @click="handleView(scope.row)" />
            <i v-if="scope.row.useStatus=='停用'" class="el-icon-edit-outline warning table-i" title="编辑" @click="handleUpdate(scope.row)" />
            <el-switch
              v-model="scope.row.useStatus"
              active-value="启用"
              inactive-value="停用"
              class="switchStyle"
              style="margin-right: 10px;"
              @change="enable(scope.row)"
            />
            <i v-if="scope.row.useStatus=='停用'" class="el-icon-delete danger table-i" title="删除" @click="deleteRow(scope.$index, list)" />
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

    <!--添加媒体库-->
    <el-dialog
      class="abow_dialog"
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form
            ref="dataForm"
            :model="form"
            label-width="120px"
          >
            <el-row :gutter="20">
              <el-col :md="24" :lg="24">
                <el-form-item label="任务名称" prop="name">
                  <el-input
                    v-model="form.name"
                    class="form-item1"
                    placeholder="请输入任务名称"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="24">
                <el-form-item label="是否启用" prop="protocolInter">
                  <el-select
                    v-model="form.useStatus"
                    class="form-item1"
                  >
                    <el-option
                      v-for="item in useStateList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="24">
                <el-form-item label="执行日期" prop="name">
                  <el-date-picker
                    v-model="form.zxDate"
                    type="daterange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="执行周期" prop="protocolInter">
                  <el-select
                    v-model="form.zxzq"
                    class="form-item1"
                  >
                    <el-option
                      v-for="item in zxzqList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="24">
                <el-form-item label="执行时间" prop="name">
                  <el-time-picker
                    v-model="form.zxTime"
                    is-range
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="24">
                <el-form-item label="执行动作" prop="protocolInter">
                  <el-input
                    v-model="form.zxdz"
                    class="form-item1"
                    placeholder="请输入任务名称"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="音频来源" prop="protocolInter">
                  <el-select
                    v-model="form.yply"
                    class="form-item1"
                  >
                    <el-option
                      v-for="item in yplyList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="媒体文件" prop="protocolInter">
                  <el-upload
                    class="upload-demo btn-base"
                    multiple
                    :limit="3"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
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

    <!--上传音频-->
    <el-dialog
      class="abow_dialog detail-form"
      title="查看"
      :visible.sync="checkdetail"
      :close-on-click-modal="false"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-upload
            class="upload-demo btn-base"
            multiple
            :limit="3"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
          <el-table
            :key="tableKey"
            :header-cell-style="{background:'#FAFAFA',color:'#A2A2B2','font-size':'14px'}"
            stripe
            :data="playlist"
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
            <el-table-column label="文件名" fixed="left" width="140px">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="类型">
              <template slot-scope="scope">
                <span>{{ scope.row.type }}</span>
              </template>
            </el-table-column>
            <el-table-column label="大小">
              <template slot-scope="scope">
                <span>{{ scope.row.size }}</span>
              </template>
            </el-table-column>
            <el-table-column label="时长">
              <template slot-scope="scope">
                <span>{{ scope.row.time }}</span>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              :label="$t('table.actions')"
              class-name="small-padding fixed-width"
              width="180px"
              fixed="right"
            >
              <template slot-scope="scope">
                <div class="t-col-operate">
                  <i class="el-icon-caret-right primary table-i" title="播放" @click="playVideo(scope.row)" />
                  <i class="el-icon-caret-top warning table-i" title="向上" @click="uprow(scope.row)" />
                  <i class="el-icon-caret-bottom warning table-i" title="向下" @click="updown(scope.row)" />
                  <i class="el-icon-delete danger table-i" title="删除" @click="deleteRow(scope.$index, playlist)" />
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
  name: 'CameraManage',
  components: {
  },
  filters: {
  },
  data() {
    return {
      zxzqList: [{ key: '每天', value: '每天' }, { key: '每周', value: '每周' }, { key: '每月', value: '每月' }],
      yplyList: [{ key: '媒体库', value: '媒体库' }, { key: '节目源推流', value: '节目源推流' }],
      useStateList: [{ key: '启用', value: '启用' }, { key: '停用', value: '停用' }],
      tableKey: 0,
      playlist: [{ name: '红旗飘飘-孙楠', type: 'mp3', size: '3.5M', time: "4'15″", url: 'http://music.163.com/song/media/outer/url?id=145754.mp3' },
        { name: '歌唱祖国-东方红合唱团', type: 'mp3', size: '2.3M', time: "3'08″", url: 'http://music.163.com/song/media/outer/url?id=5234256.mp3' },
        { name: '中国人民解放军进行曲', type: 'mp3', size: '3.6M', time: "3'05″", url: 'http://music.163.com/song/media/outer/url?id=1304301596.mp3' }],
      list: [{ name: '每日作息广播', taskStatus: '执行中', useStatus: '启用', taskTime: '12:00:00-12:30:00,2019-01-02至2019-01-03执行', content: '节目源推流' },
        { name: '转播阅兵仪式', taskStatus: '执行中', useStatus: '停用', taskTime: '12:00:00-12:30:00,2019-01-02至2019-01-03执行', content: '节目源推流' },
        { name: '转播央视中秋晚会', taskStatus: '执行中', useStatus: '停用', taskTime: '12:00:00-12:30:00,2019-01-02至2019-01-03执行', content: '节目源推流' }],
      total: null,
      checkdetail: false,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          name: '', // 设备名称
          mark: '', // 开始时间
          useStatus: '' // 设备启用状态
        }
      },
      form: {
        name: '', // 设备名称
        useStatus: '', // 设备启用状态
        zxDate: '',
        zxzq: '',
        zxTime: '',
        zxdz: '',
        yply: '',
        fileName: ''
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
        name: '',
        mark: '',
        useStatus: ''
      }
    },
    async handleCreate() {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.form.useStatus = '启用'// 默认未启用
      debugger
      this.list.push(
        { name: this.form.name,
          taskStatus: '执行中',
          useStatus: this.form.useStatus,
          taskTime: this.$moment(this.form.zxTime[0]).format('hh:mm:ss') + '-' + this.$moment(this.form.zxTime[1]).format('hh:mm:ss') + ',' + this.$moment(this.form.zxDate[0]).format('YYYY-MM-DD') + '至' + this.$moment(this.form.zxDate[1]).format('YYYY-MM-DD'),
          content: '节目源推流'
        }
      )
      this.$notify.success({
        title: '成功',
        message: '设备注册成功!'
      })
      this.dialogFormVisible = false
    },
    handleUpdate(row) {
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.form.name = row.name
      this.form.mark = row.mark
      this.form.useStatus = row.useStatus
    },
    updateData() {
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
      this.form.name = row.name
      this.form.mark = row.mark
      this.form.useStatus = row.useStatus
    }
  }
}
</script>
<style lang="scss" scoped>
.el-dialog{
  width:400px !important;
}
.dialog-item{
      margin: 0px 48px 0px 48px !important;
}
.btn-base{
      float: right;
    margin-bottom: 10px;
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

