<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>访客预约</span>
      </div>
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="姓名：" class="filter-item">
            <el-input
              v-model="listQuery.params.name"
              type="text"
              class="filter-item"
              placeholder="请输入姓名"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="来访类型：" class="filter-item">
            <el-select
              v-model="listQuery.params.visitingType"
              clearable
              class="form-item"
              placeholder="请选择来访类型"
            >
              <el-option
                v-for="(item,key) in visitList"
                :key="key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="受访单位：" class="filter-item">
            <el-cascader
              ref="cascader"
              v-model="listQuery.params.respondentsPersonDept"
              :options="orgDeptTreeData"
              :props="treeProps"
              clearable
              placeholder="请选择受访单位"
            >
              <template slot-scope="{ node, data }">
                <span @click="cascaderRadioClick(data.id,data.label)">{{ data.label }}</span>
              </template>
            </el-cascader>
          </el-form-item>
          <el-form-item label="人员类型：" class="filter-item">
            <el-select
              v-model="listQuery.params.personType"
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
          <el-form-item label="是否审批：" class="filter-item">
            <el-select
              v-model="listQuery.params.approvalStatus"
              clearable
              class="form-item"
              placeholder="请选择是否审批"
            >
              <el-option label="是" value="1" />
              <el-option label="否" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="证件类型：" class="filter-item">
            <el-select
              v-model="listQuery.params.certificateType"
              clearable
              class="form-item"
              placeholder="请选择证件类型"
            >
              <el-option
                v-for="(item,key) in cardtypeList"
                :key="key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="证件号码：" class="filter-item">
            <el-input
              v-model="listQuery.params.certificateNumber"
              type="text"
              class="filter-item"
              placeholder="请输入证件号码"
              @keyup.enter.native="handleFilter"
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
            <el-button class="filter-item btn-base filter-add-btn" @click="handleCreate(1)">新增</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table v-loading="listLoading" stripe :data="list" class="t-bd" fit highlight-current-row>
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column property="majorName" label="姓名" />
        <el-table-column label="性别">
          <template slot-scope="scope">
            <span>{{ getSex(scope.row.majorSex) }}</span>
          </template>
        </el-table-column>
        <el-table-column property="majorPhoneNo" label="联系电话" />
        <el-table-column property="staffType" label="人员类型" />
        <el-table-column property="unitName" label="受访部门" />
        <el-table-column property="name" label="受访人员" />
        <el-table-column property="visitorType" label="来访类型" />
        <el-table-column property="approvalStatus" label="审批状态">
          <template slot-scope="scope">
            <template v-if="scope.row.approvalStatus=='0'">否</template>
            <template v-else-if="scope.row.approvalStatus=='1'">是</template>
          </template>
        </el-table-column>
        <el-table-column label="访客时间">
          <template slot-scope="scope">
            <span>{{ scope.row.predictVisitorTime.slice(0, 10) }}</span>
          </template>
        </el-table-column>
        <el-table-column property="othersPersonName" label="随访人员" />
        <el-table-column property="driverPhoneNo" label="随访车辆" />
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <div class="t-col-operate">
              <i
                class="el-icon-edit-outline warning table-i"
                @click="handleCreate(2,scope.row.id)"
                title="编辑"
              />
              <i class="el-icon-tickets primary table-i" title="详情" @click="details(scope.row.id)" />
              <i
                class="el-icon-s-opportunity danger table-i"
                @click="delitem(scope.row.id)"
                title="撤销"
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
      class="small_dialog"
      :title="poptit"
      :visible.sync="dialog"
      :close-on-click-modal="false"
      width="800px"
      @close="clearruleForm"
    >
      <div class="dialog-content">
        <div class="dialog-item-title">预约信息</div>
        <div class="dialog-item">
          <el-form ref="ruleForm" :model="form" :rules="rules" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="预计来访时间：" prop="predictVisitorTime">
                  <el-date-picker
                    v-model="form.predictVisitorTime"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期"
                    style="width:100%"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="受访人员：" prop="name">
                  <el-input v-model="form.name" placeholder="请选择人员">
                    <i slot="suffix" style="cursor: pointer;" @click="dialog3 = true" class="el-icon-plus"></i>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="来访类型：" prop="visitorTypeId">
                  <el-select
                    v-model="form.visitorTypeId"
                    clearable
                    @change="laifangleixing"
                    class="form-item"
                    placeholder="请选择来访类型"
                  >
                    <el-option
                      v-for="(item,key) in visitList"
                      :key="key"
                      :label="item.value"
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="来访事由：" prop="visitorReason">
                  <el-input v-model="form.visitorReason" placeholder="请输入事由" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="btnbox">
            <el-button type="primary" size="mini" @click="addp">增加人员</el-button>
            <el-button type="primary" size="mini" @click="addc">增加车辆</el-button>
          </div>
        </div>
        <div class="dialog-item-title">人员信息</div>
        <div class="dialog-item">
          <div v-for="(p,i) in peoples" :key="i" class="line">
            <el-form ref="peoplesForm" :model="p" :rules="peoplerulers" label-width="120px">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="姓名：" prop="name">
                    <el-input v-model="p.name" placeholder="请输入姓名" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="性别：">
                    <el-radio-group v-model="p.sex">
                      <el-radio
                        v-for="(item,i) in sexList"
                        :key="i"
                        :label="item.key"
                      >{{ item.value }}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="证件类型：" prop="certType">
                    <el-select
                      v-model="p.certType"
                      clearable
                      class="form-item"
                      placeholder="请选择证件类型"
                    >
                      <el-option
                        v-for="(item,key) in cardtypeList"
                        :key="key"
                        :label="item.value"
                        :value="item.key"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="证件号码：" prop="certTypeNo">
                    <el-input
                      v-model="p.certTypeNo"
                      type="text"
                      class="filter-item"
                      placeholder="请输入证件号码"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="人员类型：">
                    <el-select
                      v-model="p.staffTypeId"
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
                </el-col>
                <el-col :span="12">
                  <el-form-item label="电话号码：" prop="phoneNo">
                    <el-input
                      v-model="p.phoneNo"
                      type="text"
                      class="filter-item"
                      placeholder="请输入电话号码"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="btnbox" v-if="peoples.length>1">
              <el-button type="danger" size="mini" @click="delp(i)">删除人员</el-button>
            </div>
          </div>
        </div>
        <template v-if="cars.length>0">
          <div class="dialog-item-title">车辆信息</div>
          <div class="dialog-item">
            <div v-for="(c,i) in cars" :key="i" class="line">
              <el-form ref="carsForm" :model="c" :rules="rules" label-width="120px">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="车牌号：" prop="carNo">
                      <el-input v-model="c.carNo" placeholder="请输入车牌号" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="车辆类型：" prop="carTypeId">
                      <el-select
                        v-model="c.carTypeId"
                        clearable
                        class="form-item"
                        placeholder="请选择车辆类型"
                      >
                        <el-option
                          v-for="(item,key) in cartypeList"
                          :key="key"
                          :label="item.value"
                          :value="item.key"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="品牌型号：">
                      <el-input
                        v-model="c.brandModel"
                        type="text"
                        class="filter-item"
                        placeholder="请输入品牌型号"
                      />
                    </el-form-item>
                  </el-col>
                  <!-- <el-col :span="12">
                    <el-form-item label="车身颜色：">
                      <el-input
                        v-model="c.color"
                        type="text"
                        class="filter-item"
                        placeholder="请输入车身颜色"
                      />
                    </el-form-item>
                  </el-col>-->
                </el-row>
              </el-form>
              <div class="btnbox">
                <el-button type="danger" size="mini" @click="delc(i)">删除车辆</el-button>
              </div>
            </div>
          </div>
        </template>
        <div class="dialog-item-title">审批信息</div>
        <div class="dialog-item">
          <el-form ref="otherForm" :model="form" :rules="rules" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label>
                  <el-radio-group v-model="form.approvalFlag">
                    <el-radio :label="true">审批</el-radio>
                    <el-radio :label="false">不审批</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="审核人员：" prop="approvalPerson">
                  <el-select
                    v-model="form.approvalPerson"
                    clearable
                    class="form-item"
                    placeholder="请选择审核人员"
                  >
                    <el-option
                      v-for="(item,key) in allpeoples"
                      :key="key"
                      :label="item.name+'（'+item.unitName+'）'"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取消</el-button>
        <el-button type="primary" @click="submitmsg">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      class="abow_dialog"
      title="详情"
      :visible.sync="dialog2"
      :close-on-click-modal="false"
      width="800px"
      @close="cleardetail"
    >
      <div class="dialog-content">
        <div class="dialog-item-title">预约信息</div>
        <div class="dialog-item">
          <el-form :model="form" label-position="right" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="预计来访时间：">{{form.predictVisitorTime.slice(0, 10)}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="受访人员：">{{form.name}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="来访类型：">{{form.visitorType}}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="来访事由：">{{form.visitorReason}}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog-item-title">人员信息</div>
        <div class="dialog-item">
          <div v-for="(p,i) in peoples" :key="i" class="line">
            <el-form label-width="120px">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="姓名：">{{p.name}}</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="性别：">{{getSex(p.sex)}}</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="证件类型：">{{p.certTypeName}}</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="证件号码：">{{p.certTypeNo}}</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="人员类型：">{{p.staffType}}</el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="电话号码：">{{p.phoneNo}}</el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
        <template v-if="cars.length>0">
          <div class="dialog-item-title">车辆信息</div>
          <div class="dialog-item">
            <div v-for="(c,i) in cars" :key="i" class="line">
              <el-form label-width="120px">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="车牌号：">{{c.carNo}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="车辆类型：">{{c.carType}}</el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="品牌型号：">{{c.brandModel}}</el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </template>
        <div class="dialog-item-title">审批信息</div>
        <div class="dialog-item">
          <el-form label-width="120px">
            <el-row :gutter="20">
              <el-col :span="12" v-if="form.approvalFlag">
                <el-form-item label="审批人：">{{form.approvalPerson}}</el-form-item>
              </el-col>
              <el-col :span="12" v-else>
                <el-form-item label="不需要审批"></el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <allPeoples v-if="dialog3" :msg="2"  @peopleSelect="getPeoplesArr"/>
  </div>
</template>
<script>
import EmpAPI from '@/api/base/employee'
import { dictBatch } from '@/api/base/dictDetail'
import { getAllOrg } from '@/api/base/organ'
import { delchildren } from '@/utils/index'
import visitor from '@/api/door/visitor'
import allPeoples from '@/components/peoples/choicePeoples'
export default {
  components: {
    allPeoples
  },
  data () {
    let laifangshiyou = (rule, value, callback) => {
      if (value == '' && this.istrue) {
        callback(new Error('请填写来访事由'))
      } else {
        callback()
      }
    }
    let shenheren = (rule, value, callback) => {
      if (value == '' && this.form.approvalFlag) {
        callback(new Error('请选择审核人员'))
      } else {
        callback()
      }
    }
    return {
      value1: null,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          respondentsPersonDept: '',
        }
      },
      list: [],
      form: {
        predictVisitorTime: '',
        name: '',
        visitorTypeId: '',
        visitorReason: '',
        approvalPerson: '',
        approvalFlag: true
      },
      peoples: [],
      cars: [],
      total: null, // 总数
      listLoading: false,
      dialog: false,
      dialog2: false,
      dialog3: false,
      peoplestypeList: [],
      cardtypeList: [],
      visitList: [],
      sexList: [],
      cartypeList: [],
      // staffTypeId: [],
      orgDeptTreeData: null,
      treeProps: {
        expandTrigger: 'hover',
        value: 'id',
        label: 'label',
        children: 'children',
        emitPath: false,
        checkStrictly: true
      },
      poptit: "新增访客预约信息",
      rules: {
        predictVisitorTime: [{
          required: true,
          message: '请填写预计来访时间',
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: '请填写受访人员',
          trigger: 'blur'
        }],
        visitorTypeId: [{
          required: true,
          message: '请选择来访类型',
          trigger: 'change'
        }],

        carNo: [{
          required: true,
          message: '请填写车牌号',
          trigger: 'blur'
        }],
        carTypeId: [{
          required: true,
          message: '请选择车辆类型',
          trigger: 'change'
        }],
        approvalPerson: [{
          validator: shenheren,
          trigger: 'change'
        }],
        visitorReason: [{
          validator: laifangshiyou,
          trigger: 'blur'
        }],
      },
      peoplerulers: {
        name: [{
          required: true,
          message: '请填写姓名',
          trigger: 'blur'
        }],
        certType: [{
          required: true,
          message: '请选择证件类型',
          trigger: 'change'
        }],
        certTypeNo: [{
          required: true,
          message: '请填写证件号码',
          trigger: 'blur'
        }],
        phoneNo: [{
          required: true,
          message: '请填写电话号码',
          trigger: 'blur'
        }],
      },
      istrue: false,
      allpeoples: []
    }
  },
  created () {
    EmpAPI.getAllpeoples(this.listQuery).then(response => {
      this.allpeoples = response.data
    })
    dictBatch(['1001', '3001', '3016', '3017', '3019']).then(res => {
      this.sexList = res.data['1001']
      this.peoplestypeList = res.data['3001']
      this.cardtypeList = res.data['3016']
      this.visitList = res.data['3017']
      this.cartypeList = res.data['3019']
    })
    this.getList()
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
  methods: {
    handleFilter () {
      this.listQuery.pageNo = 1
      this.getList()
    },
    getList () {
      // if (this.value1 != null) {
      //   this.listQuery.params.startTime = this.value1[0]
      //   this.listQuery.params.endTime = this.value1[1]
      // }
      this.listLoading = true
      visitor.yuyuepage(this.listQuery).then((response) => {
        this.list = response.data.content
        this.total = response.data.totalElements
        this.listLoading = false
      })
    },
    handleCreate (e, id) {
      this.dialog = true;
      if (e === 1) {
        this.poptit = '新增访客预约信息'
        this.addp()
      } else {
        this.poptit = '编辑访客预约信息'
        this.getdetails(id)
      }
    },
    details (id) {
      this.dialog2 = true
      this.getdetails(id)
    },
    getdetails (id) {
      visitor.getyuyue(id).then((response) => {
        this.form = response.data.appointment
        if (response.data.cars.length > 0) {
          for (let i = 0; i < response.data.cars.length; i++) {
            this.cars.push(response.data.cars[i])
          }
        }
        for (let i = 0; i < response.data.persons.length; i++) {
          this.peoples.push(response.data.persons[i])
        }
      })
    },
    addp () {
      let pdata = {
        name: '',
        sex: '1',
        certType: '',
        certTypeNo: '',
        phoneNo: '',
        staffTypeId: ''
      }
      this.peoples.push(pdata)
    },
    addc () {
      let cdata = {
        carNo: '',
        carTypeId: '',
        brandModel: ''
      }
      this.cars.push(cdata)
    },
    delp (i) {
      this.peoples.splice(i, 1)
    },
    delc (i) {
      this.cars.splice(i, 1)
    },
    submitmsg () {
      const form1 = new Promise((resolve, reject) => {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.form.visitorType = this.getvisitorType(this.form.visitorTypeId)
            resolve()
          }
        })
      })
      const form2 = new Promise((resolve, reject) => {
        for (var i = 0; i < this.peoples.length; i++) {
          this.$refs['peoplesForm'][i].validate((valid) => {
            if (valid) {
              this.peoples[i].certTypeName = this.getcertTypeName(this.peoples[i].certType)
              this.peoples[i].staffType = this.getstaffType(this.peoples[i].staffTypeId)
              resolve()
            }
          })
        }
      })
      const form3 = new Promise((resolve, reject) => {
        if (this.cars.length > 0) {
          for (var i = 0; i < this.cars.length; i++) {
            this.$refs['carsForm'][i].validate((valid) => {
              if (valid) {
                this.peoples[i].carType = this.getcarType(this.peoples[i].carTypeId)
                resolve()
              }
            })
          }
        } else {
          resolve()
        }
      })
      const form4 = new Promise((resolve, reject) => {
        this.$refs['otherForm'].validate((valid) => {
          if (valid) {
            resolve()
          }
        })
      })
      Promise.all([form1, form2, form3, form4]).then(() => {
        let data = {}
        data.appointment = this.form
        data.cars = this.cars
        data.persons = this.peoples
        if (this.poptit == '新增访客预约信息') {
          visitor.addyuyue(data).then((response) => {
            this.dialog = false
            this.$notify.success({
              title: '成功',
            })
            this.getList()
          })
        }
      })
    },
    clearruleForm () {
      this.$refs['ruleForm'].clearValidate()
      this.$refs['otherForm'].clearValidate()
      this.form = {
        predictVisitorTime: '',
        name: '',
        visitorTypeId: '',
        visitorReason: '',
        approvalPerson: '',
        approvalFlag: true
      }
      this.peoples.splice(0, this.peoples.length)
      this.cars.splice(0, this.cars.length)
      // this.$refs['peoplesForm'][0].clearValidate()
      // this.$refs['carsForm'][0].clearValidate()
    },
    cleardetail () {
      this.form = {
        predictVisitorTime: '',
        name: '',
        visitorTypeId: '',
        visitorReason: '',
        approvalPerson: '',
        approvalFlag: true
      }
      this.peoples.splice(0, this.peoples.length)
      this.cars.splice(0, this.cars.length)
    },
    delitem (id) {
      this.$confirm('确认撤销？').then(() => {
        visitor.delyuyue(id).then(() => {
          this.getList()
          this.$notify.success({
            title: '成功',
            message: '撤销成功'
          })
        })
      })
    },
    getSex (e) {
      if (this.sexList.length > 0) {
        const a = this.sexList.find((item) => {
          return item.key == Number(e)
        })
        return a.value
      }
    },
    getcertTypeName (e) {
      if (e) {
        if (this.cardtypeList.length > 0) {
          const a = this.cardtypeList.find((item) => {
            return item.key == Number(e)
          })
          return a.value
        }
      } else {
        return ''
      }
    },
    getstaffType (e) {
      if (e) {
        if (this.peoplestypeList.length > 0) {
          const a = this.peoplestypeList.find((item) => {
            return item.key == Number(e)
          })
          return a.value
        }
      } else {
        return ''
      }
    },
    getcarType (e) {
      if (e) {
        if (this.cartypeList.length > 0) {
          const a = this.cartypeList.find((item) => {
            return item.key == Number(e)
          })
          return a.value
        }
      } else {
        return ''
      }
    },
    getvisitorType (e) {
      if (e) {
        if (this.visitList.length > 0) {
          const a = this.visitList.find((item) => {
            return item.key == Number(e)
          })
          return a.value
        }
      } else {
        return ''
      }
    },
    laifangleixing () {
      if (this.form.visit == '08') {
        this.istrue = true
      } else {
        this.istrue = false
      }
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
    getPeoplesArr(e) {
      // this.userSelectList = e
      let item = e[0];
      console.log(e)
      this.form.name = item.name
      this.form.staffId = item.id
      this.form.unitId = item.unitId
      this.form.unitName = item.unitName
    }
  }
}
</script>
<style scoped>
.photo {
  width: 100px;
  height: 100px;
}
.btnbox {
  text-align: right;
}
.line {
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 20px;
  margin-top: 20px;
}
.dialog-item .line:last-child {
  border: none;
  padding-bottom: 0;
}
.dialog-item .line:first-child {
  margin-top: 0;
}
</style>