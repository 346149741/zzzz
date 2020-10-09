<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--字典类别-->
      <el-col :span="12">
        <el-card class="box-card app-body">
          <div slot="header" class="clearfix">
            <span>字典类别</span>
          </div>
          <!--搜索条件-->
          <div class="filter-container">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="字典项名称：" class="filter-item">
                <el-input
                  v-model="listQuery.params.name"
                  style="width: 340px;"
                  prefix-icon="el-icon-search"
                  class="filter-item mr10"
                  placeholder="请输入字典项名称"
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
                  type="primary"
                  icon="mr10 iconfont iconxinzengh"
                  @click="dictTypeAdd"
                >{{ $t('table.add') }}</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!--分页内容-->
          <el-table
            :key="dictTypeTableKey"
            v-loading="dictTypeListLoading"
            stripe
            :data="dictTypeList"
            class="t-bd"
            fit
            @row-click="findDictItemList"
          >
            <el-table-column align="center" label="序号" width="50px">
              <template slot-scope="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="字典类别标识" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>
            <el-table-column label="字典类别名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="描述" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.remark }}</span>
              </template>
            </el-table-column>
            <el-table-column label="系统内置" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.sys?'是':'否' }}</span>
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
                  <!-- <el-button
                    size="mini"
                    icon="el-icon-edit-outline"
                    class="operatefont iconbianjib"
                    @click="updateDictType(scope.row)"
                  >编辑</el-button>-->
                  <i
                    class="el-icon-edit-outline warning table-i"
                    title="编辑"
                    @click="updateDictType(scope.row)"
                  />
                  <!-- <el-button
                    size="mini"
                    icon="el-icon-delete"
                    class="operatefont iconshanchub"
                    @click="deleteDictType(scope.row)"
                  >删除</el-button>-->
                  <i
                    class="el-icon-delete danger table-i"
                    title="删除"
                    @click="deleteDictType(scope.row)"
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
              :total="dictTypeTotal"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-card>
      </el-col>
      <!--字典项目-->
      <el-col :span="12">
        <el-card class="box-card app-body">
          <div slot="header" class="clearfix">
            <span>字典详情</span>
          </div>
          <!--搜索条件-->
          <div class="filter-container">
            <el-button
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconxinzengh"
              @click="dictItemAdd"
            >{{ $t('table.add') }}</el-button>
          </div>

          <!--分页内容-->
          <el-table
            :key="dictItemTableKey"
            v-loading="dictItemListLoading"
            stripe
            :data="dictItemList"
            class="t-bd"
            fit
          >
            <el-table-column align="center" label="排序" width="50px" draggable="true">
              <template slot-scope="scope">
                <i
                  class="iconfont icontuozhuai move"
                  draggable="true"
                  @dragstart="handleEdit(scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column align="center" label="序号" width="50px" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="编码" width="80px" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>
            <el-table-column label="名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="值" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.value }}</span>
              </template>
            </el-table-column>
            <el-table-column label="说明" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.remark }}</span>
              </template>
            </el-table-column>
            <!--<el-table-column align="center" label="启用">-->
            <!--<template slot-scope="scope">-->
            <!--<span>{{ scope.row.enable?'启用':'禁用' }}</span>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column
              align="center"
              :label="$t('table.actions')"
              class-name="small-padding fixed-width"
              fixed="right"
              width="240px"
            >
              <template slot-scope="scope">
                <div class="t-col-operate">
                  <el-switch
                    v-model="scope.row.enable"
                    class="switchStyle"
                    style="margin-right: 10px;"
                    active-text="启用"
                    inactive-text="禁用"
                    @change="doDictItemEnable(scope.row)"
                  />
                  <!-- <el-button
                    size="mini"
                    icon="el-icon-edit-outline"
                    class="operatefont iconbianjib"
                    @click="updateDictItem(scope.row)"
                  >编辑</el-button> -->
                  <i
                    class="el-icon-edit-outline warning table-i"
                    title="编辑"
                    @click="updateDictItem(scope.row)"
                  />
                  <!-- <el-button
                    size="mini"
                    icon="el-icon-delete"
                    class="operatefont iconshanchub"
                    @click="deleteDictItem(scope.row)"
                  >删除</el-button> -->
                  <i
                    class="el-icon-delete danger table-i"
                    title="删除"
                    @click="deleteDictItem(scope.row)"
                  />
                  <!--<el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                    <i class="iconfont iconbianjih" @click="updateDictItem(scope.row)" />
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
                    <i class="iconfont iconshanchuh warn" @click="deleteDictItem(scope.row)" />
                  </el-tooltip>-->
                </div>

                <!--<el-button-group>
                  <el-button type="primary" size="mini" icon="el-icon-edit" @click="updateDictItem(scope.row)">{{
                    $t('table.edit') }}
                  </el-button>
                  <el-button type="primary" size="mini" icon="el-icon-edit" @click="doDictItemEnable(scope.row)">
                    {{ !scope.row.enable?'启用':'禁用'}}
                  </el-button>
                  <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteDictItem(scope.row.id)">{{
                    $t('table.delete') }}
                  </el-button>
                </el-button-group>-->
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <!--字典项新增/修改弹出层-->
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dictTypeDialogVisible"
      style="width: 900px ;height:800px; margin: 0 auto"
    >
      <div class="dialogBox">
        <el-form
          ref="dictTypeForm"
          :rules="dictTypeRules"
          :model="dictTypeForm"
          label-position="left"
          label-width="100px"
        >
          <el-form-item label="类别标识" prop="code">
            <el-input v-model="dictTypeForm.code" placeholder="请输入字典类别标识" />
          </el-form-item>
          <el-form-item label="类别名称" prop="name">
            <el-input v-model="dictTypeForm.name" placeholder="请输入字典类别名称" />
          </el-form-item>
          <el-form-item label="描述" prop="remark">
            <el-input v-model="dictTypeForm.remark" placeholder="请输入描述" />
          </el-form-item>
          <el-form-item label="系统内置">
            <div class="t-row-operate">
              <el-switch
                v-model="dictTypeForm.sys"
                class="switchStyle"
                active-color="#42B983"
                inactive-color="#A2A9BA"
                active-text="是"
                inactive-text="否"
              />
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dictTypeDialogVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          v-if="dialogStatus=='create'"
          type="primary"
          @click="doDictTypeAdd"
        >{{ $t('table.confirm') }}</el-button>
        <el-button v-else type="primary" @click="doDictTypeUpdate">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <!--字典详情新增/修改弹出层-->
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dictItemDialogVisible"
      left
      style=" margin: 0 auto"
      width="500px"
    >
      <div class="dialogBox">
        <el-form
          ref="dictItemForm"
          :rules="dictItemRules"
          :model="dictItemForm"
          label-position="right"
          label-width="100px"
        >
          <el-form-item label="字典类别">
            <el-input v-model="dictItemForm.pName" :disabled="true" />
          </el-form-item>
          <el-form-item label="编码" prop="code">
            <el-input v-model="dictItemForm.code" placeholder="请输入字典编码" />
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="dictItemForm.name" placeholder="请输入字典名称" />
          </el-form-item>
          <el-form-item label="值" prop="value">
            <el-input v-model="dictItemForm.value" placeholder="请输入字典值" />
          </el-form-item>
          <el-form-item label="说明" prop="remark">
            <el-input v-model="dictItemForm.remark" placeholder="请输入备注" />
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input-number v-model="dictItemForm.sort" placeholder="请输入排序" :min="0" />
          </el-form-item>
          <el-form-item label="启用禁用" prop="enable">
            <div class="t-row-operate">
              <el-switch
                v-model="dictItemForm.enable"
                class="switchStyle"
                active-color="#42B983"
                inactive-color="#A2A9BA"
                active-text="启用"
                inactive-text="禁用"
              />
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dictItemDialogVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          v-if="dialogStatus=='create'"
          type="primary"
          @click="doDictItemAdd"
        >{{ $t('table.confirm') }}</el-button>
        <el-button v-else type="primary" @click="doDictItemUpdate">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  dictTypePage,
  dictTypeCreate,
  dictTypeUpdate,
  dictTypeDel,
  checkDictTypeCode,
  findDictItemList,
  dictItemCreate,
  dictItemUpdate,
  dictItemDel,
  checkDictItemCode,
  dictItemSort,
  dictItemEnable
} from '@/api/base/dict'
import Sortable from 'sortablejs'
export default {
  name: 'DictPage',
  data() {
    const validateDictTypeCode = (rule, value, callback) => {
      checkDictTypeCode(this.dictTypeForm.id, value).then((response) => {
        if (response.data) {
          callback(new Error('字典类别标识重复'))
        } else {
          callback()
        }
      })
    }
    const validateDictItemCode = (rule, value, callback) => {
      checkDictItemCode(
        value,
        this.dictItemForm.id,
        this.checkedDictTypeCode
      ).then((response) => {
        if (response.data) {
          callback(new Error('字典编码重复'))
        } else {
          callback()
        }
      })
    }
    return {
      flag: true,
      dictTypeTableKey: 0,
      dictItemTableKey: 1,
      dictTypeList: null,
      dictItemList: null,
      dictTypeTotal: null,
      dictTypeListLoading: true,
      dictItemListLoading: false,
      checkedDictTypeCode: null,
      checkedDictTypeName: null,
      filterText: '',
      listQuery: {
        pageNo: 1,
        pageSize: 20,
        params: {}
      },
      dictTypeForm: {
        code: '',
        name: undefined,
        remark: '',
        sys: true,
        id: undefined
      },
      dictItemForm: {
        pName: '',
        id: undefined,
        name: undefined,
        code: undefined,
        value: '',
        remark: undefined,
        enable: true,
        sort: 0
      },
      dictTypeDialogVisible: false,
      dictItemDialogVisible: false,
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
      dictTypeRules: {
        code: [
          { required: true, message: '请填写字典类别标识符', trigger: 'blur' },
          { validator: validateDictTypeCode, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请填写字典项类别别名', trigger: 'blur' }
        ]
      },
      dictItemRules: {
        code: [
          { required: true, message: '请填写字典类别标识码', trigger: 'blur' },
          { validator: validateDictItemCode, trigger: 'blur' }
        ],
        value: [
          { required: true, message: '请填写字典详情值', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请填写字典详情名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.dictTypePage()
  },
  mounted() {
    const el = document.querySelectorAll(
      '.el-table__body-wrapper > table > tbody'
    )[1]
    const sortable = Sortable.create(el, {
      onEnd: (evt) => {
        // 监听拖动结束事件
        const proId = this.id // 就是我们上面获取到当前行的id值
        const oldIndex = evt.oldIndex // 当前行的被拖拽前的顺序
        const newIndex = evt.newIndex // 当前行的被拖拽后的顺序

        if (oldIndex > newIndex) {
          this.dictItemList.splice(newIndex, 0, this.dictItemList[oldIndex])
          this.dictItemList.splice(oldIndex + 1, 1)
        } else {
          this.dictItemList.splice(
            newIndex + 1,
            0,
            this.dictItemList[oldIndex]
          )
          this.dictItemList.splice(oldIndex, 1)
        }
        const ids = this.dictItemList.map((item) => {
          return item.id
        })
        dictItemSort(ids).then(() => {
          this.dictItemList = []
          this.refreshDictItemList()
        })
      }
    })
  },
  methods: {
    handleEdit(val) {
      this.id = val.id // 这里就是当前拖动行的值，把需要的值赋值给你之前定义好的就可以了
    },
    dictTypePage() {
      this.dictTypeListLoading = true
      dictTypePage(this.listQuery).then((response) => {
        this.dictTypeList = response.data.content
        this.dictTypeTotal = response.data.totalElements
        this.dictTypeListLoading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.dictTypePage()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.dictTypePage()
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      this.dictTypePage()
    },
    resetDictTypeForm() {
      this.dictTypeForm = {
        code: '',
        name: undefined,
        remark: '',
        sys: true,
        id: undefined
      }
    },
    resetDictItemForm() {
      this.dictItemForm = {
        pName: '',
        id: undefined,
        name: undefined,
        code: undefined,
        remark: undefined,
        enable: true,
        sort: 0
      }
    },
    dictTypeAdd() {
      this.resetDictTypeForm()
      this.dialogStatus = 'create'
      this.dictTypeDialogVisible = true
      this.$nextTick(() => {
        this.$refs['dictTypeForm'].clearValidate()
      })
    },
    doDictTypeAdd() {
      this.$refs['dictTypeForm'].validate((valid) => {
        if (valid) {
          dictTypeCreate(this.dictTypeForm).then(() => {
            this.dictTypeDialogVisible = false
            this.dictTypePage()
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    doDictTypeUpdate() {
      this.$refs['dictTypeForm'].validate((valid) => {
        if (valid) {
          dictTypeUpdate(this.dictTypeForm).then(() => {
            this.dictTypeDialogVisible = false
            this.dictTypePage()
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
    updateDictType(row) {
      const flag = row.sys
      if (flag === true) {
        this.$notify({
          title: '失败',
          message: '系统预制不可更改',
          type: 'error',
          duration: 2000
        })
        return
      }
      this.dictTypeForm = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dictTypeDialogVisible = true
      this.$nextTick(() => {
        this.$refs['dictTypeForm'].clearValidate()
      })
    },
    deleteDictType(row) {
      const flag = row.sys
      if (flag === true) {
        this.$notify({
          title: '失败',
          message: '系统预制不可删除',
          type: 'error',
          duration: 2000
        })
        return
      }
      const id = row.id
      this.$confirm('确认删除？').then(() => {
        dictTypeDel(id).then(() => {
          this.checkedDictTypeCode = null
          this.dictTypePage()
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    findDictItemList(row, event, column) {
      this.checkedDictTypeCode = row.code
      this.checkedDictTypeName = row.name
      this.refreshDictItemList()
    },
    dictItemAdd() {
      // 提示至少选择一个字典项
      if (
        this.checkedDictTypeCode === undefined ||
        this.checkedDictTypeCode === '' ||
        this.checkedDictTypeCode === null
      ) {
        this.$notify({
          title: '提示',
          message: '请选择左侧字典项',
          type: 'error',
          duration: 2000
        })
        return
      }
      this.resetDictItemForm()
      this.dictItemForm.pName = this.checkedDictTypeName
      this.dialogStatus = 'create'
      this.dictItemDialogVisible = true
      this.$nextTick(() => {
        this.$refs['dictItemForm'].clearValidate()
      })
    },
    updateDictItem(row) {
      const flag = row.sys
      if (flag === true) {
        this.$notify({
          title: '失败',
          message: '系统预制不可更改',
          type: 'error',
          duration: 2000
        })
        return
      }
      this.dictItemForm = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dictItemDialogVisible = true
      this.dictItemForm.pName = this.checkedDictTypeName
      this.$nextTick(() => {
        this.$refs['dictItemForm'].clearValidate()
      })
    },
    doDictItemAdd() {
      this.$refs['dictItemForm'].validate((valid) => {
        if (valid) {
          this.dictItemForm['typeCode'] = this.checkedDictTypeCode
          dictItemCreate(this.dictItemForm).then(() => {
            this.dictItemDialogVisible = false
            this.refreshDictItemList()
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    doDictItemUpdate() {
      this.$refs['dictItemForm'].validate((valid) => {
        if (valid) {
          dictItemUpdate(this.dictItemForm).then(() => {
            this.dictItemDialogVisible = false
            this.refreshDictItemList()
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
    doDictItemEnable(row) {
      dictItemEnable(row.id).then((res) => {
        this.$notify.success({
          title: '成功',
          message: '操作成功'
        })
      })
    },
    deleteDictItem(row) {
      const flag = row.sys
      if (flag === true) {
        this.$notify({
          title: '失败',
          message: '系统预制不可删除',
          type: 'error',
          duration: 2000
        })
        return
      }
      const id = row.id
      this.$confirm('确认删除？').then(() => {
        dictItemDel(id).then(() => {
          this.refreshDictItemList()
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    refreshDictItemList() {
      this.dictItemListLoading = true
      findDictItemList(this.checkedDictTypeCode).then((response) => {
        this.dictItemList = response.data
        this.dictItemListLoading = false
      })
    }
  }
}
</script>
<style scoped>
.move {
  color: #1890ff;
  font-size: 18px;
}
</style>
