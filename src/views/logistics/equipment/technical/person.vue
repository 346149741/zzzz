<template>
  <div>
    <!--操作按钮-->
    <div class="filter-container">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="名称：" class="filter-item">
          <el-input
            v-model="listQuery.params.carNo"
            type="text"
            prefix-icon="el-icon-search"
            class="filter-item mr10"
            placeholder="请输入标识号"
            @keyup.enter.native="handleFilter"
          />
        </el-form-item>
        <el-form-item label="工号：" class="filter-item">
          <el-input
            v-model="listQuery.params.carNo"
            type="text"
            prefix-icon="el-icon-search"
            class="filter-item mr10"
            placeholder="请输入工号"
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
            v-waves
            class="filter-item btn-base"
            type="primary"
            icon="mr10 iconfont iconxinzengh"
            @click="handleCreate"
          >新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--固定车辆分页内容-->
    <el-table
      v-loading="listLoading"
      :data="tableData"
      :header-cell-style="{background:'#FAFAFA',color:'#A2A2B2','font-size':'14px'}"
      stripe
      class="t-bd"
      border
    >
      <el-table-column label="序号" fixed width="50px">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工号" fixed show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.a }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" fixed show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.b }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.g }}</span>
        </template>
      </el-table-column>
      <el-table-column label="民族" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.n }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文化程度" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.l }}</span>
        </template>
      </el-table-column>
      <el-table-column label="专业" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.m }}</span>
        </template>
      </el-table-column>
      <el-table-column label="职位" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.p }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任职部门" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.q }}</span>
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
            <i class="el-icon-tickets primary table-i" title="查看" @click="handleView(scope.row)" />
            <i class="el-icon-edit-outline warning table-i" title="编辑" @click="handleUpdate(scope.row)" />
            <i class="el-icon-delete danger table-i" title="注销" @click="handleDelete(scope.row)" />
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

    <!--添加/编辑弹出框-->
    <el-dialog
      class="abow_dialog"
      :title="dialogForm.title"
      :visible.sync="dialogForm.visible"
      :close-on-click-modal="false"
      width="1260px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="工号：" prop="a">
                    <el-input v-model="dataForm.a" placeholder="请输入工号" />
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="姓名：" prop="b">
                    <el-input v-model="dataForm.b" placeholder="请输入姓名" />
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="照片：">
                    <el-upload
                      class="avatar-uploader"
                      :show-file-list="false"
                      action
                      accept=".jpg, .jpeg, .png, .gif"
                      :before-upload="beforeAvatarUpload"
                    >
                      <img v-if="dataForm.c" :src="dataForm.c" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon" />
                    </el-upload>
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="证件类型：" prop="d">
                    <el-select
                      v-model="dataForm.d"
                      placeholder="请选择证件类型"
                      class="form-item1"
                    >
                      <el-option
                        v-for="(item,key) in certTypeList"
                        :key="key"
                        :label="item.value"
                        :value="item.key"
                      />
                    </el-select>
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="证件号码" prop="e">
                    <el-input v-model="dataForm.e" placeholder="请输入证件号码" />
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="出生日期：">
                    <el-date-picker
                      v-model="dataForm.f"
                      value-format="yyyy-MM-dd"
                      type="date"
                      placeholder="选择日期"
                      style="width:100%"
                    />
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="性别：">
                    <el-radio-group v-model="dataForm.g">
                      <el-radio
                        v-for="(item,i) in sexList"
                        :key="i"
                        :label="item.key"
                      >{{ item.value }}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="身高：">
                    <el-input v-model="dataForm.h" placeholder="请输入身高" />
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="婚姻状况：">
                    <el-select
                      v-model="dataForm.i"
                      placeholder="请选择婚姻状况"
                      class="form-item1"
                    >
                      <el-option
                        v-for="(item,key) in marriageList"
                        :key="key"
                        :label="item.value"
                        :value="item.key"
                      />
                    </el-select>
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="健康状况：">
                    <el-select
                      v-model="dataForm.j"
                      placeholder="请选择健康状况"
                      class="form-item1"
                    >
                      <el-option
                        v-for="(item,key) in healthyList"
                        :key="key"
                        :label="item.value"
                        :value="item.key"
                      />
                    </el-select>
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="政治面貌：" prop="k">
                    <el-select
                      v-model="dataForm.k"
                      placeholder="请选择政治面貌"
                      class="form-item1"
                    >
                      <el-option
                        v-for="(item,key) in politicsList"
                        :key="key"
                        :label="item.value"
                        :value="item.key"
                      />
                    </el-select>
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="文化程度：">
                    <el-select
                      v-model="dataForm.l"
                      placeholder="请选择文化程度"
                      class="form-item1"
                    >
                      <el-option
                        v-for="(item,key) in eduList"
                        :key="key"
                        :label="item.value"
                        :value="item.key"
                      />
                    </el-select>
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="专业：">
                    <el-input v-model="dataForm.m" placeholder="请输入专业" />
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="民族：" prop="n">
                    <el-select v-model="dataForm.n" placeholder="请选择民族" class="form-item1">
                      <el-option
                        v-for="(item,key) in nationList"
                        :key="key"
                        :label="item.value"
                        :value="item.key"
                      />
                    </el-select>
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="家庭住址：" prop="o">
                    <el-input v-model="dataForm.o" placeholder="请输入家庭住址" />
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="职位：" prop="p">
                    <el-select v-model="dataForm.p" placeholder="请选择职位" class="form-item1">
                      <el-option
                        v-for="(item,key) in positionList"
                        :key="key"
                        :label="item.value"
                        :value="item.key"
                      />
                    </el-select>
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="任职部门：" prop="q">
                    <el-select v-model="dataForm.q" placeholder="请选择任职部门" class="form-item1">
                      <el-option
                        v-for="(item,key) in departList"
                        :key="key"
                        :label="item.value"
                        :value="item.key"
                      />
                    </el-select>
                  </el-form-item>
                </el-row>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="un-primary-btn" @click="dialogForm.visible = false">取 消</el-button>
        <el-button v-if="dialogForm.type === 'add'" type="primary" @click="createData">{{ $t('table.confirm') }}</el-button>
        <el-button v-if="dialogForm.type === 'edit'" type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
      </span>
    </el-dialog>
    <!--详情查看-->
    <el-dialog
      class="abow_dialog detail-form"
      title="查看"
      :visible.sync="checkdetail"
      :close-on-click-modal="false"
      width="1260px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form :model="dataForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="编号：">
                    {{ dataForm.a }}
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="姓名：">
                    {{ dataForm.b }}
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="照片：" class="unborder">
                    <template v-if="dataForm.c!=''">
                      <img :src="dataForm.c" style="width:50px;height:50px">
                    </template>
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="政见类型">
                    {{ dataForm.d }}
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="身份证号">
                    {{ dataForm.e }}
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="出生日期：">
                    {{ dataForm.f }}
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="性别：">
                    {{ dataForm.g }}
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="身高：">
                    {{ dataForm.h }}
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="婚姻状况：">
                    {{ dataForm.i }}
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="健康状况：">
                    {{ dataForm.j }}
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="政治面貌：">
                    {{ dataForm.k }}
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="文化程度：">
                    {{ dataForm.l }}
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="专业：">
                    {{ dataForm.m }}
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="民族：">
                    {{ dataForm.n }}
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="家庭住址：">
                    {{ dataForm.o }}
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="职位：">
                    {{ dataForm.p }}
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="任职部门：">
                    {{ dataForm.q }}
                  </el-form-item>
                </el-row>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MeAPI from '@/api/logistics/equ-technical'
