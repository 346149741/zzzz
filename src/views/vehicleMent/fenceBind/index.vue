<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <!--操作按钮-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="区域名称" class="filter-item">
            <el-input
              v-model="listQuery.params.jszh"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入名称"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="车牌号码" class="filter-item">
            <el-input
              v-model="listQuery.params.carId"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入车牌号码"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="是否启用 : " class="filter-item">
            <el-select
              v-model="dataForm.bm"
              class="filter-item"
              placeholder="请选择"
              style="width:100%"
              filterable
            >
              <el-option
                label="是"
                value="1"
              />
              <el-option
                label="否"
                value="0"
              />
            </el-select>
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
              @click="allBd"
            >批量绑定</el-button>
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconxinzengh"
              @click="allJb"
            >批量解绑</el-button>

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
        <el-table-column align="center" label="名称" prop="unit" />
        <el-table-column align="center" label="车辆部门" prop="logins" />
        <el-table-column align="center" label="车牌号码" prop="id" />
        <el-table-column align="center" label="监测开始时间" prop="sxrq" />
        <el-table-column align="center" label="监测结束时间" prop="joinTime" />
        <el-table-column align="center" label="是否启用" prop="classify" />
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
                title="绑定"
                @click="handleUpdate(row)"
              />
              <i class="el-icon-delete danger table-i" title="解绑" @click="handleDelete(row)" />
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
            <h4 class="title" style="margin-top:-50px;">区域信息</h4>
            <el-row>
              <el-col :span="12">
                <el-form-item label="名称">xxx电子围栏001</el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否启用 : " class="filter-item">是</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="监测开始时间 : " class="filter-item">2020-07-1 09:08:03 </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="监测结束时间 : " class="filter-item">2020-07-5 18:00:00</el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="区域范围 : " class="filter-item">
                  <el-button size="small" type="primary" @click="handleOptCoord">查看</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <h4 class="title">车辆信息</h4>
            <el-row v-if="count==&quot;1&quot;">
              <el-col :span="16">
                <el-form-item label="车牌号码" prop="carId">
                  <el-input v-model="dataForm.carId" type="text" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-else>
              <el-col :span="16">
                <el-form-item label="车辆信息导入" prop="carId">
                  <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple
                  >
                    <i class="el-icon-upload" />
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <h4 class="title">其他信息</h4>
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

    <!--查看巡更项目 对话框-->
    <el-dialog
      class="abow_dialog"
      title="围栏详情"
      :visible.sync="lookVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="550px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form ref="lookForm" label-width="130px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="电子围栏名称: " class="filter-item">{{ lookForm.unit }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="是否启用: ">{{ lookForm.username }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="监测开始时间: " class="filter-item">{{ lookForm.sxrq }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="监测结束时间: " class="filter-item">{{ lookForm.rq }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      class="abow_dialog"
      title="区域选取"
      :visible.sync="mapShow"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="60%"
    >
      <div class="dialog-content onemap" style="height:100%;">
        <Map ref="map" />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="mapShow = false">取消</el-button>
        <el-button type="primary" @click="mapShow = false">确定</el-button>
      </div>
    </el-dialog>
    <!--坐标拾取组件-->
    <CoordinatesPickerCmpt
      ref="coords"
      data-type="Polygon"
      :display-type="mapDataDisplayType"
    />
  </div>
</template>

