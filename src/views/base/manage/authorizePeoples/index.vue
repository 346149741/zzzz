<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>人员分级权限</span>
      </div>
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="分组名称：" class="filter-item">
            <el-input
              v-model="listQuery.params.groupName"
              type="text"
              class="filter-item"
              placeholder="请输入分组名称"
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
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column property="groupName" label="分组名称" />
        <el-table-column property="groupExpression" label="人员分组标识" />
        <el-table-column property="groupDescription" label="分组描述" />
        <el-table-column label="操作" width="220">
          <template slot-scope="scope">
            <div class="t-col-operate">
              <i class="el-icon-user primary table-i" title="人员" @click="addpeoples(scope.row.id)" />
              <i class="el-icon-s-tools info table-i" title="权限" @click="quanxian(scope.row.id)" />
              <i class="el-icon-tickets primary table-i" title="详情" @click="details(scope.row.id)" />
              <i
                class="el-icon-edit-outline warning table-i"
                title="编辑"
                @click="handleCreate(2,scope.row.id)"
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
                <el-form-item label="分组标识：" prop="groupExpression">
                  <el-select
                    v-model="ruleForm.groupExpression"
                    class="form-item1"
                    placeholder="请选择分组标识"
                  >
                    <el-option label="内部人员" value="内部人员" />
                    <el-option label="工作人员" value="工作人员" />
                    <el-option label="访客" value="访客" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="分组描述：" prop="groupDescription">
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
      title="人员分组权限详情"
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
                <el-form-item label="分组名称：">{{ ruleForm.groupName }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="分组标识：">{{ ruleForm.groupExpression }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="24">
                <el-form-item label="分组描述：">{{ ruleForm.groupDescription }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="dialog-item-title">权限信息</div>
        <div class="dialog-table">
          <el-table
            v-loading="listLoading"
            stripe
            :data="peoplespowerlist"
            class="t-bd"
            fit
            highlight-current-row
          >
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column property="a" label="时段权限">
              <template slot-scope="scope">
                <template v-if="scope.row.visitTimeStatus=='1'">不限</template>
                <template v-else>{{ scope.row.startTime }}-{{ scope.row.endTime }}</template>
              </template>
            </el-table-column>
            <el-table-column label="区域权限">
              <template slot-scope="scope">
                <template v-if="scope.row.visitAreaStatus=='1'">不限</template>
                <template v-else-if="scope.row.visitAreaStatus=='2'">许可</template>
                <template v-else-if="scope.row.visitAreaStatus=='3'">除外</template>
              </template>
            </el-table-column>
            <el-table-column property="areaName" label="区域" />
            <el-table-column label="操作" width="50">
              <template slot-scope="scope">
                <div class="t-col-operate">
                  <i
                    class="el-icon-delete danger table-i"
                    title="删除"
                    @click="delcarspower(scope.row.groupId,scope.row.id)"
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
      title="人员分组授权"
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
            :data="peoplespowerlist"
            class="t-bd"
            fit
            highlight-current-row
          >
            <el-table-column type="index" label="序号" width="50" />
            <el-table-column property="a" label="时段权限">
              <template slot-scope="scope">
                <template v-if="scope.row.visitTimeStatus=='1'">不限</template>
                <template v-else>{{ scope.row.startTime }}-{{ scope.row.endTime }}</template>
              </template>
            </el-table-column>
            <el-table-column label="区域权限">
              <template slot-scope="scope">
                <template v-if="scope.row.visitAreaStatus=='1'">不限</template>
                <template v-else-if="scope.row.visitAreaStatus=='2'">许可</template>
                <template v-else-if="scope.row.visitAreaStatus=='3'">除外</template>
              </template>
            </el-table-column>
            <el-table-column property="areaName" label="区域" />
            <el-table-column label="操作" width="50">
              <template slot-scope="scope">
                <div class="t-col-operate">
                  <i
                    class="el-icon-delete danger table-i"
                    title="删除"
                    @click="delcarspower(scope.row.groupId,scope.row.id)"
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
      @close="clearpeoplespowerdata"
    >
      <div class="dialog-item">
        <el-form ref="ruleForm" label-width="100px">
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="访问时段：">
                <el-radio v-model="peoplespowerdata.visitTimeStatus" label="1">不限</el-radio>
                <el-radio v-model="peoplespowerdata.visitTimeStatus" label="2">许可</el-radio>
              </el-form-item>
              <el-form-item v-if="peoplespowerdata.visitTimeStatus=='2'" label>
                <el-time-picker
                  v-model="value1"
                  is-range
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  placeholder="选择时间范围"
                  value-format="HH:mm:ss"
                />
              </el-form-item>
              <el-form-item label="访问区域：">
                <el-radio v-model="peoplespowerdata.visitAreaStatus" label="1">不限</el-radio>
                <el-radio v-model="peoplespowerdata.visitAreaStatus" label="2">许可</el-radio>
                <el-radio v-model="peoplespowerdata.visitAreaStatus" label="3">除外</el-radio>
              </el-form-item>
              <el-form-item v-if="peoplespowerdata.visitAreaStatus!='1'" label>
                <el-cascader ref="tree" :options="quyudata" :props="props" clearable />
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
      title="人员信息"
      :visible.sync="dialog5"
      :close-on-click-modal="false"
      width="1200px"
    >
      <div class="dialog-item">
        <div class="filter-container">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="姓名：" class="filter-item">
              <el-input
                v-model="peoplesGroupQuery.params.name"
                type="text"
                class="filter-item"
                placeholder="请输入姓名"
              />
            </el-form-item>
            <el-form-item label="人员类型：" class="filter-item">
              <el-select
                v-model="peoplesGroupQuery.params.staffTypeId"
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
            <el-form-item label="军衔：" class="filter-item">
              <el-select
                v-model="peoplesGroupQuery.params.militaryRankId"
                class="form-item"
                placeholder="请选择军衔"
              >
                <el-option
                  v-for="(item,key) in ranksList"
                  :key="key"
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
              >{{ $t('table.search') }}</el-button>
              <el-button class="filter-item btn-base filter-add-btn" @click="add">添加</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table stripe :data="peoplesGrouplist" class="t-bd" fit highlight-current-row>
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column property="code" label="编号" />
          <el-table-column property="name" label="姓名" />
          <el-table-column property="sex" label="性别" />
          <el-table-column property="idNo" label="身份证号码" />
          <el-table-column property="staffType" label="人员类型" />
          <el-table-column property="militaryTime" label="入伍时间" />
          <el-table-column property="militaryRank" label="军衔" />
          <el-table-column property="job" label="职务" />
          <!-- <el-table-column property="c" label="所属机构"></el-table-column> -->
          <el-table-column label="操作" width="50">
            <template slot-scope="scope">
              <div class="t-col-operate">
                <i class="el-icon-delete danger table-i" title="删除" @click="delpeoples(scope.row.id)" />
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination-container">
          <el-pagination
            background
            :current-page="peoplesGroupQuery.pageNo"
            :page-sizes="[10,20,30, 50]"
            :page-size="peoplesGroupQuery.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="peoplestotal"
            @size-change="handleSizeChange2"
            @current-change="handleCurrentChange2"
          />
        </div>
      </div>
    </el-dialog>
    <allPeoples ref="peopleSelect" :msg="msg" @peopleSelect="peopleSelect" />

    <!-- <el-dialog class="abow_dialog" width="80%" title="新增用户" :visible.sync="dialog6" left>
      <div class="dialog-content">
        <allPeoples :msg="1" @getPeoplesArr="getPeoplesArr" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog6 = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialog6 = false">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>-->
  </div>
</template>
<script>
import allPeoples from '@/components/peoples/choicePeoples'
import { dictBatch } from '@/api/base/dictDetail'
import {
  peoplespage,
  peoplesave,
  peoplesput,
  peoplesget,
  peoplesdel,
  peoplespower,
  addpeoplespower,
  peoplespowerdel,
  peoplesgrouppage,
  addpeoples,
  delpeoples
} from '@/api/base/authorize'
import { registertree } from '@/api/base/region'
import { delchildren } from '@/utils/index'
export default {
  components: {
    allPeoples
  },
  data() {
    return {
      value1: ['08:00:00', '20:00:00'],
      quyudata: [],
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {}
      },
      peoplesGroupQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          groupId: '',
          name: '',
          militaryRankId: '',
          staffTypeId: ''
        }
      },
      peoplespowerdata: {
        areaId: '',
        areaName: '',
        endTime: '',
        groupId: '',
        startTime: '',
        visitAreaStatus: '1',
        visitTimeStatus: '1'
      },
      list: [],
      peoplesGrouplist: [],
      peoplespowerlist: [],
      ruleForm: {
        groupName: '',
        groupExpression: '',
        groupDescription: ''
      },
      rules: {
        groupName: [{
          required: true,
          message: '请填写分组名称',
          trigger: 'blur'
        }],
        groupExpression: [{
          required: true,
          message: '请选择分组标识',
          trigger: 'blur'
        }]
      },
      total: null, // 总数
      peoplestotal: null,
      listLoading: false,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      dialog5: false,
      dialog6: false,
      poptit: '新增人员分组',
      userSelectList: [],
      props: {
        multiple: true,
        checkStrictly: true,
        label: 'areaName',
        value: 'id'
      },
      ranksList: [],
      peoplestypeList: [],
      msg: {
        type: 'radio // checkbox',
        id: '',
        idArr: []
      }
    }
  },
  created() {
    this.getList()
    dictBatch(['3001', '3002']).then(res => {
      this.ranksList = res.data['3002']
      this.peoplestypeList = res.data['3001']
    })
  },
  methods: {
    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList()
    },
    handleCreate(e) {
      this.dialog1 = true
      if (e === 1) {
        this.poptit = '新增人员分组'
      } else {
        this.poptit = '编辑人员分组'
        this.getdetails(id)
      }
    },
    add() {
      // this.teamVisible = true
      this.$refs.peopleSelect.open()
    },
    getList() {
      this.listLoading = true
      peoplespage(this.listQuery).then((response) => {
        this.list = response.data.content
        this.total = response.data.totalElements
        this.listLoading = false
      })
    },
    clearruleForm() {
      this.$refs['ruleForm'].clearValidate()
      this.ruleForm = {
        groupName: '',
        groupExpression: '',
        groupDescription: ''
      }
    },
    clearpeoplespowerdata() {
      this.value1 = ['08:00:00', '20:00:00']
      this.peoplespowerdata = {
        areaId: '',
        areaName: '',
        endTime: '',
        groupId: '',
        startTime: '',
        visitAreaStatus: '1',
        visitTimeStatus: '1'
      }
    },
    subgroup() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          let isclick = true
          if (isclick) {
            isclick = false
            if ((this.poptit === '新增人员分组')) {
              peoplesave(this.ruleForm).then((response) => {
                isclick = true
                this.dialog1 = false
                this.getList()
              })
            } else {
              peoplesput(this.ruleForm).then((response) => {
                isclick = true
                this.dialog1 = false
                this.getList()
              })
            }
          }
        }
      })
    },
    delpeoplespower(a, b) {
      this.$confirm('确认删除？').then(() => {
        peoplespowerdel(a, b).then(() => {
          this.getpeoplespower(a)
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
        })
      })
    },
    delitem(id) {
      this.$confirm('确认删除？').then(() => {
        peoplesdel(id).then(() => {
          this.getList()
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
        })
      })
    },
    details(id) {
      this.dialog2 = true
      this.getdetails(id)
      this.getpeoplespower(id)
    },
    delpeoples(a) {
      this.$confirm('确认删除？').then(() => {
        const b = this.peoplesGroupQuery.params.groupId
        delpeoples(b, a).then((response) => {
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
          this.getpeoplesgrouppage()
        })
      })
    },
    getdetails(id) {
      peoplesget(id).then((response) => {
        this.ruleForm = response.data
      })
    },
    quanxian(id) {
      this.dialog3 = true
      this.peoplespowerdata.groupId = id
      this.getpeoplespower(id)
    },
    addregion() {
      this.getTree()
      this.dialog4 = true
    },
    getpeoplespower(id) {
      peoplespower(id).then((response) => {
        this.peoplespowerlist = response.data
      })
    },
    addpeoples(id) {
      console.log(id)
      this.peoplesGroupQuery.params.groupId = id
      this.dialog5 = true
      this.getpeoplesgrouppage()
    },
    peopleSelect(e) {
      this.userSelectList = e
      console.log()
      const data = {}
      data.ids = this.userSelectList.map((item) => {
        return item.id
      })
      data.groupId = this.peoplesGroupQuery.params.groupId
      addpeoples(data.ids, data.groupId).then((response) => {
        this.getpeoplesgrouppage()
        this.$notify.success({
          title: '成功',
          message: '添加成功'
        })
      })
    },
    getpeoplesgrouppage() {
      peoplesgrouppage(this.peoplesGroupQuery).then((response) => {
        this.peoplesGrouplist = response.data.content
        this.peoplestotal = response.data.totalElements
      })
    },
    getTree() {
      registertree().then((response) => {
        this.quyudata = delchildren(response.data)
      })
    },
    subpower() {
      if (this.peoplespowerdata.visitTimeStatus == '2') {
        this.peoplespowerdata.startTime = this.value1[0]
        this.peoplespowerdata.endTime = this.value1[1]
      }
      if (this.peoplespowerdata.visitAreaStatus != '1') {
        const arr = this.$refs.tree.getCheckedNodes()
        if (arr.length > 0) {
          this.peoplespowerdata.areaId = arr.map((item) => {
            return item.value
          }).join(',')
          this.peoplespowerdata.areaName = arr.map((item) => {
            return item.label
          }).join(',')
        } else {
          this.$notify.warning({
            title: '警告',
            message: '请选择访问区域'
          })
        }
      }
      console.log(this.peoplespowerdata)
      addpeoplespower(this.peoplespowerdata).then((response) => {
        this.getpeoplespower(this.peoplespowerdata.groupId)
        this.$notify.success({
          title: '成功',
          message: '添加成功'
        })
        this.dialog4 = false
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
    handleSizeChange2(val) {
      this.peoplesGroupQuery.pageSize = val
      this.getpeoplesgrouppage()
    },
    handleCurrentChange2(val) {
      this.peoplesGroupQuery.pageNo = val
      this.getpeoplesgrouppage()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
