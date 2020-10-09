<!--人员管理-->
<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--部门树-->
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
            @node-click="getList"
          >
          </el-tree>
        </el-card>
      </el-col>
      <!--人员列表-->
      <el-col :span="19">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>职工管理</span>
          </div>
          <div class="filter-container">
            <el-form :inline="true" class="demo-form-inline">
              <el-form-item label="姓名：" class="filter-item">
                <el-input
                  v-model="listQuery.params.name"
                  type="text"
                  class="filter-item"
                  placeholder="请输入姓名"
                  @keyup.enter.native="handleFilter"
                />
              </el-form-item>
              <el-form-item class="filter-item">
                <el-button
                  v-waves
                  class="filter-item btn-base"
                  type="primary"
                  icon="mr10 iconfont el-icon-search"
                  @click="handleFilter"
                >{{ $t('table.search') }}</el-button>
                <el-button
                  v-if="msg===undefined"
                  class="filter-item btn-base filter-add-btn"
                  type="primary"
                  icon="mr10 iconfont el-icon-circle-plus-outline"
                  @click="handleCreate(1)"
                >{{ $t('table.add') }}</el-button>
                <el-button
                  class="filter-item btn-base filter-add-btn"
                >导入</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!--分页内容-->
          <el-table
            ref="multipleTable"
            v-loading="listLoading"
            stripe
            :data="list"
            class="t-bd"
            fit
            highlight-current-row
            @select="selected"
            @selection-change="handleSelectionChange"
          >
            <el-table-column v-if="msg!=undefined" type="selection" width="55" />
            <el-table-column align="center" fixed label="序号" width="50px">
              <template slot-scope="scope">
                <span>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column fixed label="编号" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column> -->
            <el-table-column fixed label="姓名" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="性别" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ getSex(scope.row.sex) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="出生日期" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.birthday.slice(0, 10) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="证件号码" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.certTypeNo }}</span>
              </template>
            </el-table-column>
            <el-table-column fixed label="籍贯" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ GNP(scope.row.nativePlace) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="政治面貌" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.politicsStatus }}</span>
              </template>
            </el-table-column>
            <el-table-column label="民族" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.nation }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column label="文化程度" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.educationBackground }}</span>
              </template>
            </el-table-column>
            <el-table-column label="专业" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.profession }}</span>
              </template>
            </el-table-column>
            <el-table-column label="人员类型" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.staffType }}</span>
              </template>
            </el-table-column>
            <el-table-column label="入伍时间" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.militaryTime.slice(0, 10) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="军衔" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.militaryRank }}</span>
              </template>
            </el-table-column>
            <el-table-column label="职务" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.job }}</span>
              </template>
            </el-table-column> -->
            <el-table-column label="手机号" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{ scope.row.mobile }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <div class="t-col-operate">
                  <i class="el-icon-tickets primary table-i" @click="details(scope.row.id)" title="详情" />
                  <i
                    class="el-icon-edit-outline warning table-i"
                    @click="handleCreate(2,scope.row.id)"
                    title="编辑"
                  />
                  <i class="el-icon-delete danger table-i" @click="delitem(scope.row.id)" title="删除" />
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
      </el-col>
    </el-row>
    <!--新增/修改弹出层-->
    <el-dialog
      class="abow_dialog"
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="1260px"
      @close="resetForm"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form
            ref="dataForm"
            :rules="rules"
            :model="form"
            label-position="right"
            label-width="100px"
          >
            <div class="dialog-item-title">基本信息</div>
            <el-row :gutter="20">
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="照片：">
                    <el-upload
                      class="avatar-uploader"
                      :show-file-list="false"
                      action
                      accept=".jpg, .jpeg, .png, .gif"
                      :before-upload="beforeAvatarUpload"
                    >
                      <img v-if="form.photoUrl" :src="form.photoUrl" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon" />
                    </el-upload>
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="姓名：" prop="name">
                    <el-input v-model="form.name" placeholder="请输入姓名" />
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="证件类型：" prop="certType">
                    <el-select
                      v-model="form.certType"
                      placeholder="请选择证件类型"
                      class="form-item1"
                    >
                      <el-option
                        v-for="(item,key) in cardtypeList"
                        :key="key"
                        :label="item.value"
                        :value="item.key"
                      />
                    </el-select>
                  </el-form-item>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="证件号码：" prop="certTypeNo">
                    <el-input v-model="form.certTypeNo" placeholder="请输入证件号码" @blur="autoComplete" />
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="出生日期：">
                    <el-date-picker
                      v-model="form.birthday"
                      value-format="yyyy-MM-dd"
                      type="date"
                      placeholder="选择日期"
                      style="width:100%"
                    />
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="性别：">
                    <el-radio-group v-model="form.sex" @change="genderChange">
                      <el-radio
                        v-for="(item,i) in sexList"
                        :key="i"
                        :label="item.key"
                      >{{ item.value }}</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-row>
              </el-col>
              <!-- <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="身高：">
                    <el-input v-model="form.height" placeholder="请输入身高" />
                  </el-form-item>
                </el-row>
              </el-col> -->
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="婚姻状况：">
                    <el-select
                      v-model="form.maritalStatusId"
                      placeholder="请选择婚姻状况"
                      class="form-item1"
                    >
                      <el-option
                        v-for="(item,key) in marriageList"
                        :key="key"
                        :label="item.value"
                        :value="item.key"
                      />
                    </el-select>
                  </el-form-item>
                </el-row>
              </el-col>
              <!-- <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="健康状况：">
                    <el-select
                      v-model="form.healthStatusId"
                      placeholder="请选择健康状况"
                      class="form-item1"
                    >
                      <el-option
                        v-for="(item,key) in healthyList"
                        :key="key"
                        :label="item.value"
                        :value="item.key"
                      />
                    </el-select>
                  </el-form-item>
                </el-row>
              </el-col> -->
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="政治面貌：" prop="politicsStatusId">
                    <el-select
                      v-model="form.politicsStatusId"
                      placeholder="请选择政治面貌"
                      class="form-item1"
                    >
                      <el-option
                        v-for="(item,key) in politicsList"
                        :key="key"
                        :label="item.value"
                        :value="item.key"
                      />
                    </el-select>
                  </el-form-item>
                </el-row>
              </el-col>
              <!-- <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="文化程度：">
                    <el-select
                      v-model="form.educationBackgroundId"
                      placeholder="请选择文化程度"
                      class="form-item1"
                    >
                      <el-option
                        v-for="(item,key) in eduList"
                        :key="key"
                        :label="item.value"
                        :value="item.key"
                      />
                    </el-select>
                  </el-form-item>
                </el-row>
              </el-col> -->
              <!-- <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="专业：">
                    <el-input v-model="form.profession" placeholder="请输入专业" />
                  </el-form-item>
                </el-row>
              </el-col> -->
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="民族：" prop="nationId">
                    <el-select v-model="form.nationId" placeholder="请选择民族" class="form-item1">
                      <el-option
                        v-for="(item,key) in nationList"
                        :key="key"
                        :label="item.value"
                        :value="item.key"
                      />
                    </el-select>
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="籍贯：" prop="nativePlace">
                    <el-cascader
                      v-model="form.nativePlace"
                      :options="provinceList"
                      :props="nativePlaceProps"
                    />
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="家庭住址：" prop="homeAddress">
                    <el-input v-model="form.homeAddress" placeholder="请输入家庭住址" />
                  </el-form-item>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <div class="dialog-item-title">其他信息</div>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="所属部门：" prop="unitId">
                    <el-cascader
                      ref="cascader"
                      v-model="form.unitId"
                      :options="orgDeptTreeData"
                      :props="treeProps"
                      @change="deptChange"
                      clearable
                    >
                      <template slot-scope="{ node, data }" >
                        <span @click="cascaderRadioClick(data.id,data.label)">{{ data.label }}</span>
                      </template>
                    </el-cascader>
                  </el-form-item>
                </el-row>
              </el-col>
              <!-- <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="人员类型：" prop="staffTypeId">
                    <el-select v-model="form.staffTypeId" placeholder="请选择人员类型" class="form-item1">
                      <el-option
                        v-for="(item,key) in peoplestypeList"
                        :key="key"
                        :label="item.value"
                        :value="item.key"
                      />
                    </el-select>
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="入伍时间：" prop="militaryTime">
                    <el-date-picker
                      v-model="form.militaryTime"
                      value-format="yyyy-MM-dd"
                      type="date"
                      placeholder="选择日期"
                      style="width:100%"
                    />
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="军衔：" prop="militaryRankId">
                    <el-select
                      v-model="form.militaryRankId"
                      placeholder="请选择军衔"
                      class="form-item1"
                    >
                      <el-option
                        v-for="(item,key) in ranksList"
                        :key="key"
                        :label="item.value"
                        :value="item.key"
                      />
                    </el-select>
                  </el-form-item>
                </el-row>
              </el-col> -->
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="职务：">
                    <el-select v-model="form.jobId" placeholder="请选择职务" class="form-item1">
                      <el-option
                        v-for="(item,key) in jobList"
                        :key="key"
                        :label="item.value"
                        :value="item.key"
                      />
                    </el-select>
                  </el-form-item>
                </el-row>
              </el-col>
              <!-- <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="军官证号：">
                    <el-input v-model="form.officerNumber" placeholder="请输入军官证号" />
                  </el-form-item>
                </el-row>
              </el-col> -->
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="工号：">
                    <el-input v-model="form.jobNumber" placeholder="请输入工号" />
                  </el-form-item>
                </el-row>
              </el-col>
              <!-- <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="办公室电话：">
                    <el-input v-model="form.officeTelephone" placeholder="请输入办公室电话" />
                  </el-form-item>
                </el-row>
              </el-col> -->
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="手机号：">
                    <el-input v-model="form.mobile" placeholder="请输入手机号" />
                  </el-form-item>
                </el-row>
              </el-col>
              <!-- <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="宿舍号：">
                    <el-input v-model="form.dormitoryNumber" placeholder="请输入宿舍号" />
                  </el-form-item>
                </el-row>
              </el-col> -->
            </el-row>
          </el-form>
        </div>
      </div>
      <div v-if="dialogStatus!=='view'" slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          v-if="dialogStatus==='create'"
          type="primary"
          @click="createData"
        >{{ $t('table.confirm') }}</el-button>
        <el-button v-else type="primary" @click="updateData">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
    <el-dialog
      class="abow_dialog"
      title="详情"
      :visible.sync="dialog2"
      :close-on-click-modal="false"
      width="1260px"
      @close="resetForm"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form
            ref="dataForm"
            :rules="rules"
            :model="form"
            label-position="right"
            label-width="100px"
          >
            <div class="dialog-item-title">基本信息</div>
            <el-row :gutter="20">
              <!-- <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="编号：">
                    {{form.code}}
                  </el-form-item>
                </el-row>
              </el-col> -->
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="照片：">
                    <template v-if="form.photoUrl!=''">
                      <img :src="form.photoUrl" style="width:50px;height:50px">
                    </template>
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="姓名：">
                    {{form.name}}
                  </el-form-item>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="证件号码：">
                    {{form.certTypeNo}}
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="出生日期：">
                    {{ form.birthday.slice(0, 10) }}
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="性别：">
                    {{ getSex(form.sex) }}
                  </el-form-item>
                </el-row>
              </el-col>
              <!-- <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="身高：">
                    {{form.height}}
                  </el-form-item>
                </el-row>
              </el-col> -->
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="婚姻状况：">
                    {{form.maritalStatus}}
                  </el-form-item>
                </el-row>
              </el-col>
              <!-- <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="健康状况：">
                    {{form.healthStatus}}
                  </el-form-item>
                </el-row>
              </el-col> -->
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="政治面貌：">
                    {{form.politicsStatus}}
                  </el-form-item>
                </el-row>
              </el-col>
              <!-- <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="文化程度：">
                    {{form.educationBackground}}
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="专业：">
                    {{form.profession}}
                  </el-form-item>
                </el-row>
              </el-col> -->
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="民族：">
                    {{form.nation}}
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="籍贯：">
                    {{ GNP(form.nativePlace) }}
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="家庭住址：">
                    {{form.homeAddress}}
                  </el-form-item>
                </el-row>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <div class="dialog-item-title">其他信息</div>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="所属部门：">
                    {{form.unitName}}
                  </el-form-item>
                </el-row>
              </el-col>
              <!-- <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="人员类型：">
                    {{form.staffType}}
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="入伍时间：">
                    {{ form.militaryTime.slice(0, 10) }}
                  </el-form-item>
                </el-row>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="军衔：">
                    {{form.militaryRank}}
                  </el-form-item>
                </el-row>
              </el-col> -->
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="职务：">
                    {{form.job}}
                  </el-form-item>
                </el-row>
              </el-col>
              <!-- <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="军官证号：">
                    {{form.officerNumber}}
                  </el-form-item>
                </el-row>
              </el-col> -->
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="工号：">
                    {{form.jobNumber}}
                  </el-form-item>
                </el-row>
              </el-col>
              <!-- <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="办公室电话：">
                    {{form.officeTelephone}}
                  </el-form-item>
                </el-row>
              </el-col> -->
              <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="手机号：">
                    {{form.mobile}}
                  </el-form-item>
                </el-row>
              </el-col>
              <!-- <el-col :md="24" :lg="8">
                <el-row>
                  <el-form-item label="宿舍号：">
                    {{form.dormitoryNumber}}
                  </el-form-item>
                </el-row>
              </el-col> -->
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import EmpAPI from '@/api/base/employee'
import DeptAPI from '@/api/base/dept'
import chineseToPinYin from '@/utils/KTestpinyin'
import { isIdcard, isTel } from '@/utils/baseformValidate'
import { isIdcard as isCard } from '@/utils/validate'
import { dictBatch } from '@/api/base/dictDetail'
import ConsequenceAPI from '@/api/base/consequence'
import { getAllOrg } from '@/api/base/organ'
import { getNativePlace } from '@/utils/common'
import { delchildren } from '@/utils/index'