<script>
import {
  getList,
  addPatrolObj,
  updatePatrolObj
} from '@/api/base/patro-objManage'
import { dictBatch } from '@/api/base/dictDetail'
import Map from '@/views/patrol/mapCommon/map.vue'
import CoordinatesPickerCmpt from '@/components/OLMap/service/CoordinatesPickerCmpt'
export default {
  name: 'ObjManage',
  components: { Map, CoordinatesPickerCmpt },
  data() {
    return {
      dialogUserVisible: false, // 新增和编辑控制按钮
      lookVisible: false, // 查看详情弹框控制按钮
      shenqingVisible: false,
      dialogImageUrl: '',
      dialogVisible: false,
      mapShow: false,
      count: '1',
      mapDataDisplayType: 'create',
      tableKey: 0,
      listArr: [{
        'id': 'HY12345',
        'username': '家属',
        'sex': '男',
        'city': '城市-0',
        'sgdj': '发动机故障',
        'sign': 'C1',
        'unit': 'xxx电子围栏001',
        'kf': '3128*******066',
        'experience': 255,
        'logins': '采购部',
        'wealth': 82830700,
        'address': '玉泉路与天山路交叉口',
        'classify': '否',
        'joinTime': '2020-07-15 10:08:03',
        'sxrq': '2020-07-1 09:08:03',
        'score': 13658658868,
        'bz': '维修时间较长'
      }, {
        'id': 'XY26453',
        'kf': '1128*******066',
        'username': '职工',
        'sgdj': '车辆大灯损坏',
        'sex': '女',
        'unit': 'xxx电子围栏02',
        'city': '城市-0',
        'address': '人民路8号',
        'sign': 'A1',
        'experience': 255,
        'logins': '档案部',
        'wealth': 82830700,
        'classify': '否',
        'joinTime': '2019-05-06 11:35:00',
        'sxrq': '2019-05-01 09:08:03',
        'score': 13558658868
      }, {
        'id': 'NK32142',
        'kf': '4128*******066',
        'username': '内部人员',
        'sex': '女',
        'unit': 'xxx电子围栏06',
        'address': '东风路与大庆路交叉口',
        'sgdj': '车门玻璃破损',
        'city': '城市-0',
        'sign': 'B1',
        'experience': 255,
        'logins': '采购部',
        'wealth': 82830700,
        'classify': '是',
        'joinTime': '2018-06-06 13:00:00',
        'sxrq': '2018-06-02 09:08:03',
        'score': 18858658868
      }, {
        'id': 'GB15632',
        'username': '家属',
        'sex': '男',
        'sgdj': '车辆喇叭不响',
        'unit': 'xxx电子围栏10',
        'city': '城市-0',
        'address': '市城管局门口',
        'sign': 'C3',
        'kf': '2128*******066',
        'experience': 255,
        'logins': '作训部',
        'wealth': 82830700,
        'classify': '否',
        'joinTime': '2020-02-06 16:05:00',
        'sxrq': '2020-02-03 09:08:03',
        'score': 13858658868
      }, {
        'id': 'HO15632',
        'username': '职工',
        'sex': '男',
        'sgdj': '后备箱故障',
        'city': '城市-0',
        'unit': 'xxx电子围栏08',
        'sign': 'A2',
        'address': '黄河路88号',
        'kf': '1128*******022',
        'experience': 255,
        'logins': '后勤部',
        'wealth': 82830700,
        'classify': '是',
        'joinTime': '2020-01-12 :15:00:00',
        'sxrq': '2020-01-11 09:08:03',
        'score': 13958652546
      }, {
        'id': 'GA15632',
        'username': '内部人员',
        'sex': '女',
        'city': '城市-0',
        'address': '南京路6号',
        'sgdj': '车身掉漆',
        'kf': '4128*******003',
        'sign': 'C1',
        'unit': 'xxx电子围栏05',
        'experience': 255,
        'logins': '接待部',
        'wealth': 82830700,
        'classify': '是',
        'joinTime': '2020-06-06 :10:00:00',
        'sxrq': '2020-06-04 09:08:03',
        'score': 17758652546
      }], // 已添加用户
      total: 6, // 总数
      listLoading: true,
      selectList: [],
      kfList: [
        {
          value: 'A1',
          label: '0'
        }, {
          value: 'A2',
          label: '1'
        }, {
          value: 'B1',
          label: '2'
        }, {
          value: 'B2',
          label: '3'
        }, {
          value: 'c1',
          label: '4'
        }, {
          value: 'c2',
          label: '5'
        }, {
          value: 'c3',
          label: '6'
        }],
      bmList: [
        {
          value: '接待部',
          label: '0'
        }, {
          value: '后勤部',
          label: '1'
        }, {
          value: '作训部',
          label: '2'
        }, {
          value: '采购部',
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
          value: '特别重大事故',
          label: '1'
        }, {
          value: '重大事故',
          label: '2'
        }, {
          value: '较大事故',
          label: '3'
        }, {
          value: '一般事故',
          label: '4'
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
      tkTitle: '新增教材',
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
        bm: [
          { required: true, message: '请选择启用状态', trigger: 'change' }
        ],
        sxrq: [
          { required: true, message: '监测开始时间不能为空', trigger: 'blur' }
        ],
        xlbm: [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ],
        jsr: [
          { required: true, message: '经手人不能为空', trigger: 'blur' }
        ],
        qcrq: [
          { required: true, message: '监测结束时间不能为空', trigger: 'blur' }
        ],
        sxyy: [
          { required: true, message: '送修原因不能为空', trigger: 'blur' }
        ],
        carId: [
          { required: true, message: '车牌号码不能为空', trigger: 'blur' }
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
    handleOptCoord() {
      this.$refs.coords.dialogVisible = true
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
      this.operaType = 1
      this.tkTitle = '新增栏车绑定'
      this.dataForm.itemName = ''
      this.dataForm.enable = '00'
      this.dataForm.itemDesc = ''
      this.dialogUserVisible = true
    },
    shenqing() {
      this.shenqingVisible = true
    },
    handleDelete(row) {
      this.$confirm('确定解除绑定吗?').then(() => {
        this.$notify.success({
          title: '成功',
          message: '操作成功!'
        })
        // delPatrolObj(row.id).then((res) => {
        //   if (res.code === 200) {
        //     this.getList()
        //     this.$notify.success({
        //       title: '成功',
        //       message: '操作成功!'
        //     })
        //   }
        // })
      })
    },
    allBd() {
      this.count = '2'
      this.dialogUserVisible = true

      //  this.$confirm('确定绑定该批车辆吗?').then(() => {
      //         delPatrolObj(row.id).then((res) => {
      //           if (res.code === 200) {
      //             this.getList()
      //             this.$notify.success({
      //               title: '成功',
      //               message: '批量操作成功!'
      //             })
      //           }
      //         })
      //       })
    },
    allJb() {
      this.$confirm('确定解绑该批车辆吗?').then(() => {

      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    // 保存修改数据接口

    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.operaType === 1) {
            if (this.dataForm.id) {
              delete this.dataForm.id
            }
            addPatrolObj(this.dataForm).then((res) => {
              if (res.code === 200) {
                this.dialogUserVisible = false
                this.getList()
                this.$notify.success({
                  title: '成功',
                  message: '操作成功!'
                })
              }
            })
          } else {
            updatePatrolObj(this.dataForm).then((res) => {
              if (res.code === 200) {
                this.dialogUserVisible = false
                this.getList()
                this.$notify.success({
                  title: '成功',
                  message: '操作成功!'
                })
              }
            })
          }
        }
      })
    },

    // 查看操作
    handleView(row) {
      this.lookForm.username = row.classify
      this.lookForm.id = row.id
      this.lookForm.logins = row.username
      this.lookForm.kf = row.logins
      this.lookForm.unit = row.unit
      this.lookForm.sgdj = row.sgdj
      this.lookForm.rq = row.joinTime
      this.lookForm.sxrq = row.sxrq
      this.lookForm.bz = row.bz
      this.lookForm.address = row.address
      this.lookVisible = true
    },
    // 编辑操作
    handleUpdate(row) {
      this.count = '1'
      this.operaType = 2
      this.tkTitle = '栏车绑定'
      this.dataForm.id = row.id
      this.dataForm.itemName = row.username
      this.dataForm.enable = row.enable
      this.dataForm.itemDesc = row.itemDesc
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
  /* .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  } */
  .avatar {
    width: 150px;
    height: 180px;
    display: block;
    margin: 10px 0 0 10px;
  }
  .title{
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #e4e4e4;
    margin: 0 0 50px 0;
  }
  .upload-demo{
    width: 100px;
  }
 .upload-demo >>> .el-upload-dragger{
   margin-top: -20px;
    width: 80px;
    height: 80px;

  }
  .el-icon-upload{
    margin: 15px 0 16px;
  }
</style>
