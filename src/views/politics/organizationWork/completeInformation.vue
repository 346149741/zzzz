<template>
  <div class="app-container">
    <el-row :gutter="20">
      <zuzhitree />
      <el-col :span="19">
        <el-card class="box-card app-body">
          <div slot="header" class="clearfix">
            <span>组织信息健全</span>
          </div>
          <div style="margin-bottom:20px">
            <el-button class="filter-item btn-base filter-add-btn" @click="dialog1 = true">新增</el-button>
          </div>
          <div class="filter-container">
            <el-tabs v-model="activeName">
              <el-tab-pane label="党支部" name="first" />
              <el-tab-pane label="团支部" name="second" />
            </el-tabs>
            <el-table stripe :data="list" class="t-bd" fit highlight-current-row>
              <el-table-column type="index" label="序号" width="50" />
              <el-table-column property="type" label="组织类型" />
              <el-table-column property="name" label="姓名" />
              <el-table-column property="sex" label="性别" />
              <el-table-column property="danwei" label="单位" />
              <el-table-column property="junxian" label="军衔" />
              <el-table-column property="zhiwu" label="职务" />
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
      title="新增委员"
      :visible.sync="dialog1"
      width="500px"
      class="small_dialog"
      :close-on-click-modal="false"
    >
      <div class="dialog-content">
        <el-form label-width="120px">
          <el-form-item label="组织类型:">
            <el-select v-model="form.type" class="form-item1" placeholder="请选择组织类型">
              <el-option label="党组织" value="0" />
              <el-option label="团组织" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="姓名:">
            <el-input v-model="form.name" class="form-item1" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item label="性别:">
            <el-input v-model="form.sex" class="form-item1" placeholder="请输入性别" />
          </el-form-item>
          <el-form-item label="单位：">
            <el-input v-model="form.danwei" class="form-item1" placeholder="请输入单位" />
          </el-form-item>
          <el-form-item label="军衔：">
            <el-input v-model="form.junxian" class="form-item1" placeholder="请输入军衔" />
          </el-form-item>
          <el-form-item label="职务：">
            <el-input v-model="form.zhiwu" class="form-item1" placeholder="请输入职务" />
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
      activeName: 'first',
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {

        }
      },
      total: null, // 总数
      list: [
        {
          type: '团组织',
          name: '高山',
          sex: '男',
          danwei: '三连',
          junxian: '少尉',
          zhiwu: '旅部党委委员'
        },
        {
          type: '团组织',
          name: '平原',
          sex: '男',
          danwei: '勤务连',
          junxian: '少尉',
          zhiwu: '团委副书记'
        },
        {
          type: '团组织',
          name: '张三',
          sex: '男',
          danwei: '侦查营',
          junxian: '少尉',
          zhiwu: '团纪委书记'
        },
        {
          type: '团组织',
          name: '李四',
          sex: '男',
          danwei: '三连',
          junxian: '少尉',
          zhiwu: '团委委员'
        },
        {
          type: '团组织',
          name: '王五',
          sex: '男',
          danwei: '三连',
          junxian: '少尉',
          zhiwu: '团委委员'
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
