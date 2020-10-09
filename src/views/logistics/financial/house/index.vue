<!--人员管理-->
<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>住房资金管理</span>
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
          <el-form-item label="编号：" class="filter-item">
            <el-input
              v-model="listQuery.params.relateStaffName"
              type="text"
              class="filter-item"
              placeholder="请输入编号"
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
            <el-upload
              style="display: inline-block;"
              :show-file-list="false"
              action
              accept=".xlsx, .xls"
            >
              <el-button
                v-waves
                class="filter-item btn-base"
                type="primary"
                icon="mr10 iconfont iconxinzengh"
              >批量导入</el-button>
            </el-upload>
            <el-button
              v-if="msg===undefined"
              class="filter-item btn-base filter-add-btn"
              type="primary"
              icon="mr10 iconfont iconxinzengh"
              @click="handleCreate(1)"
            >{{ $t('table.add') }}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--分页内容-->
      <el-table
        ref="multipleTable"
        v-loading="listLoading"
        stripe
        :data="list"
        class="t-bd"
        fit
        highlight-current-row
        @select="selected"
        @selection-change="handleSelectionChange"
      >
        <el-table-column v-if="msg!=undefined" type="selection" width="55" />
        <el-table-column align="center" fixed label="序号" width="50px">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed label="姓名" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.a }}</span>
          </template>
        </el-table-column>
        <el-table-column label="工资发放年月" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.b }}</span>
          </template>
        </el-table-column>
        <el-table-column label="住房补贴系数" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.c }}</span>
          </template>
        </el-table-column>
        <el-table-column label="个人基本工资" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.d }}</span>
          </template>
        </el-table-column>
        <el-table-column label="服役年限" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.e }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed label="职级补贴面积" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.f }}</span>
          </template>
        </el-table-column>
        <el-table-column label="其他津贴" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.g }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总计" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.h }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <div class="t-col-operate">
              <i class="el-icon-tickets primary table-i" title="详情" @click="details(scope.row.id,scope.row)" />
              <i
                class="el-icon-edit-outline warning table-i"
                title="编辑"
                @click="handleCreate(2,scope.row.id,scope.row)"
              />
              <i class="el-icon-delete danger table-i" title="删除" @click="delitem(scope.row.id)" />
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
      class="abow_dialog detail-form"
      title="详情"
      :visible.sync="dialog"
      :close-on-click-modal="false"
      width="800px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form :model="form" label-position="right" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="姓名：">{{ form.a }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工资发放年月：">{{ form.b }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="住房补贴系数：">{{ form.c }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="个人基本工资：">{{ form.d }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="服役年限：">{{ form.e }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="职级补贴面积：">{{ form.f }}</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="其他津贴：">{{ form.g }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取消</el-button>
        <el-button type="primary" @click="dialog = false">确定</el-button>
      </div>
    </el-dialog>
    <!--编辑-->
    <el-dialog
      class="abow_dialog "
      :title="title"
      :visible.sync="dialog1"
      :close-on-click-modal="false"
      width="800px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form :model="form" label-position="right" label-width="120px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="姓名：">
                  <el-input v-model="form.a" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工资发放年月：">
                  <el-date-picker
                    v-model="form.b"
                    type="month"
                    placeholder="选择工资发放年月"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="住房补贴系数：">
                  <el-input v-model="form.c" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="个人基本工资：">
                  <el-input v-model="form.d" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="服役年限：">
                  <el-input v-model="form.e" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="职级补贴面积：">
                  <el-input v-model="form.f" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="其他津贴：">
                  <el-input v-model="form.g" class="form-item1" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog1 = false">取消</el-button>
        <el-button type="primary" @click="dialog1 = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import familyAPI from '@/api/base/family'
import { isIdcard, isTel } from '@/utils/baseformValidate'
import { isIdcard as isCard } from '@/utils/validate'
import { dictBatch } from '@/api/base/dictDetail'
import employeeApi from '@/api/base/employee'
import { getNativePlace } from '@/utils/common'
import ConsequenceAPI from '@/api/base/consequence'
export default {
  props: {
    msg: {}
  },
  data() {
    return {
      dialog: false,
      dialog1: false,
      title: '新增',
      value: true,
      isEdit: '',
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          name: '',
          relateStaffName: ''
        }
      },
      list: [
        {
          id: 1,
          a: '张明远',
          b: '2020-01',
          c: 8,
          d: 5000,
          e: 5,
          f: 44,
          g: 500,
          h: 852
        }
      ],
      total: null,
      listLoading: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      treeProps: {
        expandTrigger: 'hover',
        value: 'id',
        label: 'label',
        emitPath: false,
        checkStrictly: true
      },
      dialogStatus: '',
      dialogFormVisible: false,
      dialog2: false,
      textMap: {
        view: '查看',
        update: '编辑',
        create: '新增'
      },
      form: {
        a: '张三',
        b: '张三',
        c: '张三',
        d: '张三',
        e: '张三',
        f: '张三',
        g: '张三',
        h: '张三',
        i: '张三',
        j: '张三'
      },
      rules: {
      },
      certificate: {
        visible: false,
        data: null,
        btnLoading: false
      },
      multipleSelection: [],
      provinceList: [],
      nativePlaceProps: {
        value: 'code',
        label: 'name',
        children: 'city',
        expandTrigger: 'hover'
      }
    }
  },
  watch: {
  },
  created() {

  },
  methods: {
    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList()
    },
    getList() {
      // this.listLoading = true
      // familyAPI.page(this.listQuery).then(response => {
      //   this.list = response.data.content
      //   this.total = response.data.totalElements
      //   this.listLoading = false
      // })
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
      this.$refs['dataForm'].clearValidate()
      this.form = {
        name: '',
        photoUrl: '',
        certType: '',
        certTypeName: '',
        certTypeNo: '',
        sex: '',
        birthday: '',
        maritalStatusId: '',
        politicsStatusId: '',
        nationId: '',
        nativePlace: [],
        homeAddress: '',
        militaryRankId: '',
        jobId: '',
        officerNumber: '',
        relateStaffId: '',
        relateStaffName: ''
      }
    },
    handleCreate(e, id, row) {
      this.dialog1 = true
      if (e === 1) {
        this.form = {}
        this.title = '新增'
      } else {
        this.title = '编辑'
        this.form = { ...row }
        this.getdetails(id)
      }
    },
    details(id, row) {
      this.dialog = true
      this.form = { ...row }
      this.getdetails(id)
    },
    getdetails(id) {
      // familyAPI.detail(id).then((response) => {
      //   this.form = response.data
      //   if (!Array.isArray(this.form.nativePlace)) {
      //     this.form.nativePlace = JSON.parse(this.form.nativePlace)
      //   }
      // })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        this.form.maritalStatus = this.getMarital()// 婚姻状况
        this.form.politicsStatus = this.getPolitics()// 政治面貌
        this.form.nation = this.getNation()// 民族
        this.form.militaryRank = this.getMilitaryRank()// 军衔
        this.form.job = this.getJob()// 职务
        this.form.certTypeName = this.getCertType()// 证件类型
        if (valid) {
          familyAPI.create(this.form).then(() => {
            this.dialogFormVisible = false
            this.$notify.success({
              title: '成功',
              message: '人员添加成功!'
            })
            this.getList()
          })
        }
      })
    },
    handleUpdate(row) {
      this.form = { ...row }
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
        this.isEdit = row.createAccount
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        this.form.maritalStatus = this.getMarital()// 婚姻状况
        this.form.politicsStatus = this.getPolitics()// 政治面貌
        this.form.nation = this.getNation()// 民族
        this.form.militaryRank = this.getMilitaryRank()// 军衔
        this.form.job = this.getJob()// 职务
        this.form.certTypeName = this.getCertType()// 证件类型
        console.log(this.form)
        if (valid) {
          familyAPI.update(this.form).then(() => {
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
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
      this.form.photoUrl = ''
      familyAPI.upload(formatFile)
        .then(res => {
          this.form.photoUrl = res.data[0].filePath
          this.$message.success('头像上传成功！')
        })
      return false
    },
    handleSelectionChange(val) {
      this.multipleSelection = val.map(function(item) {
        return item.id
      })
      this.$emit('getPeoplesArr', this.multipleSelection)
    },
    selected(selection, row) {
      if (this.msg === 2) {
        this.$refs.multipleTable.clearSelection()
        if (selection.length === 0) return
        this.$refs.multipleTable.toggleRowSelection(row, true)
      }
    },
    GNP(arr) {
      if (arr.length > 0) {
        return getNativePlace(arr)
      }
    },
    getSex(e) {
      if (e) {
        const a = this.sexList.find((item) => {
          return item.key === e
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
    },
    delitem(id) {
      this.$confirm('确认删除？').then(() => {
        familyAPI.del(id).then(() => {
          this.getList()
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
        })
      })
    },
    cascaderRadioClick(val) {
      this.form.unitId = val
    },
    handlePeopleChange(val) {
      const result = this.peopleList.find(item => {
        return item.id === val
      })
      this.form.relateStaffName = result.name
      this.form.militaryRankId = result.militaryRankId
      this.form.jobId = result.jobId
    }
  }
}
</script>
<style lang='scss' scoped>
  .dialog-item-title {
    padding-left: 0;
    margin-bottom: 20px;
  }
  .photo {
  }
  .photo-icon-small {
    width: 40px;
    height: 40px;
  }

  /deep/ .avatar-uploader.el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  /deep/ .avatar-uploader.el-upload:hover {
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
  .dialogBox {
    border: 1px solid #eee;
    box-sizing: border-box;
    padding: 20px 20px 0 20px;
    background-color: #fff;
  }
  // /deep/ .el-upload{
  // 	width: 100%;
  // }
</style>
<style lang='scss'>
  // .rt_input /deep/ .el-form-item__label{
  // 	width: 76px!important;
  // }
  // .rt_input /deep/ .el-form-item__content{
  // 	margin-left: 76px!important;
  // }
  // .el-upload{
  //   height: 180px !important;
  // }
</style>
