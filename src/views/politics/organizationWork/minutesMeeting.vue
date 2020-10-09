<template>
  <div class="app-container">
    <el-row :gutter="20">
      <zuzhitree />
      <el-col :span="19">
        <el-card class="box-card app-body">
          <div slot="header" class="clearfix">
            <span>会议记录</span>
          </div>
          <div class="filter-container">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="会议时间：" class="filter-item">
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </el-form-item>
              <el-form-item label="会议类型：" class="filter-item">
                <el-select
                  v-model="listQuery.params.Status"
                  clearable
                  class="form-item"
                  placeholder="请选择会议类型"
                >
                  <el-option label="党委会议" value="0" />
                </el-select>
              </el-form-item>
              <el-form-item class="filter-item">
                <el-button
                  v-waves
                  class="filter-item btn-base"
                  type="primary"
                >{{ $t('table.search') }}</el-button>
                <el-button class="filter-item btn-base filter-add-btn" @click="dialog1 = true">登记</el-button>
              </el-form-item>
            </el-form>
            <el-table stripe :data="list" class="t-bd" fit highlight-current-row>
              <el-table-column type="index" label="序号" width="50" />
              <el-table-column property="type" label="会议类型" />
              <el-table-column property="danwei" label="单位" />
              <el-table-column property="didian" label="会议地点" />
              <el-table-column property="people" label="主持人" />
              <el-table-column property="zhuti" label="主题" />
              <el-table-column property="time" label="会议时间" />
              <el-table-column property="file" label="会议纪要" />
              <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                  <div class="t-col-operate">
                    <i class="el-icon-upload2 info table-i" title="上传纪要" />
                    <i
                      class="el-icon-edit-outline warning table-i"
                      title="编辑"
                      @click="handleCreate(scope.row.id)"
                    />
                    <i
                      class="el-icon-delete danger table-i"
                      title="删除"
                      @click="delitem(scope.row.id)"
                    />
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
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      title="会议登记"
      :visible.sync="dialog1"
      width="500px"
      class="small_dialog"
      :close-on-click-modal="false"
    >
      <div class="dialog-content">
        <el-form label-width="120px">
          <el-form-item label="会议类型:">
            <el-select v-model="form.type" class="form-item1" placeholder="请选择会议类型">
              <el-option label="党委会议" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="单位：">
            <el-input v-model="form.danwei" class="form-item1" placeholder="请输入单位" />
          </el-form-item>
          <el-form-item label="主持人:">
            <el-input v-model="form.name" class="form-item1" placeholder="请输入主持人" />
          </el-form-item>
          <el-form-item label="主题：">
            <el-input v-model="form.zhuti" class="form-item1" placeholder="请输入主题" />
          </el-form-item>
          <el-form-item label="会议地点：">
            <el-input v-model="form.zhiwu" class="form-item1" placeholder="请输入会议地点" />
          </el-form-item>
          <el-form-item label="会议时间：">
            <el-date-picker v-model="form.value1" style="width:100%" type="date" placeholder="选择日期" />
            <!-- <el-input v-model="form.zhiwu" class="form-item1" placeholder="请输入会议时间" /> -->
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog1=false">取 消</el-button>
        <el-button type="primary" @click="dialog1=false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import zuzhitree from './zuzhitree'
export default {
  components: {
    zuzhitree
  },
  data() {
    return {
      value1: null,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {

        }
      },
      total: null, // 总数
      list: [
        {
          type: '党委会议',
          danwei: '一营',
          didian: '301会议室',
          people: '高山',
          zhuti: '党委换届选举',
          time: '2020-08-15',
          file: ''
        },
        {
          type: '党委会议',
          danwei: '一营一连',
          didian: '302会议室',
          people: '赵超',
          zhuti: '生活作风教育',
          time: '2020-08-15',
          file: ''
        },
        {
          type: '党委会议',
          danwei: '一营二连',
          didian: '201会议室',
          people: '金一',
          zhuti: '党课',
          time: '2020-08-15',
          file: '会议纪要.doc'
        },
        {
          type: '党委会议',
          danwei: '二营',
          didian: '101会议室',
          people: '郭依依',
          zhuti: '党课',
          time: '2020-08-15',
          file: ''
        },
        {
          type: '党委会议',
          danwei: '二营一连',
          didian: '405会议室',
          people: '黄安',
          zhuti: '党课',
          time: '2020-08-15',
          file: ''
        }
      ],
      dialog1: false,
      form: {

      }
    }
  },
  created() {
    this.total = this.list.length
  },
  methods: {

  }
}
</script>
<style scoped>
</style>
