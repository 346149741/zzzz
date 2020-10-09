<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>菜单管理</span>
      </div>
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <!-- <el-form-item label="系统：" class="filter-item">
            <el-select
              v-model="choseSys.value"
              class="filter-item mr10"
              placeholder="请选择"
              @change="handleSysChange"
            >
              <el-option
                v-for="(item,index) in sysItems"
                :key="index"
                :value="item.value"
                :label="item.label"
              />
            </el-select>
          </el-form-item> -->
          <el-form-item class="filter-item">
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconxinzengh"
              style="margin-right:10px"
              @click="handleCreateMenu"
            >
              新增菜单
            </el-button>
            <el-button-group class="filter-item btn-base">
              <el-button
                v-waves
                circle
                type="primary"
                icon="el-icon-arrow-down"
                @click="$refs.xTree.setAllTreeExpansion(true)"
              />
              <el-button
                v-waves
                circle
                type="primary"
                icon="el-icon-arrow-up"
                @click="$refs.xTree.clearTreeExpand()"
              />
            </el-button-group>
          </el-form-item>
        </el-form>
      </div>
      <vxe-table
        ref="xTree"
        stripe
        resizable
        highlight-hover-row
        :loading="loading"
        :tree-config="{children: 'children'}"
        :data="tableData"
      >

        >
        <vxe-table-column
          field="name"
          title="名称"
          tree-node
        >
          <template v-slot="{ row }">
            <i :class="row.icon" />
            <span>{{ row.name }}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column
          align="center"
          width="100"
          field="sort"
          title="序号"
        />
        <vxe-table-column
          align="center"
          width="100"
          field="type"
          title="是否是菜单"
        >
          <template v-slot="{ row }">
            <el-tag v-if="row.type === 0" type="success">是</el-tag>
            <el-tag v-else type="warning">否</el-tag>
          </template>
        </vxe-table-column>
        <vxe-table-column
          align="center"
          width="100"
          field="method"
          title="请求方式"
        >
          <template v-slot="{ row }">
            <el-tag v-if="row.method !== ''">{{ row.method }}</el-tag>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="code"
          title="权限标识"
        />
        <vxe-table-column
          field="url"
          title="地址"
        />
        <vxe-table-column title="操作" width="240px">
          <template v-slot="{ row }">
            <div class="t-col-operate">
              <el-switch
                v-model="row.enable"
                class="switchStyle"
                style="margin-right: 10px;"
                active-text="启用"
                inactive-text="禁用"
                @change="enable(row.id)"
              />
              <!-- <el-button size="mini" icon="el-icon-folder-add" class="operatefont iconchakanb" @click="handleSaveChild(row)">
                新增子级
              </el-button> -->
              <i class="el-icon-folder-add info table-i" title="新增子级" @click="handleSaveChild(row)" />
              <!-- <el-button size="mini" icon="el-icon-edit-outline" class="operatefont iconbianjib" @click="handleUpdate(row)">
                编辑
              </el-button> -->
              <i class="el-icon-edit-outline warning table-i" title="编辑" @click="handleUpdate(row)" />
              <!-- <el-button size="mini" icon="el-icon-delete" class="operatefont iconshanchub" @click="del(row.id)">
                删除
              </el-button> -->
              <i class="el-icon-delete danger table-i" title="删除" @click="del(row.id)" />
            </div>
          </template>
        </vxe-table-column>
      </vxe-table>
    </el-card>

    <!-- 新增/修改窗口 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" class="abow_dialog">
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form
            ref="form"
            :rules="formRules"
            :model="form"
            label-position="right"
            label-width="100px"
          >
            <el-form-item v-if="!addChild" label="上级" prop="pid">
              <el-cascader
                v-model="form.pid"
                style="display: block;"
                :options="authorityData"
                :props="treeProps"
                clearable
              >

              <template slot-scope="{ node, data }" >
                <span @click="cascaderRadioClick(data.id)">{{ data.label }}</span>
              </template>
              </el-cascader>
            </el-form-item>
            <el-form-item v-if="addChild" label="上级">
              <el-input v-model="pname" :disabled="true" />
            </el-form-item>
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入名称" />
            </el-form-item>
            <el-form-item label="权限标识" prop="code">
              <el-input v-model="form.code" placeholder="请输入权限标识" />
            </el-form-item>
            <el-form-item label="url">
              <el-input v-model="form.url" placeholder="请输入url" />
            </el-form-item>
            <el-form-item label="图标">
              <el-input v-model="form.icon" placeholder="请选择图标">
                <template slot="prepend"><i :class="form.icon" /></template>
                <el-popover slot="append" placement="right" width="300" trigger="click">
                  <el-row>
                    <el-col v-for="(item, index) in icons" :key="index" :span="6" style="margin-bottom: 10px">
                      <el-button :icon="item" @click="selectIcon(item)" />
                    </el-col>
                  </el-row>
                  <el-button slot="reference">选择</el-button>
                </el-popover>
              </el-input>
            </el-form-item>
            <el-form-item v-if="form.type === 0" label="排序">
              <el-input-number v-model.number="form.sort" :min="0" />
            </el-form-item>
            <el-form-item v-if="form.type !== 0" label="请求方式" prop="method">
              <el-select v-model="form.method" placeholder="请选择请求方式">
                <el-option
                  v-for="item in methodOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item v-if="form.type !== 0" label="请求地址" prop="url">
              <el-input v-model="form.url" placeholder="请输入请求地址" />
            </el-form-item>
            <el-form-item label="是否启用">
              <div class="t-row-operate">
                <el-switch
                  v-model="form.enable"
                  class="switchStyle"
                  active-text="启用"
                  inactive-text="禁用"
                />
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          v-if="dialogStatus==='create'"
          type="primary"
          @click="createMenu"
        >{{ $t('table.confirm') }}
        </el-button>
        <el-button v-else type="primary" @click="update">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { tree, getAuthorityTree, validCode, save, update, enable, del, readExtendIcons, readElementIcons } from '@/api/base/menu'
