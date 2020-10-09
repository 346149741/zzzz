<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>反无人机设备注册</span>
      </div>
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="设备编号：" class="filter-item">
            <el-input
              v-model="listQuery.params.a"
              type="text"
              class="filter-item"
              placeholder="请输入设备编号"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="设备名称：" class="filter-item">
            <el-input
              v-model="listQuery.params.b"
              type="text"
              class="filter-item"
              placeholder="请输入设备名称"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="注册时间：" class="filter-item">
            <el-date-picker
              v-model="listQuery.params.value1"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>

          <el-form-item label="设备类型：" class="filter-item">
            <el-select
              v-model="listQuery.params.isshenpi"
              clearable
              class="form-item"
              placeholder="请选择设备类型"
            >
              <el-option label="侦探雷达" value="已通过1" />
              <el-option label="固定干扰器" value="未通过2" />
              <el-option label="光电探测器" value="未通过3" />
            </el-select>
          </el-form-item>
          <el-form-item label="启用状态：" class="filter-item">
            <el-select
              v-model="listQuery.params.isshenpi2"
              clearable
              class="form-item"
              placeholder="请选择启用状态"
            >
              <el-option label="已启用" value="已通过1" />
              <el-option label="未启用" value="未通过2" />
            </el-select>
          </el-form-item>
          <el-form-item label="启用状态：" class="filter-item">
            <el-select
              v-model="listQuery.params.isshenpi3"
              clearable
              class="form-item"
              placeholder="请选择启用状态"
            >
              <el-option label="运行中" value="已通过1" />
              <el-option label="故障" value="未通过2" />
              <el-option label="离线" value="未通过2" />
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
              icon="mr10 iconfont el-icon-folder-add"
              @click="handleCreate"
            >新增
            </el-button>
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconxinzengh"
            >批量启用
            </el-button>
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconxinzengh"
            >批量禁用
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table v-loading="listLoading" stripe :data="list" class="t-bd" fit highlight-current-row>
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="ID" width="50" />
        <el-table-column property="a" label="设备编号" />
        <el-table-column property="b" label="设备名称" />
        <el-table-column property="c" label="设备品牌" />
        <el-table-column property="d" label="设备类型" />
        <el-table-column property="e" label="注册时间" />
        <el-table-column property="f" label="启用状态" />
        <el-table-column property="g" label="设备状态" />
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <div class="t-col-operate">
              <i
                class="el-icon-tickets primary table-i"
                title="详情"
                @click="details(2,scope.row.a,scope.row)"
              />
              <i
                v-if="scope.row.f!=='已启用'"
                class="iconfont iconchuli2 warning table-i"
                title="启用"
                @click="details(2,scope.row.a,scope.row)"
              />
              <i
                v-else
                class="iconfont iconbianji1 warning table-i"
                title="禁用"
                @click="details(2,scope.row.a,scope.row)"
              />
              <i class="el-icon-delete danger table-i" title="删除" />
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
      <div v-if="step===0">
        <div class="dialog-content">
          <div class="dialog-item">
            <el-form :model="form" label-position="right" label-width="120px">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="设备编号：">
                    <el-input v-model="form.a" class="form-item1" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="设备名称：">
                    <el-input v-model="form.b" class="form-item1" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="设备品牌：">
                    <el-input v-model="form.c" class="form-item1" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="设备型号：">
                    <el-input v-model="form.d" class="form-item1" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="设备类型：">
                    <el-select v-model="form.e" class="form-item1" placeholder="请选择设备类型">
                      <el-option label="探测雷达" value="待审批" />
                      <el-option label="光电探测器" value="已通过1" />
                      <el-option label="固定干扰器" value="未通过2" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="通信接口：">
                    <el-select v-model="form.f" class="form-item1" placeholder="请选择设备类型">
                      <el-option label="自动匹配" value="待审批" />
                      <el-option label="RJ45" value="已通过1" />
                      <el-option label="RS-232" value="未通过2" />
                      <el-option label="RS-485" value="未通过2" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="服务器IP：">
                    <el-input v-model="form.g" class="form-item1" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="对应端口：">
                    <el-input v-model="form.h" class="form-item1" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button @click="dialog2 = false">取消</el-button>
          <el-button type="primary" @click="step=1">下一步</el-button>
        </div>
      </div>

      <div v-else>
        <div class="dialog-content">
          <div class="dialog-item">
            <el-form :model="form" label-position="right" label-width="120px">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="探测距离：">
                    <el-input v-model="form.aa" class="form-item1" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="峰值功率：">
                    <el-input v-model="form.ab" class="form-item1" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="工作频段：">
                    <el-input v-model="form.ac" class="form-item1" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="测距精度：">
                    <el-input v-model="form.ad" class="form-item1" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="测速精度：">
                    <el-input v-model="form.ae" class="form-item1" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="方位角精度：">
                    <el-input v-model="form.af" class="form-item1" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="俯仰角精度：">
                    <el-input v-model="form.ag" class="form-item1" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
        <div slot="footer" class="dialog-footer" style="text-align: center">
          <el-button type="primary" @click="step=0">上一步</el-button>
          <el-button type="primary" @click="dialog2 = false">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>

export default {
  data() {
    return {
      step: 0,
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
          a: 'FZLD-00001',
          b: '无人机反制探测雷达',
          c: '探鹰',
          d: '探测雷达',
          e: '2020-02-02 20:20:20',
          f: '已启用',
          g: '运行中'
        },
        {
          a: 'FZLD-00002',
          b: '无人机反制固定干扰器',
          c: '猎鹰',
          d: '固定干扰器',
          e: '2020-02-02 20:23:12',
          f: '未启用',
          g: '离线'
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
      this.step = 0
    },
    getList() {
    },
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
