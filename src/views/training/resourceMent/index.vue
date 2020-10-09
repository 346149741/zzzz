<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <!--操作按钮-->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="训练场地管理" name="first">
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
            <!-- <el-table-column align="center" fixed type="selection" /> -->
            <!-- <el-table-column label="场地编号" align="center" fixed width="150px">
              <template slot-scope="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column> -->
            <el-table-column label="场地名称" fixed show-overflow-tooltip prop="username" />
            <el-table-column align="center" label="场地类型" prop="venueType" />
            <el-table-column align="center" label="申请人" prop="name" />
            <el-table-column align="center" label="申请人单位" prop="sign" />
            <el-table-column align="center" width="180px" label="申请时间" prop="sqTime" />
            <el-table-column align="center" width="180px" label="归还时间" prop="ghTime" />
            <el-table-column align="center" label="审批状态" prop="scuess" />
            <el-table-column align="center" label="审批人" prop="classify" />
            <el-table-column align="center" width="180px" label="审批时间" prop="joinTime" />
            <el-table-column align="center" label="使用状态" prop="status" />
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
                  <i class="el-icon-monitor danger table-i" title="归还" @click="handleDelete(row)" />
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
        </el-tab-pane>
        <el-tab-pane label="训练装备管理" name="second">
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
            <!-- <el-table-column align="center" fixed type="selection" /> -->
            <!-- <el-table-column label="装备编号" align="center" fixed width="150px" prop="id" /> -->
            <el-table-column label="装备名称" fixed show-overflow-tooltip prop="zbName" />
            <el-table-column align="center" label="装备类型" prop="zbType" />
            <el-table-column align="center" label="申请人" prop="name" />
            <el-table-column align="center" label="申请人单位" prop="sign" />
            <el-table-column align="center" width="180px" label="申请时间" prop="sqTime" />
            <el-table-column align="center" width="180px" label="归还时间" prop="ghTime" />
            <el-table-column align="center" label="审批状态" prop="scuess" />
            <el-table-column align="center" label="审批人" prop="classify" />
            <el-table-column align="center" width="180px" label="审批时间" prop="joinTime" />
            <el-table-column align="center" label="使用状态" prop="status" />
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
                  <i class="el-icon-monitor danger table-i" title="归还" @click="handleDelete(row)" />
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
        </el-tab-pane>
        <el-tab-pane label="训练器材管理" name="third">
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
            <!-- <el-table-column align="center" fixed type="selection" /> -->
            <!-- <el-table-column label="器材编号" align="center" fixed width="150px">
              <template slot-scope="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column> -->
            <el-table-column label="器材名称" fixed show-overflow-tooltip prop="qcName" />
            <el-table-column align="center" label="器材类型" prop="qcType" />
            <el-table-column align="center" label="申请人" prop="name" />
            <el-table-column align="center" label="申请人单位" prop="sign" />
            <el-table-column align="center" width="180px" label="申请时间" prop="sqTime" />
            <el-table-column align="center" width="180px" label="归还时间" prop="ghTime" />
            <el-table-column align="center" label="审批状态" prop="scuess" />
            <el-table-column align="center" label="审批人" prop="classify" />
            <el-table-column align="center" width="180px" label="审批时间" prop="joinTime" />
            <el-table-column align="center" label="使用状态" prop="status" />
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
                  <i class="el-icon-monitor danger table-i" title="归还" @click="handleDelete(row)" />
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
        </el-tab-pane>
        <el-tab-pane label="训练教材管理" name="fourth">
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
            <!-- <el-table-column align="center" fixed type="selection" /> -->
            <!-- <el-table-column label="器材编号" align="center" fixed width="150px">
              <template slot-scope="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column> -->
            <el-table-column label="教材名称" fixed show-overflow-tooltip prop="jcName" />
            <el-table-column align="center" label="教材类型" prop="jcType" />
            <el-table-column align="center" label="申请人" prop="name" />
            <el-table-column align="center" label="申请人单位" prop="sign" />
            <el-table-column align="center" width="180px" label="申请时间" prop="sqTime" />
            <el-table-column align="center" width="180px" label="归还时间" prop="ghTime" />
            <el-table-column align="center" label="审批状态" prop="scuess" />
            <el-table-column align="center" label="审批人" prop="classify" />
            <el-table-column align="center" width="180px" label="审批时间" prop="joinTime" />
            <el-table-column align="center" label="使用状态" prop="status" />
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
                  <i class="el-icon-monitor danger table-i" title="归还" @click="handleDelete(row)" />
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
        </el-tab-pane>
        <el-tab-pane label="辅助资料管理" name="five">
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
            <!-- <el-table-column align="center" fixed type="selection" />
            <el-table-column label="器材编号" align="center" fixed width="150px">
              <template slot-scope="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column> -->
            <el-table-column label="资料名称" fixed show-overflow-tooltip prop="zlName" />
            <el-table-column align="center" label="所属分类" prop="zlType" />
            <el-table-column align="center" label="申请人" prop="name" />
            <el-table-column align="center" label="申请人单位" prop="sign" />
            <el-table-column align="center" width="180px" label="申请时间" prop="sqTime" />
            <el-table-column align="center" width="180px" label="归还时间" prop="ghTime" />
            <el-table-column align="center" label="审批状态" prop="scuess" />
            <el-table-column align="center" label="审批人" prop="classify" />
            <el-table-column align="center" width="180px" label="审批时间" prop="joinTime" />
            <el-table-column align="center" label="使用状态" prop="status" />
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
                  <i class="el-icon-monitor danger table-i" title="归还" @click="handleDelete(row)" />
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
        </el-tab-pane>
      </el-tabs>

    </el-card>

    <!--查看巡更项目 对话框-->
    <el-dialog
      class="abow_dialog"
      :title="tkTitle"
      :visible.sync="lookVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="750px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form ref="lookForm" label-width="130px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="名称：">{{ lookForm.username }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="类型: " class="filter-item">{{ lookForm.venueType }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="申请人: " class="filter-item">{{ lookForm.applicant }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="申请单位: " class="filter-item">{{ lookForm.unit }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="申请时间: " class="filter-item">{{ lookForm.sqTime }}</el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="归还时间: " class="filter-item">{{ lookForm.ghTime }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      class="abow_dialog"
      title="审批"
      :visible.sync="spVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width="550px"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="130px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="审批 : " class="filter-item">
                  <el-select
                    v-model="dataForm.routeType"
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
                      value="0"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :md="24" :lg="20">
                <el-form-item label="备注" prop="itemAdders">
                  <el-input v-model="dataForm.desc" type="textarea" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="spVisible = false">{{ $t("table.cancel") }}</el-button>
        <el-button type="primary">{{ $t("table.confirm") }}</el-button>
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
      tableKey: 0,
      count: 1,
      activeName: 'first',
      listArr: [{
        'id': 10000,
        'username': '射击场008',
        'zbName': '步枪',
        'zbType': '陆战装备',
        'qcName': '三人协作攀蹬架',
        'qcType': '技术训练器材',
        'jcName': '射击训练指南',
        'jcType': '操作指导类',
        'zlName': '枪械拆解指南',
        'zlType': '操作指导类',
        'venueType': '射击场',
        'city': '天山路8号',
        'sign': '三营1连',
        'experience': 255,
        'logins': 24,
        'wealth': '室内',
        'sqTime': '2020-08-20 10:10:10',
        'ghTime': '2020-08-25 18:10:10',
        'classify': '小飞侠',
        'name': '张军',
        'joinTime': '2020-08-10 18:10:10',
        'score': 57,
        'scuess': '通过',
        'status': '使用中'
      }, {
        'id': 10001,
        'zbName': '冲锋舟',
        'zbType': '海战装备',
        'zlName': '高炮原理讲解',
        'zlType': '学习提高类',
        'username': '战术场02',
        'venueType': '战术训练场',
        'qcName': '战术低桩网',
        'qcType': '战术训练器材',
        'jcName': '跃障操作要领',
        'jcType': '专业技能介绍',
        'city': '玉泉路北段',
        'sign': '三营1连',
        'experience': 884,
        'logins': 58,
        'wealth': '室内',
        'classify': '凌风',
        'joinTime': '2020-06-06 10:20:10',
        'sqTime': '2020-06-10 10:10:10',
        'ghTime': '2020-06-12 18:10:10',
        'score': 27,
        'name': '孙莉',
        'scuess': '不通过',
        'status': '使用中'
      }, {
        'id': 10002,
        'zbName': '无人机',
        'zbType': '空战装备',
        'zlName': '跃障操作要领',
        'zlType': '专业技能介绍',
        'qcName': '杠铃',
        'qcType': '简易训练器材',
        'jcName': '枪械拆解指引',
        'jcType': '学习提高',
        'username': '综合场02',
		 'venueType': '综合训练场',
        'city': '场地里88号',
        'sign': '特战旅1连',
        'experience': 650,
        'logins': 77,
        'wealth': '室外',
        'classify': '张大军',
        'sqTime': '2020-07-10 10:10:10',
        'ghTime': '2020-07-12 18:10:10',
        'joinTime': '2020-06-06 10:20:10',
        'score': 31,
        'name': '王强',
        'scuess': '通过',
        'status': '已归还'
      }, {
        'id': 10003,
        'zbName': '无线电通信设备',
        'zbType': '电子战装备',
        'username': '战术场02',
        'venueType': '战术训练场',
        'qcName': '跃障器',
        'qcType': '战术训练器材',
        'jcName': '擒拿格斗技巧',
        'jcType': '实战技巧',
        'zlName': '突击训练概述',
        'zlType': '专业技能类',
        'city': '天山路8号',
        'sign': '三团1连',
        'experience': 362,
        'logins': 157,
        'wealth': '室外',
        'classify': '王二毛',
        'joinTime': '2020-06-06 10:20:10',
        'score': 68,
        'name': '郑峰',
        'scuess': '通过',
        'sqTime': '2020-07-10 10:10:10',
        'ghTime': '2020-07-12 18:10:10',
        'status': '审核中'
      }, {
        'id': 10004,
        'username': '综合场01',
        'zbName': '装甲车辆',
        'zbType': '陆战装备',
        'qcName': '拉力器',
        'qcType': '简易训练器材',
        'jcName': '突击训练概述',
        'jcType': '专业技能介绍',
        'zlName': '擒拿格斗技巧',
        'zlType': '实战技巧类',
		    'venueType': '综合训练场',
        'city': '天山路8号',
        'sign': '1营3连',
        'experience': 807,
        'logins': 51,
        'wealth': '室外',
        'classify': '赵强',
        'joinTime': '2020-06-06 10:20:10',
        'score': 6,
        'name': '赵辉',
        'sqTime': '2020-07-10 10:10:10',
        'ghTime': '2020-07-12 18:10:10',
        'scuess': '通过',
        'status': '审核中'
      }, {
        'id': 10005,
        'zbName': '战斗机',
        'zbType': '空战装备',
        'username': '拉练场',
        'venueType': '战术训练场',
        'qcName': '固定滚轮',
        'qcType': '战术训练器材',
        'jcName': '射击训练指南',
        'jcType': '操作指导类',
        'zlName': '枪械拆解指南',
        'zlType': '操作指导类',
        'city': '天山路8号',
        'sign': '三团1连',
        'experience': 173,
        'logins': 68,
        'sqTime': '2020-07-10 10:10:10',
        'ghTime': '2020-07-12 18:10:10',
        'wealth': '室外',
        'joinTime': '2020-06-06 10:20:10',
        'classify': '王大庆',
        'score': 87,
        'name': '周晓辉',
        'scuess': '不通过',
        'status': '已归还'
      }, {
        'id': 10006,
        'username': '射击场06',
        'zbName': '两栖登陆舰',
        'zbType': '海战装备',
        'zlName': '擒拿格斗技巧',
        'zlType': '实战技巧类',
        'qcName': '动感单车',
        'qcType': '自动式器材',
        'jcName': '射击训练指南',
        'jcType': '操作指导类',
	      'venueType': '射击训练场',
        'city': '天山路8号',
        'sign': '三团1连',
        'sqTime': '2020-07-10 10:10:10',
        'ghTime': '2020-07-12 18:10:10',
        'experience': 982,
        'joinTime': '2020-06-06 10:20:10',
        'logins': 37,
        'wealth': '室外',
        'classify': '张娟',
        'score': 34,
        'name': '王丽丽',
        'scuess': '通过',
        'status': '已归还'
      }, {
        'id': 10007,
        'username': '综合场08',
        'zbName': '冲锋枪',
        'zbType': '陆战装备',
        'qcName': '仿真围墙',
        'qcType': '战术器材',
        'jcName': '跃障操作要领',
        'jcType': '专业技能介绍',
        'venueType': '综合训练场',
        'sqTime': '2020-07-10 10:10:10',
        'ghTime': '2020-07-12 18:10:10',
        'city': '天山路8号',
        'sign': '三团1连',
        'zlName': '跃障操作要领',
        'zlType': '专业技能介绍',
        'experience': 727,
        'logins': 150,
        'wealth': '室外',
        'classify': '李丽',
        'joinTime': '2020-06-06 10:20:10',
        'score': 28,
        'name': '冯晓娟',
        'scuess': '通过',
        'status': '已归还'
      }], // 已添加用户
      total: null, // 总数
      listLoading: true,
      spVisible: false,
      selectList: [],
      venueTtpe: [
        {
          value: '请选择',
          label: '0'
        }, {
          value: '射击场',
          label: '1'
        }, {
          value: '战术训练场',
          label: '2'
        }, {
          value: '专业训练场',
          label: '3'
        }, {
          value: '综合训练场',
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
          enable: '00'
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
      tkTitle: '新增项目',
      dataForm: {
        itemName: '',
        enable: '',
        itemDesc: '',
        value1: ''
      },
      lookForm: {
        venueType: '',
        username: '',
        sign: '',
        city: ''
      },
      rules: {
        itemName: [
          { required: true, message: '请输入场地名称', trigger: 'blur' }
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
      // this.getList()
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
        this.total = response.data.totalElements
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

    shenqing() {
      this.shenqingVisible = true
    },
    handleDelete(row) {
      this.$confirm('确认要归还吗?').then(() => {
      })
    },

    handleClick(tab, event) {
      this.count = 1 + parseInt(tab.index)
    },

    // 查看操作
    handleView(row) {
      console.log(this.count)
      if (this.count === 1) {
        this.tkTitle = '训练场地详情'
        this.lookForm.username = row.username
        this.lookForm.venueType = row.venueType
      } else if (this.count === 2) {
        this.tkTitle = '训练设备详情'
        this.lookForm.username = row.zbName
        this.lookForm.venueType = row.zbType
      } else if (this.count === 3) {
        this.lookForm.username = row.qcName
        this.lookForm.venueType = row.qcType
      } else if (this.count === 4) {
        this.lookForm.username = row.jcName
        this.lookForm.venueType = row.jcType
      } else if (this.count === 5) {
        this.lookForm.username = row.zlName
        this.lookForm.venueType = row.zlType
      }
      this.lookForm.applicant = row.classify
      this.lookForm.unit = row.sign
      this.lookForm.sqTime = row.sqTime
      this.lookForm.ghTime = row.ghTime
      this.lookVisible = true
    },
    // 审批操作
    handleUpdate(row) {
      this.operaType = 2
      this.tkTitle = '编辑场地'
      this.dataForm.id = row.id
      this.dataForm.itemName = row.itemName
      this.dataForm.enable = row.enable
      this.dataForm.itemDesc = row.itemDesc
      this.spVisible = true
    }
  }
}
</script>
<style scoped>
.switchStyle {
  margin-right: 0;
}
</style>
