<!--部门树-->
<template>
  <el-col :span="5">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>组织机构名称</span>
      </div>
      <el-tree
        ref="tree"
        class="filter-tree"
        :data="orgDeptTreeData"
        node-key="id"
        :props="defaultProps"
        highlight-current
        default-expand-all
        :expand-on-click-node="false"
      >
      </el-tree>
    </el-card>
  </el-col>
</template>
<script>
import { getAllOrg } from '@/api/base/organ'
import { delchildren } from '@/utils/index'
export default {
  data () {
    return {
      orgDeptTreeData: null,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
    }
  },
  created () {
    this.getTree()
  },
  methods: {
    getTree () {
      getAllOrg().then(res => {
        res.data.forEach(item => {
          item.value = item.id
          item.label = item.organizationName
        })
        this.orgDeptTreeData = this.XEUtil.toArrayTree(res.data, {
          strict: false,
          parentKey: 'pid',
          key: 'id',
          children: 'children'
        })
        this.orgDeptTreeData = delchildren(this.orgDeptTreeData)
      })
    },
  }
}
</script>>