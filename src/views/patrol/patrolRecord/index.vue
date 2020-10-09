<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <!--操作按钮-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="巡更计划 : " class="filter-item" :span="12">
            <el-select
              v-model="listQuery.params.planId"
              class="filter-item"
              placeholder="请选择"
              filterable
              style="width:260px"
              @keyup.enter.native="handleFilter"
            >
              <el-option
                v-for="(item,key) in planArrList"
                :key="key"
                :label="item.planName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="巡更班组 : " class="filter-item" :span="12">
            <el-select
              v-model="listQuery.params.classId"
              class="filter-item"
              placeholder="请选择"
              filterable
              style="width:260px"
              @keyup.enter.native="handleFilter"
            >
              <el-option
                v-for="(item,key) in teamArrList"
                :key="key"
                :label="item.className"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="巡更路径 : " class="filter-item" :span="12">
            <el-select
              v-model="listQuery.params.routeId"
              class="filter-item"
              placeholder="请选择"
              filterable
              style="width:260px"
              @keyup.enter.native="handleFilter"
            >
              <el-option
                v-for="(item,key) in routeArrList"
                :key="key"
                :label="item.routeName"
                :value="item.id"
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

      <!--已添加角色分页内容-->
      <el-table :key="tableKey" v-loading="listLoading" :data="list" stripe class="t-bd" fit>
        <!--   <el-table-column align="center" fixed type="selection" />
        <el-table-column label="序号" fixed width="50px">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>-->
        <el-table-column align="center" label="巡更计划">
          <template slot-scope="scope">
            <span>{{ scope.row.planName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="巡更日期"
          show-overflow-tooltip
          prop="classType"
          :formatter="teamType"
        />
        <el-table-column align="center" label="班组长" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.className }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="巡更时段" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.timeName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="巡更小组" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.className }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="路径类型" :formatter="routeTypes" prop="routeType" />
        <el-table-column align="center" label="计划开始时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.planBeginTime }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="计划结束时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.planEndTime }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="实际开始时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.classDesc }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="实际结束时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.classDesc }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否延迟" :formatter="qy" prop="enable" />
        <el-table-column align="center" label="是否漏检" :formatter="qy" prop="enable" />
        <el-table-column align="center" label="循序检测" :formatter="qy" prop="enable" />
        <el-table-column align="center" label="是否异常" :formatter="qy" prop="enable" />
        <el-table-column align="center" label="操作人员" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.createUser }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作时间" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.createTime.slice(0, 10) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="$t('table.actions')"
          fixed="right"
          class-name="small-padding fixed-width"
          width="100px"
        >
          <template v-slot="{ row }">
            <div class="t-col-operate">
              <i class="el-icon-tickets primary table-i" title="查看" @click="handleView(row)" />
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

    <!--查看巡更记录 对话框-->
    <el-dialog title="巡更记录详情" :visible.sync="lookRecord" :modal="false" width="50%">
      <div class="dialogBox">
        <el-row :gutter="20" style="border-bottom:1px solid #e4e4e4;margin:-20px 0 20px 0;">
          <el-col :span="12">
            <h3>基本信息</h3>
          </el-col>
        </el-row>
        <el-form
          ref="lookForm"
          :model="lookForm"
          label-position="right"
          label-width="130px"
          style="margin-top:-16px"
        >
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="计划ID : ">
                <span v-text="lookForm.planId" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="是否启用 : ">
                <span v-text="lookForm.enable" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="计划名称 : ">
                <span v-text="lookForm.pointName" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="计划类型 : ">
                <span v-text="lookForm.planType" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="路径名称 : ">
                <span v-text="lookForm.routeName" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="路径类型 : ">
                <span v-text="lookForm.routeType" />
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" size="mini" @click="lookRouter">查看</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="班组名称 : ">
                <span v-text="lookForm.className" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="班组类型 : ">
                <span v-text="lookForm.classType" />
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button type="primary" size="mini" @click="lookteam">查看</el-button>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="时段名称 : ">
                <span v-text="lookForm.timeName" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="时段类型 : ">
                <span v-text="lookForm.timeType" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="开始时间 : ">
                <span v-text="lookForm.actualBeginTime" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="结束时间 : ">
                <span v-text="lookForm.actualEndTime" />
              </el-form-item>
            </el-col>
            <!-- <el-col :span="2">
              <el-button type="primary" size="small" @click="selectPatroTime">查看</el-button>
            </el-col>-->
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="计划描述 : ">
                <span v-text="lookForm.planDesc" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="border-bottom:1px solid #e4e4e4;margin-bottom:30px;">
            <el-col :span="12">
              <h3>巡更信息</h3>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="实际开始时间 : ">
                <span v-text="lookForm.actualBeginTime" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="实际结束时间 : ">
                <span v-text="lookForm.actualEndTime" />
              </el-form-item>
            </el-col>
            <!-- <el-col :span="2">
              <el-button type="primary" size="small" @click="selectPatroTime">查看</el-button>
            </el-col>-->
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="按时开始 : ">
                <span v-text="lookForm.isOnTimeBegin" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="按时结束 : ">
                <span v-text="lookForm.isOnTimeEnd" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="巡更点异常信息 : ">
                <span class="butt" @click="goMap(1)" v-text="lookForm.patrolAbnormalNumber" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="未按顺序巡更 : ">
                <span class="butt" @click="goMap(2)" v-text="lookForm.patrolNotInOrderNumber" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item label="漏检点 : ">
                <span class="butt" @click="goMap(3)" v-text="lookForm.patrolMissedNumber" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="巡更点到达延迟 : ">
                <span class="butt" @click="goMap(4)" v-text="lookForm.patrolDelayNumber" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="border-bottom:1px solid #e4e4e4;margin-bottom:30px;">
            <el-col :span="12">
              <h3 style="margin-top:20px;">巡更日志</h3>
            </el-col>
            <el-col :span="12" style="margin-top:20px;">
              <el-button type="primary" size="mini" style="margin-left:80px;">导出</el-button>
              <el-button type="primary" size="mini">打印</el-button>
            </el-col>
          </el-row>
          <el-table :key="tableKey" v-loading="listLoading" :data="XQlist" stripe class="t-bd" fit>
            <!--   <el-table-column align="center" fixed type="selection" />
        <el-table-column label="序号" fixed width="50px">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
            </el-table-column>-->
            <el-table-column align="center" label="名称" prop="pointName" />
            <el-table-column align="center" label="类型" prop="pointType" />
            <el-table-column align="center" label="是否延迟" :formatter="qy" prop="isDelay" />
            <el-table-column align="center" label="是否漏巡" :formatter="qy" prop="isMissed" />
            <el-table-column align="center" label="是否异常" :formatter="qy" prop="isAbnormal" />
            <el-table-column align="center" label="计划时间" show-overflow-tooltip prop="planTime" />
            <el-table-column align="center" label="路径时长" prop="pathTime" />
            <el-table-column align="center" label="误差时间" show-overflow-tooltip prop="errorTime" />
            <el-table-column align="center" label="实际时间" show-overflow-tooltip prop="pointTime" />
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
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="lookRecord = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      class="abow_dialog"
      title="巡更路径查看"
      :visible.sync="lookVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="100%"
    >
      <div class="dialog-content onemap" style="height:100%;">
        <Map ref="map" />
      </div>
    </el-dialog>
    <!--查看巡更班组 对话框-->
    <el-dialog
      class="abow_dialog"
      title="查看班组信息"
      :visible.sync="lookteamShow"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="360px"
    >
      <div class="dialog-content teamcent">
        <div v-for="(item,index) in teamList" :key="index" style="height:30px;margin-left:30px;">
          <div v-text="item" />
        </div>
        <div class="bz">备注:带*号的为班组长人员</div>
      </div>
    </el-dialog>

    <!--查看异常数据 对话框-->
    <el-dialog
      class="abow_dialog"
      title="查看班组信息"
      :visible.sync="mapShow"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="80%"
    >
      <div class="dialog-content onemap1" style="height:100%;">
        <Map ref="map" />
      </div>
      <div class="warning">
        <div class="warning-table">
          <!--分页内容-->
          <table>
            <thead>
              <th>名称</th>
              <th>重要级别</th>
              <th>巡更班组</th>
              <th v-if="count=='1'||count=='3'">实际巡更时间</th>
              <th v-if="count=='1'">是否异常</th>
              <th v-if="count=='1'">异常项目</th>
              <th v-if="count=='2'">计划次序</th>
              <th v-if="count=='2'">实际次序</th>
              <th v-if="count=='2' || count=='4'">是否延迟</th>
              <th v-if="count=='3'">是否漏检</th>
              <th v-if="count=='4'">到达时间</th>
              <th v-if="count=='4'">下点路径长度</th>
              <th v-if="count=='4'">误差时间</th>
            </thead>
            <tbody>
              <tr v-for="item in XQlist" :key="item.key">
                <td>{{ item.pointName }}</td>
                <td>{{ item.pointType }}</td>
                <td>{{ item.routeName }}</td>
                <td v-if="count=='1'||count=='3'">{{ item.pointTime }}</td>
                <td v-if="count=='1'">{{ item.isAbnormal }}</td>
                <td v-if="count=='1'">{{ item.name }}</td>
                <td v-if="count=='2'">{{ item.alarmType }}</td>
                <td v-if="count=='2'">{{ item.createTime }}</td>
                <td v-if="count=='2'">{{ item.code }}</td>
                <td v-if="count=='3'">{{ item.name }}</td>
                <td v-if="count=='4'">{{ item.alarmType }}</td>
                <td v-if="count=='4'">{{ item.createTime }}</td>
                <td v-if="count=='4'">{{ item.createTime }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getallrouteList,
  getallteamList,
  getallplanList,
  getpatrollog,
  lookpatrollog,
  lookTable
} from '@/api/base/patro-team'

