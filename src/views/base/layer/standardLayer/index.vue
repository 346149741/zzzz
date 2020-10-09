<template>
  <div class="app-container standardLayer">
    <el-row :gutter="20">
      <!--图层组树-->
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="menu-title">
            <div>
              <span class="mr10" style="line-height: 16px;">标准图层分组</span>
            </div>
            <div class="menu-title-icon t-col-operate">
              <el-tooltip class="item mr10" effect="dark" content="新增" placement="bottom">
                <i class="iconfont primary iconxinzengh" @click="handleLyrCreate()" />
              </el-tooltip>
              <el-tooltip class="item mr10" effect="dark" content="编辑" placement="bottom">
                <i class="iconfont warning iconbianjih" @click="handleLyrEdit()" />
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                <i class="iconfont danger iconshanchuh" @click="handleLyrDelete()" />
              </el-tooltip>
            </div>
          </div>
          <el-tree
            ref="tree"
            class="filter-tree"
            :data="treeData"
            :highlight-current="highlight"
            node-key="id"
            :props="defaultProps"
            default-expand-all
            :expand-on-click-node="false"
            @node-click="getNodeData"
          />
        </el-card>
      </el-col>
      <!--图层表-->
      <el-col :span="18">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>标准图层信息</span>
          </div>
          <div class="filter-container">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="图层名称：" class="filter-item">
                <el-input
                  v-model="filterTxt"
                  type="text"
                  prefix-icon="el-icon-search"
                  class="filter-item mr10"
                  placeholder="请输入图层名称"
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
                <el-button
                  class="filter-item btn-base filter-add-btn"
                  type="primary"
                  icon="mr10 iconfont iconxinzengh"
                  @click="handleCreate"
                >添加</el-button>
              </el-form-item>
            </el-form>
          </div>

          <el-table
            v-loading="listLoading"
            stripe
            :data="list"
            class="t-bd"
            fit
            height="50vh"
          >
            <el-table-column align="center" label="序号" fixed width="50px">
              <template slot-scope="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="图层组" fixed show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.pname }}</span>
              </template>
            </el-table-column>
            <el-table-column label="图层编号" fixed show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>
            <el-table-column label="图层名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="默认加载" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.loadFlag?'是':'否' }}</span>
              </template>
            </el-table-column>
            <el-table-column label="二维形状" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.shapeTypeName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="二维展现" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.pcode !== '03'">
                  <span v-if="scope.row.shapeType === '0'">
                    <img
                      v-if="scope.row.showStyle2d !== ''"
                      style="width: 30px;height: 30px;border-style: none;"
                      :src="scope.row.showStyle2d.image"
                    >
                  </span>
                  <span v-if="scope.row.shapeType === '1'">
                    <div
                      v-if="scope.row.showStyle2d !== ''"
                      :style="{height: '10px',
                               width: '80%',
                               margin: '0 auto',
                               borderBottomStyle: scope.row.showStyle2d.stroke.lineDash,
                               borderBottomWidth: scope.row.showStyle2d.stroke.width + 'px',
                               borderBottomColor: scope.row.showStyle2d.stroke.color}"
                    />
                  </span>
                  <span v-if="scope.row.shapeType === '2'">
                    <div
                      v-if="scope.row.showStyle2d !== ''"
                      :style="{height: '30px',
                               width: '60px',
                               margin: '0 auto',
                               borderStyle: scope.row.showStyle2d.stroke.lineDash,
                               borderWidth: scope.row.showStyle2d.stroke.width + 'px',
                               borderColor: scope.row.showStyle2d.stroke.color,
                               backgroundColor: scope.row.showStyle2d.fill}"
                    />
                  </span>
                </span>
                <span v-else>
                  <img
                    v-for="(a, b) in scope.row.showStyleList"
                    :key="b"
                    style="width: 15px;height: 15px;border-style: none;margin-left:4px;"
                    :src="a.image"
                  >
                </span>
              </template>
            </el-table-column>
            <el-table-column label="三维模型" align="center">
              <template slot-scope="scope">
                <span>
                  <img
                    v-if="scope.row.showStyle3d.image"
                    style="width: 30px;height: 30px;border-style: none;"
                    :src="scope.row.showStyle3d.image"
                  >
                </span>
              </template>
            </el-table-column>
            <el-table-column label="计量单位" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.unitName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('table.actions')"
              fixed="right"
              align="center"
              class-name="small-padding fixed-width"
              width="300px"
            >
              <template slot-scope="scope">
                <div class="t-col-operate">
                  <!-- <el-button
                    v-if="selectedTree.code !== '01'"
                    size="mini"
                    icon="el-icon-plus"
                    class="operatefont iconqitab"
                    @click="handleServer(scope.row)"
                  >添加服务</el-button> -->
                  <i v-if="selectedTree.code !== '01'" class="el-icon-plus primary table-i" title="添加服务" @click="handleServer(scope.row)" />
                  <!-- <el-button
                    size="mini"
                    icon="el-icon-edit-outline"
                    class="operatefont iconbianjib"
                    @click="handleUpdate(scope.row)"
                  >编辑</el-button> -->
                  <i class="el-icon-edit-outline warning table-i" title="编辑" @click="handleUpdate(scope.row)" />
                  <!-- <el-button
                    size="mini"
                    icon="el-icon-delete"
                    class="operatefont iconshanchub"
                    @click="handleDelete(scope.row)"
                  >删除</el-button> -->
                  <i class="el-icon-delete danger table-i" title="删除" @click="handleDelete(scope.row)" />
                </div>
              </template>
            </el-table-column>
          </el-table>

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
      </el-col>
    </el-row>
    <!--图层组编辑-->
    <el-dialog
      top="10vh"
      :title="treeTextMap[treeDialogStatus]"
      :visible.sync="treeDialogFormVisible"
      left
      width="520px"
    >
      <el-form
        ref="treeDataForm"
        :rules="treeRules"
        :model="treeForm"
        label-position="right"
        label-width="100px"
      >
        <el-form-item label="上级" prop="pcode">
          <el-cascader
            v-model="treeForm.pcode"
            :show-all-levels="false"
            style="display: block;"
            :options="treeData"
            :props="treeFormTreeProps"
            clearable
            :disabled="treeDialogStatus!=='create'"
            @change="getTreeCode"
          />
        </el-form-item>
        <el-form-item label="图层组编码" prop="code">
          <el-input v-model.lazy="treeForm.code" :disabled="treeDialogStatus!=='create'" />
        </el-form-item>
        <el-form-item label="图层组名称" prop="name">
          <el-input v-model.lazy="treeForm.name" />
        </el-form-item>
        <el-form-item label="序号" prop="sort">
          <el-input v-model="treeForm.sort" />
        </el-form-item>
        <el-form-item label="启用">
          <div class="t-row-operate">
            <el-switch
              v-model="treeForm.enable"
              class="switchStyle"
              active-color="#42B983"
              inactive-color="#A2A9BA"
              active-text="启用"
              inactive-text="禁用"
            />
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="treeDialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button v-if="treeDialogStatus==='create'" type="primary" @click="createTreeData">新增</el-button>
        <el-button v-else type="primary" @click="updateTreeData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <!--图层编辑-->
    <el-dialog
      top="10vh"
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="841px"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="form"
        label-position="right"
        label-width="140px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="归属图层组" prop="pcode">
              <el-cascader
                ref="belongCascad"
                v-model="form.pcode"
                style="display: block;"
                :options="treeData"
                :props="formTreeProps"
                :disabled="dialogStatus === 'update'"
                @change="handlePcodeChange"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图层编号" prop="code">
              <el-input v-model="form.code" :disabled="dialogStatus === 'update'" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图层名称" prop="name">
              <el-input v-model.lazy="form.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="序号" prop="sort">
              <el-input v-model="form.sort" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="几何形状">
              <el-radio
                v-for="item in dirList['1011']"
                :key="item.key"
                v-model="form.shapeType"
                :label="item.key"
                @change="handleShapeTypeChange"
              >{{ item.value }}</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计量单位">
              <el-input v-model.lazy="form.unitName" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col v-show="form.pcode !== '03'" :span="24">
            <el-form-item label="二维图例" prop="showStyle2d" class="icon-from">
              <el-popover placement="bottom" width="620">
                <spotIcon v-if="legendType === '0'" @iconSelect="iconSelect" />
                <lineIcon
                  v-if="legendType !== '0'"
                  :pop-data="legendType"
                  :line-data="form.showStyle2d"
                  @iconSelect="iconSelect"
                />
                <div slot="reference" ref="legendIcon" class="legend-select" />
              </el-popover>
              <i class="el-icon-circle-close clear-icon" @click="clearIcon('legendIcon')" />
            </el-form-item>
          </el-col>
          <el-col v-show="form.pcode !== '03'" :span="24">
            <el-form-item label="三维模型" prop="showStyle3d" class="icon-from">
              <el-popover placement="bottom" width="620">
                <modoIcon @modoSelect="modoSelect" />
                <div slot="reference" ref="modoIcon" class="legend-select" />
              </el-popover>
              <i class="el-icon-circle-close clear-icon" @click="clearIcon('modoIcon')" />
            </el-form-item>
          </el-col>
          <el-col v-show="form.pcode === '03'" :span="24">
            <el-form-item label="预警模型" prop="showStyle3d" class="icon-from">
              <el-popover placement="bottom" width="620">
                <warnIcon @warnSelect="warnSelect" />
                <div slot="reference" ref="warnIcon" class="legend-select" />
              </el-popover>
              <i class="el-icon-circle-close clear-icon" @click="clearIcon('warnIcon')" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="表现形式" prop="displayWay">
              <el-cascader
                v-model="form.displayWay"
                :props="{ expandTrigger: 'hover',emitPath:false }"
                :options="Popup_Coms"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="三维加载样式">
              <el-radio-group v-model="form.showWay3d">
                <el-radio label="0">二维样式</el-radio>
                <el-radio label="1">三维样式</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否默认加载">
              <el-radio v-model="form.loadFlag" :label="true">加载</el-radio>
              <el-radio v-model="form.loadFlag" :label="false">不加载</el-radio>
            </el-form-item>
          </el-col>
          <el-col v-if="form.pcode === '02' || form.pcode === '03'" :span="12">
            <el-form-item label="是否实时接收数据">
              <el-radio-group v-model="form.wsFlag">
                <el-radio :label="false">不接受</el-radio>
                <el-radio :label="true">接收</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col v-if="form.wsFlag" :span="12">
            <el-form-item label="主题">
              <el-input v-model="form.wsEvent" disabled />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button v-if="dialogStatus === 'add'" type="primary" @click="createData">添加</el-button>
        <el-button v-else type="primary" @click="updateData">保存</el-button>
      </div>
    </el-dialog>
    <!--服务编辑-->
    <el-dialog
      top="10vh"
      :title="'['+operateRow.name+']'+'选择数据服务'"
      :visible.sync="dialogServerVisible"
      left
      width="600px"
    >
      <el-form ref="serverForm" label-position="left" label-width="100px">
        <div v-for="(item, ind) in serverList" :key="ind" class="services-content">
          <div
            v-if="item.serviceType !== '1'"
            class="service-title"
          >{{ getServiceName(item.serviceType) }}</div>
          <div v-if="item.serviceType !== '1'" class="service-content">
            <div v-for="(cell, index) in item.children" :key="index" class="service-content-item">
              <el-checkbox
                v-model="cell.check"
                @change="changeCellHandle(cell)"
              >{{ cell.serviceName }}</el-checkbox>
              <span v-if="cell.paraSet.dataFrom === '1-字典'" class="terminal">
                <span style="line-height: 32px;">{{ cell.paraSet.paraNmae }}</span>
                <el-select
                  v-model="cell.paraSet.selected"
                  clearable
                  collapse-tags
                  size="small"
                  placeholder="请选择"
                  style="width:150px;float:right;margin-left: 8px;"
                  @change="selectCell"
                >
                  <el-option
                    v-for="(s,k) in cell.paraSet.dict"
                    :key="k"
                    :label="s.value"
                    :value="s.key"
                  />
                </el-select>
              </span>
              <span v-else class="terminal">
                <span style="line-height: 32px;">服务参数</span>
                <el-select
                  value="0"
                  collapse-tags
                  placeholder="请选择"
                  size="small"
                  style="width:150px;float:right;margin-left: 8px;"
                >
                  <el-option label="无" value="0" />
                </el-select>
              </span>
            </div>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogServerVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="createServer">添加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  tree,
  createTree,
  findItemTree,
  updateItem,
  delTree,
  genCode,
  genLyrCode,
  genLyrSort,
  checkCode,
  create,
  page,
  update,
  del,
  server,
  genTCSort
} from '@/api/base/standardLyr'
import { dictBatch, dictCode } from '@/api/base/dictDetail'
import spotIcon from '../common/spotIcon'
import lineIcon from '../common/lineIcon'
import modoIcon from '../common/modoIcon'
import warnIcon from '../common/warnIcon'
import Popup_Coms from '@/assets/perform-type'

