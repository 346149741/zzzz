<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <!--操作按钮-->
      <div class="filter-container">

        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="采购部门 : " class="filter-item">
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

          <el-form-item label="供应商 : " class="filter-item">
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

          <!-- <el-form-item label="厂家 : " class="filter-item">
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
          </el-form-item> -->
          <el-form-item label="采购日期 : " class="filter-item">
            <el-date-picker
              v-model="listQuery.params.lzrq"
              type="date"
              placeholder="选择日期"
            />
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
          <el-form-item label="绑定日期 : " class="filter-item">
            <el-date-picker
              v-model="listQuery.params.lzrq"
              type="date"
              placeholder="选择日期"
            />
          </el-form-item>
          <el-form-item label="是否启用: " class="filter-item">
            <el-radio-group v-model="listQuery.params.enable">
              <el-radio
                label="是"
                value="1"
              />
              <el-radio
                label="否"
                value="0"
              />
            </el-radio-group>
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
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconxinzengh"
              @click="alljiebang"
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
        <el-table-column label="卡ID" align="center" fixed width="150px" prop="id" />
        <el-table-column align="center" label="型号" prop="classify" />
        <el-table-column align="center" label="采购部门" prop="logins" />
        <el-table-column align="center" label="供应商" prop="sex" />
        <el-table-column align="center" label="车牌号码" prop="sign" />
        <el-table-column align="center" label="采购日期" prop="cgTime" />
        <el-table-column align="center" label="绑定日期" prop="joinTime" />
        <el-table-column align="center" label="是否启用" prop="enable" />
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
              <i class="el-icon-delete danger table-i" title="删除" @click="handleDelete(row)" />
              <i
                v-if="row.joinTime==''"
                class="el-icon-connection Info table-i"
                title="绑定车辆"
                @click="bangding(row)"
              />
              <i v-else class="el-icon-no-smoking  table-i" style="color:#409EFF" title="解除绑定" @click="jiebang(row)" />
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
            <h4 class="title" style="margin-top:-50px;">基本信息</h4>
            <el-row>
              <el-col :span="8">
                <el-row>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    style="border:1px solid #e4e4e4;width:300px;margin-left:80px;"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon" />
                  </el-upload>
                </el-row>
                <el-row>
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <el-button size="small" style="margin:20px 0 0 180px" type="primary">上传头像</el-button>
                  </el-upload>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-form-item label="厂家" prop="itemName">
                    <el-input v-model="dataForm.rybh" class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="卡ID" prop="itemName">
                    <el-input v-model="dataForm.pic" class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="通信频度" prop="itemName">
                    <el-input v-model="dataForm.username" class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="卫星通道" prop="itemName">
                    <el-input v-model="dataForm.pic" class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="速度精度" prop="itemName">
                    <el-input v-model="dataForm.pic" class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="授时精度" prop="itemName">
                    <el-input v-model="dataForm.pic" class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="差分数据" prop="itemName">
                    <el-input v-model="dataForm.pic" class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="速度限制" prop="itemName">
                    <el-input v-model="dataForm.pic" class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="是否启用" prop="itemName">
                    <el-radio-group v-model="listQuery.params.enable">
                      <el-radio
                        label="是"
                        value="1"
                      />
                      <el-radio
                        label="否"
                        value="0"
                      />
                    </el-radio-group>
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row>
                  <el-form-item label="型号" prop="itemName">
                    <el-input v-model="dataForm.rybh" class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="通信容量" prop="itemName">
                    <el-input v-model="dataForm.rybh" class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="首次定位时间" prop="itemName">
                    <el-input v-model="dataForm.cid" class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="数据更新率" prop="itemName">
                    <el-input v-model="dataForm.cid" class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="测速精度" prop="itemName">
                    <el-input v-model="dataForm.cid" class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="数据格式" prop="itemName">
                    <el-input v-model="dataForm.cid" class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="信号重捕获" prop="itemName">
                    <el-input v-model="dataForm.cid" class="form-item1" />
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="高度限制" prop="itemName">
                    <el-input v-model="dataForm.cid" class="form-item1" />
                  </el-form-item>
                </el-row>

              </el-col>
            </el-row>
            <h4 class="title">采购信息</h4>
            <el-row>
              <el-col :span="8">
                <el-form-item label="采购部门 : " class="filter-item">
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
              </el-col>
              <el-col :span="8">
                <el-form-item label="姓名" prop="itemName">
                  <el-input v-model="dataForm.cid" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="人员编号" prop="itemName">
                  <el-input v-model="dataForm.cid" class="form-item1" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="办公电话" prop="itemName">
                  <el-input v-model="dataForm.cid" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="手机号码" prop="itemName">
                  <el-input v-model="dataForm.cid" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="采购日期 : " class="filter-item">
                  <el-date-picker
                    v-model="listQuery.params.cgrq"
                    type="date"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="用途" prop="itemName">
                  <el-input v-model="dataForm.desc" type="textarea" />
                </el-form-item>
              </el-col>
            </el-row>
            <h4 class="title">供应商信息</h4>
            <el-row>
              <el-col :span="8">
                <el-form-item label="供应商" prop="itemName">
                  <el-input v-model="dataForm.cid" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系人" prop="itemName">
                  <el-input v-model="dataForm.cid" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="办公电话" prop="itemName">
                  <el-input v-model="dataForm.cid" class="form-item1" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="手机号码">
                  <el-input v-model="dataForm.cid" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="邮政编码">
                  <el-input v-model="dataForm.cid" class="form-item1" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="通信地址">
                  <el-input v-model="dataForm.cid" class="form-item1" />
                </el-form-item>
              </el-col>
            </el-row>

            <h4 class="title">其他信息</h4>
            <el-row>
              <el-col :span="16">
                <el-form-item label="备注" prop="itemName">
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
      title="绑定车辆"
      :visible.sync="bangdingVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="400px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="130px">
            <el-row>
              <el-col>
                <el-form-item label="车牌号码" prop='carId'>
                  <el-input v-model="dataForm.carId" class="form-item1" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="bangdingVisible = false">取消</el-button>
        <el-button type="primary" @click="bangdingSave">绑定</el-button>
      </div>
    </el-dialog>

    <!--查看巡更项目 对话框-->
    <el-dialog
      class="abow_dialog"
      title="驾驶员详情"
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
                <el-form-item label="卡ID">{{ lookForm.username }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="型号: " class="filter-item">{{ lookForm.venueType }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="采购部门: " class="filter-item">{{ lookForm.logins }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="车牌号码: " class="filter-item">{{ lookForm.kf }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="绑定日期: " class="filter-item">{{ lookForm.sign }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="是否启用: " class="filter-item">{{ lookForm.zjcx }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="采购日期: " class="filter-item">{{ lookForm.rq }}</el-form-item>
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
  updatePatrolObj
} from '@/api/base/patro-objManage'
import { dictBatch } from '@/api/base/dictDetail'
export default {
  name: 'ObjManage',
  data() {
    return {
      dialogUserVisible: false, // 新增和编辑控制按钮
      lookVisible: false, // 查看详情弹框控制按钮
      shenqingVisible: false,
      imageUrl: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2263980775,326422779&fm=26&gp=0.jpg',
      tableKey: 0,
      listArr: [{
        'id': 10000,
        'username': '家属',
        'sex': '北京光学设备有限公司',
        'city': '城市-0',
        'sign': 'HY12345',
        'kf': '3128*******066',
        'experience': 255,
        'logins': '采购处',
        'wealth': 82830700,
        'classify': 'BD30_11',
        'joinTime': '2020-08-10',
        'score': 13658658868,
        'cgTime': '2020-02-10',
        'enable': '是'

      }, {
        'id': 10001,
        'kf': '1128*******066',
        'username': '职工',
        'sex': '郑州芯片设备有限公司',
        'city': '城市-0',
        'sign': 'XY26453',
        'experience': 255,
        'logins': '档案处',
        'wealth': 82830700,
        'classify': 'BD900006',
        'joinTime': '2020-06-06',
        'score': 13558658868,
        'cgTime': '2019-02-10',
        'enable': '否'
      }, {
        'id': 10002,
        'kf': '4128*******066',
        'username': '内部人员',
        'sex': '济南光学设备有限公司',
        'city': '城市-0',
        'sign': 'NK32142',
        'experience': 255,
        'logins': '采购处',
        'wealth': 82830700,
        'classify': 'BD256789',
        'joinTime': '2020-06-06',
        'score': 18858658868,
        'cgTime': '2018-02-10',
        'enable': '是'
      }, {
        'id': 10003,
        'username': '家属',
        'sex': '上海光学设备有限公司',
        'city': '城市-0',
        'sign': 'GB15632',
        'kf': '2128*******066',
        'experience': 255,
        'logins': '作训处',
        'wealth': 82830700,
        'classify': 'BDsg_006',
        'joinTime': '',
        'score': 13858658868,
        'cgTime': '2019-02-10',
        'enable': '否'
      }, {
        'id': 10004,
        'username': '职工',
        'sex': '天津光学设备有限公司',
        'city': '城市-0',
        'sign': 'HO15632',
        'kf': '1128*******022',
        'experience': 255,
        'logins': '后勤处',
        'wealth': 82830700,
        'classify': 'BD10005',
        'joinTime': '2020-06-06',
        'score': 13958652546,
        'cgTime': '2019-08-10',
        'enable': '是'
      }, {
        'id': 10005,
        'username': '内部人员',
        'sex': '湖南光学设备有限公司',
        'city': '城市-0',
        'kf': '4128*******003',
        'sign': 'GA15632',
        'experience': 255,
        'logins': '档案处',
        'wealth': 82830700,
        'classify': 'BD80005',
        'joinTime': '',
        'score': 17758652546,
        'cgTime': '2019-08-10',
        'enable': '否'
      }], // 已添加用户
      total: 6, // 总数
      bangdingVisible:false,
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
          value: '湖南光学设备有限公司',
          label: '1'
        }, {
          value: '郑州激光芯片设备有限公司',
          label: '2'
        }, {
          value: '武汉精密制造机械有限公司',
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
        carId:[
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
      console.log(this.selectList)
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

    bangdingSave(){
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
      this.lookForm.username = row.id
      this.lookForm.sign = row.joinTime
      this.lookForm.logins = row.logins
      this.lookForm.kf = row.sign
      this.lookForm.zjcx = row.sign
      this.lookForm.rq = row.cgTime
      this.lookForm.zjcx = row.enable
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
    width: 220px;
    height: 220px;
    display: block;
    margin: 0 0 0 20px;
  }
  .title{
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #e4e4e4;
    margin: 0 0 50px 0;
  }
</style>
