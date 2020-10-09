<template>
  <div class="app-container">
    <el-row>
      <el-col :span="7" style="padding:15px 0 0 15px">
        <el-tabs v-model="activeName2" @tab-click="handleClick">
          <el-tab-pane label="车辆查询" name="first">
            <!--已添加角色分页内容-->
            <el-table
              :key="tableKey"
              :data="listArr"
              stripe
              class="t-bd"
              fit
              @selection-change="handleSelectionChange"
            >

              <el-table-column label="车牌号码" align="center" prop="id" />
              <el-table-column align="center" label="车辆部门" prop="logins" />
              <el-table-column align="center" label="司机姓名" prop="classify" />
              <el-table-column align="center" label="行驶总里程" prop="unit" />
              <!-- <el-table-column label="操作人员" align="center" prop="classify" />
              <el-table-column label="操作时间" align="center" prop="joinTime" />-->
              <el-table-column
                align="right"
                :label="$t('table.actions')"
                class-name="small-padding fixed-width"
              >
                <template v-slot="{ row }">
                  <div class="t-col-operate">
                    <i class="el-icon-tickets primary table-i" title="查看" @click="handleView(row)" />
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="实时跟踪" name="second">
            <!--已添加角色分页内容-->
            <el-table
              :key="tableKey"
              :data="listArr"
              stripe
              class="t-bd"
              fit
              @selection-change="handleSelectionChange"
            >

              <el-table-column label="车牌号码" align="center" prop="id" />
              <el-table-column align="center" label="车辆部门" prop="logins" />
              <el-table-column align="center" label="司机姓名" prop="classify" />
              <el-table-column align="center" label="行驶总里程" prop="unit" />
              <!-- <el-table-column label="操作人员" align="center" prop="classify" />
              <el-table-column label="操作时间" align="center" prop="joinTime" />-->
              <el-table-column
                align="right"
                :label="$t('table.actions')"
                class-name="small-padding fixed-width"
              >
                <template v-slot="{ row }">
                  <div class="t-col-operate">
                    <i class="el-icon-tickets primary table-i" title="查看" @click="handleView(row)" />
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="历史轨迹" name="third">
            <!--已添加角色分页内容-->
            <el-table
              :key="tableKey"
              :data="listArr"
              stripe
              class="t-bd"
              fit
              @selection-change="handleSelectionChange"
            >

              <el-table-column label="车牌号码" align="center" prop="id" />
              <el-table-column align="center" label="车辆部门" prop="logins" />
              <el-table-column align="center" label="司机姓名" prop="classify" />
              <el-table-column align="center" label="行驶总里程" prop="unit" />
              <!-- <el-table-column label="操作人员" align="center" prop="classify" />
              <el-table-column label="操作时间" align="center" prop="joinTime" />-->
              <el-table-column
                align="right"
                :label="$t('table.actions')"
                class-name="small-padding fixed-width"
              >
                <template v-slot="{ row }">
                  <div class="t-col-operate">
                    <i class="el-icon-tickets primary table-i" title="查看" @click="handleView(row)" />
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="区域查车" name="fourth">
            <!--已添加角色分页内容-->
            <el-table
              :key="tableKey"
              :data="listArr"
              stripe
              class="t-bd"
              fit
              @selection-change="handleSelectionChange"
            >

              <el-table-column label="车牌号码" align="center" prop="id" />
              <el-table-column align="center" label="车辆部门" prop="logins" />
              <el-table-column align="center" label="司机姓名" prop="classify" />
              <el-table-column align="center" label="行驶总里程" prop="unit" />
              <!-- <el-table-column label="操作人员" align="center" prop="classify" />
              <el-table-column label="操作时间" align="center" prop="joinTime" />-->
              <el-table-column
                align="right"
                :label="$t('table.actions')"
                class-name="small-padding fixed-width"
              >
                <template v-slot="{ row }">
                  <div class="t-col-operate">
                    <i class="el-icon-tickets primary table-i" title="查看" @click="handleView(row)" />
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="电子围栏" name="fifth">
            <!--已添加角色分页内容-->
            <el-table
              :key="tableKey"
              :data="listArr"
              stripe
              class="t-bd"
              fit
              @selection-change="handleSelectionChange"
            >

              <el-table-column label="车牌号码" align="center" prop="id" />
              <el-table-column align="center" label="车辆部门" prop="logins" />
              <el-table-column align="center" label="司机姓名" prop="classify" />
              <el-table-column align="center" label="行驶总里程" prop="unit" />
              <!-- <el-table-column label="操作人员" align="center" prop="classify" />
              <el-table-column label="操作时间" align="center" prop="joinTime" />-->
              <el-table-column
                align="right"
                :label="$t('table.actions')"
                class-name="small-padding fixed-width"
              >
                <template v-slot="{ row }">
                  <div class="t-col-operate">
                    <i class="el-icon-tickets primary table-i" title="查看" @click="handleView(row)" />
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="16" style="margin-left:50px; position: relative;">
        <div class="dialog-content onemap" style="height:100%;">
          <Map ref="map" style="height:1100px;" />
        </div>
        <div v-if="activeName2=='third'" style="display:flex; width:900px;margin:100px auto;position:absolute;top:600px;">
          <timeLine :time-line-list="timeLineList" />
        </div>
        <el-date-picker
          v-model="value6"
          class="time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-col>
    </el-row>
    <!--坐标拾取组件-->

  </div>
