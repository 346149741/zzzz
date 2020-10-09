<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--配置树-->
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>选择配置对象</span>
          </div>
          <el-tree
            ref="tree"
            class="filter-tree"
            :data="treeData"
            node-key="id"
            :props="defaultProps"
            highlight-current
            default-expand-all
            :expand-on-click-node="false"
            @node-click="getNodeData"
          />
        </el-card>
      </el-col>
      <!--配置项-->
      <el-col :span="18">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>配置管理</span>
          </div>
          <div class="filter-container">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="配置项名称/编码：" class="filter-item">
                <el-input
                  v-model="filterTxt"
                  type="text"
                  style="width: 340px;"
                  prefix-icon="el-icon-search"
                  class="filter-item mr10"
                  placeholder="请输入配置项名称/编码"
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
                  icon="mr10 iconfont iconchushihua"
                  @click="handleInit"
                >初始化</el-button>
              </el-form-item>
            </el-form>
          </div>

          <el-table v-loading="listLoading" stripe :data="list" class="t-bd" fit>
            <el-table-column align="center" label="序号" fixed width="50px">
              <template slot-scope="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="配置项编码" fixed show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="配置项名称" fixed show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="依赖项名称" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.dependItemName }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="配置项值" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.value }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="配置项级别" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.itemLevel | itemFormatter }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="配置项说明" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.remark }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$t('table.actions')"
              fixed="right"
              class-name="small-padding fixed-width"
              width="50px"
            >
              <template slot-scope="scope">
                <div class="t-col-operate">
                  <!-- <el-button
                    size="mini"
                    icon="el-icon-edit-outline"
                    class="operatefont iconbianjib"
                    @click="handleUpdate(scope.row)"
                  >编辑</el-button>-->
                  <i
                    class="el-icon-edit-outline warning table-i"
                    title="编辑"
                    @click="handleUpdate(scope.row)"
                  />
                </div>
              </template>
            </el-table-column>
          </el-table>

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
      </el-col>
    </el-row>
    <!--新增弹出层-->
    <el-dialog top="10vh" title="配置编辑" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="form"
        label-position="left"
        label-width="100px"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-row>
              <el-col>
                <el-form-item label="配置项编码">
                  <el-input v-model="form.code" :disabled="true" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col>
                <el-form-item label="配置项名称">
                  <el-input v-model="form.name" :disabled="true" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="配置项级别">
              <el-input v-model.lazy="form.itemLevel" :disabled="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="依赖项名称">
              <el-input v-model="form.dependItemName" :disabled="true" />
            </el-form-item>
          </el-col>
        </el-row>
        <!--<el-row :gutter="20">-->
        <!--<el-col>-->
        <!--<el-form-item label="默认配置">-->
        <!--<el-input v-model="form.phone" :disabled="true"></el-input>-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--</el-row>-->
        <el-row :gutter="20">
          <el-col>
            <el-form-item label="配置项值" prop="value">
              <el-input v-model="form.value" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col>
            <el-form-item label="配置项说明">
              <el-input v-model="form.email" placeholder="该配置项默认为1，1表示二维 ，2表示三维" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { configTree, page, init, update } from "@/api/base/config-item";

export default {
  filters: {
    itemFormatter(val) {
      switch (val) {
        case "1":
          return "平台级";
        case "2":
          return "机构级";
        case "3":
          return "项目级";
      }
    },
  },
  data() {
    return {
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {},
      },
      filterTxt: "",
      list: null,
      total: null,
      listLoading: true,
      treeData: null,
      defaultProps: {
        children: "children",
        label: "label",
      },
      selectedTree: {
        id: "",
        pid: "",
      },
      dialogFormVisible: false,
      rules: {
        value: [{ required: true, message: "请填写配置项值", trigger: "blur" }],
      },
      form: {
        code: "",
        name: "",
        dependItemName: "",
        value: "",
        itemLevel: "",
        remark: "",
      },
    };
  },
  watch: {
    filterTxt(val) {
      this.listQuery.params.name = val;
    },
    configFilterTxt(val) {
      this.configListQuery.params.name = val;
    },
  },
  created() {
    this.getTree();
  },
  methods: {
    getTree() {
      configTree().then((response) => {
        this.treeData = response.data;
        this.selectedTree = {
          id: this.treeData[0].id,
        };
        this.$nextTick(() => {
          this.$refs.tree.setCurrentKey(this.selectedTree.id);
        });
        this.getList();
      });
    },
    resetFilter() {
      this.filterTxt = "";
    },
    handleFilter() {
      this.listQuery.pageNo = 1;
      this.getList();
    },
    getList() {
      this.listLoading = true;
      this.listQuery.params.relaObjectId = this.selectedTree.id;
      this.listQuery.params.itemLevel = this.selectedTree.pid;
      page(this.listQuery)
        .then((response) => {
          this.list = response.data.content;
          this.total = response.data.totalElements;
          this.listLoading = false;
        })
        .catch((res) => {
          this.listLoading = true;
          this.$message.error(res.message);
        });
    },
    getNodeData(data, node) {
      this.resetFilter();
      if (node.level === 1 && data.id === "1") {
        this.selectedTree = {
          id: data.id,
          pid: "",
        };
        this.getList();
      } else if (node.level === 2) {
        this.selectedTree = {
          id: data.id,
          pid: node.parent.data.id,
        };
        this.getList();
      }
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val;
      this.getList();
    },
    resetForm() {
      this.form = {
        code: "",
        name: "",
        dependItemName: "",
        value: "",
        itemLevel: "",
        remark: "",
      };
    },
    handleInit() {
      this.$confirm(
        "初始化配置会自动添加所有缺少的配置项，原有配置保留，是否继续？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        init(this.listQuery.params).then(() => {
          this.getList();
        });
      });
    },
    handleUpdate(row) {
      this.form = { ...row };
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      update(this.form)
        .then(() => {
          this.getList();
          this.dialogFormVisible = false;
          this.$notify.success({
            title: "成功",
            message: "更新成功",
          });
        })
        .catch((res) => {
          this.$notify.error({
            title: "失败",
            message: res.message,
          });
        });
    },
    // handleDelete(row) {
    //   this.$confirm('确认删除 “' + row.name + '” 的记录？').then(() => {
    //     DeptAPI.delete(row.id).then(() => {
    //       this.getList()
    //       this.$notify.success({
    //         title: '成功',
    //         message: '删除成功'
    //       })
    //     }).catch(res => {
    //       this.$notify.error({
    //         title: '失败',
    //         message: res.message
    //       })
    //     })
    //   })
    // },
  },
};
</script>
