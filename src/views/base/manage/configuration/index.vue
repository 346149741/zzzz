<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>配置管理</span>
      </div>
      <!--搜索条件-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="配置关键字：" class="filter-item">
            <el-input
              v-model="listQuery.params.code"
              class="filter-item list-query"
              prefix-icon="el-icon-search"
              placeholder="请输入配置关键字"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item class="filter-item">
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              style="margin-left: 10px;"
              icon="mr10 iconfont iconsousuo"
              @click="handleFilter"
            >{{ $t('table.search') }}</el-button>
            <el-button
              class="filter-item btn-base filter-add-btn"
              style="margin-left: 10px;"
              icon="mr10 iconfont iconxinzengh"
              @click="handleCreate"
            >{{ $t('table.add') }}</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!--分页内容-->
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        stripe
        :data="list"
        class="t-bd"
      >
        <el-table-column align="center" label="序号" fixed width="50px">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="配置关键字" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="配置值" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.value }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
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
                icon="el-icon-edit-outline"
                class="operatefont iconbianjib"
                @click="handleUpdate(scope.row)"
              >编辑</el-button> -->
              <i class="el-icon-edit-outline warning table-i" title="编辑" @click="handleUpdate(scope.row)" />
              <!-- <el-button
                size="mini"
                icon="el-icon-delete"
                class="operatefont iconshanchub"
                @click="handleDelete(scope.row)"
              >删除</el-button> -->
              <i class="el-icon-delete danger table-i" title="删除" @click="handleDelete(scope.row)" />
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!--分页工具条-->
      <div class="pagination-container">
        <el-pagination
          background
          :current-page="listQuery.pageNo"
          :page-sizes="[10,20,30,50]"
          :page-size="listQuery.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!--新增/修改弹出层-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" left width="750px">
      <div class="dialogBox">
        <el-form
          ref="dataForm"
          :rules="rules"
          :model="form"
          label-position="right"
          label-width="100px"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item label="配置关键字" prop="code">
                <el-input v-model="form.code" placeholder="请输入配置关键字" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="配置值" prop="value">
                <el-input v-model="form.value" placeholder="请输入配置值" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input v-model="form.remark" placeholder="请输入备注" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div v-if="dialogStatus!=='view'" slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          v-if="dialogStatus==='create'"
          type="primary"
          @click="createData"
        >{{ $t('table.confirm') }}</el-button>
        <el-button v-else type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ConfigurationApi from "@/api/base/configuration";

export default {
  name: "ConfigurationPage",
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {},
      },
      form: {
        id: "",
        code: "",
        value: "",
        remark: "",
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "新增",
      },
      rules: {
        code: [
          { required: true, message: "请填写配置关键字", trigger: "blur" },
          { validator: this.validCode, trigger: "blur" },
        ],
        value: [{ required: true, message: "请填写配置值", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    validCode(rule, value, callback) {
      ConfigurationApi.validCode(value, this.form.id).then((response) => {
        if (response.data) {
          callback(new Error("配置关键字重复"));
        } else {
          callback();
        }
      });
    },
    getList() {
      this.listLoading = true;
      ConfigurationApi.page(this.listQuery).then((response) => {
        this.list = response.data.content;
        this.total = response.data.totalElements;
        this.listLoading = false;
      });
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val;
      this.getList();
    },
    handleFilter() {
      this.listQuery.pageNo = 1;
      this.getList();
    },
    resetForm() {
      this.form = {
        id: "",
        code: "",
        value: "",
        remark: "",
      };
    },
    handleCreate() {
      this.resetForm();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          ConfigurationApi.save(this.form)
            .then(() => {
              this.dialogFormVisible = false;
              this.getList();
              this.$notify.success({
                title: "成功",
                message: "添加成功!",
              });
            })
            .catch((res) => {
              this.$notify.error({
                title: "失败",
                message: res.message,
              });
            });
        }
      });
    },
    handleUpdate(row) {
      this.form = Object.assign({}, row); // copy obj
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          ConfigurationApi.update(this.form).then(() => {
            this.dialogFormVisible = false;
            this.getList();
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
    handleDelete(row) {
      this.$confirm("确认删除 “" + row.code + "” 的记录？").then(() => {
        ConfigurationApi.delete(row.id)
          .then(() => {
            this.getList();
            this.$notify.success({
              title: "成功",
              message: "删除成功",
            });
          })
          .catch((res) => {
            this.$notify.error({
              title: "失败",
              message: res.message,
            });
          });
      });
    },
  },
};
</script>
