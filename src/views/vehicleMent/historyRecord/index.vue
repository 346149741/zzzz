<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <!--操作按钮-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="车辆部门 : " class="filter-item">
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
          <el-form-item label="车牌号码" class="filter-item">
            <el-input
              v-model="listQuery.params.jszh"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入车牌号"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="驾驶员姓名" class="filter-item">
            <el-input
              v-model="listQuery.params.jszh"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入车牌号"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="驾驶员部门 : " class="filter-item">
            <el-select
              v-model="listQuery.params.routeType"
              class="filter-item"
              placeholder="请选择"
              filterable
              @keyup.enter.native="handleFilter"
            >
              <el-option
                v-for="(item,key) in bmList"
                :key="key"
                :label="item.value"
                :value="item.key"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="报文日期 : " class="filter-item">
            <el-date-picker v-model="listQuery.params.lzrq" type="date" placeholder="选择日期" />
          </el-form-item>
          <el-form-item class="filter-item">
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconsousuo"
              @click="handleFilter"
            >{{ $t("table.search") }}</el-button>
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
        <el-table-column align="center" label="车牌号码" prop="sign" />
        <el-table-column align="center" label="车辆部门" prop="logins" />
        <el-table-column label="驾驶员" align="center" prop="username" />
        <el-table-column align="center" label="驾驶员部门" prop="logins" />
        <el-table-column align="center" label="北斗卡号" prop="classify" />
        <el-table-column align="center" label="报文日期" prop="cgTime" />
        <el-table-column align="center" label="精度" prop="lat" />
        <el-table-column align="center" label="维度" prop="long" />
        <!-- <el-table-column label="操作人员" align="center" prop="classify" />
        <el-table-column label="操作时间" align="center" prop="joinTime" />-->
        <el-table-column
          align="center"
          :label="$t('table.actions')"
          fixed="right"
          class-name="small-padding fixed-width"
        >
          <template v-slot="{ row }">
            <div class="t-col-operate">
              <i class="el-icon-tickets primary table-i" title="查看" @click="handleView(row)" />
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

    <!--查看巡更项目 对话框-->
    <el-dialog
      class="abow_dialog"
      title="详情"
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
                <el-form-item label="车牌号码: " class="filter-item">{{ lookForm.kf }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="车辆部门: " class="filter-item">{{ lookForm.logins }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="驾驶员">{{ lookForm.username }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="驾驶部门">{{ lookForm.logins }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="北斗卡号">{{ lookForm.bdkh }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="报文日期: " class="filter-item">{{ lookForm.sign }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="经纬度: " class="filter-item">
                  {{ lookForm.zjcx }}
                  <el-button
                    size="small"
                    type="primary"
                    style="margin-left:6px;"
                    @click="handleOptCoord"
                  >查看</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <!--坐标拾取组件-->
    <CoordinatesPickerCmpt ref="coords" data-type="Polygon" :display-type="mapDataDisplayType" />
  </div>
</template>

<script>
import {
  getList,
  addPatrolObj,
  updatePatrolObj
} from '@/api/base/patro-objManage'
import { dictBatch } from '@/api/base/dictDetail'
import CoordinatesPickerCmpt from '@/components/OLMap/service/CoordinatesPickerCmpt'
export default {
  name: 'ObjManage',
  components: { CoordinatesPickerCmpt },
  data() {
    return {
      dialogUserVisible: false, // 新增和编辑控制按钮
      lookVisible: false, // 查看详情弹框控制按钮
      shenqingVisible: false,
      imageUrl:
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2263980775,326422779&fm=26&gp=0.jpg',
      tableKey: 0,
      listArr: [
        {
          id: 10000,
          username: '张大鹏',
          sex: '北京光学设备有限公司',
          city: '城市-0',
          sign: 'HY12345',
          kf: '3128*******066',
          experience: 255,
          logins: '采购部',
          wealth: 82830700,
          classify: 'BD30_11',
          joinTime: '2020-08-10',
          score: 13658658868,
          cgTime: '2020-02-10',
          enable: '是',
          lat: '29.078205',
          long: '111.397195'
        },
        {
          id: 10001,
          kf: '1128*******066',
          username: '李娟',
          sex: '郑州芯片设备有限公司',
          city: '城市-0',
          sign: 'XY26453',
          experience: 255,
          logins: '后勤部',
          wealth: 82830700,
          classify: 'BD900006',
          joinTime: '2020-06-06',
          score: 13558658868,
          cgTime: '2019-02-10',
          enable: '否',
          lat: '29.078205',
          long: '111.397195'
        },
        {
          id: 10002,
          kf: '4128*******066',
          username: '赵军',
          sex: '济南光学设备有限公司',
          city: '城市-0',
          sign: 'NK32142',
          experience: 255,
          logins: '采购部',
          wealth: 82830700,
          classify: 'BD256789',
          joinTime: '2020-06-06',
          score: 18858658868,
          cgTime: '2018-02-10',
          enable: '是',
          lat: '29.078205',
          long: '111.397195'
        },
        {
          id: 10003,
          username: '周蕊蕊',
          sex: '上海光学设备有限公司',
          city: '城市-0',
          sign: 'GB15632',
          kf: '2128*******066',
          experience: 255,
          logins: '接待部',
          wealth: 82830700,
          classify: 'BDsg_006',
          joinTime: '',
          score: 13858658868,
          cgTime: '2019-02-10',
          enable: '否',
          lat: '29.078205',
          long: '111.397195'
        },
        {
          id: 10004,
          username: '郑鹏',
          sex: '天津光学设备有限公司',
          city: '城市-0',
          sign: 'HO15632',
          kf: '1128*******022',
          experience: 255,
          logins: '后勤部',
          wealth: 82830700,
          classify: 'BD10005',
          joinTime: '2020-06-06',
          score: 13958652546,
          cgTime: '2019-08-10',
          lat: '29.078205',
          long: '111.397195',
          enable: '是'
        },
        {
          id: 10005,
          username: '王慧丽',
          sex: '湖南光学设备有限公司',
          city: '城市-0',
          kf: '4128*******003',
          sign: 'GA15632',
          experience: 255,
          logins: '档案部',
          wealth: 82830700,
          classify: 'BD',
          joinTime: '',
          score: 17758652546,
          cgTime: '2019-08-10',
          enable: '否',
          lat: '29.06205',
          long: '111.597195'
        }
      ], // 已添加用户
      total: 6, // 总数
      bangdingVisible: false,
      listLoading: true,
      selectList: [],
      kfList: [
        {
          value: 'A1',
          label: '0'
        },
        {
          value: 'A2',
          label: '1'
        },
        {
          value: 'B1',
          label: '2'
        },
        {
          value: 'B2',
          label: '3'
        },
        {
          value: 'c1',
          label: '4'
        },
        {
          value: 'c2',
          label: '5'
        },
        {
          value: 'c3',
          label: '6'
        }
      ],
      bmList: [
        {
          value: '档案部',
          label: '0'
        },
        {
          value: '后勤部',
          label: '1'
        },
        {
          value: '作训部',
          label: '2'
        },
        {
          value: '采购部',
          label: '3'
        },
        {
          value: '接待部',
          label: '4'
        }
      ],
      jkList: [
        {
          value: '良好',
          label: '0'
        },
        {
          value: '健康',
          label: '1'
        },
        {
          value: '一般',
          label: '2'
        },
        {
          value: '较差',
          label: '3'
        }
      ],
      zzmmList: [
        {
          value: '中共党员',
          label: '0'
        },
        {
          value: '中共预备党员',
          label: '1'
        },
        {
          value: '共青团员',
          label: '2'
        },
        {
          value: '其他',
          label: '3'
        }
      ],
      venueTtpe: [
        {
          value: '湖南光学设备有限公司',
          label: '1'
        },
        {
          value: '郑州激光芯片设备有限公司',
          label: '2'
        },
        {
          value: '武汉精密制造机械有限公司',
          label: '3'
        }
      ],
      teamList: [
        {
          value: '请选择',
          label: '0'
        },
        {
          value: '三营2连',
          label: '1'
        },
        {
          value: '二团1营',
          label: '2'
        },
        {
          value: '五师2连',
          label: '3'
        },
        {
          value: '特战旅1连',
          label: '4'
        }
      ],
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        routeType: 0,
        params: {
          itemName: '',
          zjcx: '',
          enable: 0
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
        itemName: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        carId: [{ required: true, message: '车牌号不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
    dictBatch('3023').then((res) => {
      this.sfqyList = res.data['3023']
    })
  },
  methods: {
    handleSelectionChange(val) {
      this.selectList = val.map(function(item) {
        return item.id
      })
      console.log(this.selectList)
    },

    handleOptCoord() {
      this.$refs.coords.dialogVisible = true
    },

    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList()
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
    alljiebang() {
      if (this.selectList.length === 0) {
        this.$message.error('请选择要解绑的车辆!')
        return
      } else {
        this.$confirm('确定解绑所选车辆吗?').then(() => {
          this.$notify.success({
            title: '成功',
            message: '解绑成功!'
          })
        })
      }
    },

    // 新增弹框操作
    handleAddRole() {
      this.operaType = 1
      this.tkTitle = '新增北斗卡'
      this.dataForm.itemName = ''
      this.dataForm.enable = '00'
      this.dataForm.itemDesc = ''
      this.dialogUserVisible = true
    },
    shenqing() {
      this.shenqingVisible = true
    },
    handleDelete(row) {
      this.$confirm('确定删除该车辆吗?').then(() => {
        this.$notify.success({
          title: '成功',
          message: '操作成功!'
        })
      })
    },

    bangding(row) {
      this.bangdingVisible = true
    },

    bangdingSave() {
      this.$confirm('确定绑定该车辆吗?').then(() => {
        this.$notify.success({
          title: '成功',
          message: '绑定成功!'
        })
      })
      this.bangdingVisible = false
    },

    jiebang(row) {
      this.$confirm('确定解绑该车辆吗?').then(() => {
        this.$notify.success({
          title: '成功',
          message: '解绑成功!'
        })
      })
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
      this.lookForm.username = row.username
      this.lookForm.sign = row.joinTime
      this.lookForm.logins = row.logins
      this.lookForm.kf = row.sign
      this.lookForm.zjcx = row.lat + ',' + row.long
      this.lookForm.rq = row.cgTime
      this.lookForm.bdkh = row.classify
      this.lookForm.venueType = row.classify
      this.lookVisible = true
    },
    // 编辑操作
    handleUpdate(row) {
      this.operaType = 2
      this.tkTitle = '编辑北斗卡'
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
  border-color: #409eff;
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
  width: 220px;
  height: 220px;
  display: block;
  margin: 0 0 0 20px;
}
.title {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #e4e4e4;
  margin: 0 0 50px 0;
}
</style>
