<template>
  <div class="app-container">
    <!--搜索条件-->
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>地图发布</span>
      </div>
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="地图名称：" class="filter-item">
            <el-input
              v-model="listQuery.params.mapName"
              class="filter-item list-query"
              prefix-icon="el-icon-search"
              placeholder="请输入地图名称"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="区域：" class="filter-item">
            <el-cascader
              v-model="regionCodes"
              class="filter-item"
              clearable
              :options="treeData"
              :props="treeProps"
              style="width: 220px"
              @change="regionCodeChange"
            />
          </el-form-item>
          <el-form-item class="filter-item">
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              style="margin-left: 10px;"
              icon="mr10 iconfont iconsousuo"
              @click="handleFilter"
            >{{ $t('table.search') }}</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!--分页内容-->
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        stripe
        :data="list"
        class="t-bd"
      >
        <el-table-column align="center" label="序号" fixed width="50px">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="地图编号" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.mapNo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="地图名称" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.mapName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="地图区域" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row | formatterRegionName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="数据发布" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.releaseCnt }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建人" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.createUser }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建日期" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
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
              <!-- <el-button
                size="mini"
                icon="el-icon-tickets"
                class="operatefont iconchakanb"
                @click="handleView(scope.row)"
              >查看</el-button> -->
              <i class="el-icon-tickets primary table-i" title="查看" @click="handleView(scope.row)" />
              <!-- <el-button
                size="mini"
                icon="el-icon-edit-outline"
                class="operatefont iconbianjib"
                @click="handleUpdate(scope.row)"
              >发布</el-button> -->
              <i class="el-icon-edit-outline warning table-i" title="发布" @click="handleUpdate(scope.row)" />
              <!--<el-tooltip class="item" effect="dark" content="查看" placement="bottom">
              <i class="iconfont iconliebiaochakan" @click="handleView(scope.row)" />
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="发布" placement="bottom">
              <i class="iconfont iconbianjih" @click="handleUpdate(scope.row)" />
              </el-tooltip>-->
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
    <!--地图浏览-->
    <div class="map-view">
      <el-dialog title="查看" :visible.sync="mapViewVisible" left width="65%">
        <tile-map ref="map" @releaseDel="handleMapReleaseDel" />
      </el-dialog>
    </div>
    <!--发布数据-->
    <el-dialog title="地图发布" :visible.sync="dialogFormVisible" left width="80%" top="5vh">
      <el-row style="display: flex;" :gutter="20">
        <!--左侧表单-->
        <el-col :span="12">
          <el-form
            ref="dataForm"
            :rules="rules"
            :model="form"
            label-position="right"
            label-width="100px"
          >
            <div class="dialogBox">
              <el-row>
                <el-col>
                  <div class="area">
                    <img src="@/assets/common/hengxian.png" class="retate area-icon">
                    <span style="text-align: center;margin-top: 0;">基本信息</span>
                    <img src="@/assets/common/hengxian.png" class="area-icon">
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="地图编号" prop="mapNo">
                    <el-input v-model="baseForm.mapNo" placeholder="请输入地图编号" :disabled="true" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="地图名称" prop="mapName">
                    <el-input v-model="baseForm.mapName" placeholder="请输入地图名称" :disabled="true" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="地图区域" prop="regionCodes" label-width="100px">
                    <el-cascader
                      v-model="baseForm.regionCodes"
                      :disabled="true"
                      clearable
                      :options="treeData"
                      :props="treeProps"
                      @change="formRegionCodeChange"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="地图类别" prop="mapType">
                    <el-select
                      v-model="baseForm.mapType"
                      :disabled="true"
                      placeholder="请选择底图类别"
                      class="filter-item"
                    >
                      <el-option
                        v-for="item in mapTypeList"
                        :key="item.key"
                        :label="item.value"
                        :value="item.key"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="备注">
                    <el-input v-model="baseForm.remark" placeholder="请输入备注" :disabled="true" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <div class="dialogBox">
              <el-row>
                <el-col>
                  <div class="area">
                    <img src="@/assets/common/hengxian.png" class="retate area-icon">
                    <span style="text-align: center;margin-top: 0;">
                      <el-radio-group v-model="form.displayType" @change="handleGetBlocks">
                        <el-radio
                          v-for="(item,index) in mapDisplayList"
                          :key="index"
                          :label="item.key+''"
                        >{{ item.value }}</el-radio>
                      </el-radio-group>
                    </span>
                    <img src="@/assets/common/hengxian.png" class="area-icon">
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="发布时间">
                    <el-date-picker
                      v-model="form.date"
                      type="date"
                      placeholder="开始时间"
                      value-format="yyyy-MM-dd"
                      @change="handleGetBlocks"
                    />
                  </el-form-item>
                </el-col>
                <!--              <el-col :span="12">-->
                <!--                <el-form-item label="数据类型">-->
                <!--                  <el-radio-group v-model="form.displayType" @change="handleGetBlocks">-->
                <!--                    <el-radio-->
                <!--                      v-for="(item,index) in mapDisplayList"-->
                <!--                      :key="index"-->
                <!--                      :label="item.key+''"-->
                <!--                    >{{ item.value }}-->
                <!--                    </el-radio>-->
                <!--                  </el-radio-group>-->
                <!--                </el-form-item>-->
                <!--              </el-col>-->
                <el-col :span="12">
                  <el-form-item label="发布">
                    <el-checkbox v-model="form.releaseFlag" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-tabs
                  v-model="editableTabsValue"
                  type="card"
                  editable
                  @edit="handleTabsEdit"
                  @tab-click="tabClick"
                >
                  <el-tab-pane
                    v-for="(item,index) in form.mapBlocks"
                    :key="index"
                    :label="'地图块'+(index+1)"
                    :name="index.toString()"
                  >
                    <el-row :gutter="20">
                      <el-form-item label-width="34px">
                        <el-col :span="24">
                          <el-input
                            v-model="form.mapBlocks[index].address"
                            style="width: 80%;"
                            placeholder="地图服务地址"
                          >
                            <el-select
                              slot="prepend"
                              v-model="form.mapBlocks[index].mapServerType"
                              style="width: 140px;"
                            >
                              <el-option
                                v-for="a in mapServerTypeList"
                                :key="a.key"
                                :label="a.value"
                                :value="a.key"
                              />
                            </el-select>
                          </el-input>
                          <el-button
                            v-waves
                            class="btn-base"
                            type="primary"
                            style="margin-left: 10px;width: 10%"
                            icon="mr10 "
                            @click="handleAnalyse"
                          >解析</el-button>
                        </el-col>
                      </el-form-item>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-form-item label="服务地址">
                          <el-input
                            v-model="form.mapBlocks[index].mapServiceAddress"
                            placeholder="地图服务地址"
                            :disabled="true"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="地图名称">
                          <el-input
                            v-model="form.mapBlocks[index].blockName"
                            placeholder="请输入地图名称"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="地图编号" :prop="'mapBlocks.'+index+'.blockNo'">
                          <el-input v-model="form.mapBlocks[index].blockNo" placeholder="请输入地图编号" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="地图范围">
                          <el-input
                            v-model="form.mapBlocks[index].blockRange"
                            placeholder="请输入地图范围"
                            :disabled="true"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="发布日期" :prop="'mapBlocks.'+index+'.date'">
                          <el-date-picker
                            v-model="form.mapBlocks[index].date"
                            type="date"
                            placeholder="选择日期"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="拍摄机构" :prop="'mapBlocks.'+index+'.shootOrgId'">
                          <el-select
                            v-model="form.mapBlocks[index].shootOrgId"
                            clearable
                            placeholder="选择机构"
                            class="filter-item"
                          >
                            <el-option
                              v-for="b in customerOrgIdList"
                              :key="b.id"
                              :label="b.name"
                              :value="b.id"
                            />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="发布机构">
                          <el-input
                            v-model="form.mapBlocks[index].orgName"
                            placeholder="请输入发布机构"
                            :disabled="true"
                          />
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-tab-pane>
                </el-tabs>
              </el-row>
            </div>
          </el-form>
        </el-col>
        <!--右侧地图-->
        <el-col :span="12">
          <div class="dialogBox">
            <el-row>
              <div class="area">
                <img src="@/assets/common/hengxian.png" class="retate area-icon">
                <span style="text-align: center;margin-top: 0;">地图预览</span>
                <img src="@/assets/common/hengxian.png" class="area-icon">
              </div>
            </el-row>
            <el-row style="height: 95%">
              <tile-lyr ref="lyrMap" />
              <div
                v-if="form.mapBlocks[editableTabsValue] && form.displayType === '2'"
                class="three-map-contain"
              >
                <span class="three-item">
                  <span class="three-item-label">Xs：</span>
                  <el-input-number
                    v-model="form.mapBlocks[editableTabsValue].mapLoadParm.Xs"
                    :controls="false"
                    class="input-mm"
                    @change="mapBlockChange"
                  />
                </span>
                <span class="three-item">
                  <span class="three-item-label">Ys：</span>
                  <el-input-number
                    v-model="form.mapBlocks[editableTabsValue].mapLoadParm.Ys"
                    :controls="false"
                    class="input-mm"
                    @change="mapBlockChange"
                  />
                </span>
                <span class="three-item">
                  <span class="three-item-label">Zs：</span>
                  <el-input-number
                    v-model="form.mapBlocks[editableTabsValue].mapLoadParm.Zs"
                    :controls="false"
                    class="input-mm"
                    @change="mapBlockChange"
                  />
                </span>
                <br>
                <span class="three-item">
                  <span class="three-item-label">Rx：</span>
                  <el-input-number
                    v-model="form.mapBlocks[editableTabsValue].mapLoadParm.Rx"
                    :controls="false"
                    class="input-mm"
                    @change="mapBlockChange"
                  />
                </span>
                <span class="three-item">
                  <span class="three-item-label">Ry：</span>
                  <el-input-number
                    v-model="form.mapBlocks[editableTabsValue].mapLoadParm.Ry"
                    :controls="false"
                    class="input-mm"
                    @change="mapBlockChange"
                  />
                </span>
                <span class="three-item">
                  <span class="three-item-label">Rz：</span>
                  <el-input-number
                    v-model="form.mapBlocks[editableTabsValue].mapLoadParm.Rz"
                    :controls="false"
                    class="input-mm"
                    @change="mapBlockChange"
                  />
                </span>
              </div>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { page, view, update, releaseInfo } from '@/api/base/mapblock'
