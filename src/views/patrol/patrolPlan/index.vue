<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <!--操作按钮-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="计划名称：" class="filter-item">
            <el-input
              v-model="listQuery.params.planName"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入计划名称："
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="计划类型 : " class="filter-item" :span="12">
            <el-select
              v-model="listQuery.params.planType"
              class="filter-item"
              placeholder="请选择"
              filterable
              style="width:260px"
              @keyup.enter.native="handleFilter"
            >
              <el-option
                v-for="(item,key) in planList"
                :key="key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="是否启用: " class="filter-item" style="margin:0 40px">
            <el-radio-group v-model="listQuery.params.enable">
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
        <!-- <el-table-column label="序号" fixed width="50px">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>-->
        <!-- <el-table-column align="center" label="计划ID">
          <template slot-scope="scope">
            <span>{{ scope.row.planName }}</span>
          </template>
        </el-table-column>-->
        <el-table-column align="center" label="计划名称">
          <template slot-scope="scope">
            <span>{{ scope.row.planName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="巡更路径" show-overflow-tooltip prop="routeName" />
        <el-table-column align="center" label="巡更班组" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.className }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="巡更时段" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.timeName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否启用" :formatter="qy" prop="enable" />
        <el-table-column
          align="center"
          label="计划类型"
          show-overflow-tooltip
          prop="planType"
          :formatter="planType"
        />
        <el-table-column align="center" label="计划描述" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.planDesc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="生效日期" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.beginTime }}</span>
          </template>
        </el-table-column>
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
              <i class="el-icon-tickets primary table-i" title="查看" @click="handleView(row)" />
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
    <!--新增修改巡更班组 对话框-->
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
                <el-form-item label="计划名称：" prop="planName">
                  <el-input v-model="dataForm.planName" class="form-item1" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="计划类型 : " class="filter-item" prop="planType">
                  <el-select
                    v-model="dataForm.planType"
                    class="filter-item"
                    placeholder="请选择"
                    style="width:100%"
                    @keyup.enter.native="handleFilter"
                  >
                    <el-option
                      v-for="(item,key) in planList"
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
              <el-col :md="24" :lg="20">
                <el-form-item label="生效日期: " class="filter-item">
                  <el-date-picker v-model="dataForm.beginTime" type="date" placeholder="选择日期" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="巡更路径选择: " class="filter-item">
                  <el-button type="primary" @click="selectRoute">请选择</el-button>
                </el-form-item>
              </el-col>
              <el-col v-if="dataForm.routeName" :span="14">
                <el-form-item label="当前选中路径: " class="filter-item">
                  <el-input v-model="dataForm.routeName" class="form-item1" disabled />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="巡更班组选择: " class="filter-item">
                  <el-button type="primary" @click="qxz">请选择</el-button>
                </el-form-item>
              </el-col>
              <el-col v-if="dataForm.className" :span="14">
                <el-form-item label="当前选中班组: " class="filter-item">
                  <el-input v-model="dataForm.className" class="form-item1" disabled />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="巡更时段选择: " class="filter-item">
                  <el-button type="primary" @click="selectPatroTime">请选择</el-button>
                </el-form-item>
              </el-col>
              <el-col v-if="dataForm.timeName" :span="14">
                <el-form-item label="当前选中时段: " class="filter-item">
                  <el-input v-model="dataForm.timeName" class="form-item1" disabled />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item label="计划描述：" prop="planDesc">
                  <el-input
                    v-model="dataForm.planDesc"
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
        <el-button @click="dialogUserVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!--查看巡更班组 对话框-->
    <el-dialog
      class="abow_dialog"
      title="查看班组信息"
      :visible.sync="lookVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="750px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form ref="dataForm" :model="dataForm" label-width="130px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="计划名称：">
                  <span v-text="dataForm.planName" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="计划类型 : " class="filter-item" prop="planType">
                  <span v-text="dataForm.planType" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="启用: " class="filter-item">
                  <span v-text="dataForm.enable" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="生效时间: " class="filter-item">
                  <span v-text="dataForm.beginTime" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="班组名称: " class="filter-item">
                  <span v-text="dataForm.className" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="路径名称: " class="filter-item">
                  <span v-text="dataForm.routeName" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="时段名称: " class="filter-item">
                  <span v-text="dataForm.timeName" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item label="计划描述：" prop="planDesc">
                  <span v-text="dataForm.planDesc" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>

    <!--选择班组人员-->
    <el-dialog
      class="abow_dialog"
      title="选择巡更班组"
      :visible.sync="teamVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="50%"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-col :span="15" style="padding:5px;height:500px">
            <el-row style="margin:-20px 0 20px 0;">
              <el-col :span="9">
                <el-input
                  v-model="teamData.params.className"
                  type="text"
                  prefix-icon="el-icon-search"
                  class="filter-item mr10"
                  placeholder="请输入班组名称"
                  @keyup.enter.native="teamFilter"
                />
              </el-col>
              <el-col :span="8" style="margin:0 23px;">
                <el-select
                  v-model="teamData.params.classType"
                  class="filter-item"
                  placeholder="请选择班组类型"
                  filterable
                  @keyup.enter.native="teamFilter"
                >
                  <el-option
                    v-for="(item,key) in teamList"
                    :key="key"
                    :label="item.value"
                    :value="item.key"
                  />
                </el-select>
              </el-col>
              <el-col :span="3">
                <el-button
                  v-waves
                  class="filter-item btn-base"
                  type="primary"
                  size="medium"
                  icon="mr10 iconfont iconsousuo"
                  @click="teamFilter"
                >{{ $t('table.search') }}</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-table
                v-loading="listLoading"
                :data="teamListTable"
                stripe
                class="t-bd"
                height="400px"
                fit
                @row-click="findteam"
              >
                <el-table-column label="序号" fixed width="50px">
                  <template slot-scope="scope">
                    <span>{{ scope.$index + 1 }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="班组名称">
                  <template slot-scope="scope">
                    <span>{{ scope.row.className }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  label="班组类型"
                  show-overflow-tooltip
                  prop="classType"
                  :formatter="teamType"
                />
              </el-table>
              <div class="pagination-container">
                <el-pagination
                  background
                  :current-page="teamData.pageNo"
                  :page-sizes="[10,20,30, 50]"
                  :page-size="teamData.pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="teamtotal"
                  @size-change="teamSizeChange"
                  @current-change="teamCurrentChange"
                />
              </div>
            </el-row>
          </el-col>
          <el-col
            :span="7"
            style="border:1px solid #cccccc;padding:5px;height:500px;position: relative;margin-left:8%"
          >
            <h4 style="  text-align: center;line-height: 40px;">班组人员</h4>
            <!-- <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input> -->
            <div>
              <el-row
                v-for="(item,index) in yxryList"
                :key="index"
                style="height:40px;line-height:40px;padding-left:10px"
              >
                <div style="text-align:center;" v-text="item.userName" />
              </el-row>
              <div class="bz">[备注: 带*标记的为班组长]</div>
            </div>
          </el-col>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="teamVisible = false">取消</el-button>
        <el-button type="primary" @click="qrTeam">确定</el-button>
      </div>
    </el-dialog>

    <!--选择巡更路径-->
    <el-dialog
      class="abow_dialog"
      title="巡更路径选择"
      :visible.sync="routeVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="80%"
    >
      <div class="dialog-content">
        <el-col class="dialog-item map" :span="8">
          <el-row style="margin:-20px 0 20px 0;">
            <el-col :span="9">
              <el-input
                v-model="routerData.params.routeName"
                type="text"
                prefix-icon="el-icon-search"
                class="filter-item mr10"
                placeholder="请输入路线名称"
                @keyup.enter.native="routeFilter"
              />
            </el-col>
            <el-col :span="8" style="margin:0 23px;">
              <el-select
                v-model="routerData.params.routeType"
                class="filter-item"
                placeholder="请选择"
                filterable
                @keyup.enter.native="routeFilter"
              >
                <el-option
                  v-for="(item,key) in routeListselect"
                  :key="key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-col>
            <el-col :span="3">
              <el-button
                v-waves
                class="filter-item btn-base"
                type="primary"
                size="medium"
                icon="mr10 iconfont iconsousuo"
                @click="routeFilter"
              >{{ $t('table.search') }}</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-table
              v-loading="listLoading"
              :data="routelist"
              stripe
              class="t-bd"
              height="400px"
              fit
              @row-click="findDictItemList"
            >
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
            </el-table>
            <div class="pagination-container">
              <el-pagination
                background
                :current-page="routerData.pageNo"
                :page-sizes="[10,20,30, 50]"
                :page-size="routerData.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="routetotal"
                @size-change="routeSizeChange"
                @current-change="routeCurrentChange"
              />
            </div>
          </el-row>
          <el-row style="text-align:center;margin-top:40px">
            <el-button @click="routeVisible =false">取消</el-button>
            <el-button type="primary" @click="qroute">确定</el-button>
          </el-row>
        </el-col>
        <el-col :span="14">
          <Map ref="map" style="height:700px" />
        </el-col>
      </div>
    </el-dialog>

    <!--选择巡更时段-->
    <el-dialog
      class="abow_dialog"
      title="巡更时段选择"
      :visible.sync="patroTimeVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="80%"
    >
      <div class="dialog-content">
        <el-col class="dialog-item map" :span="7">
          <el-row style="margin:-20px 0 20px 0;">
            <el-col :span="9">
              <el-input
                v-model="timeData.params.timeName"
                type="text"
                prefix-icon="el-icon-search"
                class="filter-item mr10"
                placeholder="请输入时段名称"
                @keyup.enter.native="timeFilter"
              />
            </el-col>
            <el-col :span="8" style="margin:0 23px;">
              <el-select
                v-model="timeData.params.timeType"
                class="filter-item"
                placeholder="请选择时段类型"
                filterable
                @keyup.enter.native="timeFilter"
              >
                <el-option
                  v-for="(item,key) in timeListselect"
                  :key="key"
                  :label="item.value"
                  :value="item.key"
                />
              </el-select>
            </el-col>
            <el-col :span="3">
              <el-button
                v-waves
                class="filter-item btn-base"
                type="primary"
                size="medium"
                icon="mr10 iconfont iconsousuo"
                @click="timeFilter"
              >{{ $t('table.search') }}</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-table
              v-loading="listLoading"
              :data="timelist"
              stripe
              class="t-bd"
              height="400px"
              fit
              @row-click="findtimeList"
            >
              <el-table-column label="序号" fixed width="50px">
                <template slot-scope="scope">
                  <span>{{ scope.$index + 1 }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="时段名称">
                <template slot-scope="scope">
                  <span>{{ scope.row.timeName }}</span>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                label="时段类型"
                show-overflow-tooltip
                prop="timeType"
                :formatter="qtimeTypeformat"
              />
            </el-table>
            <div class="pagination-container">
              <el-pagination
                background
                :current-page="timeData.pageNo"
                :page-sizes="[10,20,30, 50]"
                :page-size="timeData.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="timetotal"
                @size-change="timeSizeChange"
                @current-change="timeCurrentChange"
              />
            </div>
          </el-row>
          <el-row style="text-align:center;margin-top:40px">
            <el-button @click="patroTimeVisible =false">取消</el-button>
            <el-button type="primary" @click="qrtime">确定</el-button>
          </el-row>
        </el-col>
        <el-col :span="14">
          <el-form ref="timeForm" :model="timeForm" label-width="130px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="时段名称：">{{ timeForm.timeName }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="时段类型：">{{ timeForm.timeType }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="启用: " class="filter-item">{{ timeForm.enable }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="所选年月: " class="filter-item">{{ timeForm.timeMonth }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="所选日期: " class="filter-item">{{ timeForm.timeCustomizeDays }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="开始时间 : " prop="timeBegin">{{ timeForm.timeBegin }}</el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="结束时间 : " prop="timeEnd">{{ timeForm.timeEnd }}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="执行频度 : " prop="startToEnd">
                  <span>每</span>
                  <span>{{ timeForm.timeHour }}</span>
                  <span>时</span>
                  <span>{{ timeForm.freqMin }}</span>
                  <span>分巡更一次</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item label="时段描述：">{{ timeForm.timeDesc }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getList,
  getpatrolplanList,
  lookPatrolObj,
  lookpatrolplan,
  delpatrolplan,
  addpatrolplan,
  updatepatrolplan,
  getrouteList,
  getpatroltime,
  lookPatrolRoutr
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
      yxryList: [],
      timeListselect: [],
      yueList: [],
      PointData: [], // 所有巡更点地图渲染数据
      zwsjShow: false,
      lookVisible: false,
      routeVisible: false, // 巡更路径控制按钮
      patroTimeVisible: false, // 巡更时段控制按钮
      esjDay: true,

      sanshiDay: true,
      maxDay: false,
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
      routetotal: null, // 路径总条数
      timetotal: null, // 时段总条数
      teamtotal: null,
      listLoading: true,
      teamVisible: false,
      selectList: [],
      sfqyList: [], // 是否启用字典
      teamList: [], // 班组类型
      planList: [],
      timelist: [],
      routelist: [], // 巡更路径列表数据
      routeListselect: [],
      teamListTable: [], // 巡更班组
      patrolRoutePointList: [], // 初始化地图数据
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          planName: '',
          planType: '',
          enable: '00'
        }
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
      timeData: {
        pageNo: 1,
        pageSize: 10,
        params: {
          timeName: '', // 路线名称
          timeType: '00', // 路线类型
          enable: '00'
        }
      },
      teamData: {
        pageNo: 1,
        pageSize: 10,
        params: {
          className: '', // 路线名称
          classType: '', // 路线类型
          enable: '00'
        }
      },
      timeFormrules: {
        timeMonth: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        timeBegin: [
          { required: true, message: '请选择开始时间', trigger: 'change' }
        ],
        timeEnd: [
          { required: true, message: '请选择结束时间', trigger: 'change' }
        ]
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
      dataForm: {
        planName: '', // 计划名称
        enable: '', // 是否启用
        planType: '', // 计划类型
        planDesc: '', // 计划描述
        beginTime: '', // 生效时间
        routeId: '', // 路径id
        routeName: '', // 路径名称
        timeId: '', //	时段id
        timeName: '', // 时段名称
        classId: '', //	班组id
        className: '' // 班组名称
      },
      timeForm: {
        timeName: '', // 时段名称
        enable: '', // 是否启用
        timeDesc: '', // 时段描述
        timeType: '', // 时段类型
        timeMonth: '', // 所选年月
        timeHour: '', // 小时数
        freqMin: '', // 分钟数
        timeBegin: '', // 开始时间
        timeEnd: '', // 结束时间
        timeCustomizeDays: '' // 所选日期
      },
      rules: {
        planName: [
          { required: true, message: '请输入计划名称', trigger: 'blur' }
        ],
        planType: [
          { required: true, message: '请选择计划类型', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  }, // 注册
  created() {
    this.getList()
    // 班组类型字典
    dictBatch('3029').then((res) => {
      this.planList = res.data['3029']
    })
    dictBatch('3026').then((res) => {
      this.teamList = res.data['3026']
    })
    dictBatch('3028').then((res) => {
      this.routeListselect = res.data['3028']
    })
    dictBatch('3027').then((res) => {
      this.timeListselect = res.data['3027']
    })
    // 是否启用字典
    dictBatch('3023').then((res) => {
      this.sfqyList = res.data['3023']
    })
  },
  methods: {
    handleSelectionChange(val) {
      this.selectList = val.map(function(item) {
        return item.id
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

    // 解析时段类型
    qtimeTypeformat(row) {
      let val = ''
      if (row.timeType === '00') {
        val = '普通'
      } else if (row.timeType === '01') {
        val = '临时'
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
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList()
    },
    routeFilter() {
      this.routerData.pageNo = 1
      this.getroute()
    },
    teamFilter() {
      this.teamData.pageNo = 1
      this.getTeamList()
    },
    timeFilter() {
      this.timeData.pageNo = 1
      this.gettimeList()
    },
    qxz() {
      this.teamVisible = true
      this.getTeamList()
    },
    // 选择巡更路径
    selectRoute() {
      this.getroute()
      this.routeVisible = true
      this.$nextTick(() => {
        this.$refs.map.saveRoute(this.patrolRoutePointList)
        this.$refs.map.addData(this.patrolRoutePointList)
      })
    },
    // 选择巡更时段
    selectPatroTime() {
      this.patroTimeVisible = true
      this.gettimeList()
    },

    // 获取巡更计划列表数据
    getList() {
      this.listLoading = true
      getpatrolplanList(this.listQuery).then((response) => {
        this.list = response.data.content
        // console.log(this.list)
        this.total = response.data.totalElements
        this.listLoading = false
      })
    },

    // 监听行数据点击事件
    findDictItemList(row, event, column) {
      this.dataForm.routeName = row.routeName
      this.dataForm.routeId = row.id
      let mapArr = []
      lookPatrolRoutr(row.id).then((res) => {
        mapArr = res.data.patrolRoutePointList
        this.$nextTick(() => {
          this.$refs.map.saveRoute(mapArr)
          this.$refs.map.addData(mapArr)
        })
      })
      console.log(this.dataForm)
    },

    // 监听巡更班组行点击事件
    findteam(row, event, column) {
      lookPatrolObj(row.id).then((res) => {
        for (let i = 0; i < res.data.patrolClassUserVoList.length; i++) {
          if (res.data.patrolClassUserVoList[i].isLead === '00') {
            res.data.patrolClassUserVoList[i].userName =
              '*' + res.data.patrolClassUserVoList[i].userName
          }
        }
        this.yxryList = res.data.patrolClassUserVoList
      })
      this.dataForm.className = row.className
      this.dataForm.classId = row.id
      console.log(this.dataForm)
    },
    // 监听巡更时段行点击事件
    findtimeList(row, event, column) {
      this.dataForm.timeName = row.timeName
      this.dataForm.timeId = row.id
      this.timeForm.timeName = row.timeName
      this.timeForm.enable = row.enable === '00' ? '是' : '否'
      this.timeForm.timeMonth = row.timeMonth
      this.timeForm.timeType = this.qtimeTypeformat(row)
      this.timeForm.timeDesc = row.timeDesc
      this.timeForm.timeBegin = row.timeBegin
      this.timeForm.timeEnd = row.timeEnd
      this.timeForm.timeHour = row.timeHour
      this.timeForm.freqMin = row.freqMin
      this.timeForm.timeCustomizeDays = row.timeCustomizeDays
      console.log(this.dataForm)
    },

    // 获取巡更路径数据
    getroute() {
      this.listLoading = true
      getrouteList(this.routerData).then((response) => {
        this.$nextTick(() => {
          this.routelist = response.data.content
          this.routetotal = response.data.totalElements
          this.listLoading = false
        })
      })
    },

    // 获取巡更班组列表

    getTeamList() {
      this.listLoading = true
      getList(this.teamData).then((response) => {
        this.teamListTable = response.data.content
        this.teamtotal = response.data.totalElements
        this.listLoading = false
      })
    },

    // 获取巡更时段列表

    gettimeList() {
      this.listLoading = true
      getpatroltime(this.timeData).then((response) => {
        this.timelist = response.data.content
        this.timetotal = response.data.totalElements
        this.listLoading = false
      })
    },

    // 巡更计划分页
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.getList()
    },

    // 巡更班组分页
    teamSizeChange(val) {
      this.teamData.pageSize = val
      this.getTeamList()
    },
    teamCurrentChange(val) {
      this.teamData.pageNo = val
      this.getTeamList()
    },

    // 巡更路径分页
    routeSizeChange(val) {
      this.routerData.pageSize = val
      this.getroute()
    },
    routeCurrentChange(val) {
      this.routerData.pageNo = val
      this.getroute()
    },

    // 巡更时段分页
    timeSizeChange(val) {
      this.timeData.pageSize = val
      this.getroute()
    },
    timeCurrentChange(val) {
      this.timeData.pageNo = val
      this.gettimeList()
    },

    // 新增弹框操作
    handleAddRole() {
      this.yxryList = []
      this.operaType = 1
      this.tkTitle = '新增巡更计划'
      this.dataForm.planName = ''
      this.dataForm.enable = '00'
      this.dataForm.personnel = ''
      this.dataForm.className = ''
      this.dataForm.beginTime = ''
      this.dataForm.routeName = ''
      this.dataForm.timeName = ''
      this.dialogUserVisible = true
    },

    handleDelete(row) {
      this.$confirm('确认删除所选记录？').then(() => {
        delpatrolplan(row.id).then(() => {
          this.getList()
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
        })
      })
    },

    // 查看班组信息
    handleView(row) {
      this.dataForm.planName = row.planName
      this.dataForm.planType = this.planType(row)
      this.dataForm.planDesc = row.planDesc
      this.dataForm.enable = row.enable === '00' ? '是' : '否'
      this.dataForm.className = row.className
      this.dataForm.beginTime = row.beginTime
      this.dataForm.routeName = row.routeName
      this.dataForm.timeName = row.timeName
      this.lookVisible = true
    },
    // 保存修改数据接口

    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.operaType === 1) {
            if (this.dataForm.id) {
              delete this.dataForm.id
            }
            addpatrolplan(this.dataForm).then((res) => {
              if (res.code === 200) {
                this.dialogUserVisible = false
                this.getList()
                this.$notify.success({
                  title: '成功',
                  message: '操作成功!'
                })
              }
            })
          } else {
            updatepatrolplan(this.dataForm).then((res) => {
              if (res.code === 200) {
                this.dialogUserVisible = false
                this.getList()
                this.$notify.success({
                  title: '成功',
                  message: '操作成功!'
                })
              }
            })
          }
        }
      })
    },

    // 编辑操作
    handleUpdate(row) {
      this.operaType = 2
      this.tkTitle = '编辑计划'
      this.dataForm.id = row.id
      lookpatrolplan(row.id).then((res) => {
        this.dataForm.planName = res.data.planName
        this.dataForm.planType = this.planType(res.data)
        this.dataForm.planDesc = res.data.planDesc
        this.dataForm.enable = res.data.enable
        this.dataForm.className = res.data.className
        this.dataForm.beginTime = res.data.beginTime
        this.dataForm.routeName = res.data.routeName
        this.dataForm.timeName = res.data.timeName
        this.dialogUserVisible = true
        this.dataForm.timeName = row.timeName
        this.timeForm.timeName = res.data.patrolTime.timeName
        this.timeForm.enable = res.data.patrolTime.enable
        this.timeForm.timeMonth = res.data.patrolTime.timeMonth
        this.timeForm.timeType = this.qtimeTypeformat(res.data.patrolTime)
        this.timeForm.timeDesc = res.data.patrolTime.timeDesc
        this.timeForm.timeBegin = res.data.patrolTime.timeBegin
        this.timeForm.timeEnd = res.data.patrolTime.timeEnd
        this.timeForm.timeHour = res.data.patrolTime.timeHour
        this.timeForm.freqMin = res.data.patrolTime.freqMin
        this.timeForm.timeCustomizeDays = res.data.patrolTime.timeCustomizeDays
        this.patrolRoutePointList = res.data.patrolRoute.patrolRoutePointList
        for (let i = 0; i < res.data.patrolClass.patrolClassUserVoList.length; i++) {
          if (res.data.patrolClass.patrolClassUserVoList[i].isLead === '00') {
            res.data.patrolClass.patrolClassUserVoList[i].userName =
              '*' + res.data.patrolClass.patrolClassUserVoList[i].userName
          }
        }
        this.yxryList = res.data.patrolClass.patrolClassUserVoList
      })
    },

    // 选择路径确认按钮
    qroute() {
      if (!this.dataForm.routeId || !this.dataForm.routeName) {
        this.$message({
          message: '请选择巡更路径',
          type: 'warning'
        })
        return
      } else {
        this.routeVisible = false
      }
    },

    // 选择路径确认按钮
    qrtime() {
      if (!this.dataForm.timeId || !this.dataForm.timeName) {
        this.$message({
          message: '请选择巡更时段',
          type: 'warning'
        })
        return
      } else {
        this.patroTimeVisible = false
      }
    },

    // 选择班组确认按钮
    qrTeam() {
      if (!this.dataForm.classId || !this.dataForm.className) {
        this.$message({
          message: '请选择巡更班组',
          type: 'warning'
        })
        return
      } else {
        this.teamVisible = false
      }
    }

  }
}
</script>
<style scoped>
.switchStyle {
  margin-right: 0;
}
.bz {
  position: absolute;
  bottom: 26px;
  left: 10px;
}

.el-checkbox {
  width: 30px;
}
</style>
