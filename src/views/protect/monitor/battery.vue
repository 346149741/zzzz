<template>
  <div>
    <div class="main">
      <img src="@/assets/battery/battery.png" alt="">
      <img class="lightning" src="@/assets/battery/lightning.png" alt="">
      <div ref="power" class="fill-color" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Battery',
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
      let power = val / this.full
      if (power < 0)power = 0
      this.$refs.power.style.height = `${power * 66}px`
      if (power > 0.2) {
        this.$refs.power.style.backgroundColor = '#81C020'
      } else {
        this.$refs.power.style.backgroundColor = '#dc2719'
      }
    }
  }

}
</script>

<style lang="scss" scoped>
  .main {
    position: relative;
    width: 36px;
    height: 73px;

    .fill-color {
      background-color: #81C020;
      height: 66px;
      position: absolute;
      width: 34px;
      left: 1px;
      bottom: 2px;
      border-radius: 6px;
    }

    .lightning {
      z-index: 99;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
