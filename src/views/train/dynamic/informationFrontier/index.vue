<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>信息前沿</span>
      </div>
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="标题：" class="filter-item">
            <el-input
              v-model="listQuery.params.name"
              type="text"
              class="filter-item"
              placeholder="请输入标题"
            />
          </el-form-item>
          <el-form-item label="发布时间：" class="filter-item">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
          <el-form-item class="filter-item">
            <el-button v-waves class="filter-item btn-base" type="primary">{{ $t('table.search') }}</el-button>
            <el-button class="filter-item btn-base filter-add-btn">发布信息</el-button>
          </el-form-item>
        </el-form>
        <el-table stripe :data="list" class="t-bd" fit highlight-current-row>
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column property="name" label="标题" />
          <el-table-column property="con" label="内容简要" />
          <el-table-column property="source" label="来源" width="100"/>
          <el-table-column property="time" label="发布时间" width="100"/>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <div class="t-col-operate">
                <i
                  class="el-icon-tickets primary table-i"
                  title="详情"
                  @click="details(scope.row.id)"
                />
                <i
                  class="el-icon-edit-outline warning table-i"
                  title="编辑"
                  @click="handleCreate(scope.row.id)"
                />
                <i class="el-icon-delete danger table-i" title="删除" @click="delitem(scope.row.id)" />
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
      </div>
    </el-card>
  </div>
</template>
<script>

export default {
  data () {
    return {
      value1: null,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {

        }
      },
      total: null, // 总数
      list: [
        {
          name: '中国代表阐述中方在南苏丹问题上的立场',
          con: '新华社联合国9月16日电　中国常驻联合国副代表戴兵16日在安理会南苏丹问题视频公开会上发言，阐述中方立场。',
          time: '2020-09-17',
          source: '新华社',
          id: '11'
        },
         {
          name: '摩洛哥海军在地中海和大西洋逮捕186名偷渡者',
          con: '新华社拉巴特9月16日电（记者陈斌杰）据摩洛哥媒体16日报道，隶属于摩洛哥海军的海岸警卫队在地中海和大西洋巡逻时逮捕186名偷渡者。',
          time: '2020-09-17',
          source: '新华社',
          id: '12'
        },
         {
          name: '印度即将拥有高超音速武器？ 专家：前路漫漫',
          con: '印度近日宣布成功进行高超音速飞行器试验，其本国媒体欢呼印度成为“全球第四个完成这一壮举的国家”，并认为“印度能在5年内研制出高超音速巡航导弹”。',
          time: '2020-09-17',
          source: '中国之声',
          id: '13'
        },
         {
          name: '观中国丨美国为何患上“焦虑症”？',
          con: '美国近期对中国的敌意不断增加，焦虑感日益上升。其最主要的原因在于，近100年来，美国成功地在全球推行以自身为范本的“美式民主”，塑造有利于美国的世界秩序，但这条道路并未被中国所采纳。',
          time: '2020-09-16',
          source: '中国日报网',
          id: '14'
        },
         {
          name: '多国代表在联合国人权理事会就涉香港、新疆问题发言支持中国',
          con: '新华社日内瓦9月15日电　在联合国人权理事会第45次会议人权高专报告议题一般性辩论中，多国代表15日就涉香港、新疆问题发言支持中国。',
          time: '2020-09-16',
          source: '新华网',
          id: '15'
        }
      ]
    }
  },
  created () {
    this.total = this.list.length
  },
  methods: {
    handleCreate (e, id) {
      // this.dialog1 = true
      // if (e === 1) {
      //   this.poptit = '新增楼宇'
      // } else {
      //   this.poptit = '编辑楼宇'
      //   this.getdetails(id)
      // }
    },
    delitem (id) {
      this.$confirm('确认删除？').then(() => {
        // floordel(id).then(() => {
        //   this.getList()
        //   this.$notify.success({
        //     title: '成功',
        //     message: '删除成功'
        //   })
        // })
      })
    },
    details (id) {
      // this.dialog2 = true
      // this.getdetails(id)
    },
    handleSizeChange (val) {
      this.listQuery.pageSize = val
      // this.getList()
    },
    handleCurrentChange (val) {
      this.listQuery.pageNo = val
      // this.getList()
    },
  }
}
</script>
<style scoped>
</style>