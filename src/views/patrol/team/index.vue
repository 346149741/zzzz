<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <!--操作按钮-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="班组名称：" class="filter-item">
            <el-input
              v-model="listQuery.params.className"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入班组名称"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="班组类型 : " class="filter-item" :span="12">
            <el-select
              v-model="listQuery.params.classType"
              class="filter-item"
              placeholder="请选择"
              filterable
              style="width:260px"
              @keyup.enter.native="handleFilter"
            >
              <el-option
                v-for="(item,key) in teamList"
                :key="key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="是否启用: " class="filter-item" style="margin:0 40px">
            <el-radio-group v-model="listQuery.params.enable">
              <el-radio
                v-for="(item,index) in sfqyList"
                :key="index"
                :label="item.key"
              >{{ item.value }}</el-radio>
            </el-radio-group>
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
            >新增</el-button>
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
        <!-- <el-table-column label="序号" fixed width="50px">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>-->
        <el-table-column align="center" label="班组名称">
          <template slot-scope="scope">
            <span>{{ scope.row.className }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="班组类型"
          show-overflow-tooltip
          prop="classType"
          :formatter="teamType"
        />
        <el-table-column align="center" label="班组长" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.patrol }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="班次描述" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.classDesc }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否启用" :formatter="qy" prop="enable" />
        <el-table-column align="center" label="操作人员" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.createUser }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作时间" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.createTime.slice(0, 10) }}</span>
          </template>
        </el-table-column>
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
              <i class="el-icon-delete danger table-i" title="删除" @click="handleDelete(row)" />
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
    <!--新增修改巡更班组 对话框-->
    <el-dialog
      class="abow_dialog"
      :title="tkTitle"
      :visible.sync="dialogUserVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="750px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="130px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="班组名称：" prop="className">
                  <el-input v-model="dataForm.className" class="form-item1" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="班组类型 : " class="filter-item" prop="classType">
                  <el-select
                    v-model="dataForm.classType"
                    class="filter-item"
                    placeholder="请选择"
                    style="width:100%"
                    @keyup.enter.native="handleFilter"
                  >
                    <el-option
                      v-for="(item,key) in teamList"
                      :key="key"
                      :label="item.value"
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="启用: " class="filter-item">
                  <el-radio-group v-model="dataForm.enable">
                    <el-radio
                      v-for="(item,index) in sfqyList"
                      :key="index"
                      :label="item.key"
                    >{{ item.value }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="人员选择: " class="filter-item">
                  <el-button type="primary" @click="qxz">请选择</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="setTeamShow" :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="已选中人员：" prop="personnel">
                  <el-row
                    v-for="(item,index) in dataForm.patrolClassUserVoList"
                    :key="index"
                    style="height:40px;line-height:40px;padding-left:10px: "
                  >
                    <el-col :span="8">
                      <el-radio-group v-model="yxry" @change="getInfo">
                        <el-radio :label="index">{{ item.userName }} [{{ item.deptName }}]</el-radio>
                      </el-radio-group>
                      <i
                        v-if="item.isLead=='00'"
                        class="el-icon-star-on"
                        style="color: red;position: absolute;top: 13px; left: 18px; "
                      />
                    </el-col>
                    <el-col :span="2">
                      <i class="el-icon-delete delTeam" title="删除" @click="delTeam(item,index)" />
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
              <el-col style="text-align:right;">
                <el-button
                  style="margin:0 116px 20px 0"
                  type="primary"
                  size="mini"
                  @click="setBz"
                >设为班组长</el-button>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item label="班组描述：" prop="classDesc">
                  <el-input
                    v-model="dataForm.classDesc"
                    class="form-item1"
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 8}"
                    placeholder="请输入内容"
                    maxlength="60"
                    show-word-limit
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUserVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!--查看巡更班组 对话框-->
    <el-dialog
      class="abow_dialog"
      title="查看班组信息"
      :visible.sync="lookVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="750px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form ref="lookForm" :model="lookForm" label-width="130px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="班组名称：">
                  <span v-text="lookForm.className" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="班组类型 : " class="filter-item" prop="classType">
                  <span v-text="lookForm.classType" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="启用: " class="filter-item">
                  <span v-text="lookForm.enable" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="班组人员：" prop="personnel">
                  <el-input
                    v-model="lookForm.personnel"
                    class="form-item1"
                    type="textarea"
                    disabled="disabled"
                    :autosize="{ minRows: 4, maxRows: 8}"
                    placeholder="请输入内容"
                    maxlength="60"
                    show-word-limit
                  />
                </el-form-item>
                <div style="margin-left: 26%;line-height: 51px;margin-top: -28px;">*为班组长人员</div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item label="班组描述：" prop="classDesc">
                  <el-input
                    v-model="lookForm.classDesc"
                    class="form-item1"
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 8}"
                    placeholder="请输入内容"
                    maxlength="60"
                    show-word-limit
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>

    <allPeoples ref="peopleSelect" :msg="msg" @peopleSelect="peopleSelect" />
  </div>
