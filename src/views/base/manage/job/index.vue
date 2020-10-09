<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>调度任务</span>
      </div>
      <!--搜索条件-->
      <div class="filter-container">
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="handleCreate"
        >{{ $t('table.add') }}</el-button>
      </div>

      <!--分页内容-->
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        stripe
        :data="list"
        fit
        style="width: 100%;"
      >
        <el-table-column align="center" label="序号" width="50px">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="任务名称" width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.jobName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="执行类">
          <template slot-scope="scope">
            <span>{{ scope.row.jobClassName }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="CRON表达式" width="120px">
          <template slot-scope="scope">
            <span>{{ scope.row.cronExpression }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="任务状态" width="120px">
          <template slot-scope="scope">
            <el-tag :type="scope.row.triggerState | triggerStateFilter">{{ scope.row.triggerState }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="下次执行时间">
          <template slot-scope="scope">
            <span>{{ scope.row.nextFireTime }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="开始时间">
          <template slot-scope="scope">
            <span>{{ scope.row.startTime }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="结束时间">
          <template slot-scope="scope">
            <span>{{ scope.row.endTime }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="$t('table.actions')"
          class-name="small-padding fixed-width"
          width="350px"
        >
          <template slot-scope="scope">
            <el-button-group>
              <!-- <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleUpdate(scope.row)" >{{$t('table.edit') }}</el-button> -->
              <i class="el-icon-edit primary table-i" :title="$t('table.edit')" @click="handleUpdate(scope.row)" />
              <!-- <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleDelete(scope.row.jobName)" >{{$t('table.delete') }}</el-button> -->
              <i class="el-icon-delete danger table-i" :title="$t('table.delete')" @click="handleDelete(scope.row.jobName)" />
              <!-- <el-button type="info" size="mini" icon="el-icon-news" @click="handlePause(scope.row.jobName)" >暂停</el-button> -->
              <i class="el-icon-news info table-i" title="暂停" @click="handlePause(scope.row.jobName)" />
              <!-- <el-button type="success" size="mini" icon="el-icon-star-off" @click="handleResume(scope.row.jobName)" >恢复</el-button> -->
              <i class="el-icon-star-off success table-i" title="恢复" @click="handleResume(scope.row.jobName)" />
              <!-- <el-button type="warning" size="mini" icon="el-icon-setting" @click="handleTrigger(scope.row.jobName)" >触发</el-button> -->
              <i class="el-icon-setting warning table-i" title="触发" @click="handleTrigger(scope.row.jobName)" />
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--新增/修改弹出层-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="form"
        label-position="left"
        label-width="100px"
      >
        <el-form-item label="任务名称" prop="jobName">
          <el-input v-model="form.jobName" placeholder="请输入任务名称" />
        </el-form-item>
        <el-form-item label="执行类" prop="jobClassName">
          <el-input v-model="form.jobClassName" placeholder="请输入执行类" />
        </el-form-item>
        <el-form-item label="表达式" prop="cronExpression">
          <el-input
            v-model="form.cronExpression"
            auto-complete="off"
            placeholder="请选择CRON表达式"
            :disabled="true"
          >
            <el-button
              v-if="!showCronBox"
              slot="append"
              icon="el-icon-arrow-up"
              title="打开配置"
              @click="showCronBox = true"
            />
            <el-button
              v-else
              slot="append"
              icon="el-icon-arrow-down"
              title="关闭配置"
              @click="showCronBox = false"
            />
          </el-input>
          <cron v-if="showCronBox" v-model="form.cronExpression" />
        </el-form-item>
        <el-form-item label="执行时间" prop="startToEnd">
          <el-date-picker
            v-model="form.startToEnd"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          v-if="dialogStatus=='create'"
          type="primary"
          @click="createData"
        >{{ $t('table.confirm') }}</el-button>
        <el-button v-else type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  jobList,
  save,
  update,
  remove,
  pause,
  trigger,
  resume
} from '@/api/base/job'
import cron from '@/components/cron/cron'

export default {
  name: 'JobPage',
  components: {
    cron
  },
  filters: {
    triggerStateFilter(state) {
      const statusMap = {
        ACQUIRED: 'success',
        WAITING: 'info',
        PAUSED: 'danger'
      }
      return statusMap[state]
    }
  },
  data() {
    return {
      showCronBox: false,
      filterText: '',
      tableKey: 0,
      list: null,
      listLoading: true,
      form: {
        jobName: undefined,
        jobClassName: undefined,
        cronExpression: undefined,
        startToEnd: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      rules: {
        jobName: [
          {
            required: true,
            message: '请填写任务名称',
            trigger: 'blur'
          }
        ],
        jobClassName: [
          {
            required: true,
            message: '请填写执行类全路径名称',
            trigger: 'blur'
          }
        ],
        cronExpression: [
          {
            required: true,
            message: '请填写CRON表达式',
            trigger: 'blur'
          }
        ],
        startToEnd: [
          {
            required: true,
            message: '请选择任务开始结束时间',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      jobList().then((response) => {
        this.list = response.data
        this.listLoading = false
      })
    },
    resetForm() {
      this.form = {
        jobName: undefined,
        jobClassName: undefined,
        cronExpression: undefined,
        startToEnd: undefined
      }
    },
    handleCreate() {
      this.resetForm()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.showCronBox = false
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.form.startTime = this.form.startToEnd[0]
          this.form.endTime = this.form.startToEnd[1]
          delete this.form.startToEnd
          save(this.form).then(() => {
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.form = Object.assign({}, row) // copy obj
      const arr = []
      arr.push(this.form.startTime)
      arr.push(this.form.endTime)
      this.form.startToEnd = arr
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.showCronBox = false
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.form.startTime = this.form.startToEnd[0]
          this.form.endTime = this.form.startToEnd[1]
          delete this.form.startToEnd
          update(this.form).then(() => {
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(jobName) {
      this.$confirm('确认删除？').then(() => {
        remove(jobName).then(() => {
          this.getList()
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
      })
    },
    handlePause(jobName) {
      pause(jobName).then(() => {
        this.getList()
        this.$notify({
          title: '成功',
          message: '暂停成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleResume(jobName) {
      resume(jobName).then(() => {
        this.getList()
        this.$notify({
          title: '成功',
          message: '恢复成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    handleTrigger(jobName) {
      trigger(jobName).then(() => {
        this.getList()
        this.$notify({
          title: '成功',
          message: '触发成功',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>
