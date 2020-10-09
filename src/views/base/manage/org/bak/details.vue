<template>
  <el-dialog title="查看" :visible.sync="dialogFormVisible" center width="750px" :before-close="close">
    <div class="dialogBox">
      <el-form ref="dataForm" :model="form" label-position="right" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="12">
<!--            <el-form-item label="机构名称" prop="name">-->
<!--              <el-input v-model="form.name" placeholder="请输入机构名称" />-->
<!--            </el-form-item>-->
            <p>机构名称:{{form.name}}</p>
          </el-col>
          <el-col :span="12">
<!--            <el-form-item label="显示序号" prop="sort">-->
<!--              <el-input-number v-model="form.sort" placeholder="请输入序号" />-->
<!--            </el-form-item>-->
            <p>显示序号:{{form.sort}}</p>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
<!--            <el-form-item label="机构负责人">-->
<!--              <el-input v-model="form.contacts" placeholder="请输入机构负责人" />-->
<!--            </el-form-item>-->
            <p>机构负责人:{{form.contacts}}</p>
          </el-col>
          <el-col :span="12">
<!--            <el-form-item label="负责人手机号" prop="contactsTel">-->
<!--              <el-input v-model="form.contactsTel" placeholder="请输入负责人手机号" />-->
<!--            </el-form-item>-->
            <p>负责人手机号:{{form.contactsTel}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
<!--            <el-form-item label="机构地址">-->
<!--              <el-input v-model="form.orgAddress" placeholder="请输入机构地址" />-->
<!--            </el-form-item>-->
            <p>机构地址:{{form.orgAddress}}</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
<!--            <el-form-item label="备注">-->
<!--              <el-input v-model="form.remark" placeholder="请输入备注" />-->
<!--            </el-form-item>-->
            <p>备注:{{form.remark}}</p>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">{{ $t('table.cancel') }}</el-button>
      <el-button type="primary" @click="close">{{ $t('table.confirm') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: 'Detail',
  props: {
    form: {},
    dialogFormVisible: {
      default: false
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
