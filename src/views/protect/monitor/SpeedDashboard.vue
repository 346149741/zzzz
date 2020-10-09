<template>
  <div>
    <div class="main">
      <img src="@/assets/dashboard/速度.png" alt="">
      <span ref="height" class="body"><img class="lightning" src="@/assets/dashboard/针1.png" alt=""></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeightDashboard',
  props: {
    full: {
      type: Number,
      required: true
    },
    current: {
      type: Number,
      required: true
    }
  },
  watch: {
    current: {
      immediate: false,
      handler: function(val) {
        this.changeStyle(val)
      }
    }
  },
  mounted() {
    this.changeStyle(this.current)
  },
  methods: {
    changeStyle(val) {
      // 从-120~120之间
      const scale = val / this.full * 240 - 120
      this.$refs.height.style.transform = `rotate(${scale}deg)`
    }
  }

}
</script>

<style lang="scss" scoped>
  .main {
    position: relative;
    width: 150px;
    height: 150px;

    .body {
      position: absolute;
      top: 10%;
      left: 46%;
      transform: rotate(-120deg);
      transform-origin: bottom center;
      .lightning{
        position: relative;
        top: 14px;
      }
    }
  }
</style>
