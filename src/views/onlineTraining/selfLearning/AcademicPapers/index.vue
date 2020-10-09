<template>
  <div>
    <div class="app-container">
      <el-card class="box-card app-body">
        <div slot="header" class="clearfix">
          <div class="header-title" style="display: flex;justify-content: space-between"><span style="cursor:pointer;" @click="$router.go(-1)">返回</span><span>学术论文</span><span /></div>
        </div>
        <el-row :gutter="20">
          <el-col v-for="(item,index) in list" :key="index" :span="6" class="item">
            <el-card class="item-card">
              <div class="title cc">{{ item.type }}</div>
              <div class="item-main">
                <div v-for="(cell ) in item.list" class="cell" @click="handeOpen">
                  <span class="cc time">{{ cell.time }}</span><span>{{ cell.title }}</span>
                </div>
              </div>
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
        <div style="padding: 20px"><h2 style="text-align: center">学术论文致谢词要点</h2>
          <h4 style="display: flex;justify-content: space-between">
            <span>2020-09-11 10:34:33</span><span>责任编辑：赵汤</span>
          </h4>
          <hr>
          <div style="padding: 20px 0; color: #aaa">能够表达科研成果的要属学术论文了，既体现科研工作者的专业水平和创新能力，也反映高等学校的科研与教学力量，是衡量高校办学质量的重要指标。</div>
          <div style="line-height: 40px">
            能够表达科研成果的要属学术论文了，既体现科研工作者的专业水平和创新能力，也反映高等学校的科研与教学力量，是衡量高校办学质量的重要指标。下面是学术参考网小编为朋友们搜集整理的学术论文致谢词，欢迎阅读！

            <br>
            　　论文致谢规范一
            <br>
            　　(1)致谢内容和致谢用词都必须征得被谢人或被谢单位的同意，因为他们虽然对整个论文不负直接责任，但是，对自己参与的工作部分是有社会责任的；
            <br>
            　　(2)对致谢的内容必须书写清楚，要实事求是，既不任意取舍也不夸张渲染，更不要为“装点论文门面”强拉名人“助威”，也不应该将致谢部分视为资助单位的宣传广告；
            <br>
            　　(3)致谢用词要简短、恳切、真诚、礼貌，通常仅用一句话表达，对被谢人或单位的情况不必作任何介绍；
            <br>
            　　(4)国标规定的录著格式为致谢用语应放在圆括号内，置于正文之末，并另起一行。通常习惯写法为“(本研究承蒙××单位×××教授指导完成，谨此致谢!)”、“(本文承蒙××同志审修，谨致谢意!)”、“(本试验中所用试剂均蒙××单位惠赠，谨致谢忱!)”。
            <br>
            　　论文致谢规范二
            <br>
            　　在文后致谢是表示感谢并记录在案的意思。对给予实质性帮助而又不能列为作者的单位或个人应在文后给予致谢。但必须征得被谢人的书面同意。
            <br>
            　　1.被致谢者的条件：(1)对研究提供资助的单位和个人、合作单位。(2)协助完成研究工作和提供便利条件的组织和个人。(3)协助诊断和提出重要建议的人。(4)给予转载和引用权的资料、图片、文献、研究思想和设想的所有者。(5)作出贡献又不能成为作者的人，如提供技术帮助和给予财力、物力支持的人，阐明其支援的性质。(6)其他需致谢者。
            <br>
            　　2.注意事项：致谢应避免以下倾向：(1)对确定给予了帮助的单位或个人，甚至用了他人的方法、思路、资料，为了抢先发表，而不公开致谢和说明。(2)出于某种考虑，将应将致谢人放在作者的位置上，混淆了作者和被致谢者的权利和义务。(3)以名人、知名专家包装自己的论文，抬高论文的身价，将未曾参与工作的，也未阅读过该论文的知名专家写在致谢中。
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
        {
          type: '军事论文',
          list: [
            { time: '05-26', title: '合训互动教学模式在军事体育教学中...' },
            { time: '05-26', title: '论文发表网特别推出：话说军事军事' },
            { time: '05-26', title: '浅议军事学硕士应具备的基本军事素质' },
            { time: '05-26', title: '从戚继光军事著作汲取军事训练理论的营养' },
            { time: '05-26', title: '面向实战培养装备保障指挥人才的思考' }
          ]
        },
        {
          type: '世界及各国军史',
          list: [
            { time: '05-26', title: '中美南海军事交锋的“冷思考”' },
            { time: '05-26', title: '那些年陪伴我们的军事玩具' },
            { time: '05-26', title: '浅析中国传统手卷绘画的个性化特' },
            { time: '05-26', title: '朝鲜朝前期的汉学家成果和吏学政' },
            { time: '05-26', title: '文森特·梵高的绘画美学思想研究' }
          ]
        },
        {
          type: '军事组织与管理',
          list: [
            { time: '05-26', title: '唐代藩镇割据的军事原因' },
            { time: '05-26', title: '维护我国海洋权益——军事理论课论文' },
            { time: '05-26', title: '浅析中国传统手卷绘画的个性化特' },
            { time: '05-26', title: '朝鲜朝前期的汉学家成果和吏学政' },
            { time: '05-26', title: '文森特·梵高的绘画美学思想研究' }
          ]
        },
        {
          type: '战略、战役、战术论文',
          list: [
            { time: '05-26', title: '傅依备：核化学家的赤子情怀' },
            { time: '05-26', title: '美国的战略东移与东北亚' },
            { time: '05-26', title: '浅析中国传统手卷绘画的个性化特' },
            { time: '05-26', title: '朝鲜朝前期的汉学家成果和吏学政' },
            { time: '05-26', title: '文森特·梵高的绘画美学思想研究' }
          ]
        }
      ]
    }
  },
  methods: {
    handeOpen() {
      console.log(111111111)
      this.dialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .item {
    margin-bottom: 20px;

    .cc {
      color: #1c9399;
    }

    .title {
      font-size: 20px;
      font-weight: 800;
      margin-bottom: 14px;
    }

    .item-main {
      padding: 0 10px;
      .cell{
        cursor: pointer;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        line-height: 30px;
        font-size: 16px;
      }

      .time{
        margin-right: 20px;
      }
    }

  }
</style>
