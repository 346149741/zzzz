<template>
  <div class="app-container">
    <el-row :gutter="20">
      <zuzhitree />
      <el-col :span="19">
        <el-card class="box-card app-body">
          <div slot="header" class="clearfix">
            <span>党员管理</span>
          </div>
          <div class="filter-container">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="姓名：" class="filter-item">
                <el-input
                  v-model="listQuery.params.name"
                  type="text"
                  class="filter-item"
                  placeholder="请输入姓名"
                />
              </el-form-item>
              <el-form-item label="性别：" class="filter-item">
                <el-input
                  v-model="listQuery.params.sex"
                  type="text"
                  class="filter-item"
                  placeholder="请输入性别"
                />
              </el-form-item>
              <el-form-item label="单位：" class="filter-item">
                <el-input
                  v-model="listQuery.params.danwei"
                  type="text"
                  class="filter-item"
                  placeholder="请输入单位"
                />
              </el-form-item>
              <el-form-item label="接转类型：" class="filter-item">
                <el-select
                  v-model="listQuery.params.Status"
                  clearable
                  class="form-item"
                  placeholder="请选择接转类型"
                >
                  <el-option label="转入" value="0" />
                  <el-option label="转出" value="1" />
                </el-select>
              </el-form-item>
              <el-form-item label="接转原因：" class="filter-item">
                <el-select
                  v-model="listQuery.params.Status"
                  clearable
                  class="form-item"
                  placeholder="请选择接转原因"
                >
                  <el-option label="组织安排" value="0" />
                </el-select>
              </el-form-item>
              <el-form-item label="入党时间：" class="filter-item">
                <el-date-picker
                  v-model="value1"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </el-form-item>
              <el-form-item label="接转时间：" class="filter-item">
                <el-date-picker
                  v-model="value2"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </el-form-item>
              <el-form-item class="filter-item">
                <el-button
                  v-waves
                  class="filter-item btn-base"
                  type="primary"
                >{{ $t('table.search') }}</el-button>
                <el-button class="filter-item btn-base filter-add-btn" type="info">重置</el-button>
                <el-button class="filter-item btn-base filter-add-btn" @click="dialog1 = true">转移</el-button>
                <el-button class="filter-item btn-base filter-add-btn">生成证明</el-button>
              </el-form-item>
            </el-form>
            <el-table stripe :data="list" class="t-bd" fit highlight-current-row>
              <el-table-column type="selection" width="50" />
              <el-table-column property="id" label="档案号" />
              <el-table-column property="name" label="姓名" />
              <el-table-column property="sex" label="性别" />
              <el-table-column property="danwei" label="单位" />
              <el-table-column property="time1" label="入党时间" />
              <el-table-column property="type" label="接转类型" />
              <el-table-column property="time2" label="接转时间" />
              <el-table-column property="yuanyin" label="接转原因" />
              <el-table-column property="status" label="当前状态" />
              <el-table-column property="file" label="组织关系证明" />
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
                    <i class="el-icon-s-check info table-i" title="审批" @click="dialog2 = true" />
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
      title="转移"
      :visible.sync="dialog1"
      width="1260px"
      class="abow_dialog"
      :close-on-click-modal="false"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <img src="./img03.png">
          <el-form label-width="100px">
            <div class="dialog-item-title">党员信息</div>
            <el-row :gutter="20">
              <el-col :md="24" :lg="8">
                <el-form-item label="入党时间：">2015-10-02</el-form-item>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-form-item label="原单位：">129师新一团</el-form-item>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-form-item label="迁入单位：">
                  <el-input v-model="form.danwei" class="form-item1" placeholder="请选择迁入单位" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-form-item label="接转类型：">
                  <el-select v-model="form.type" class="form-item1" placeholder="请选择接转类型">
                    <el-option label="转入" value="0" />
                    <el-option label="转出" value="1" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-form-item label="接转原因：">
                  <el-select v-model="form.yuanyin" class="form-item1" placeholder="请选择接转原因">
                    <el-option label="组织安排" value="0" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-form-item label="党员证明：">
                  <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :file-list="fileList"
                  >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip" />
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog1=false">取 消</el-button>
        <el-button type="primary" @click="dialog1=false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="审批"
      :visible.sync="dialog2"
      width="1260px"
      class="abow_dialog"
      :close-on-click-modal="false"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <img src="./img03.png">
          <el-form label-width="100px">
            <div class="dialog-item-title">党员信息</div>
            <el-row :gutter="20">
              <el-col :md="24" :lg="8">
                <el-form-item label="入党时间：">2015-10-02</el-form-item>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-form-item label="原单位：">129师新一团</el-form-item>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-form-item label="迁入单位：">三连五班</el-form-item>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-form-item label="接转类型：">转入</el-form-item>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-form-item label="接转原因：">组织安排</el-form-item>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-form-item label="党员证明：">入党申请书.doc</el-form-item>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-form-item label="审核意见：">
                  <el-input v-model="form.yijian" class="form-item1" placeholder="请输入审核意见" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-form-item label="审核人：">
                  <el-input v-model="form.people" class="form-item1" placeholder="请选择审核人" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialog2=false">同意</el-button>
        <el-button @click="dialog2=false">拒绝</el-button>
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
      value2: null,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {

        }
      },
      total: null, // 总数
      list: [
        {
          id: '1589',
          name: '高山',
          sex: '男',
          danwei: '三连',
          time1: '2019-08-18',
          type: '转入',
          time2: '2018-05-25',
          yuanyin: '组织安排',
          status: '机关鉴定通过',
          file: '证明文件.doc'
        },
        {
          id: '1590',
          name: '平原',
          sex: '男',
          danwei: '勤务连',
          time1: '2019-08-18',
          type: '转入',
          time2: '2018-05-25',
          yuanyin: '组织安排',
          status: '已转正',
          file: '证明文件.doc'
        },
        {
          id: '1591',
          name: '张三',
          sex: '男',
          danwei: '侦查营',
          time1: '2019-08-18',
          type: '转入',
          time2: '2018-05-25',
          yuanyin: '组织安排',
          status: '已转正',
          file: '证明文件.doc'
        },
        {
          id: '1592',
          name: '李四',
          sex: '男',
          danwei: '三连',
          time1: '2019-08-18',
          type: '转入',
          time2: '2018-05-25',
          yuanyin: '组织安排',
          status: '机关鉴定通过',
          file: '证明文件.doc'
        },
        {
          id: '1593',
          name: '王五',
          sex: '男',
          danwei: '三连',
          time1: '2019-08-18',
          type: '转入',
          time2: '2018-05-25',
          yuanyin: '组织安排',
          status: '已拒绝',
          file: '证明文件.doc'
        }
      ],
      dialog1: false,
      dialog2: false,
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
.dialog-item-title {
  padding-left: 0;
  margin-bottom: 20px;
}
</style>
