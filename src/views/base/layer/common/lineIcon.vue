<template>
  <div class="line-icon">
    <el-form ref="groupForm" :model="groupForm" label-position="right" label-width="60px">
      <el-form-item label="线型" prop="lineDash">
        <el-input v-show="false" v-model="groupForm.lineDash" />
        <el-popover v-model="visible" placement="bottom" width="490px">
          <div>
            <div v-for="item in lineTypeList" :key="item" class="line-style-item" @click="borderStyleSelect(item)">
              <div :style="{height: '10px', width: '450px', borderBottomStyle: item, borderBottomWidth: '1px', borderBottomColor: '#000000'}" />
            </div>
          </div>
          <div slot="reference" ref="lineSelect" class="line-select">
            <div style="width: 450px;height: 10px;margin-top: 10px;margin-left: 10px;border-bottom: 1px solid #000000;"/>
          </div>
        </el-popover>
      </el-form-item>
      <el-form-item label="线色" prop="color">
        <el-color-picker v-model="groupForm.color" size="medium" show-alpha/>
      </el-form-item>
      <el-form-item label="线宽" prop="width">
        <el-input-number v-model="groupForm.width" :min="1" :max="100" :precision="0" />
      </el-form-item>
      <el-form-item label="填充色" prop="fill" v-show="popData === '2'">
        <el-color-picker v-model="groupForm.fill" size="medium" show-alpha/>
      </el-form-item>
    </el-form>
    <el-button style="position: relative;float: right;margin-top: -10px;" size="mini" @click="saveData">确定</el-button>
  </div>
</template>

<script>
export default {
  name: 'LineIcon',
  props: ['popData', 'lineData'],
  data() {
    return {
      groupForm: {
        lineDash: 'solid',
        color: 'rgba(0, 0, 0, 1)',
        width: 1,
        fill: 'rgba(255, 255, 255, 1)'
      },
      lineTypeList: ['solid', 'dashed', 'dotted', 'double'],
      visible: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initData()
    })
  },
  methods: {
    initData() {
      if (this.lineData.stroke.color !== '') {
        this.groupForm.lineDash = this.lineData.stroke.lineDash
        this.groupForm.color = this.lineData.stroke.color
        this.groupForm.width = this.lineData.stroke.width
        this.$refs.lineSelect.innerHTML = `<div style='width: 450px;height: 10px;margin-top: 10px;margin-left: 10px;border-bottom:${this.groupForm.width}px ${this.groupForm.lineDash} ${this.groupForm.color};'/>`
      }
      if (this.lineData.fill !== '') {
        this.groupForm.fill = this.lineData.fill
      }
    },
    borderStyleSelect(val) {
      this.groupForm.lineDash = val
      this.$refs.lineSelect.innerHTML = `<div style='width: 450px;height: 10px;margin-top: 10px;margin-left: 10px;border-bottom: 1px ${val} #000000;'/>`
      this.visible = false
    },
    saveData() {
      this.$emit('iconSelect', this.groupForm)
    }
  }
}
</script>
<style lang="scss" scoped>
.line-select {
  width: 100%;
  height: 40px;
  border: 1px solid #DCDFE6;
  border-radius: 4px;
  &:hover{
    border: 1px solid #C0C4CC;
  }
}
.line-style-item {
  padding: 5px 0 10px 0;
  cursor: pointer;
  &:hover {
    background-color: #DCDFE6;
  }
}
</style>

<style lang="scss">
.line-icon {
  .el-form{
    border-width: 0!important;
    padding-right: 40px!important;
    .el-form-item__label {
      font-size: 14px;
    }
    .el-form-item {
      margin-bottom: 10px;
    }
  }
}
</style>
