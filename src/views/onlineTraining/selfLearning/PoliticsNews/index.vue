<template>
  <div>
    <div class="app-container">
      <el-card class="box-card app-body">
        <div slot="header" class="clearfix">
          <div class="header-title" style="display: flex;justify-content: space-between"><span style="cursor:pointer;" @click="$router.go(-1)">返回</span><span>政治要闻</span><span /></div>
        </div>
        <el-row :gutter="20">
          <el-col v-for="(item,index) in list" :key="index" :span="6" class="item">
            <el-card class="item-card">
              <div style="text-align: center" @click="handeOpen">
                <el-image
                  v-if="item.img"
                  class="image"
                  :src="item.img"
                  fit="contain"
                />
              </div>
              <h3 class="title">{{ item.title }}</h3>
              <div class="txt">{{ item.subtitle }}</div>
            </el-card>
          </el-col>
        </el-row>
      </el-card>

      <el-dialog
        class="abow_dialog detail-form"
        title="详情"
        :visible.sync="dialog"
        :close-on-click-modal="false"
        width="80%"
      >
        <div style="padding: 20px"><h2 style="text-align: center">富权文章：不畏浮云遮望眼，两岸交流破浪行</h2>
          <h4 style="display: flex;justify-content: space-between">
            <span>2020-09-22 10:34:33</span><span>责任编辑：汤立斌</span>
          </h4>
          <hr>
          <div style="padding: 20px 0; color: #aaa">核心提示：文章称，两岸交流是任何势力也阻挡不住的，这正是：“万山不许一溪奔，拦得溪声日夜喧。到得前头山脚尽，堂堂溪水出前村。”</div>
          <div style="line-height: 40px">
            参考消息网9月22日报道 澳门《新华澳报》9月21日发表富权的一篇题为《不畏浮云遮望眼，两岸交流破浪行》的文章，文章指出，第十二届海峡论坛如期在厦门举行，证明两岸交流是任何势力也阻挡不住的。内容摘编如下：

            尽管蔓延全球的新冠肺炎疫情仍未停息，也尽管两岸交流经历了风风雨雨，第十二届海峡论坛仍然如期在厦门举行。台湾方面仍有数百人冲破台当局设置的多道“铁丝网”，宁愿面对两岸检疫措施的不便，跨海出席本年度的海峡论坛。此证明，两岸交流是任何势力也阻挡不住的，这正是：“万山不许一溪奔，拦得溪声日夜喧。到得前头山脚尽，堂堂溪水出前村。”

            海峡论坛召开，而且全国政协主席汪洋专门录制视讯讲话与大家见面。汪洋在讲话中，除了一如既往地强调“九二共识”之外，特别警告“台独”是绝路。

            即使台湾地区发生了贬低、诋毁“九二共识”的情况，甚至是曾经长期以“九二共识”作为选举利器的国民党，也对“九二共识”产生动摇之时，北京仍然强调“九二共识”。这就显示，“九二共识”是“定海神针”，即使有暴风骤雨，也是坚定不移。

            对民进党而言，蔡英文是典型的“两面派”，一方面坚持民进党的“台独党纲”，及其本人研拟的“两国论”，并采取各种手段或是纵容其手下，进行“切香肠”式的“台独”；而另一方面却又因担心会引发台海战争而摧毁其“宝座”，不敢明目张胆地超越“红线”，甚至提出“和平、对等、民主、对话”的“八字箴言”，以图欺骗及麻痹对岸，得以恢复两岸会谈。但在蔡英文拒绝承认“九二共识”，尤其是近来向“台独”的死路滑得更远，并借着李登辉病亡进行“丧礼外交”，祈求全面突破“红线”，推动实质“台独”的情况下，汪洋的警告，就更具有针对性及现实性。

            对此，要作清醒的意识。要对任何“台独”言行实施高压手段，作出警告，粉碎其幻想。汪洋的谈话，就是如此；近日解放军的频密演习，战机突破所谓“台海中线”，也是如此。

            时间在大陆这边，在推动国家统一大业这边。前途是光明的，道路是曲折的，正因为如此，才更需要不屈不挠的斗争。
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelfLearning',
  data() {
    return {
      dialog: false,
      list: [
        { img: 'http://p7.itc.cn/c_fill,w_410,h_205,g_faces/images01/20200922/e2a6537d92264bfd998d2bf26340339f.jpeg', title: '俄公布六代机细节，造型科幻指标领先！美网友：不足为惧', subtitle: '近期，美国公布了自己的六代战机计划，并称六代战斗机的首飞已经完成。同时，也有美国航空爱好者在美国本土国民警卫队空军基地中发现了一架“从未见过”的新型战机，这很有可能就是美军六代战机的试验机了。与此同时，俄罗斯也紧随美国之后，对外界公布了本国的六代战斗机计划。比起美国“云里雾里”的技术指标，俄罗斯显然更为实在，' },
        { img: 'http://p2.itc.cn/c_fill,w_410,h_205,g_faces/q_70/images03/20200922/ccc5c82534484e79be018a5fc6edd139.jpeg', title: '为69II坦克正名！虽不先进，但却受多国青睐，成功出口数千辆', subtitle: '前些天，笔者在关于我国外贸69-II型中型坦克的话题上与某位网友产生了争执。对于笔者写的有关69-II的文章，这位网友表示：现在还要写这种坦克干什么，在 海湾战争中69-II被美军痛殴，说明了这种外贸坦克低劣质量，很丢脸。' },
        { img: 'https://p5.itc.cn/c_fill,w_410,h_205,g_faces,q_70/q_70/images03/20200925/1cd4ecdec9c44f1cb2afb7874384920c.jpeg', title: '涉私自收取好处、挪用资金等，上海65名房产经纪被禁业5年', subtitle: '9月25日，上海市房地产经纪行业协会发布《关于公示2020年第五批上海市房地产经纪从业人员“黑名单”的通告》（以下简称“《通告》”），公布了涉及违规的65名人员名单及违规内容，并对违规人员禁业5年' }
      ]
    }
  },
  methods: {
    handeOpen() {
      console.log(1111111111)
      this.dialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
.item{
  margin-bottom: 20px;
  .txt,.title{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .txt{
    color: #aaa;
    text-indent: 1em;
  }
  .image{
    height: 200px;
  }
}
  .item-card{
    cursor: pointer;
  }
</style>