export default {
  props: {
    msg: {}
  },
  data() {
    const checkIdCard = (rule, value, callback) => {
      if (this.form.certType === '01') {
        const flag = isCard(value)
        if (flag) {
          callback()
        } else {
          callback(new Error('请输入正确的身份证号码！'))
        }
      } else {
        callback()
      }
    }
    return {
      value1: null,
      value: true,
      isEdit: '',
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {}
      },
      postData: [],
      eduList: [],
      sexList: [],
      ranksList: [],
      nationList: [],
      peoplestypeList: [],
      marriageList: [],
      healthyList: [],
      politicsList: [],
      jobList: [],
      cardtypeList: [],
      list: null,
      total: null,
      listLoading: true,
      orgDeptTreeData: null,
      deptTreeData: null,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      treeProps: {
        expandTrigger: 'hover',
        value: 'id',
        label: 'label',
        emitPath: false,
        checkStrictly: true
      },
      dialogStatus: '',
      dialogFormVisible: false,
      dialog2: false,
      textMap: {
        view: '查看',
        update: '编辑',
        create: '新增'
      },
      form: {
        code: '',
        name: '',
        photoUrl: '',
        certTypeNo: '',
        sex: '',
        birthday: '',
        height: '',
        maritalStatusId: '',
        healthStatusId: '',
        politicsStatusId: '',
        educationBackgroundId: '',
        profession: '',
        nationId: '',
        nativePlace: [],
        homeAddress: '',
        unitId: '',
        unitName: '',
        staffTypeId: '',
        militaryTime: '',
        militaryRankId: '',
        jobId: '',
        officerNumber: '',
        jobNumber: '',
        officeTelephone: '',
        mobile: '',
        dormitoryNumber: '',
        certType: ''
        // createAccount: false,
        // supervisor: false,
        // deptId: '',
        // deptName: '',
        // eduCode: '',
        // email: '',
        // employeeName: '',
        // employeeNo: '',
        // enable: true,
        // genderCode: '',
        // idNumber: '',
        // phone: '',
        // pinyin: '',
        // postCode: '',
        // orgId: '',
        // orgName: '',
        // address: ''
      },
      rules: {
        code: [{
          required: true,
          message: '请填写员工编号',
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: '请填写人员姓名',
          trigger: 'blur'
        }],
        certTypeNo: [{
          required: true,
          message: '请请输入证件号码',
          trigger: 'blur'
        },
        {
          validator: checkIdCard,
          trigger: 'blur'
        }],
        nationId: [{
          required: true,
          message: '请选择民族',
          trigger: 'change'
        }],
        nativePlace: [{
          required: true,
          message: '请选择籍贯',
          trigger: 'change'
        }],
        homeAddress: [{
          required: true,
          message: '请输入家庭住址',
          trigger: 'blur'
        }],
        unitId: [{
          required: true,
          message: '请选择所属部门',
          trigger: 'blur'
        }],
        staffTypeId: [{
          required: true,
          message: '请选择人员类型',
          trigger: 'change'
        }],
        militaryTime: [{
          required: true,
          message: '请选择入伍时间',
          trigger: 'blur'
        }],
        militaryRankId: [{
          required: true,
          message: '请选择军衔',
          trigger: 'change'
        }],
        certType: [{
          required: true,
          message: '请选择证件类型',
          trigger: 'change'
        }],
        // phone: [{
        //   required: true,
        //   message: '请请输入手机号',
        //   trigger: 'blur'
        // },
        // {
        //   validator: isTel,
        //   trigger: 'blur'
        // }],
        // postCode: [{
        //   required: true,
        //   message: '请选择员工岗位',
        //   trigger: 'blur'
        // }],
        // eduCode: [{
        //   required: true,
        //   message: '请选择学历',
        //   trigger: 'blur'
        // }],
        // email: [{
        //   type: 'email',
        //   message: '请输入正确的邮箱地址',
        //   trigger: ['blur', 'change']
        // }],
      },
      certificate: {
        visible: false,
        data: null,
        btnLoading: false
      },
      multipleSelection: [],
      provinceList: [],
      nativePlaceProps: {
        value: 'code',
        label: 'name',
        children: 'city',
        expandTrigger: 'hover'
      }
    }
  },
  watch: {
  },
  created() {
    this.getTree()
    dictBatch(['1001', '1002', '1006', '1007', '1008', '1009', '3001', '3002', '3003', '3016']).then(res => {
      this.sexList = res.data['1001']
      this.eduList = res.data['1002']
      this.marriageList = res.data['1006']
      this.healthyList = res.data['1007']
      this.politicsList = res.data['1008']
      this.nationList = res.data['1009']
      this.peoplestypeList = res.data['3001']
      this.ranksList = res.data['3002']
      this.jobList = res.data['3003']
      this.cardtypeList = res.data['3016']
    })
    this.provinceList = ConsequenceAPI.getCity()
  },
  methods: {
    genderChange(val) {
      const cell = this.sexList.find(item => {
        return item.key === val
      })
      this.form.genderName = cell.value
    },
    postChange(val) {
      const cell = this.postData.find(item => {
        return item.key === val
      })
      this.form.postName = cell.value
    },
    eduChange(val) {
      const cell = this.eduList.find(item => {
        return item.key === val
      })
      this.form.eduName = cell.value
    },
    autoComplete(event) {
      if (this.form.certType === '01') {
        const id = event.target.value
        if (isCard(id)) {
          const births = [id.substr(6, 4), id.substr(10, 2), id.substr(12, 2)]
          this.form.sex = id[16] % 2 === 1 ? '1' : '2'
          this.form.birthday = births.join('-')
        }
      }
    },
    validDeptCode(rule, value, callback) {
      EmpAPI.checkCode({
        id: this.form.id,
        employeeNo: value
      }).then(response => {
        if (response.data) {
          callback(new Error('员工编号重复'))
        } else {
          callback()
        }
      })
    },
    validTelCode(rule, value, callback) {
      EmpAPI.checkPhone({
        id: this.form.id,
        phone: value
      }).then(response => {
        if (response.data) {
          callback(new Error('手机号码重复'))
        } else {
          callback()
        }
      })
    },
    getTree() {
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
        this.$nextTick(() => {
          this.$refs.tree.setCurrentKey(this.orgDeptTreeData[0].id)
          this.getList()
        })
      })
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList()
    },
    getList() {
      this.listLoading = true
      if (this.value1 != null) {
        this.listQuery.params.startTime = this.value1[0]
        this.listQuery.params.endTime = this.value1[1]
      }
      const currentNode = this.$refs.tree.getCurrentNode()
      // console.log(currentNode)
      if (currentNode) {
        this.listQuery.params.unitId = currentNode.id
        EmpAPI.getworkerspage(this.listQuery).then(response => {
          this.list = response.data.content
          this.total = response.data.totalElements
          this.listLoading = false
        })
      }
    },
    deptChange(id) {
      const checkedNode = this.$refs.cascader.getCheckedNodes()[0]
      this.form.unitName = checkedNode.data.label
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.getList()
    },
    resetForm() {
      this.$refs['dataForm'].clearValidate()
      this.form = {
        code: '',
        name: '',
        photoUrl: '',
        certTypeNo: '',
        sex: '',
        birthday: '',
        height: '',
        maritalStatusId: '',
        healthStatusId: '',
        politicsStatusId: '',
        educationBackgroundId: '',
        profession: '',
        nationId: '',
        nativePlace: [],
        homeAddress: '',
        deptId: '',
        staffTypeId: '',
        militaryTime: '',
        militaryRankId: '',
        jobId: '',
        officerNumber: '',
        jobNumber: '',
        officeTelephone: '',
        mobile: '',
        dormitoryNumber: '',
        certType: ''
      }
    },
    handleCreate(e, id) {
      // const currentNode = this.$refs.tree.getCurrentNode()
      // if (!currentNode) {
      //   this.$notify.warning('请选择机构或部门')
      //   return
      // }
      // this.resetForm()
      // if (currentNode.attr.type === 'dept') {
      //   const node = this.$refs.tree.getNode(currentNode.id)
      //   const rootNode = this.findRootNode(node)
      //   this.form.orgId = rootNode.id
      //   this.form.orgName = rootNode.label
      //   this.form.deptId = currentNode.id
      //   this.form.deptName = currentNode.label
      // } else {
      //   this.form.orgId = currentNode.id
      //   this.form.orgName = currentNode.label
      // }
      // DeptAPI.getDeptTree(this.form.orgId).then(res => {
      //   this.deptTreeData = res.data
      // })

      if (e === 1) {
        this.dialogStatus = 'create'
      } else {
        this.dialogStatus = 'update'
        this.getdetails(id)
      }
      this.dialogFormVisible = true
      // this.$nextTick(() => {
      //   this.$refs['dataForm'].clearValidate()
      //   this.isEdit = false
      // })
    },
    details (id) {
      this.dialog2 = true;
      this.getdetails(id)
    },
    getdetails (id) {
      EmpAPI.getworkers(id).then((response) => {
        this.form = response.data
        if(!Array.isArray(this.form.nativePlace)){
          this.form.nativePlace = JSON.parse(this.form.nativePlace)
        }
        // if(this.dialogStatus == 'update'){
        // this.form.nativePlace = JSON.parse(this.form.nativePlace)
        // }
      })
    },
    findRootNode(node) {
      // 递归获取子节点的根节点
      if (node.level === 1) {
        return node.data
      } else {
        return this.findRootNode(node.parent)
      }
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        this.form.maritalStatus = this.getMarital()// 婚姻状况
        // this.form.healthStatus = this.getHealth()// 健康状况
        this.form.politicsStatus = this.getPolitics()// 政治面貌
        // this.form.educationBackground = this.getEdu()// 文化程度
        this.form.nation = this.getNation()// 民族
        // this.form.staffType = this.getStaff()// 人员类型
        // this.form.militaryRank = this.getMilitaryRank()// 军衔
        this.form.job = this.getJob()// 职务
        this.form.certTypeName = this.getcertTypeName()// 证件类型
        console.log(this.form)
        if (valid) {
          EmpAPI.saveworkers(this.form).then(() => {
            this.dialogFormVisible = false
            this.$notify.success({
              title: '成功',
              message: '人员添加成功!'
            })
            this.getList()
          })
        }
      })
    },
    handleUpdate(row) {
      this.form = { ...row }
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      DeptAPI.getDeptTree(this.form.orgId).then(res => {
        this.deptTreeData = res.data
      })
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
        this.isEdit = row.createAccount
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        this.form.maritalStatus = this.getMarital()// 婚姻状况
        // this.form.healthStatus = this.getHealth()// 健康状况
        this.form.politicsStatus = this.getPolitics()// 政治面貌
        // this.form.educationBackground = this.getEdu()// 文化程度
        this.form.nation = this.getNation()// 民族
        // this.form.staffType = this.getStaff()// 人员类型
        // this.form.militaryRank = this.getMilitaryRank()// 军衔
        this.form.job = this.getJob()// 职务
        console.log(this.form)
        if (valid) {
          EmpAPI.putworkers(this.form).then(() => {
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
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是JPG/PNG/GIF格式!')
        return
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过2MB!')
        return
      }
      const formatFile = new FormData()
      formatFile.append('file', file)
      this.form.photoUrl = ''
      EmpAPI.upload(formatFile)
        .then(res => {
          this.form.photoUrl = res.data[0].filePath
          this.$message.success('头像上传成功！')
        })
      return false
    },
    handleSelectionChange(val) {
      this.multipleSelection = val.map(function(item) {
        return item.id
      })
      this.$emit('getPeoplesArr', this.multipleSelection)
      // console.log(this.multipleSelection)
    },
    selected(selection, row) {
      if (this.msg === 2) {
        this.$refs.multipleTable.clearSelection()
        if (selection.length === 0) return
        this.$refs.multipleTable.toggleRowSelection(row, true)
      }
    },
    GNP(arr) {
      if(arr.length>0){
        return getNativePlace(arr)
      }
    },
    getSex(e) {
      if(e){
        const a = this.sexList.find((item) => {
          return item.key == Number(e)
        })
        return a.value
      }
    },
    getEdu() {
      if (this.form.educationBackgroundId === '') {
        return ''
      } else {
        const a = this.eduList.find((item) => {
          return item.key === this.form.educationBackgroundId
        })
        return a.value
      }
    },
    getNation() {
      const a = this.nationList.find((item) => {
        return item.key === this.form.nationId
      })
      return a.value
    },
    getStaff() {
      const a = this.peoplestypeList.find((item) => {
        return item.key === this.form.staffTypeId
      })
      return a.value
    },
    getMilitaryRank() {
      const a = this.ranksList.find((item) => {
        return item.key === this.form.militaryRankId
      })
      return a.value
    },
    getMarital() {
      if (this.form.maritalStatusId === '') {
        return ''
      } else {
        const a = this.marriageList.find((item) => {
          return item.key === this.form.maritalStatusId
        })
        return a.value
      }
    },
    getHealth() {
      if (this.form.healthStatusId === '') {
        return ''
      } else {
        const a = this.healthyList.find((item) => {
          return item.key === this.form.healthStatusId
        })
        return a.value
      }
    },
    getPolitics() {
      if (this.form.politicsStatusId === '') {
        return ''
      } else {
        const a = this.politicsList.find((item) => {
          return item.key === this.form.politicsStatusId
        })
        return a.value
      }
    },
    getJob() {
      if (this.form.jobId === '') {
        return ''
      } else {
        const a = this.jobList.find((item) => {
          return item.key === this.form.jobId
        })
        return a.value
      }
    },
    getcertTypeName() {
      if (this.form.certType === '') {
        return ''
      } else {
        const a = this.cardtypeList.find((item) => {
          return item.key === this.form.certType
        })
        return a.value
      }
    },
    delitem (id) {
      this.$confirm('确认删除？').then(() => {
        EmpAPI.delworkers(id).then(() => {
          this.getList()
          this.$notify.success({
            title: '成功',
            message: '删除成功'
          })
        })
      })
    },
    cascaderRadioClick(val,name) {
      this.form.unitId = val
      this.form.unitName = name
    }
  }
}
</script>
<style lang='scss' scoped>
.dialog-item-title {
  padding-left: 0;
  margin-bottom: 20px;
}
.photo {
}
.photo-icon-small {
  width: 40px;
  height: 40px;
}

/deep/ .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

/deep/ .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}

.avatar {
  // position: absolute;
  // top: 0;
  // left: 10%;
  width: 50px;
  height: 50px;
  display: block;
}
.dialogBox {
  border: 1px solid #eee;
  box-sizing: border-box;
  padding: 20px 20px 0 20px;
  background-color: #fff;
}
</style>
