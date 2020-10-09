<template>
  <div class="app-container">
    <el-row :gutter="20">
      <zuzhitree />
      <el-col :span="19">
        <el-card class="box-card app-body">
          <div slot="header" class="clearfix">
            <span>发展党员计划</span>
          </div>
          <div class="filter-container">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="选择年度：" class="filter-item">
                <el-date-picker v-model="value1" type="year" placeholder="选择年" />
              </el-form-item>
              <el-form-item class="filter-item">
                <el-button
                  v-waves
                  class="filter-item btn-base"
                  type="primary"
                >{{ $t('table.search') }}</el-button>
                <el-button class="filter-item btn-base filter-add-btn" @click="dialog1 = true">新增</el-button>
              </el-form-item>
            </el-form>
            <el-table stripe :data="list" class="t-bd" fit highlight-current-row>
              <el-table-column type="index" label="序号" width="50" />
              <el-table-column property="year" label="年度" />
              <el-table-column property="name" label="文件名称" />
              <el-table-column property="danwei" label="发布单位" />
              <el-table-column property="people" label="发布人" />
              <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                  <div class="t-col-operate">
                    <i class="el-icon-download info table-i" title="下载" />
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
      title="新增"
      :visible.sync="dialog1"
      width="500px"
      class="small_dialog"
      :close-on-click-modal="false"
    >
      <div class="dialog-content">
        <el-form label-width="120px">
          <el-form-item label="年度：">
            <el-date-picker v-model="form.value1" style="width:100%" type="year" placeholder="选择日期" />
          </el-form-item>
          <el-form-item label="党员发展计划：">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip" />
            </el-upload>
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
          year: '2020',
          name: '2020年度发展党员工作计划.doc',
          danwei: '组织部',
          people: '管理员'
        },
        {
          year: '2019',
          name: '2019年度发展党员工作计划.doc',
          danwei: '组织部',
          people: '管理员'
        },
        {
          year: '2018',
          name: '2018年度发展党员工作计划.doc',
          danwei: '组织部',
          people: '管理员'
        },
        {
          year: '2017',
          name: '2017年度发展党员工作计划.doc',
          danwei: '组织部',
          people: '管理员'
        },
        {
          year: '2016',
          name: '2016年度发展党员工作计划.doc',
          danwei: '组织部',
          people: '管理员'
        }
      ],
      dialog1: false,
      fileList: [],
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
