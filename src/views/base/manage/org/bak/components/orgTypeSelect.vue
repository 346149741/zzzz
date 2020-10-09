<template>
  <el-select v-model="orgType" clearable placeholder="选择机构类型" class="filter-item" @change="changeType">
    <el-option
      v-for="item in orgTypeList"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>
<script>
export default {
  props: ['orgTypeValue'],
  data() {
    return {
      orgType: '',
      orgTypeList: [
        {
          value: '01',
          label: '公司运营'
        }, {
          value: '02',
          label: '无人机厂家'
        }, {
          value: '03',
          label: '甲方客户'
        }
      ]
    }
  },
  methods: {
    changeType(value) {
      this.$emit('changeOrgType', value)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
