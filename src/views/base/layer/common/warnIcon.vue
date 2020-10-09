<template>
  <div class="spot-icon">
    <div v-for="(item, index) in iconList" :key="index">
      <div class="contain-title">{{ item.legendType }}</div>
      <div class="contain-warns">
        <div v-for="(a, b) in item.children" :key="b" class="img-group" @click="selectIcon(a)">
          <div class="group-name">{{ a.name }}</div>
          <div v-for="(m, x) in a.legendList" :key="x" class="img-item">
            <img :src="m.image">
            <div class="img-font">{{ warnList[x].value }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LendAPI from '@/api/base/lend'
import { dictCode } from '@/api/base/dictDetail'
export default {
  name: 'SpotIcon',
  data() {
    return {
      iconList: []
    }
  },
  mounted() {
    this.geDictList()
  },
  methods: {
    geDictList() {
      this.warnList = []
      dictCode('2018').then(res => {
        this.warnList = res.data
        this.getList()
      })
    },
    getList() {
      LendAPI.groupList('3').then(res => {
        res.data.forEach(item => {
          if (item.children.length > 0) {
            item.children.forEach(i => {
              // 当是预警图例时把对象转换为数组
              i.legendDisplay = JSON.parse(i.legendDisplay)
              i.legendList = []
              for (const b in i.legendDisplay) {
                i.legendList.push(i.legendDisplay[b])
              }
            })
          }
        })
        this.iconList = res.data
      })
    },
    selectIcon(info) {
      this.$emit('warnSelect', info)
    }
  }
}
</script>

<style lang="scss" scoped>
  .spot-icon{
    position: absolute;
    background-color: white;
    width: 100%;
    height: auto;
    top: 0;
    left: 0;
    border: 1px solid #DCDFE6;
    overflow-y: auto;
    max-height: 300px;
  }
  .contain-title {
    padding-left: 22px;
    padding-right: 22px;
    font-size: 12px;
    font-weight: bold;
    height: 30px;
    line-height: 30px;
    color: #333a3d;
    background-color: rgb(245,247,250);
  }
  // 预警图例
  .contain-warns {
    position: relative;
    margin-bottom: 16px;
    .img-group {
      position: relative;
      display: inline-block;
      margin: 10px 20px 0 10px;
      background-color: rgba(248,248,248,1);
      border: 1px solid rgba(186,222,255,0);
      cursor: pointer;
      &:hover {
        border-color: rgba(186,222,255,1);
        .img-delete {
          display: block;
        }
      }
      .group-name {
        text-align: center;
        width: 100%;
        color: #444444;
        font-size: 12px;
        line-height: 20px;
        margin-top: 10px;
        font-weight: bold;
      }
      .img-item {
        position: relative;
        display: inline-block;
        width: 70px;
        height: 90px;
        margin: 0 8px;
        img {
          margin-top: 10px;
          padding-left: 15px;
          padding-right: 15px;
          width: 70px;
          height: 40px;
        }
        .img-font {
          display: inline-block;
          margin-top: 10px;
          width: 70px;
          text-align: center;
          font-size: 12px;
        }
      }
    }
  }
</style>
