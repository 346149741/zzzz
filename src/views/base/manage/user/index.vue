<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>用户管理</span>
      </div>
      <!--操作按钮-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="工号/姓名/手机号：" class="filter-item">
            <el-input
              v-model="listQuery.params.name"
              type="text"
              style="width: 340px;"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入工号/姓名/手机号"
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
              @click="handleAddRole"
            >新增用户</el-button>
            <el-button
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconzhongzhimima"
              @click="handleReset()"
            >{{ $t('login.resetPsd') }}</el-button>
            <el-button
              v-waves
              class="filter-item btn-base"
              type="danger"
              icon="mr10 iconfont iconshanchuh"
              @click="handleDelete()"
            >{{ $t('user.delete') }}</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!--已添加角色分页内容-->
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        stripe
        class="t-bd"
        fit
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" fixed type="selection" />
        <el-table-column label="序号" fixed width="50px">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="工号" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.employee.employeeNo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.employee.employeeName }}</span>
          </template>
        </el-table-column>
        <!--      <el-table-column align="center" label="头像">-->
        <!--        <template slot-scope="scope">-->
        <!--          <img class="photo-icon-small" :src="scope.row.employee.photo" alt="">-->
        <!--        </template>-->
        <!--      </el-table-column>-->
        <el-table-column label="性别">
          <template slot-scope="scope">
            <span>{{ scope.row.employee.genderName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号码" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.employee.phone }}</span>
          </template>
        </el-table-column>
        <!--<el-table-column align="center" label="邮箱">
        <template slot-scope="scope">
          <span>{{ scope.row.employee.email }}</span>
        </template>
        </el-table-column>-->
        <!--      <el-table-column align="center" label="助记码">-->
        <!--        <template slot-scope="scope">-->
        <!--          <span>{{ scope.row.employee.pinyin }}</span>-->
        <!--        </template>-->
        <!--      </el-table-column>-->
        <el-table-column label="出生日期" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.employee.birthday.slice(0, 10) }}</span>
          </template>
        </el-table-column>
        <!--      <el-table-column align="center" label="角色">-->
        <!--        <template slot-scope="scope">-->
        <!--          <span v-for="item in scope.row.roles" :key="item.code">{{ item.name+'&emsp;' }}</span>-->
        <!--        </template>-->
        <!--      </el-table-column>-->
        <el-table-column label="部门" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.employee.deptName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="启用">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.enable"
              class="switchStyle"
              active-text="启用"
              inactive-text="禁用"
            />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="$t('table.actions')"
          fixed="right"
          class-name="small-padding fixed-width"
          width="240px"
        >
          <template slot-scope="scope">
            <div class="t-col-operate">
              <!-- <el-button
                size="mini"
                icon="el-icon-user"
                class="operatefont iconchakanb"
                @click="handlePermission(scope.row)"
              >权限</el-button> -->
              <i
                class="el-icon-user primary table-i"
                title="权限"
                @click="handlePermission(scope.row)"
              />
              <!-- <el-button
                size="mini"
                icon="el-icon-unlock"
                class="operatefont iconbianjib"
                @click="handleReset(scope.row)"
              >重置</el-button> -->
              <i
                class="el-icon-unlock warning table-i"
                title="重置"
                @click="handleReset(scope.row)"
              />
              <!-- <el-button
                size="mini"
                icon="el-icon-delete"
                class="operatefont iconshanchub"
                @click="handleDelete(scope.row)"
              >删除</el-button> -->
              <i
                class="el-icon-delete danger table-i"
                title="删除"
                @click="handleDelete(scope.row)"
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
    <!--新增角色 对话框-->
    <!-- <el-dialog class="abow_dialog" width="80%" title="新增用户" :visible.sync="dialogUserVisible" left>
      <div class="dialog-content"> -->
        <!--搜索条件-->
        <!-- <div class="filter-container">
          <el-input
            v-model="filterText"
            style="width: calc(100% - 150px);"
            class="filter-item mr10"
            placeholder="部门/工号/姓名/手机号"
            @keyup.enter.native="handleUserFilter"
          />
          <el-button
            v-waves
            class="filter-item btn-base"
            type="primary"
            icon="mr10 iconfont iconsousuo"
            @click="handleUserFilter"
          >{{ $t('table.search') }}</el-button>
        </div> -->
        <!-- <el-table
          ref="multipleTable"
          :key="tableKey"
          v-loading="listLoading"
          :data="userList"
          stripe
          class="t-bd"
          :header-cell-style="{background:'#FAFAFA',color:'#A2A2B2','font-size':'14px'}"
          fit
          highlight-current-row
          @selection-change="handleUserSelectionChange"
        >
          <el-table-column align="center" type="selection" />
          <el-table-column align="center" label="序号" width="50px">
            <template slot-scope="scope">
              <span>{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="工号">
            <template slot-scope="scope">
              <span>{{ scope.row.employeeNo }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="姓名">
            <template slot-scope="scope">
              <span>{{ scope.row.employeeName }}</span>
            </template>
          </el-table-column> -->
        <!--          <el-table-column align="center" label="头像">-->
        <!--            <template slot-scope="scope">-->
        <!--              <img class="photo-icon-small" :src="scope.row.photo" alt="">-->
        <!--            </template>-->
        <!--          </el-table-column>-->
        <!-- <el-table-column align="center" label="性别">
            <template slot-scope="scope">
              <span>{{ scope.row.genderName }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="手机号码">
            <template slot-scope="scope">
              <span>{{ scope.row.phone }}</span>
            </template>
          </el-table-column> -->
        <!--          <el-table-column align="center" label="邮箱">-->
        <!--            <template slot-scope="scope">-->
        <!--              <span>{{ scope.row.email }}</span>-->
        <!--            </template>-->
        <!--          </el-table-column>-->
        <!--          <el-table-column align="center" label="助记码">-->
        <!--            <template slot-scope="scope">-->
        <!--              <span>{{ scope.row.pinyin }}</span>-->
        <!--            </template>-->
        <!--          </el-table-column>-->
        <!-- <el-table-column align="center" label="出生日期">
            <template slot-scope="scope">
              <span>{{ scope.row.birthday.slice(0, 10) }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="部门">
            <template slot-scope="scope">
              <span>{{ scope.row.deptName }}</span>
            </template>
          </el-table-column>
        </el-table> -->
        <!--分页工具条-->
        <!-- <div class="pagination-container">
          <el-pagination
            background
            :current-page="userQuery.pageNo"
            :page-sizes="[10,20,30, 50]"
            :page-size="userQuery.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="userTotal"
            @size-change="handleUserSizeChange"
            @current-change="handleUserCurrentChange"
          />
        </div> -->
      <!-- </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUserVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="createUser">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog> -->
    <allPeoples v-if="dialogUserVisible" :msg="1" @getPeoplesArr="getPeoplesArr" />
    <!--角色权限 对话框 -->
    <el-dialog title="角色权限" :visible.sync="dialogPermissionVisible" @close="clear()">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="form"
        label-position="left"
        label-width="100px"
      >
        <el-form-item label="权限" prop="permission">
          <el-select v-model="form.permission" placeholder="请选择角色权限" multiple>
            <el-option
              v-for="(item,index) in userPermissionList"
              :key="index"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPermissionVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="savePermission()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  page,
  del,
  reset,
  noAccount,
  addRole,
  saveRolePermission,
  userRole,
  getOrgType,
  getOrgList
} from '@/api/base/user'
import { allRole } from '@/api/base/role'

import allPeoples from '@/components/peoples/choicePeoples'

export default {
  name: 'UserPage',
  components: {
    allPeoples
  },
  data() {
    return {
      dialogUserVisible: false,
      filterText: '',
      tableKey: 0,
      list: null, // 已添加用户
      total: null, // 总数
      userTotal: null,
      listLoading: true,
      selectList: [],
      userSelectList: [],
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {}
      },
      userQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {}
      },
      userList: null,
      form: {
        permission: []
      },
      dialogFormVisible: false,
      dialogPermissionVisible: false,
      userPermissionList: [],
      userPermissionLists: [],
      options: {
        uid: null,
        userRole: null,
        allRole: null
      },
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      rules: {
        permission: [
          {
            required: true,
            message: '请选择角色权限',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {
    filterText(val) {
      this.userQuery.params.name = val
    }
  },
  created() {
    this.getList()
    // this.getUserPermissionList();
  },
  methods: {
    getUserPermissionList() {
      allRole().then((res) => {
        this.userPermissionList = res.data.map(function(item) {
          return { id: item.id, name: item.name }
        })
        this.userTotal = res.data.totalElements
        this.listLoading = false
      })
    },
    getUserExpectList() {
      noAccount(this.userQuery).then((res) => {
        this.userList = res.data.content
      })
    },
    handleSelectionChange(val) {
      this.selectList = val.map(function(item) {
        return item.id
      })
    },
    // handleUserSelectionChange(val) {
    //   this.userSelectList = val.map(function (item) {
    //     return item.id;
    //   });
    // },
    createUser() {
      addRole(this.userSelectList.join(',')).then((res) => {
        this.dialogUserVisible = false
        this.getList()
      })
    },
    handleUserFilter() {
      if (this.userQuery.params.name === '') {
        this.$message.error('请输入需要搜索的有效数据')
        return
      }
      this.getUserExpectList()
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList()
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
    handleUserSizeChange(val) {
      this.userQuery.pageSize = val
      this.getUserExpectList()
    },
    handleUserCurrentChange(val) {
      this.userQuery.pageNo = val
      this.getUserExpectList()
    },
    handleAddRole() {
      this.dialogUserVisible = true
      this.userQuery.params.name = ''
      this.userSelectList = []
      // this.$nextTick(() => {
      //   this.getUserExpectList();
      //   this.$refs.multipleTable.clearSelection();
      // });
    },
    handleDelete(ids) {
      if (ids !== undefined) {
        this.selectList = [ids]
      }

      if (this.selectList.length === 0) {
        this.$message.error('请选择有效数据')
        return
      }
      this.deleteUser()
    },
    // 删除行数据
    deleteUser() {
      this.$confirm('确认删除所选用户？').then(() => {
        del(this.selectList).then(() => {
          this.getList()
          this.selectList = []
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    // 查看行数据
    handleView(row) {
      this.form = Object.assign({}, row)
      this.viewDetail = true
    },

    handleReset(ids) {
      if (ids !== undefined) {
        this.selectList = [ids]
      }
      if (this.selectList.length === 0) {
        this.$message.error('请选择有效数据')
        return
      }
      this.resetUser()
    },
    resetUser() {
      this.$confirm('确认重置密码？').then(() => {
        reset(this.selectList.join(',')).then(() => {
          this.getList()
          this.selectList = []
          this.$notify({
            title: '成功',
            message: '重置成功',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    async handlePermission(row) {
      const resId = await getOrgType(row.employee.orgId)
      const reslist = await getOrgList(resId.data.orgType)
      this.userPermissionList = reslist.data
      // console.log(this.userPermissionList)
      // this.userPermissionList = res.data.map(function(item) {
      //   return { id: item.id, name: item.name };
      // });
      const resNoworg = await userRole(row.id)
      this.form.permission = resNoworg.data.userRole
      this.selectList = [row.id]
      // console.log(resNoworg.data)
      // console.log(reslist.data);
      // console.log(resNoworg.data);

      // const uid = row.id
      // userRole(uid).then(res => {
      //   this.userPermissionLists = res.data.userRole
      //   this.userPermissionList.forEach(function(item, index) {

      //   })
      // })
      // if (row !== undefined) {
      //   this.selectList = [row.id]
      //   row.roles.forEach((item) => {
      //     this.form.permission.push(item.id)
      //   })
      // }
      // if (this.selectList.length === 0) {
      //   this.$message.error('请选择有效数据')
      //   return
      // }
      this.dialogPermissionVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    clear() {
      this.form.permission.splice(0)
      this.userPermissionList.splice(0)
    },
    savePermission() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          saveRolePermission(
            this.form.permission.join(','),
            this.selectList.join(',')
          ).then(() => {
            this.dialogPermissionVisible = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '授权成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    getPeoplesArr(e) {
      this.userSelectList = e
    }
  }
}
</script>
<style scoped>
.switchStyle {
  margin-right: 0;
}
</style>