import { dictBatch } from '@/api/base/dictDetail'
import ConsequenceAPI from '@/api/base/consequence'
export default {
  name: 'Index',
  data() {
    return {
      eduList: [],
      sexList: [],
      ranksList: [],
      nationList: [],
      peoplestypeList: [],
      marriageList: [],
      healthyList: [],
      politicsList: [],
      jobList: [],
      certTypeList: [],
      provinceList: [],
      positionList: [],
      departList: [],
      tableData: [],
      total: null,
      listLoading: true,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          carNo: '',
          unitId: '',
          carUseId: ''
        }
      },
      dialogForm: {
        visible: false,
        title: '',
        type: 'add'
      },
      dataForm: {
        a: '',
        b: '',
        c: '',
        d: '',
        e: '',
        f: '',
        g: '',
        h: '',
        i: '',
        j: '',
        k: '',
        l: '',
        m: '',
        n: '',
        o: '',
        p: '',
        q: '',
        x: '',
        y: '',
        z: ''
      },
      rules: {
        a: [{ required: true, message: '请输入编号', trigger: 'blur' }],
        b: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        d: [{ required: true, message: '请选择证件类型', trigger: 'change' }],
        e: [{ required: true, message: '请选择证件号码', trigger: 'change' }]
      },
      checkdetail: false,
      nativePlaceProps: {
        value: 'code',
        label: 'name',
        children: 'city',
        expandTrigger: 'hover'
      }
    }
  },
  mounted() {
    this.geDictList()
  },
  methods: {
    geDictList() {
      dictBatch(['1001', '1002', '1006', '1007', '1008', '1009', '3001', '3002', '3003', '3033']).then(res => {
        this.sexList = res.data['1001']
        this.eduList = res.data['1002']
        this.marriageList = res.data['1006']
        this.healthyList = res.data['1007']
        this.politicsList = res.data['1008']
        this.nationList = res.data['1009']
        this.peoplestypeList = res.data['3001']
        this.ranksList = res.data['3002']
        this.jobList = res.data['3003']
        this.certTypeList = res.data['3033']
      })
      this.provinceList = ConsequenceAPI.getCity()
      const res = MeAPI.dict()
      this.positionList = res.data['01']
      this.departList = res.data['02']
      this.getList()
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList()
    },
    getList() {
      const res = MeAPI.page(this.listQuery)
      this.listLoading = false
      this.total = res.data.totalElements
      this.tableData = res.data.content
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.getList()
    },
    handleCreate() {
      this.resetForm()
      this.dialogForm.visible = true
      this.dialogForm.title = '新增装备技术职工'
      this.dialogForm.type = 'add'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.dialogForm.visible = false
          this.tableData.push(this.dataForm)
          this.$notify.success({
            title: '成功',
            message: '保存成功!'
          })
        }
      })
    },
    handleUpdate(info) {
      this.resetForm()
      this.dialogForm.visible = true
      this.dialogForm.title = '编辑'
      this.dialogForm.type = 'edit'
      this.dataForm = Object.assign({}, info)
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.dialogForm.visible = false
          this.tableData.forEach((item, index) => {
            if (item.id === this.dataForm.id) {
              this.$set(this.tableData, index, this.dataForm)
            }
          })
          this.$notify.success({
            title: '成功',
            message: '编辑成功!'
          })
        }
      })
    },
    handleView(info) {
      this.checkdetail = true
      this.dataForm = Object.assign({}, info)
    },
    handleDelete(info) {
      this.$confirm('确认删除' + info.a + '？').then(() => {
        this.tableData = this.tableData.filter(item => {
          return item.id !== info.id
        })
        console.log(this.tableData)
        this.$notify.success({
          title: '成功',
          message: '删除成功'
        })
      })
    },
    resetForm() {
      this.dataForm = {
        a: '',
        b: '',
        c: '',
        d: '',
        e: '',
        f: '',
        g: '',
        h: '',
        i: '',
        j: '',
        k: '',
        l: '',
        m: '',
        n: '',
        o: '',
        p: '',
        q: '',
        x: '',
        y: '',
        z: ''
      }
    },
    getFactory(val) {
      const result = this.roomList.find(item => {
        return item.key === val
      })
      return result ? result.value : ''
    },
    getPerform(val) {
      const result = this.performanceList.find(item => {
        return item.key === val
      })
      return result ? result.value : ''
    },
    getDepart(val) {
      const result = this.departList.find(item => {
        return item.key === val
      })
      return result ? result.value : ''
    },
    beforeExcelUpload(file) {
      const fileName = file.name.toLowerCase()
      const isMODO =
          fileName.indexOf('.xlsx') >= 0 ||
          fileName.indexOf('.xls') >= 0
      const isLt2M = file.size / 1024 / 1024 < 4

      if (!isMODO) {
        this.$message.error('上传图片只能是xlsx/xls格式!')
        return
      }
      if (!isLt2M) {
        this.$message.error('上传模型大小不能超过4MB!')
        return
      }
      const formatFile = new FormData()
      formatFile.append('file', file)
      MeAPI.upload(formatFile).then(res => {
      })
      return false
    },
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是JPG/PNG/GIF格式!')
        return
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过2MB!')
        return
      }
      const formatFile = new FormData()
      formatFile.append('file', file)
      this.form.dataForm = ''
      MeAPI.upload(formatFile)
        .then(res => {
          this.dataForm.photoUrl = res.data[0].filePath
          this.$message.success('头像上传成功！')
        })
      return false
    },
    getSex(e) {
      if (e) {
        const a = this.sexList.find((item) => {
          return item.key === e
        })
        return a.value
      }
    },
    getEdu() {
      if (this.form.educationBackgroundId === '') {
        return ''
      } else {
        const a = this.eduList.find((item) => {
          return item.key === this.form.educationBackgroundId
        })
        return a.value
      }
    },
    getNation() {
      const a = this.nationList.find((item) => {
        return item.key === this.form.nationId
      })
      return a.value
    },
    getStaff() {
      const a = this.peoplestypeList.find((item) => {
        return item.key === this.form.staffTypeId
      })
      return a.value
    },
    getMilitaryRank() {
      const a = this.ranksList.find((item) => {
        return item.key === this.form.militaryRankId
      })
      return a.value
    },
    getMarital() {
      if (this.form.maritalStatusId === '') {
        return ''
      } else {
        const a = this.marriageList.find((item) => {
          return item.key === this.form.maritalStatusId
        })
        return a.value
      }
    },
    getHealth() {
      if (this.form.healthStatusId === '') {
        return ''
      } else {
        const a = this.healthyList.find((item) => {
          return item.key === this.form.healthStatusId
        })
        return a.value
      }
    },
    getPolitics() {
      if (this.form.politicsStatusId === '') {
        return ''
      } else {
        const a = this.politicsList.find((item) => {
          return item.key === this.form.politicsStatusId
        })
        return a.value
      }
    },
    getJob() {
      if (this.form.jobId === '') {
        return ''
      } else {
        const a = this.jobList.find((item) => {
          return item.key === this.form.jobId
        })
        return a.value
      }
    },
    getCertType() {
      const a = this.certTypeList.find((item) => {
        return item.key === this.form.certType
      })
      return a.value
    }
  }
}
</script>

<style scoped lang="scss">
  .photo-icon-small {
    width: 40px;
    height: 40px;
  }

  /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  /deep/ .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }

  .avatar {
  // position: absolute;
  // top: 0;
  // left: 10%;
    width: 50px;
    height: 50px;
    display: block;
  }
</style>
