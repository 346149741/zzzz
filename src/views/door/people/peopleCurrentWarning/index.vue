<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>人员通行告警</span>
      </div>
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="告警人员：" class="filter-item">
            <el-input
              v-model="listQuery.params.name"
              type="text"
              class="filter-item"
              placeholder="请输入告警人员"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="人员类型：" class="filter-item">
            <el-select
              v-model="listQuery.params.staffTypeId"
              clearable
              class="form-item"
              placeholder="请选择人员类型"
            >
              <el-option
                v-for="(item,key) in peoplestypeList"
                :key="key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="告警级别：" class="filter-item">
            <el-select
              v-model="listQuery.params.alarmLevelId"
              clearable
              class="form-item"
              placeholder="请选择告警级别"
            >
              <el-option
                v-for="(item,key) in dangerList"
                :key="key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="告警类型：" class="filter-item">
            <el-select
              v-model="listQuery.params.alarmType"
              clearable
              class="form-item"
              placeholder="请选择告警类型"
            >
              <el-option label="人员滞留" value="人员滞留" />
              <el-option label="无权通行" value="无权通行" />
            </el-select>
          </el-form-item>
          <el-form-item label="处置状态：" class="filter-item">
            <el-select
              v-model="listQuery.params.dispositionStatus"
              clearable
              class="form-item"
              placeholder="请选择处置状态"
            >
              <el-option label="未处置" value="未处置" />
              <el-option label="已处置" value="已处置" />
              <el-option label="处置中" value="处置中" />
            </el-select>
          </el-form-item>
          <el-form-item label="通行时间：" class="filter-item">
            <el-date-picker
              v-model="value1"
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
              icon="mr10 iconfont el-icon-search"
              @click="handleFilter"
            >{{ $t('table.search') }}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table v-loading="listLoading" stripe :data="list" class="t-bd" fit highlight-current-row>
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column property="name" label="告警人员" />
        <el-table-column label="性别">
          <template slot-scope="scope">
            <span>{{ getSex(scope.row.sex) }}</span>
          </template>
        </el-table-column>
        <el-table-column property="staffType" label="人员类型" />
        <el-table-column property="areaName" label="告警区域" />
        <el-table-column property="alarmLevel" label="告警级别" />
        <el-table-column property="alarmType" label="告警类型" />
        <el-table-column label="告警时间">
          <template slot-scope="scope">
            <span>{{ scope.row.alarmTime.slice(0, 10) }}</span>
          </template>
        </el-table-column>
        <el-table-column property="inTheDirection" label="出入方向" />
        <el-table-column property="inTheWay" label="出入方式" />
        <el-table-column property="dispositionUnitName" label="处置单位" />
        <el-table-column property="dispositionName" label="处置人" />
        <el-table-column property="dispositionStatus" label="处置状态" />
        <el-table-column label="处置时间">
          <template slot-scope="scope">
            <span>{{ scope.row.dispositionTime.slice(0, 10) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <div class="t-col-operate">
              <i class="el-icon-tickets primary table-i" title="详情" @click="details(scope.row.id)" />
              <el-image
                alt="通行图像"
                v-if="scope.row.passPhoto.length>0"
                :preview-src-list="scope.row.passPhoto"
                :src="require('@/assets/common/el-icon-picture-outline.png')"
              ></el-image>
              <i
                class="el-icon-video-play alarm-video-play-btn table-i warning"
                title="通行视频"
                @click="handleVideo(scope.row.passVideo)"
              />
              <i class="el-icon-s-opportunity danger table-i" title="处置" />
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
    <el-dialog
      class="abow_dialog"
      title="详情"
      :visible.sync="dialog"
      :close-on-click-modal="false"
      width="800px"
    >
      <div class="dialog-content">
        <div class="dialog-item-title">告警信息</div>
        <div class="dialog-item">
          <el-form :model="form" label-position="right" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="告警区域：">{{form.areaName}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="告警时间：">{{form.alarmTime}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="设备类型："></el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="出入方向：">{{form.inTheDirection}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="出入方式：">{{form.inTheWay}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="告警级别：">{{form.alarmLevel}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="告警类型：">{{form.alarmType}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="处置单位：">{{form.dispositionUnitName}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="处置人：">{{form.dispositionName}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="处置方法："></el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="处置时间：">{{form.dispositionTime}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="通行图像：">
                  <el-image
                    alt="通行图像"
                    v-if="form.passPhoto.length>0"
                    :preview-src-list="form.passPhoto"
                    :src="form.passPhoto[0]"
                    style="width:80px;height:80px"
                  ></el-image>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog-item-title">人员信息</div>
        <div class="dialog-item">
          <el-form :model="form" label-position="right" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label>
                  <img :src="form.facePhoto" class="photo" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="姓名：">{{form.name}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="性别：">{{form.sex}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证件类型：">{{form.certTypeName}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="证件号码：">{{form.certTypeNo}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话：">{{form.phone}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工作单位：">{{form.unitName}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="人员类型：">{{form.staffType}}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { dictBatch } from '@/api/base/dictDetail'
import record from '@/api/door/trafficRecord'
import { SingleCamera_Com } from '@/components/DialogCmpts/pops.js'
import { createPop } from '@/components/DialogCmpts'
export default {
  data () {
    return {
      value1: null,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {

        }
      },
      list: [],
      form: {
        passPhoto:[]
      },
      sexList: [],
      total: null, // 总数
      listLoading: false,
      dialog: false,
      peoplestypeList: [],
      dangerList: [],
    }
  },
  created () {
    this.getList()
    dictBatch(['1001', '3001', '2010']).then(res => {
      this.sexList = res.data['1001']
      this.peoplestypeList = res.data['3001']
      this.dangerList = res.data['2010']
    })
  },
  methods: {
    handleFilter () {
      this.listQuery.pageNo = 1
      this.getList()
    },
    getList () {
      if (this.value1 != null) {
        this.listQuery.params.beginTime = this.value1[0]
        this.listQuery.params.endTime = this.value1[1]
      }
      this.listLoading = true
      record.warningpage(this.listQuery).then((response) => {
        this.list = response.data.content
        for (let i = 0; i < this.list.length; i++) {
          this.list[i].passPhoto = JSON.parse(this.list[i].passPhoto)
        }
        this.total = response.data.totalElements
        this.listLoading = false
      })
    },
    details (id) {
      this.dialog = true
      this.getdetails(id)
    },
    getdetails (id) {
      record.getwarning(id).then((response) => {
        this.form = response.data
        this.form.passPhoto = JSON.parse(this.form.passPhoto)
      })
    },
    getSex (e) {
      if (e) {
        if (this.sexList.length > 0) {
          const a = this.sexList.find((item) => {
            return item.key == Number(e)
          })
          return a.value
        }
      }
    },
    handleVideo (url) {
      const cmpt = new SingleCamera_Com({ url: url, title: '人员通行视频' })
      createPop(cmpt, 'cameraPopUp')
    },
    handleSizeChange (val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.listQuery.pageNo = val
      this.getList()
    },
  }
}
</script>
<style scoped>
.photo {
  width: 100px;
  height: 100px;
}
.el-image {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-right: 15px;
}
</style>