<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>公用物资管理</span>
      </div>
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="物资名：" class="filter-item">
            <el-input
              v-model="listQuery.params.a"
              type="text"
              class="filter-item"
              placeholder="请输入物资名"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="物资类型：" class="filter-item">
            <el-cascader
              ref="area"
              v-model="listQuery.params.b"
              class="filter-item"
              :options="stuffList"
              :props="{ checkStrictly: true, expandTrigger: 'hover', label: 'label', value: 'id' }"
              clearable
            >
              <template slot-scope="{ node, data }">
                <span class="123456" @click="cascaderRadioClick(data.id,1)">{{ data.label }}</span>
              </template>
            </el-cascader>
          </el-form-item>
          <el-form-item label="所属部门：" class="filter-item">
            <el-cascader
              ref="area"
              v-model="listQuery.params.c"
              class="filter-item"
              :options="treeData"
              :props="{ checkStrictly: true, expandTrigger: 'hover', label: 'label', value: 'id' }"
              clearable
            >
              <template slot-scope="{ node, data }">
                <span class="123456" @click="cascaderRadioClick(data.id,2)">{{ data.label }}</span>
              </template>
            </el-cascader>
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
          </el-form-item>
        </el-form>
      </div>
      <el-table v-loading="listLoading" stripe :data="list" class="t-bd" fit highlight-current-row>
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column property="a" label="物资名" />
        <el-table-column property="b" label="物资类型" />
        <el-table-column property="c" label="所属部门" />
        <el-table-column property="d" label="存放位置" />
        <el-table-column property="e" label="库存总数" />
        <el-table-column property="f" label="现存个数" />
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <div class="t-col-operate">
              <i
                class="el-icon-tickets primary table-i"
                title="使用记录"
                @click="details(1,scope.row.a,scope.row)"
              />
              <i
                class="el-icon-edit-outline warning table-i"
                title="借出"
                @click="borrow(scope.row.a,scope.row)"
              />
              <i
                class="el-icon-folder-checked warning table-i"
                title="归还"
                @click="giveBack(scope.row.a,scope.row)"
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
        <el-card>
          <el-table v-loading="listLoading2" stripe :data="list2" class="t-bd" fit highlight-current-row>
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column property="a" label="姓名" />
            <el-table-column property="b" label="借出时间" />
            <el-table-column property="c" label="归还时间" />
          </el-table>
        </el-card>
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
                <el-form-item label="物资名称：">
                  <el-input v-model="form.a" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="物资类型：">
                  <el-cascader
                    ref="area"
                    v-model="form.b"
                    class="filter-item"
                    :options="stuffList"
                    :props="{ checkStrictly: true, expandTrigger: 'hover', label: 'label', value: 'id' }"
                    clearable
                  >
                    <template slot-scope="{ node, data }">
                      <span class="123456" @click="cascaderRadioClick(data.id,3)">{{ data.label }}</span>
                    </template>
                  </el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所属部门：">
                  <el-cascader
                    ref="area"
                    v-model="form.c"
                    class="filter-item"
                    :options="treeData"
                    :props="{ checkStrictly: true, expandTrigger: 'hover', label: 'label', value: 'id' }"
                    clearable
                  >
                    <template slot-scope="{ node, data }">
                      <span class="123456" @click="cascaderRadioClick(data.id,4)">{{ data.label }}</span>
                    </template>
                  </el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="存放位置：">
                  <el-input v-model="form.d" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="库存总数：">
                  <el-input v-model="form.e" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="现存个数：">
                  <el-input v-model="form.f" class="form-item1" />
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
    <!--借阅-->
    <el-dialog
      class="abow_dialog "
      :title="title"
      :visible.sync="dialog3"
      :close-on-click-modal="false"
      width="800px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form :model="form" label-position="right" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="使用者姓名：">
                  <el-input v-model="form.a" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所属部门：">
                  <el-cascader
                    ref="area"
                    v-model="form.c"
                    class="filter-item"
                    :options="treeData"
                    :props="{ checkStrictly: true, expandTrigger: 'hover', label: 'label', value: 'id' }"
                    clearable
                  >
                    <template slot-scope="{ node, data }">
                      <span class="123456" @click="cascaderRadioClick(data.id,4)">{{ data.label }}</span>
                    </template>
                  </el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="借用个数：">
                  <el-input v-model="form.d" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="起始日期：">
                  <el-date-picker
                    v-model="form.e"
                    type="datetime"
                    placeholder="选择日期时间"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="预计归还日期：">
                  <el-date-picker
                    v-model="form.f"
                    type="datetime"
                    placeholder="选择日期时间"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog3 = false">取消</el-button>
        <el-button type="primary" @click="dialog3 = false">确定</el-button>
      </div>
    </el-dialog>

    <!--归还-->
    <el-dialog
      class="abow_dialog "
      title="归还"
      :visible.sync="dialog4"
      :close-on-click-modal="false"
      width="800px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form :model="form" label-position="right" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="使用者姓名：">
                  <el-input v-model="form.a" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="所属部门：">
                  <el-cascader
                    ref="area"
                    v-model="form.c"
                    class="filter-item"
                    :options="treeData"
                    :props="{ checkStrictly: true, expandTrigger: 'hover', label: 'label', value: 'id' }"
                    clearable
                  >
                    <template slot-scope="{ node, data }">
                      <span class="123456" @click="cascaderRadioClick(data.id,4)">{{ data.label }}</span>
                    </template>
                  </el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="归还个数：">
                  <el-input v-model="form.d" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="起始日期：">
                  <el-date-picker
                    v-model="form.e"
                    type="datetime"
                    placeholder="选择日期时间"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="归还日期：">
                  <el-date-picker
                    v-model="form.f"
                    type="datetime"
                    placeholder="选择日期时间"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog3 = false">取消</el-button>
        <el-button type="primary" @click="dialog3 = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { typeList } from '../mockData'
import { region } from '../../../barracks/mockData'
export default {
  data() {
    return {
      title: '编辑',
      value1: null,
      stuffList: typeList,
      treeData: region,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          a: '',
          b: '',
          c: ''
        }
      },
      list: [
        {
          a: '对讲机',
          b: '战备物资',
          c: '作训科',
          d: '12楼5层',
          e: '200',
          f: '48'
        }
      ],
      list2: [
        {
          a: '刘明',
          b: '2020-08-14 11:32',
          c: '--'
        },
        {
          a: '王海洋',
          b: '2020-08-09 9:10',
          c: '2020-08-11 17:55'
        },
        {
          a: '赵易龙',
          b: '2020-08-01 17:31',
          c: '2020-08-03 8:00'
        },
        {
          a: '刘军',
          b: '2020-07-23 10:11',
          c: '2020-07-28 15:35'
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
      listLoading2: false,
      dialog: false,
      dialog2: false,
      dialog3: false,
      dialog4: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleCreate() {
      this.title = '新增物资'
      this.dialog2 = true
      this.form = {}
    },
    getList() { },
    cascaderRadioClick(val, type) {
      if (type === 1) {
        this.listQuery.params.b = val
      } else if (type === 2) {
        this.listQuery.params.c = val
      } else if (type === 3) {
        this.form.b = val
      } else if (type === 4) {
        this.form.c = val
      }
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
    borrow(id, row) {
      this.title = '借出'
      this.dialog3 = true
    },
    giveBack(id, row) {
      this.title = '归还'
      this.dialog4 = true
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
