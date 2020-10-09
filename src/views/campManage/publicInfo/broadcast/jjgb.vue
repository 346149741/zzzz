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
      <el-table-column label="紧急广播类型" fixed="left" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.jjgblx }}</span>
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
            <el-button type="primary" size="mini">试听</el-button>
            <el-button type="primary" size="mini">全景广播</el-button>
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
      zxzt: true,
      zxzqList: [{ key: '每天', value: '每天' }, { key: '每周', value: '每周' }, { key: '每月', value: '每月' }],
      yplyList: [{ key: '媒体库', value: '媒体库' }, { key: '节目源推流', value: '节目源推流' }],
      useStateList: [{ key: '启用', value: '启用' }, { key: '停用', value: '停用' }],
      tableKey: 0,
      playlist: [{ name: '红旗飘飘-孙楠', type: 'mp3', size: '3.5M', time: "4'15″", url: 'http://music.163.com/song/media/outer/url?id=145754.mp3' },
        { name: '歌唱祖国-东方红合唱团', type: 'mp3', size: '2.3M', time: "3'08″", url: 'http://music.163.com/song/media/outer/url?id=5234256.mp3' },
        { name: '中国人民解放军进行曲', type: 'mp3', size: '3.6M', time: "3'05″", url: 'http://music.163.com/song/media/outer/url?id=1304301596.mp3' }],
      list: [{ jjgblx: '消防紧急广播', szdw: '探鹰一营', dbnr: '给新兵连的弟兄们打打气', dblx: '口播祝福语', dbly: '公众号留言', dbsj: '2020-02-02 20:20:20' },
        { jjgblx: '紧急集合广播', szdw: '追鹰二营', dbnr: '营长的生日就要到了，点播一首', dblx: '播放歌曲', dbly: '电话', dbsj: '2020-02-02 20:20:20' },
        { jjgblx: '紧急集合广播', szdw: '探鹰三营', dbnr: '给新兵连的弟兄们打打气', dblx: '口播祝福语', dbly: '私信', dbsj: '2020-02-02 20:20:20' }],
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
    startClick(row) {
      row.zxzt = false
    },
    cancleClick(row) {
      row.zxzt = true
    },
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

