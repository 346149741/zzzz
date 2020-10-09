<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--表-->
      <el-col :span="16">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>表</span>
          </div>
          <!--搜索条件-->
          <div class="filter-container">
            <el-input
              v-model="javaPackage"
              type="text"
              style="width: 340px;"
              class="filter-item mr10"
              placeholder="请输入代码所在的包"
            />
            <el-button class="filter-item" type="primary" icon="mr10 iconfont iconxiangxia" @click="generate()">
              生成
            </el-button>
          </div>
          <el-table
            v-loading="tableListLoading"
            stripe
            :data="tableList"
            class="t-bd"
            :header-cell-style="{background:'#FAFAFA',color:'#A2A2B2','font-size':'14px'}"
            fit
            highlight-current-row
            @row-click="findColumnList"
            @selection-change="handleSelectionChange"
          >
            <el-table-column align="center" type="selection" />
            <el-table-column align="center" label="序号" width="50px">
              <template slot-scope="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="表名称">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="表注释">
              <template slot-scope="scope">
                <span>{{ scope.row.comment }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="数据行数">
              <template slot-scope="scope">
                <span>{{ scope.row.tableRows }}</span>
              </template>
            </el-table-column>
            <el-table-column label="创建时间">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="修改时间">
              <template slot-scope="scope">
                <span>{{ scope.row.updateTime }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.actions')" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <div class="t-col-operate">
                  <el-tooltip class="item" effect="dark" content="生成" placement="bottom">
                    <i class="iconfont iconxiangxia" @click="generate(scope.row.name)" />
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
          </el-table>

        </el-card>
      </el-col>
      <!--列-->
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>列</span>
          </div>

          <el-table
            v-loading="columnListLoading"
            stripe
            :data="columnList"
            class="t-bd"
            :header-cell-style="{background:'#FAFAFA',color:'#A2A2B2','font-size':'14px'}"
            fit
            highlight-current-row
          >
            <el-table-column align="center" label="序号" width="50px">
              <template slot-scope="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="列名称">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="类型">
              <template slot-scope="scope">
                <span>{{ scope.row.type }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { tableList, cloumnList, generate } from '@/api/base/code'

export default {
  name: 'Code',
  data() {
    return {
      tableListLoading: false,
      columnListLoading: false,
      dialogStatus: '',
      tableList: [],
      columnList: [],
      selectedTable: [],
      javaPackage: 'com.fan.framework'
    }
  },
  created() {
    this.findTableList()
  },
  methods: {
    findTableList() {
      this.tableListLoading = true
      tableList().then(res => {
        this.tableList = res.data
        this.tableListLoading = false
      })
    },
    findColumnList(row) {
      this.columnListLoading = true
      cloumnList(row.name).then(res => {
        this.columnList = res.data
        this.columnListLoading = false
      })
    },
    generate(tableName) {
      if (this.javaPackage === '') {
        this.$message.error('请输入代码所在的包')
        return
      }
      if (tableName !== undefined) {
        this.selectedTable = [tableName]
      }

      if (this.selectedTable.length === 0) {
        this.$message.error('请选择有效数据')
        return
      }
      generate(this.selectedTable.join(','), this.javaPackage).then(() => {
        this.$notify({
          title: '成功',
          message: '生成成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleSelectionChange(val) {
      this.selectedTable = val.map(function(item) {
        return item.name
      })
    }
  }
}
</script>
