<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>心理资讯</span>
      </div>
      <div class="filter-container">
        <ul>
          <li v-for="(item,index) in list" :key='index'>
            <h3>{{item.name}}</h3>
            <p>{{item.neirong}}<a href="#">查看更多>></a></p>
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
          name: '匮乏感——正在拉低你的生命质量！',
          neirong: '有钱、拥有很多物质，也不一定会幸福，根源就是“骨子里的匮乏感”。改变匮乏感，才是改变生命质量的根本。“穷”和“匮乏”是两码事。很多人过的并不幸福，其实并不是因为真的“穷”，而是“匮乏”...',
        },
        {
          name: '咨询师，你为啥不给我建议？',
          neirong: '心理咨询与跟朋友聊天非常不同。尽管两者都是陪伴，陪伴的方式、内容、过程和体验却不同。显而易见的不同中，有一项是：专业的咨询师通常不会给你直接提建议...',
        },
        {
          name: '五种情绪纾解方法',
          neirong: '不断苛责自已,说丧气话的人,通常是对自己不够肯定的人。要对自己温柔点,停止猛烈的批评,是建立自信的第一步,她建议,拿枝笔列出你不断在责骂自己的话语,并且自问看到这些话会有什么感觉...',
        },
        {
          name: '6种愤怒情绪的类型和心理处方',
          neirong: '人在生活中不可避免总会遇到一些愤怒的事，但如果长期压抑自己，不将愤怒爆发出来，将会对自己有很大的伤害，比如打击你的自尊，甚至伤害你的身体，带来高血压和心脏病...',
        },
        {
          name: '抑郁倾向的九大特征',
          neirong: '抑郁症是一种威胁心理健康以及身体健康的一种疾病,如今的社会，虽然生活水平不断提高，但是患上抑郁症的人也不在少数。抑郁症正在成为仅次于癌症的人类第二大杀手...',
        },
        {
          name: '强迫症和强迫行为是一回事吗？',
          neirong: '相信很多人在日常生活中都会或多或少的有一些强迫行为，比如出门时会检查几遍门窗有没有关好，东西有没有带齐等，我们也经常会开玩笑的说某人有“强迫症”。但是真正的强迫症患者他们是非常痛苦的...',
        },
        {
          name: '性格内向≠社交恐惧症',
          neirong: '这些情况，相信每个人多多少少都遇到、听说过，人际焦虑比你想象中要普遍。在人际互动的关系中有一定程度的紧张和焦虑，但远远达不到“社交恐惧症”的级别程度的情况很常见...',
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
ul li a{
  color: #1C9399;
}
</style>
