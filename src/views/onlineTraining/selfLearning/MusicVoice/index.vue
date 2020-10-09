<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <div class="header-title" style="display: flex;justify-content: space-between"><span style="cursor:pointer;" @click="$router.go(-1)">返回</span><span>音乐之声</span><span /></div>
      </div>
      <el-table v-loading="listLoading" stripe :data="list" class="t-bd" fit highlight-current-row>
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column property="a" label="音乐标题" />
        <el-table-column property="b" label="歌手" />
        <el-table-column property="c" label="专辑" />
        <el-table-column property="d" label="时长" />
        <el-table-column width="150px">
          <template slot-scope="scope">
            <div class="t-col-operate">
              {{ scope.row.e===0?'免费':`${scope.row.e}积分` }}
            </div>
          </template>
        </el-table-column>
      </el-table>
      <aplayer
        v-if="true"
        :music="musicList[0]"
        :mutex="false"
        :list-folded="true"
        :list="musicList"
      />
    </el-card>
  </div>
</template>
<script>
import aplayer from 'vue-aplayer'
export default {
  components: { aplayer },
  data() {
    return {
      currentMusic: {},
      musicList: [
        {
          title: '或是一首歌',
          author: '田馥甄',
          src: 'http://music.163.com/song/media/outer/url?id=1472606824.mp3'
        },
        {
          title: '歌唱祖国',
          author: '东方红合唱团',
          src: 'http://music.163.com/song/media/outer/url?id=5234256.mp3'
        },
        {
          title: '中国人民解放军进行曲',
          author: '东方红大型歌舞曲',
          src: 'http://music.163.com/song/media/outer/url?id=1304301596.mp3'
        },
        {
          title: '红旗飘飘',
          author: '孙楠',
          src: 'http://music.163.com/song/media/outer/url?id=145754.mp3'
        }
      ],
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          b: ''
        }
      },
      list: [
        { a: '特种部队之歌', b: 'h3R3/Felix Bennett', c: '他只是经过', d: '03:35', e: 0 },
        { a: '离开部队的那一天', b: '李荣浩', c: '麻雀', d: '04:12', e: 0 },
        { a: '严守纪录歌', b: 'h3R3/Felix Bennett', c: '他只是经过', d: '03:22', e: 2 },
        { a: '当兵前的那晚上', b: '李荣浩', c: '麻雀', d: '03:04', e: 1 },
        { a: '咱当兵的人', b: 'h3R3/Felix Bennett', c: '他只是经过', d: '02:22', e: 2 },
        { a: '当兵就是那么帅', b: '李荣浩', c: '麻雀', d: '04:01', e: 1 },
        { a: '祖国不会忘记', b: 'h3R3/Felix Bennett', c: '他只是经过', d: '02:45', e: 1 },
        { a: '他在那里站岗', b: '李荣浩', c: '麻雀', d: '03:11', e: 1 },
        { a: '亮剑', b: 'h3R3/Felix Bennett', c: '他只是经过', d: '03:07', e: 1 },
        { a: '部队往事', b: '李荣浩', c: '麻雀', d: '04:31', e: 0 },
        { a: '时刻准备上战场', b: 'h3R3/Felix Bennett', c: '他只是经过', d: '01:22', e: 0 }
      ],
      total: null, // 总数
      listLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleCreate() {
      this.title = '新增'
      this.dialog2 = true
      this.form = {}
    },
    getList() { },
    cascaderRadioClick(val, name) {
      this.listQuery.params.b = val
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
      // floorget(id).then((response) => {
      //   this.ruleForm = response.data
      // })
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.getList()
    }
  }
}
</script>
<style scoped>
  .photo {
    width: 100px;
    height: 100px;
  }
</style>
