<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>车辆分级权限</span>
      </div>
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="分组名称：" class="filter-item">
            <el-input
              type="text"
              class="filter-item"
              placeholder="请输入分组名称"
              v-model="listQuery.params.groupName"
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
              icon="mr10 iconfont iconxinzengh"
              @click="handleCreate(1)"
            >新增分组</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table v-loading="listLoading" stripe :data="list" class="t-bd" fit highlight-current-row>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column property="groupName" label="分组名称"></el-table-column>
        <el-table-column property="groupType" label="车辆分组标识"></el-table-column>
        <el-table-column property="groupDescription" label="分组描述"></el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <div class="t-col-operate">
              <i class="el-icon-user primary table-i" @click="addcars(scope.row.id)" title="车辆" />
              <i class="el-icon-s-tools info table-i" @click="quanxian(scope.row.id)" title="权限" />
              <i class="el-icon-tickets primary table-i" @click="details(scope.row.id)" title="详情" />
              <i
                class="el-icon-edit-outline warning table-i"
                @click="handleCreate(2,scope.row.id)"
                title="编辑"
              />
              <i class="el-icon-delete danger table-i" @click="delitem(scope.row.id)" title="删除" />
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
      class="small_dialog"
      :title="poptit"
      :visible.sync="dialog1"
      :close-on-click-modal="false"
      width="600px"
      @close="clearruleForm"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="分组名称：" prop="groupName">
                  <el-input v-model="ruleForm.groupName" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="分组标识：" prop="groupType">
                  <el-select v-model="ruleForm.groupType" class="form-item1" placeholder="请选择分组标识">
                    <el-option label="首长专用" value="首长专用" />
                    <el-option label="指挥车" value="指挥车" />
                    <el-option label="公务派车" value="公务派车" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="分组描述：">
                  <el-input
                    v-model="ruleForm.groupDescription"
                    class="form-item1"
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 4}"
                    placeholder="请输入内容"
                    maxlength="500"
                    show-word-limit
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog1 = false">取 消</el-button>
        <el-button type="primary" @click="subgroup">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      class="abow_dialog detail-form"
      title="车辆分组权限详情"
      :visible.sync="dialog2"
      :close-on-click-modal="false"
      width="800px"
    >
      <div class="dialog-content">
        <div class="dialog-item-title">基本信息</div>
        <div class="dialog-item">
          <el-form ref="ruleForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="分组名称：">{{ruleForm.groupName}}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="分组标识：">{{ruleForm.groupType}}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="24">
                <el-form-item label="分组描述：">{{ruleForm.groupDescription}}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog-item-title">权限信息</div>
        <div class="dialog-table">
          <el-table
            v-loading="listLoading"
            stripe
            :data="carspowerlist"
            class="t-bd"
            fit
            highlight-current-row
          >
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column label="时段权限">
              <template slot-scope="scope">
                <template v-if="scope.row.visitTimeStatus=='1'">不限</template>
                <template v-else>{{scope.row.startTime}}-{{scope.row.endTime}}</template>
              </template>
            </el-table-column>
            <el-table-column label="区域权限">
              <template slot-scope="scope">
                <template v-if="scope.row.visitAreaStatus=='1'">不限</template>
                <template v-else-if="scope.row.visitAreaStatus=='2'">许可</template>
                <template v-else-if="scope.row.visitAreaStatus=='3'">除外</template>
              </template>
            </el-table-column>
            <el-table-column property="areaName" label="区域权限"></el-table-column>
            <el-table-column label="操作" width="50">
              <template slot-scope="scope">
                <div class="t-col-operate">
                  <i
                    class="el-icon-delete danger table-i"
                    @click="delcarspower(scope.row.groupId,scope.row.id)"
                    title="删除"
                  />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      class="abow_dialog detail-form"
      title="车辆分组授权"
      :visible.sync="dialog3"
      :close-on-click-modal="false"
      width="800px"
    >
      <div class="dialog-content">
        <div class="dialog-table">
          <div class="dialog-table-btn">
            <el-button
              class="filter-item btn-base filter-add-btn"
              icon="mr10 iconfont iconxinzengh"
              @click="addregion"
            >新增分组</el-button>
          </div>
          <el-table
            v-loading="listLoading"
            stripe
            :data="carspowerlist"
            class="t-bd"
            fit
            highlight-current-row
          >
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column label="时段">
              <template slot-scope="scope">
                <template v-if="scope.row.visitTimeStatus=='1'">不限</template>
                <template v-else>{{scope.row.startTime}}-{{scope.row.endTime}}</template>
              </template>
            </el-table-column>
            <el-table-column label="区域权限">
              <template slot-scope="scope">
                <template v-if="scope.row.visitAreaStatus=='1'">不限</template>
                <template v-else-if="scope.row.visitAreaStatus=='2'">许可</template>
                <template v-else-if="scope.row.visitAreaStatus=='3'">除外</template>
              </template>
            </el-table-column>
            <el-table-column property="areaName" label="区域"></el-table-column>
            <el-table-column label="操作" width="50">
              <template slot-scope="scope">
                <div class="t-col-operate">
                  <i
                    class="el-icon-delete danger table-i"
                    @click="delcarspower(scope.row.groupId,scope.row.id)"
                    title="删除"
                  />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      class="small_dialog"
      title="添加访问权限"
      :visible.sync="dialog4"
      :close-on-click-modal="false"
      width="600px"
      @close="clearcarspowerdata"
    >
      <div class="dialog-item">
        <el-form ref="ruleForm" label-width="100px">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="访问时段：">
                <el-radio v-model="carspowerdata.visitTimeStatus" label="1">不限</el-radio>
                <el-radio v-model="carspowerdata.visitTimeStatus" label="2">许可</el-radio>
              </el-form-item>
              <el-form-item label v-if="carspowerdata.visitTimeStatus=='2'">
                <el-time-picker
                  is-range
                  v-model="value1"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  placeholder="选择时间范围"
                  value-format="HH:mm:ss"
                ></el-time-picker>
              </el-form-item>
              <el-form-item label="访问区域：">
                <el-radio v-model="carspowerdata.visitAreaStatus" label="1">不限</el-radio>
                <el-radio v-model="carspowerdata.visitAreaStatus" label="2">许可</el-radio>
                <el-radio v-model="carspowerdata.visitAreaStatus" label="3">除外</el-radio>
              </el-form-item>
              <el-form-item label v-if="carspowerdata.visitAreaStatus!='1'">
                <el-cascader :options="quyudata" :props="props" ref="tree" clearable></el-cascader>
                <!-- <el-tree
                  :data="quyudata"
                  node-key="id"
                  default-expand-all
                  :expand-on-click-node="false"
                  :render-content="renderContent"
                  ref="tree"
                />-->
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog4 = false">取 消</el-button>
        <el-button type="primary" @click="subpower">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      class="abow_dialog detail-form"
      title="车辆信息"
      :visible.sync="dialog5"
      :close-on-click-modal="false"
      width="1200px"
    >
      <div class="dialog-item">
        <div class="filter-container">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="车牌号：" class="filter-item">
              <el-input
                type="text"
                class="filter-item"
                v-model="carsGroupQuery.params.carNo"
                placeholder="请输入车牌号"
              />
            </el-form-item>
            <el-form-item label="单位部门：" class="filter-item">
              <el-cascader
                ref="area"
                v-model="carsGroupQuery.params.unitId"
                :options="orgDeptTreeData"
                :props="{ checkStrictly: true, expandTrigger: 'hover',label: 'organizationName', value: 'id'}"
                clearable
              >
                <template slot-scope="{ node, data }">
                  <span @click="cascaderRadioClick(data.id,data.label)">{{ data.label }}</span>
                </template>
              </el-cascader>
            </el-form-item>
            <el-form-item label="车辆用途：" class="filter-item">
              <el-select
                class="form-item"
                placeholder="请选择车辆用途"
                v-model="carsGroupQuery.params.carUseId"
              >
                <el-option
                  v-for="item in useList"
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
                @click="getcarsgrouppage"
              >{{ $t('table.search') }}</el-button>
              <el-button class="filter-item btn-base filter-add-btn" @click="handleCarShow">添加</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table stripe :data="carsGrouplist" class="t-bd" fit highlight-current-row>
          <el-table-column type="index" label="序号" width="50"></el-table-column>
          <el-table-column property="carNo" label="车牌号"></el-table-column>
          <el-table-column property="carType" label="车辆类型"></el-table-column>
          <el-table-column property="carUse" label="车辆用途"></el-table-column>
          <el-table-column property="brandModel" label="品牌型号"></el-table-column>
          <el-table-column property="carKey" label="车辆识别号"></el-table-column>
          <el-table-column property="unitName" label="单位部门"></el-table-column>
          <el-table-column label="操作" width="50">
            <template slot-scope="scope">
              <div class="t-col-operate">
                <i class="el-icon-delete danger table-i" @click="delcar(scope.row.id)" title="删除" />
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination
            background
            :current-page="carsGroupQuery.pageNo"
            :page-sizes="[10,20,30, 50]"
            :page-size="carsGroupQuery.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="carstotal"
            @size-change="handleSizeChange2"
            @current-change="handleCurrentChange2"
          />
        </div>
      </div>
    </el-dialog>
    <!--车辆选择框-->
    <carPopUp ref="carSelect" @refresh="getcarsgrouppage" />
  </div>