import {
  dictRegion,
  dictmapServerType,
  dictmapTypeList
} from '@/api/base/dictDetail'
import { findByType } from '@/api/base/org'
// import TileMap from '@/components/OLMap/service/TileMap'
import TileMap from '../components/TileMap'
import qs from 'qs'
import tileLyr from './components/index3d'
import * as MapMethods from './components/index'
import axios from 'axios'

const url = require('url')

export default {
  name: 'MapRelease',
  components: {
    'tile-lyr': tileLyr,
    'tile-map': TileMap
  },
  data() {
    return {
      // 子map页面重新刷新
      timer: '',
      releaseFlag: false,
      mapViewVisible: false,
      editableTabsValue: '0',
      regionCodes: [],
      mapTypeList: [],

      mapDisplayList: [
        { key: '1', value: '二维' },
        { key: '2', value: '三维' }
      ],
      beforeRegion: '', // 记录点击列表的范围区域
      beforeMapYype: '', // 记录点击列表的地图类型
      mapServerTypeList: [],
      customerOrgIdList: [],
      treeData: [],
      treeProps: {
        expandTrigger: 'hover',
        value: 'id',
        label: 'label',
        children: 'children',
        checkStrictly: true
      },
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          mapName: '',
          mapRelease: {
            map: {}
          }
        }
      },
      baseForm: {},
      form: {
        id: '',
        date: '',
        displayType: '',
        releaseFlag: '',
        mapBlocks: [
          {
            id: '',
            address: '',
            mapServerType: '',
            mapServiceAddress: '',
            blockName: '',
            blockNo: '',
            blockRange: '',
            date: '',
            shootOrgId: '',
            shootOrgName: '',
            flag: false,
            orgName: '',
            orgId: '',
            mapLoadParm: {
              Xs: '',
              Ys: '',
              Zs: '',
              Rx: '',
              Ry: '',
              Rz: ''
            }
          }
        ]
      },
      dialogFormVisible: false,
      regionCodeFields: {
        0: 'provinceCode',
        1: 'cityCode',
        2: 'countyCode'
      }
    }
  },
  computed: {
    rules() {
      const obj = {}
      this.form.mapBlocks.forEach((item, index) => {
        obj['mapBlocks.' + index + '.mapServiceAddress'] = [
          {
            required: true,
            message: '请输入服务地址',
            trigger: 'blur'
          }
        ]
        obj['mapBlocks.' + index + '.blockName'] = [
          {
            required: true,
            message: '请输入地图名称',
            trigger: 'blur'
          }
        ]
        obj['mapBlocks.' + index + '.mapNo'] = [
          {
            required: true,
            message: '请输入地图编号',
            trigger: 'blur'
          }
        ]
        obj['mapBlocks.' + index + '.date'] = [
          {
            required: true,
            message: '请选择发布日期',
            trigger: 'blur'
          }
        ]
        obj['mapBlocks.' + index + '.blockRange'] = [
          {
            required: true,
            message: '请输入地图范围',
            trigger: 'blur'
          }
        ]
        obj['mapBlocks.' + index + '.shootOrgId'] = [
          {
            required: true,
            message: '请选择机构',
            trigger: 'change'
          }
        ]
      })
      return obj
    },
    nm() {
      return this.form.displayType
    }
  },
  watch: {
    mapViewVisible(val) {
      if (!val) {
        this.$refs.map.tableVisible = false
      }
    },
    nm() {
      if (this.$refs['lyrMap']) {
        this.$refs['lyrMap'].initMap({
          baseLayerType: this.beforeMapYype,
          regionCode: this.beforeRegion,
          maptype: this.form.displayType
        })
      }
    }
  },
  created() {
    this.getList()
    this.getMapServerTypeList()
    this.getTreeRegionList()
    this.getCustomerOrgList()
    this.getDictmapTypeList()
  },
  methods: {
    handleMapReleaseDel() {
      this.getList()
    },
    regionCodeChange(arr) {
      for (const a in this.regionCodeFields) {
        this.listQuery.params[this.regionCodeFields[a]] = ''
      }
      arr.forEach((item, index) => {
        this.listQuery.params[this.regionCodeFields[index]] = item
      })
    },
    formRegionCodeChange(arr) {
      for (const a in this.regionCodeFields) {
        this.baseForm[this.regionCodeFields[a]] = ''
      }
      arr.forEach((item, index) => {
        this.baseForm[this.regionCodeFields[index]] = item
      })
    },
    async handleAnalyse() {
      const block = this.form.mapBlocks[this.editableTabsValue]
      const strUrl = block.address
      if (strUrl === '' || strUrl === undefined) {
        this.$message.error('请输入解析地址!')
        return
      }
      const maptype = this.form.displayType
      MapMethods.removeLyr(block, this.editableTabsValue, maptype)
      if (maptype === '1') {
        if (block.mapServerType === '02') {
          //  02 geoserver服务
          const urlObj = url.parse(strUrl)
          block.mapServiceAddress = url.format({
            protocol: urlObj.protocol,
            host: urlObj.host,
            pathname: 'geoserver/gwc/service/wmts'
          })
          const aaa = qs.parse(urlObj.query)
          block.blockName = aaa.layers
          block.blockRange = '[' + aaa.bbox + ']'
        } else {
          // 01 自研服务
          block.mapServiceAddress = strUrl
          const tempUrl = strUrl.replace('/{z}/{x}/{y}', '')
          const iIndex = tempUrl.lastIndexOf('/')
          const requestUrl = tempUrl.substring(0, iIndex + 1)
          const serviceId = tempUrl.substring(iIndex + 1)
          await axios
            .get(requestUrl)
            .then(function(response) {
              const res = response.data
              const listMap = res.images.rows
              listMap.forEach((item) => {
                if (item._id === serviceId) {
                  block.blockName = item.name
                  block.blockRange =
                    '[' +
                    item.west +
                    ',' +
                    item.south +
                    ',' +
                    item.east +
                    ',' +
                    item.north +
                    ']'
                  return true
                }
              })
              // response格式
              // {"status":"ok","images":{"rows":[{"_id":"8ee3f450ac4b11eab7bc494020aa7c4a","name":"23asddsad32323title","desc":"","type":"file","path":"G:\\23asddsad32323title","west":117.36952052674,"east":117.372524600837,"south":38.8084094713765,"north":38.8107503456033,"minzoom":0,"maxzoom":15,"contenttype":"image/png","thumbnail":null,"date":"2020-06-12 09:25:10"},{"_id":"00e2ce10ac4b11eab7bc494020aa7c4a","name":"asdadasd232213title","desc":"","type":"file","path":"G:\\asdadasd232213title","west":117.36952052674,"east":117.372524600837,"south":38.8084094713765,"north":38.8107503456033,"minzoom":0,"maxzoom":15,"contenttype":"image/png","thumbnail":null,"date":"2020-06-12 09:21:12"}]}}
            })
            .catch(function(error) {
              console.log(error)
            })
        }
        block.flag = true
      } else if (maptype === '2') {
        block.mapServiceAddress = strUrl
        block.blockName = ''
        block.blockRange = ''
        block.flag = true
      }
      this.$refs.lyrMap.addLyr(block, this.editableTabsValue)
    },
    getTreeRegionList() {
      dictRegion().then((res) => {
        this.treeData = res.data
      })
    },
    getMapServerTypeList() {
      dictmapServerType().then((res) => {
        this.mapServerTypeList = res.data
      })
    },
    getCustomerOrgList() {
      findByType('0,1').then((res) => {
        this.customerOrgIdList = res.data
      })
    },
    getDictmapTypeList() {
      dictmapTypeList().then((res) => {
        this.mapTypeList = res.data
      })
    },
    getList() {
      this.listLoading = true
      page(this.listQuery).then((response) => {
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
    resetBaseForm() {
      this.baseForm = {}
      this.editableTabsValue = '0'
    },
    resetForm() {
      this.form = {
        id: '',
        date: '',
        displayType: this.mapDisplayList[0].key,
        releaseFlag: true,
        mapBlocks: [this.initUnitBlock()]
      }
    },
    resetFormBlocks() {
      this.form.mapBlocks = [this.initUnitBlock()]
    },
    initUnitBlock() {
      const userInfo = this.$store.getters.userInfo
      return {
        flag: false,
        address: '',
        mapServerType: this.mapServerTypeList[0].key,
        mapServiceAddress: '',
        blockName: '',
        blockNo: '',
        blockRange: '',
        date: '',
        shootOrgId: '',
        shootOrgName: '',
        orgName: userInfo.orgName,
        orgId: userInfo.orgId,
        mapLoadParm: {
          Xs: '',
          Ys: '',
          Zs: '',
          Rx: '',
          Ry: '',
          Rz: ''
        }
      }
    },
    handleGetBlocks() {
      this.resetFormBlocks()
      this.editableTabsValue = '0'
      if (this.form.date !== '') {
        releaseInfo(
          this.form.date,
          this.baseForm.id,
          this.form.displayType
        ).then(async(res) => {
          if (res.data !== '') {
            this.form = res.data
            if (this.form.mapBlocks.length > 0) {
              this.$refs['lyrMap'].initLyrs(this.form.mapBlocks)
              const block = this.form.mapBlocks[0]
              const lyrId = block.orgId + 0
              MapMethods.setCurrentModel(lyrId)
            } else {
              this.form.mapBlocks = [this.initUnitBlock()]
              this.$refs['lyrMap'].initLyrs([])
            }
          } else {
            this.form.mapBlocks = [this.initUnitBlock()]
            this.$refs['lyrMap'].initLyrs([])
          }
        })
      }
    },
    handleTabsEdit(targetIndex, action) {
      if (action === 'add') {
        this.form.mapBlocks.push(this.initUnitBlock())
        this.editableTabsValue = (this.form.mapBlocks.length - 1).toString()
      } else if (action === 'remove') {
        const index = this.editableTabsValue
        if (targetIndex === index) {
          this.editableTabsValue = targetIndex - 1
          if (this.editableTabsValue < 0) {
            this.editableTabsValue = 0
          }
        } else if (targetIndex < index) {
          this.editableTabsValue = this.editableTabsValue - 1
        }
        this.editableTabsValue = this.editableTabsValue.toString()
        const block = this.form.mapBlocks[targetIndex]
        this.$refs['lyrMap'].removeLyr(block, targetIndex)
        this.form.mapBlocks.splice(targetIndex, 1)
        if (this.form.mapBlocks.length) {
          const blockLater = this.form.mapBlocks[this.editableTabsValue]
          const lyrId = blockLater.orgId + this.editableTabsValue
          MapMethods.setCurrentModel(lyrId)
        }
      }
    },
    handleUpdate(row) {
      this.resetForm()
      this.resetBaseForm()
      this.baseForm = Object.assign({}, row) // copy obj
      this.baseForm.regionCodes = [
        row.provinceCode,
        row.cityCode,
        row.countyCode
      ].filter((item) => {
        return item !== ''
      })
      this.dialogFormVisible = true
      this.beforeRegion = [...this.baseForm.regionCodes].pop() // 记录点击列表的范围区域
      this.beforeMapYype = row.mapType // 记录点击列表的地图类型
      //
      this.$nextTick(() => {
        this.$refs['lyrMap'].initMap({
          baseLayerType: row.mapType,
          regionCode: [...this.baseForm.regionCodes].pop(),
          maptype: '1'
        })
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      if (this.form.date === '') {
        this.$message.error('请先选择数据发布日期!')
        return
      }
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          console.log(this.form)
          this.dialogFormVisible = false
          if (this.form.mapBlocks.length > 0) {
            const result = this.customerOrgIdList.find((item) => {
              return item.id === this.form.mapBlocks[0].shootOrgId
            })
            this.form.mapBlocks[0].shootOrgName = result.name
          }
          update(this.form, this.baseForm.id).then(() => {
            this.getList()
            this.$message.success('地图发布成功')
          })
        }
      })
    },
    handleView(row) {
      this.mapViewVisible = true
      const mapOpts = {}
      mapOpts.regionCode = [row.provinceCode, row.cityCode, row.countyCode]
        .filter((item) => {
          return item !== ''
        })
        .pop()
      mapOpts.baseLayerType = row.mapType
      view(row.id).then((res) => {
        this.$refs.map.disPlay({
          mapOpts: mapOpts,
          baseInfo: row,
          layerInfo: res.data
        })
      })
    },
    tabClick(val) {
      // this.editableTabsValue当前编辑的tab
      const block = this.form.mapBlocks[val.index]
      MapMethods.zoomToLyr(block, val.index, this.form.displayType)
      const lyrId = block.orgId + val.index
      const hasLayer = MapMethods.setCurrentModel(lyrId)
      if (!hasLayer) {
        return
      }
      if (typeof this.form.mapBlocks[val.index].mapLoadParm === 'string') {
        this.form.mapBlocks[val.index].mapLoadParm = JSON.parse(
          this.form.mapBlocks[val.index].mapLoadParm
        )
      }
      this.getMapLoadParmFromModel(val.index, MapMethods.currentModel)
    },
    mapBlockChange(val) {
      console.log(val)
      console.log(this.form)
      if (MapMethods.currentModel) {
        // 参数this.form.mapBlocks[this.editableTabsValue].mapLoadParm
        const mapLoadParm = this.form.mapBlocks[this.editableTabsValue]
          .mapLoadParm
        MapMethods.currentModel.update3dtilesMaxtrix(mapLoadParm)
      }
    },
    getMapLoadParmFromModel(tabIndex, model) {
      console.log(model)
      console.log(model.offsetopt)
      if (typeof this.form.mapBlocks[tabIndex].mapLoadParm === 'string') {
        this.form.mapBlocks[tabIndex].mapLoadParm = JSON.parse(
          this.form.mapBlocks[tabIndex].mapLoadParm
        )
      }
      this.form.mapBlocks[tabIndex].mapLoadParm.Xs = model.offsetopt.Xs
      this.form.mapBlocks[tabIndex].mapLoadParm.Ys = model.offsetopt.Ys
      this.form.mapBlocks[tabIndex].mapLoadParm.Zs = model.offsetopt.Zs
      this.form.mapBlocks[tabIndex].mapLoadParm.Rx = model.offsetopt.Rx
      this.form.mapBlocks[tabIndex].mapLoadParm.Ry = model.offsetopt.Ry
      this.form.mapBlocks[tabIndex].mapLoadParm.Rz = model.offsetopt.Rz
    }
  }
}
</script>
<style lang="scss" scoped>
.list-query {
  width: 340px;
  margin-right: 22px;
}

.area {
  text-align: center;
  margin-bottom: 10px;
  height: 25px;
}

.area .area-icon {
  margin: 0 10px;
}

.retate {
  transform: rotate(180deg);
}
.three-map-contain {
  position: absolute;
  top: 10px;
  left: 10px;
  width: auto;
  .three-item {
    position: relative;
    display: inline-block;
    margin-right: 20px;
    .three-item-label {
      position: absolute;
      font-size: 14px;
      color: white;
      line-height: 30px;
      z-index: 3;
      left: 8px;
    }
  }
}
</style>
<style lang="scss">
.three-map-contain {
  .input-mm {
    .el-input-group__prepend {
      background-color: rgba(26, 44, 65, 0.6);
      border-width: 0px;
      height: 30px;
      width: 25px;
      float: left;
      display: inline;
      text-align: center;
      line-height: 30px;
      color: white;
    }
    .el-input__inner {
      height: 30px;
      width: 150px;
      font-size: 12px;
      text-align: left;
      padding-left: 40px;
      float: left;
      border: 0px solid rgba(9, 67, 154, 0.7);
      margin-left: 0px;
      margin-bottom: 10px;
      background-color: rgba(26, 44, 65, 0.6);
      color: white;
    }
    .el-input__inner::-webkit-input-placeholder {
      color: white;
    }
  }
}
</style>
