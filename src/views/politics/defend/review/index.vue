<template>
  <!--人员政审-->
  <div class="app-container">
    <el-card class="app-body">
      <div slot="header" class="clearfix">
        <span>人员政审</span>
      </div>

      <!--操作按钮-->
      <div class="filter-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="人员姓名：" class="filter-item">
            <el-input v-model="dataForm.name" placeholder="请输入" style="width: 200px" />
          </el-form-item>
          <el-form-item label="档案编号：" class="filter-item">
            <el-input v-model="dataForm.code" placeholder="请输入" style="width: 200px" />
          </el-form-item>
          <el-form-item label="身份证号：" class="filter-item">
            <el-input v-model="dataForm.idNumber" placeholder="请输入" style="width: 200px" />
          </el-form-item>
          <el-form-item label="工作单位：" class="filter-item">
            <el-input v-model="dataForm.deptId" placeholder="请输入" style="width: 200px" />
          </el-form-item>
          <el-form-item class="filter-item" style="float: right;margin-right: 3%">
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconsousuo"
              @click="handleAdd"
            >{{ $t('table.add') }}</el-button>
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconsousuo"
              @click="handleFilter"
            >{{ $t('table.search') }}</el-button>
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconsousuo"
              @click="handleFilter"
            >{{ $t('table.export') }}</el-button>
            <el-button
              v-waves
              class="filter-item btn-base"
              type="primary"
              icon="mr10 iconfont iconxinzengh"
              @click="handleCreate"
            >重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--固定车辆分页内容-->
      <el-table
        v-loading="listLoading"
        :data="tableData"
        :header-cell-style="{background:'#FAFAFA',color:'#A2A2B2','font-size':'14px'}"
        stripe
        class="t-bd"
        border
      >
        <el-table-column label="ID" fixed width="50px">
          <template slot-scope="scope">
            <span>{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="档案编号" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.a }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" fixed show-overflow-tooltip width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.b }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别" fixed show-overflow-tooltip width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.c }}</span>
          </template>
        </el-table-column>
        <el-table-column label="出生日期" fixed show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.d }}</span>
          </template>
        </el-table-column>
        <el-table-column label="身份证号" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.e }}</span>
          </template>
        </el-table-column>
        <el-table-column label="籍贯" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.f }}</span>
          </template>
        </el-table-column>
        <el-table-column label="民族" show-overflow-tooltip width="80px">
          <template slot-scope="scope">
            <span>{{ scope.row.g }}</span>
          </template>
        </el-table-column>
        <el-table-column label="工作单位" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.h }}</span>
          </template>
        </el-table-column>
        <el-table-column label="个人政治历史情况" align="center" show-overflow-tooltip width="150px">
          <template slot-scope="scope">
            <span>{{ scope.row.i }}</span>
          </template>
        </el-table-column>
        <el-table-column label="直系亲属及主要社会关系政治历史情况" show-overflow-tooltip width="270px">
          <template slot-scope="scope">
            <span>{{ scope.row.j }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="$t('table.actions')"
          fixed="right"
          class-name="small-padding fixed-width"
          width="160px"
        >
          <template slot-scope="scope">
            <div class="t-col-operate">
              <i class="el-icon-tickets primary table-i" title="查看" @click="handleView(scope.row)" />
              <i class="el-icon-edit-outline warning table-i" title="审核" @click="handleUpdate(scope.row)" />
              <!--<i class="el-icon-delete danger table-i" title="注销" @click="handleDelete(scope.row)" />-->
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

    <!--添加/编辑弹出框-->
    <el-dialog
      class="abow_dialog"
      :title="dialogForm.title"
      :visible.sync="dialogForm.visible"
      :close-on-click-modal="false"
      width="70%"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form ref="dataForm" :model="dataForm" :rules="rules" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="档案编号：" prop="a">
                  <el-input v-model="dataForm.a" class="form-item1" placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="籍贯：" prop="f">
                  <el-select v-model="dataForm.f" class="form-item1" placeholder="请选择">
                    <el-option
                      v-for="item in [{label:'湖南长沙',value:'湖南长沙'},{label:'湖南岳阳',value:'湖南岳阳'},{label:'湖南株洲',value:'湖南株洲'},{label:'湖南湘潭',value:'湖南湘潭'}]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="姓名：" prop="b">
                  <el-input v-model="dataForm.b" class="form-item1" placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="性别：" prop="c">
                  <el-select v-model="dataForm.c" class="form-item1" placeholder="请选择">
                    <el-option
                      v-for="item in [{label:'男',value:'男'},{label:'女',value:'女'}]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="民族：" prop="g">
                  <el-select v-model="dataForm.g" class="form-item1" placeholder="请选择">
                    <el-option v-for="item in roomList" :key="item.key" :label="item.value" :value="item.key" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="出生日期：" prop="d">
                  <el-date-picker
                    v-model="dataTestForm.bornDate"
                    class="form-item1"
                    type="date"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="身份证号：" prop="e">
                  <el-input v-model="dataForm.e" class="form-item1" placeholder="请输入" />
                </el-form-item>
              </el-col>

              <!--//-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
              <el-col :md="24" :lg="12">
                <el-form-item label="工作单位：" prop="i">
                  <el-select v-model="dataTestForm.workDeptid" placeholder="请选择" class="form-item1" style="width: 200px">
                    <el-option
                      v-for="item in [{label:'猎鹰一营',value:'猎鹰一营'},{label:'猎鹰二营',value:'猎鹰二营'},{label:'猎鹰三营',value:'猎鹰三营'},{label:'猎鹰四营',value:'猎鹰四营'}]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :md="24">
                <el-form-item label="家庭地址：" prop="j">
                  <el-select v-model="dataTestForm.area" placeholder="请选择" style="width:130px">
                    <el-option
                      v-for="item in [{label:'第一生活区',value:'第一生活区'},{label:'第二生活区',value:'第二生活区'},{label:'第三生活区',value:'第三生活区'},{label:'第四生活区',value:'第四生活区'}]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                  <el-select v-model="dataTestForm.levelNum" placeholder="请选择" style="width:130px;margin-left: 17px">
                    <el-option
                      v-for="item in [{label:'1号楼',value:'1号楼'},{label:'2号楼',value:'2号楼'},{label:'3号楼',value:'3号楼'},{label:'4号楼',value:'4号楼'}]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                  <el-select v-model="dataTestForm.liveUnit" placeholder="请选择" style="width: 130px;padding-top: 10px">
                    <el-option
                      v-for="item in [{label:'1单元',value:'1单元'},{label:'2单元',value:'2单元'},{label:'3单元',value:'3单元'}]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                  <el-select v-model="dataTestForm.floorNum" placeholder="请选择" style="width: 130px;margin-left: 17px">
                    <el-option
                      v-for="item in [{label:'1楼',value:'1楼'},{label:'2楼',value:'2楼'},{label:'3楼',value:'3楼'}]"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>

                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-divider>家庭成员信息</el-divider>
          <el-table
            v-if="dialogForm.type === 'edit'"
            :data="tableDataEle"
            style="width: 100%"
          >
            <el-table-column
              prop="a"
              label="称谓"
              width="139"
            >
              <template scope="scope">
                <el-input v-model="scope.row.a" style="width: 110px;" />
              </template>
            </el-table-column>
            <el-table-column
              prop="b"
              label="姓名"
              width="129"
            >
              <template scope="scope">
                <el-input v-model="scope.row.b" style="width: 110px;" />
              </template>
            </el-table-column>
            <el-table-column
              prop="c"
              label="性别"
              width="129"
            >
              <template scope="scope">
                <el-input v-model="scope.row.c" style="width: 110px;" />
              </template>
            </el-table-column>
            <el-table-column
              prop="d"
              label="年龄"
              width="119"
            >
              <template scope="scope">
                <el-input v-model="scope.row.d" style="width: 100px;" />
              </template>
            </el-table-column>
            <el-table-column
              prop="e"
              label="身份证号"
            >
              <template scope="scope">
                <el-input v-model="scope.row.e" style="width: 100%;" />
              </template>
            </el-table-column>
            <el-table-column
              prop="f"
              label="政治面貌"
              width="119"
            >
              <template scope="scope">
                <el-input v-model="scope.row.f" style="width: 100px;" />
              </template>
            </el-table-column>
            <el-table-column
              prop="g"
              label="工作单位及职务"
            >
              <template scope="scope">
                <el-input v-model="scope.row.g" style="width: 100%;" />
              </template>
            </el-table-column>

          </el-table>

          <el-table
            v-if="dialogForm.type === 'add'"
            :data="tableDataTest"
            style="width: 100%"
          >
            <el-table-column
              prop="a"
              label="称谓"
              width="139"
            >
              <template scope="scope">
                <el-input v-model="scope.row.a" style="width: 110px;" />
              </template>
            </el-table-column>
            <el-table-column
              prop="b"
              label="姓名"
              width="129"
            >
              <template scope="scope">
                <el-input v-model="scope.row.b" style="width: 110px;" />
              </template>
            </el-table-column>
            <el-table-column
              prop="c"
              label="性别"
              width="129"
            >
              <template scope="scope">
                <el-input v-model="scope.row.c" style="width: 110px;" />
              </template>
            </el-table-column>
            <el-table-column
              prop="d"
              label="年龄"
              width="119"
            >
              <template scope="scope">
                <el-input v-model="scope.row.d" style="width: 100px;" />
              </template>
            </el-table-column>
            <el-table-column
              prop="e"
              label="身份证号"
            >
              <template scope="scope">
                <el-input v-model="scope.row.e" style="width: 100%;" />
              </template>
            </el-table-column>
            <el-table-column
              prop="f"
              label="政治面貌"
              width="119"
            >
              <template scope="scope">
                <el-input v-model="scope.row.f" style="width: 100px;" />
              </template>
            </el-table-column>
            <el-table-column
              prop="g"
              label="工作单位及职务"
            >
              <template scope="scope">
                <el-input v-model="scope.row.g" style="width: 100%;" />
              </template>
            </el-table-column>

          </el-table>

          <el-row>
            <el-col :md="24" :lg="2" style="padding-top: 34px;font-size: 15px;font-weight: 700;">
              <span>附件材料：</span>
            </el-col>
            <el-col :md="24" :lg="8">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :file-list="fileList"
              />
            </el-col>
          </el-row>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="dialogForm.type === 'edit'" class="un-primary-btn" @click="dialogForm.visible = false">拒绝</el-button>
        <el-button v-else class="un-primary-btn" @click="dialogForm.visible = false">取 消</el-button>
        <el-button v-if="dialogForm.type === 'edit'" type="primary" @click="updateData">通过</el-button>
        <el-button v-if="dialogForm.type === 'add'" type="primary" @click="updateData">确定</el-button>
      </span>
    </el-dialog>

    <!--详情查看-->
    <el-dialog
      class="abow_dialog detail-form"
      title="查看"
      :visible.sync="checkdetail"
      :close-on-click-modal="false"
      width="70%"
    >
      <div class="dialog-content">
        <div class="dialog-item">
          <el-form :model="dataForm" label-width="120px">
            <el-row :gutter="20">
              <el-col :md="24" :lg="12">
                <el-form-item label="档案编号：">{{ dataForm.a }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="籍贯：">{{ dataForm.f }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="姓名：">{{ dataForm.b }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="性别：">{{ dataForm.c }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="民族：">{{ dataForm.g }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="工作单位：">{{ dataForm.h }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="出生日期：">{{ dataForm.d }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="身份证号：">{{ dataForm.e }}</el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="家庭地址：">{{ dataForm.k }}</el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-divider>家庭成员信息</el-divider>
          <el-table
            :data="tableDataEle"
            style="width: 100%"
          >
            <el-table-column
              prop="a"
              label="称谓"
              width="139"
            />
            <el-table-column
              prop="b"
              label="姓名"
              width="129"
            />
            <el-table-column
              prop="c"
              label="性别"
              width="129"
            />
            <el-table-column
              prop="d"
              label="年龄"
              width="119"
            />
            <el-table-column
              prop="e"
              label="身份证号"
            />
            <el-table-column
              prop="f"
              label="政治面貌"
              width="119"
            />
            <el-table-column
              prop="g"
              label="工作单位及职务"
            />
          </el-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MeAPI from '@/api/demo/aaa'
export default {
  name: 'Index',
  data() {
    return {
      tableDataTest: [
        {
          a: '',
          b: '',
          c: '',
          d: '',
          e: '',
          f: '',
          g: ''
        }
      ],
      fileList: [{ name: '某某某通知综合政审材料.pdf', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }],
      tableDataEle: [{
        a: 'ZSCL-001001',
        b: '张三',
        c: '男',
        d: '1991-04-10',
        e: '121212200006083322',
        f: '湖南常德',
        g: '汉',
        h: '技术一部',
        i: '无政治历史问题',
        j: '无政治历史问题'
      }, {
        a: 'ZSCL-001001',
        b: '张三',
        c: '女',
        d: '1987-08-22',
        e: '121212200006083322',
        f: '湖南常德',
        g: '汉',
        h: '技术一部',
        i: '无政治历史问题',
        j: '无政治历史问题'
      }, {
        a: 'ZSCL-001001',
        b: '张三',
        c: '女',
        d: '1989-09-12',
        e: '121212200006083322',
        f: '湖南常德',
        g: '汉',
        h: '技术一部',
        i: '无政治历史问题',
        j: '无政治历史问题'
      }
      ],
      roomList: [],
      performanceList: [],
      departList: [],
      tableData: [],
      total: null,
      listLoading: true,
      listQuery: {
        pageNo: 1,
        pageSize: 10,
        params: {
          carNo: '',
          unitId: '',
          carUseId: ''
        }
      },
      dialogForm: {
        visible: false,
        title: '',
        type: 'add'
      },
      dataTestForm: {
        area: '第一生活区',
        levelNum: '1号楼',
        liveUnit: '2单元',
        floorNum: '2楼',

        bornDate: '1989-08-22',
        workDeptid: '技术一部'
      },
      dataForm: {
        a: '',
        b: '',
        c: '',
        d: '',
        e: '',
        f: '',
        g: '',
        h: '',
        i: '',
        j: '',
        k: '',
        l: '',
        m: '',
        n: '',
        x: '',
        y: '',
        z: ''
      },
      rules: {
        a: [{ required: true, message: '请输入', trigger: 'blur' }],
        b: [{ required: true, message: '请输入', trigger: 'blur' }],
        c: [{ required: true, message: '请选择', trigger: 'blur' }],
        d: [{ required: true, message: '请选择', trigger: 'blur' }],
        e: [{ required: true, message: '请输入', trigger: 'blur' }],
        f: [{ required: true, message: '请输入', trigger: 'blur' }],

        g: [{ required: true, message: '请输入', trigger: 'blur' }],
        h: [{ required: true, message: '请选择', trigger: 'blur' }],
        i: [{ required: true, message: '请选择', trigger: 'blur' }],
        j: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      checkdetail: false
    }
  },
  mounted() {
    this.geDictList()
  },
  methods: {
    // 新增
    handleAdd() {
      this.tableDataEle = [{
        a: '儿子',
        b: '张小一',
        c: '男',
        d: '20',
        e: '121212200006083322',
        f: '团员',
        g: '常德职业技术学院，大二在读'
      }, {
        a: '女儿',
        b: '张小美',
        c: '女',
        d: '18',
        e: '121212200006083322',
        f: '团员',
        g: '北京电影学院，大一在读'
      }]
      this.resetForm()
      this.dialogForm.visible = true
      this.dialogForm.title = '新增'
      this.dialogForm.type = 'add'
      this.dataForm = {}
      // this.tableDataEle = [];//点击新增时清空tableDataEle家庭成员信息部分数据
      this.dataTestForm = []
    },
    geDictList() {
      const res = MeAPI.dict()
      this.roomList = res.data['01']
      this.performanceList = res.data['02']
      this.departList = res.data['03']
      this.getList()
    },
    handleFilter() {
      this.listQuery.pageNo = 1
      this.getList()
    },
    getList() {
      // const res = MeAPI.page(this.listQuery)
      this.listLoading = false
      // this.total = res.data.totalElements
      // this.tableData = res.data.content
      this.tableData = [
        {
          a: 'ZSCL-001001',
          b: '张三',
          c: '男',
          d: '1989-08-22',
          e: '121212200006083322',
          f: '湖南常德',
          g: '汉',
          h: '技术一部',
          i: '无政治历史问题',
          j: '无政治历史问题',
          k: '第一生活区,3号楼,二单元,15层,1503室',
          l: '猎鹰一营'
        }, {
          a: 'ZSCL-001001',
          b: '张三',
          c: '女',
          d: '1990-9-12',
          e: '121212200006083322',
          f: '湖南常德',
          g: '汉',
          h: '技术一部',
          i: '无政治历史问题',
          j: '无政治历史问题',
          k: '第一生活区,3号楼,二单元,15层,1503室',
          l: '猎鹰一营'
        }, {
          a: 'ZSCL-001001',
          b: '张三',
          c: '女',
          d: '1992-12-05',
          e: '121212200006083322',
          f: '湖南常德',
          g: '汉',
          h: '技术一部',
          i: '无政治历史问题',
          j: '无政治历史问题',
          k: '第一生活区,3号楼,二单元,15层,1503室',
          l: '猎鹰一营'
        }
      ]
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.pageNo = val
      this.getList()
    },
    handleCreate() {
      this.resetForm()
      this.dialogForm.visible = true
      this.dialogForm.title = '新增装备'
      this.dialogForm.type = 'add'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.dialogForm.visible = false
          this.tableData.push(this.dataForm)
          this.$notify.success({
            title: '成功',
            message: '保存成功!'
          })
        }
      })
    },
    // 编辑
    handleUpdate(info) {
      this.tableDataEle = [{
        a: '儿子',
        b: '张小一',
        c: '男',
        d: '20',
        e: '121212200006083322',
        f: '团员',
        g: '常德职业技术学院，大二在读'
      }, {
        a: '女儿',
        b: '张小美',
        c: '女',
        d: '18',
        e: '121212200006083322',
        f: '团员',
        g: '北京电影学院，大一在读'
      }]
      this.dataTestForm = {
        area: '第一生活区',
        levelNum: '1号楼',
        liveUnit: '2单元',
        floorNum: '2楼',
        bornDate: '1989-08-22',
        workDeptid: '技术一部'
      }
      this.resetForm()
      this.dialogForm.visible = true
      this.dialogForm.title = '编辑'
      this.dialogForm.type = 'edit'
      this.dataForm = Object.assign({}, info)
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.dialogForm.visible = false
          this.tableData.forEach((item, index) => {
            if (item.id === this.dataForm.id) {
              this.$set(this.tableData, index, this.dataForm)
            }
          })
          this.$notify.success({
            title: '成功',
            message: '编辑成功!'
          })
        }
      })
    },
    handleView(info) {
      this.tableDataEle = [{
        a: '儿子',
        b: '张小一',
        c: '男',
        d: '20',
        e: '121212200006083322',
        f: '团员',
        g: '常德职业技术学院，大二在读'
      }, {
        a: '女儿',
        b: '张小美',
        c: '女',
        d: '18',
        e: '121212200006083322',
        f: '团员',
        g: '北京电影学院，大一在读'
      }]
      this.checkdetail = true
      this.dataForm = Object.assign({}, info)
    },
    handleDelete(info) {
      this.$confirm('确认删除' + info.a + '？').then(() => {
        this.tableData = this.tableData.filter(item => {
          return item.id !== info.id
        })
        console.log(this.tableData)
        this.$notify.success({
          title: '成功',
          message: '删除成功'
        })
      })
    },
    resetForm() {
      this.dataForm = {
        a: '',
        b: '',
        c: '',
        d: '',
        e: '',
        f: '',
        g: '',
        h: '',
        i: '',
        j: '',
        k: '',
        l: '',
        m: '',
        n: '',
        x: '',
        y: '',
        z: ''
      }
    },
    getFactory(val) {
      const result = this.roomList.find(item => {
        return item.key === val
      })
      return result ? result.value : ''
    },
    getPerform(val) {
      const result = this.performanceList.find(item => {
        return item.key === val
      })
      return result ? result.value : ''
    },
    getDepart(val) {
      const result = this.departList.find(item => {
        return item.key === val
      })
      return result ? result.value : ''
    },
    beforeExcelUpload(file) {
      const fileName = file.name.toLowerCase()
      const isMODO =
          fileName.indexOf('.xlsx') >= 0 ||
          fileName.indexOf('.xls') >= 0
      const isLt2M = file.size / 1024 / 1024 < 4

      if (!isMODO) {
        this.$message.error('上传图片只能是xlsx/xls格式!')
        return
      }
      if (!isLt2M) {
        this.$message.error('上传模型大小不能超过4MB!')
        return
      }
      const formatFile = new FormData()
      formatFile.append('file', file)
      MeAPI.upload(formatFile).then(res => {
      })
      return false
    }
  }
}
</script>

<style scoped>
  .cards{
    height: 140px;
    width: 20%;
  }
</style>
