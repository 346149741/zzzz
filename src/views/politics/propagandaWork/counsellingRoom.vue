<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>心理咨询室</span>
      </div>
      <div style="margin-bottom: 20px">
        <el-button
          class="filter-item btn-base filter-add-btn"
          @click="dialog1 = true"
          >提问</el-button
        >
      </div>
      <div class="filter-container">
        <ul>
          <li v-for="(item, index) in list" :key="index">
            <h3>{{ item.tit }}</h3>
            <p>{{ item.con }}</p>
            <p class="i">
              <span>{{ item.time }}</span>
              <span>阅读：{{item.yuedu}}</span>
              <span>回复：{{item.huifu}}</span>
              <a href="#">查看详情</a>
            </p>
          </li>
        </ul>
        <!--分页工具条-->
        <div class="pagination-container">
          <el-pagination
            background
            :current-page="listQuery.pageNo"
            :page-sizes="[10, 20, 30, 50]"
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
      title="提问"
      :visible.sync="dialog1"
      :close-on-click-modal="false"
      width="600px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
           <el-input
            v-model="form.tit"
            class="form-item1"
            placeholder="请输入标题"
            style="margin-bottom:20px"
          />
          <el-input
            v-model="form.tiwen"
            class="form-item1"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 4 }"
            placeholder="请输入内容"
          />
          <el-checkbox style="margin-top: 20px" v-model="form.checked"
            >匿名提问</el-checkbox
          >
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary">发布问题</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {

        }
      },
      total: null, // 总数
      list: [
        {
          tit: '压力病，如何诊治',
          con: '近三个月以来，心绪烦乱、沮丧和忧郁；感觉不知所措，就好像自己失去控制；难以让头脑放松和镇静；对自己感觉不好（自卑）...',
          time: '2017/6/14',
          yuedu: '2440',
          huifu: '1'
        },
        {
          tit: '请问怎样锻炼自己的脑力反应迟钝?',
          con: '我个人认为我脑力反应迟钝，思维不清晰，比较模糊。请问怎样锻炼脑力反应灵敏？...',
          time: '2020/09/23',
          yuedu: '25',
          huifu: '3'
        },
        {
          tit: '总被挑拨离间,拉邦结派伤害',
          con: '没有心计，能力不够，总被挑拨离间，拉邦结派  伤害，工作，生活，家庭，过的一团糟，寻求帮助...',
          time: '2020/09/24',
          yuedu: '11',
          huifu: '3'
        },
        {
          tit: '考试焦虑紧张',
          con: '害怕自己考不好，非常紧张...',
          time: '2020/09/25',
          yuedu: '5',
          huifu: '1'
        },
        {
          tit: '严重失眠心情焦虑',
          con: '最近非常焦虑，整夜不睡，生无可恋的感觉...',
          time: '2020/09/25',
          yuedu: '9',
          huifu: '1'
        },
        {
          tit: '请问我是神经衰弱了吗?',
          con: '从事的行业并不是非常高压。但是来了三周左右，基本每天都睡得很晚，早晨却都会醒的很早，大概五六点钟，然后就半醒半睡很久，直到起床...',
          time: '2020/09/25',
          yuedu: '45',
          huifu: '3'
        },
        {
          tit: '经常觉得累觉得想睡觉',
          con: '跟同龄人比更经常觉得累，而且晚上很早就想睡了，身体觉得累但睡不着，早上醒的早但不想起。每天能睡到6至7小时。为啥呢？...',
          time: '2020/09/25',
          yuedu: '81',
          huifu: '7'
        },
        {
          tit: '中度焦虑,如果预防呢',
          con: '总感觉自己是焦虑症，上网测试了下是中度的，近期一个多月明显的感觉自己头脑重，睡眠质量差，胡思乱想，体现晚上多，心跳快...',
          time: '2020/09/25',
          yuedu: '771',
          huifu: '20'
        }
      ],
      dialog1: false,
      form: {

      }
    }
  },
  created () {
    this.total = this.list.length
  },
  methods: {

  }
}
</script>
<style scoped>
ul{
  list-style: none;
  width: 800px;
  padding: 0;
}
ul li{
  border-bottom: 1px solid #f1f1f1;
}
ul li a{
  color: #1C9399;
}
p.i{
  color: #999;
}
p span{
  margin-right: 15px;
}
</style>
