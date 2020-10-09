<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <!--操作按钮-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="路线名称：" class="filter-item">
            <el-input
              v-model="listQuery.params.routeName"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入路线名称"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="路线类型 : " class="filter-item" :span="12">
            <el-select
              v-model="listQuery.params.routeType"
              class="filter-item"
              placeholder="请选择"
              filterable
              style="width:260px"
              @keyup.enter.native="handleFilter"
            >
              <el-option
                v-for="(item,key) in teamList"
                :key="key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="是否启用: " class="filter-item" style="margin:0 40px">
            <el-radio-group v-model="listQuery.params.enable" size="medium">
              <el-radio
                v-for="(item,index) in sfqyList"
                :key="index"
                :label="item.key"
              >{{ item.value }}</el-radio>
            </el-radio-group>
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
              v-waves
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconxinzengh"
              @click="handleAddRole"
            >新增</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!--已添加角色分页内容-->
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        stripe
        class="t-bd"
        fit
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" fixed type="selection" />
        <el-table-column label="序号" fixed width="50px">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="路径名称">
          <template slot-scope="scope">
            <span>{{ scope.row.routeName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="路径类型"
          :formatter="routeTypes"
          show-overflow-tooltip
          prop="routeType"
        />
        <el-table-column align="center" label="路径描述" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.routeDesc }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否启用" :formatter="qy" prop="enable" />
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
          width="240px"
        >
          <template v-slot="{ row }">
            <div class="t-col-operate">
              <i class="el-icon-tickets primary table-i" title="查看" @click="lookView(row)" />
              <i
                class="el-icon-edit-outline warning table-i"
                title="编辑"
                @click="handleUpdate(row)"
              />
              <i class="el-icon-delete danger table-i" title="删除" @click="handleDelete(row)" />
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
    <!--新增修改巡更路径-->
    <el-dialog
      class="abow_dialog"
      :title="tkTitle"
      :visible.sync="dialogUserVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="750px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="130px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="路径名称：" prop="routeName">
                  <el-input v-model="dataForm.routeName" class="form-item1" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="路径类型 : " class="filter-item" prop="routeType">
                  <el-select
                    v-model="dataForm.routeType"
                    class="filter-item"
                    placeholder="请选择"
                    style="width:100%"
                    @keyup.enter.native="handleFilter"
                  >
                    <el-option
                      v-for="(item,key) in teamList"
                      :key="key"
                      :label="item.value"
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="启用: " class="filter-item">
                  <el-radio-group v-model="dataForm.enable">
                    <el-radio
                      v-for="(item,index) in sfqyList"
                      :key="index"
                      :label="item.key"
                    >{{ item.value }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item label="路径描述：">
                  <el-input
                    v-model="dataForm.routeDesc"
                    class="form-item1"
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 8}"
                    placeholder="请输入内容"
                    maxlength="60"
                    show-word-limit
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUserVisible = false">取消</el-button>
        <el-button type="primary" @click="next">下一步</el-button>
      </div>
    </el-dialog>

    <!--选择巡更点-->
    <el-dialog
      class="abow_dialog"
      title="巡更点选择"
      :visible.sync="teamVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="80%"
    >
      <div class="dialog-content">
        <el-col class="dialog-item map" :span="9">
          <el-transfer
            v-model="xzArr"
            :titles="['待选', '已选']"
            :data="PointData"
            style="height:300px;"
            filterable
            :props="{
              key: 'id',
              label: 'pointName'
            }"
            @change="handleChange"
          >
            <span slot-scope="{ option }">
              {{ option.pointName }}
              <i
                class="el-icon-location-information"
                @click="locate(option)"
              />
            </span>
          </el-transfer>
          <el-table
            :key="tableKey"
            v-loading="listLoading"
            :data="dataForm.patrolRoutePointList"
            style="width:510px;margin:16px 0;"
            stripe
            height="300"
            class="t-bd"
            fit
          >
            <el-table-column align="center" label="排序号" prop="num" />
            <el-table-column align="center" label="节点" show-overflow-tooltip prop="pointName" />
            <el-table-column align="center" label="路径时长" show-overflow-tooltip prop="duration">
              <!-- <template slot-scope="scope">
                      <el-input v-model="scope.row.duration" type="number" class="form-item1" @blur="updateDuration(scope.row)" />
              </template>-->
            </el-table-column>
            <el-table-column align="center" label="误差" show-overflow-tooltip prop="deviation">
              <!-- <template slot-scope="scope">
                      <el-input v-model="scope.row.deviation" type="number" class="form-item1" />
              </template>-->
            </el-table-column>
            <el-table-column
              align="center"
              :label="$t('table.actions')"
              fixed="right"
              class-name="small-padding fixed-width"
              width="160px"
            >
              <template v-slot="{ row }">
                <div class="t-col-operate">
                  <i class="el-icon-caret-top primary table-i" title="向上" @click="up(row)" />
                  <i class="el-icon-caret-bottom primary table-i" title="向下" @click="down(row)" />
                  <i class="el-icon-setting primary table-i" title="设置" @click="setTime(row)" />
                  <!-- <i class="el-icon-delete danger table-i" title="删除" @click="delxgd(row)" /> -->
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-row style="text-align:center">
            <el-button @click="dialogUserVisible = true;teamVisible =false">上一步</el-button>
            <el-button type="primary" @click="savexglj">保存</el-button>
          </el-row>
        </el-col>
        <el-col :span="14">
          <Map v-if="teamVisible" ref="map" style="height:700px" />
        </el-col>
      </div>
    </el-dialog>

    <!--配置巡更时长-->
    <el-dialog
      class="abow_dialog"
      title="配置信息"
      :visible.sync="durationVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="550px"
    >
      <div class="dialog-content" style="margin-top:-20px;">
        <div class="dialog-item">
          <el-form ref="duration" :model="duration" :rules="rules" label-width="130px">
            <el-row>
              <el-col :md="24" :lg="20">
                <h3 style="margin-left:45px;">
                  <span>节点 :</span>
                  <span v-text="duration.xgdName" />
                </h3>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="线路时长：">
                  <el-input v-model="duration.hour" type="number" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <span style="margin: 10px 10px 0 10px;display: block;">时</span>
              </el-col>
              <el-col :span="5">
                <el-input v-model="duration.minute" type="number" class="form-item1" />
              </el-col>
              <el-col :span="2">
                <span style="margin: 10px 10px 0 10px;display: block;">分</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="误差 : ">
                  <el-input v-model="duration.deviationminute" type="number" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <span style="margin: 10px 10px 0 10px;display: block;">分</span>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="durationVisible = false">取消</el-button>
        <el-button type="primary" @click="saveduration">保存</el-button>
      </div>
    </el-dialog>

    <!--巡更路径查询-->
    <el-dialog
      v-if="lookVisible"
      class="abow_dialog"
      title="巡更点选择"
      :visible.sync="lookVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="60%"
    >
      <div class="dialog-content onemap">
        <Map ref="map" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getList,
  addPatrolRouter,
  updatePatrolRouter,
  getPatrolpoint,
  lookPatrolRoutr,
  delPatrolRoutr
} from '@/api/base/patro-patrolRoute'
import { dictBatch } from '@/api/base/dictDetail'
import Map from '@/views/patrol/mapCommon/map.vue'
// OverlayCompnt为静态标注的右键菜单
export default {
  name: 'PatrolRoute',
  components: { Map },
  data() {
    return {
      PointData: [], // 所有巡更点地图渲染数据
      xzArr: [], // 已选中列表id
      yxry: 0,
      istzShow: true, // 拖拽按钮
      yxryList: [],
      zwsjShow: false,
      setTeamShow: true,
      nodeObj: '',
      dialogUserVisible: false, // 新增和编辑控制按钮
      tableKey: 0,
      list: null, // 已添加用户
      total: null, // 总数
      listLoading: true,
      teamVisible: false,
      lookVisible: false, // 查看巡更路径
      durationVisible: false, // 巡更时长配置弹框控制按钮
      duration: {
        xgdName: '', // 配置巡更点名称
        deviationminute: '', // 误差十分
        minute: '', // 线路时长  分钟
        hour: '', // 线路时长  小时
        id: ''
      },
      selectList: [],
      timeArrList: [], // 缓存时间数据
      teamList: [], // 班组类型
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          routeName: '', // 路线名称
          routeType: '00', // 路线类型
          enable: '00'
        }
      },
      sfqyList: [],
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
      tkTitle: '新增路径',
      dataForm: {
        routeName: '',
        routeType: '',
        enable: '',
        routeDesc: '',
        patrolRoutePointList: []
      },
      rules: {
        routeName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        routeType: [
          { required: true, message: '请选择班组类型', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    yxryList(newVal, oldVal) {
      if (this.yxryList.length > 0) {
        this.setTeamShow = true
      } else {
        this.setTeamShow = false
      }
    },
    xzArr(newVal, oldVal) {
      // this.$nextTick(() => {
      //   this.$refs.map.saveRoute(this.dataForm.patrolRoutePointList)
      //   this.$refs.map.addData(this.dataForm.patrolRoutePointList)
      // })
    }
  },

  created() {
    this.getList()

    getPatrolpoint({ pointName: this.pointName }).then((response) => {
      console.log(response)
      if (response.code === 200) {
        this.PointData = response.data
        // this.addData()
      }
    })

    dictBatch('3028').then((res) => {
      this.teamList = res.data['3028']
    })
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
    fetchData() {
      this.$store
        .dispatch('getTableColumnInfo', this.tableName)
        .then((res) => {
          if (res.data.code === 1) {
            const allData = res.data.data
            const data = []
            for (let i = 0; i < allData.length; i++) {
              data.push({
                key: allData[i].rownum,
                label: allData[i].name,
                comment: allData[i].comment,
                tabname: allData[i].tabname
              })
            }
            this.transferData = data
          } else {
            this.$message.error('表字段查询失败')
          }
        })
        .catch((error) => {
          this.$message.error(error)
        })
    },
    qy(row) {
      let val = ''
      if (row.enable === '00') {
        val = '是'
      } else {
        val = '否'
      }
      return val
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
    // 获取所有巡更点
    getPatrolpoint() {
      getPatrolpoint('').then((response) => {
        if (response.code === 200) {
          this.PointData = response.data.data
        }
      })
    },

    // 根据参数查询已选中巡更点
    filterPatrolpoint(num) {
      getPatrolpoint(num).then((response) => {
        if (response.code === 200) {
          this.PointData = response.data.data
        }
      })
    },

    // 点击巡更点实时定位
    locate(option) {
      this.$refs.map.ZoomToCenter(option.longitude, option.latitude)
    },
    // 向上移动
    up(row) {
      console.log(this.xzArr)
      for (let i = 0; i < this.dataForm.patrolRoutePointList.length; i++) {
        if (row.id === this.dataForm.patrolRoutePointList[i].id && i > 0) {
          const temp = this.dataForm.patrolRoutePointList[i].num
          this.$set(
            this.dataForm.patrolRoutePointList[i],
            'num',
            this.dataForm.patrolRoutePointList[i - 1].num
          )
          this.$set(this.dataForm.patrolRoutePointList[i - 1], 'num', temp)
        }
      }

      for (let j = 0; j < this.xzArr.length; j++) {
        if (row.id === this.xzArr[j] && j > 0) {
          const temp01 = this.xzArr[j]
          this.xzArr[j] = this.xzArr[j - 1]
          this.xzArr[j - 1] = temp01
        }
      }

      console.log('new', this.xzArr)
      this.$refs.map.saveRoute(this.dataForm.patrolRoutePointList)
      this.$forceUpdate()
    },

    // 向下移动
    down(row) {
      for (let i = 0; i < this.dataForm.patrolRoutePointList.length; i++) {
        if (
          row.id === this.dataForm.patrolRoutePointList[i].id &&
          i !== this.dataForm.patrolRoutePointList[i].length - 1
        ) {
          const temp = this.dataForm.patrolRoutePointList[i].num
          this.$set(
            this.dataForm.patrolRoutePointList[i],
            'num',
            this.dataForm.patrolRoutePointList[i + 1].num
          )
          this.$set(this.dataForm.patrolRoutePointList[i + 1], 'num', temp)
        }
      }
      this.$refs.map.saveRoute(this.dataForm.patrolRoutePointList)
    },

    // 监听已选中
    handleChange(value, direction, movedKeys) {
      this.dataForm.patrolRoutePointList = []
      for (var i = 0; i < value.length; i++) {
        for (let j = 0; j < this.PointData.length; j++) {
          const obj = {}
          if (value[i] === this.PointData[j].id) {
            obj.id = this.PointData[j].id
            obj.num = i + 1
            obj.pointName = this.PointData[j].pointName
            obj.longitude = this.PointData[j].longitude
            obj.latitude = this.PointData[j].latitude
            this.dataForm.patrolRoutePointList.push(obj)
          }
        }
      }

      if (this.timeArrList.length > 0) {
        for (let k = 0; k < this.timeArrList.length; k++) {
          for (let h = 0; h < this.dataForm.patrolRoutePointList.length; h++) {
            if (this.timeArrList[k].pointId === this.dataForm.patrolRoutePointList[h].id) {
              this.dataForm.patrolRoutePointList[h].deviation = this.timeArrList[k].duErrMin
              this.dataForm.patrolRoutePointList[h].duration = this.timeArrList[k].duHour + ' 时' + ' ' + this.timeArrList[k].duMin + ' 分'
            }
          }
        }
      }

      console.log(this.dataForm.patrolRoutePointList)
      console.log(this.timeArrList)
      this.$refs.map.saveRoute(this.dataForm.patrolRoutePointList)
    },
    handleSelectionChange(val) {
      this.selectList = val.map(function(item) {
        return item.id
      })
    },

    // 穿梭框点击事件
    // filterMethod(query, item) {
    //   return item.pinyin.indexOf(query) > -1;
    // },

    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList()
    },

    // 获取表格列表数据
    getList() {
      this.listLoading = true
      getList(this.listQuery).then((response) => {
        this.list = response.data.content
        this.total = response.data.totalElements
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

    // 新增弹框操作
    handleAddRole() {
      this.operaType = 1
      this.tkTitle = '新增路径'
      this.dataForm.routeType = ''
      this.dataForm.enable = '00'
      this.dataForm.routeName = ''
      this.dataForm.routeDesc = ''
      this.dataForm.patrolRoutePointList = []
      this.xzArr = []
      this.dialogUserVisible = true
    },

    // 删除巡更路线

    handleDelete(row) {
      this.$confirm('确认删除所选记录？').then(() => {
        delPatrolRoutr(row.id).then(() => {
          this.getList()
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
        })
      })
    },

    // 设置巡更时长弹框
    setTime(row) {
      this.duration.xgdName = row.pointName
      this.duration.id = row.id
      this.duration.deviationminute = row.duErrMin
      this.duration.minute = row.duMin
      this.duration.hour = row.duHour
      this.durationVisible = true
    },

    // 保存时长
    saveduration() {
      const deviation = this.duration.deviationminute + ' 分'
      const durationHm = this.duration.hour + ' 时' + ' ' + this.duration.minute + ' 分'
      for (let i = 0; i < this.dataForm.patrolRoutePointList.length; i++) {
        this.$nextTick(() => {
          if (this.duration.id === this.dataForm.patrolRoutePointList[i].id) {
            this.$set(this.dataForm.patrolRoutePointList[i], 'deviation', deviation)
            this.$set(this.dataForm.patrolRoutePointList[i], 'duration', durationHm)
            this.$set(this.dataForm.patrolRoutePointList[i], 'duHour', this.duration.hour)
            this.$set(this.dataForm.patrolRoutePointList[i], 'duMin', this.duration.minute)
            this.$set(this.dataForm.patrolRoutePointList[i], 'duErrMin', this.duration.deviationminute)
          }
        })
      }
      this.durationVisible = false
      console.log(this.dataForm.patrolRoutePointList)
    },

    // 删除巡更点
    delxgd(row) {
      this.$confirm('确认删除所选记录？').then(() => {
        for (let i = 0; i < this.dataForm.patrolRoutePointList.length; i++) {
          if (row.id === this.dataForm.patrolRoutePointList[i].id) {
            this.dataForm.patrolRoutePointList.splice(i, 1)
          }
        }
      })

      for (let j = 0; j < this.xzArr.length; j++) {
        if (row.id === this.xzArr[j]) {
          this.xzArr.splice(j, 1)
        }
      }
      console.log(this.xzArr)
    },

    // 保存修改数据接口

    savexglj() {
      if (this.dataForm.patrolRoutePointList.length > 0) {
        for (let i = 0; i < this.dataForm.patrolRoutePointList.length; i++) {
          this.dataForm.patrolRoutePointList[i].pointId = this.dataForm.patrolRoutePointList[i].id
        }
      }
      if (this.operaType === 1) {
        addPatrolRouter(this.dataForm).then(() => {
          this.teamVisible = false
          this.getList()
          this.$notify.success({
            title: '成功',
            message: '操作成功!'
          })
        })
      } else {
        updatePatrolRouter(this.dataForm).then(() => {
          this.teamVisible = false
          this.getList()
          this.$notify.success({
            title: '成功',
            message: '操作成功!'
          })
        })
      }
    },

    // 查看巡更路径
    lookView(row) {
      lookPatrolRoutr(row.id).then((res) => {
        this.dataForm.patrolRoutePointList = res.data.patrolRoutePointList
        this.$nextTick(() => {
          this.$refs.map.saveRoute(this.dataForm.patrolRoutePointList)
          this.$refs.map.addData(this.dataForm.patrolRoutePointList)
        })
      })
      this.lookVisible = true
      // 默认2维
    },

    // 编辑操作
    handleUpdate(row) {
      this.operaType = 2
      this.tkTitle = '编辑班组'
      this.dataForm.id = row.id
      lookPatrolRoutr(row.id).then((res) => {
        this.dataForm = res.data
        this.dataForm.patrolRoutePointList = res.data.patrolRoutePointList
        this.timeArrList = res.data.patrolRoutePointList
        if (this.dataForm.patrolRoutePointList.length > 0) {
          this.xzArr = []
          for (let i = 0; i < this.dataForm.patrolRoutePointList.length; i++) {
            this.dataForm.patrolRoutePointList[i].deviation = this.dataForm.patrolRoutePointList[i].duErrMin
            this.dataForm.patrolRoutePointList[i].duration = this.dataForm.patrolRoutePointList[i].duHour + ' 时' + ' ' + this.dataForm.patrolRoutePointList[i].duMin + ' 分'
            this.xzArr.push(this.dataForm.patrolRoutePointList[i].pointId)
          }
        }
      })
      this.dialogUserVisible = true
    },
    // 下一步
    next() {
      this.teamVisible = true
      this.dialogUserVisible = false
      this.$nextTick(() => {
        // 添加所有所有巡更数据
        this.$refs.map.addData(this.PointData)
        // 添加巡更路径
        this.$refs.map.saveRoute(this.dataForm.patrolRoutePointList)
      })
    }
  }
}
</script>
<style scoped>
.switchStyle {
  margin-right: 0;
}
.onemap {
  height: 500px;
  margin-top: 26px;
}
.abow_dialog >>> .el-transfer-panel {
  height: 300px;
  overflow: auto;
}

.abow_dialog >>> .el-checkbox-group {
  height: 400px;
}

.abow_dialog >>> .el-icon-location-information {
  position: absolute;
  top: 6px;
  color: #19848a;
  left: 155px;
  font-size: 18px;
}

.map {
  margin: 26px 0 28px 28px;
}
.abow_dialog >>> .el-transfer__buttons {
  padding: 0 20px;
}
.abow_dialog >>> .el-transfer__buttons button {
  display: block;
}
.abow_dialog >>> .el-transfer__buttons button:nth-child(1) {
  margin-left: 10px;
}
</style>
