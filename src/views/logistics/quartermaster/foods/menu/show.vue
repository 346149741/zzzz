<template>
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>食谱查看</span>
      </div>
      <div>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-card>
              <div slot="header" class="clearfix subtitle">
                <span class="title">食堂列表</span>
              </div>
              <el-tree
                :data="canteenList"
                node-key="id"
                default-expand-all
                :highlight-current="true"
                :expand-on-click-node="false"
                :props="{ children: 'children', label: 'name' }"
                @node-click="handleNodeClick"
              />
            </el-card>
          </el-col>
          <el-col :span="20">
            <el-card>
              <div slot="header" class="clearfix subtitle ">
                <div class="asdfgh">
                  <span class="title">一周菜谱公布</span>
                  <span style="float:right;">
                    选择日期:
                    <el-date-picker
                      v-model="searchTime"
                      type="week"
                      size="small"
                      format="yyyy 第 WW 周"
                      placeholder="选择周"
                    />
                    <el-button
                      v-waves
                      class="filter-item btn-base ssssss"
                      type="primary"
                      size="mini"
                      icon="mr10 iconfont iconsousuo"
                      @click="handleFilter"
                    >查询</el-button>
                  </span>
                </div>
              </div>
              <div class="menu-table">
                <h3 style="text-align: center">2020年第32周</h3>
                <table class="main">
                  <tr>
                    <th><div>时间</div></th>
                    <th><div>星期一</div><div>2020-09-12</div></th>
                    <th><div>星期二</div><div>2020-09-13</div></th>
                    <th><div>星期三</div><div>2020-09-14</div></th>
                    <th><div>星期四</div><div>2020-09-15</div></th>
                    <th><div>星期五</div><div>2020-09-16</div></th>
                    <th><div>星期六</div><div>2020-09-17</div></th>
                    <th><div>星期日</div><div>2020-09-18</div></th>
                  </tr>
                  <tr>
                    <td>早</td>
                    <td>
                      <span>包子</span>
                      <span>油条</span>
                      <span>豆浆</span>
                    </td>
                    <td>
                      <span>包子</span>
                      <span>馒头</span>
                      <span>小米粥</span>
                    </td>

                    <td>
                      <span>米粉</span>
                      <span>豆浆</span>
                    </td>

                    <td>
                      <span>包子</span>
                      <span>油条</span>
                      <span>豆浆</span>
                    </td>

                    <td>
                      <span>包子</span>
                      <span>油条</span>
                      <span>豆浆</span>
                    </td>

                    <td>
                      <span>包子</span>
                      <span>油条</span>
                      <span>豆浆</span>
                    </td>

                    <td>
                      <span>包子</span>
                      <span>油条</span>
                      <span>豆浆</span>
                    </td>
                  </tr>
                  <tr>
                    <td>午</td>
                    <td>
                      <span>红烧排骨</span>
                    </td>
                    <td>
                      <span>土豆牛肉</span>
                    </td>

                    <td>
                      <span>韭菜鸡蛋</span>
                    </td>

                    <td>
                      <span>豆角茄子</span>
                    </td>

                    <td>
                      <span>香菇鸡丁</span>
                    </td>

                    <td>
                      <span>麻婆豆腐</span>
                    </td>

                    <td>
                      <span>肉沫茄子</span>
                    </td>
                  </tr>
                  <tr>
                    <td>晚</td>
                    <td>
                      <span>清炒藕片</span>
                    </td>
                    <td>
                      <span>地三鲜</span>
                    </td>

                    <td>
                      <span>木须肉</span>
                    </td>

                    <td>
                      <span>番茄炒蛋</span>
                    </td>

                    <td>
                      <span>家常豆腐</span>
                    </td>

                    <td>
                      <span>红烧肉</span>
                    </td>

                    <td>
                      <span>小炒牛肉</span>
                    </td>
                  </tr>
                </table>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import { canteenList } from '../mockData'

export default {
  name: 'MenuShow',
  data() {
    return {
      canteenList,
      searchTime: ''
    }
  },
  methods: {
    handleFilter() {

    },
    handleNodeClick() {

    }
  }
}
</script>

<style lang="scss" scoped>
  .subtitle {
    .title, .asdfgh /deep/ span{
      font-weight: 600;
      font-size: 16px;
      color: #000;
    }
  }
  .ssssss /deep/ span{
    color: #fff!important;
  }

  .menu-table {
    .main{
      border: 1px solid #eee;
      width: 100%;
      padding: 10px;
      border-spacing: 0;
      border-collapse: collapse;
      th,td {
        border: 1px solid #eee;
        height: 100px;
        padding-left: 10px;
      }

    }
  }
</style>
