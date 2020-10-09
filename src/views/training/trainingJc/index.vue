<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <!--操作按钮-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="教材名称：" class="filter-item">
            <el-input
              v-model="listQuery.params.itemName"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入教材名称"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="教材类型 : " class="filter-item">
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
          <el-form-item label="库房 : " class="filter-item">
            <el-select
              v-model="dataForm.routeType"
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
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="管理单位 : " class="filter-item">
            <el-select
              v-model="listQuery.params.routeType"
              class="filter-item"
              placeholder="请选择"
              filterable
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
        <!-- <el-table-column label="器材编号" align="center" fixed width="150px">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="教材名称" fixed show-overflow-tooltip prop="username" />
        <el-table-column align="center" label="教材类型" prop="sex" />
        <el-table-column align="center" label="产地" prop="logins" />
        <el-table-column align="center" label="管理单位" prop="sign" />
        <el-table-column align="center" label="库房" prop="kf" />
        <el-table-column label="操作人员" align="center" prop="classify" />
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
      width="550px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="130px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="教材名称：" prop="itemName">
                  <el-input v-model="dataForm.itemName" class="form-item1" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="教材类型 : " class="filter-item">
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
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="库房 : " class="filter-item">
                  <el-select
                    v-model="dataForm.kf"
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
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item label="管理单位 : " class="filter-item">
                  <el-select
                    v-model="dataForm.routeType"
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
                      :value="item.key"
                    />
                  </el-select>
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
      title="申请教材"
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
                <el-form-item label="教材名称：" prop="itemName">
                  <el-input v-model="dataForm.itemName" class="form-item1" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="教材类型 : " class="filter-item">
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
                      :value="item.key"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="申请人：" prop="itemAdders">
                  <el-input v-model="dataForm.itemName" class="form-item1" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item label="申请人单位 : " class="filter-item">
                  <el-select
                    v-model="dataForm.routeType"
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
                      :value="item.key"
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
      title="教材详情"
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
                <el-form-item label="教材名称：">{{ lookForm.username }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="教材类型: " class="filter-item">{{ lookForm.venueType }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="产地: " class="filter-item">{{ lookForm.logins }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="客房: " class="filter-item">{{ lookForm.kf }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="管理单位: " class="filter-item">{{ lookForm.sign }}</el-form-item>
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
        'id': 10000,
        'username': '射击训练指南',
        'sex': '简易训练教材',
        'city': '城市-0',
        'sign': '三团1连',
        'kf': '仓库06',
        'experience': 255,
        'logins': '湖北武汉',
        'wealth': 82830700,
        'classify': '凌风',
        'joinTime': '2020-08-10 18:10:10',
        'score': 57
      }, {
        'id': 10001,
        'kf': '仓库02',
        'username': '跃障操作要领',
        'sex': '技术训练教材',
        'city': '城市-0',
        'sign': '三师1营2班',
        'experience': 255,
        'logins': '河南郑州',
        'wealth': 82830700,
        'classify': '小飞侠',
        'joinTime': '2020-06-06 10:20:10',
        'score': 27
      }, {
        'id': 10002,
        'kf': '仓库03',
        'username': '枪械拆解指引',
        'sex': '专业训练教材',
        'city': '城市-0',
        'sign': '后勤处',
        'experience': 255,
        'logins': '山东青岛',
        'wealth': 82830700,
        'classify': '吴云龙',
        'joinTime': '2020-06-06 10:20:10',
        'score': 31
      }, {
        'id': 10003,
        'username': '擒拿格斗技巧',
        'sex': '战术训练教材',
        'city': '城市-0',
        'sign': '作训团',
        'kf': '仓库04',
        'experience': 255,
        'logins': '河南郑州',
        'wealth': 82830700,
        'classify': '武教练',
        'joinTime': '2020-06-06 10:20:10',
        'score': 68
      }, {
        'id': 10004,
        'username': '突击训练概述',
        'sex': '战术训练教材',
        'city': '城市-0',
        'sign': '三团1连',
        'kf': '仓库08',
        'experience': 255,
        'logins': '湖北武汉',
        'wealth': 82830700,
        'classify': '凌风',
        'joinTime': '2020-06-06 10:20:10',
        'score': 6
      }, {
        'id': 10005,
        'username': '射击训练指南',
        'sex': '战术训练教材',
        'city': '城市-0',
        'kf': '仓库06',
        'sign': '三团1连',
        'experience': 255,
        'logins': '湖北武汉',
        'wealth': 82830700,
        'classify': '凌风',
        'joinTime': '2020-06-06 10:20:10',
        'score': 87
      }], // 已添加用户
      total: null, // 总数
      listLoading: true,
      selectList: [],
      kfList: [
        {
          value: '仓库01',
          label: '0'
        }, {
          value: '仓库03',
          label: '1'
        }, {
          value: '仓库05',
          label: '2'
        }, {
          value: '仓库06',
          label: '3'
        }, {
          value: '仓库02',
          label: '4'
        }],
      venueTtpe: [
        {
          value: '请选择',
          label: '0'
        }, {
          value: '简易训练教材',
          label: '1'
        }, {
          value: '制式训练教材',
          label: '2'
        }, {
          value: '人工操作教材',
          label: '3'
        }, {
          value: '自动式教材',
          label: '4'
        }, {
          value: '技术训练教材',
          label: '6'
        }, {
          value: '战术训练教材',
          label: '5'
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
          { required: true, message: '请输入器材名称', trigger: 'blur' }
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
      // this.getList()
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
      this.tkTitle = '新增教材'
      this.dataForm.itemName = ''
      this.dataForm.enable = '00'
      this.dataForm.itemDesc = ''
      this.dialogUserVisible = true
    },
    shenqing() {
      this.shenqingVisible = true
    },
    handleDelete(row) {
      this.$confirm('确认删除该教材吗?').then(() => {
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
      this.lookForm.logins = row.logins
      this.lookForm.kf = row.kf
      this.lookForm.venueType = row.sex
      this.lookVisible = true
    },
    // 编辑操作
    handleUpdate(row) {
      this.operaType = 2
      this.tkTitle = '编辑教材'
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
</style>
