<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>人员通行记录</span>
      </div>
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="姓名：" class="filter-item">
            <el-input
              v-model="listQuery.params.name"
              type="text"
              class="filter-item"
              placeholder="请输入姓名："
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
          <el-form-item label="出入方向：" class="filter-item">
            <el-select
              v-model="listQuery.params.inTheDirection"
              clearable
              class="form-item"
              placeholder="请选择出入方向"
            >
              <el-option
                v-for="(item,key) in directionList"
                :key="key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="单位部门：" class="filter-item">
            <el-cascader
              ref="cascader"
              v-model="listQuery.params.unitId"
              :options="orgDeptTreeData"
              :props="treeProps"
              clearable
              placeholder="请选择单位部门"
            >
              <template slot-scope="{ node, data }">
                <span @click="cascaderRadioClick(data.id,data.label)">{{ data.label }}</span>
              </template>
            </el-cascader>
          </el-form-item>
          <el-form-item label="通行区域：" class="filter-item">
            <el-cascader
              :options="quyudata"
              :props="props"
              ref="tree"
              v-model="listQuery.params.areaId"
              clearable
            >
              <template slot-scope="{ node, data }">
                <span @click="cascaderRadioClick2(data.id,data.areaName)">{{ data.areaName }}</span>
              </template>
            </el-cascader>
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
        <el-table-column property="name" label="姓名" />
        <el-table-column label="性别">
          <template slot-scope="scope">
            <span>{{ getSex(scope.row.sex) }}</span>
          </template>
        </el-table-column>
        <el-table-column property="staffType" label="人员类型" />
        <el-table-column property="phone" label="联系电话" />
        <el-table-column property="unitName" label="单位部门" />
        <el-table-column property="certTypeName" label="证件类型" />
        <el-table-column property="certTypeNo" label="证件号码" />
        <el-table-column property="" label="区域" />
        <el-table-column property="doorForbidName" label="通行门禁" />
        <el-table-column property="doorForbidLocation" label="门禁位置" />
        <el-table-column property="inTheDirection" label="出入方向" />
        <el-table-column label="通行时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime.slice(0, 10) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px">
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
                <el-form-item label="性别：">{{getSex(form.sex)}}</el-form-item>
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
import { getAllOrg } from '@/api/base/organ'
import { delchildren } from '@/utils/index'
import { registertree } from '@/api/base/region'
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
          unitId: '',
          areaId: ''
        }
      },
      list: [],
      quyudata: [],
      total: null, // 总数
      listLoading: false,
      dialog: false,
      peoplestypeList: [],
      directionList: [],
      sexList: [],
      orgDeptTreeData: null,
      treeProps: {
        expandTrigger: 'hover',
        value: 'id',
        label: 'label',
        emitPath: false,
        checkStrictly: true
      },
      form: {

      },
      props: {
        // multiple: true,
        checkStrictly: true,
        label: 'areaName',
        value: 'id',
        expandTrigger: 'hover',
      },
    }
  },
  created () {
    this.getList()
    dictBatch(['1001', '3001', '3012']).then(res => {
      this.sexList = res.data['1001']
      this.peoplestypeList = res.data['3001']
      this.directionList = res.data['3012']
    })
    getAllOrg().then(res => {
      res.data.forEach(item => {
        item.value = item.id
        item.label = item.organizationName
      })
      this.orgDeptTreeData = this.XEUtil.toArrayTree(res.data, {
        strict: false,
        parentKey: 'pid',
        key: 'id',
        children: 'children'
      })
      this.orgDeptTreeData = delchildren(this.orgDeptTreeData)
    })
    registertree().then((response) => {
      this.quyudata = delchildren(response.data)
    })
  },
  methods: {
    handleFilter () {
      this.listQuery.pageNo = 1
      this.getList()
    },
    getList () {
      if (this.value1 != null) {
        this.listQuery.params.startTime = this.value1[0]
        this.listQuery.params.endTime = this.value1[1]
      }
      this.listLoading = true
      record.recordpage(this.listQuery).then((response) => {
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
      record.getrecord(id).then((response) => {
        this.form = response.data
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
    cascaderRadioClick (val, name) {
      this.listQuery.params.unitId = val
    },
    cascaderRadioClick2 (val, name) {
      this.listQuery.params.areaId = val
    }
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