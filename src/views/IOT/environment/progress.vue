<template>
  <div class="circle-progress">
    <canvas id="canvas" style="margin-left: 10px;" width="120" height="110" />
    <div style="width: 100%;text-align: center;font-size: 12px;">首要污染物：{{ pollute }}</div>
    <div v-if="false" class="btns">
      <el-button @click="toCanvas('canvas', '#ffbf00', 10)">10</el-button>
      <el-button @click="toCanvas('canvas', '#ffbf00', 20)">20</el-button>
      <el-button @click="toCanvas('canvas', '#ffbf00', 30)">30</el-button>
      <el-button @click="toCanvas('canvas', '#ffbf00', 40)">40</el-button>
      <el-button @click="toCanvas('canvas', '#ffbf00', 50)">50</el-button>
    </div>
    <div v-if="false" class="btns">
      <el-button @click="toCanvas('canvas', '#ffbf00', 60)">60</el-button>
      <el-button @click="toCanvas('canvas', '#ffbf00', 70)">70</el-button>
      <el-button @click="toCanvas('canvas', '#ffbf00', 80)">80</el-button>
      <el-button @click="toCanvas('canvas', '#ffbf00', 90)">90</el-button>
      <el-button @click="toCanvas('canvas', '#ffbf00', 100)">100</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvas: '',
      percent: '',
      ctx: '',
      circleX: '',
      circleY: '',
      radius: '',
      cradius: '',
      lineWidth: '',
      fontSize: '',
      color: '',
      process: '',
      circleLoading: null,
      pollute: '柳絮'
    }
  },
  mounted() {
    this.toCanvas('canvas', '#ffbf00', 80)
  },
  methods: {
    // 两端圆点
    smallcircle1(cx, cy, r) {
      this.ctx.beginPath()
      // this.ctx.moveTo(cx + r, cy);
      this.ctx.lineWidth = 1
      this.ctx.fillStyle = '#06a8f3'
      this.ctx.arc(cx, cy, r, 0, Math.PI * 2)
      this.ctx.fill()
    },
    smallcircle2(cx, cy, r) {
      this.ctx.beginPath()
      // ctx.moveTo(cx + r, cy);
      this.ctx.lineWidth = 1
      this.ctx.fillStyle = '#fff'
      this.ctx.arc(cx, cy, r, 0, Math.PI * 2)
      this.ctx.fill()
    },
    // 画圆
    circle(cx, cy, r) {
      this.ctx.beginPath()
      // ctx.moveTo(cx + r, cy);
      this.ctx.lineWidth = this.lineWidth
      this.ctx.strokeStyle = '#104244'
      this.ctx.arc(cx, cy, r, (Math.PI * 2) / 3, (Math.PI * 1) / 3)
      this.ctx.stroke()
    },
    // 画弧线
    sector(cx, cy, r, startAngle, endAngle, anti) {
      this.ctx.beginPath()
      // ctx.moveTo(cx, cy + r); // 从圆形底部开始画
      this.ctx.lineWidth = this.lineWidth
      // 进度条颜色
      this.ctx.strokeStyle = this.color
      // 圆弧两端的样式
      this.ctx.lineCap = 'round'
      // 圆弧
      this.ctx.arc(cx, cy, r, (Math.PI * 2) / 3, (Math.PI * 2) / 3 + (endAngle / 100) * ((Math.PI * 5) / 3), false)
      this.ctx.stroke()
    },
    // 刷新
    loading(progress) {
      if (this.process >= this.percent) {
        clearInterval(this.circleLoading)
      }
      // 清除canvas内容
      this.ctx.clearRect(0, 0, this.circleX * 2, this.circleY * 2)
      // 中间的字
      this.ctx.font = 'normal bold 40px April'
      this.ctx.textAlign = 'center'
      this.ctx.textBaseline = 'middle'
      this.ctx.fillStyle = '#ffbf00'
      this.ctx.fillText(parseFloat(this.process).toFixed(0), this.circleX, this.circleY - 5)
      this.ctx.font = 'normal bold ' + this.fontSize + 'px April'
      this.ctx.fillStyle = '#ffbf00'
      if (progress <= 20) {
        this.ctx.fillText('超极低', this.circleX, this.circleY + 30)
      }
      if (progress > 20 && progress <= 30) {
        this.ctx.fillText('极低', this.circleX, this.circleY + 30)
      }
      if (progress > 30 && progress <= 50) {
        this.ctx.fillText('低', this.circleX, this.circleY + 30)
      }
      if (progress > 50 && progress <= 60) {
        this.ctx.fillText('中等', this.circleX, this.circleY + 30)
      }
      if (progress > 60 && progress <= 70) {
        this.ctx.fillText('及格', this.circleX, this.circleY + 30)
      }
      if (progress > 70 && progress <= 80) {
        this.ctx.fillText('高', this.circleX, this.circleY + 30)
      }
      if (progress > 80 && progress <= 90) {
        this.ctx.fillText('极高', this.circleX, this.circleY + 30)
      }
      if (progress > 90 && progress <= 100) {
        this.ctx.fillText('超极高', this.circleX, this.circleY + 30)
      }
      // 圆形
      this.circle(this.circleX, this.circleY, this.radius)
      // 圆弧
      this.sector(this.circleX, this.circleY, this.radius, (Math.PI * 2) / 3, this.process)
      // 两端圆点
      this.smallcircle1(
        this.cradius + Math.cos(((2 * Math.PI) / 360) * 120) * this.radius,
        this.cradius + Math.sin(((2 * Math.PI) / 360) * 120) * this.radius,
        0
      )
      this.smallcircle2(
        this.cradius +
          Math.cos(((2 * Math.PI) / 360) * (120 + this.process * 3)) * this.radius,
        this.cradius +
          Math.sin(((2 * Math.PI) / 360) * (120 + this.process * 3)) * this.radius,
        2
      )
      // 控制结束时动画的速度
      if (this.process / this.percent > 0.9) {
        this.process += 0.3
      } else if (this.process / this.percent > 0.8) {
        this.process += 0.55
      } else if (this.process / this.percent > 0.7) {
        this.process += 0.75
      } else {
        this.process += 1.0
      }
    },
    /** 生成环形进度条 **/
    toCanvas(id, color, progress) {
      clearInterval(this.circleLoading)
      // canvas进度条
      this.canvas = document.getElementById(id)
      this.percent = progress // 最终百分比
      this.ctx = this.canvas.getContext('2d')
      this.circleX = this.canvas.width / 2 // 中心x坐标
      this.circleY = this.canvas.height / 2 // 中心y坐标
      this.radius = 45 // 圆环半径
      this.cradius = 60 // canvas半径
      this.lineWidth = 6 // 圆形线条的宽度
      this.fontSize = 16 // 字体大小
      this.process = 0.0 // 进度
      this.color = color
      if (progress < 50) {
        this.circleLoading = window.setInterval(() => {
          this.loading(progress)
        }, 20)
      }
      if (progress >= 50 && progress < 70) {
        this.circleLoading = window.setInterval(() => {
          this.loading(progress)
        }, 10)
      }
      if (progress >= 70) {
        this.circleLoading = window.setInterval(() => {
          this.loading(progress)
        }, 6)
      }
    }
  }
}
</script>
<style lang="scss" scope>
  .circle-progress{
    h2{
      color: #ffbf00;
      margin: 160px 0 60px 0;
    }
    .btns{
      margin: 20px 0;
      .el-button--default{
        background-color: #ffbf00;
        color: #fff;
      }
    }
  }
</style>