</template>
<script>
import {
  carspage,
  carssave,
  carsput,
  carsget,
  carsdel,
  carsgrouppage,
  carspower,
  addcarspower,
  carspowerdel,
  delcar
} from "@/api/base/authorize"
import { registertree } from '@/api/base/region'
import { delchildren } from '@/utils/index'
import { dictBatch } from '@/api/base/dictDetail'
import carPopUp from './carPopup'
import { getAllOrg } from '@/api/base/organ'
import { brotliDecompressSync } from 'zlib'
export default {
  components: { carPopUp },
  data () {
    return {
      // value1: ['2020:09:03 08:00:00','2020:09:03 20:00:00'],
      value1: ['08:00:00', '20:00:00'],
      quyudata: [],
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {},
      },
      carsGroupQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          groupId: ''
        },
      },
      carspowerdata: {
        areaId: "",
        areaName: "",
        endTime: "",
        groupId: "",
        startTime: "",
        visitAreaStatus: "1",
        visitTimeStatus: "1"
      },
      list: [],
      useList: [],
      orgDeptTreeData: null,
      carsGrouplist: [],
      carspowerlist: [],
      ruleForm: {
        groupName: '',
        groupType: '',
        groupDescription: ''
      },
      rules: {
        groupName: [{
          required: true,
          message: '请填写分组名称',
          trigger: 'blur'
        }],
        groupType: [{
          required: true,
          message: '请选择分组标识',
          trigger: 'blur'
        }],
      },
      total: null, // 总数
      carstotal: null, 
      listLoading: false,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      dialog5: false,
      poptit: "新增车辆分组",
      props: {
        multiple: true,
        checkStrictly: true,
        label: 'areaName',
        value: 'id'
      }
    };
  },
  created () {
    this.getList();
    dictBatch(['3046']).then(res => {
      this.useList = res.data['3046']
    })
  },
  methods: {
    getTree2 () {
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
    },
    handleFilter () {
      this.listQuery.pageNo = 1;
      this.getList();
    },
    handleCreate (e, id) {
      this.dialog1 = true;
      if (e === 1) {
        this.poptit = '新增车辆分组'
      } else {
        this.poptit = '编辑车辆分组'
        this.getdetails(id)
      }
    },
    getList () {
      this.listLoading = true
      carspage(this.listQuery).then((response) => {
        this.list = response.data.content
        this.total = response.data.totalElements
        this.listLoading = false
      })
    },
    clearruleForm () {
      this.$refs['ruleForm'].clearValidate()
      this.ruleForm = {
        groupName: '',
        groupType: '',
        groupDescription: ''
      };
    },
    clearcarspowerdata () {
      this.value1 = ['08:00:00', '20:00:00']
      this.carspowerdata = {
        areaId: "",
        areaName: "",
        endTime: "",
        groupId: "",
        startTime: "",
        visitAreaStatus: "1",
        visitTimeStatus: "1"
      }
    },
    subgroup () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let isclick = true
          if (isclick) {
            isclick = false
            if ((this.poptit === '新增车辆分组')) {
              carssave(this.ruleForm).then((response) => {
                isclick = true
                this.dialog1 = false
                this.getList()
              })
            } else {
              carsput(this.ruleForm).then((response) => {
                isclick = true
                this.dialog1 = false
                this.getList()
              })
            }
          }
        }
      })
    },
    delcarspower (a, b) {
      this.$confirm('确认删除？').then(() => {
        carspowerdel(a, b).then(() => {
          this.getcarspower(a)
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
        })
      })
    },
    delitem (id) {
      this.$confirm('确认删除？').then(() => {
        carsdel(id).then(() => {
          this.getList()
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
        })
      })
    },
    delcar(a){
      this.$confirm('确认删除？').then(() => {
        let b = this.carsGroupQuery.params.groupId;
        delcar(a,b).then((response) => {
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
          this.getcarsgrouppage();
        })
      })
    },
    details (id) {
      this.dialog2 = true;
      this.getdetails(id)
      this.getcarspower(id)
    },
    getdetails (id) {
      carsget(id).then((response) => {
        this.ruleForm = response.data
      })
    },
    quanxian (id) {
      this.dialog3 = true;
      this.carspowerdata.groupId = id;
      this.getcarspower(id)
    },
    addregion () {
      this.getTree()
      this.dialog4 = true;
    },
    getcarspower (id) {
      // let data = {}
      // data.groupId = id
      carspower(id).then((response) => {
        this.carspowerlist = response.data
      })
    },
    addcars (id) {
      console.log(id)
      this.carsGroupQuery.params.groupId = id;
      this.dialog5 = true;
      this.getTree2()
      this.getcarsgrouppage();
    },
    getcarsgrouppage () {
      carsgrouppage(this.carsGroupQuery).then((response) => {
        this.carsGrouplist = response.data.content
        this.carstotal = response.data.totalElements
      })
    },
    getTree () {
      registertree().then((response) => {
        this.quyudata = delchildren(response.data)
      })
    },
    subpower () {
      if (this.carspowerdata.visitTimeStatus == '2') {
        this.carspowerdata.startTime = this.value1[0]
        this.carspowerdata.endTime = this.value1[1]
      }
      if (this.carspowerdata.visitAreaStatus != '1') {
        let arr = this.$refs.tree.getCheckedNodes()
        if (arr.length > 0) {
          this.carspowerdata.areaId = arr.map((item) => {
            return item.value
          }).join(',')
          this.carspowerdata.areaName = arr.map((item) => {
            return item.label
          }).join(',')
        } else {
          this.$notify.warning({
            title: '警告',
            message: '请选择访问区域'
          })
        }
      }
      console.log(this.carspowerdata)
      addcarspower(this.carspowerdata).then((response) => {
        this.getcarspower(this.carspowerdata.groupId)
        this.$notify.success({
          title: '成功',
          message: '添加成功'
        })
        this.dialog4 = false
      })
    },
    handleSizeChange (val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.listQuery.pageNo = val
      this.getList()
    },
    handleCarShow () {
      this.$refs.carSelect.open(this.carsGroupQuery.params.groupId)
    },
    selectCar (val) {
      console.log(val)
    },
    cascaderRadioClick (val, name) {
      this.carsGroupQuery.params.unitId = val
    },
    handleSizeChange2 (val) {
      this.peoplesGroupQuery.pageSize = val
      this.getcarsgrouppage()
    },
    handleCurrentChange2 (val) {
      this.peoplesGroupQuery.pageNo = val
      this.getcarsgrouppage()
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
