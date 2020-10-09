<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>地图维护</span>
      </div>
      <!--搜索条件-->
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
          <el-form-item label="地区：" class="filter-item">
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
            <el-button
              class="filter-item btn-base filter-add-btn"
              style="margin-left: 10px;"
              type="primary"
              icon="mr10 iconfont iconxinzengh"
              @click="handleCreate"
            >{{ $t('table.add') }}</el-button>
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
            <span>{{ scope.row.createTime |formatToDay }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          fixed="right"
          class-name="small-padding fixed-width"
          width="240px"
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
    <!--新增/修改弹出层-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" left width="800px">
      <div class="dialogBox">
        <el-form
          ref="dataForm"
          :rules="rules"
          :model="form"
          label-position="right"
          label-width="100px"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="地图编号" prop="mapNo">
                <el-input v-model="form.mapNo" placeholder="请输入地图编号" :disabled="true" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="地图名称" prop="mapName">
                <el-input v-model="form.mapName" placeholder="请输入地图名称" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="地图区域" prop="regionCodes">
                <el-cascader
                  id="regionCode"
                  v-model="form.regionCodes"
                  clearable
                  :options="treeData"
                  :props="treeProps"
                  @change="formRegionCodeChange"
                  @visible-change="regionNameFill"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="地图类别" prop="mapType">
                <el-select
                  v-model="form.mapType"
                  clearable
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
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input v-model="form.remark" placeholder="请输入备注" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div v-if="dialogStatus!=='view'" slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          v-if="dialogStatus=='create'"
          type="primary"
          @click="createData"
        >{{ $t('table.confirm') }}</el-button>
        <el-button v-else type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <!--地图查看-->
    <div class="map-view">
      <el-dialog title="查看" :visible.sync="mapViewVisible" left width="65%">
        <tile-map ref="map" @releaseDel="handleMapReleaseDel" />
      </el-dialog>
    </div>
    <router-view />
  </div>
</template>

<script>
import {
  page,
  checkProNo,
  create,
  update,
  del,
  genCode,
  view
} from '@/api/base/maintain'
import { dictRegion, dictmapTypeList } from '@/api/base/dictDetail'
// import TileMap from '@/components/OLMap/service/TileMap'
import TileMap from '../components/TileMap'

export default {
  name: 'Maintain',
  components: {
    'tile-map': TileMap
  },
  data() {
    return {
      mapViewVisible: false,
      regionCodes: [],
      mapTypeList: [],
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
      form: {
        id: '',
        regionCodes: [],
        mapType: '',
        mapNo: '',
        mapName: '',
        cityCode: '',
        countyCode: '',
        provinceCode: '',
        remark: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        view: '查看',
        update: '编辑',
        create: '新增'
      },
      regionNameFields: {
        0: 'provinceName',
        1: 'cityName',
        2: 'countyName'
      },
      regionCodeFields: {
        0: 'provinceCode',
        1: 'cityCode',
        2: 'countyCode'
      },
      rules: {
        mapNo: [
          { required: true, message: '请填写地图编号', trigger: 'blur' },
          { validator: this.validCode, trigger: 'blur' }
        ],
        mapName: [
          { required: true, message: '请填写地图名称', trigger: 'blur' }
        ],
        mapType: [
          { required: true, message: '请选择地图类型', trigger: 'blur' }
        ],
        regionCodes: [
          { required: true, validator: this.validLength, trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    mapViewVisible(val) {
      if (!val) {
        this.$refs.map.tableVisible = false
      }
    }
  },
  created() {
    this.getList()
    this.getTreeRegionList()
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
      for (const a in this.regionNameFields) {
        this.form[this.regionNameFields[a]] = ''
      }
      for (const a in this.regionCodeFields) {
        this.form[this.regionCodeFields[a]] = ''
      }
      arr.forEach((item, index) => {
        this.form[this.regionCodeFields[index]] = item
      })
    },
    regionNameFill(flag) {
      if (flag) {
        return
      }
      document
        .getElementById('regionCode')
        .getElementsByTagName('input')[0]
        .value.split(' ')
        .filter((item) => {
          return item !== '/'
        })
        .forEach((item, index) => {
          this.form[this.regionNameFields[index]] = item
        })
    },
    validCode(rule, value, callback) {
      checkProNo({ code: value, id: this.form.id }).then((response) => {
        if (response.data) {
          callback(new Error('地图编号重复'))
        } else {
          callback()
        }
      })
    },
    validLength(rule, value, callback) {
      if (value.length === 0) {
        callback(new Error('请选择地图区域'))
      } else {
        callback()
      }
    },
    getTreeRegionList() {
      dictRegion().then((res) => {
        if (res.status === 200) {
          this.treeData = res.data
        }
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
    resetForm() {
      this.form = {
        id: '',
        regionCodes: [],
        mapType: '',
        mapNo: '',
        mapName: '',
        cityCode: '',
        countyCode: '',
        provinceCode: '',
        remark: ''
      }
    },
    async handleCreate() {
      this.resetForm()
      this.dialogStatus = 'create'
      const res = await genCode()
      this.form.mapNo = res.data
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          create(this.form).then(() => {
            this.dialogFormVisible = false
            this.$message.success('地图添加成功')
            this.getList()
          })
        }
      })
    },
    handleUpdate(row) {
      this.form = Object.assign({}, row) // copy obj
      this.form.regionCodes = [
        row.provinceCode,
        row.cityCode,
        row.countyCode
      ].filter((item) => {
        return item !== ''
      })
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          update(this.form).then(() => {
            this.dialogFormVisible = false
            this.getList()
            this.$message({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.$confirm('确认删除 “' + row.mapName + '” 的记录？').then(() => {
        del(row.id).then(() => {
          this.getList()
          this.$message.success({
            title: '成功',
            message: '删除成功'
          })
        })
      })
    },
    handleView(row) {
      const mapOpts = {}
      mapOpts.regionCode = [row.provinceCode, row.cityCode, row.countyCode]
        .filter((item) => {
          return item !== ''
        })
        .pop()
      mapOpts.baseLayerType = row.mapType
      view(row.id).then((res) => {
        if (res.data.length === 0) {
          this.$message.info('当前地图暂未发布数据！')
          return
        } else {
          this.mapViewVisible = true
          this.$nextTick(() => {
            this.$refs.map.disPlay({
              mapOpts: mapOpts,
              baseInfo: row,
              layerInfo: res.data
            })
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.list-query {
  width: 340px;
  margin-right: 22px;
}
</style>
