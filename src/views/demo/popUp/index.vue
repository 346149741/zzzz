<template>
  <div>
    <el-button @click="handleBigFormOpen">弹出大表单页</el-button>
    <el-button @click="handleSmallFormOpen">弹出小表单页</el-button>
    <el-button @click="handleFormDetail">弹出信息查看页</el-button>

    <!--大型表单页，大于6项填报内容时用-->
    <el-dialog
      class="abow_dialog"
      title="弹出表单页"
      :visible.sync="dialogForm"
      :close-on-click-modal="false"
      width="50%"
      :before-close="handleBigFormClose"
    >
      <div class="dialog-content">
        <div class="dialog-item-title">人员信息</div>
        <div class="dialog-item">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="姓名：" prop="name">
                  <el-input v-model="ruleForm.name" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="性别：" prop="sex">
                  <el-select v-model="ruleForm.sex" class="form-item1" placeholder="请选择性别">
                    <el-option label="男" value="男" />
                    <el-option label="女" value="女" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="证件类型：" prop="certificates">
                  <el-select v-model="ruleForm.certificates" class="form-item1" placeholder="请选择证件">
                    <el-option label="身份证" value="身份证" />
                    <el-option label="驾驶证" value="驾驶证" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="证件号码：" prop="certificateNo">
                  <el-input v-model="ruleForm.certificateNo" class="form-item1">
                    <i slot="suffix" class="el-input__icon el-input_txt">上传/读取</i>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="工作单位：" prop="company">
                  <el-input v-model="ruleForm.company" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item class="form-item1" label="联系电话：" prop="phone">
                  <el-input v-model="ruleForm.phone" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="出生日期：" prop="birthday">
                  <el-date-picker
                    v-model="ruleForm.birthday"
                    class="form-item1"
                    type="date"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="教育期限：" prop="educationDate">
                  <el-date-picker
                    v-model="ruleForm.educationDate"
                    class="form-item1"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['00:00:00', '23:59:59']"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注：" prop="mark">
                  <el-input
                    v-model="ruleForm.mark"
                    class="form-item1"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    maxlength="30"
                    show-word-limit
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog-item-title">其它信息</div>
        <div class="dialog-item">
          <el-form ref="ruleForm1" :model="ruleForm" :rules="rules" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="来访类型：" prop="visitType">
                  <el-select v-model="ruleForm.visitType" class="form-item1" placeholder="请选择来访类型">
                    <el-option label="工作" value="工作" />
                    <el-option label="观光" value="观光" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="是否携带物品：" prop="aa">
                  <el-radio-group v-model="ruleForm.aa" class="form-item1">
                    <el-radio label="是">是</el-radio>
                    <el-radio label="否">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="是否携带物品：" prop="bb">
                  <el-checkbox-group v-model="ruleForm.bb" class="form-item1">
                    <el-checkbox label="复选框 A" />
                    <el-checkbox label="复选框 B" />
                    <el-checkbox label="复选框 C" />
                    <el-checkbox label="禁用" />
                    <el-checkbox label="选中且禁用" />
                    <el-checkbox label="选中且禁用" />
                    <el-checkbox label="选中且禁用" />
                    <el-checkbox label="选中且禁用" />
                    <el-checkbox label="选中且禁用" />
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注：" prop="mark">
                  <el-input
                    v-model="ruleForm.mark"
                    class="form-item1"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    maxlength="30"
                    show-word-limit
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注：" prop="mark">
                  <el-input
                    v-model="ruleForm.mark"
                    class="form-item1"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    maxlength="30"
                    show-word-limit
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注：" prop="mark">
                  <el-input
                    v-model="ruleForm.mark"
                    class="form-item1"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    maxlength="30"
                    show-word-limit
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog-item-title">xx表格</div>
        <div class="dialog-table">
          <div class="dialog-table-btn">
            <el-button type="primary" size="mini">批量删除</el-button>
            <el-button type="primary" size="mini">新增</el-button>
            <el-button type="primary" size="mini">导入</el-button>
          </div>
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column
              label="日期"
              width="120"
            >
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="120"
            />
            <el-table-column
              prop="address"
              label="地址"
              show-overflow-tooltip
            />
            <el-table-column
              fixed="right"
              label="操作"
              width="100"
            >
              <template slot-scope="scope">
                <div class="t-col-operate">
                  <i class="el-icon-edit-outline warning table-i" title="编辑" />
                  <i class="el-icon-delete danger table-i" title="删除" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="un-primary-btn" @click="dialogForm = false">取 消</el-button>
        <el-button type="primary" @click="dialogForm = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--小型表单页，小于6项填报内容时用-->
    <el-dialog
      class="small_dialog"
      title="弹出小表单页"
      :visible.sync="dialogForm2"
      :close-on-click-modal="false"
      width="600px"
      :before-close="handleSmallFormClose"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="姓名：" prop="name">
                  <el-input v-model="ruleForm.name" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="性别：" prop="sex">
                  <el-select v-model="ruleForm.sex" class="form-item1" placeholder="请选择性别">
                    <el-option label="男" value="男" />
                    <el-option label="女" value="女" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="证件号码：" prop="certificateNo">
                  <el-input v-model="ruleForm.certificateNo" class="form-item1">
                    <i slot="suffix" class="el-input__icon el-input_txt">上传/读取</i>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="出生日期：" prop="birthday">
                  <el-date-picker
                    v-model="ruleForm.birthday"
                    class="form-item1"
                    type="date"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="教育期限：" prop="educationDate">
                  <el-date-picker
                    v-model="ruleForm.educationDate"
                    class="form-item1"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['00:00:00', '23:59:59']"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注：" prop="mark">
                  <el-input
                    v-model="ruleForm.mark"
                    class="form-item1"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    maxlength="30"
                    show-word-limit
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="un-primary-btn" @click="dialogForm2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogForm2 = false">确 定</el-button>
      </span>
    </el-dialog>
    <!--弹出详情页-->
    <el-dialog
      class="abow_dialog detail-form"
      title="弹出表单页"
      :visible.sync="dialogForm3"
      :close-on-click-modal="false"
      width="50%"
      :before-close="handleFormDetailClose"
    >
      <div class="dialog-content">
        <div class="dialog-item-title">人员信息</div>
        <div class="dialog-item">
          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="姓名：" prop="name">
                  刘海柱
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="性别：" prop="sex">
                  男
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="证件类型：" prop="certificates">
                  身份证
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="证件号码：" prop="certificateNo">
                  42658475254752459
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="工作单位：" prop="company">
                  象牙山村委会主任
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item class="form-item1" label="联系电话：" prop="phone">
                  13854752218
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="出生日期：" prop="birthday">
                  1977-05-17
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="教育期限：" prop="educationDate">
                  1981-09-01~1999-07-01
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注：" prop="mark">
                  少年不识愁滋味，爱上层楼。爱上层楼，为赋新词强说愁。
                  而今识尽愁滋味，欲说还休。欲说还休，却道天凉好个秋。
                  郁孤台下清江水，中间多少行人泪。西北望长安，可怜无数山。
                  青山遮不住，毕竟东流去。江晚正愁余，山深闻鹧鸪。
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog-item-title">其它信息</div>
        <div class="dialog-item">
          <el-form ref="ruleForm1" :model="ruleForm" :rules="rules" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="来访类型：" prop="visitType">
                  工作
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="是否携带物品：" prop="aa">
                  是
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="是否携带物品：" prop="bb">
                  <el-checkbox-group v-model="ruleForm.bb" class="form-item1" disabled>
                    <el-checkbox label="复选框 A" checked />
                    <el-checkbox label="复选框 B" />
                    <el-checkbox label="复选框 C" checked />
                    <el-checkbox label="禁用" />
                    <el-checkbox label="选中且禁用" />
                    <el-checkbox label="选中且禁用" />
                    <el-checkbox label="选中且禁用" />
                    <el-checkbox label="选中且禁用" />
                    <el-checkbox label="选中且禁用" />
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注：" prop="mark">
                  昨夜星辰昨夜风，画楼西畔桂堂东。
                  身无彩凤双飞翼，心有灵犀一点通。
                  锦瑟无端五十弦，一弦一柱思华年。
                  庄生晓梦迷蝴蝶，望帝春心托杜鹃。
                  相见时难别亦难，东风无力百花残。
                  春蚕到死丝方尽，蜡炬成灰泪始干
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注：" prop="mark">
                  君不见黄河之水天上来，奔流到海不复回。
                  君不见高堂明镜悲白发，朝如青丝暮成雪。
                  李白乘舟将欲行，忽闻岸上踏歌声。
                  桃花潭水深千尺，不及汪伦送我情。
                  金樽清酒斗十千，玉盘珍羞直万钱。
                  停杯投箸不能食，拔剑四顾心茫然。
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注：" prop="mark">
                  风急天高猿啸哀，渚清沙白鸟飞回。
                  无边落木萧萧下，不尽长江滚滚来。
                  剑外忽传收蓟北，初闻涕泪满衣裳。
                  却看妻子愁何在，漫卷诗书喜欲狂。
                  丞相祠堂何处寻，锦官城外柏森森。
                  映阶碧草自春色，隔叶黄鹂空好音。
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="un-primary-btn" @click="dialogForm3 = false">取 消</el-button>
        <el-button type="primary" @click="dialogForm3 = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      dialogForm: false,
      dialogForm2: false,
      dialogForm3: false,
      ruleForm: {
        name: '',
        sex: '',
        certificates: '',
        certificateNo: '',
        company: '',
        phone: '',
        birthday: '',
        educationDate: [],
        mark: '',
        visitType: '',
        aa: '',
        bb: [],
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入人员', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        phone: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ],
        educationDate: [
          { required: true, message: '请选择教育期限', trigger: 'blur' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      multipleSelection: []
    }
  },
  methods: {
    handleBigFormOpen() {
      this.dialogForm = true
    },
    handleBigFormClose() {
      this.dialogForm = false
    },
    handleSmallFormOpen() {
      this.dialogForm2 = true
    },
    handleSmallFormClose() {
      this.dialogForm2 = false
    },
    handleFormDetail() {
      this.dialogForm3 = true
    },
    handleFormDetailClose() {
      this.dialogForm3 = false
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
