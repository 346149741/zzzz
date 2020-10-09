<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>交流互动</span>
      </div>
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="" class="filter-item">
            <el-input
              v-model="listQuery.params.name"
              type="text"
              class="filter-item"
              placeholder="请输入关键词"
            />
          </el-form-item>
          <el-form-item class="filter-item">
            <el-button v-waves class="filter-item btn-base" type="primary">{{
              $t("table.search")
            }}</el-button>
            <el-button
              class="filter-item btn-base filter-add-btn"
              @click="dialog1 = true"
              >提问</el-button
            >
          </el-form-item>
        </el-form>
        <ul>
          <li v-for="(item,index) in list" :key='index'>
            <h3>{{item.tit}}</h3>
            <i class="i">{{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.time}}</i>
            <p>{{item.con}}</p>
            <p>评论：{{item.n}}</p>
            <dl v-if="item.pinglun">
              <dd v-for="(t,i) in item.pinglun" :key='i'>
                <p>{{t.name}}</p>
                <p>{{t.con}}</p>
              </dd>
            </dl>
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
          tit: '习近平对“十四五”规划编制工作作出重要指示',
          name:'匿名',
          con: '新华社北京9月25日电 中共中央总书记、国家主席、中央军委主席习近平近日对“十四五”规划编制工作网上意见征求活动作出重要指示强调，通过互联网就“十四五”规划编制向全社会征求意见和建议，在我国五年规划编制史上是第一次。这次活动效果很好，社会参与度很高，提出了许多建设性的意见和建议。有关部门要及时梳理分析、认真吸收。广大人民群众提出的意见和建议广泛而具体，充分表达了对美好生活的新期盼。人民对美好生活的向往就是我们的奋斗目标，人民的信心和支持就是我们国家奋进的力量。要总结这次活动的经验和做法，在今后工作中更好发挥互联网在倾听人民呼声、汇聚人民智慧方面的作用，更好集思广益、凝心聚力。',
          time: '2020-09-25 11:14:43',
          n: '3',
          pinglun:[
            {
              name:'AwMnN1',
              con:'教育体系改良关乎祖国未来'
            },
            {
              name:'人在旅途F0lq ',
              con:'开门纳谏，倾听民声，集思广益，凝心聚力，确保“十四五”规划编制更加贴近人民群众的意愿。'
            },
            {
              name:'海阔zh天空',
              con:'人民至上，倾听人民群众的建议，发扬我党的优良传统，畅所欲言集思广益，完善规划，健康发展，盛世中华，永远繁荣富强！'
            },
          ]
        },
        {
          tit: '焦点访谈：世界问题多得很 大得很 怎么办？',
          name:'张某',
          con: '今年是世界反法西斯战争胜利75周年，也是联合国成立75周年。今年联合国大会的主题是“我们想要的未来，我们需要的联合国”。联合国是在战后为维护世界和平、加强国际合作成立的。在世界面临百年未有之大变局的今天，联合国将扮演什么角色？如何发挥作用？各个成员应该怎么做？这几天，联合国系列高级别会议召开，习近平主席应邀以视频方式出席并发表重要讲话，阐述了中国主张和方案。',
          time: '2020-09-25 11:48:47',
          n: '4',
        },
        {
          tit: '两名澳大利亚反华学者被禁止入境，中方回应',
          name:'王某',
          con: '汪文斌在当天举行的外交部例行记者会上表示，中方欢迎外国人士来华学习、工作和生活，客观介绍中国国情和内外政策，增进中国与外部世界的相互了解。同时，中方坚决反对任何打着学术幌子，传播虚假信息，蓄意抹黑攻击中国和危害中国国家安全的行为。',
          time: '2020年09月24日 15:44:04',
          n: '3',
        },
        {
          tit: '比尔·盖茨：2022年前美国无法征服新冠',
          name:'李某',
          con: '近日，盖茨接受美国Fox News采访时说：“最好的情况是，新冠病毒大流行可能在2022年终结。但是在2021年，如果全球都采取行动，我们应该能够降低其传播。这要感谢疫苗技术的到来，有了资金，公司请了最优秀的人才。这就是为什么我乐观地认为这种情况不会无限持续的原因。”',
          time: '2020年09月25日 13:27:31',
          n: '3',
        },
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
i{
  font-style: normal;
  color: #999;
}
dl{
  border: 1px solid #ccc ;
  font-style: 14px;
  padding:0 15px;
  border-radius: 10px;
}
dl dd{
  border-bottom: 1px solid #f1f1f1;
  margin: 0;
}
dl dd:last-child{
  border-bottom: none
}
</style>
