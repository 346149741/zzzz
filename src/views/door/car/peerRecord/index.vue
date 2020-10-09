<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>车辆通行记录</span>
      </div>
      <!--操作按钮-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="车牌号：" class="filter-item">
            <el-input
              v-model="listQuery.params.carNo"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入车牌号"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="通行地点：" class="filter-item">
            <el-input
              v-model="listQuery.params.trafficLocation"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入通行地点"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="驶入方向：" class="filter-item">
            <el-select
              v-model="listQuery.params.drivingDirections"
              placeholder="请选择"
              clearable
              class="filter-item mr10"
              @change="handleFilter"
            >
              <el-option
                v-for="item in inout"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="时间：" class="filter-item">
            <el-date-picker
              v-model="listQuery.params.date"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
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
      <!--门禁分页内容-->
      <el-table
        v-loading="listLoading"
        :data="tableData"
        :header-cell-style="{background:'#FAFAFA',color:'#A2A2B2','font-size':'14px'}"
        stripe
        class="t-bd"
        border
      >
        <el-table-column label="序号" fixed width="50px">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="通行时间" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ $moment(scope.row.a).format('YYYY-MM-DD hh:mm:ss') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="行驶方向" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.b }}</span>
          </template>
        </el-table-column>
        <el-table-column label="车牌号">
          <template slot-scope="scope">bc
            <span>{{ scope.row.c }}</span>
          </template>
        </el-table-column>
        <el-table-column label="车辆类型" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.d }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属单位/部门" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.e }}</span>
          </template>
        </el-table-column>
        <el-table-column label="通行地点" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.f }}</span>
          </template>
        </el-table-column>
        <el-table-column label="出入事由" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.g }}</span>
          </template>
        </el-table-column>
        <el-table-column label="放行方式" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.h }}</span>
          </template>
        </el-table-column>
        <el-table-column label="登记营门" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.i }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注说明" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.j }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="$t('table.actions')"
          fixed="right"
          class-name="small-padding fixed-width"
          width="160px"
        >
          <template slot-scope="scope">
            <div class="t-col-operate">
              <i class="el-icon-tickets primary table-i" title="查看" @click="handleView(scope.row)" />
              <i class="el-icon-help warning table-i" title="布控" @click="handleUpdate(scope.row)" />
              <i class="el-icon-notebook-2 table-i" title="通行记录" @click="handleRecordShow(scope.row)" />
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

    <!--布控弹出框-->
    <el-dialog
      class="abow_dialog"
      :title="dialogForm.title"
      :visible.sync="dialogForm.visible"
      :close-on-click-modal="false"
      width="50%"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="120px">
            <div class="dialog-item-title">车辆信息</div>
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="车牌号：" prop="carNo">
                  <el-input v-model="dataForm.c" class="form-item1" disabled />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="车辆类型：" prop="carType">
                  <el-input v-model="dataForm.d" class="form-item1" disabled />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="品牌型号：" prop="c">
                  <el-input value="五菱宏光" class="form-item1" disabled />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="车身颜色：" prop="d">
                  <el-input value="银色" class="form-item1" disabled />
                </el-form-item>
              </el-col>
            </el-row>
            <div class="dialog-item-title">驾驶人信息</div>
            <el-row>
              <el-col :md="24" :lg="12">
                <el-form-item label="驾驶人：" prop="driver">
                  <el-input value="李明觉" class="form-item1" disabled />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="性别：" prop="sex">
                  <el-input value="男" class="form-item1" disabled />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="手机号：" prop="phone">
                  <el-input value="18547522256" class="form-item1" disabled />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="机动车驾驶证：" prop="driversLicense">
                  <el-input value="4127011118545" class="form-item1" disabled />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="证件类型：" prop="certTypeName">
                  <el-input value="身份证号" class="form-item1" disabled />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="证件号码：" prop="certTypeNo">
                  <el-input value="412702198714523654" class="form-item1" disabled />
                </el-form-item>
              </el-col>
            </el-row>
            <div class="dialog-item-title">布控信息</div>
            <el-row>
              <el-col :md="24" :lg="12">
                <el-form-item label="布控类型：" prop="l">
                  <el-select v-model="dataForm.l" class="form-item1" placeholder="请选择布控类型">
                    <el-option v-for="item in controlTypeList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="布控时间：" prop="k">
                  <el-date-picker
                    v-model="dataForm.k"
                    class="form-item1"
                    type="date"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="布控地点：" prop="m">
                  <el-cascader
                    v-model="dataForm.m"
                    :options="provinceList"
                    :props="nativePlaceProps"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="un-primary-btn" @click="dialogForm.visible = false">取 消</el-button>
        <el-button type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>
    <!--详情查看-->
    <el-dialog
      class="abow_dialog detail-form"
      title="查看"
      :visible.sync="checkdetail"
      :close-on-click-modal="false"
      width="50%"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <div class="dialog-item-title">车辆信息</div>
          <el-form :model="dataForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="通行时间：">{{ $moment(dataForm.a).format('YYYY-MM-DD hh:mm:ss') }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="行驶方向：">{{ dataForm.b }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="车牌号：">{{ dataForm.c }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="车辆类型：">{{ dataForm.d }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="所属单位/部门：">{{ dataForm.e }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="通行地点：">{{ dataForm.f }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="出入事由：">{{ dataForm.g }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="放行方式：">{{ dataForm.h }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="登记营门：">{{ dataForm.i }}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注：">{{ dataForm.j }}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="抓拍图像：" class="unborder"><img class="temporary-img" src="/upload/test/car/car2.png"></el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <!--通行记录-->
    <el-dialog
      class="abow_dialog"
      title="通行记录"
      :visible.sync="recordDialog.visible"
      :close-on-click-modal="false"
      width="50%"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <div class="filter-container">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="时间：" class="filter-item">
                <el-date-picker
                  v-model="listQuery.params.date"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
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
          <div class="dialog-item-title">{{ recordDialog.title }}</div>
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            border
          >
            <el-table-column label="序号" fixed width="50px">
              <template slot-scope="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="通行时间"
              width="120"
            >
              <template slot-scope="scope">{{ $moment(scope.row.a).format('YYYY-MM-DD') }}</template>
            </el-table-column>
            <el-table-column
              prop="e"
              label="所处部门"
              width="120"
            />
            <el-table-column
              prop="f"
              label="通行地点"
              show-overflow-tooltip
            />
            <el-table-column
              prop="g"
              label="出入事由"
              show-overflow-tooltip
            />
            <el-table-column
              prop="h"
              label="放行方式"
              show-overflow-tooltip
            />
            <el-table-column
              prop="i"
              label="登记营门"
              show-overflow-tooltip
            />
          </el-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import peerRecordAPI from '@/api/door/peerRecord'
