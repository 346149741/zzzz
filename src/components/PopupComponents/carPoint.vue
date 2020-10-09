<template>
  <div class="pop-track-node">
    <div class="pop-track-content">
      <div class="container-title">{{ info.text }}</div>
      <div class="container-con">
        <table>
          <tr class="inner_font"><td class="con-font">归属部门：</td><td>第59师</td></tr>
          <tr class="inner_font"><td class="con-font">当前位置：</td><td>湖南华南光电园区</td></tr>
          <tr class="inner_font"><td class="con-font">上报时间：</td><td>2020/09/24 09:20:26</td></tr>
          <tr class="inner_font"><td class="con-font">当前车速：</td><td>76km/h</td></tr>
          <tr class="inner_font"><td class="con-font">驾驶人：</td><td>张向东</td></tr>
          <tr class="inner_font"><td class="con-font">用车人：</td><td>李儒海</td></tr>
        </table>
        <div>
          <a class="Border">实时跟踪</a>
          <a class="Border">轨迹回放</a>
          <a class="Border">指令下发</a>
        </div>
      </div>
      <div class="vertical-bar">
        <div class="vertical-ball" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // 管线气泡
  name: 'CarPoint',
  data() {
    return {
    }
  },
  created() {
    console.log(this.info)
  },
  methods: {
    handleOpDisplay() { // 查看详情弹框
      // 参数：1)弹框开启状态 2）编辑或新增，编辑为true，新增为false  3)要素的属性值
      this.handleDisplay(true, true, this.info)
    },
    handleOpEdit() {
      // 参数：1)弹框开启状态 2）编辑或新增，编辑为true，新增为false  3)要素的属性值
      this.handleEdit(true, true, this.info)
    },
    // 巡更点删除
    handleOpDelete() {
      this.handleDelete(this.info.id)
    },
    getEnableName(val) {
      if (val === '00') {
        return '是'
      } else if (val === '01') {
        return '否'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
// 地图上定位信息的气泡弹窗
.pop-track-node {
  position:absolute;
  .pop-track-content {
    position: absolute;
    left: -153px;
    bottom: 57px;
  }

  .vertical-bar {
    position: absolute;
    left: 50%;
    height: 50px;
    border-left: 3px solid rgba(28, 147, 153, 0.5);

    .vertical-ball {
      position: absolute;
      bottom: -10px;
      left: -7px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: rgba(28, 147, 153, 0.5);
    }
  }

  .container-title {
    height: 40px;
    width: 305px;
    background-color: rgba(28, 147, 153, 0.5);
    color: #ffffff;
    font-size: 18px;
    text-align: center;
    line-height: 40px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .container-con {
    background-color: rgba(28, 147, 153, 0.5);
    color: #ffffff;
    line-height: 25px;
    font-size: 12px;
    border: 2px solid rgba(28, 147, 153, 0.5);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 16px 16px 32px 16px;
    .con-font{
      font-weight: 600;
      width: 80px;
      text-align: right;
      display: inline-block;
    }
    .Border{
      float:right;
      margin-right: 16px;
      color: #1C9399;
      width:70px;
      height:25px;
      text-align: center;
      line-height: 25px;
      cursor:pointer;
      float: right;
      background: #FFFFFF;
      border-radius: 2px;
      &:hover{
        text-decoration:underline;
      }
    }
  }
}
</style>
