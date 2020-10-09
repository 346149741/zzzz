<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>教育计划管理</span>
      </div>
      <div class="filter-container">
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
          <el-table-column property="name" label="课程名称" width="100" />
          <el-table-column property="n" label="学期编号" width="80" />
          <el-table-column property="type" label="课程类型" width="80" />
          <el-table-column property="fangshi" label="考核方式" width="80" />
          <el-table-column property="xuefen" label="课程学分" width="80" />
          <el-table-column property="keshi" label="课时（分钟）" width="120" />
          <el-table-column property="jichu" label="基础课程" width="80" />
          <el-table-column property="time" label="创建时间" width="120" />
          <el-table-column property="tips" label="摘要" />
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <div class="t-col-operate">
                <i class="el-icon-tickets primary table-i" title="课程表" @click="dialog2 = true" />
                <i class="el-icon-delete danger table-i" title="删除" />
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
                  <el-form-item label="课程名称：" prop="code">
                    <el-input v-model="form.code" placeholder="请输入课程名称" />
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="学期编号：" prop="name">
                    <el-input v-model="form.name" placeholder="请输入学期编号" />
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="课程类型：" prop="certType">
                    <el-select v-model="form.certType" placeholder="请选择课程类型" class="form-item1">
                      <el-option label value />
                    </el-select>
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="考核方式：" prop="certType">
                    <el-select v-model="form.fangshi" placeholder="请选择考核方式" class="form-item1">
                      <el-option label value />
                    </el-select>
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="课程学分：" prop="name">
                    <el-input v-model="form.num" placeholder="请输入课程学分" />
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="课时：" prop="name">
                    <el-input v-model="form.dan" placeholder="请输入课时" />
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="摘要：" prop="name">
                    <el-input v-model="form.zong" placeholder="请输入摘要" />
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="基础课程：" prop="certType">
                    <el-select v-model="form.fangshi" placeholder="请选择" class="form-item1">
                      <el-option label value />
                    </el-select>
                  </el-form-item>
                </el-row>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog1 = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialog1 = false">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      class="abow_dialog"
      title="课程表"
      :visible.sync="dialog2"
      :close-on-click-modal="false"
      width="1260px"
    >
      <div class="dialog-content">
        <div class="dialog-item"><img src="./img9.png" alt="" style="width:932px;margin:0 auto;display:block"></div>
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
          name: '国防法规',
          n: '1',
          type: '必修',
          fangshi: '考查',
          xuefen: '4',
          keshi: '40',
          jichu: '是',
          time: '2020/01/20',
          tips: '国防法规是由国家立法机关制定的并以国家强制力保证其实施的，用于调整国防体制、武装力量建设、国防科技建设、战争动员体制、国防生产...'
        },
        {
          name: '轻武器射击',
          n: '2',
          type: '必修',
          fangshi: '考试',
          xuefen: '3',
          keshi: '40',
          jichu: '否',
          time: '2020/01/20',
          tips: '轻武器通常指枪械及其他各种由单兵或班组携行战斗的武器。又称 “轻兵器”。主要装备对象是步兵，也广泛装备于其他军种和兵种。其主要作战用途是杀伤有生力量...'
        },
        {
          name: '单兵战术',
          n: '3',
          type: '必修',
          fangshi: '考试',
          xuefen: '4',
          keshi: '45',
          jichu: '是',
          time: '2020/01/20',
          tips: '单兵战术动作单兵通常在班（组）内行动，主要任务是以手中武器和爆破器材，打、炸敌坦克、战斗车，消灭敌步兵。在战斗中，单兵必须发扬优良的战斗作风...'
        },
        {
          name: '识图用图',
          n: '3',
          type: '必修',
          fangshi: '考试',
          xuefen: '5',
          keshi: '40',
          jichu: '是',
          time: '2020/01/20',
          tips: '识图用图识别与使用军用地图的简称。是军事地形学研究内容之一。识图用图对于正确利用地形条件，遂行作战任务具有重要作用...'
        },
        {
          name: '军事思想',
          n: '1',
          type: '必修',
          fangshi: '考试',
          xuefen: '4',
          keshi: '50',
          jichu: '否',
          time: '2020/01/20',
          tips: '关于战争与国防基本问题军事及其相关的高层次系统的问题的理性认识。通常包括战争观、战争问题方法论、战争指导思想、建军指导思想等基本内容...'
        },
        {
          name: '军事科技',
          n: '3',
          type: '必修',
          fangshi: '考试',
          xuefen: '3',
          keshi: '60',
          jichu: '否',
          time: '2020/01/20',
          tips: '军事科学技术，包括研究军事领域的相关理论和军事，国防领域的前沿的技术的研究。在这个高科技发展日新月异的时代，战争形态已经发生了改变...'
        },
        {
          name: '现代国防',
          n: '2',
          type: '必修',
          fangshi: '考查',
          xuefen: '5',
          keshi: '35',
          jichu: '是',
          time: '2020/01/20',
          tips: '国防现代化，是为适应现代战争的客观规律，用先进科学技术武装起来的国家防卫体系，使国防力量达到世界先进水平的一系列措施的总称...'
        },
        {
          name: '国际战略环境',
          n: '1',
          type: '必修',
          fangshi: '考查',
          xuefen: '4',
          keshi: '40',
          jichu: '否',
          time: '2020/01/20',
          tips: '国际战略环境，是一个时期内世界各主要国家（集团）在矛盾、斗争或合作、共处中的全局状况和总体趋势。世界各主要国家和政治集团在一定时期内在战略上相互联系...'
        },
        {
          name: '高技术战争',
          n: '3',
          type: '必修',
          fangshi: '考查',
          xuefen: '3',
          keshi: '55',
          jichu: '否',
          time: '2020/01/20',
          tips: '交战双方至少有一方大量使用高技术武器和相应的战略战术进行的战争，称为高技术战争。技术战争的以上特征，对军事上的影响，可以说是革命性的...'
        },
        {
          name: '共同条令',
          n: '2',
          type: '必修',
          fangshi: '考查',
          xuefen: '5',
          keshi: '60',
          jichu: '是',
          time: '2020/01/20',
          tips: '中国人民解放军的共同条令包括内务条令、纪律条令、队列条令。用简明条文规定，由最高国家军事机关发布施行。共同条令的内容涵盖了军队建设活动的基本方面...'
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
