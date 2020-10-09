<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>文化骨干信息管理</span>
      </div>
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="部门：" class="filter-item">
            <el-input
              v-model="listQuery.params.bumen"
              type="text"
              class="filter-item"
              placeholder="请输入部门"
            />
          </el-form-item>
          <el-form-item label="姓名：" class="filter-item">
            <el-input
              v-model="listQuery.params.name"
              type="text"
              class="filter-item"
              placeholder="请输入姓名"
            />
          </el-form-item>
          <el-form-item class="filter-item">
            <el-button v-waves class="filter-item btn-base" type="primary">{{ $t('table.search') }}</el-button>
          </el-form-item>
        </el-form>
        <el-table stripe :data="list" class="t-bd" fit highlight-current-row>
          <el-table-column type="index" label="序号" width="50" />
          <el-table-column property="name" label="姓名" />
          <el-table-column property="sex" label="性别" />
          <el-table-column property="id" label="身份证号" />
          <el-table-column property="shengri" label="出生日期" />
          <el-table-column property="phone" label="联系电话" />
          <el-table-column property="bumen" label="部门" />
          <el-table-column property="jibie" label="骨干级别" />
          <el-table-column property="time1" label="申请时间" />
          <el-table-column property="time2" label="加入时间" />
          <el-table-column label="操作" width="50">
            <template slot-scope="scope">
              <div class="t-col-operate">
                <i class="el-icon-tickets primary table-i" title="详情" @click="dialog1 = true" />
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
    <el-dialog
      class="abow_dialog"
      title="详情"
      :visible.sync="dialog1"
      :close-on-click-modal="false"
      width="1260px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          骨干申请书<br>
          尊敬的营领导：<br>
          我是黄锦江，大二学员，现隶属编制为二连七班。本人2010年入伍，在原部队期间经历过副班长、班长、新兵营班长、车场值班班长、小车班副班长的骨干岗位，在任期间曾被评为优秀士官、优秀骨干，于2013年考学进入本校兵器工程专业地炮方向。在当兵的三年里，各种骨干岗位的历练让我成长成熟了许多，并且磨砺了我带兵的基础能力，增长了我的带兵经验，给予了我带兵的信心。入校以来，历经一年的观察与学习，我从一名普通的战士正在逐渐向一名合格的中华人民共和国军官成长，在一年中，我积极参加各项活动竞赛，认真揣摩班长骨干的带兵经验，了解院校与基层部队的区别，认真学习管理方法，为了让自己能够更快地学习成长，同时检验自己的学习效果，本人在此写下申请书，请求在下学期担任骨干，希望营领导能够给我这次机会。 作为一名部队考学的战士学员，基层的经历以及院校生活的结合让我学到了很多东西。<br>
          一、 锻造了我力争上游的积极态度。我深知，部队是一 个大集体、大熔炉、大学校、大社会，作为这个集体中的一份子，要想做每一件事情，都必须要先有 积极向上的态度，否则必将淹没在茫茫的人群里，难以脱颖而出，难以取得成绩。我想成为骨干是经历过深思熟虑的，作为共和国未来的指挥员，必须拥有优秀的指挥能力，必须能够透彻如何当好一个管理者，一个指挥者，因此，在这四年中，我必须要以积极主动的态度去学习如何做好管理，不能虚度光阴。<br>
          二、 培养了我强烈的责任心。担任骨干期间，我深刻意 识到，责任心是一个骨干立足的根本，上级将各种任务托付到骨干手中是对骨干的绝对信任，而作为骨干，则必须要用强烈的责任心去带领自己的所属人员去完成每一个任务，因为部队是一个有着严格纪律的武装集团。因此，要想把人带好，就要对上级负责，对集体负责，对所属人员负责，对身着的军装负责。所以说，强烈的责任心是一名优秀骨干的必备条件。<br>
          三、 提高了我管理带兵的能力素质。五年的军旅生涯， 两年的骨干经历让我管理方面的经验大幅度提高，应对各种任务的能力不断提升，无论是工作学习生活中都能与新、老兵处理各种问题。同时，能够针对不同的时期，不同的任务特点，不同的人员阶层，而用不同的管理方式灵活变通，分清主次，缓急、 轻重，做到有章可循，有法可依。<br>
          四、 加强了我自身的自制力。担任骨干经历让我明白了 作为一名骨干必须要有强硬的自制能力，要想管理好别人，必须先管理好自己，要想别人做的好，自己就应该带头做得更好！并且作为骨干，不能因为自己的个人情绪化而影响工作，要从大局出发，从实际出发，干好工作任务。<br>
          我也深刻地认识到自身仍然存在着许多缺点与不足。<br>
          一、 自我要求比较低。作为一名战士学员，作为一名受军队教育了五年的军人，在日常的工作、学习、生活中仍免不了存在自我要求太低的缺点。与同批进入学校的同年级地方学员相比，我本应该对自己要求得更加严厉，本应该站在排头当先锋做榜样，但在平时，我思想上却存在着只求过得去，不求过得硬的想法，在许多事情上给自己降低了标准，学习上偷懒耍滑，工作中不求过硬，训练上常常给自己定下轻而易举就能完成的计划。<br>
          二、 作风纪律不过硬。在学校一年来，本人在作风问题上仍存在许多问题。作风是一名合
          格军人的体现，是自身素质能力的外在表现，在学习上，自管自控松懈，抱有为考而学，为过而学的想法，在生活中，有时会 利用时间空隙、管理漏洞，给自己放松的机会，在训练中，没有能够做到依据计划进行，对训练抱有始终如一的热情，没有领会到作风纪律是自己的东西，锻造好的作风纪律得益的在于自己。<br>
          三、 工作态度不够积极。在日常的工作中，本人常常只对于骨干要求的事去做，而看到应该做的事却没有积极去做。一味地等待上级的安排，没有能够主动找事，没有主动向上级报告问题，没有主动向上级汇报思想，对一年级同志未能加强帮教。<br>
          四、 学习态度不够端正。作为战士学员，在学习上基础较为薄弱，起步比同一批的地方学员要晚，但是在学习中思想上仍然不够重视，常常想着偷懒一时，保过就行的想法，导致学习成绩不高，未能走在前列当好先锋，做好榜样。
          在下学期的工作中，我主要希望从这么几方面来提高自身素质、能力、水平，确保无论是在哪个工作岗位上都能尽心尽职，努力进取，决不辜负领导的谆谆教导和期望。<br>
          一、 努力提高自身要求。下学期将进入大三，历经一年的磨砺，本人从思想上明白了对自身严要求的重要性。在学习上，以力争前茅为自己的奋斗目标，战士学员低的起点决定不了我的成绩高度，我将以更加认真执着的态度去对待学习；在训练中，给自己制定合理训 练计划，加强训练量，把自己的优势发挥出来，以在运动会上能够为连里赢得荣誉；在平时的生活中，不断提高自身的作风纪律，严格要求自己，身先士卒，勇站排头当尖兵。<br>
          二、 认真对待本职工作。下学期无论我处在任何一个骨干岗位或者普通学员，我将以积极的态度、热情的态度来对待本职工作，对自己岗位内的事情做到尽职尽责，对工作做到点滴必争，对上级安排的各项任务做到坚决以最高的标准完成。<br>
          三、 不断提升作风纪律。针对本学期作风纪律不强的不足，在下学期中我将以各种条令法规为指导，以营里、连里的各项要求为红线，严格遵守各项纪律，并同时不断提高作风，树立严要求高标准的思想态势，凡事事无巨细，不漏死角，在作风纪律上做到尽善尽美。 四、 更快提高管理能力。在下学期中，本人希望能够借助骨干位置，加强学习借鉴，多向骨干询问经验，大胆尝试各种好的管理方法，不断提高任职经验，让自己成长得更快以适应未来下部队的第一任职。 最后，希望营领导能够给我这个机会，让我有一个学习的舞台，我必将用饱满的态势、积极的态度去做好每一件事，绝不辜负领导的一片期望！<br>
          此致<br>
          敬礼<br>
          申请人： xxx<br>
          2011年x月x日
        </div>
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
      list: [
        {
          name: '刘宇',
          sex: '男',
          id: '4102251990031251',
          shengri: '1988-06-21',
          phone: '15823010210',
          bumen: '一连一排',
          jibie: '一级',
          time1: '2020/02/10',
          time2: '2020/02/10'
        },
        {
          name: '王丽',
          sex: '女',
          id: '4102251990031252',
          shengri: '1990-09-04',
          phone: '15823010211',
          bumen: '三连一排',
          jibie: '三级',
          time1: '2020/02/10',
          time2: '2020/02/10'
        },
        {
          name: '张勇',
          sex: '男',
          id: '4102251990031253',
          shengri: '1990-09-04',
          phone: '15823010213',
          bumen: '一连一排',
          jibie: '四级',
          time1: '2020/02/10',
          time2: '2020/02/10'
        },
        {
          name: '刘宇',
          sex: '男',
          id: '4102251990031254',
          shengri: '1988-06-21',
          phone: '15823010214',
          bumen: '三连一排',
          jibie: '一级',
          time1: '2020/02/10',
          time2: '2020/02/10'
        },
        {
          name: '王丽',
          sex: '女',
          id: '4102251990031255',
          shengri: '1988-06-21',
          phone: '15823010219',
          bumen: '一连一排',
          jibie: '三级',
          time1: '2020/02/10',
          time2: '2020/02/10'
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
