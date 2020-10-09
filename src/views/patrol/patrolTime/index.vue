<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <!--操作按钮-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="时段名称：" class="filter-item">
            <el-input
              v-model="listQuery.params.timeName"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入时段名称"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="是否启用: " class="filter-item" style="margin:0 40px">
            <el-radio-group v-model="listQuery.params.enable">
              <el-radio v-for="(item,index) in sfqyList" :key="index" :label="item.key">{{ item.value }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="时段类型 : " class="filter-item" :span="12">
            <el-select
              v-model="listQuery.params.timeType"
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
        <el-table-column label="时段ID" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.timeName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="时段名称">
          <template slot-scope="scope">
            <span>{{ scope.row.timeName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="时段类型" :formatter="qtimeTypeformat" prop="timeType" />
        <!-- <el-table-column align="center" label="时段频度" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.timeMonth }}</span>
          </template>
        </el-table-column> -->
        <el-table-column label="开始时间" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.timeBegin }}</span>
          </template>
        </el-table-column>
        <el-table-column label="结束时间" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.timeEnd }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="时段描述" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.timeDesc }}</span>
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
            <span>{{ scope.row.createTime }}</span>
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
    <!--新增修改巡更项目 对话框-->
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
                <el-form-item label="时段名称：" prop="timeName">
                  <el-input v-model="dataForm.timeName" class="form-item1" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="时段类型 : " class="filter-item" prop="timeType">
                  <el-select
                    v-model="dataForm.timeType"
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
                <el-form-item label="是否启用: " class="filter-item">
                  <el-radio-group v-model="dataForm.enable">
                    <el-radio v-for="(item,index) in sfqyList" :key="index" :label="item.key">{{ item.value }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="时段选择: " class="filter-item">
                  <el-button type="primary" @click="teamVisible = true">请选择</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item label="时段描述：" prop="timeDesc">
                  <el-input
                    v-model="dataForm.timeDesc"
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

    <!--查看巡更项目 对话框-->
    <el-dialog
      class="abow_dialog"
      title="时段详情"
      :visible.sync="lookVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="750px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form ref="dataForm" :model="dataForm" label-width="130px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="时段名称：">{{ dataForm.timeName }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="时段类型：">{{ dataForm.timeType }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="启用: " class="filter-item">{{ dataForm.enable }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="所选年月: " class="filter-item">{{ dataForm.timeMonth }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="所选日期: " class="filter-item">{{ dataForm.timeCustomizeDays }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="开始时间 : " prop="timeBegin">{{ dataForm.timeBegin }}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="结束时间 : " prop="timeEnd">{{ dataForm.timeEnd }}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="执行频度 : " prop="startToEnd">
                  <span>每</span>
                  <span> {{ dataForm.timeHour }}</span>
                  <span>时</span>
                  <span> {{ dataForm.freqMin }}</span>
                  <span>分巡更一次</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="20">
                <el-form-item label="时段描述：">{{ dataForm.timeDesc }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      class="abow_dialog"
      title="时段选择"
      :visible.sync="teamVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="60%"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form ref="dataForm" :model="dataForm" :rules="timeFormrules" label-width="130px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="选择年月：" prop="timeMonth">
                  <el-row style="height:26px;">
                    <el-date-picker v-model="dataForm.timeMonth" value-format="yyyy-MM" type="month" placeholder="选择月" @change="getTimeMonth" />
                  </el-row>

                  <el-row style="height:26px">
                    <el-checkbox-group
                      v-model="yueList"
                      style="margin:10px 0 10px 30px;height:26px"
                    >
                      <el-row style="height:26px">
                        <el-checkbox label="1" />
                        <el-checkbox label="2" />
                        <el-checkbox label="3" />
                        <el-checkbox label="4" />
                        <el-checkbox label="5" />
                        <el-checkbox label="6" />
                        <el-checkbox label="7" />
                        <el-checkbox label="8" />
                        <el-checkbox label="9" />
                        <el-checkbox label="10" />
                      </el-row>
                      <el-row style="height:26px">
                        <el-checkbox label="11" />
                        <el-checkbox label="12" />
                        <el-checkbox label="13" />
                        <el-checkbox label="14" />
                        <el-checkbox label="15" />
                        <el-checkbox label="16" />
                        <el-checkbox label="17" />
                        <el-checkbox label="18" />
                        <el-checkbox label="19" />
                        <el-checkbox label="20" />
                      </el-row>
                      <el-row style="height:26px">
                        <el-checkbox label="21" />
                        <el-checkbox label="22" />
                        <el-checkbox label="23" />
                        <el-checkbox label="24" />
                        <el-checkbox label="25" />
                        <el-checkbox label="26" />
                        <el-checkbox label="27" />
                        <el-checkbox label="28" />
                        <el-checkbox v-if="esjDay" label="29" />
                        <el-checkbox v-if="sanshiDay" label="30" />
                      </el-row>
                      <el-row v-if="maxDay" style="height:26px">
                        <el-checkbox label="31" />
                      </el-row>
                    </el-checkbox-group>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top:90px">
              <el-col :span="8">
                <el-form-item label="开始时间 : " prop="timeBegin">
                  <el-time-picker
                    v-model="dataForm.timeBegin"
                    value-format="HH:mm:ss"
                    placeholder="选择开始时间"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="结束时间 : " prop="timeEnd">
                  <el-time-picker
                    v-model="dataForm.timeEnd"
                    value-format="HH:mm:ss"
                    placeholder="选择结束时间"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>

              <el-col :span="3">
                <el-form-item label="执行频度 : " prop="startToEnd" />
              </el-col>
              <el-col :span="1">
                <span style="margin: 10px 10px 0 10px;display: block;">每</span>
              </el-col>
              <el-col :span="3">
                <el-input v-model="dataForm.timeHour" type="number" class="form-item1" />
              </el-col>
              <el-col :span="1">
                <span style="margin: 10px 10px 0 10px;display: block;">时</span>
              </el-col>
              <el-col :span="3">
                <el-input v-model="dataForm.freqMin" type="number" class="form-item1" />
              </el-col>
              <el-col :span="3">
                <span style="margin: 10px 10px 0 10px;display: block;">分巡更一次</span>
              </el-col>
            </el-row>

          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="teamVisible = false">取消</el-button>
        <el-button type="primary" @click="qrTime">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getpatroltime,
  delpatroltime,
  addpatroltime,
  updatepatroltime,
  selectroltime
} from '@/api/base/patro-objManage'
import { dictBatch } from '@/api/base/dictDetail'
import cron from '@/components/cron/cron'
export default {
  name: 'PatrolTime',
  components: {
    cron
  },
  data() {
    return {
      dialogUserVisible: false, // 新增和编辑控制按钮
      lookVisible: false, // 查看详情弹框控制按钮
      tableKey: 0,
      list: null, // 已添加用户
      total: null, // 总数
      listLoading: true,
      teamVisible: false,
      esjDay: false,
      sanshiDay: true,
      maxDay: false,
      sfqyList: [],
      selectList: [],
      checkList: [],
      timeForm: {
        // timeMonth:'',//所选年月
        // timeHour:'',//小时数
        // freqMin:'',//分钟数
        // timeBegin: "",//开始时间
        // timeEnd: "", //结束时间
        // yueList: [],
      },
      teamList: [], // 班组类型
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          timeName: '',
          timeType: '',
          enable: '00'
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
      dialogFormVisible: false,
      dialogPermissionVisible: false,
      userPermissionList: [],
      userPermissionLists: [],
      dialogStatus: '',
      tkTitle: '新增时段',
      yueList: [],
      dataForm: {
        timeName: '', // 时段名称
        enable: '', // 是否启用
        timeDesc: '', // 时段描述
        timeType: '', // 时段类型
        timeMonth: this.getNowFormatMonth(), // 所选年月
        timeHour: '', // 小时数
        freqMin: '', // 分钟数
        timeBegin: '', // 开始时间
        timeEnd: '', // 结束时间
        timeCustomizeDays: '' // 所选日期
      },
      rules: {
        timeName: [
          { required: true, message: '请输入时段名称', trigger: 'blur' }
        ],
        timeType: [
          { required: true, message: '请选择时段类型', trigger: 'change' }
        ]
      },
      timeFormrules: {
        timeMonth: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        timeBegin: [
          { required: true, message: '请选择开始时间', trigger: 'change' }
        ],
        timeEnd: [
          { required: true, message: '请选择结束时间', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.getList()
    dictBatch('3023').then(res => {
      this.sfqyList = res.data['3023']
    })
    dictBatch('3027').then(res => {
      this.teamList = res.data['3027']
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

    // 解析是否开启
    qy(row) {
      let val = ''
      if (row.enable === '00') {
        val = '是'
      } else {
        val = '否'
      }
      return val
    },

    // 解析时段类型
    qtimeTypeformat(row) {
      let val = ''
      if (row.timeType === '00') {
        val = '普通'
      } else if (row.timeType === '01') {
        val = '临时'
      }
      return val
    },
    // 获取表格列表数据
    getList() {
      this.listLoading = true
      getpatroltime(this.listQuery).then((response) => {
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
      this.tkTitle = '新增路径'
      this.dataForm.timeName = ''
      this.dataForm.enable = '00'
      this.dataForm.timeDesc = ''
      this.dataForm.timeMonth = '', // 所选年月
      this.dataForm.timeHour = '', // 小时数
      this.dataForm.freqMin = '', // 分钟数
      this.dataForm.timeBegin = '', // 开始时间
      this.dataForm.timeEnd = '', // 结束时间
      this.dataForm.timeCustomizeDays = '', // 所选日期
      this.dialogUserVisible = true
    },

    handleDelete(row) {
      this.$confirm('确认删除所选记录？').then(() => {
        delpatroltime(row.id).then(() => {
          this.getList()
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
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
            addpatroltime(this.dataForm).then((res) => {
              if (res.code == 200) {
                this.dialogUserVisible = false
                this.getList()
                this.$notify.success({
                  title: '成功',
                  message: '操作成功!'
                })
              }
            })
          } else {
            updatepatroltime(this.dataForm).then((res) => {
              if (res.code == 200) {
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
    // 监听日期选择
    getTimeMonth(val) {
      const year = val.split('-')[0]
      const month = val.split('-')[1]
      const count = this.getDay(year, month - 1)
      // console.log(count)
      if (count === 31) {
        this.maxDay = true
        this.esjDay = true
        this.sanshiDay = true
      } else {
        this.maxDay = false
      }

      if (count === 29) {
        this.esjDay = true
        this.sanshiDay = false
      }

      if (count === 30) {
        this.esjDay = true
        this.sanshiDay = true
      }

      if (count === 28) {
        this.sanshiDay = false
        this.esjDay = false
      }
    },

    // 获取当前年月总天数
    getDay(year, month) {
      var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      // 如果是润年
      if (year % 4 == 0 && (year % 400 == 0 || year % 100 != 0)) {
        days[1] = 29
      }
      return days[month]
    },
    // 获取当前年月份
    getNowFormatMonth() {
      var date = new Date()
      var seperator1 = '-'
      var year = date.getFullYear()
      var month = date.getMonth() + 1 // 取当月
      var strDate = 31 // 默认设置31号
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (month > 12) {
        month = '01'
        year += 1
      }
      var currentdate = year + seperator1 + month
      return currentdate
    },
    // 确认日期选择操作
    qrTime() {
      this.dataForm.timeCustomizeDays = this.yueList.join(',')
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.teamVisible = false
        }
      })
    },
    // 查看操作
    handleView(row) {
      this.dataForm.timeName = row.timeName
      this.dataForm.enable = row.enable === '00' ? '是' : '否'
      this.dataForm.timeMonth = row.timeMonth
      this.dataForm.timeType = this.qtimeTypeformat(row)
      this.dataForm.timeDesc = row.timeDesc
      this.dataForm.timeBegin = row.timeBegin
      this.dataForm.timeEnd = row.timeEnd
      this.dataForm.timeHour = row.timeHour
      this.dataForm.freqMin = row.freqMin
      this.dataForm.timeCustomizeDays = row.timeCustomizeDays
      this.dataForm.timeDesc = row.timeDesc
      this.lookVisible = true
    },
    // 编辑操作
    handleUpdate(row) {
      console.log(row)
      this.operaType = 2
      this.tkTitle = '编辑项目'
      this.dataForm.id = row.id
      this.dataForm.timeMonth = row.timeMonth
      this.dataForm.timeName = row.timeName
      this.dataForm.enable = row.enable
      this.dataForm.timeType = row.timeType
      this.dataForm.timeDesc = row.timeDesc
      this.dataForm.timeBegin = row.timeBegin
      this.dataForm.timeEnd = row.timeEnd
      this.dataForm.timeHour = row.timeHour
      this.dataForm.freqMin = row.freqMin
      this.yueList = row.timeCustomizeDays.split(',')
      this.dialogUserVisible = true
    }
  }
}
</script>
<style scoped>
.switchStyle {
  margin-right: 0;
}

.el-checkbox {
  width: 30px;
}
</style>