import { dictBatch } from '@/api/base/dictDetail'
import Map from '@/views/patrol/mapCommon/map.vue'
export default {
  name: 'ObjManage',
  components: { Map },
  data() {
    return {
      filterText: '',
      yxry: 0,
      count: 1,
      yxryList: [],
      XQlist: [],
      zwsjShow: false,
      mapShow: false,
      lookVisible: false,
      lookRecord: false,
      lookteamShow: false,
      teamArrList: [], // 所有巡更班组数据
      planArrList: [], // 所有巡更计划数据
      routeArrList: [], // 所有巡更路径数据
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      setTeamShow: true,
      nodeObj: '',
      dialogUserVisible: false, // 新增和编辑控制按钮
      tableKey: 0,
      list: null, // 已添加用户
      total: null, // 总数
      listLoading: true,
      teamVisible: false,
      selectList: [],
      sfqyList: [], // 是否启用字典
      teamList: [], // 班组类型
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          className: '',
          classType: '',
          plan: '',
          enable: '00',
          patrolDate: ''
        }
      },
      formData: {
        enable: '是', // 是否启用
        pointName: '', // 巡更点名称
        grade: '关键', // 等级
        id: '', // 记录ID
        devicePictureUrl: '', // 图片url
        longitude: '', // 经度
        latitude: '', // 纬度
        deviceId: '', // 巡更卡设备id
        deviceName: '', // 巡更卡设备名称
        deviceType: '', // 巡更卡设备类型
        deviceFactory: '', // 巡更卡设备厂家
        deviceModel: '' // 巡更卡设备型号
      },
      routerData: {
        pageNo: 1,
        pageSize: 10,
        params: {
          routeName: '', // 路线名称
          routeType: '00', // 路线类型
          enable: '00'
        }
      },
      userQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {}
      },
      userList: null,
      operaType: 1,
      form: {
        permission: []
      },
      dialogFormVisible: false,
      dialogPermissionVisible: false,
      userPermissionList: [],
      userPermissionLists: [],
      dialogStatus: '',
      tkTitle: '新增项目',
      lookForm: {
        className: '',
        enable: '',
        classType: '',
        personnel: '',
        classDesc: '',
        patrolClassUserVoList: []
      },
      rules: {
        className: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        classType: [
          { required: true, message: '请选择班组类型', trigger: 'change' }
        ]
      }
    }
  },

  created() {
    // 获取所有巡更路径数据
    getallrouteList(this.routerData).then((response) => {
      this.routeArrList = response.data
      // console.log(this.routeArrList)
    })

    // 获取所有巡更班组数据
    getallteamList(this.routerData).then((response) => {
      this.teamArrList = response.data
      // console.log(this.routeArrList)
    })

    // 获取所有巡更计划数据
    getallplanList(this.routerData).then((response) => {
      this.planArrList = response.data
      // console.log(this.routeArrList)
    })

    this.getList()

    // 是否启用字典
    dictBatch('3023').then((res) => {
      this.sfqyList = res.data['3023']
    })
    if (this.yxryList.length === 0) {
      this.zwsjShow = true
    } else {
      this.zwsjShow = false
    }
    if (this.yxryList.length > 0) {
      this.setTeamShow = true
    } else {
      this.setTeamShow = false
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.selectList = val.map(function(item) {
        return item.id
      })
    },
    routeTypes(row) {
      let val = ''
      if (row.routeType === '00') {
        val = '重要'
      } else if (row.routeType === '01') {
        val = '普通'
      } else if (row.routeType === '02') {
        val = '临时'
      }
      return val
    },
    qy(row) {
      let val = ''
      if (row.enable === '00' || row.isDelay === '00' || row.isMissed === '00' || row.isAbnormal === '00') {
        val = '是'
      } else {
        val = '否'
      }
      return val
    },
    teamType(row) {
      let val = ''
      if (row.classType === '00') {
        val = '普通'
      } else if (row.classType === '01') {
        val = '临时'
      } else if (row.classType === '02') {
        val = '预备'
      }
      return val
    },
    planType(row) {
      let val = ''
      if (row.planType === '01') {
        val = '普通'
      } else if (row.planType === '02') {
        val = '临时'
      } else if (row.planType === '00') {
        val = '重要'
      }
      return val
    },
    qtimeTypeformat(row) {
      let val = ''
      if (row.timeType === '00') {
        val = '普通'
      } else if (row.timeType === '01') {
        val = '临时'
      }
      return val
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList()
    },
    qxz() {
      this.teamVisible = true
      if (this.yxryList.length === 0) {
        this.zwsjShow = true
      } else {
        this.zwsjShow = false
      }
    },
    goMap(num) {
      this.count = num
      this.mapShow = true
    },
    // 获取表格列表数据
    getList() {
      this.listLoading = true
      getpatrollog(this.listQuery).then((response) => {
        this.list = response.data.content
        this.total = response.data.totalElements
        console.log(this.list)
        this.listLoading = false
      })
    },

    // 分页
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.getList()
    },
    // 查看巡更路径
    lookRouter() {
      this.lookVisible = true
      this.$nextTick(() => {
        this.$refs.map.saveRoute(this.lookForm.patrolRoutePointList)
        this.$refs.map.addData(this.lookForm.patrolRoutePointList)
      })
    },

    lookteam() {
      this.lookteamShow = true
    },

    // 查看巡更记录信息
    handleView(row) {
      lookTable(row.id).then((res) => {
        this.XQlist = res.data
      })

      lookpatrollog(row.id).then((res) => {
        this.lookForm = res.data
        this.lookForm.classType = this.teamType(res.data)
        this.lookForm.planType = this.planType(res.data)
        this.lookForm.routeType = this.routeTypes(res.data)
        this.lookForm.timeType = this.qtimeTypeformat(res.data)

        this.lookForm.enable = res.data.enable === '00' ? '是' : '否'

        let str = ''
        if (res.data.patrolClassUserVoList.length > 0) {
          for (let i = 0; i < res.data.patrolClassUserVoList.length; i++) {
            if (res.data.patrolClassUserVoList[i].isLead === '00') {
              res.data.patrolClassUserVoList[i].userName =
                '*' + res.data.patrolClassUserVoList[i].userName
            }
            str += res.data.patrolClassUserVoList[i].userName + ' ; '
          }
          this.lookForm.personnel = str
        }

        console.log(this.lookForm)
      })
      this.lookRecord = true
    }
    // 保存修改数据接口
  }
}
</script>
<style scoped>
.switchStyle {
  margin-right: 0;
}
.el-col-10 {
  width: 40%;
  height: 40px;
  line-height: 40px;
}
.teamcent {
  position: relative;
}
.teamcent .bz {
  position: absolute;
  left: 30px;
  bottom: -60px;
}
.butt {
  cursor: pointer;
  color: #1c9399;
  font-weight: 600;
}
.onemap1 {
  height: 1100px;
  width: 100%;
}
.title {
  text-align: center;
}
.warning {
  position: absolute;
  right: 36px;
  bottom: 29px;
  z-index: 99;
  width: 550px;
  height: 255px;
  border: 1px solid #20ebf9;
  border-radius: 4px;
  background: rgba(28, 148, 154, 0.7);
}
.warning-title {
  height: 40px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 40px;
  position: relative;
}
.warning span {
  position: absolute;
  color: #20ebf9;
  left: 16px;
}
.warning i {
  position: absolute;
  color: red;
  font-size: 26px;
  right: 10px;
}
.warning-table {
  height: 213px;
  overflow: auto;
  overflow-x: hidden;
}
.warning-table table {
  font-size: 13px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
  width: 100%;
  border-collapse: collapse;
}
tbody {
  text-align: center;
}
th{
  height: 40px;
  text-align: center;
}
tr {
  border: 1px dashed #3f9e9f;
}
td {
  padding: 5px 0;
  text-align: center;
}
thead {
  text-align: center;
  background: #188186;
  font-size: 14px;
}
</style>
