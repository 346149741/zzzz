<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>设备注册</span>
      </div>
      <!--搜索条件-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="防区编号:" class="filter-item">
            <el-input
              v-model="listQuery.params.code"
              placeholder="请输入防区编号"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="防区名称:" class="filter-item">
            <el-input
              v-model="listQuery.params.name"
              class="filter-item mr10"
              placeholder="请输入防区名称"
              prefix-icon="el-icon-search"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="警情时间：" class="filter-item">
            <el-date-picker
              v-model="policeTimeRange"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item label="报警有效性:" class="filter-item">
            <el-select
              v-model="listQuery.params.alarmValidity"
              class="filter-item mr10"
              clearable
              @change="handleFilter"
            >
              <el-option
                v-for="item in effectiveList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="报警设备:" class="filter-item">
            <el-select
              v-model="listQuery.params.equipRelated"
              class="filter-item mr10"
              clearable
              @change="handleFilter"
            >
              <el-option
                v-for="item in alarmDeviceList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="报警类型:" class="filter-item">
            <el-select
              v-model="listQuery.params.alarmType"
              placeholder="请选择报警类型"
              clearable
              class="filter-item mr10"
              @change="handleFilter"
            >
              <el-option
                v-for="item in alarmTypeList"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="处理状态:" class="filter-item">
            <el-select
              v-model="listQuery.params.alarmStatus"
              placeholder="请选择处理状态"
              clearable
              class="filter-item mr10"
              @change="handleFilter"
            >
              <el-option
                v-for="item in processStatusList"
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
            <el-button
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconxinzengh"
              @click="bathEliminate"
            >一键消警</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!--分页内容-->
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :header-cell-style="{background:'#FAFAFA',color:'#A2A2B2','font-size':'14px'}"
        stripe
        :data="list"
        highlight-current-row
        class="t-bd"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column align="center" label="序号" fixed="left">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="防区编号" fixed="left">
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="防区名称">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="报警设备">
          <template slot-scope="scope">
            <span>{{ getalarmDeviceName(scope.row.equipRelated) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="报警类型">
          <template slot-scope="scope">
            <span>{{ getalarmTypeName(scope.row.alarmType) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="警情时间" width="170px">
          <template slot-scope="scope">
            <span>{{ scope.row.alarmTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="警情位置">
          <template slot-scope="scope">
            <span>{{ scope.row.location }}</span>
          </template>
        </el-table-column>
        <el-table-column label="报警有效性">
          <template slot-scope="scope">
            <span>{{ getalarmValidityName(scope.row.alarmValidity) }}</span>
          </template>
        </el-table-column>

        <el-table-column label="处理状态">
          <template slot-scope="scope">
            <span>{{ getalarmStatus(scope.row.alarmStatus) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="视频联动" width="170px">
          <template slot-scope="scope">
            <el-button class="videoButton" @click="openVideo(scope.row)">视频监控/抓拍回放</el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="$t('table.actions')"
          class-name="small-padding fixed-width"
          width="180px"
          fixed="right"
        >
          <template slot-scope="scope">
            <div class="t-col-operate">
              <i class="el-icon-tickets primary table-i" title="详情" @click="handleView(scope.row)" />
              <i v-if="getalarmStatus(scope.row.alarmStatus)==='未处理'" class="el-icon-edit-outline warning table-i" title="处理" @click="handleUpdate(scope.row)" />
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

    <!--详情查看-->
    <el-dialog
      class="abow_dialog detail-form"
      title="详情"
      :visible.sync="checkdetail"
      :close-on-click-modal="false"
      width="50%"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form :model="form" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="防区编号：">{{ form.code }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="防区名称：">
                  {{ form.name }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="报警设备：">{{ getalarmDeviceName(form.equipRelated) }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="设备状态：">{{ getdeviceStatusName(form.deviceStatus) }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="布防状态：">{{ getdefenceStatusName(form.defenceStatus) }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="布防时间：">{{ form.deploymentTime }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="防区类型：">{{ getdefenceTypeName(form.defenceType) }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="防护级别：">{{ getdefenceLevelName(form.defenceLevel) }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="报警类型：">{{ getalarmTypeName(form.alarmType) }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="警情时间：">{{ form.alarmTime }}</el-form-item>
              </el-col>
              <el-col v-show="disposeVi" :span="24">
                <el-form-item label="报警有效性" prop="type">
                  <el-radio-group v-model="dispose.alarmValidity" class="form-item1">
                    <el-radio
                      v-for="item in effectiveList"
                      :key="item.key"
                      :label="item.key"
                    >{{ item.value }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col v-show="disposeVi" :span="20">
                <el-form-item>
                  <el-input
                    v-model="dispose.remark"
                    class="form-item1"
                    placeholder="请输入处理意见"
                  />
                </el-form-item>
              </el-col>
              <el-col v-show="disposeVi" :span="4">
                <el-button type="primary" class="filter-item btn-base filter-add-btn" @click="disposeOK">确认</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import PoliceAPI from '@/api/perimeter/policeHandle.js'
import { dictBatch } from '@/api/base/dictDetail'
import { PlayBackCamera_Com } from '@/components/DialogCmpts/pops'
import { createPop } from '@/components/DialogCmpts/index.js'
export default {
  name: 'CameraManage',
  components: {

  },
  filters: {
  },
  data() {
    return {
      videoUrl: 'rtmp://rtmp.open.ys7.com/openlive/4ef78ff8dda344ee8ec27a99a7b35cc0.hd',
      selectList: [],
      disposeVi: false,
      policeTimeRange: null,
      effectiveList: [], // 报警有效性
      alarmDeviceList: [], // 报警设备
      alarmTypeList: [], // 报警类型
      processStatusList: [], // 处理状态
      defenceLevelList: [], // 防护级别
      defenceTypeList: [], // 防区类型
      defenceStatusList: [], // 布防状态
      equipStateList: [], // 周界设备状态
      alarmValidityList: [{ key: '有效', value: '有效' }, { key: '误报', value: '误报' }],
      tableKey: 0,
      list: [],
      total: null,
      listLoading: true,
      checkdetail: false,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          code: '', // 防区编号
          name: '', // 防区名称
          startTime: '', // 开始时间
          endTime: '', // 结束时间
          alarmValidity: '', // 报警有效性
          equipRelated: '', // 报警设备
          alarmType: '', // 报警类型
          alarmStatus: '' // 处理状态
        }
      },
      form: {
        alarmTime: '',
        alarmType: '',
        code: '',
        defenceLevel: '',
        defenceStatus: '',
        defenceType: '',
        deploymentTime: '',
        equipRelated: '',
        deviceStatus: '',
        id: '',
        name: ''
      },
      dispose: {
        alarmValidity: '',
        id: '',
        remark: ''
      }
    }
  },
  watch: {
  },
  created() {
    this.geDictList()
  },
  methods: {
    geDictList() {
      dictBatch(['3038', '3040', '3041', '3042', '3036', '3043', '3044', '3045']).then(res => {
        this.equipStateList = res.data['3038']// 周界设备状态
        this.defenceTypeList = res.data['3041']// 防区类型
        this.defenceStatusList = res.data['3042']// 布防状态
        this.defenceLevelList = res.data['3040'] // 防护级别
        this.alarmDeviceList = res.data['3036'] // 报警设备类型
        this.alarmTypeList = res.data['3044']// 报警类型
        this.effectiveList = res.data['3043']
        this.processStatusList = res.data['3045']
        this.getList()
      })
    },
    // 多选勾选时触发
    handleSelectionChange(val) {
      this.selectList = val.map(function(item) {
        return item.id
      })
    },
    disposeOK() {
      PoliceAPI.dispose(this.dispose).then(response => {
        this.checkdetail = false
        this.$notify({
          title: '成功',
          message: '处理成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
      })
    },
    // 视频联动
    openVideo(row) {
      const list = [
        { url: '', img: require('@/assets/watchPoint/videoImg.jpg') },
        { url: '', img: require('@/assets/watchPoint/videoImg.jpg') },
        { url: '', img: require('@/assets/watchPoint/videoImg.jpg') },
        { url: '', img: require('@/assets/watchPoint/videoImg.jpg') },
        { url: '', img: require('@/assets/watchPoint/videoImg.jpg') },
        { url: '', img: require('@/assets/watchPoint/videoImg.jpg') },
        { url: '', img: require('@/assets/watchPoint/videoImg.jpg') },
        { url: '', img: require('@/assets/watchPoint/videoImg.jpg') }
      ]
      const cmpt = new PlayBackCamera_Com({ list: list })
      createPop(cmpt, 'cameraPopUp')
    },
    bathEliminate() {
      if (this.selectList.length === 0) {
        this.$message.error('请选择有效数据')
        return
      }
      this.$confirm('确认一键消警？').then(() => {
        PoliceAPI.bathEliminate(this.selectList).then(() => {
          this.getList()
          this.selectList = []
          this.$notify({
            title: '成功',
            message: '消警成功',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    getList() {
      this.listLoading = true
      if (this.policeTimeRange != null) {
        this.listQuery.params.startTime = this.policeTimeRange[0]
        this.listQuery.params.endTime = this.policeTimeRange[1]
      }
      PoliceAPI.page(this.listQuery).then(response => {
        this.list = response.data.content
        this.total = response.data.totalElements
        this.listLoading = false
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
    handleUpdate(row) {
      this.checkdetail = true
      this.disposeVi = true
      this.dispose.id = row.id
      PoliceAPI.detail(row.id).then(res => {
        this.form = Object.assign({}, res.data)
      })
    },
    handleView(row) {
      this.checkdetail = true
      this.disposeVi = false
      PoliceAPI.detail(row.id).then(res => {
        this.form = Object.assign({}, res.data)
      })
    },
    // 获取报警设备
    getalarmDeviceName(val) {
      const item = this.alarmDeviceList.find(item => item.key === val)
      if (item) {
        return item.value
      }
    },
    // 获取报警类型
    getalarmTypeName(val) {
      const item = this.alarmTypeList.find(item => item.key === val)
      if (item) {
        return item.value
      }
    },
    // 获取报警有效性
    getalarmValidityName(val) {
      const item = this.effectiveList.find(item => item.key === val)
      if (item) {
        return item.value
      }
    },
    // 获取处理
    getalarmStatus(val) {
      const item = this.processStatusList.find(item => item.key === val)
      if (item) {
        return item.value
      }
    },
    // 获取防护级别
    getdefenceLevelName(val) {
      const item = this.defenceLevelList.find(item => item.key === val)
      if (item) {
        return item.value
      }
    },
    // 获取设备状态
    getdeviceStatusName(val) {
      const item = this.equipStateList.find(item => item.key === val)
      if (item) {
        return item.value
      }
    },
    // 获取防区类型
    getdefenceTypeName(val) {
      const item = this.defenceTypeList.find(item => item.key === val)
      if (item) {
        return item.value
      }
    },
    // 获取布防状态
    getdefenceStatusName(val) {
      const item = this.defenceStatusList.find(item => item.key === val)
      if (item) {
        return item.value
      }
    }
  }
}
</script>
<style scoped>
.form-item1 .el-input__inner{
border:none;
}
.videoButton{
  padding:5px 10px;
}
.list-query {
  width: 340px;
  margin-right: 22px;
}
.t-col-operate i.table-i{
  margin-right: 0px;
}
.dialog-content{
      margin: 0px 20px 6px 20px;
}

.area {
  text-align: center;
  margin-bottom: 10px;
  height: 25px;
}

.area .area-icon {
  margin: 0 5px;
}

.retate {
  transform: rotate(180deg);
}

.el-button + .el-button {
  margin-left: 0px !important;
}

.el-tag-info {
  margin: 2px;
}

.map-footer {
  text-align: center;
}

.map-footer .el-button {
  margin: 20px 15px 0px;
}
</style>