import { dictBatch } from '@/api/base/dictDetail'
import ConsequenceAPI from '@/api/base/consequence'
export default {
  name: 'Index',
  data() {
    return {
      controlTypeList: [],
      typeList: [],
      inout: [],
      provinceList: [],
      tableData: [],
      total: 0,
      listLoading: true,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          carNo: '',
          trafficLocation: '',
          drivingDirections: '',
          date: null,
          srartTime: '',
          endTime: ''
        }
      },
      dialogForm: {
        visible: false,
        title: '',
        type: 'add'
      },
      dataForm: {
        a: '',
        b: '',
        c: '',
        d: '',
        e: '',
        f: '',
        g: '',
        h: '',
        i: '',
        j: '',
        k: '',
        l: '',
        m: '',
        n: ''
      },
      rules: {
        a: [{ required: true, message: '请输入车牌号', trigger: 'blur' }],
        b: [{ required: true, message: '请选择车辆类型', trigger: 'blur' }],
        d: [{ required: true, message: '请输入品牌型号', trigger: 'blur' }],
        f: [{ required: true, message: '请输入车辆识别号', trigger: 'blur' }],
        g: [{ required: true, message: '请输入发动机号', trigger: 'blur' }],
        h: [{ required: true, message: '请选择车辆专属', trigger: 'blur' }],
        i: [{ required: true, message: '请输入领导人', trigger: 'blur' }],
        j: [{ required: true, message: '请选择单位', trigger: 'blur' }]
      },
      checkdetail: false,
      recordDialog: {
        visible: false,
        title: ''
      },
      nativePlaceProps: {
        value: 'code',
        label: 'name',
        children: 'city',
        expandTrigger: 'hover'
      }
    }
  },
  mounted() {
    this.geDictList()
  },
  methods: {
    geDictList() {
      dictBatch(['3010', '3012', '3059']).then(res => {
        this.typeList = res.data['3010']
        this.inout = res.data['3012']
        this.controlTypeList = res.data['3059']
        this.getList()
      })
      this.provinceList = ConsequenceAPI.getCity()
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      if (this.listQuery.params.date) {
        this.listQuery.params.startTime = this.listQuery.params.date[0]
        this.listQuery.params.endTime = this.listQuery.params.date[1]
      } else {
        this.listQuery.params.startTime = ''
        this.listQuery.params.endTime = ''
      }
      this.getList()
    },
    getList() {
      const res = peerRecordAPI.page(this.listQuery)
      this.listLoading = false
      this.total = res.data.totalElements
      this.tableData = res.data.content
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.getList()
    },
    handleUpdate(info) {
      this.resetForm()
      this.dialogForm.visible = true
      this.dialogForm.title = '布控'
      this.dialogForm.type = 'edit'
      this.dataForm = Object.assign({}, info)
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.dialogForm.visible = false
          this.getList()
          this.$notify.success({
            title: '成功',
            message: '编辑成功!'
          })
        }
      })
    },
    handleView(info) {
      this.checkdetail = true
      this.dataForm = Object.assign({}, info)
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete(info) {
      this.$confirm('确认删除' + info.name + '？').then(() => {
      })
    },
    resetForm() {
      this.dataForm = {
        code: '',
        brandId: '',
        brand: '',
        equipmentName: '',
        model: '',
        typeId: '',
        typeName: '',
        protocolTypeId: '',
        protocolType: '',
        ip: '',
        port: '',
        enterLeaveSign: '',
        locationDescription: '',
        lngLatAlt: '',
        longitude: '',
        dimension: '',
        altitude: '',
        carBrakeRemark: ''
      }
    },
    handelMapView() {
    },
    handleBrandChange(val) {
      const result = this.factoryList.find(item => {
        return item.key === val
      })
      this.dataForm.brandName = result.value
    },
    handleRecordShow(info) {
      this.recordDialog.visible = true
      this.recordDialog.title = info.c
    }
  }
}
</script>

<style scoped>
  .dialog-item-title {
    padding-left: 0;
    margin-bottom: 20px;
  }
  .temporary-img{
    width: 200px;
    height: 200px;
    display: inline-block;
  }
</style>
