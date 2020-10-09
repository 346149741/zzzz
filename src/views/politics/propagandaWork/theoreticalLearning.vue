<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>理论学习</span>
      </div>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="名称：" class="filter-item">
          <el-input
            v-model="listQuery.params.name"
            type="text"
            class="filter-item"
            placeholder="请输入名称"
          />
        </el-form-item>
        <el-form-item class="filter-item">
          <el-button v-waves class="filter-item btn-base" type="primary">{{ $t('table.search') }}</el-button>
          <el-button class="filter-item btn-base filter-add-btn" @click="dialog1 = true">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table stripe :data="list" class="t-bd" fit highlight-current-row>
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column property="name" label="名称" />
        <el-table-column property="qihao" label="期号" />
        <el-table-column property="time" label="时间" />
        <el-table-column property="kaixing" label="刊期" />
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <div class="t-col-operate">
              <i class="el-icon-tickets primary table-i" title="详情" @click="dialog2 = true" />
              <i class="el-icon-delete danger table-i" title="删除" />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="filter-container">
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
                  <el-form-item label="电子报名称：" prop="code">
                    <el-input v-model="form.code" placeholder="请输入电子报名称" />
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="期号：" prop="name">
                    <el-input v-model="form.name" placeholder="请输入期号" />
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="刊期：" prop="certType">
                    <el-select v-model="form.certType" placeholder="请选择刊期" class="form-item1">
                      <el-option label value />
                    </el-select>
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="时间：" prop="certType">
                    <el-date-picker
                      v-model="form.value1"
                      style="width:100%"
                      type="date"
                      placeholder="选择日期"
                    />
                    <!-- <el-select v-model="form.fangshi" placeholder="请选择考核方式" class="form-item1">
                      <el-option label value />
                    </el-select>-->
                  </el-form-item>
                </el-row>
              </el-col>
            </el-row>
          </el-form>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :file-list="fileList"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog1 = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialog1 = false">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      class="abow_dialog detail-form"
      title="详情"
      :append-to-body="true"
      :visible.sync="dialog2"
      :close-on-click-modal="false"
      width="60%"
    >
      <el-carousel indicator-position="outside" :autoplay="false" height="600px">
        <el-carousel-item v-for="(item,index) in imgs" :key="index">
          <div style="text-align: center">
            <el-image class="paper-item" :src="item.url" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fileList: [{ name: '镇江日报', url: 'http://pic.dooland.com/newspaperCovers/2010/10/08/211.jpg' }, { name: '闽南日报', url: 'http://pic.dooland.com/newspaperCovers/2010/10/08/2510.jpg' }],
      imgs: [
        { url: 'http://hcrb.hcwang.cn/page/1/2020-09-22/01/40811600735306649.jpg' },
        { url: 'http://hcrb.hcwang.cn/page/1/2020-09-22/02/36931600735307758.jpg' },
        { url: 'http://hcrb.hcwang.cn/page/1/2020-09-22/03/88091600735308805.jpg' },
        { url: 'http://hcrb.hcwang.cn/page/1/2020-09-22/04/35641600735309742.jpg' },
        { url: 'http://hcrb.hcwang.cn/page/1/2020-09-22/05/80871600735311555.jpg' }
      ],
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {

        }
      },
      total: null, // 总数
      list: [
        {
          name: '人民日报',
          qihao: '第34期',
          time: '2020年9月8日  星期五',
          kaixing: '日刊'
        },
        {
          name: '北京日报',
          qihao: '第844期',
          time: '2020年9月8日  星期五',
          kaixing: '日刊'
        },
        {
          name: '环球时报',
          qihao: '第74期',
          time: '2020年9月8日  星期五',
          kaixing: '半月刊'
        },
        {
          name: '中国青年报',
          qihao: '第66期',
          time: '2020年9月8日  星期五',
          kaixing: '半月刊'
        },
        {
          name: '科学时报',
          qihao: '第2454期',
          time: '2020年9月8日  星期五',
          kaixing: '双月刊'
        }
      ],
      dialog1: false,
      dialog2: false,
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