</template>
<script>
import Map from './map.vue'
import timeLine from './timeLine.vue'
export default {
  name: 'ObjManage',
  components: { Map, timeLine },
  data() {
    return {
      dataVal: '',
      value6: '',
      activeName2: 'first',
      mapDataDisplayType: 'create',
      carInfo: {
        allcount: 12500,
        ysycount: 10500,
        xscount: 8000,
        alllc: 20000000,
        pjlc: 100000,
        allsc: 36586032,
        pjsc: 120560
      },
      listArr: [{
        'id': 'HY12345',
        'username': '家属',
        'sex': '男',
        'city': '城市-0',
        'sgdj': '一般事故',
        'sign': 'C1',
        'unit': 'xxxx交警二大队',
        'kf': '3128*******066',
        'experience': 255,
        'logins': '采购部',
        'wealth': 82830700,
        'address': '玉泉路与天山路交叉口',
        'classify': '凌风',
        'joinTime': '2020-07-10 10:08:03',
        'score': 13658658868
      }, {
        'id': 'XY26453',
        'kf': '1128*******066',
        'username': '职工',
        'sgdj': '较大事故',
        'sex': '女',
        'unit': 'xxxx交警支队1分队',
        'city': '城市-0',
        'address': '人民路8号',
        'sign': 'A1',
        'experience': 255,
        'logins': '档案部',
        'wealth': 82830700,
        'classify': '小飞侠',
        'joinTime': '2019-05-06 11:35:00',
        'score': 13558658868
      }, {
        'id': 'NK32142',
        'kf': '4128*******066',
        'username': '内部人员',
        'sex': '女',
        'unit': 'xxxx交警5大队',
        'address': '东风路与大庆路交叉口',
        'sgdj': '特大事故',
        'city': '城市-0',
        'sign': 'B1',
        'experience': 255,
        'logins': '采购部',
        'wealth': 82830700,
        'classify': '吴云龙',
        'joinTime': '2018-06-06 13:00:00',
        'score': 18858658868
      }, {
        'id': 'GB15632',
        'username': '家属',
        'sex': '男',
        'sgdj': '一般事故',
        'unit': 'xxxx交警2大队',
        'city': '城市-0',
        'address': '市城管局门口',
        'sign': 'C3',
        'kf': '2128*******066',
        'experience': 255,
        'logins': '作训部',
        'wealth': 82830700,
        'classify': '武教练',
        'joinTime': '2020-02-06 16:05:00',
        'score': 13858658868
      }, {
        'id': 'HO15632',
        'username': '职工',
        'sex': '男',
        'sgdj': '特重大事故',
        'city': '城市-0',
        'unit': 'xxxx交警1大队',
        'sign': 'A2',
        'address': '黄河路88号',
        'kf': '1128*******022',
        'experience': 255,
        'logins': '后勤部',
        'wealth': 82830700,
        'classify': '凌风',
        'joinTime': '2020-01-12 :15:00:00',
        'score': 13958652546
      }, {
        'id': 'GA15632',
        'username': '内部人员',
        'sex': '女',
        'city': '城市-0',
        'address': '南京路6号',
        'sgdj': '一般事故',
        'kf': '4128*******003',
        'sign': 'C1',
        'unit': 'xxxx交警2大队',
        'experience': 255,
        'logins': '接待部',
        'wealth': 82830700,
        'classify': '凌风',
        'joinTime': '2020-06-06 :10:00:00',
        'score': 17758652546
      }],
      timeLineList: [{
        timestamp: '08:10:00',
        info: '08:10:00'
      }, {
        timestamp: '09:10:00',
        info: '09:10:00'
      }, {
        timestamp: '10:10:00',
        info: '10:10:00'
      }, {
        timestamp: '11:10:00',
        info: '11:10:00'
      }, {
        timestamp: '12:10:00',
        info: '12:10:00'
      }, {
        timestamp: '13:10:00',
        info: '13:10:00'
      }, {
        timestamp: '14:10:00',
        info: '14:10:00'
      }, {
        timestamp: '15:10:00',
        info: '15:10:00'
      }],
      total: 6, // 总数
      listLoading: true,
      selectList: []
    }
  },
  created() {

  },
  mounted() {
    this.$refs.coords.dialogVisible = true
  },
  methods: {
    handleClick(tab, event) {
      if (tab.name === 'first') {
        this.$refs.map.addcarLayerPoint()
      } else if (tab.name === 'second') {
        this.$refs.map.realTimeTracking()
      } else if (tab.name === 'third') {
        this.$refs.map.realTimeTracking()
      } else if (tab.name === 'fourth') {
        this.$refs.map.addArea()
      } else if (tab.name === 'fifth') {
        this.$refs.map.addDZWL()
      }
    }
  }
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.app-container {
  width: 100%;
  height: 100%;
  margin: 20px;
  background: #ffffff;
}
.car {
  background: #034c6a;
  text-align: center;
  height: 80px;
  line-height: 30px;
}
.car_title {
  color: #ffffff;
  margin-top: 12px;
  font-size: 14px;
}
.car_num {
  color: chocolate;
  font-weight: 600;
}
.time{
  position:absolute;
  left:20px;
  top:20px;

}
</style>
