<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>影视欣赏</span>
      </div>
      <div class="filter-container">
        <el-tabs v-model="activeName">
          <el-tab-pane
            v-for="(item, i) in list"
            :key="i"
            :label="item.type"
            :name="item.name"
          >
            <el-row :gutter="20">
              <el-col
                v-for="(cell, index) in item.children"
                :key="index"
                :span="4"
                class="item"
              >
                <el-card class="item-card">
                  <div style="text-align: center" @click="tiao()">
                    <el-image
                      v-if="cell.src"
                      class="image"
                      :src="cell.src"
                      fit="contain"
                    />
                  </div>
                  <div class="title tac">{{ cell.name }}</div>
                </el-card>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeName: 'tv',
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {

        }
      },
      total: null, // 总数
      list: [
        {
          type: '电视剧', name: 'tv', children: [
            { src: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1612013253,1780990169&fm=58&s=D4E70AF6440330F80E07D7AD0300B009', name: '亮剑', score: 0 },
            { src: 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1698751360,1976681445&fm=58&s=A580CBB0860075F50E9045470300E0D2', name: '潜伏', score: 0 },
            { src: 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1671676867,2329002803&fm=58&s=F43834D546B0E5D24229CDAD0300300B', name: '长征', score: 2 },
            { src: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1549802648,1685382701&fm=58&s=503A7BDA4A6282555C696D16030030D2', name: '悬崖', score: 1 },
            { src: 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1672015555,1914683069&fm=58&s=C6A601E618530EDE440FA7A50300300D', name: '红色', score: 3 },
            { src: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1826063900,1970221248&fm=58&s=971512CA0EB2159E8ACE93BD0300D00A', name: '光影', score: 1 },
            { src: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1767289473,2041755483&fm=58&s=715CF7AE540293EF1B0540960300D04E', name: '人间正道是沧桑', score: 1 },
            { src: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1596455066,2030014709&fm=58&s=15C5D4A604432AE47443343703001049', name: '解放海南岛', score: 0 },
            { src: 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1616692060,2023771475&fm=58&s=968546A612A186F94C17B5BE0300300A', name: '民兵葛二蛋', score: 0 },
            { src: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1691340968,1850451411&fm=58&s=1780D9A24C03A4C0489E07BC0300500E', name: '红娘子', score: 0 },
            { src: 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=705429448,1180466362&fm=58&s=C6B913C79A530ACE60952DB70300C002', name: '聂荣臻', score: 0 },
            { src: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1579055216,2065195941&fm=58&s=3F196B83508B1DED7E906D240300E090', name: '远去的飞鹰', score: 2 },
            { src: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1754570364,1871108482&fm=58&s=4F866C8E4A935BE17C2F52690300F06C', name: '小兵张嘎', score: 2 },
            { src: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1716795426,2019390562&fm=58&s=D7A60CE6C042BCFC1CDE493303001009', name: '五星红旗迎风飘扬第二部', score: 2 },
            { src: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1183852103,1478719930&fm=58&s=A544994E8C1A15DCCEEF1CB60300C010', name: '香格里拉', score: 2 },
            { src: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1385549808,1526195274&fm=58&s=56860CE6147383D60C45B5BC03000009', name: '五星红旗迎风飘扬第一部', score: 2 },
            { src: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1935640655,1980488343&fm=58&s=361715C756AAA6FC16CD74B80300E012', name: '铁梨花', score: 2 },
            { src: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3051089274,3941616737&fm=58&s=5F84CD0CC226F6FC163D7C8E0300E080', name: '钢铁是怎样炼成的', score: 2 },
            { src: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1549592886,1968520643&fm=58&s=D76005E240429AF6456960B103003093', name: '断刺', score: 2 },
            { src: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1798913849,1848013322&fm=58&s=45A229F78E4270C42E90996B03001010', name: '我的娜塔莎', score: 2 }
          ]
        },
        {
          type: '电影', name: 'movie', children: [
            { src: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1503072021,1577843713&fm=58&s=A42168B4D2037AEC62B8D9DF0300A0B3', name: '开国大典', score: 0 },
            { src: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=828740858,1313555829&fm=58&s=F61C7E8F9A9C5ACC2E3730E30300F02A', name: '末代皇帝', score: 0 },
            { src: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1439503938,1833218451&fm=58&s=B4A04EB45E034ADE3A13B6BD03001009', name: '七七事变', score: 1 },
            { src: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2298450839,3302929432&fm=58&s=4702C4AE888002D0553984B40300C007', name: '地道战', score: 1 },
            { src: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1838731529,2063574958&fm=58&s=F55358830131BBEF10698CA10300F0C2', name: '百团大战', score: 4 },
            { src: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1046270214,1382704432&fm=58&s=9684D64EC6639757566FE2A90300E00F', name: '建党伟业', score: 2 },
            { src: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1506014688,1896785559&fm=58&s=BF2C4687C0C2C1FD9698F4B10300D011', name: '智取威虎山', score: 2 },
            { src: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1726791204,1727626609&fm=58&s=9704D54F4AB684DA5EEF34BC0300700A', name: '建国大业', score: 2 },
            { src: 'https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1829282644,1827733866&fm=58&s=F588B5574A7047AFE019746E0300E070', name: '小兵张嘎', score: 2 },
            { src: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1449396434,1751307279&fm=58&s=43381AC5CE5101CC4C9A3D230300F053', name: '集结号', score: 2 },
            { src: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1513438737,2115506752&fm=58&s=03A405AFC2177FFD86AD19A30300F012', name: '大决战1:辽沈战役', score: 2 },
            { src: 'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1717038309,2123849062&fm=58&s=F3A8AEAE08434ADC8805A1A60300E04A', name: '闪闪的红星', score: 2 },
            { src: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1853136641,1899406494&fm=58&s=0E120DC744C615FD409954300300C010', name: '十月围城', score: 2 },
            { src: 'https://dss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1784835503,2061765309&fm=58&s=FEF3299A5E3379A584A1B5610300F0B1', name: '刘胡兰', score: 2 }
          ]
        },
        {
          type: '纪录片剧', name: 'documentary', children: [
            { src: 'http://p1.img.cctvpic.com/photoAlbum/vms/standard/img/2017/3/28/VSETxSjn2dFaLSoQklikhVMO170328.jpg', name: '《浴血中条山》', score: 0 },
            { src: 'http://p1.img.cctvpic.com/photoAlbum/vms/standard/img/2016/12/28/VSETZBvBbAp1NcmXSFecQFq0161228.jpg', name: '《远山的记忆》', score: 0 },
            { src: 'http://p1.img.cctvpic.com/photoAlbum/vms/standard/img/2016/11/24/VSETWfDYdjWWDTSsCIfJb5qm161124.jpg', name: '《渭华起义》', score: 2 },
            { src: 'http://p1.img.cctvpic.com/photoAlbum/vms/standard/img/2016/11/24/VSETDqZTJ632ja4BGVWcS3CL161124.jpg', name: '《B-29来华始末》', score: 0 },
            { src: 'http://p1.img.cctvpic.com/photoAlbum/vms/standard/img/2016/9/20/VSETKnQDQWYK15spC8qRDK77160920.jpg', name: '《改变世界的战争》', score: 2 },
            { src: 'http://p1.img.cctvpic.com/photoAlbum/vms/standard/img/2016/8/3/VSETpH7CPBdGcXoo8T0kQRqu160803.jpg', name: '《军工记忆——三线风云》精编版', score: 2 },
            { src: 'http://p1.img.cctvpic.com/photoAlbum/vms/standard/img/2016/6/30/VSETrnkOne2YpungiLRwakZ0160630.jpg', name: '《角逐超高空》', score: 2 },
            { src: 'http://p1.img.cctvpic.com/photoAlbum/vms/standard/img/2016/6/13/VSETA1wr8j56FSWFxOGoR0r5160613.jpg', name: '《淞沪会战—中日海空大决战》', score: 2 },
            { src: 'http://p1.img.cctvpic.com/photoAlbum/vms/standard/img/2016/4/19/VSETzPWiDoDMEIAEFQGvoZ3w160419.jpg', name: '《双面间谍塔夫林的秘密行动》精编版', score: 2 },
            { src: 'http://p1.img.cctvpic.com/photoAlbum/vms/standard/img/2016/4/11/VSET9O9GWbqG25dOrOOe0zhy160411.jpg', name: '《未来空战》精编版', score: 2 },
            { src: 'http://p1.img.cctvpic.com/photoAlbum/vms/standard/img/2016/4/11/VSET4m5frw2MM0FJ13KIYnQP160411.jpg', name: '《兰州空战》精编版', score: 2 },
            { src: 'http://p1.img.cctvpic.com/photoAlbum/vms/standard/img/2016/4/11/VSETbwG6xGCthtnbxaVTgBV5160411.jpg', name: '《战场记忆—俄罗斯二战老兵口述历史》', score: 2 },
            { src: 'http://p4.img.cctvpic.com/fmspic/vms/image/2015/12/30/VSET_1451460941826441.JPG', name: '总师传奇', score: 2 },
            { src: 'http://p2.img.cctvpic.com/fmspic/vms/image/2015/12/23/VSET_1450856323738663.jpg', name: '纪录频道《铁在烧》', score: 2 },
            { src: 'http://p1.img.cctvpic.com/fmspic/vms/image/2015/12/07/VSET_1449478086469980.jpg', name: '《王牌飞行员》精编版', score: 2 },
            { src: 'http://p3.img.cctvpic.com/fmspic/vms/image/2015/12/07/VSET_1449478094719877.jpg', name: '《白色方案：二战爆发之谜》精编版', score: 2 },
            { src: 'http://p3.img.cctvpic.com/fmspic/vms/image/2015/11/27/VSET_1448611756748840.jpg', name: '《30秒背后》', score: 2 },
            { src: 'http://p5.img.cctvpic.com/fmspic/vms/image/2015/11/27/VSET_1448612030824774.jpg', name: '纪录频道《大后方》', score: 2 },
            { src: 'http://p3.img.cctvpic.com/fmspic/vms/image/2015/12/03/VSET_1449119831519053.jpg', name: '《二战最后十八天》', score: 2 },
            { src: 'http://p1.img.cctvpic.com/fmspic/vms/image/2015/11/27/VSET_1448611708983553.jpg', name: '《解放上海——攻打苏州河》', score: 2 }
          ]
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
    tiao () {
      this.$router.push({ path: 'videodetils' })
    }
  }
}
</script>
<style lang="scss" scoped>
.item {
  margin-bottom: 20px;

  .txt,
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .tac {
    text-align: center;
  }

  .title {
    line-height: 40px;
    font-weight: 800;
  }

  .txt {
    color: #f1b41f;
  }

  .image {
    height: 200px;
  }
}

.item-card {
  cursor: pointer;
}
</style>
