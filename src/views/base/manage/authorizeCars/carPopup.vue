<template>
  <el-dialog class="abow_dialog" width="80%" title="选择车辆" :visible.sync="dialogVisible" :close-on-click-modal="false" append-to-body left>
    <div class="dialog-content">
      <div class="dialog-item">
        <div class="filter-container">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="车牌号：" class="filter-item">
              <el-input
                v-model="listQuery.params.carNo"
                type="text"
                prefix-icon="el-icon-search"
                class="filter-item mr10"
                placeholder="请输入标识号"
                @keyup.enter.native="handleFilter"
              />
            </el-form-item>
            <el-form-item label="单位部门：" class="filter-item">
              <el-select
                v-model="listQuery.params.unitId"
                placeholder="请选择"
                clearable
                class="filter-item mr10"
                filterable
                @change="handleFilter"
              >
                <el-option
                  v-for="item in departArr"
                  :key="item.id"
                  :label="item.organizationName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="车辆用途：" class="filter-item">
              <el-select
                v-model="listQuery.params.carUseId"
                placeholder="请选择"
                clearable
                class="filter-item mr10"
                @change="handleFilter"
              >
                <el-option
                  v-for="item in useList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-form-item>
            <el-form-item class="filter-item">
              <el-button
                v-waves
                class="filter-item btn-base"
                type="primary"
                icon="mr10 iconfont iconsousuo"
                @click="handleFilter"
              >{{ $t('table.search') }}</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          border
          @select="handleSelect"
        >
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            label="车牌号"
          >
            <template slot-scope="scope">{{ scope.row.carNo }}</template>
          </el-table-column>
          <el-table-column
            prop="carType"
            label="车辆类型"
          />
          <el-table-column
            prop="carUse"
            label="车辆用途"
            show-overflow-tooltip
          />
          <el-table-column
            prop="unitName"
            label="部门单位"
            show-overflow-tooltip
          />
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
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">{{ $t('table.cancel') }}</el-button>
      <el-button type="primary" @click="getCar">{{ $t('table.confirm') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getUnSelCarPage, saveSelCar } from '@/api/base/authorize'
import { dictBatch } from '@/api/base/dictDetail'
import { getAllOrg } from '@/api/base/organ'
export default {
  name: 'Index',
  data() {
    return {
      departArr: [],
      useList: [],
      tableData: [],
      total: null,
      listLoading: true,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          carNo: '',
          unitId: '',
          carUseId: '',
          groupId: ''
        }
      },
      dialogVisible: false,
      selectionData: [],
      selIds: []
    }
  },
  methods: {
    geDictList() {
      dictBatch(['3019', '3046', '3035', '3047']).then(res => {
        this.typeList = res.data['3019']
        this.useList = res.data['3046']
        this.getList()
      })
      getAllOrg().then(res => {
        this.departArr = res.data
      })
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList()
    },
    getList() {
      getUnSelCarPage(this.listQuery).then(res => {
        this.listLoading = false
        this.total = res.data.totalElements
        this.tableData = res.data.content
        this.$nextTick(() => {
          this.tableData.forEach(item => {
            if (this.selIds.indexOf(item.id) >= 0) {
              this.$refs.multipleTable.toggleRowSelection(item)
            }
          })
        })
      })
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.getList()
    },
    handleSelect(info, row) {
      // 判断选中还是取消选中
      const checkAble = info.filter(item => { return item.id === row.id })
      if (checkAble.length > 0) {
        this.selIds.push(row.id)
      } else {
        this.selIds.forEach((item, index) => {
          if (item === row.id) {
            this.selIds.splice(index, 1)
          }
        })
      }
    },
    toggleSelection() {
      this.selectionData.forEach(row => {
        this.$refs.multipleTable.toggleRowSelection(row)
      })
    },
    open(id) {
      this.dialogVisible = true
      this.listQuery.params.groupId = id
      this.geDictList()
    },
    getCar() {
      console.log(this.selIds)
      const mydata = {
        carIds: this.selIds,
        groupId: this.listQuery.params.groupId
      }
      saveSelCar(mydata).then(res => {
        this.$message.success(res.data, 2000)
        this.dialogVisible = false
      })
      this.$emit('refresh')
    }
  }
}
</script>

<style scoped>

</style>
