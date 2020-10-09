<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>文化装备信息管理</span>
      </div>
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="器材名称：" class="filter-item">
            <el-input
              v-model="listQuery.params.name"
              type="text"
              class="filter-item"
              placeholder="请输入器材名称"
            />
          </el-form-item>
          <el-form-item class="filter-item">
            <el-button v-waves class="filter-item btn-base" type="primary">{{ $t('table.search') }}</el-button>
            <el-button class="filter-item btn-base filter-add-btn" @click="dialog1 = true">新增</el-button>
          </el-form-item>
        </el-form>
        <el-table stripe :data="list" class="t-bd" fit highlight-current-row>
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column property="name" label="器材名称" />
          <el-table-column property="brand" label="品牌" />
          <el-table-column property="num" label="数量" />
          <el-table-column property="danwei" label="单位" />
          <el-table-column property="danjia" label="单价（元）" />
          <el-table-column property="zongjia" label="总价（元）" />
          <el-table-column property="changsuo" label="放置场所" />
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
      </div>
    </el-card>
    <el-dialog
      class="abow_dialog"
      title="新增"
      :visible.sync="dialog1"
      :close-on-click-modal="false"
      width="1260px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form
            ref="dataForm"
            :rules="rules"
            :model="form"
            label-position="right"
            label-width="100px"
          >
            <el-row :gutter="20">
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="器材名称：" prop="code">
                    <el-input v-model="form.code" placeholder="请输入器材名称" />
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="品牌：" prop="name">
                    <el-input v-model="form.name" placeholder="请输入品牌" />
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="数量：" prop="name">
                    <el-input v-model="form.num" placeholder="请输入数量" />
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="单位：" prop="certType">
                    <el-select v-model="form.certType" placeholder="请选择单位" class="form-item1">
                      <el-option label value />
                    </el-select>
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="单价：" prop="name">
                    <el-input v-model="form.dan" placeholder="请输入单价" />
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="总价：" prop="name">
                    <el-input v-model="form.zong" placeholder="请输入总价" />
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="放置场所：" prop="certType">
                    <el-select v-model="form.certType" placeholder="请选择放置场所" class="form-item1">
                      <el-option label value />
                    </el-select>
                  </el-form-item>
                </el-row>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog1 = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialog1 = false">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {

        }
      },
      total: null, // 总数
      dataForm: {},
      list: [
        {
          name: '野战影音响',
          brand: '迪邦',
          num: '20',
          danwei: '台',
          danjia: '180',
          zongjia: '3600',
          changsuo: '1号、4号、5号、7号'
        },
        {
          name: '军营点歌机',
          brand: '龙韵',
          num: '4',
          danwei: '台',
          danjia: '180',
          zongjia: '720',
          changsuo: '1号、4号、5号、7号'
        },
        {
          name: '摄像机',
          brand: '迪邦',
          num: '7',
          danwei: '个',
          danjia: '178',
          zongjia: '1246',
          changsuo: '1号、4号、5号、7号'
        },
        {
          name: '照相机',
          brand: '龙韵',
          num: '4',
          danwei: '个',
          danjia: '184',
          zongjia: '736',
          changsuo: '1号、4号、5号、7号'
        },
        {
          name: '编辑机',
          brand: '迪邦',
          num: '2',
          danwei: '个',
          danjia: '174',
          zongjia: '348',
          changsuo: '1号、4号、5号、7号'
        },
        {
          name: '电子琴',
          brand: '龙韵',
          num: '20',
          danwei: '副',
          danjia: '185',
          zongjia: '3700',
          changsuo: '1号、4号、5号、7号'
        },
        {
          name: '电吉他',
          brand: '迪邦',
          num: '4',
          danwei: '副',
          danjia: '172',
          zongjia: '688',
          changsuo: '1号、4号、5号、7号'
        },
        {
          name: '摄像机',
          brand: '龙韵',
          num: '7',
          danwei: '个',
          danjia: '175',
          zongjia: '1225',
          changsuo: '1号、4号、5号、7号'
        },
        {
          name: '照相机',
          brand: '迪邦',
          num: '4',
          danwei: '个',
          danjia: '181',
          zongjia: '724',
          changsuo: '1号、4号、5号、7号'
        }
      ],
      dialog1: false,
      form: {

      }
    }
  },
  created() {
    this.total = this.list.length
  },
  methods: {

  }
}
</script>
<style scoped>
</style>