export default {
  name: 'Standard',
  filters: {},
  components: { spotIcon, lineIcon, modoIcon, warnIcon },
  data() {
    return {
      Popup_Coms,
      highlight: true,
      serverList: [],
      dirList: {},
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {}
      },
      ptFillVisible: true,
      filterTxt: '',
      list: null,
      total: null,
      listLoading: true,
      treeData: null,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      selectedTree: {
        code: '',
        pcode: ''
      },
      treeDialogFormVisible: false,
      treeDialogStatus: '',
      treeTextMap: {
        update: '图层组编辑',
        create: '图层组新增'
      },
      treeFormTreeProps: {
        expandTrigger: 'hover',
        value: 'id',
        label: 'label',
        children: 'children',
        emitPath: false,
        checkStrictly: true
      },
      formTreeProps: {
        expandTrigger: 'hover',
        value: 'id',
        label: 'label',
        children: 'children',
        emitPath: false
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '图层编辑',
        create: '图层新增'
      },
      dialogServerVisible: false,
      operateRow: {},
      treeRules: {
        pcode: [
          { required: false, message: '请填写图层组编码', trigger: 'change' }
        ],
        code: [
          { required: true, message: '请填写图层组编码', trigger: 'blur' },
          { validator: this.validTreeCode, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请填写图层组名称', trigger: 'blur' }
        ]
      },
      rules: {
        pcode: [
          { required: true, message: '请选择归属图层组', trigger: 'change' }
        ],
        code: [
          { required: true, message: '请填写图层编号', trigger: 'blur' },
          { validator: this.validFormCode, trigger: 'blur' }
        ],
        name: [{ required: true, message: '请填写图层名称', trigger: 'blur' }],
        sort: [{ required: true, message: '请填写图层序号', trigger: 'blur' }],
        legendId: [{ required: true, message: '请选择图标', trigger: 'blur' }],
        fillColor: [{ required: true, message: '请选择颜色', trigger: 'blur' }],
        value: [{ required: true, message: '请填写配置项值', trigger: 'blur' }],
        displayWay: [
          { required: true, message: '请选择表现形式', trigger: 'blur' }
        ]
      },
      treeForm: {
        pcode: '',
        code: '',
        name: '',
        enable: true,
        layerFlag: false,
        sort: 0
      },
      form: {
        pcode: '',
        pname: '',
        code: '',
        name: '',
        sort: '',
        dataCreate: '0',
        loadFlag: true,
        shapeType: '', // this.dirList['1011'][0].key
        unitName: '',
        legendId: '',
        fillColor: '',
        threeDimenModelId: '',
        layerFlag: true,
        showStyle2d: {
          fill: '',
          image: '',
          stroke: { lineDash: [], color: '', width: 0 },
          model: ''
        },
        showStyle3d: {
          fill: '',
          image: '',
          stroke: { lineDash: [], color: '', width: 0 },
          model: ''
        },
        showWay3d: '0',
        wsFlag: false,
        wsEvent: '',
        displayWay: ''
      },
      serverItems: null,
      legendType: '0' // '0' 点 '1' 线 '2' 面
    }
  },
  watch: {
    selectedTree(o) {
      if (o.hasOwnProperty('code')) {
        this.highlight = true
        this.$refs['tree'].setCurrentKey(o.code)
        this.getList()
      }
    },
    dialogFormVisible(val) {
      if (!val) {
        this.resetForm()
      }
    }
  },
  created() {
    this.getTree()
    this.getList()
    dictBatch([1012, 1011, 1009, 1010, 2005]).then((res) => {
      this.dirList = res.data
    })

    server().then((res) => {
      this.serverList = this.formatterServer(res.data)
    })
  },
  methods: {
    changeCellHandle(cell) {
      if (cell.check) {
        // 设置其他选中的checkbox不选中
        this.serverList.forEach((item) => {
          item.children = this.deleteArrayEmpty(item.children) // 去掉数组中的""项，防止在下方for循环时报错
          item.children.forEach((o) => {
            o.check = false
          })
        })
        // 设置当前选中内容
        cell.check = true
      }
    },
    initServerList() {
      const that = this
      // 清空所有已选内容
      this.serverList.forEach((item) => {
        item.children = this.deleteArrayEmpty(item.children) // 去掉数组中的""项，防止在下方for循环时报错
        item.children.forEach((o) => {
          // 没有服务项的选项设置默认服务项
          if (!o.paraSet.hasOwnProperty('dataFrom')) {
            o.paraSet.dataFrom = '0-无'
          }
          // 清空之前的选中效果
          o.paraSet.selected = ''
          const serviceParam = JSON.parse(that.operateRow.serviceParam)
          // 判断是否有选中项，如果有则选中，没有则不选中
          if (that.operateRow.serviceCode === o.serviceCode) {
            o.check = true
            // 从字典中取得服务项设置选中项
            if (o.paraSet.hasOwnProperty('paraCode')) {
              o.paraSet.selected = serviceParam[o.paraSet.paraCode]
            }
          } else {
            o.check = false
          }
        })
      })
    },
    formatterServer(items) {
      const res = []
      const cacheData = items.filter((it) => it.serviceParam !== '')
      items = cacheData
      // 查询及填充字典
      items.forEach((item) => {
        item.serviceParam = JSON.parse(item.serviceParam)
        if (!item.serviceParam.paraSet.hasOwnProperty('dataFrom')) {
          item.serviceParam.paraSet.dataFrom = '0-无'
        } else if (item.serviceParam.paraSet.dataFrom === '1-字典') {
          dictCode(item.serviceParam.paraSet.paraDaraFrom).then((res) => {
            item.serviceParam.paraSet.dict = res.data
          })
        }
      })
      // 格式化数据
      items.forEach((item) => {
        const o = this.$_.find(res, {
          serviceType: item.serviceType
        })
        if (o === undefined) {
          res.push({
            serviceType: item.serviceType,
            serviceTypeName: item.serviceTypeName,
            children: [item.serviceParam]
          })
        } else {
          o.children.push(item.serviceParam)
        }
      })
      return res
    },
    getTree() {
      tree().then((response) => {
        this.treeData = response.data
      })
    },
    validTreeCode(rule, value, callback) {
      checkCode(value, this.treeForm.id).then((response) => {
        if (response.data) {
          callback(new Error('图层组编码重复'))
        } else {
          callback()
        }
      })
    },
    validFormCode(rule, value, callback) {
      checkCode(value, this.form.id).then((response) => {
        if (response.data) {
          callback(new Error('图层编码重复'))
        } else {
          callback()
        }
      })
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList()
    },
    handleLyrCreate() {
      Promise.all([genCode(this.selectedTree.code), genTCSort()]).then(
        (item) => {
          this.treeDialogFormVisible = true
          this.treeDialogStatus = 'create'
          this.resetTreeForm()
          this.treeForm.code = item[0].data
          this.treeForm.sort = item[1].data
          this.treeForm.pcode = this.selectedTree.code
          this.$nextTick(() => {
            this.$refs['treeDataForm'].clearValidate()
          })
        }
      )
    },
    createTreeData() {
      this.$refs.treeDataForm.validate().then(() => {
        createTree(this.treeForm).then(() => {
          this.getTree()
          this.resetSelected()
          this.treeDialogFormVisible = false
          this.$message.success('添加图层组成功')
        })
      })
    },
    handleLyrEdit() {
      if (this.selectedTree.code === '') {
        this.$message.error('请选择需要更新的数据!')
        return
      }
      findItemTree(this.selectedTree.code).then((res) => {
        this.treeForm = res.data
        this.treeDialogFormVisible = true
        this.treeDialogStatus = 'update'
        this.$nextTick(() => {
          this.$refs['treeDataForm'].clearValidate()
        })
      })
    },
    updateTreeData() {
      this.$refs.treeDataForm.validate().then(() => {
        updateItem(this.treeForm).then(() => {
          this.getTree()
          this.resetSelected()
          this.treeDialogFormVisible = false
          this.$message.success('添加图层组成功')
        })
      })
    },
    handleLyrDelete() {
      if (this.selectedTree.code === '') {
        this.$message.error('请选择需要删除的数据!')
        return
      }
      this.$confirm('确认删除？').then(() => {
        delTree(this.selectedTree.code).then(() => {
          this.getTree()
          this.resetSelected()
          this.$message.success('删除成功')
        })
      })
    },
    /* selectedIcon(item) {
      this.form.legendId = item.id
      this.form.legendPath = item.path
      document.body.click()
    },*/
    getTreeCode(val) {
      genCode(val).then((item) => {
        this.treeForm.code = item.data
      })
    },
    getList() {
      this.listLoading = true
      this.listQuery.params.pcode = this.selectedTree.code
      page(this.listQuery)
        .then((response) => {
          response.data.content.forEach((item) => {
            if (item.showStyle2d) {
              item.showStyle2d = JSON.parse(item.showStyle2d)
              item.showStyle3d = JSON.parse(item.showStyle3d)
              if (this.listQuery.params.pcode === '03') {
                item.showStyleList = []
                for (const a in item.showStyle2d) {
                  item.showStyleList.push(item.showStyle2d[a])
                }
              }
            }
          })
          this.list = response.data.content
          this.total = response.data.totalElements
          this.listLoading = false
        })
        .catch((res) => {
          this.listLoading = true
          this.$message.error(res.message)
        })
    },
    getNodeData(data, node) {
      if (node.level === 1) {
        this.selectedTree = {
          code: data.id,
          pcode: ''
        }
      } else {
        this.selectedTree = {
          code: data.id,
          pcode: node.parent.data.id
        }
      }
    },
    handlePcodeChange(val) {
      this.resetWsFlag()
      const node = this.$refs.belongCascad.getCheckedNodes(val)
      this.form.pname = node[0].data.label
      genCode(val).then((item) => {
        this.form.code = item.data
        this.form.wsEvent = 'subject' + this.form.code
      })
      genLyrSort(val).then((res) => {
        this.form.sort = res.data
      })
    },
    handleShapeTypeChange(val) {
      this.legendType = val
      switch (val) {
        case '0':
          this.form.unitName = ''
          break
        case '1':
          this.form.unitName = '米'
          break
        case '2':
          this.form.unitName = '平方米'
          break
      }
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.getList()
    },
    resetForm() {
      this.form = {
        pcode: '',
        pname: '',
        code: '',
        name: '',
        sort: '',
        dataCreate: '0',
        loadFlag: true,
        shapeType: this.dirList['1011'][0].key,
        unitName: '',
        legendId: '',
        fillColor: '',
        threeDimenModelId: '',
        layerFlag: true,
        showStyle2d: {
          fill: '',
          image: '',
          stroke: { lineDash: [], color: '', width: 0 },
          model: ''
        },
        showStyle3d: {
          fill: '',
          image: '',
          stroke: { lineDash: [], color: '', width: 0 },
          model: ''
        },
        showWay3d: '0',
        wsFlag: false,
        wsEvent: '',
        displayWay: ''
      }
      this.legendType = '0'
      this.resetIcon()
    },
    resetWsFlag() {
      this.form.wsFlag = false
    },
    resetTreeForm() {
      this.treeForm = {
        pcode: '',
        code: '',
        name: '',
        enable: true,
        layerFlag: false
      }
    },
    resetSelected() {
      this.selectedTree = {
        code: '',
        pcode: ''
      }
    },
    handleCreate() {
      if (this.selectedTree.code === '') {
        genLyrCode(this.selectedTree.code).then((item) => {
          this.dialogFormVisible = true
          this.dialogStatus = 'create'
          this.resetForm()
          this.form.pcode = this.selectedTree.code
          this.form.code = item.data
          this.form.wsEvent = 'subject' + this.form.code
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
        })
      } else {
        Promise.all([
          genLyrCode(this.selectedTree.code),
          genLyrSort(this.selectedTree.code)
        ]).then((res) => {
          this.dialogFormVisible = true
          this.dialogStatus = 'create'
          this.resetForm()
          this.form.pcode = this.selectedTree.code
          this.form.pname = this.$refs.tree.getNode(
            this.selectedTree.code
          ).data.label
          this.form.code = res[0].data
          this.form.wsEvent = 'subject' + this.form.code
          this.form.sort = res[1].data
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
        })
      }
    },
    // 添加图层
    createData() {
      this.$refs.dataForm.validate().then(() => {
        // 添加服务字段
        this.createStaticServer()
        create(this.form).then(() => {
          this.getList()
          this.dialogFormVisible = false
          this.$message.success('添加图层成功')
        })
      })
    },
    // 添加图层时判断是否静态标注，静态标注默认添加服务，其他的不管
    createStaticServer() {
      // 静态标注图层组的编号固化为‘01’
      if (this.selectedTree.code === '01') {
        this.form.serviceParam = { layerCode: this.form.code }
        this.form.serviceCode = '0001'
      } else {
        this.form.serviceParam = {}
        this.form.serviceCode = ''
      }
    },
    handleUpdate(row) {
      this.form = row
      this.dialogFormVisible = true
      this.dialogStatus = 'update'
      this.legendType = this.form.shapeType
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
        this.showSelect(row)
      })
    },
    updateData() {
      this.$refs.dataForm.validate().then(() => {
        console.log(this.form)
        update(this.form)
          .then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$message.success({
              title: '成功',
              message: '更新成功'
            })
          })
          .catch((res) => {
            this.$message.error({
              title: '失败',
              message: res.message
            })
          })
      })
    },
    showSelect(info) {
      // 为了老数据不报错。暂时用判断
      if (!info.showStyle2d) {
        return
      }
      // 判断展示预警图标组
      if (info.pcode === '03') {
        let warnHtml = ''
        info.showStyleList.forEach((item, index) => {
          warnHtml += `<img style='width: 30px;height: 30px;margin-top: 5px;margin-left: 10px;' src='${item.image}'>`
        })
        this.$refs.warnIcon.innerHTML = warnHtml
      } else {
        // 根据‘点’，‘线’，‘面’ 分别展示相关图形
        if (info.shapeType === '0') {
          this.$refs.legendIcon.innerHTML = `<img style='width: 30px;height: 30px;margin-top: 5px;margin-left: 10px;' src='${info.showStyle2d.image}'>`
        } else if (info.shapeType === '1') {
          this.$refs.legendIcon.innerHTML = `<div style='width:90%;height: 10px;margin-top: 10px;margin-left: 5%;border-bottom: ${info.showStyle2d.stroke.width}px ${info.showStyle2d.stroke.lineDash} ${info.showStyle2d.stroke.color};'/>`
        } else if (info.shapeType === '2') {
          this.$refs.legendIcon.innerHTML = `<div style='width: 30px;height: 30px;margin-top: 5px;margin-left: 10px;border: ${info.showStyle2d.stroke.width}px ${info.showStyle2d.stroke.lineDash} ${info.showStyle2d.stroke.color};background-color: ${info.showStyle2d.fill};'/>`
        }
        // 判断是否展示
        if (info.showStyle3d.model !== '') {
          this.$refs.modoIcon.innerHTML = `<img style='width: 30px;height: 30px;margin-top: 5px;margin-left: 10px;' src='${info.showStyle3d.image}'>`
        }
      }
    },
    createServer() {
      const res = {}
      // 获取选中服务项
      let checkItem = null
      this.serverList.forEach((cell) => {
        const o = this.$_.find(cell.children, {
          check: true
        })
        if (o) {
          checkItem = o
          return
        }
      })
      if (checkItem.paraSet.dataFrom === '1-字典') {
        res[checkItem.paraSet.paraCode] = checkItem.paraSet.selected
      }
      this.operateRow.serviceParam = res
      this.operateRow.serviceCode = checkItem.serviceCode
      this.operateRow.dataCreate = '1'
      update(this.operateRow).then((res) => {
        this.dialogServerVisible = false
        this.$message.success('服务添加成功!')
      })
      this.$nextTick(() => {
        this.getList()
      })
    },
    handleServer(row) {
      this.operateRow = row
      this.dialogServerVisible = true
      // 重置上次选择数据
      this.initServerList()
      this.$nextTick(() => {
        this.$refs.serverForm.clearValidate()
      })
    },
    handleView(row) {
      this.form = {
        ...row
      }
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleDelete(row) {
      this.$confirm('确认删除 “' + row.name + '” 的记录？').then(() => {
        del(row.id).then(() => {
          this.getList()
          this.$message.success({
            title: '成功',
            message: '删除成功'
          })
        })
      })
    },
    // 去掉数组中的""
    deleteArrayEmpty(arr) {
      const newArray = arr.filter((item) => item !== '')
      return newArray
    },
    // 固化的四个服务分类，type==='1'时时静态服务，不显示
    getServiceName(type) {
      let name = ''
      if (type === '2') {
        name = '动态监控服务'
      } else if (type === '3') {
        name = '预警监控服务'
      } else if (type === '4') {
        name = '运营管控服务'
      }
      return name
    },
    selectCell(row) {
      this.$forceUpdate()
    },
    // 二维图标选择
    iconSelect(info) {
      if (this.legendType === '0') {
        // 点
        this.form.showStyle2d = {
          fill: '',
          image: info.legendDisplay.image,
          stroke: { lineDash: [], color: '', width: 0 },
          model: ''
        }
        this.$refs.legendIcon.innerHTML = `<img style='width: 30px;height: 30px;margin-top: 5px;margin-left: 10px;' src='${info.legendDisplay.image}'>`
        document.body.click()
      } else if (this.legendType === '1') {
        // 线
        this.form.showStyle2d = {
          fill: '',
          image: '',
          stroke: {
            lineDash: info.lineDash,
            color: info.color,
            width: info.width
          },
          model: ''
        }
        this.$refs.legendIcon.innerHTML = `<div style='width:90%;height: 10px;margin-top: 10px;margin-left: 5%;border-bottom: ${info.width}px ${info.lineDash} ${info.color};'/>`
        document.body.click()
      } else if (this.legendType === '2') {
        // 面
        this.form.showStyle2d = {
          fill: info.fill,
          image: '',
          stroke: {
            lineDash: info.lineDash,
            color: info.color,
            width: info.width
          },
          model: ''
        }
        this.$refs.legendIcon.innerHTML = `<div style='width: 30px;height: 30px;margin-top: 5px;margin-left: 10px;border: ${info.width}px ${info.lineDash} ${info.color};background-color: ${info.fill};'/>`
        document.body.click()
      }
    },
    // 模型选择
    modoSelect(info) {
      this.form.showStyle3d = {
        fill: '',
        image: info.legendDisplay.image,
        stroke: { lineDash: [], color: '', width: 0 },
        model: info.legendDisplay.model
      }
      this.$refs.modoIcon.innerHTML = `<img style='width: 30px;height: 30px;margin-top: 5px;margin-left: 10px;' src='${info.legendDisplay.image}'>`
      document.body.click()
    },
    // 预警模型
    warnSelect(info) {
      this.form.showStyle2d = info.legendDisplay
      let warnHtml = ''
      info.legendList.forEach((item, index) => {
        warnHtml += `<img style='width: 30px;height: 30px;margin-top: 5px;margin-left: 10px;' src='${item.image}'>`
      })
      this.$refs.warnIcon.innerHTML = warnHtml
      document.body.click()
    },
    // 充值选中图标
    resetIcon() {
      if (this.$refs.legendIcon) {
        this.$refs.legendIcon.innerHTML = ''
      }
      if (this.$refs.modoIcon) {
        this.$refs.modoIcon.innerHTML = ''
      }
      if (this.$refs.warnIcon) {
        this.$refs.warnIcon.innerHTML = ''
      }
    },
    clearIcon(val) {
      this.$refs[val].innerHTML = ''
      if (val === 'legendIcon' || val === 'warnIcon') {
        this.form.showStyle2d = {
          fill: '',
          image: '',
          stroke: { lineDash: [], color: '', width: 0 },
          model: ''
        }
      } else if (val === 'modoIcon') {
        this.form.showStyle3d = {
          fill: '',
          image: '',
          stroke: { lineDash: [], color: '', width: 0 },
          model: ''
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.icon-bg {
  display: block;
  height: 40px;
}

.photo-icon-small {
  width: 23px;
  height: 23px;
}

.clear::after {
  content: ".";
  display: block;
  clear: both;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}

.clear {
  margin: 10px 0;
}
.terminal::after {
  content: ".";
  display: block;
  clear: both;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}

.terminal {
  float: right;
  right: 100px;
}

.menu-title {
  display: flex;
  justify-content: space-between;

  .menu-title-icon {
    .iconfont {
      font-size: 18px;
    }
  }

  .iconfont {
    // color: #1890ff;

    &:hover {
      cursor: pointer;
    }

    // &.warn:hover {
    //   color: #ff4949;
    // }
  }
}

.form-icon {
  width: 36px;
  height: 36px;
  cursor: pointer;
}

/deep/ .el-dialog__header {
  border-bottom: 1px solid #e3e4ec;
  padding-bottom: 15px;
}

/deep/ .el-dialog__body {
  background: #f6f8fa;
  padding: 20px 20px;
  border-bottom: 1px solid #e3e4ec;
}

/deep/ .el-dialog__footer {
  padding: 12px;
}

/deep/ .el-form {
  background: #fff;
  padding: 20px 20px;
  border: 1px solid #e3e4ec;
}

/deep/ .el-form-item--medium:last-child {
  /*border: 1px solid #E3E4EC;*/
  margin-bottom: 0;
}

/deep/ .el-input--medium .el-input__inner {
  border: 0;
  border: 1px solid #e3e4ec;
  border-radius: 0;
}

/deep/ .t-row-operate {
  border: 1px solid #e3e4ec;
  padding-left: 15px;
}

/*图层新增样式修改*/

.erwei /deep/ > .el-form-item__label {
  margin-top: 20px;
}

/deep/ .el-form .el-row .el-col-12,
/deep/ .el-col-24 {
  padding: 0 !important;
}

/deep/ .el-row:not(:last-child) {
  margin-bottom: 22px;
}

/deep/ .el-row {
  margin-right: 0 !important;
  margin-left: 0 !important;
}

/deep/ .el-col-12 .image-slot {
  width: 30px;
  height: 30px;
  margin-top: 3px;
}

/deep/ .el-row .el-col-12:first-child .el-form-item {
  border-right: 0;
}

.type-d {
  float: left;
}

/*填充颜色样式*/
.icon-bg {
  display: block;
  height: 18px;
  width: 46px;
  margin: 0 auto;
}

.t-col-operate .iconfont {
  margin-left: 0;
}

.service-title {
  width: 100%;
  background-color: #eef1f8;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  color: #606266;
  text-indent: 1em;
}

.service-content {
  margin-top: 8px;
  padding: 0px 5%;
}

.service-content-item {
  width: 100%;
  height: 40px;
  line-height: 32px;
}

/*填充颜色样式*/
.legend-select {
  width: 100%;
  height: 40px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  &:hover {
    border: 1px solid #c0c4cc;
  }
}

.icon-from {
  .clear-icon {
    display: none;
    float: right;
    font-size: 14px;
    margin-right: 10px;
    line-height: 36px;
    cursor: pointer;
    margin-top: -38px;
  }
  &:hover {
    .clear-icon {
      display: block;
    }
  }
}
</style>
<style lang="scss">
.image-slot {
  width: 36px;
  height: 36px;
  border: 1px solid #dcdfe6;
  text-align: center;
  border-radius: 4px;
}
/*.el-form{*/
/*  display: flex;*/
/*  flex-direction: column ;*/
/*}*/
.el-form::after {
  content: ".";
  display: block;
  clear: both;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}
</style>