</template>

<script>
import {
  getList,
  addPatrolObj,
  updatePatrolObj,
  lookPatrolObj,
  delPatrolObj
} from '@/api/base/patro-team'
import allPeoples from '@/components/peoples/choicePeoples'
import { dictBatch } from '@/api/base/dictDetail'
export default {
  name: 'ObjManage',
  components: { allPeoples },
  data() {
    return {
      filterText: '',
      yxry: 0,
      zwsjShow: false,
      lookVisible: false,
      dialog6: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      setTeamShow: false,
      nodeObj: '',
      dialogUserVisible: false, // 新增和编辑控制按钮
      tableKey: 0,
      list: null, // 已添加用户
      total: null, // 总数
      listLoading: true,
      teamVisible: false,
      selectList: [],
      peoplesGroupQuery: {
        params: {

        }
      },
      sfqyList: [], // 是否启用字典
      teamList: [], // 班组类型
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          className: '',
          classType: '',
          enable: '00'
        }
      },
      msg: {
        type: 'radio // checkbox',
        id: '',
        idArr: []
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
      dialogFormVisible: false,
      dialogPermissionVisible: false,
      userPermissionList: [],
      userPermissionLists: [],
      dialogStatus: '',
      tkTitle: '新增项目',
      dataForm: {
        className: '',
        enable: '',
        classType: '',
        personnel: '',
        classDesc: '',
        isLead: '3',
        patrolClassUserVoList: []
      },
      lookForm: {
        className: '',
        enable: '',
        classType: '',
        personnel: '',
        classDesc: ''
      },
      rules: {
        className: [
          { required: true, message: '请输入班组名称', trigger: 'blur' }
        ],
        classType: [
          { required: true, message: '请选择班组类型', trigger: 'change' }
        ]
      }

    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    },
    dataForm: {
      handler(newValue, oldValue) {
        if (this.dataForm.patrolClassUserVoList.length > 0) {
          this.setTeamShow = true
        } else {
          this.setTeamShow = false
        }
      },
      deep: true
    }
  }, // 注册
  created() {
    this.getList()
    // 班组类型字典
    dictBatch('3026').then((res) => {
      this.teamList = res.data['3026']
    })
    // 是否启用字典
    dictBatch('3023').then((res) => {
      this.sfqyList = res.data['3023']
    })
  },
  methods: {
    handleSelectionChange(val) {
      this.selectList = val.map(function(item) {
        return item.id
      })
    },

    qy(row) {
      let val = ''
      if (row.enable === '00') {
        val = '是'
      } else {
        val = '否'
      }
      return val
    },
    teamType(row) {
      let val = ''
      if (row.classType === '00') {
        val = '普通'
      } else if (row.classType === '01') {
        val = '临时'
      } else if (row.classType === '02') {
        val = '预备'
      }
      return val
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList()
    },
    qxz() {
      // this.teamVisible = true
      this.$refs.peopleSelect.open()
      this.dialog6 = true
    },

    peopleSelect(e) {
      this.userSelectList = e
      if (this.operaType === 1) {
        this.dataForm.patrolClassUserVoList = []
      }
      this.userSelectList.map((item) => {
        const data = {}
        data.id = item.id
        data.userId = item.id
        data.userName = item.name
        data.deptName = item.deptName
        data.parentId = item.parentId
        this.dataForm.patrolClassUserVoList.push(data)
      })
    },

    // 获取表格列表数据
    getList() {
      this.listLoading = true
      getList(this.listQuery).then((response) => {
        for (let i = 0; i < response.data.content.length; i++) {
          if (response.data.content[i].patrolClassUserVoList.length > 0) {
            response.data.content[i].patrol = response.data.content[i].patrolClassUserVoList[0].userName
          } else {
            response.data.content[i].patrol = ''
          }
        }
        this.list = response.data.content
        // console.log(this.list)
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
      this.dataForm.patrolClassUserVoList = []
      this.operaType = 1
      this.tkTitle = '新增班组'
      this.dataForm.className = ''
      this.dataForm.enable = '00'
      this.dataForm.personnel = ''
      this.dataForm.classDesc = ''
      this.dialogUserVisible = true
    },

    handleDelete(row) {
      this.$confirm('确认删除所选记录？').then(() => {
        delPatrolObj(row.id).then(() => {
          this.getList()
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
        })
      })
    },

    // 查看班组信息
    handleView(row) {
      lookPatrolObj(row.id).then((res) => {
        this.lookForm.className = res.data.className
        this.lookForm.classType = this.teamType(res.data)
        this.lookForm.classDesc = res.data.classDesc
        this.lookForm.enable = res.data.enable === '00' ? '是' : '否'
        let str = ''
        for (let i = 0; i < res.data.patrolClassUserVoList.length; i++) {
          if (res.data.patrolClassUserVoList[i].isLead === '00') {
            res.data.patrolClassUserVoList[i].userName =
              '*' + res.data.patrolClassUserVoList[i].userName
          }
          str += res.data.patrolClassUserVoList[i].userName + ' ; '
        }

        this.lookForm.personnel = str
      })
      this.lookVisible = true
    },
    // 保存修改数据接口

    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.dataForm.patrolClassUserVoList.length > 0) {
            for (let i = 0; i < this.dataForm.patrolClassUserVoList.length; i++) {
              if (this.dataForm.patrolClassUserVoList[i].isLead === undefined) {
                this.$message({
                  message: '请设置班组长',
                  type: 'warning'
                })
                return
              }
            }
          } else {
            this.$message({
              message: '请选择班组人员',
              type: 'warning'
            })
            return
          }

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

    // 编辑操作
    handleUpdate(row) {
      this.operaType = 2
      this.tkTitle = '编辑班组'
      this.dataForm.id = row.id
      lookPatrolObj(row.id).then((res) => {
        this.dataForm.className = res.data.className
        this.dataForm.classType = res.data.classType
        this.dataForm.classDesc = res.data.classDesc
        this.dataForm.enable = res.data.enable
        this.dataForm.patrolClassUserVoList = res.data.patrolClassUserVoList
        let str = ''
        for (let i = 0; i < res.data.patrolClassUserVoList.length; i++) {
          str += res.data.patrolClassUserVoList[i].userName + ' ; '
          const obj = {}
          obj.id = res.data.patrolClassUserVoList[i].userId
          obj.label = res.data.patrolClassUserVoList[i].userName
          obj.parent_name = res.data.patrolClassUserVoList[i].deptName
          obj.isLead = res.data.patrolClassUserVoList[i].isLead
        }
        this.dataForm.personnel = str
      })
      console.log(this.dataForm.patrolClassUserVoList)
      this.dialogUserVisible = true
    },

    // 删除选中人员
    delTeam(val, index) {
      // console.log(index)
      for (let i = 0; i < this.dataForm.patrolClassUserVoList.length; i++) {
        if (val.id === this.dataForm.patrolClassUserVoList[i].id) {
          this.dataForm.patrolClassUserVoList.splice(i, 1)
        }
      }
    },

    // 监听单选框值改变
    getInfo(value) {
      this.yxry = value
    },

    // 设为班组长
    setBz() {
      const vm = this
      for (let k = 0; k < this.dataForm.patrolClassUserVoList.length; k++) {
        if (k === this.yxry) {
          vm.$set(this.dataForm.patrolClassUserVoList[k], 'isLead', '00')
        } else {
          vm.$set(this.dataForm.patrolClassUserVoList[k], 'isLead', '01')
        }
      }
    }
  }
}
</script>
<style scoped>
.switchStyle {
  margin-right: 0;
}
.delTeam{
   position: absolute;
   top: 13px;
   right: 56px;
   cursor: pointer;
}
.setTeam{
   position: absolute;
   top: 13px;
   right: 32px;
   cursor: pointer;
}
.dialog-content >>> .el-radio__label{
  margin-left: 6px;
}
</style>
