<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>副食采购管理</span>
      </div>
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="食堂名称：" class="filter-item">
            <el-select
              v-model="listQuery.params.a"
              class="filter-item "
              placeholder="请选择"
              clearable
              @change="handleFilter"
            >
              <el-option
                v-for="item in canteenList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="日期：" class="filter-item">
            <el-date-picker
              v-model="listQuery.params.b"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
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
        <el-table-column property="a" label="食堂名称" />
        <el-table-column property="b" label="类型" />
        <el-table-column property="c" label="个数" />
        <el-table-column property="d" label="单价" />
        <el-table-column property="e" label="总价" />
        <el-table-column property="f" label="采购时间" />
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <div class="t-col-operate">
              <i
                class="el-icon-tickets primary table-i"
                title="详情"
                @click="details(1,scope.row.a,scope.row)"
              />
              <i
                class="el-icon-edit-outline warning table-i"
                title="编辑"
                @click="details(2,scope.row.a,scope.row)"
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
        <div class="dialog-item">
          <el-form :model="form" label-position="right" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="食堂名称：">{{ form.a }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="类型：">{{ form.b }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="个数：">{{ form.c }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单价：">{{ form.d }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="总价：">{{ form.e }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="采购时间：">{{ form.f }}</el-form-item>
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
                <el-form-item label="食堂名称：">
                  <el-select
                    v-model="form.a"
                    class="filter-item "
                    placeholder="请选择"
                    clearable
                    @change="handleFilter"
                  >
                    <el-option
                      v-for="item in canteenList"
                      :key="item.id"
                      :value="item.id"
                      :label="item.name"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="采购时间：">
                  <el-date-picker
                    v-model="form.b"
                    type="date"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="类型：">
                  <el-input v-model="form.d" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="个数：">
                  <el-input v-model="form.e" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单价：">
                  <el-input v-model="form.f" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="总价：">
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
  </div>
</template>
<script>
import { canteenList } from '../mockData'
export default {
  data() {
    return {
      canteenList,
      title: '编辑',
      treeData: [],
      value1: null,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          a: '',
          b: ''
        }
      },
      list: [
        {
          a: '机关1食堂',
          b: '咸菜',
          c: '200斤',
          d: '5元',
          e: '1000元',
          f: '2020-08-12'
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
