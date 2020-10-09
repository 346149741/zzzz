<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>反无人机警情记录</span>
      </div>
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="设备类型：" class="filter-item">
            <el-select
              v-model="listQuery.params.a"
              clearable
              class="form-item"
              placeholder="请选择设备类型"
            >
              <el-option label="侦探雷达" value="已通过1" />
              <el-option label="固定干扰器" value="未通过2" />
              <el-option label="光电探测器" value="未通过3" />
            </el-select>
          </el-form-item>
          <el-form-item label="威胁等级：" class="filter-item">
            <el-select
              v-model="listQuery.params.b"
              clearable
              class="form-item"
              placeholder="请选择威胁等级"
            >
              <el-option label="未判定" value="已通过1" />
              <el-option label="1" value="未通过2" />
              <el-option label="2" value="未通过3" />
              <el-option label="3" value="未通过3" />
              <el-option label="4" value="未通过3" />
              <el-option label="无威胁" value="未通过3" />
            </el-select>
          </el-form-item>
          <el-form-item label="警情时间：" class="filter-item">
            <el-date-picker
              v-model="listQuery.params.value1"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item label="处理状态：" class="filter-item">
            <el-select
              v-model="listQuery.params.d"
              clearable
              class="form-item"
              placeholder="请选择处理状态"
            >
              <el-option label="已诱导" value="已通过1" />
              <el-option label="已反制" value="未通过2" />
              <el-option label="已忽略" value="未通过3" />
            </el-select>
          </el-form-item>
          <el-form-item class="filter-item">
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont el-icon-search"
              @click="handleFilter"
            >{{ $t('table.search') }}
            </el-button>
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
            >一键诱导
            </el-button>
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
            >一键反制
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table v-loading="listLoading" stripe :data="list" class="t-bd" fit highlight-current-row>
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="ID" width="50" />
        <el-table-column property="a" label="探测设备" />
        <el-table-column property="b" label="威胁等级" />
        <el-table-column property="c" label="警情时间" />
        <el-table-column property="d" label="警情位置" />
        <el-table-column property="e" label="高度（m）" />
        <el-table-column property="f" label="状态" />
        <el-table-column property="g" label="视频联动">
          <template slot-scope="scope">
            <el-button size="mini" type="primary">实时监控</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="320px">
          <template slot-scope="scope">
            <el-button size="mini" type="primary">轨迹</el-button>
            <el-button size="mini" type="primary">诱导</el-button>
            <el-button size="mini" type="primary">反制</el-button>
            <el-button size="mini" type="primary">忽略</el-button>
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
    </el-card>
    <!--查看-->
    <el-dialog
      class="abow_dialog detail-form"
      title="详情"
      :visible.sync="dialog"
      :close-on-click-modal="false"
      width="800px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form :model="form" label-position="right" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="序号：">1</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="营房名称：">{{ form.a }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单位名称：">{{ form.b }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="地址：">{{ form.c }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="坐落号：">{{ form.d }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="面积：">{{ form.e }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="栋号：">{{ form.f }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="用途：">{{ form.g }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取消</el-button>
        <el-button type="primary" @click="dialog = false">确定</el-button>
      </div>
    </el-dialog>
    <!--编辑-->
    <el-dialog
      class="abow_dialog "
      :title="title"
      :visible.sync="dialog2"
      :close-on-click-modal="false"
      width="800px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form :model="form" label-position="right" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="营房名称：">
                  <el-input v-model="form.a" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单位名称：">
                  <el-input v-model="form.b" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="地址：">
                  <el-input v-model="form.c" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="坐落号：">
                  <el-input v-model="form.d" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="面积：">
                  <el-input v-model="form.e" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="栋号：">
                  <el-input v-model="form.f" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="用途：">
                  <el-select v-model="form.g" class="form-item1" placeholder="请选择性别">
                    <el-option label="住宅" value="待审批" />
                    <el-option label="器械楼" value="已通过1" />
                    <el-option label="训练楼" value="未通过2" />
                    <el-option label="办公楼" value="未通过3" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog2 = false">取消</el-button>
        <el-button type="primary" @click="dialog2 = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

export default {
  data() {
    return {
      title: '编辑',
      treeData: [],
      value1: null,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          b: ''
        }
      },
      list: [
        {
          a: '无人机反制探测雷达',
          b: '未判定',
          c: '2020-02-02 20:20:20',
          d: '[116.403694,39.915156]',
          e: '604.28',
          f: '已诱导'
        }
      ],
      form: {
        a: '',
        b: '',
        c: '',
        d: '',
        e: '',
        f: '²',
        g: ''
      },
      total: null, // 总数
      listLoading: false,
      dialog: false,
      dialog2: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleCreate() {
      this.title = '新增'
      this.dialog2 = true
      this.form = {}
    },
    getList() { },
    cascaderRadioClick(val, name) {
      this.listQuery.params.b = val
    },
    handleFilter() {
      this.listQuery.pageNo = 1
    },
    details(e, id, row) {
      if (e === 1) {
        this.dialog = true
      } else {
        this.title = '编辑'
        this.dialog2 = true
      }
      this.getdetails(id)
      this.form = { ...row }
    },
    getdetails(id) {
      // floorget(id).then((response) => {
      //   this.ruleForm = response.data
      // })
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.getList()
    }
  }
}
</script>
<style scoped>
  .photo {
    width: 100px;
    height: 100px;
  }
</style>
