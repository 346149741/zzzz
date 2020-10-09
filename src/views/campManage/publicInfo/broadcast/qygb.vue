<template>
  <div>
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
      <el-table-column label="已选区域" fixed="left" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.area }}</span>
        </template>
      </el-table-column>
      <el-table-column label="当前节目" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.program }}</span>
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
            <el-button v-if="!scope.row.isPlaying" type="primary" size="small " @click="selectProgram(scope.row)">选择节目</el-button>
            <el-button v-if="scope.row.program!=null&&scope.row.isPlaying" type="primary" size="small" @click="jt(scope.row)">监听</el-button>
            <el-button v-if="scope.row.program!=null&&scope.row.isPlaying" type="primary" size="small" @click="stopProgram(scope.row)">暂停播放</el-button>
            <el-button v-if="scope.row.program!=null&&!scope.row.isPlaying" type="primary" size="small" @click="startProgram(scope.row)">开始播放</el-button>
            <el-button v-if="!scope.row.isPlaying" type="primary" size="small " @click="deleteProgram(scope.row)">移除</el-button>
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
      width="620px"
    >
      <el-transfer v-model="transferValue" :data="transferdata" style="padding:10px;" />
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form
            ref="dataForm"
            :model="form"
            label-width="120px"
          >
            <el-row :gutter="20">
              <el-col :md="24" :lg="24">
                <el-form-item label="节目名称" prop="name">
                  <el-input
                    v-model="form.program"
                    class="form-item1"
                    placeholder="请输入名称"
                  />
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
      transferValue: '',
      useStateList: [{ key: '启用', value: '启用' }, { key: '停用', value: '停用' }],
      tableKey: 0,
      transferdata:
[{ label: '红旗飘飘-孙楠', type: 'mp3', key: 0, time: "4'15″", url: 'http://music.163.com/song/media/outer/url?id=145754.mp3' },
  { label: '歌唱祖国-东方红合唱团', type: 'mp3', key: 1, time: "3'08″", url: 'http://music.163.com/song/media/outer/url?id=5234256.mp3' },
  { label: '中国人民解放军进行曲', type: 'mp3', key: 2, time: "3'05″", url: 'http://music.163.com/song/media/outer/url?id=1304301596.mp3' }],
      list: [{ area: '后装保障部', program: '早操歌曲', isPlaying: true },
        { area: '武装部', program: '眼保健操', isPlaying: false },
        { area: '器械部', program: '午餐时间', isPlaying: false }],
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
        area: '',
        isPlaying: false,
        program: ''
      },
      dialogFormVisible: false,
      distribDialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        view: '查看',
        update: '编辑',
        create: '选择节目'
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
      this.form.name = row.name
      this.form.mark = row.mark
      this.form.useStatus = row.useStatus
    }
  }
}
</script>
<style lang="scss" scoped>
  .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
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

