<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>巡防预警</span>
      </div>
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="事件类型：" class="filter-item">
            <el-select
              v-model="listQuery.params.eventType"
              clearable
              class="form-item"
            >
              <el-option
                v-for="(item,key) in dictList[2017]"
                :key="key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="处理状态：" class="filter-item">
            <el-select
              v-model="listQuery.params.handleState"
              clearable
              class="form-item"
            >
              <el-option
                v-for="(item,key) in dictList[2018]"
                :key="key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item class="filter-item">
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont el-icon-search"
              @click="handleFilter"
            >{{ $t('table.search') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table v-loading="listLoading" stripe :data="list" class="t-bd" fit highlight-current-row>
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column property="eventNo" label="事件编号" />
        <el-table-column property="eventTypeName" label="事件类型" />
        <el-table-column property="remark" label="事件描述" />
        <el-table-column property="handleStateName" label="处理状态" />
        <el-table-column property="uploadTime" label="上报时间" />
        <el-table-column property="uploadOrg" label="上报单位" />
        <el-table-column property="beginTime" label="上报人" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div class="t-col-operate">
              <i class="el-icon-tickets primary table-i" title="详情" @click="details(scope.row.id)" />
              <i v-if="scope.row.handleState==='01'" class="el-icon-s-ticket info table-i" title="处理" @click="dealItem(scope.row.id)" />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!--分页工具条-->
      <div class="pagination-container">
        <el-pagination
          background
          :current-page="listQuery.pageNo"
          :page-sizes="[10,20,30, 50]"
          :page-size="listQuery.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listTotal"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <el-dialog
      class="abow_dialog detail-form"
      title="详情"
      :visible.sync="detailVisible"
      :close-on-click-modal="false"
      width="50%"
    >
      <div class="dialog-content">
        <div class="dialog-item-title">告警信息</div>
        <div class="dialog-item">
          <el-form ref="ruleForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="预警区域：">
                  {{ form.position }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="预警时间：" prop="sex">
                  {{ form.eventTime }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="设备来源：" prop="certificates">
                  {{ form.a }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="告警类型：" prop="certificateNo">
                  {{ form.a }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="预警级别：" prop="company">
                  {{ form.a }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item class="form-item1" label="处理状态：" prop="phone">
                  {{ form.a }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="上报人：" prop="birthday">
                  {{ form.a }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="上报单位：" prop="educationDate">
                  {{ form.a }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="上报时间：" prop="educationDate">
                  {{ form.a }}
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="事件描述：" prop="educationDate">
                  {{ form.a }}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <!--详情查看查看-->
        <div v-if="detailOptType==='view'" class="normal">
          <div class="dialog-item-title">图片预览</div>
          <div class="dialog-item">
            <el-form ref="ruleForm1" label-position="top" label-width="120px">
              <el-row :gutter="20" class="img-panel">
                <el-col :md="24" :lg="12">
                  <el-form-item label="预警图片" prop="visitType">
                    <el-carousel v-if="asdfsdf.length>0" :interval="4000" type="card" height="200px">
                      <el-carousel-item v-for="item in asdfsdf">
                        <el-image
                          style="width: 200px; height: 200px"
                          :src="item.url"
                          fit="fit"
                        />
                      </el-carousel-item>
                    </el-carousel>
                    <div v-else>暂无图片</div>
                  </el-form-item>
                </el-col>
                <el-col :md="24" :lg="12">
                  <el-form-item label="上报图片" prop="aa">
                    <el-carousel v-if="ddddd.length>0" :interval="4000" type="card" height="200px">
                      <el-carousel-item v-for="item in ddddd">
                        <el-image
                          style="width: 200px; height: 200px"
                          :src="item.url"
                          fit="fit"
                        />
                      </el-carousel-item>
                    </el-carousel>
                    <div v-else>暂无图片</div>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
        <!--事件处理-->
        <div v-else class="normal">
          <div class="dialog-item-title">事件处理</div>
          <div class="dialog-content">
            <div class="dialog-item">
              <el-form ref="dataFormS" :model="task" :rules="rules" label-width="100px">
                <el-row :gutter="20">
                  <el-col :span="16">
                    <el-form-item label="处理方式" label-width="106px" prop="eventResult">
                      <el-radio-group v-model="task.eventResult">
                        <template v-for="item in dictList[3060]">
                          <el-radio :key="item.key" :label="item.key">{{ item.value }}</el-radio>
                        </template>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <div v-if="task.eventResult=='03'">
                    <el-col :span="12">
                      <el-form-item label="终端类型" label-width="106px" prop="terminalType">
                        <el-select
                          v-model="task.terminalType"
                          placeholder="终端类型"
                          class="filter-item"
                        >
                          <el-option
                            v-for="item in dictList[2005]"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="执行者" label-width="106px" prop="executePersonId">
                        <el-select
                          v-model="task.executePersonId"
                          placeholder="请输入执行者"
                          class="filter-item"
                        >
                          <el-option
                            v-for="item in dictList[2005]"
                            :key="item.id"
                            :label="item.employeeName"
                            :value="item.id"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="计划完成时间" label-width="106px" prop="planFinishTime">
                        <el-date-picker
                          v-model="task.planFinishTime"
                          type="datetime"
                          placeholder="选择计划完成时间"
                        />
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="任务描述" label-width="106px" prop="remark">
                        <el-input
                          v-model="task.remark"
                          type="textarea"
                          class="filter-item list-query"
                          prefix-icon="el-icon-search"
                          :autosize="{ minRows: 2, maxRows: 4}"
                          placeholder="请输入内容"
                        />
                      </el-form-item>
                    </el-col>
                  </div>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="un-primary-btn" @click="detailVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleOK">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { dictBatch } from '@/api/base/dictDetail'
import { page, getById, del } from '@/api/protect/event'

export default {
  name: 'ProtectWarn',
  data() {
    return {
      dictList: [],
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          eventType: '',
          handleState: ''
        }
      },
      list: [],
      listTotal: 0,
      listLoading: false,
      detailVisible: false,
      detailOptType: '',
      form: {},
      asdfsdf: [
        { url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599912993173&di=d2dbc4eeb1570e5d9cd007130e452538&imgtype=0&src=http%3A%2F%2Fimg.tukexw.com%2Fimg%2Fab6fae7186d9ef35.jpg' },
        { url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599912993173&di=0ecbd5ab699f79da9aeab35a9f8ff61d&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201606%2F05%2F20160605170300_j5sMY.jpeg' }
      ],
      ddddd: [],
      task: {
        eventId: '',
        eventResult: '',
        executeOrg: '', // 执行单位id
        executeOrgName: '', // 执行单位
        executePersonId: '', // 执行人id
        executePersonInfo: '', // 执行人信息
        planFinishTime: '', // 任务要求完成时间
        projectId: '', // 项目id
        taskNodeInfo: '', // 节点编号,隔开
        terminalType: '', // 终端类型 字典2005
        terminalTypeName: '', // 终端类型名称
        remark: ''
      },
      rules: {
        eventResult: [{ required: true, message: '请选择处理方式', trigger: 'blur' }],
        terminalType: [{ required: true, message: '请选择终端类型', trigger: 'change' }],
        executePersonId: [{ required: true, message: '请选择执行者', trigger: 'change' }],
        planFinishTime: [{ required: true, message: '请选择计划完成时间', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入任务描述', trigger: 'blur' }]
      }
    }
  },
  watch: {},
  created() {
    this.getList()
    dictBatch(['2005', '2017', '2018', '3060']).then(res => {
      this.dictList = res.data
    })
  },
  methods: {
    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList()
    },
    getList() {
      this.listLoading = true
      page(this.listQuery).then((res) => {
        this.listLoading = false
        this.list = res.data.content
        this.listTotal = res.data.totalElements
      })
    },
    dealItem(id) {
      this.detailVisible = true
      this.detailOptType = 'update'
      this.getdetails(id)
    },
    details(id) {
      this.detailVisible = true
      this.detailOptType = 'view'
      this.getdetails(id)
    },
    getdetails(id) {
      getById(id).then((response) => {
        this.form = response.data
      })
    },
    handleOK() {
      if (this.detailOptType === 'view') {
        this.detailVisible = false
      } else {
        this.optDetail()
      }
    },
    optDetail() {
      this.$refs['dataFormS'].validate(valid => {
        if (!valid) return
        this.detailVisible = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
  .normal {
    /deep/ .el-form-item__content {
      border: none;
    }
    /deep/ .img-panel .el-form-item__content {
      height: 241px;
    }
  }
</style>