import { client } from '@/api/base/role'

export default {
  name: 'Menu',
  data() {
    return {
      icons: [],
      choseSys: { value: '', label: '' },
      sysItems: [],
      loading: null,
      allAlign: 'center',
      tableData: [],
      authorityData: null,
      dialogFormVisible: false,
      addChild: false,
      pname: '',
      textMap: {
        view: '查看',
        update: '编辑',
        create: '新增'
      },
      methodOptions: ['GET', 'POST', 'PUT', 'DELETE'],
      dialogStatus: '',
      form: {
        pid: '',
        code: '',
        type: 0,
        method: '',
        url: '',
        name: '',
        id: undefined,
        icon: undefined,
        enable: true,
        sort: 0,
        clientId: undefined
      },
      formRules: {
        name: [
          {
            required: true,
            message: '请填写名称',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '请填写权限标识',
            trigger: 'blur'
          },
          {
            validator: this.validCode,
            trigger: 'blur'
          }
        ]
      },
      treeProps: {
        expandTrigger: 'hover',
        value: 'id',
        label: 'label',
        children: 'children',
        emitPath: false,
        checkStrictly: true
      }
    }
  },
  created() {
    this.getClientList().then(() => {
      this.getTree()
    })
    this.readIcon()
  },
  methods: {
    selectIcon(item) {
      this.form.icon = item
    },
    validCode(rule, value, callback) {
      validCode({ code: value, id: this.form.id }).then(response => {
        if (response.data) {
          callback(new Error('权限标识重复'))
        } else {
          callback()
        }
      })
    },
    getTree() {
      this.loading = true
      tree(this.choseSys.value).then(res => {
        // list -> tree
        this.tableData = this.XEUtil.toArrayTree(res.data, {
          strict: false,
          parentKey: 'pid',
          key: 'id',
          children: 'children'
        })
        this.loading = false
      })
    },
    getClientList() {
      return client().then(res => {
        this.sysItems = res.data.map(function(item) {
          return {
            value: item.clientId,
            label: item.clientName
          }
        })
        this.choseSys = JSON.parse(JSON.stringify(this.sysItems[0]))
      })
    },
    handleSysChange(val) {
      const item = this.sysItems.find(function(item) {
        return item.value === val
      })
      this.choseSys.label = item.label
      this.choseSys.value = item.value
      this.getTree()
    },
    resetForm() {
      this.form = {
        pid: '',
        code: '',
        type: 0,
        method: '',
        url: '',
        name: '',
        id: undefined,
        icon: undefined,
        enable: true,
        sort: 0,
        clientId: undefined
      }
    },
    handleCreateMenu() {
      this.dialogFormVisible = true
      this.dialogStatus = 'create'
      this.resetForm()
      this.addChild = false
      getAuthorityTree(this.choseSys.value, 0).then(res => {
        this.authorityData = { ...res }.data
      })
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    createMenu() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.form.clientId = this.choseSys.value
          save(this.form).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success',
              duration: 2000
            })
            this.getTree()
          })
        }
      })
    },
    handleUpdate(row) {
      getAuthorityTree(this.choseSys.value, row.type === 0 ? 0 : 1).then(res => {
        this.authorityData = { ...res }.data
        this.removeTreeNode(this.authorityData, row.id)
      })
      this.addChild = false
      this.form = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    removeTreeNode(tree, id) {
      const that = this
      tree.forEach(function(item, index) {
        if (item.id === id) {
          tree.splice(index, 1)
        }
        const children = item.children
        if (children) {
          that.removeTreeNode(children, id)
        }
      })
    },
    handleSaveChild(row) {
      this.resetForm()
      this.addChild = true
      this.pname = row.name
      this.form.type = 1
      this.form.pid = row.id
      this.form.code = row.code + ':'
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    update() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          update(this.form).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
            this.getTree()
          })
        }
      })
    },
    enable(id) {
      enable(id).then(() => {
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    del(id) {
      this.$confirm('确认删除？').then(() => {
        del(id).then(() => {
          this.getTree()
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    readIcon() {
      Promise.all([readExtendIcons(), readElementIcons()]).then((res) => {
        this.icons = res[0].concat(res[1])
      })
    },
    cascaderRadioClick(val) {
      this.form.pid = val
    }
  }
}
</script>

<style lang="scss">
.vxe-cell {
  .el-switch__label span {
    margin-left: 14px;
  }
}

.el-popover{
  height: 600px;
  overflow: auto;
}
</style>
