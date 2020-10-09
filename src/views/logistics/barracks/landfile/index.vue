<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>土地档案</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="5">
          <el-card>
            <h3>部门</h3>
            <hr>
            <el-tree
              ref="tree"
              :data="treeData"
              node-key="id"
              :props="{ children: 'children', label: 'label'}"
              highlight-current
              default-expand-all
              :expand-on-click-node="false"
              @node-click="getNodeData"
            />
          </el-card>
        </el-col>
        <el-col :span="19">
          <el-card>
            <div class="filter-container">
              <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="单位名称：" class="filter-item">
                  <el-input
                    v-model="listQuery.params.a"
                    type="text"
                    class="filter-item"
                    placeholder="请输入单位名称"
                    @keyup.enter.native="handleFilter"
                  />
                </el-form-item>
                <el-form-item label="地址：" class="filter-item">
                  <el-input
                    v-model="listQuery.params.c"
                    type="text"
                    class="filter-item"
                    placeholder="请输入地址"
                    @keyup.enter.native="handleFilter"
                  />
                </el-form-item>
                <el-form-item class="filter-item">
                  <el-button
                    v-waves
                    class="filter-item btn-base"
                    type="primary"
                    icon="mr10 iconfont el-icon-search"
                    @click="handleFilter"
                  >{{ $t('table.search') }}
                  </el-button>
                  <el-button
                    v-waves
                    class="filter-item btn-base"
                    type="primary"
                    icon="mr10 iconfont el-icon-folder-add"
                    @click="handleCreate"
                  >新增
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
            <el-table v-loading="listLoading" stripe :data="list" class="t-bd" fit highlight-current-row>
              <el-table-column type="index" label="序号" width="50" />
              <el-table-column property="a" label="单位" />
              <el-table-column property="b" label="地址" />
              <el-table-column property="c" label="坐落号" />
              <el-table-column property="d" label="土地面积" />
              <el-table-column property="e" label="营房面积" />
              <el-table-column label="操作" width="100px">
                <template slot-scope="scope">
                  <div class="t-col-operate">
                    <i
                      class="el-icon-tickets primary table-i"
                      title="详情"
                      @click="details(1,scope.row.a,scope.row)"
                    />
                    <i
                      class="el-icon-edit-outline warning table-i"
                      title="编辑"
                      @click="details(2,scope.row.a,scope.row)"
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
        </el-col>
        <!--查看-->
        <el-dialog
          class="abow_dialog detail-form"
          title="土地档案信息查看"
          :visible.sync="dialog"
          :close-on-click-modal="false"
          width="80%"
        >
          <div class="dialog-content">
            <div class="dialog-item">
              <table class="table-container">
                <tr>
                  <td>单位：</td>
                  <td>机关1楼</td>
                  <td>地址</td>
                  <td>北京市朝阳区实验路</td>
                </tr>
                <tr>
                  <td>坐落号</td>
                  <td>212号</td>
                  <td>土地面积</td>
                  <td>213m²</td>
                </tr>
                <tr>
                  <td>营房面积</td>
                  <td>147m²</td>
                </tr>
                <tr>
                  <td>营房现貌图</td>
                  <td>
                    <el-image
                      style="width: 300px; height: 300px"
                      :src="url"
                      :preview-src-list="[url]"
                    />
                  </td>
                  <td>CAD平面图</td>
                  <td>
                    <el-image
                      style="width: 300px; height: 300px"
                      :src="url2"
                      :preview-src-list="[url2]"
                    />
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </el-dialog>
        <!--编辑-->
        <el-dialog
          class="abow_dialog detail-form form-table-edit"
          :title="`土地档案信息${title}`"
          :visible.sync="dialog2"
          :close-on-click-modal="false"
          width="80%"
        >
          <div class="dialog-content">
            <div class="dialog-item">
              <table class="table-container">
                <tr>
                  <td>单位：</td>
                  <td><el-input v-model="form.a" placeholder="请输入单位名称" /></td>
                  <td>地址</td>
                  <td><el-input v-model="form.b" placeholder="请输入地址" /></td>
                </tr>
                <tr>
                  <td>坐落号</td>
                  <td><el-input v-model="form.c" placeholder="请输入坐落号" /></td>
                  <td>土地面积</td>
                  <td><el-input v-model="form.d" placeholder="请输入土地面积" /></td>
                </tr>
                <tr>
                  <td>营房面积</td>
                  <td><el-input v-model="form.e" placeholder="请输入营房面积" /></td>
                </tr>
                <tr>
                  <td>营房现貌图</td>
                  <td>
                    <el-upload
                      class="avatar-uploader"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :show-file-list="false"
                    >
                      <img v-if="form.f" :src="form.f" class="avatar" style="width: 300px; height: 300px">
                      <i v-else class="el-icon-plus avatar-uploader-icon" />
                    </el-upload>
                  </td>
                  <td>CAD平面图</td>
                  <td>
                    <el-upload
                      class="avatar-uploader"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :show-file-list="false"
                    >
                      <img v-if="form.g" :src="form.g" class="avatar" style="width: 300px; height: 300px">
                      <i v-else class="el-icon-plus avatar-uploader-icon" />
                    </el-upload>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialog2 = false">取消</el-button>
            <el-button type="primary" @click="dialog2 = false">确定</el-button>
          </div>
        </el-dialog>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { region } from '../mockData'

export default {
  name: 'Index',
  data() {
    return {
      title: '新增',
      dialog: false,
      dialog2: false,
      listLoading: false,
      total: 0,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          b: ''
        }
      },
      list: [
        {
          a: '机关1楼',
          b: '北京市朝阳区实验路',
          c: '212号',
          d: '213m²',
          e: '147m²',
          f: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600145453108&di=9f7bcca64b8ec3ed9bf1e1d4d2e5e5b5&imgtype=0&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D2174793870%2C541652210%26fm%3D214%26gp%3D0.jpg',
          g: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600145622440&di=268c18d5ed4ac54b8e47498c281d0536&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20180305%2Fa66ff3d6698d467e991f6e5afa250139.jpg'
        }
      ],
      form: {},
      treeData: region,
      url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600145453108&di=9f7bcca64b8ec3ed9bf1e1d4d2e5e5b5&imgtype=0&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D2174793870%2C541652210%26fm%3D214%26gp%3D0.jpg',
      url2: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600145622440&di=268c18d5ed4ac54b8e47498c281d0536&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20180305%2Fa66ff3d6698d467e991f6e5afa250139.jpg'
    }
  },
  mounted() {
  },
  methods: {
    handleCreate() {
      this.title = '新增'
      this.dialog2 = true
      this.form = {}
    },
    handleFilter() {
      this.listQuery.pageNo = 1
    },
    details(e, id, row) {
      if (e === 1) {
        this.dialog = true
      } else {
        this.title = '编辑'
        this.dialog2 = true
      }
      this.getdetails(id)
      this.form = { ...row }
    },
    getdetails(id) {

    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.getList()
    },
    getList() {

    },
    getNodeData() {

    }
  }
}
</script>

<style lang="scss" scoped>
  .table-container {
    border: 1px solid #eee;
    width: 100%;
    padding: 10px;
    border-spacing: 0;
    border-collapse: collapse;

    td {
      border: 1px solid #eee;
      height: 50px;
      padding-left: 10px;
    }
  }
  .form-table-edit{
    /deep/ .el-input{
      padding-right: 10px;
    }
  }
  .avatar-uploader{
    display: block;
    width: 300px;
    height: 300px;
    text-align: center;
    line-height: 300px;
    font-size: 60px;
    border: 1px solid #eee;
    border-radius: 10px;
  }

</style>
