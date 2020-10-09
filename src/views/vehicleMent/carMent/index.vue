<template>
  <div class="app-container">
    <el-card class="app-body">
      <!--操作按钮-->
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
            <el-upload
              style="display: inline-block;"
              :show-file-list="false"
              action
              accept=".xlsx, .xls"
              :before-upload="beforeExcelUpload"
            >
              <el-button
                v-waves
                class="filter-item btn-base"
                type="primary"
                icon="mr10 iconfont iconxinzengh"
              >导入</el-button>
            </el-upload>
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconxinzengh"
              @click="handleCreate"
            >新增</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--固定车辆分页内容-->
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
        <el-table-column label="车牌号" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.carNo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="车辆类型" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.carType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="品牌型号" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.brandModel }}</span>
          </template>
        </el-table-column>
        <el-table-column label="车辆颜色" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.carColor }}</span>
          </template>
        </el-table-column>
        <el-table-column label="车辆识别号" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.carKey }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发动机号" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.engineNo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="单位部门" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.unitName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ $moment(scope.row.createTime).format('YYYY-MM-DD') }}</span>
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
              <i class="el-icon-edit-outline warning table-i" title="编辑" @click="handleUpdate(scope.row)" />
              <i class="el-icon-delete danger table-i" title="注销" @click="handleDelete(scope.row)" />
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

    <!--添加/编辑弹出框-->
    <el-dialog
      class="abow_dialog"
      :title="dialogForm.title"
      :visible.sync="dialogForm.visible"
      :close-on-click-modal="false"
      width="50%"
    >
      <div class="dialog-content">
        <div class="dialog-item-title">车辆信息</div>
        <div class="dialog-item">
          <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="车牌号：" prop="carNo">
                  <el-input v-model="dataForm.carNo" class="form-item1" placeholder="请输入标识号" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="车辆类型：" prop="carTypeId">
                  <el-select v-model="dataForm.carTypeId" class="form-item1" placeholder="请选择车辆类型" @change="handleTypeChange">
                    <el-option v-for="item in typeList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="车辆用途：" prop="carUseId">
                  <el-select v-model="dataForm.carUseId" class="form-item1" placeholder="请选择车辆用途" @change="handleUseChange">
                    <el-option v-for="item in useList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="品牌型号：" prop="brandModel">
                  <el-input v-model="dataForm.brandModel" class="form-item1" placeholder="请输入品牌型号" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="车身颜色：" prop="carColorId">
                  <el-select v-model="dataForm.carColorId" class="form-item1" placeholder="请选择车身颜色" @change="handleColorChange">
                    <el-option v-for="item in colorList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="车辆识别号：" prop="carKey">
                  <el-input v-model="dataForm.carKey" class="form-item1" placeholder="请输入车辆识别号" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="发动机号：" prop="engineNo">
                  <el-input v-model="dataForm.engineNo" class="form-item1" placeholder="请输入发动机号" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog-item-title">其它信息</div>
        <div class="dialog-item">
          <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="车辆专属：" prop="carExclusiveId">
                  <el-radio-group v-model="dataForm.carExclusiveId" class="form-item1" @change="handleBelongChange">
                    <el-radio v-for="item in belongList" :key="item.key" :label="item.key">{{ item.value }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="领导人：" prop="leader">
                  <el-input v-model="dataForm.leader" class="form-item1" placeholder="请输入领导人" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="单位部门：" prop="unitId">
                  <el-cascader
                    ref="area"
                    v-model="dataForm.unitId"
                    class="form-item1"
                    :options="departList"
                    :props="{ checkStrictly: true, expandTrigger: 'hover',label: 'organizationName', value: 'id'}"
                    clearable
                  >
                    <template slot-scope="{ node, data }">
                      <span class="123456" @click="cascaderRadioClick(node)">{{ data.organizationName }}</span>
                    </template>
                  </el-cascader>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="规定停放区：" prop="stipulateStopArea">
                  <el-cascader
                    ref="area"
                    v-model="dataForm.stipulateStopArea"
                    class="form-item1"
                    :options="areaList"
                    :props="{ multiple: true, expandTrigger: 'hover', label: 'areaName', value: 'id' }"
                    clearable
                    placeholder="请选择规定停放区"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="可通行区域：" prop="trafficArea">
                  <el-cascader
                    ref="area"
                    v-model="dataForm.trafficArea"
                    class="form-item1"
                    :options="areaList"
                    :props="{ multiple: true, expandTrigger: 'hover', label: 'areaName', value: 'id' }"
                    clearable
                    placeholder="请选择可通行区域"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="un-primary-btn" @click="dialogForm.visible = false">取 消</el-button>
        <el-button v-if="dialogForm.type === 'add'" type="primary" @click="createData">{{ $t('table.confirm') }}</el-button>
        <el-button v-if="dialogForm.type === 'edit'" type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
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
        <div class="dialog-item-title">车辆信息</div>
        <div class="dialog-item">
          <el-form :model="dataForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="车牌号：">{{ dataForm.carNo }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="车辆类型：">{{ dataForm.carType }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="车辆用途：">{{ dataForm.carUse }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="品牌型号：">{{ dataForm.brandModel }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="车身颜色：">{{ dataForm.carColor }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="车辆识别号：">{{ dataForm.carKey }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="发动机号：">{{ dataForm.engineNo }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog-item-title">其它信息</div>
        <div class="dialog-item">
          <el-form :model="dataForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="车辆专属：">{{ dataForm.carExclusive }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="领导人：">{{ dataForm.leader }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="单位部门：">{{ dataForm.unitName }}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="规定停放区域：">{{ dataForm.stipulateStopArea }}</el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="可通行区域：">{{ dataForm.trafficArea }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import CarAPI from '@/api/door/car'
import { dictBatch } from '@/api/base/dictDetail'
import { registertree } from '@/api/base/region'
import { getAllOrg } from '@/api/base/organ'
import { delchildren } from '@/utils/index'
export default {
  name: 'Index',
  data() {
    return {
      typeList: [],
      useList: [],
      colorList: [],
      areaList: [],
      departList: [],
      departArr: [],
      belongList: [],
      tableData: [
        {
          'brandModel': '红旗轿车',
          'carColor': '白色',
          'carColorId': '05',
          'carExclusive': '公务用车',
          'carExclusiveId': '01',
          'carKey': 'LKEBC51A24D004440',
          'carNo': 'XY26453',
          'carType': '小轿车',
          'carTypeId': '04',
          'carUse': '运输',
          'carUseId': '01',
          'createTime': '2020-09-09 10:10:14',
          'createUser': '管理员',
          'delFlag': false,
          'engineNo': 'HTDLQ4',
          'id': '40288098746dd202017470a0b4ac0010',
          'leader': 'jack',
          'remark': '',
          'stipulateStopArea': '[["402880ae74288ba6017428b21be6007e","4028809874595fe501745bb3f9df0210"]]',
          'trafficArea': '[["402880ae74288ba6017428b21be6007e","4028809874595fe501745bb3f9df0210"]]',
          'unitId': '402880ae74288ba6017428b21be6007e',
          'unitName': '3团1营',
          'updateTime': '2020-09-09 10:10:14',
          'updateUser': '管理员'
        }, {
          'brandModel': '东风风行',
          'carColor': '白色',
          'carColorId': '05',
          'carExclusive': '公务用车',
          'carExclusiveId': '01',
          'carKey': 'LSCAB50D13A038629',
          'carNo': 'HY12345',
          'carType': '面包车',
          'carTypeId': '04',
          'carUse': '运输',
          'carUseId': '01',
          'createTime': '2020-09-09 10:10:14',
          'createUser': '管理员',
          'delFlag': false,
          'engineNo': 'DFDLQ4',
          'id': '40288098746dd202017470a0b4ac0010',
          'leader': 'jack',
          'remark': '',
          'stipulateStopArea': '[["402880ae74288ba6017428b21be6007e","4028809874595fe501745bb3f9df0210"]]',
          'trafficArea': '[["402880ae74288ba6017428b21be6007e","4028809874595fe501745bb3f9df0210"]]',
          'unitId': '402880ae74288ba6017428b21be6007e',
          'unitName': '129师新1团',
          'updateTime': '2020-09-09 10:10:14',
          'updateUser': '管理员'
        }, {
          'brandModel': '北京吉普',
          'carColor': '白色',
          'carColorId': '05',
          'carExclusive': '公务用车',
          'carExclusiveId': '01',
          'carKey': 'LSVAF033132202442',
          'carNo': 'NK32142',
          'carType': '大巴车',
          'carTypeId': '04',
          'carUse': '运输',
          'carUseId': '01',
          'createTime': '2020-09-09 10:10:14',
          'createUser': '管理员',
          'delFlag': false,
          'engineNo': 'MSDLQ4',
          'id': '40288098746dd202017470a0b4ac0010',
          'leader': 'jack',
          'remark': '',
          'stipulateStopArea': '[["402880ae74288ba6017428b21be6007e","4028809874595fe501745bb3f9df0210"]]',
          'trafficArea': '[["402880ae74288ba6017428b21be6007e","4028809874595fe501745bb3f9df0210"]]',
          'unitId': '402880ae74288ba6017428b21be6007e',
          'unitName': '2师新1团',
          'updateTime': '2020-09-09 10:10:14',
          'updateUser': '管理员'
        }, {
          'brandModel': '东风风行',
          'carColor': '白色',
          'carColorId': '05',
          'carExclusive': '公务用车',
          'carExclusiveId': '01',
          'carKey': 'LKDN152322B078781',
          'carNo': 'GA15632',
          'carType': '商务车',
          'carTypeId': '04',
          'carUse': '运输',
          'carUseId': '01',
          'createTime': '2020-09-09 10:10:14',
          'createUser': '管理员',
          'delFlag': false,
          'engineNo': 'HTDLQ4',
          'id': '40288098746dd202017470a0b4ac0010',
          'leader': 'jack',
          'remark': '',
          'stipulateStopArea': '[["402880ae74288ba6017428b21be6007e","4028809874595fe501745bb3f9df0210"]]',
          'trafficArea': '[["402880ae74288ba6017428b21be6007e","4028809874595fe501745bb3f9df0210"]]',
          'unitId': '402880ae74288ba6017428b21be6007e',
          'unitName': '3团2营',
          'updateTime': '2020-09-09 10:10:14',
          'updateUser': '管理员'
        }, {
          'brandModel': '丰田考斯特',
          'carColor': '白色',
          'carColorId': '05',
          'carExclusive': '公务用车',
          'carExclusiveId': '01',
          'carKey': 'LFWJ29B423TA15063',
          'carNo': 'HY12345',
          'carType': 'SUV',
          'carTypeId': '04',
          'carUse': '运输',
          'carUseId': '01',
          'createTime': '2020-09-09 10:10:14',
          'createUser': '管理员',
          'delFlag': false,
          'engineNo': 'GTDLQ4',
          'id': '40288098746dd202017470a0b4ac0010',
          'leader': 'jack',
          'remark': '',
          'stipulateStopArea': '[["402880ae74288ba6017428b21be6007e","4028809874595fe501745bb3f9df0210"]]',
          'trafficArea': '[["402880ae74288ba6017428b21be6007e","4028809874595fe501745bb3f9df0210"]]',
          'unitId': '402880ae74288ba6017428b21be6007e',
          'unitName': '接待部',
          'updateTime': '2020-09-09 10:10:14',
          'updateUser': '管理员'
        }, {
          'brandModel': '一汽大众',
          'carColor': '白色',
          'carColorId': '05',
          'carExclusive': '公务用车',
          'carExclusiveId': '01',
          'carKey': 'LZWNCAH0321044771',
          'carNo': 'XY26453',
          'carType': '小轿车',
          'carTypeId': '04',
          'carUse': '运输',
          'carUseId': '01',
          'createTime': '2020-09-09 10:10:14',
          'createUser': '管理员',
          'delFlag': false,
          'engineNo': 'RSDLQ2',
          'id': '40288098746dd202017470a0b4ac0010',
          'leader': 'jack',
          'remark': '',
          'stipulateStopArea': '[["402880ae74288ba6017428b21be6007e","4028809874595fe501745bb3f9df0210"]]',
          'trafficArea': '[["402880ae74288ba6017428b21be6007e","4028809874595fe501745bb3f9df0210"]]',
          'unitId': '402880ae74288ba6017428b21be6007e',
          'unitName': '后勤部',
          'updateTime': '2020-09-09 10:10:14',
          'updateUser': '管理员'
        }],
      total: null,
      listLoading: false,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          carNo: '',
          unitId: '',
          carUseId: ''
        }
      },
      dialogForm: {
        visible: false,
        title: '',
        type: 'add'
      },
      dataForm: {
        carNo: '',
        carTypeId: '',
        carType: '',
        carUseId: '',
        carUse: '',
        brandModel: '',
        carColorId: '',
        carColor: '',
        carKey: '',
        engineNo: '',
        carExclusiveId: '',
        carExclusive: '',
        leader: '',
        unitId: '',
        unitName: '',
        stipulateStopArea: '',
        trafficArea: ''
      },
      rules: {
        carNo: [{ required: true, message: '请输入车牌号', trigger: 'blur' }],
        carTypeId: [{ required: true, message: '请选择车辆类型', trigger: 'change' }],
        brandModel: [{ required: true, message: '请输入品牌型号', trigger: 'blur' }],
        carKey: [{ required: true, message: '请输入车辆识别号', trigger: 'blur' }],
        engineNo: [{ required: true, message: '请输入发动机号', trigger: 'blur' }],
        carExclusiveId: [{ required: true, message: '请选择车辆专属', trigger: 'blur' }],
        leader: [{ required: true, message: '请输入领导人', trigger: 'blur' }],
        unitId: [{ required: true, message: '请选择单位', trigger: 'blur' }]
      },
      checkdetail: false
    }
  },
  mounted() {
    this.geDictList()
    console.log(this.tableData)
  },
  methods: {
    geDictList() {
      dictBatch(['3019', '3046', '3035', '3047']).then(res => {
        this.typeList = res.data['3019']
        this.useList = res.data['3046']
        this.colorList = res.data['3035']
        this.belongList = res.data['3047']
        // this.getList()
      })
      getAllOrg().then(res => {
        this.departArr = res.data
        this.departList = this.toTree(res.data)
      })
      registertree().then(res => {
        this.areaList = delchildren(res.data)
      })
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList()
    },
    getList() {
      // CarAPI.page(this.listQuery).then(res => {
      //   this.listLoading = false
      //   this.total = res.data.totalElements
      //   this.tableData = res.data.content
      // })
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.getList()
    },
    handleCreate() {
      this.resetForm()
      this.dialogForm.visible = true
      this.dialogForm.title = '新增固定车'
      this.dialogForm.type = 'add'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.dataForm.stipulateStopArea = JSON.stringify(this.dataForm.stipulateStopArea)
          this.dataForm.trafficArea = JSON.stringify(this.dataForm.trafficArea)
          CarAPI.create(this.dataForm).then(() => {
            this.dialogForm.visible = false
            this.getList()
            this.$notify.success({
              title: '成功',
              message: '固定车注册成功!'
            })
          })
        }
      })
    },
    handleUpdate(info) {
      this.resetForm()
      this.dialogForm.visible = true
      this.dialogForm.title = '编辑固定车'
      this.dialogForm.type = 'edit'
      this.dataForm = Object.assign({}, info)
      // CarAPI.detail(info.id).then(res => {
      //   res.data.stipulateStopArea = JSON.parse(res.data.stipulateStopArea)
      //   res.data.trafficArea = JSON.parse(res.data.trafficArea)
      //   this.dataForm = Object.assign({}, res.data)
      //   this.$nextTick(() => {
      //     this.$refs['dataForm'].clearValidate()
      //   })
      // })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.dataForm.stipulateStopArea = JSON.stringify(this.dataForm.stipulateStopArea)
          this.dataForm.trafficArea = JSON.stringify(this.dataForm.trafficArea)
          CarAPI.create(this.dataForm).then(() => {
            this.dialogForm.visible = false
            this.getList()
            this.$notify.success({
              title: '成功',
              message: '编辑成功!'
            })
          })
        }
      })
    },
    handleView(info) {
      this.checkdetail = true
      this.dataForm = Object.assign({}, info)
      // CarAPI.detail(info.id).then(res => {
      //   res.data.stipulateStopArea = this.getAreaName(JSON.parse(res.data.stipulateStopArea))
      //   res.data.trafficArea = this.getAreaName(JSON.parse(res.data.trafficArea))
      //   this.dataForm = Object.assign({}, res.data)
      // })
    },
    handleDelete(info) {
      this.$confirm('确认删除' + info.carNo + '？').then(() => {
        CarAPI.del(info.id).then(() => {
          this.getList()
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
        })
      })
    },
    resetForm() {
      this.dataForm = {
        carNo: '',
        carTypeId: '',
        carType: '',
        carUseId: '',
        carUse: '',
        brandModel: '',
        carColorId: '',
        carColor: '',
        carKey: '',
        engineNo: '',
        carExclusiveId: '',
        carExclusive: '',
        leader: '',
        unitId: '',
        unitName: '',
        stipulateStopArea: '',
        trafficArea: ''
      }
    },
    handleTypeChange(val) {
      const result = this.typeList.find(item => {
        return item.key === val
      })
      this.dataForm.carType = result.value
    },
    handleUseChange(val) {
      const result = this.useList.find(item => {
        return item.key === val
      })
      this.dataForm.carUse = result.value
    },
    handleColorChange(val) {
      const result = this.colorList.find(item => {
        return item.key === val
      })
      this.dataForm.carColor = result.value
    },
    handleBelongChange(val) {
      const result = this.belongList.find(item => {
        return item.key === val
      })
      this.dataForm.carExclusive = result.value
    },
    beforeExcelUpload(file) {
      const fileName = file.name.toLowerCase()
      const isMODO =
        fileName.indexOf('.xlsx') >= 0 ||
        fileName.indexOf('.xls') >= 0
      const isLt2M = file.size / 1024 / 1024 < 4

      if (!isMODO) {
        this.$message.error('上传图片只能是xlsx/xls格式!')
        return
      }
      if (!isLt2M) {
        this.$message.error('上传模型大小不能超过4MB!')
        return
      }
      const formatFile = new FormData()
      formatFile.append('file', file)
      CarAPI.upload(formatFile).then(res => {
      })
      return false
    },
    toTree(data) {
      const result = []
      if (!Array.isArray(data)) {
        return result
      }
      data.forEach(item => {
        delete item.children
      })
      const map = {}
      data.forEach(item => {
        map[item.id] = item
      })
      data.forEach(item => {
        const parent = map[item.pid]
        if (parent) {
          (parent.children || (parent.children = [])).push(item)
        } else {
          result.push(item)
        }
      })
      return result
    },
    cascaderRadioClick(info) {
      this.dataForm.unitId = info.value
      this.dataForm.unitName = info.label
    },
    getAreaName(list) {
      if (list.length <= 0) {
        return ''
      }
      const res = []
      list.forEach(a => {
        const iarr = this.getArea(this.areaList, a)
        res.push(iarr)
      })
      return res.toString()
    },
    getArea(areaList, idList) {
      let res = ''
      areaList.forEach(item => {
        if (idList.indexOf(item.id) >= 0) {
          res = item.areaName
          if (item.children) {
            idList.shift()
            res += '/' + this.getArea(item.children, idList)
          }
        }
      })
      return res
    }
  }
}
</script>

<style scoped>

</style>
