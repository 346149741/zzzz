<template>
  <div>
    <div v-drag class="videoLocation">
      <div class="video-title-main">
        <div class="video-title">{{ title }}</div>
        <i class="el-icon-close videoLocation-title" @click="close" />
      </div>
      <table class="warning-table">
        <thead><th>单元</th><th>楼层</th><th>房间号</th><th>门禁状态</th></thead>
        <tbody>
          <tr v-for="(item,index) in B" :key="index">
            <td>{{ A }}单元</td>
            <td>{{ item }}楼</td>
            <td>{{ item }}01房间</td>
            <td><el-switch :value="item/4" /></td>
          </tr></tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingleImageDialog',
  data() {
    return {
      title: '',
      list: [],
      A: 0,
      B: 0
    }
  },
  created() {
  },
  mounted() {
    this.A = this.$_.random(1, 3)
    this.B = this.$_.random(1, 10)
  },
  methods: {
    close() {
      document.body.removeChild(this.$el)
    }
  }
}
</script>

<style lang="scss" scoped>
  .videoLocation{
    position: absolute;
    top: 45%;
    left: 45%;
    width: 380px;
    right: 300px;
    z-index:1900;
    height:auto;
    background: rgba(28, 147, 153, 0.5);
    border-radius: 4px;
    border: 1px solid #20EBF9;
    .video-title-main{
      padding: 0 10px;
      width: 380px;
      display: flex;
      justify-content: space-between;

      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: #20EBF9;
      line-height: 38px;
      .videoLocation-title{
        cursor: pointer;
        line-height: 38px;
      }
    }
   table{
     font-size: 13px;
     font-family: Microsoft YaHei;
     font-weight: 400;
     color: #FFFFFF;
     width:100%;
     border-collapse: collapse;
     tbody{
       text-align:center;
       tr{
         border:1px dashed #3F9E9F;
         td{
           padding: 5px 0;
         }
       }
     }
     thead{
       text-align:center;
       background: #188186;
       font-size: 14px;
       th{
         padding: 5px 0px;
       }
     }
   }
  }
</style>
