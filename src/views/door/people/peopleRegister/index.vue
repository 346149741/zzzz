<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>访客登记</span>
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
          <el-form-item label="单位部门：" class="filter-item">
            <el-cascader
              ref="cascader"
              v-model="listQuery.params.respondentsPersonDept"
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
              <el-option label="是" value="是" />
              <el-option label="否" value="否" />
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
          <el-form-item label="访客日期：" class="filter-item">
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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="t-col-operate">
              <!-- <i class="el-icon-tickets primary table-i" title="详情" @click="details(scope.row.a)" />
              <i class="el-icon-s-opportunity danger table-i" title="处置" /> -->
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
        <div class="btnbox">
          <el-button type="primary" size="mini" @click="yuyue">预约信息</el-button>
        </div>
        <div class="dialog-item-title">来访信息</div>
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
                  <el-input v-model="form.name" placeholder="请选择人员" />
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
              <el-col :span="12">
                <el-form-item label="预计截止时间：" prop="predictLeaveTime">
                  <el-date-picker
                    v-model="form.predictLeaveTime"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期"
                    style="width:100%"
                  />
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
                  <el-form-item label="人像：">
                    <el-upload
                      class="avatar-uploader"
                      :action="uploadlurl"
                      :show-file-list="false"
                      :on-success="(value)=> handleAvatarSuccess('people','photoUrl',i, value)"
                      :before-upload="beforeAvatarUpload"
                    >
                      <img v-if="p.photoUrl" :src="p.photoUrl" class="avatar" />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="证件：">
                    <el-upload
                      class="avatar-uploader"
                      :action="uploadlurl"
                      :show-file-list="false"
                      :on-success="(value)=> handleAvatarSuccess('people','photoUrlFront',i, value)"
                      :before-upload="beforeAvatarUpload"
                    >
                      <img v-if="p.photoUrlFront" :src="p.photoUrlFront" class="avatar" />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      <span>正面</span>
                    </el-upload>
                    <el-upload
                      class="avatar-uploader"
                      :action="uploadlurl"
                      :show-file-list="false"
                      :on-success="(value)=> handleAvatarSuccess('people','photoUrlVerso',i, value)"
                      :before-upload="beforeAvatarUpload"
                    >
                      <img v-if="p.photoUrlVerso" :src="p.photoUrlVerso" class="avatar" />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      <span>反面</span>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
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
                  <el-form-item label="证件类型：" prop="cardtype">
                    <el-select
                      v-model="p.cardtype"
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
                  <el-col :span="24">
                    <el-form-item label="车辆图像：">
                      <el-upload
                      class="avatar-uploader"
                      :action="uploadlurl"
                      :show-file-list="false"
                      :on-success="(value)=> handleAvatarSuccess('car','carPhotoUrl',i, value)"
                      :before-upload="beforeAvatarUpload"
                    >
                      <img v-if="c.carPhotoUrl" :src="c.carPhotoUrl" class="avatar" />
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    </el-form-item>
                  </el-col>
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
                  <el-col :span="12">
                    <el-form-item label="车身颜色：">
                      <el-input
                        v-model="c.carColor"
                        type="text"
                        class="filter-item"
                        placeholder="请输入车身颜色"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="车辆识别号：">
                      <el-input
                        v-model="c.carKey"
                        type="text"
                        class="filter-item"
                        placeholder="请输入车辆识别号"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="发动机号：">
                      <el-input
                        v-model="c.engineNo"
                        type="text"
                        class="filter-item"
                        placeholder="请输入发动机号"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="驾驶人员：" prop="driver">
                      <el-select
                        v-model="c.driver"
                        clearable
                        class="form-item"
                        placeholder="请选择驾驶人员"
                      >
                        <el-option
                          v-for="(item,key) in peoples"
                          :key="key"
                          :label="item.name"
                          :value="item.name"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="驾驶证号：" prop="driversLicense">
                      <el-input
                        v-model="c.driversLicense"
                        type="text"
                        class="filter-item"
                        placeholder="请输入驾驶证号"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <div class="btnbox">
                <el-button type="danger" size="mini" @click="delc(i)">删除车辆</el-button>
              </div>
            </div>
          </div>
        </template>
        <div class="dialog-item-title">其它信息</div>
        <div class="dialog-item">
          <el-form ref="otherForm" :model="form" :rules="rules" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="是否携带物品：">
                  <el-radio-group v-model="form.goodsFlag">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="物品描述：" prop="goodsDescription">
                  <el-input
                    v-model="form.goodsDescription"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                  />
                </el-form-item>
                <el-form-item label="备注：">
                  <el-input
                    v-model="form.remark"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog-item-title">审批信息</div>
        <div class="dialog-item">
          <el-form ref="shenpiForm" :model="form" :rules="rules" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label>
                  <el-radio-group v-model="form.approvalFlag">
                    <el-radio :label="1">审批</el-radio>
                    <el-radio :label="2">不审批</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="审核人员：" prop="shenhepeople">
                  <el-select
                    v-model="form.shenhepeople"
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
      class="small_dialog"
      title="预约信息"
      :visible.sync="dialog1"
      :close-on-click-modal="false"
      width="1000px"
    >
      <el-form :model="searchyuyue" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="来访人姓名：">
              <el-input v-model="searchyuyue.comename" type="text" class="filter-item" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="受访人姓名：">
              <el-input v-model="searchyuyue.name" type="text" class="filter-item" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="来访类型：">
              <el-select v-model="searchyuyue.visit" clearable style="width:100%">
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
            <el-form-item label="来访人证件号：">
              <el-input v-model="searchyuyue.code" type="text" class="filter-item" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="访客单号：">
              <el-input v-model="searchyuyue.id" type="text" class="filter-item" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <div class="btnbox">
              <el-button type="primary">搜索</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-table stripe :data="yuyuelist" class="t-bd" fit highlight-current-row>
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column property="a" label="预约单号" />
        <el-table-column property="b" label="姓名" />
        <el-table-column property="c" label="性别" />
        <el-table-column property="d" label="联系电话" />
        <el-table-column property="e" label="人员类型" />
        <el-table-column property="f" label="工作单位" />
        <el-table-column property="g" label="受访部门" />
        <el-table-column property="a" label="受访人员" />
        <el-table-column property="b" label="来访类型" />
        <el-table-column property="c" label="预约来访时间" />
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import EmpAPI from '@/api/base/employee'
import { dictBatch } from '@/api/base/dictDetail'
import { getAllOrg } from '@/api/base/organ'
import { delchildren } from '@/utils/index'
import { uploadlurl } from '@/api/base/main'
import visitor from '@/api/door/visitor'
export default {
  data () {
    let laifangshiyou = (rule, value, callback) => {
      if (value == '' && this.istrue) {
        callback(new Error('请填写来访事由'))
      } else {
        callback()
      }
    }
    let shenheren = (rule, value, callback) => {
      if (value == '' && this.form.approvalFlag == 1) {
        callback(new Error('请选择审核人员'))
      } else {
        callback()
      }
    }
    let isgoods = (rule, value, callback) => {
      if (value == '' && this.form.goodsFlag) {
        callback(new Error('请填写物品描述'))
      } else {
        callback()
      }
    }
    return {
      uploadlurl: uploadlurl,
      imageUrl: '',
      value1: null,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          respondentsPersonDept: '',
        }
      },
      list: [],
      yuyuelist: [],
      form: {
        predictVisitorTime: '',
        name: '',
        visitorTypeId: '',
        visitorReason: '',
        shenhepeople: '',
        approvalFlag: 1,
        predictLeaveTime: '',
        goodsFlag: false,
        goodsDescription: '',
        remark: ''
      },
      peoples: [],
      cars: [],
      searchyuyue: {

      },
      total: null, // 总数
      listLoading: false,
      dialog: false,
      dialog1: false,
      peoplestypeList: [],
      cardtypeList: [],
      visitList: [],
      sexList: [],
      cartypeList: [],
      orgDeptTreeData: null,
      treeProps: {
        expandTrigger: 'hover',
        value: 'id',
        label: 'label',
        children: 'children',
        emitPath: false,
        checkStrictly: true
      },
      poptit: "新增访客登记",
      rules: {
        predictVisitorTime: [{
          required: true,
          message: '请填写预计来访时间',
          trigger: 'blur'
        }],
        predictLeaveTime: [{
          required: true,
          message: '请填写预计截止时间',
          trigger: 'blur'
        }],
        people: [{
          required: true,
          message: '请填写受访人员',
          trigger: 'blur'
        }],
        visitorTypeId: [{
          required: true,
          message: '请选择来访类型',
          trigger: 'change'
        }],
        shenhepeople: [{
          validator: shenheren,
          trigger: 'change'
        }],
        visitorReason: [{
          validator: laifangshiyou,
          trigger: 'blur'
        }],
        goodsDescription: [{
          validator: isgoods,
          trigger: 'blur'
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
        driver: [{
          required: true,
          message: '请选择驾驶人员',
          trigger: 'change'
        }],
        driversLicense: [{
          required: true,
          message: '请填写驾驶证号',
          trigger: 'blur'
        }],
      },
      peoplerulers:{
        name: [{
          required: true,
          message: '请填写姓名',
          trigger: 'blur'
        }],
        cardtype: [{
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
      allpeoples: []
    }
  },
  created () {
    EmpAPI.getAllpeoples(this.listQuery).then(response => {
      this.allpeoples = response.data
    })
    this.getList()
    dictBatch(['1001', '3001', '3016', '3017', '3019']).then(res => {
      this.sexList = res.data['1001']
      this.peoplestypeList = res.data['3001']
      this.cardtypeList = res.data['3016']
      this.visitList = res.data['3017']
      this.cartypeList = res.data['3019']
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
      visitor.guestpage(this.listQuery).then((response) => {
        this.list = response.data.content
        this.total = response.data.totalElements
        this.listLoading = false
      })
    },
    handleCreate (e, id) {
      this.dialog = true;
      if (e === 1) {
        this.poptit = '新增访客登记'
        this.addp();
      } else {
        this.poptit = '编辑访客登记'
        this.getdetails(id)
      }
    },
    details (id) {
      this.dialog = true
      this.getdetails(id)
    },
    getdetails (id) {
      // floorget(id).then((response) => {
      //   this.ruleForm = response.data
      // })
    },
    addp () {
      let pdata = {
        name: '',
        sex: '1',
        certType: '',
        certTypeNo: '',
        phoneNo: '',
        staffTypeId: '',
        photoUrl: '',
        photoUrlFront: '',
        photoUrlVerso: '',
      }
      this.peoples.push(pdata)
    },
    addc () {
      let cdata = {
        carNo: '',
        carTypeId: '',
        brandModel: '',
        carColor: '',
        carKey: '',
        engineNo: '',
        driver: '',
        driversLicense: '',
        carPhotoUrl: ''
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
            resolve()
          }
        })
      })
      const form2 = new Promise((resolve, reject) => {
        for (var i = 0; i < this.peoples.length; i++) {
          this.$refs['peoplesForm'][i].validate((valid) => {
            if (valid) {
              resolve()
            }
          })
        }
      })
      const form3 = new Promise((resolve, reject) => {
        for (var i = 0; i < this.cars.length; i++) {
          this.$refs['carsForm'][i].validate((valid) => {
            if (valid) {
              resolve()
            }
          })
        }
      })
      const form4 = new Promise((resolve, reject) => {
        this.$refs['shenpiForm'].validate((valid) => {
          if (valid) {
            resolve()
          }
        })
      })
      const form5 = new Promise((resolve, reject) => {
        this.$refs['otherForm'].validate((valid) => {
          if (valid) {
            resolve()
          }
        })
      })
      Promise.all([form1, form2, form3, form4, form5]).then(() => {
        console.log('验证通过,提交表单')
      })
      // this.$refs['peoplesForm'].validate((valid) => {
      //   if (valid) {
      //     let isclick = true
      //     if (isclick) {
      //       isclick = false
      //       if ((this.poptit === '新增楼宇')) {
      //         floorsave(this.ruleForm).then((response) => {
      //           isclick = true
      //           this.dialog1 = false
      //           this.getList()
      //         })
      //       } else {
      //         floorput(this.ruleForm).then((response) => {
      //           isclick = true
      //           this.dialog1 = false
      //           this.getList()
      //         })
      //       }
      //     }
      //   }
      // })
    },
    clearruleForm () {
      this.$refs['ruleForm'].clearValidate()
      this.$refs['shenpiForm'].clearValidate()
      this.$refs['otherForm'].clearValidate()
      this.form = {
        predictVisitorTime: '',
        people: '',
        visit: '',
        visitorReason: '',
        shenhepeople: '',
        approvalFlag: 1,
        goodsFlag: false,
        goodsDescription: '',
        remark: ''
      }
      this.peoples.splice(0, this.peoples.length)
      this.cars.splice(0, this.cars.length)
      // this.$refs['peoplesForm'][0].clearValidate()
      // this.$refs['carsForm'][0].clearValidate()
    },
    handleAvatarSuccess (type, url, i, res) {
      // console.log(type)
      // console.log(i)
      // console.log(res)
      if (type == 'people') {
        if (url == 'photoUrl') {
          this.peoples[i].photoUrl = res.urls[0]
        } else if (url == 'photoUrlFront') {
          this.peoples[i].photoUrlFront = res.urls[0]
        }
        else if (url == 'photoUrlVerso') {
          this.peoples[i].photoUrlVerso = res.urls[0]
        }
      }else if(type == 'car'){
        this.cars[i].carPhotoUrl = res.urls[0]
      }

      console.log(this.peoples)
    },
    yuyue () {
      this.dialog = false;
      this.dialog1 = true;
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    delitem (id) {
      this.$confirm('确认撤销？').then(() => {
        visitor.delguest(id).then(() => {
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
<style lang="scss" scoped>
.avatar-uploader {
  display: inline-block;
}
/deep/ .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/ .el-upload span {
  position: absolute;
  bottom: 0;
  width: 80px;
  text-align: center;
  left: 0;
  line-height: 30px;
}

/deep/ .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}

.avatar {
  // position: absolute;
  // top: 0;
  // left: 10%;
  width: 80px;
  height: 80px;
  display: block;
}
</style>