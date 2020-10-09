<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <!--操作按钮-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="姓名" class="filter-item">
            <el-input
              v-model="listQuery.params.userName"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="姓名"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="性别 : " class="filter-item">
            <el-select
              v-model="listQuery.params.sex"
              class="filter-item"
              placeholder="请选择"
              style="width:100%"
              filterable
              @keyup.enter.native="handleFilter"
            >
              <el-option
                label="男"
                value="1"
              />
              <el-option
                label="女"
                value="2"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="人员类型 : " class="filter-item">
            <el-select
              v-model="listQuery.params.routeType"
              class="filter-item"
              placeholder="请选择"
              filterable
              @keyup.enter.native="handleFilter"
            >
              <el-option
                v-for="(item,key) in venueTtpe"
                :key="key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="部门 : " class="filter-item">
            <el-select
              v-model="dataForm.bm"
              class="filter-item"
              placeholder="请选择"
              style="width:100%"
              filterable
              @keyup.enter.native="handleFilter"
            >
              <el-option
                v-for="(item,key) in bmList"
                :key="key"
                :label="item.value"
                :value="item.label"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="准驾车型 : " class="filter-item">
            <el-select
              v-model="listQuery.params.zjcx"
              class="filter-item"
              placeholder="请选择"
              style="width:100%"
              filterable
              @keyup.enter.native="handleFilter"
            >
              <el-option
                v-for="(item,key) in kfList"
                :key="key"
                :label="item.value"
                :value="item.label"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="领证日期 : " class="filter-item">
            <el-date-picker
              v-model="listQuery.params.lzrq"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item label="驾驶证号" class="filter-item">
            <el-input
              v-model="listQuery.params.jszh"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入驾驶证号"
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
            >{{ $t("table.search") }}</el-button>
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconxinzengh"
              @click="handleAddRole"
            >录入</el-button>

          </el-form-item>
        </el-form>
      </div>

      <!--已添加角色分页内容-->
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="listArr"
        stripe
        class="t-bd"
        fit
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" fixed type="selection" />
        <el-table-column label="人员编号" align="center" fixed width="150px" prop="id" />
        <el-table-column label="人员类型" fixed show-overflow-tooltip prop="username" />
        <el-table-column align="center" label="姓名" prop="classify" />
        <el-table-column align="center" label="性别" prop="sex" />
        <el-table-column align="center" label="部门" prop="logins" />
        <el-table-column align="center" label="准驾车型" prop="sign" />
        <el-table-column align="center" label="驾驶证号" prop="kf" />
        <el-table-column align="center" label="联系电话" prop="score" />
        <el-table-column align="center" label="领证日期" prop="joinTime" />
        <!-- <el-table-column label="操作人员" align="center" prop="classify" />
        <el-table-column label="操作时间" align="center" prop="joinTime" /> -->
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
              <i class="el-icon-delete danger table-i" title="报废" @click="handleDelete(row)" />
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
    <!--新增修改巡更项目 对话框-->
    <el-dialog
      class="abow_dialog"
      :title="tkTitle"
      :visible.sync="dialogUserVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="60%"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="130px">
            <h4 class="title" style="margin-top:-50px;">基本信息</h4>
            <el-row>
              <el-col :span="8">
                <el-row>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    style="border:1px solid #e4e4e4;width:300px;margin-left:80px;"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon" />
                  </el-upload>
                </el-row>
                <el-row>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <el-button size="small" style="margin:20px 0 0 180px" type="primary">上传头像</el-button>
                  </el-upload>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-form-item label="部门 : " class="filter-item" prop="bm">
                    <el-select
                      v-model="dataForm.bm"
                      class="filter-item"
                      placeholder="请选择"
                      style="width:100%"
                      filterable
                    >
                      <el-option
                        v-for="(item,key) in bmList"
                        :key="key"
                        :label="item.value"
                        :value="item.label"
                      />
                    </el-select>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="姓别：" prop="sex">
                    <el-select
                      v-model="dataForm.sex"
                      class="filter-item"
                      placeholder="请选择"
                      style="width:100%"
                      filterable
                    >
                      <el-option
                        label="男"
                        value="1"
                      />
                      <el-option
                        label="女"
                        value="2"
                      />
                    </el-select>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="政治面貌 : " class="filter-item">
                    <el-select
                      v-model="dataForm.zzmm"
                      class="filter-item"
                      placeholder="请选择"
                      style="width:100%"
                      filterable
                    >
                      <el-option
                        v-for="(item,key) in zzmmList"
                        :key="key"
                        :label="item.value"
                        :value="item.label"
                      />
                    </el-select>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="人员编号" prop="itemName">
                    <el-input v-model="dataForm.rybh" class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="联系电话" prop="itemName">
                    <el-input v-model="dataForm.pic" class="form-item1" />
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-form-item label="姓名：" prop="itemName">
                    <el-input v-model="dataForm.username" class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="人员类型 : " class="filter-item">
                    <el-select
                      v-model="listQuery.params.routeType"
                      class="filter-item"
                      style="width:100%"
                      placeholder="请选择"
                      filterable
                    >
                      <el-option
                        v-for="(item,key) in venueTtpe"
                        :key="key"
                        :label="item.value"
                        :value="item.key"
                      />
                    </el-select>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="籍贯：" prop="itemName">
                    <el-input v-model="dataForm.jg" class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="身份证号" prop="itemName">
                    <el-input v-model="dataForm.cid" class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="健康情况" prop="itemName">
                    <el-select
                      v-model="dataForm.jk"
                      class="filter-item"
                      placeholder="请选择"
                      style="width:100%"
                      filterable
                    >
                      <el-option
                        v-for="(item,key) in jkList"
                        :key="key"
                        :label="item.value"
                        :value="item.label"
                      />
                    </el-select>
                  </el-form-item>
                </el-row>
              </el-col>
            </el-row>
            <h4 class="title">驾驶员信息</h4>
            <el-row>
              <el-col :span="8">
                <el-form-item label="驾驶证号" prop="itemName">
                  <el-input v-model="dataForm.itemName" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="准驾车型 : " class="filter-item">
                  <el-select
                    v-model="listQuery.params.zjcx"
                    class="filter-item"
                    placeholder="请选择"
                    style="width:100%"
                    filterable
                  >
                    <el-option
                      v-for="(item,key) in kfList"
                      :key="key"
                      :label="item.value"
                      :value="item.label"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="领证日期 : " class="filter-item">
                  <el-date-picker
                    v-model="listQuery.params.lzrq"
                    type="date"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="审验到期日期 : " class="filter-item">
                  <el-date-picker
                    v-model="listQuery.params.sydqrq"
                    type="date"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="审验部门" prop="itemName">
                  <el-input v-model="dataForm.sybm" class="form-item1" />
                </el-form-item>
              </el-col>
            </el-row>
            <h4 class="title">违章及处理情况</h4>
            <el-row>
              <el-col :span="8">
                <el-form-item label="违章日期 : " class="filter-item">
                  <el-date-picker
                    v-model="listQuery.params.wzrq"
                    type="date"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="违章事项" prop="itemName">
                  <el-input v-model="dataForm.sybm" class="form-item1" />
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="处理情况" prop="itemName">
                  <el-input v-model="dataForm.desc" type="textarea" />
                </el-form-item>
              </el-col>
            </el-row>
            <h4 class="title">其他信息</h4>
            <el-row>
              <el-col :span="16">
                <el-form-item label="备注" prop="itemName">
                  <el-input v-model="dataForm.desc" type="textarea" />
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUserVisible = false">{{ $t("table.cancel") }}</el-button>
        <el-button type="primary" @click="updateData">{{ $t("table.confirm") }}</el-button>
      </div>
    </el-dialog>

    <!--查看巡更项目 对话框-->
    <el-dialog
      class="abow_dialog"
      title="驾驶员详情"
      :visible.sync="lookVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="550px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form ref="lookForm" label-width="130px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="姓名">{{ lookForm.username }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="性别: " class="filter-item">{{ lookForm.venueType }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="人员类型: " class="filter-item">{{ lookForm.logins }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="部门: " class="filter-item">{{ lookForm.kf }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="驾驶证号: " class="filter-item">{{ lookForm.sign }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="准驾车型: " class="filter-item">{{ lookForm.zjcx }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="初次领证日期: " class="filter-item">{{ lookForm.rq }}</el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getList,
  addPatrolObj,
  updatePatrolObj,
  delPatrolObj
} from '@/api/base/patro-objManage'
import { dictBatch } from '@/api/base/dictDetail'
export default {
  name: 'ObjManage',
  data() {
    return {
      dialogUserVisible: false, // 新增和编辑控制按钮
      lookVisible: false, // 查看详情弹框控制按钮
      shenqingVisible: false,
      imageUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2263980775,326422779&fm=26&gp=0.jpg',
      tableKey: 0,
      listArr: [{
        'id': 10000,
        'username': '家属',
        'sex': '男',
        'city': '城市-0',
        'sign': 'C1',
        'kf': '3128*******066',
        'experience': 255,
        'logins': '采购处',
        'wealth': 82830700,
        'classify': '周静',
        'joinTime': '2020-08-10',
        'score': 13658658868
      }, {
        'id': 10001,
        'kf': '1128*******066',
        'username': '职工',
        'sex': '女',
        'city': '城市-0',
        'sign': 'A1',
        'experience': 255,
        'logins': '档案处',
        'wealth': 82830700,
        'classify': '王强',
        'joinTime': '2020-06-06',
        'score': 13558658868
      }, {
        'id': 10002,
        'kf': '4128*******066',
        'username': '内部人员',
        'sex': '女',
        'city': '城市-0',
        'sign': 'B1',
        'experience': 255,
        'logins': '采购处',
        'wealth': 82830700,
        'classify': '吴云龙',
        'joinTime': '2020-06-06',
        'score': 18858658868
      }, {
        'id': 10003,
        'username': '家属',
        'sex': '男',
        'city': '城市-0',
        'sign': 'C3',
        'kf': '2128*******066',
        'experience': 255,
        'logins': '作训处',
        'wealth': 82830700,
        'classify': '孙瑞瑞',
        'joinTime': '2020-06-06',
        'score': 13858658868
      }, {
        'id': 10004,
        'username': '职工',
        'sex': '男',
        'city': '城市-0',
        'sign': 'A2',
        'kf': '1128*******022',
        'experience': 255,
        'logins': '后勤处',
        'wealth': 82830700,
        'classify': '郭龙强',
        'joinTime': '2020-06-06',
        'score': 13958652546
      }, {
        'id': 10005,
        'username': '内部人员',
        'sex': '女',
        'city': '城市-0',
        'kf': '4128*******003',
        'sign': 'C1',
        'experience': 255,
        'logins': '档案处',
        'wealth': 82830700,
        'classify': '冯蕊',
        'joinTime': '2020-06-06',
        'score': 17758652546
      }], // 已添加用户
      total: 6, // 总数
      listLoading: true,
      selectList: [],
      kfList: [
        {
          value: 'A1',
          label: '0'
        }, {
          value: 'A2',
          label: '1'
        }, {
          value: 'B1',
          label: '2'
        }, {
          value: 'B2',
          label: '3'
        }, {
          value: 'c1',
          label: '4'
        }, {
          value: 'c2',
          label: '5'
        }, {
          value: 'c3',
          label: '6'
        }],
      bmList: [
        {
          value: '档案处',
          label: '0'
        }, {
          value: '后勤处',
          label: '1'
        }, {
          value: '作训处',
          label: '2'
        }, {
          value: '采购处',
          label: '3'
        }],
      jkList: [
        {
          value: '良好',
          label: '0'
        }, {
          value: '健康',
          label: '1'
        }, {
          value: '一般',
          label: '2'
        }, {
          value: '较差',
          label: '3'
        }],
      zzmmList: [
        {
          value: '中共党员',
          label: '0'
        }, {
          value: '中共预备党员',
          label: '1'
        }, {
          value: '共青团员',
          label: '2'
        }, {
          value: '其他',
          label: '3'
        }],
      venueTtpe: [
        {
          value: '内部人员',
          label: '1'
        }, {
          value: '职工',
          label: '2'
        }, {
          value: '家属',
          label: '3'
        }],
      teamList: [
        {
          value: '请选择',
          label: '0'
        }, {
          value: '三营2连',
          label: '1'
        }, {
          value: '二团1营',
          label: '2'
        }, {
          value: '五师2连',
          label: '3'
        }, {
          value: '特战旅1连',
          label: '4'
        }],
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        routeType: 0,
        params: {
          itemName: '',
          zjcx: '',
          enable: '0'
        }
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
      sfqyList: [], // 是否启用字典
      dialogFormVisible: false,
      dialogPermissionVisible: false,
      userPermissionList: [],
      userPermissionLists: [],
      dialogStatus: '',
      tkTitle: '新增教材',
      dataForm: {
        itemName: '',
        enable: '',
        itemDesc: '',
        value1: '',
        value2: '',
        kf: '1'
      },
      lookForm: {
        venueType: '',
        username: '',
        sign: '',
        city: '',
        logins: '',
        kf: ''
      },
      rules: {
        itemName: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
    dictBatch('3023').then(res => {
      this.sfqyList = res.data['3023']
    })
  },
  methods: {
    handleSelectionChange(val) {
      this.selectList = val.map(function(item) {
        return item.id
      })
    },

    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList()
    },
    // 格式化图标
    qy(row) {
      let val = ''
      if (row.enable === '00') {
        val = '是'
      } else {
        val = '否'
      }
      return val
    },

    // 获取表格列表数据
    getList() {
      this.listLoading = true
      getList(this.listQuery).then((response) => {
        this.list = response.data.content
        // this.total = response.data.totalElements
        this.listLoading = false
      })
    },

    // 分页
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.getList()
    },

    // 新增弹框操作
    handleAddRole() {
      this.operaType = 1
      this.tkTitle = '新增驾驶员'
      this.dataForm.itemName = ''
      this.dataForm.enable = '00'
      this.dataForm.itemDesc = ''
      this.dialogUserVisible = true
    },
    shenqing() {
      this.shenqingVisible = true
    },
    handleDelete(row) {
      this.$confirm('确认删除该驾驶员吗?').then(() => {
        delPatrolObj(row.id).then((res) => {
          if (res.code === 200) {
            this.getList()
            this.$notify.success({
              title: '成功',
              message: '操作成功!'
            })
          }
        })
      })
    },

    // 保存修改数据接口

    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.operaType === 1) {
            if (this.dataForm.id) {
              delete this.dataForm.id
            }
            addPatrolObj(this.dataForm).then((res) => {
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
            updatePatrolObj(this.dataForm).then((res) => {
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
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 查看操作
    handleView(row) {
      this.lookForm.username = row.classify
      this.lookForm.sign = row.kf
      this.lookForm.logins = row.username
      this.lookForm.kf = row.logins
      this.lookForm.zjcx = row.sign
      this.lookForm.rq = row.joinTime
      this.lookForm.venueType = row.sex
      this.lookVisible = true
    },
    // 编辑操作
    handleUpdate(row) {
      this.operaType = 2
      this.tkTitle = '编辑驾驶员'
      this.dataForm.id = row.id
      this.dataForm.itemName = row.username
      this.dataForm.enable = row.enable
      this.dataForm.itemDesc = row.itemDesc
      this.dialogUserVisible = true
    }
  }
}
</script>
<style scoped>
.switchStyle {
  margin-right: 0;
}
.avatar-uploader .el-upload--text {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 220px;
    height: 220px;
    display: block;
    margin: 0 0 0 20px;
  }
  .title{
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #e4e4e4;
    margin: 0 0 50px 0;
  }
</style>
