<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>车辆预警记录</span>
      </div>
      <!--操作按钮-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="道闸名称：" class="filter-item">
            <el-input
              v-model="listQuery.params.code"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入道闸名称"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="采集位置：" class="filter-item">
            <el-input
              v-model="listQuery.params.equipmentName"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入采集位置"
              @keyup.enter.native="handleFilter"
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
        <el-table-column label="预警地点" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.a }}</span>
          </template>
        </el-table-column>
        <el-table-column label="预警原因" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.b }}</span>
          </template>
        </el-table-column>
        <el-table-column label="预警时间">
          <template slot-scope="scope">
            <span>{{ $moment(scope.row.c).format('YYYY-MM-DD') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="车牌号" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.d }}</span>
          </template>
        </el-table-column>
        <el-table-column label="车速" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.e }}</span>
          </template>
        </el-table-column>
        <el-table-column label="车辆类型" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.f }}</span>
          </template>
        </el-table-column>
        <el-table-column label="车身颜色" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.g }}</span>
          </template>
        </el-table-column>
        <el-table-column label="驾驶人" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.h }}</span>
          </template>
        </el-table-column>
        <el-table-column label="人员数量" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.i }}</span>
          </template>
        </el-table-column>
        <el-table-column label="携带物品" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.j }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ $moment(scope.row.k).format('YYYY-MM-DD') }}</span>
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
          <div class="dialog-item">
            <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="120px">
              <div class="dialog-item-title">车辆信息</div>
              <el-row :gutter="20">
                <el-col :md="24" :lg="12">
                  <el-form-item label="车牌号：" prop="a">
                    <el-input v-model="dataForm.a" class="form-item1" disabled />
                  </el-form-item>
                </el-col>
                <el-col :md="24" :lg="12">
                  <el-form-item label="车辆类型：" prop="b">
                    <el-input v-model="dataForm.b" class="form-item1" disabled />
                  </el-form-item>
                </el-col>
                <el-col :md="24" :lg="12">
                  <el-form-item label="品牌型号：" prop="c">
                    <el-input v-model="dataForm.c" class="form-item1" disabled />
                  </el-form-item>
                </el-col>
                <el-col :md="24" :lg="12">
                  <el-form-item label="车身颜色：" prop="d">
                    <el-input v-model="dataForm.d" class="form-item1" disabled />
                  </el-form-item>
                </el-col>
              </el-row>
              <div class="dialog-item-title">驾驶人信息</div>
              <el-row>
                <el-col :md="24" :lg="12">
                  <el-form-item label="驾驶人：" prop="e">
                    <el-input v-model="dataForm.e" class="form-item1" disabled />
                  </el-form-item>
                </el-col>
                <el-col :md="24" :lg="12">
                  <el-form-item label="性别：" prop="f">
                    <el-input v-model="dataForm.f" class="form-item1" disabled />
                  </el-form-item>
                </el-col>
                <el-col :md="24" :lg="12">
                  <el-form-item label="手机号：" prop="g">
                    <el-input v-model="dataForm.g" class="form-item1" disabled />
                  </el-form-item>
                </el-col>
                <el-col :md="24" :lg="12">
                  <el-form-item label="机动车驾驶证：" prop="h">
                    <el-input v-model="dataForm.h" class="form-item1" disabled />
                  </el-form-item>
                </el-col>
                <el-col :md="24" :lg="12">
                  <el-form-item label="证件类型：" prop="i">
                    <el-input v-model="dataForm.i" class="form-item1" disabled />
                  </el-form-item>
                </el-col>
                <el-col :md="24" :lg="12">
                  <el-form-item label="证件号码：" prop="g">
                    <el-input v-model="dataForm.g" class="form-item1" disabled />
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
          <div class="dialog-item-title">预警信息</div>
          <el-form :model="dataForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="预警地点：" prop="a">
                  {{ dataForm.a }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="预警原因：" prop="b">
                  {{ dataForm.b }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="预警时间：" prop="c">
                  {{ dataForm.c }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="车牌号：" prop="d">
                  {{ dataForm.d }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="车速：" prop="e">
                  {{ dataForm.e }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="车辆类型：" prop="f">
                  {{ dataForm.f }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="车身颜色：" prop="g">
                  {{ dataForm.g }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="驾驶人：" prop="h">
                  {{ dataForm.h }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="人员数量：" prop="i">
                  {{ dataForm.i }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="携带物品：" prop="j">
                  {{ dataForm.j }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="人像：" class="unborder"><img class="temporary-img" src="/upload/test/car/car1.png"></el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="视频回放：" class="unborder"><i class="el-icon-video-play alarm-video-play-btn" @click="handleVideo('')" /></el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import peerRecordAPI from '@/api/door/alarmRecord'
import { dictBatch } from '@/api/base/dictDetail'
import ConsequenceAPI from '@/api/base/consequence'
import { SingleCamera_Com } from '@/components/DialogCmpts/pops.js'
import { createPop } from '@/components/DialogCmpts'
export default {
  name: 'Index',
  data() {
    return {
      controlTypeList: [],
      typeList: [],
      inout: [],
      provinceList: [],
      tableData: [],
      total: null,
      listLoading: true,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          code: '',
          brandId: '',
          equipmentName: '',
          date: null
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
      peerRecordAPI.detail(info.id).then(res => {
        this.dataForm = Object.assign({}, info)
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          peerRecordAPI.create(this.dataForm).then(() => {
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
      peerRecordAPI.detail(info.id).then(res => {
        this.dataForm = Object.assign({}, info)
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
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
      this.recordDialog.title = info.a
    },
    handleVideo(url) {
      const cmpt = new SingleCamera_Com({ url: url, title: '华南观点的摄像头很好看' })
      createPop(cmpt, 'cameraPopUp')
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
  .alarm-video-play-btn{
    font-size: 28px;
    line-height: 36px;
    cursor: pointer;
  }
  .alarm-video-play-btn:hover{
    color: #6cadc8;
  }
</style>
