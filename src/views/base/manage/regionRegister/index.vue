<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--部门树-->
      <el-col :span="5">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>区域注册</span>
          </div>
          <el-tree
            :data="data"
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :render-content="renderContent"
            @node-click="handleNodeClick"
          />
        </el-card>
      </el-col>
      <el-col :span="19">
        <el-card class="box-card"><MapCmpt ref="map" @handleOptRegion="handleOptRegion" /></el-card>
      </el-col>
    </el-row>
    <el-dialog title="区域信息" :visible.sync="dialogEditVisible" width="350px" class="small_dialog">
      <div class="dialog-content">
        <el-form label-width="70px">
          <el-form-item label="名称：">
            <el-input v-model="form.areaName" class="form-item1" placeholder="请输入名称" />
          </el-form-item>
          <el-form-item label="位置：">{{ form.areaLocation }}</el-form-item>
          <el-form-item label="类型：">
            <el-select
              ref="areaType"
              v-model="form.areaType"
              class="form-item1"
              placeholder="请选择安防级别"
            >
              <el-option value="1" label="普通" />
              <el-option value="2" label="重要" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleDialogFormEditCancel">取 消</el-button>
        <el-button type="primary" @click="submitMsg">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="区域信息"
     :visible.sync="dialogViewVisible" 
     width="600px" 
     class="small_dialog" 
     :close-on-click-modal="false"
    >
      <div class="dialog-content">
        <el-form label-width="70px">
          <el-form-item label="名称：">
            {{ form.areaName }}
          </el-form-item>
          <el-form-item label="位置：">
            {{ form.areaLocation }}
          </el-form-item>
          <el-form-item label="类型：">
            {{ form.areaTypeName }}
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleEditRegionItem">编辑</el-button>
        <el-button type="danger" @click="handleDeleteRegionItem(form.id)">删除</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  registertree,
  registerdel,
  registerget,
  registersave,
  registerput
} from '@/api/base/region'
import MapCmpt from './mapCmpt.vue'
import { treeToArray } from '@/utils'
import { mapGetters } from 'vuex'
export default {
  components: { MapCmpt },
  data() {
    this.treeListGroup = {}
    return {
      data: [],
      dialogEditVisible: false,
      dialogViewVisible: false,
      form: {
        'areaLocation': '',
        'areaName': '',
        'areaType': '',
        'areaTypeName': '',
        'id': '',
        'pid': ''
      }
    }
  },
  computed: {
    ...mapGetters(['sidebar'])
  },
  watch: {
    'sidebar.opened': function(val) {
      this.$refs.map.updateSize()
    }
  },
  created() {
    this.getTree()
  },
  methods: {
    handleOptRegion(infos) {
      this.form = { ...infos.info }
      this.$nextTick(() => {
        this.dialogViewVisible = true
      })
    },
    handleEditRegionItem() {
      this.dialogViewVisible = false
      this.dialogEditVisible = true
    },
    handleDeleteRegionItem(id) {
      registerdel(id).then(() => {
        this.$message.success('删除成功!')
        this.dialogViewVisible = false
        this.getTree()
      })
    },
    getTree() {
      registertree().then((response) => {
        this.data = response.data
      }).then(() => {
        const arr = treeToArray(this.data)
        this.$refs.map.handleInitRegions(arr)
      })
    },
    append(node, data) {
      this.resetForm()
      this.form.pid = data.id
      this.$refs.map.handleRegionItemDraw(this.regionAddCallback)
      // const newChild = { id: id++, label: "testtest", children: [] };
      // if (!data.children) {
      //   this.$set(data, "children", []);
      // }
      // data.children.push(newChild);
    },
    regionAddCallback(e) {
      this.form.areaLocation = e.coords
      this.dialogEditVisible = true
    },
    handleDialogFormEditCancel() {
      this.dialogEditVisible = false
    },
    handleNodeClick(data) {
      this.$refs.map.handleZoomToId(data.id)
    },
    resetForm() {
      this.form = {
        'areaLocation': '',
        'areaName': '',
        'areaType': '',
        'areaTypeName': '',
        'id': '',
        'pid': ''
      }
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class='custom-tree-node'>
          <span>{data.areaName}</span>
          <span>
            <el-button
              size='mini'
              type='text'
              on-click={() => this.append(node, data)}
            >
              添加下级
            </el-button>
          </span>
        </span>
      )
    },
    submitMsg() {
      this.form.areaTypeName = this.$refs.areaType.selected.label
      registersave(this.form).then((res) => {
        this.$message.success('更新成功!')
        this.getTree()
        this.dialogEditVisible = false
      })
    }
  }
}
</script>
<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
