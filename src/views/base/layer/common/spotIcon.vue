<template>
  <div class="spot-icon">
    <div v-for="(item, index) in iconList" :key="index">
      <div class="contain-title">{{ item.legendType }}</div>
      <div class="contain-imgs">
        <div v-for="(m, x) in item.children" :key="x" class="img-item" @click="selectIcon(m)">
          <img :src="m.legendDisplay.image">
          <div class="img-font">{{ m.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LendAPI from '@/api/base/lend'
export default {
  name: 'SpotIcon',
  data() {
    return {
      iconList: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      LendAPI.groupList('1').then(res => {
        res.data.forEach(item => {
          if (item.children.length > 0) {
            item.children.forEach(i => {
              i.legendDisplay = JSON.parse(i.legendDisplay)
            })
          }
        })
        this.iconList = res.data
      })
    },
    selectIcon(info) {
      this.$emit('iconSelect', info)
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
  // 二维图例
  .contain-imgs {
     position: relative;
    .img-item {
      position: relative;
      display: inline-block;
      width: 70px;
      height: 90px;
      margin-top: 10px;
      margin-left: 10px;
      margin-bottom: 10px;
      border: 1px solid rgba(186,222,255,0);
      &:hover {
        cursor: pointer;
        background-color: rgb(245,247,250);
      }
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
</style>
