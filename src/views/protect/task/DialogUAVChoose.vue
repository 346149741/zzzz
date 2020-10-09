<template>
  <div>
    <el-dialog
      v-if="visible"
      class="abow_dialog"
      title="无人机选择"
      :visible.sync="visible"
      :close-on-click-modal="false"
      width="80%"
      :before-close="handleCancel"
    >
      <div class="dialog-content">
        <div class="dialog-table">
          <div class="filter-container">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="标识号:" class="filter-item">
                <el-input
                  v-model="listQuery.params.code"
                  class="filter-item mr10"
                  placeholder="请输入标识号"
                  prefix-icon="el-icon-search"
                  @keyup.enter.native="handleFilter"
                />
              </el-form-item>
              <el-form-item label="品牌:" class="filter-item">
                <el-select
                  v-model="listQuery.params.brandId"
                  placeholder="选择品牌"
                  class="filter-item mr10"
                  clearable
                  @change="handleFilter"
                >
                  <el-option
                    v-for="item in dictList['2023']"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="型号:" class="filter-item">
                <el-input
                  v-model="listQuery.params.model"
                  class="filter-item mr10"
                  placeholder="请输入型号"
                  prefix-icon="el-icon-search"
                  @keyup.enter.native="handleFilter"
                  @change="handleFilter"
                />
              </el-form-item>
              <el-form-item label="状态:" class="filter-item">
                <el-select
                  v-model="listQuery.params.useStatus"
                  placeholder="请选择状态"
                  clearable
                  class="filter-item mr10"
                  prefix-icon="el-icon-search"
                >
                  <el-option
                    v-for="item in dictList[2028]"
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
                >查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <vxe-table
            ref="xTable1"
            border
            height="300"
            :data="list"
            :radio-config="{highlight: true}"
            @radio-change="radioChangeEvent"
          >
            <vxe-table-column type="radio" title="请选择" width="100" />
            <vxe-table-column field="code" title="标识号" />
            <vxe-table-column field="brand" title="设备品牌" />
            <vxe-table-column field="model" title="设备型号" />
            <vxe-table-column field="typeName" title="平台类型" />
            <vxe-table-column field="powerType" title="动力类型" />
            <vxe-table-column field="useStatus" :formatter="useStatusFormatter" title="使用状态" />
            <vxe-table-column field="createTime" title="注册日期" />
          </vxe-table>
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
      <span slot="footer" class="dialog-footer">
        <el-button class="un-primary-btn" @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleOK">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import UavAPI from '@/api/base/uav'
import { dictCode, dictBatch } from '@/api/base/dictDetail'
export default {
  name: 'DialogUAVChoose',
  props: {
    selectId: {
      type: String,
      default: ''
    },
    visible: {
      required: true,
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      listLoading: true,
      total: 0,
      list: [],
      dictList: { },
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          code: '',
          brandId: '',
          model: '',
          useStatus: ''
        }
      },
      selectRow: {}
    }
  },
  watch: {
    visible(val) {
      if (!val) return
      this.getList()
    }
  },
  mounted() {
    this.geDictList()
  },
  methods: {
    handleCancel() {
      this.$emit('update:visible', false)
    },
    handleOK() {
      this.$emit('handleOK', this.selectRow)
      this.handleCancel()
    },
    useStatusFormatter(obj) {
      const cell = this.dictList[2028].find((item) => item.key === obj.cellValue)
      return cell ? cell.value : '--'
    },
    radioChangeEvent({ row }) {
      this.selectRow = row
    },
    geDictList() {
      dictBatch(['2024', '2023', '2025', '2028', '2012']).then(res => {
        this.dictList = res.data
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
    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList()
    },
    getList() {
      this.listLoading = true
      UavAPI.page(this.listQuery).then(response => {
        this.list = response.data.content
        this.total = response.data.totalElements
        this.listLoading = false
      }).then(() => this.setSelectedRowRadio())
    },
    setSelectedRowRadio() {
      if (this.selectId === '') {
        this.selectRow = null
      } else {
        this.selectRow = this.list.find((item) => item.id === this.selectId)
      }
      this.$refs.xTable1 && this.$refs.xTable1.setRadioRow(this.selectRow)
    },
    getStatusName(val) {
      const arr = this.dictList[['2028']].filter(item => item.key === val)
      if (arr.length > 0) {
        return arr[0].value
      } else {
        return '--'
      }
    },
    close() {
    }
  }
}
</script>

<style lang="scss" scoped>
  .videoLocation{
    position: absolute;
    top: 100px;
    right: 300px;
    z-index:1900;
    width: 1150px;
    height:auto;
    background-color: #fff;
    .video-title-main{
      color: #fff;
      background: #1C949A;
      display:flex ;
      justify-content: space-between;
      padding: 0 30px;
      height: 62px;
      line-height: 62px;
      .videoLocation-title{
        line-height: 62px;
        cursor: pointer;
      }
    }
    .video-body {
      padding: 50px 62px 38px;
      height: 800px;
      .item{
        margin-bottom: 10px;
        .img{
          width: 330px;
          height: 194px;
        }
      }
      .pagination-container{
        position: absolute;
        bottom: 0;
      }
    }
  }
</style>
