<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <!--操作按钮-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="申请人 : " class="filter-item">
            <el-input
              v-model="listQuery.params.userName"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item "
              placeholder="请输入驾驶证号"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="部门 : " class="filter-item">
            <el-select
              v-model="dataForm.bm"
              class="filter-item"
              placeholder="请选择"
              style="width:100%"
              filterable
              @keyup.enter.native="handleFilter"
            >
              <el-option
                v-for="(item,key) in bmList"
                :key="key"
                :label="item.value"
                :value="item.label"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="人员编号 : " class="filter-item">
            <el-input
              v-model="listQuery.params.jszh"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item "
              placeholder="请输入人员编号"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="人员类型 : " class="filter-item">
            <el-select
              v-model="listQuery.params.routeType"
              class="filter-item"
              placeholder="请选择"
              filterable
              @keyup.enter.native="handleFilter"
            >
              <el-option
                v-for="(item,key) in venueTtpe"
                :key="key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="申请日期 : " class="filter-item">
            <el-date-picker
              v-model="listQuery.params.lzrq"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item label="车辆类型 : " class="filter-item">
            <el-select
              v-model="listQuery.params.zjcx"
              class="filter-item"
              placeholder="请选择"
              style="width:100%"
              filterable
              @keyup.enter.native="handleFilter"
            >
              <el-option
                v-for="(item,key) in kfList"
                :key="key"
                :label="item.value"
                :value="item.label"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="用车类型 : " class="filter-item">
            <el-select
              v-model="listQuery.params.yclx"
              class="filter-item"
              placeholder="请选择"
              style="width:100%"
              filterable
              @keyup.enter.native="handleFilter"
            >
              <el-option
                label="接待用车"
                value="1"
              />
              <el-option
                label="管理用车"
                value="2"
              />
              <el-option
                label="采购用车"
                value="3"
              />
              <el-option
                label="保养用车"
                value="3"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="审批状态 : " class="filter-item">
            <el-select
              v-model="listQuery.params.sex"
              class="filter-item"
              placeholder="请选择"
              style="width:100%"
              filterable
              @keyup.enter.native="handleFilter"
            >
              <el-option
                label="通过"
                value="1"
              />
              <el-option
                label="不通过"
                value="2"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="审批日期 : " class="filter-item">
            <el-date-picker
              v-model="listQuery.params.lzrq"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item class="filter-item">
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconsousuo"
              @click="handleFilter"
            >{{ $t("table.search") }}</el-button>
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconxinzengh"
              @click="handleAddRole"
            >批量审核</el-button>
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconxinzengh"
              @click="chexiao"
            >批量撤销</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!--已添加角色分页内容-->
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="listArr"
        stripe
        class="t-bd"
        fit
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" fixed type="selection" />
        <el-table-column align="center" label="部门" prop="logins" />
        <el-table-column align="center" label="申请人" prop="classify" />
        <el-table-column label="人员编号" align="center" width="150px" prop="id" />
        <el-table-column label="人员类型" show-overflow-tooltip prop="username" />
        <el-table-column align="center" label="用车类型" prop="yclx" />
        <el-table-column align="center" label="车辆类型" prop="carType" />
        <el-table-column align="center" width="180px" label="申请时间" prop="sqsj" />
        <el-table-column align="center" label="审批人" prop="spr" />
        <el-table-column align="center" width="180px" label="审批状态" prop="spzt" />
        <el-table-column align="center" width="180px" label="审核时间" prop="joinTime" />
        <!-- <el-table-column label="操作人员" align="center" prop="classify" />
        <el-table-column label="操作时间" align="center" prop="joinTime" /> -->
        <el-table-column
          align="center"
          :label="$t('table.actions')"
          fixed="right"
          class-name="small-padding fixed-width"
          width="240px"
        >
          <template v-slot="{ row }">
            <div class="t-col-operate">
              <i class="el-icon-tickets primary table-i" title="查看" @click="handleView(row)" />
              <i

                class="el-icon-edit-outline warning table-i"
                title="审批"
                @click="handleUpdate(row)"
              />
              <!-- <i class="el-icon-refresh-left danger table-i" title="撤销" @click="handleDelete(row)" /> -->
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
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <!--新增修改巡更项目 对话框-->
    <el-dialog
      class="abow_dialog"
      :title="tkTitle"
      :visible.sync="dialogUserVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="50%"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="130px">
            <h4 class="title" style="margin-top:-50px;">人员信息</h4>
            <el-row>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <el-row>
                      <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        style="border:1px solid #e4e4e4;width:120px;"
                      >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon" />
                      </el-upload>
                    </el-row>
                  </el-col>
                  <el-col :span="10">
                    <el-row>
                      <el-form-item label="姓名: " class="filter-item">张晓峰</el-form-item>
                    </el-row>
                    <el-row>
                      <el-form-item label="部门: " class="filter-item">接待部</el-form-item>
                    </el-row>
                    <el-row>
                      <el-form-item label="兵领: " class="filter-item">3年</el-form-item>
                    </el-row>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-form-item label="性别: " class="filter-item">男</el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="年龄: " class="filter-item">32</el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="职位: " class="filter-item">班长</el-form-item>
                </el-row>
              </el-col>
            </el-row>
            <h4 class="title">用车信息</h4>
            <el-row>
              <el-col :span="8">
                <el-row>
                  <el-form-item label="车辆类型: " class="filter-item">小轿车</el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="用车类型: " class="filter-item">接待用车</el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="手机号码: " class="filter-item">13605384565</el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="用车开始时间: " class="filter-item">2020-10-10 :08:00:00</el-form-item>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-form-item label="目的地: " class="filter-item">XXX军区后勤处</el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="乘车人数: " class="filter-item">3</el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="手机号码: " class="filter-item">13605384565</el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="预计结束时间: " class="filter-item">2020-10-10 22:00:00</el-form-item>
                </el-row>
              </el-col>
            </el-row>
            <h4 class="title">审批信息</h4>
            <el-row>
              <el-col :span="16">
                <el-form-item label="审批 : " class="filter-item" prop="sp">
                  <el-select
                    v-model="listQuery.params.sp"
                    class="filter-item"
                    placeholder="请选择"
                    style="width:100%"
                    filterable
                    @keyup.enter.native="handleFilter"
                  >
                    <el-option
                      label="通过"
                      value="1"
                    />
                    <el-option
                      label="不通过"
                      value="2"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="备注">
                  <el-input v-model="dataForm.desc" type="textarea" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUserVisible = false">{{ $t("table.cancel") }}</el-button>
        <el-button type="primary" @click="updateData">{{ $t("table.confirm") }}</el-button>
      </div>
    </el-dialog>
    <!--新增修改巡更项目 对话框-->
    <el-dialog
      class="abow_dialog"
      title="批量审批"
      :visible.sync="allspVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="40%"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="130px">
            <el-row>
              <el-col :span="16">
                <el-form-item label="审批 : " class="filter-item" prop="sp">
                  <el-select
                    v-model="listQuery.params.sp"
                    class="filter-item"
                    placeholder="请选择"
                    style="width:100%"
                    filterable
                    @keyup.enter.native="handleFilter"
                  >
                    <el-option
                      label="通过"
                      value="1"
                    />
                    <el-option
                      label="不通过"
                      value="2"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="备注">
                  <el-input v-model="dataForm.desc" type="textarea" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="allspVisible = false">{{ $t("table.cancel") }}</el-button>
        <el-button type="primary" @click="allspVisible =false">{{ $t("table.confirm") }}</el-button>
      </div>
    </el-dialog>

    <!--查看巡更项目 对话框-->
    <el-dialog
      class="abow_dialog"
      title="审批详情"
      :visible.sync="lookVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="550px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form ref="lookForm" label-width="130px">
            <el-row style="margin-top:-30px">
              <el-col :md="24" :lg="20">
                <el-form-item label="部门: " class="filter-item">{{ lookForm.kf }}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :md="24" :lg="20">
                <el-form-item label="申请人:">{{ lookForm.username }}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :md="24" :lg="20">
                <el-form-item label="人员编号: " class="filter-item">{{ lookForm.id }}</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :md="24" :lg="20">
                <el-form-item label="人员类型: " class="filter-item">{{ lookForm.logins }}</el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="用车类型: " class="filter-item">{{ lookForm.yclx }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="车辆类型: " class="filter-item">{{ lookForm.cllx }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="审批人: " class="filter-item">{{ lookForm.username }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="申请时间: " class="filter-item">{{ lookForm.sqsj }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="审批时间: " class="filter-item">{{ lookForm.pfsj }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getList
} from '@/api/base/patro-objManage'
import { dictBatch } from '@/api/base/dictDetail'
export default {
  name: 'ObjManage',
  data() {
    return {
      dialogUserVisible: false, // 新增和编辑控制按钮
      lookVisible: false, // 查看详情弹框控制按钮
      shenqingVisible: false,
      allspVisible: false,
      imageUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2263980775,326422779&fm=26&gp=0.jpg',
      tableKey: 0,
      listArr: [{
        'id': 10000,
        'username': '家属',
        'sex': '男',
        'city': '城市-0',
        'sign': 'C1',
        'yclx': '接待用车',
        'kf': 'HY12345',
        'spzt': '通过',
        'ycsj': '2020-08-10 08:00:00',
        'sqsj': '2020-08-08 10:08:00',
        'experience': 255,
        'carType': '小轿车',
        'logins': '采购处',
        'wealth': 82830700,
        'pfzt': '已派发',
        'classify': '郑峰',
        'spr': '朱慧萍',
        'joinTime': '2020-08-09 14:00:00',
        'score': 13658658868
      }, {
        'id': 10001,

        'kf': 'XY26453',
        'username': '职工',
        'yclx': '维修用车',
        'ycsj': '2020-10-10 08:00:00',
        'sqsj': '2020-10-08 10:08:00',
        'sex': '女',
        'spzt': '待审批',
        'pfzt': '未派发',
        'city': '城市-0',
        'carType': '大巴车',
        'sign': 'A1',
        'experience': 255,
        'logins': '档案处',
        'wealth': 82830700,
        'classify': '张俊',
        'spr': '冯婷婷',
        'joinTime': '',
        'score': 13558658868
      }, {
        'id': 10002,
        'kf': 'NK32142',
        'spzt': '待审批',
        'username': '内部人员',
        'sex': '女',
        'spzt': '待审批',
        'pfzt': '已派发',
        'ycsj': '2020-10-10 08:00:00',
        'sqsj': '2020-10-08 10:08:00',
        'yclx': '采购用车',
        'city': '城市-0',
        'carType': '面包车',
        'sign': 'B1',
        'experience': 255,
        'logins': '采购处',
        'wealth': 82830700,
        'spr': '王华',
        'classify': '吴云龙',
        'joinTime': '2020-09-06 11:25:00',
        'score': 18858658868
      }, {
        'id': 10003,
        'username': '家属',
        'sex': '男',
        'yclx': '保养用车',
        'city': '城市-0',
        'spzt': '通过',
        'carType': 'SUV',
        'ycsj': '2020-10-10 08:00:00',
        'sqsj': '2020-10-08 10:08:00',
        'sign': 'C3',
        'kf': 'GB15632',
        'experience': 255,
        'logins': '作训处',
        'pfzt': '未派发',
        'wealth': 82830700,
        'classify': '毛静',
        'spr': '陈峰',
        'joinTime': '2020-10-09 11:25:00',
        'score': 13858658868
      }, {
        'id': 10004,
        'username': '职工',
        'sex': '男',
        'city': '城市-0',
        'yclx': '领导用车',
        'carType': '商务车',
        'pfzt': '已派发',
        'sign': 'A2',
        'spzt': '不通过',
        'kf': 'HO15632',
        'experience': 255,
        'logins': '后勤处',
        'wealth': 82830700,
        'ycsj': '2020-10-10 08:00:00',
        'sqsj': '2020-10-08 10:08:00',
        'classify': '韩静',
        'spr': '周瑞华',
        'joinTime': '2020-10-09 11:25:00',
        'score': 13958652546
      }, {
        'id': 10005,
        'username': '内部人员',
        'sex': '女',
        'city': '城市-0',
        'carType': '小轿车',
        'kf': 'GA15632',
        'sign': 'C1',
        'spzt': '通过',
        'yclx': '接待用车',
        'pfzt': '已派发',
        'experience': 255,
        'logins': '档案处',
        'ycsj': '2020-10-10 08:00:00',
        'sqsj': '2020-10-08 10:08:00',
        'wealth': 82830700,
        'classify': '李强',
        'spr': '刘芸',
        'joinTime': '2020-10-09 10:00:00',
        'score': 17758652546
      }], // 已添加用户
      total: 6, // 总数
      listLoading: true,
      selectList: [],
      kfList: [
        {
          value: '小轿车',
          label: '0'
        }, {
          value: '商务车',
          label: '1'
        }, {
          value: 'SUV',
          label: '2'
        }, {
          value: '面包车',
          label: '3'
        }, {
          value: '大巴车',
          label: '4'
        }],
      bmList: [
        {
          value: '档案处',
          label: '0'
        }, {
          value: '后勤处',
          label: '1'
        }, {
          value: '作训处',
          label: '2'
        }, {
          value: '采购处',
          label: '3'
        }],
      jkList: [
        {
          value: '良好',
          label: '0'
        }, {
          value: '健康',
          label: '1'
        }, {
          value: '一般',
          label: '2'
        }, {
          value: '较差',
          label: '3'
        }],
      carList: [{
        value: 'HY12345',
        label: '0'
      }, {
        value: 'XY26453',
        label: '1'
      }, {
        value: 'NK32142',
        label: '2'
      }, {
        value: 'HO15632',
        label: '3'
      }],
      zzmmList: [
        {
          value: '中共党员',
          label: '0'
        }, {
          value: '中共预备党员',
          label: '1'
        }, {
          value: '共青团员',
          label: '2'
        }, {
          value: '其他',
          label: '3'
        }],
      venueTtpe: [
        {
          value: '内部人员',
          label: '1'
        }, {
          value: '职工',
          label: '2'
        }, {
          value: '家属',
          label: '3'
        }],
      teamList: [
        {
          value: '请选择',
          label: '0'
        }, {
          value: '三营2连',
          label: '1'
        }, {
          value: '二团1营',
          label: '2'
        }, {
          value: '五师2连',
          label: '3'
        }, {
          value: '特战旅1连',
          label: '4'
        }],
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        routeType: 0,
        params: {
          itemName: '',
          zjcx: '',
          enable: '0'
        }
      },
      userQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {}
      },
      userList: null,
      operaType: 1,
      form: {
        permission: []
      },
      sfqyList: [], // 是否启用字典
      dialogFormVisible: false,
      dialogPermissionVisible: false,
      userPermissionList: [],
      userPermissionLists: [],
      dialogStatus: '',
      tkTitle: '用车审批',
      dataForm: {
        itemName: '',
        enable: '',
        itemDesc: '',
        value1: '',
        value2: '',
        kf: '1'
      },
      lookForm: {
        venueType: '',
        username: '',
        sign: '',
        city: '',
        logins: '',
        kf: ''
      },
      rules: {
        sp: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
    dictBatch('3023').then(res => {
      this.sfqyList = res.data['3023']
    })
  },
  methods: {
    handleSelectionChange(val) {
      this.selectList = val.map(function(item) {
        return item.id
      })
    },

    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList()
    },
    // 格式化图标
    qy(row) {
      let val = ''
      if (row.enable === '00') {
        val = '是'
      } else {
        val = '否'
      }
      return val
    },

    // 获取表格列表数据
    getList() {
      this.listLoading = true
      getList(this.listQuery).then((response) => {
        this.list = response.data.content
        // this.total = response.data.totalElements
        this.listLoading = false
      })
    },

    // 分页
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.getList()
    },

    // 新增弹框操作
    handleAddRole() {
      this.allspVisible = true
    },
    shenqing() {
      this.shenqingVisible = true
    },
    handleDelete(row) {
      this.$confirm('确认撤销本次派发吗?').then(() => {
        this.$notify.success({
          title: '成功',
          message: '操作成功!'
        })
      })
    },

    // 保存修改数据接口

    updateData() {
      // this.$refs['dataForm'].validate((valid) => {
      //   if (valid) {
      //     if (this.operaType === 1) {
      //       if (this.dataForm.id) {
      //         delete this.dataForm.id
      //       }
      //       addPatrolObj(this.dataForm).then((res) => {
      //         if (res.code === 200) {
      //           this.dialogUserVisible = false
      //           this.getList()
      //           this.$notify.success({
      //             title: '成功',
      //             message: '操作成功!'
      //           })
      //         }
      //       })
      //     } else {
      //       updatePatrolObj(this.dataForm).then((res) => {
      //         if (res.code === 200) {
      //           this.dialogUserVisible = false
      //           this.getList()
      //           this.$notify.success({
      //             title: '成功',
      //             message: '操作成功!'
      //           })
      //         }
      //       })
      //     }
      //   }
      // })
      this.dialogUserVisible = false
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 查看操作
    handleView(row) {
      this.lookForm.username = row.classify
      this.lookForm.sign = row.kf
      this.lookForm.id = row.id
      this.lookForm.yclx = row.yclx
      this.lookForm.cllx = row.carType
      this.lookForm.logins = row.username
      this.lookForm.logins = row.username
      this.lookForm.ycsj = row.ycsj
      this.lookForm.kf = row.logins
      this.lookForm.sqsj = row.sqsj
      this.lookForm.pfsj = row.joinTime
      this.lookForm.zjcx = row.sign
      this.lookForm.pfzt = row.pfzt
      this.lookForm.venueType = row.sex
      this.lookVisible = true
    },
    // 编辑操作
    handleUpdate(row) {
      this.lookForm.username = row.classify
      this.lookForm.sign = row.kf
      this.lookForm.id = row.id
      this.lookForm.yclx = row.yclx
      this.lookForm.cllx = row.carType
      this.lookForm.logins = row.username
      this.lookForm.logins = row.username
      this.lookForm.ycsj = row.ycsj
      this.lookForm.kf = row.logins
      this.lookForm.sqsj = row.sqsj
      this.lookForm.pfsj = row.joinTime
      this.lookForm.zjcx = row.sign
      this.lookForm.pfzt = row.pfzt
      this.lookForm.venueType = row.sex
      this.dialogUserVisible = true
    }
  }
}
</script>
<style scoped>
.switchStyle {
  margin-right: 0;
}
.avatar-uploader .el-upload--text {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 120px;
    display: block;
    margin: 0 0 0 10px;
  }
  .title{
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #e4e4e4;
    margin: 0 0 50px 0;
  }
</style>
