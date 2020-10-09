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
          <el-form-item label="车牌号" class="filter-item">
            <el-input
              v-model="listQuery.params.jszh"
              type="text"
              prefix-icon="el-icon-search"
              class="filter-item mr10"
              placeholder="请输入车牌号"
              @keyup.enter.native="handleFilter"
            />
          </el-form-item>
          <el-form-item label="事故等级 : " class="filter-item">
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
          <el-form-item label="事故日期 : " class="filter-item">
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
            >录入</el-button>

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
        <el-table-column label="车牌号码" align="center" fixed width="150px" prop="id" />
        <el-table-column align="center" label="车辆部门" prop="logins" />
        <el-table-column align="center" label="司机姓名" prop="classify" />
        <el-table-column label="事故等级" prop="sgdj" />
        <el-table-column align="center" label="事故日期" prop="joinTime" />
        <el-table-column align="center" label="事故地点" prop="address" />
        <el-table-column align="center" label="事故处理单位" prop="unit" />
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
                title="编辑"
                @click="handleUpdate(row)"
              />
              <i class="el-icon-delete danger table-i" title="报废" @click="handleDelete(row)" />
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
      width="60%"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="130px">
            <h4 class="title" style="margin-top:-50px;">车辆信息</h4>
            <el-row>
              <el-col :span="5">
                <el-row>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    style="border:5px solid #e4e4e4;width:180px;height:220px"
                  >
                    <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon" />
                  </el-upload>
                </el-row>
                <!-- <el-row>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <el-button size="small" style="margin:20px 0 0 70px" type="primary">上传头像</el-button>
                  </el-upload>
                </el-row> -->
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-form-item label="车牌号码 : " class="filter-item" prop="carId">
                    <el-input v-model="dataForm.carId" class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="车牌类型：">
                    <el-input v-model="dataForm.carType" disabled class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="车牌颜色：">
                    <el-input v-model="dataForm.carColor" disabled class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="发动机号">
                    <el-input v-model="dataForm.fdjh" disabled class="form-item1" />
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :span="2">
                <el-row style="margin-left:10px">
                  <el-button size="small" type="primary">查看</el-button>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-form-item label="所属部门">
                    <el-input v-model="dataForm.unit" disabled class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="车辆用途">
                    <el-input v-model="dataForm.yt" disabled class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="品牌型号">
                    <el-input v-model="dataForm.yt" disabled class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="车辆识别号">
                    <el-input v-model="dataForm.yt" disabled class="form-item1" />
                  </el-form-item>
                </el-row>
              </el-col>
            </el-row>
            <h4 class="title">人员信息</h4>
            <el-row>
              <el-col :span="5">
                <el-row>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    style="border:5px solid #e4e4e4;width:180px;height:220px"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon" />
                  </el-upload>
                </el-row>
                <!-- <el-row>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <el-button size="small" style="margin:20px 0 0 70px" type="primary">上传头像</el-button>
                  </el-upload>
                </el-row> -->
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-form-item label="人员编号 : " class="filter-item" prop="carId">
                    <el-input v-model="dataForm.carId" class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="姓名">
                    <el-input v-model="dataForm.carType" disabled class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="性别">
                    <el-input v-model="dataForm.carColor" disabled class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="正式面貌">
                    <el-input v-model="dataForm.fdjh" disabled class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="联系电话">
                    <el-input v-model="dataForm.fdjh" disabled class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="驾驶证号">
                    <el-input v-model="dataForm.fdjh" disabled class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="初次领证日期">
                    <el-input v-model="dataForm.fdjh" disabled class="form-item1" />
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :span="2">
                <el-row style="margin-left:10px">
                  <el-button size="small" type="primary">查看</el-button>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-form-item label="所属部门">
                    <el-input v-model="dataForm.unit" disabled class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="人员类型">
                    <el-input v-model="dataForm.yt" disabled class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="身份证号">
                    <el-input v-model="dataForm.yt" disabled class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="籍贯">
                    <el-input v-model="dataForm.yt" disabled class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="健康状况">
                    <el-input v-model="dataForm.yt" disabled class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="准驾车型">
                    <el-input v-model="dataForm.yt" disabled class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="审验到期日期">
                    <el-input v-model="dataForm.yt" disabled class="form-item1" />
                  </el-form-item>
                </el-row>
              </el-col>
            </el-row>
            <h4 class="title">违章记录</h4>
            <el-row>
              <el-col :span="12">
                <el-form-item label="违章日期 : " class="filter-item">
                  <el-date-picker
                    v-model="listQuery.params.lzrq"
                    style="width:100%"
                    type="date"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="违章类型 : " class="filter-item">
                  <el-select
                    v-model="dataForm.dj"
                    style="width:100%"
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
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="罚款 : " class="filter-item">
                  <el-input v-model="dataForm.unit" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="扣分 : " class="filter-item">
                  <el-input v-model="dataForm.unit" class="form-item1" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col>
                <el-form-item label="违章地点 : " class="filter-item">
                  <el-input v-model="dataForm.wxdd" class="form-item1" />
                </el-form-item>
              </el-col>
            </el-row>
            <h4 class="title">照片上传</h4>
            <el-row>
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus" />
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
              <h4 class="title">其他信息</h4>
              <el-row>
                <el-col :span="16">
                  <el-form-item label="备注">
                    <el-input v-model="dataForm.desc" type="textarea" />
                  </el-form-item>
                </el-col>

              </el-row>
            </el-row></el-form>
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
      title="事故详情"
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
                <el-form-item label="司机姓名">{{ lookForm.username }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="车牌号码: " class="filter-item">{{ lookForm.id }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="车辆部门: " class="filter-item">{{ lookForm.kf }}</el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="事故等级: " class="filter-item">{{ lookForm.sgdj }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="事故日期: " class="filter-item">{{ lookForm.rq }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="事故地点: " class="filter-item">{{ lookForm.address }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="事故处理单位: " class="filter-item">{{ lookForm.unit }}</el-form-item>
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
  getList,
  addPatrolObj,
  updatePatrolObj,
  delPatrolObj
} from '@/api/base/patro-objManage'
import { dictBatch } from '@/api/base/dictDetail'
export default {
  name: 'ObjManage',
  data() {
    return {
      dialogUserVisible: false, // 新增和编辑控制按钮
      lookVisible: false, // 查看详情弹框控制按钮
      shenqingVisible: false,
      dialogImageUrl: '',
      dialogVisible: false,
      imageUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2263980775,326422779&fm=26&gp=0.jpg',
      imageUrl1: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600592935028&di=e14f8a1be7db7004234a7b5d15baa123&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn%2F20170318%2F2b76-fycnyhk8790601.jpg',
      tableKey: 0,
      listArr: [{
        'id': 'HY12345',
        'username': '家属',
        'sex': '男',
        'city': '城市-0',
        'sgdj': '一般事故',
        'sign': 'C1',
        'unit': 'xxxx交警二大队',
        'kf': '3128*******066',
        'experience': 255,
        'logins': '采购部',
        'wealth': 82830700,
        'address': '玉泉路与天山路交叉口',
        'classify': '张军',
        'joinTime': '2020-07-10 10:08:03',
        'score': 13658658868
      }, {
        'id': 'XY26453',
        'kf': '1128*******066',
        'username': '职工',
        'sgdj': '较大事故',
        'sex': '女',
        'unit': 'xxxx交警支队1分队',
        'city': '城市-0',
        'address': '人民路8号',
        'sign': 'A1',
        'experience': 255,
        'logins': '档案部',
        'wealth': 82830700,
        'classify': '李强',
        'joinTime': '2019-05-06 11:35:00',
        'score': 13558658868
      }, {
        'id': 'NK32142',
        'kf': '4128*******066',
        'username': '内部人员',
        'sex': '女',
        'unit': 'xxxx交警5大队',
        'address': '东风路与大庆路交叉口',
        'sgdj': '特大事故',
        'city': '城市-0',
        'sign': 'B1',
        'experience': 255,
        'logins': '采购部',
        'wealth': 82830700,
        'classify': '吴云龙',
        'joinTime': '2018-06-06 13:00:00',
        'score': 18858658868
      }, {
        'id': 'GB15632',
        'username': '家属',
        'sex': '男',
        'sgdj': '一般事故',
        'unit': 'xxxx交警2大队',
        'city': '城市-0',
        'address': '市城管局门口',
        'sign': 'C3',
        'kf': '2128*******066',
        'experience': 255,
        'logins': '作训部',
        'wealth': 82830700,
        'classify': '孙峰',
        'joinTime': '2020-02-06 16:05:00',
        'score': 13858658868
      }, {
        'id': 'HO15632',
        'username': '职工',
        'sex': '男',
        'sgdj': '特重大事故',
        'city': '城市-0',
        'unit': 'xxxx交警1大队',
        'sign': 'A2',
        'address': '黄河路88号',
        'kf': '1128*******022',
        'experience': 255,
        'logins': '后勤部',
        'wealth': 82830700,
        'classify': '赵俊杰',
        'joinTime': '2020-01-12 :15:00:00',
        'score': 13958652546
      }, {
        'id': 'GA15632',
        'username': '内部人员',
        'sex': '女',
        'city': '城市-0',
        'address': '南京路6号',
        'sgdj': '一般事故',
        'kf': '4128*******003',
        'sign': 'C1',
        'unit': 'xxxx交警2大队',
        'experience': 255,
        'logins': '接待部',
        'wealth': 82830700,
        'classify': '朱惠萍',
        'joinTime': '2020-06-06 :10:00:00',
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
        itemName: [
          { required: true, message: '必填项不能为空', trigger: 'blur' }
        ],
        carId: [
          { required: true, message: '车牌号不能为空', trigger: 'blur' }
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
      this.operaType = 1
      this.tkTitle = '新增事故'
      this.dataForm.itemName = ''
      this.dataForm.enable = '00'
      this.dataForm.itemDesc = ''
      this.dialogUserVisible = true
    },
    shenqing() {
      this.shenqingVisible = true
    },
    handleDelete(row) {
      this.$confirm('确认删除该驾驶员吗?').then(() => {
        delPatrolObj(row.id).then((res) => {
          if (res.code === 200) {
            this.getList()
            this.$notify.success({
              title: '成功',
              message: '操作成功!'
            })
          }
        })
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
      this.lookForm.id = row.id
      this.lookForm.logins = row.username
      this.lookForm.kf = row.logins
      this.lookForm.unit = row.unit
      this.lookForm.sgdj = row.sgdj
      this.lookForm.rq = row.joinTime
      this.lookForm.address = row.address
      this.lookVisible = true
    },
    // 编辑操作
    handleUpdate(row) {
      this.operaType = 2
      this.tkTitle = '编辑事故'
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
</style>
