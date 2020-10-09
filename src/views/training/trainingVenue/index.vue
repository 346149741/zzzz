<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <!--操作按钮-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="场地名称：" class="filter-item">
            <el-input
              v-model="listQuery.params.itemName"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入场地名称"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="场地类型 : " class="filter-item">
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
                :value="item.label"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="场地地址：" class="filter-item">
            <el-input
              v-model="listQuery.params.itemName"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入场地地址"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="所属单位 : " class="filter-item">
            <el-select
              v-model="listQuery.params.unit"
              class="filter-item"
              placeholder="请选择"
              filterable
              @keyup.enter.native="handleFilter"
            >
              <el-option
                v-for="(item,key) in teamList"
                :key="key"
                :label="item.value"
                :value="item.label"
              />
            </el-select>
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
            >新增</el-button>
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconxinzengh"
              @click="shenqing"
            >使用申请</el-button>

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
        <el-table-column label="场地编号" align="center" fixed width="150px">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="场地名称" fixed show-overflow-tooltip prop="username" />
        <el-table-column align="center" label="场地类型" prop="venueType" />
        <el-table-column align="center" label="场地地址" prop="city" />
        <el-table-column align="center" label="所属单位" prop="sign" />
        <el-table-column align="center" label="场地状态" prop="venueStaue" />
        <el-table-column label="操作人" align="center" prop="classify" />
        <el-table-column label="操作时间" align="center" prop="joinTime" />
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
              <i v-if="row.venueStaue!='报废'" class="el-icon-delete danger table-i" title="报废" @click="handleDelete(row)" />
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
      width="550px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="130px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="场地名称：" prop="itemName">
                  <el-input v-model="dataForm.itemName" class="form-item1" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="场地类型 : " class="filter-item">
                  <el-select
                    v-model="dataForm.routeType"
                    class="filter-item"
                    placeholder="请选择"
                    style="width:100%"
                    filterable
                    @keyup.enter.native="handleFilter"
                  >
                    <el-option
                      v-for="(item,key) in venueTtpe"
                      :key="key"
                      :label="item.value"
                      :value="item.label"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="场地状态 : " class="filter-item">
                  <el-select
                    v-model="dataForm.venueStaue"
                    class="filter-item"
                    placeholder="请选择"
                    style="width:100%"
                    filterable
                    @keyup.enter.native="handleFilter"
                  >
                    <el-option
                      label="正常"
                      value="1"
                    />
                    <el-option
                      label="维修中"
                      value="2"
                    />
                    <el-option
                      label="报废"
                      value="3"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item label="所属单位 : " class="filter-item">
                  <el-select
                    v-model="dataForm.unit"
                    class="filter-item"
                    placeholder="请选择"
                    style="width:100%"
                    filterable
                    @keyup.enter.native="handleFilter"
                  >
                    <el-option
                      v-for="(item,key) in teamList"
                      :key="key"
                      :label="item.value"
                      :value="item.label"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="场地地址：" prop="itemAdders">
                  <el-input v-model="dataForm.itemName" class="form-item1" />
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
    <!--申请使用-->
    <el-dialog
      class="abow_dialog"
      title="申请场地"
      :visible.sync="shenqingVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="550px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="130px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="场地名称：" prop="itemName">
                  <el-select
                    v-model="dataForm.itemName"
                    class="filter-item"
                    placeholder="请选择"
                    style="width:100%"
                    filterable
                    @keyup.enter.native="handleFilter"
                  >
                    <el-option
                      v-for="(item,key) in venueList"
                      :key="key"
                      :label="item.value"
                      :value="item.label"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="场地类型 : " class="filter-item">
                  <el-select
                    v-model="dataForm.routeType"
                    class="filter-item"
                    placeholder="请选择"
                    style="width:100%"
                    filterable
                    @keyup.enter.native="handleFilter"
                  >
                    <el-option
                      v-for="(item,key) in venueTtpe"
                      :key="key"
                      :label="item.value"
                      :value="item.label"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="申请人：" prop="itemAdders">
                  <el-input v-model="dataForm.userName" class="form-item1" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item label="申请人单位 : " class="filter-item">
                  <el-select
                    v-model="dataForm.unit"
                    class="filter-item"
                    placeholder="请选择"
                    style="width:100%"
                    filterable
                    @keyup.enter.native="handleFilter"
                  >
                    <el-option
                      v-for="(item,key) in teamList"
                      :key="key"
                      :label="item.value"
                      :value="item.label"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item label="申请日期 : " class="filter-item">
                  <el-date-picker
                    v-model="dataForm.value1"
                    style="width:100%"
                    type="datetime"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item label="归还日期 : " class="filter-item">
                  <el-date-picker
                    v-model="dataForm.value2"
                    style="width:100%"
                    type="datetime"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="shenqingVisible = false">{{ $t("table.cancel") }}</el-button>
        <el-button type="primary" @click="updateData">{{ $t("table.confirm") }}</el-button>
      </div>
    </el-dialog>

    <!--查看巡更项目 对话框-->
    <el-dialog
      class="abow_dialog"
      title="场地详情"
      :visible.sync="lookVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="750px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form ref="lookForm" label-width="130px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="场地名称：">{{ lookForm.username }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="场地类型: " class="filter-item">{{ lookForm.venueType }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="场地状态: " class="filter-item">{{ lookForm.venueStaue }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="所属单位: " class="filter-item">{{ lookForm.sign }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="场地地址: " class="filter-item">{{ lookForm.city }}</el-form-item>
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
      tableKey: 0,
      listArr: [{
        id: 10000,
        username: '射击场08',
        venueType: '射击场',
        city: '天山路8号',
        sign: '三营1连',
        experience: 255,
        logins: 24,
        venueStaue: '正常',
        wealth: '室内',
        classify: '小飞侠',
        joinTime: '2020-08-10 18:10:10',
        score: 57,
        status: '使用中'
      }, {
        id: 10001,
        username: '战术场02',
        venueType: '战术训练场',
        city: '玉泉路北段',
        sign: '三营1连',
        experience: 884,
        logins: 58,
        venueStaue: '报废',
        wealth: '室内',
        classify: '凌风',
        joinTime: '2020-06-06 10:20:10',
        score: 27,
        status: '使用中'
      }, {
        id: 10002,
        username: '专业场06',
        venueType: '专业训练场',
        city: '场地里88号',
        sign: '特战旅1连',
        experience: 650,
        logins: 77,
        venueStaue: '正常',
        wealth: '室外',
        classify: '张大军',
        joinTime: '2020-06-06 10:20:10',
        score: 31,
        status: '已归还'
      }, {
        id: 10003,
        username: '综合场02',
        venueType: '综合训练场',
        city: '檀山路东段',
        sign: '三团1连',
        experience: 362,
        venueStaue: '维修中',
        logins: 157,
        wealth: '室外',
        classify: '王二毛',
        joinTime: '2020-06-06 10:20:10',
        score: 68,
        status: '审核中'
      }, {
        id: 10004,
        username: '射击场06',
        venueType: '射击训练场',
        city: '嵩山路2号',
        sign: '1营3连',
        experience: 807,
        logins: 51,
        wealth: '室外',
        classify: '赵强',
        venueStaue: '报废',
        joinTime: '2020-06-06 10:20:10',
        score: 6,
        status: '审核中'
      }, {
        id: 10005,
        username: '战术场05',
        venueType: '战术训练场',
        city: '华山路22号',
        sign: '三团1连',
        experience: 173,
        logins: 68,
        venueStaue: '维修中',
        wealth: '室外',
        joinTime: '2020-06-06 10:20:10',
        classify: '王大庆',
        score: 87,
        status: '已归还'
      }, {
        id: 10006,
        username: '综合场01',
        venueType: '综合训练场',
        city: '泰山路东段',
        sign: '三团1连',
        experience: 982,
        joinTime: '2020-06-06 10:20:10',
        logins: 37,
        wealth: '室外',
        venueStaue: '正常',
        classify: '张娟',
        score: 34,
        status: '已归还'
      }, {
        id: 10007,
        venueStaue: '正常',
        username: '综合场01',
        venueType: '综合训练场',
        city: '天山路8号',
        sign: '三团1连',
        experience: 727,
        logins: 150,
        wealth: '室外',
        classify: '李丽',
        joinTime: '2020-06-06 10:20:10',
        score: 28,
        status: '已归还'
      }, {
        id: 10008,
        username: '综合场01',
        venueType: '综合训练场',
        city: '场地路南段',
        sign: '三团1连',
        venueStaue: '报废',
        experience: 951,
        logins: 133,
        wealth: '室外',
        joinTime: '2020-06-06 10:20:10',
        classify: '小飞侠',
        score: 14,
        status: '已归还'
      }, {
        id: 10009,
        username: '综合场01',
        venueType: '综合训练场',
        city: '天山路8号',
        sign: '三团1连',
        venueStaue: '正常',
        experience: 484,
        logins: 25,
        wealth: '室外',
        classify: '词人',
        joinTime: '2020-06-06 10:20:10',
        score: 75,
        status: '已归还'
      }], // 已添加用户
      total: null, // 总数
      listLoading: true,
      selectList: [],
      venueTtpe: [
        {
          value: '请选择',
          label: '0'
        }, {
          value: '射击场',
          label: '1'
        }, {
          value: '战术训练场',
          label: '2'
        }, {
          value: '专业训练场',
          label: '3'
        }, {
          value: '综合训练场',
          label: '4'
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
      venueList: [
        {
          value: '请选择',
          label: '0'
        }, {
          value: '射击场01',
          label: '1'
        }, {
          value: '战术场02',
          label: '2'
        }, {
          value: '专业场03',
          label: '3'
        }, {
          value: '综合场04',
          label: '4'
        }],
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        routeType: 0,
        params: {
          itemName: '',
          enable: '00',
          unit: ''
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
      tkTitle: '新增项目',
      dataForm: {
        itemName: '',
        enable: '',
        itemDesc: '',
        value1: '',
        venueStaue: '',
        value2: ''
      },
      lookForm: {
        venueType: '',
        username: '',
        sign: '',
        city: ''
      },
      rules: {
        itemName: [
          { required: true, message: '请输入场地名称', trigger: 'blur' }
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
        this.total = response.data.totalElements
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
      this.tkTitle = '新增场地'
      this.dataForm.itemName = ''
      this.dataForm.enable = '00'
      this.dataForm.itemDesc = ''
      this.dialogUserVisible = true
    },
    shenqing() {
      this.shenqingVisible = true
    },
    handleDelete(row) {
      this.$confirm('确认报废该场地吗?').then(() => {
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

    // 查看操作
    handleView(row) {
      this.lookForm.username = row.username
      this.lookForm.sign = row.sign
      this.lookForm.city = row.city
      this.lookForm.venueType = row.venueType
      this.lookForm.venueStaue = row.venueStaue
      this.lookVisible = true
    },
    // 编辑操作
    handleUpdate(row) {
      this.operaType = 2
      this.tkTitle = '编辑场地'
      this.dataForm.id = row.id
      this.dataForm.venueStaue = row.venueStaue
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
</style>
