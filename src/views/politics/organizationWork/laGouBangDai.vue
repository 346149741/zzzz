<template>
  <div class="app-container">
    <el-row :gutter="20">
      <zuzhitree />
      <el-col :span="19">
        <el-card class="box-card app-body">
          <div slot="header" class="clearfix">
            <span>拉钩帮带</span>
          </div>
          <div style="margin-bottom:20px">
            <el-button class="filter-item btn-base filter-add-btn" @click="dialog1 = true">新增</el-button>
          </div>
          <div class="filter-container">
            <el-table stripe :data="list" class="t-bd" fit highlight-current-row>
              <el-table-column type="index" label="序号" width="50" />
              <el-table-column property="name" label="姓名" />
              <el-table-column property="danwei" label="单位" />
              <el-table-column property="zhiwu" label="问题类型" />
              <el-table-column property="danwei2" label="反馈时间" />
              <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                  <div class="t-col-operate">
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
      title="新增"
      :visible.sync="dialog1"
      width="500px"
      class="small_dialog"
      :close-on-click-modal="false"
    >
      <div class="dialog-content">
        <el-form label-width="120px">
          <el-form-item label="干部姓名:">
            <el-input v-model="form.name" class="form-item1" placeholder="请输入干部姓名" />
          </el-form-item>
          <el-form-item label="任职单位：">
            <el-input v-model="form.danwei" class="form-item1" placeholder="请输入任职单位" />
          </el-form-item>
          <el-form-item label="任职职务：">
            <el-input v-model="form.zhiwu" class="form-item1" placeholder="请输入任职职务" />
          </el-form-item>
          <el-form-item label="帮带单位:">
            <el-select v-model="form.type" class="form-item1" placeholder="请选择帮带单位">
              <el-option label="一营一连" value="0" />
              <el-option label="旅部" value="1" />
            </el-select>
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
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {

        }
      },
      total: null, // 总数
      list: [
        {
          name: '高山',
          danwei: '旅部',
          zhiwu: '旅部党委委员',
          danwei2: '一营'
        },
        {
          name: '王武',
          danwei: '营部',
          zhiwu: '营部党委委员',
          danwei2: '一营一连'
        },
        {
          name: '赵超',
          danwei: '营部',
          zhiwu: '旅部党委委员',
          danwei2: '一营二连'
        },
        {
          name: '刘伟',
          danwei: '旅部',
          zhiwu: '旅部党委委员',
          danwei2: '二营'
        },
        {
          name: '金一',
          danwei: '营部',
          zhiwu: '旅部党委委员',
          danwei2: '二营一连'
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
