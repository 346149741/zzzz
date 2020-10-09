<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="menu-title">
            <div>
              <span class="mr10" style="line-height: 16px;">图例组</span>
            </div>
          </div>
          <el-menu style="border-width: 0;" default-active="1" @select="handleGroupSelect">
            <el-menu-item index="1" class="lengend-group-item">
              <span slot="title">二维图例</span>
              <i class="el-icon-circle-plus lengend-icon" @click="handleGroupAdd('1')" />
            </el-menu-item>
            <el-menu-item index="2" class="lengend-group-item">
              <span slot="title">三维图例</span>
              <i class="el-icon-circle-plus lengend-icon" @click="handleGroupAdd('2')" />
            </el-menu-item>
            <el-menu-item index="3" class="lengend-group-item">
              <span slot="title">预警图例</span>
              <i class="el-icon-circle-plus lengend-icon" @click="handleGroupAdd('3')" />
            </el-menu-item>
          </el-menu>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card class="box-card app-body">
          <div slot="header" class="menu-title">
            <div>
              <span class="mr10" style="line-height: 16px;">图例信息</span>
            </div>
          </div>
          <!--二维图例-->
          <div v-if="groupType === '1'" class="lengend-contain">
            <div v-for="(item, index) in typeList" :key="index">
              <div class="contain-title">
                {{ item.legendType }}
                <el-button size="mini" icon="el-icon-circle-close" style="margin-left: 10px;" @click="handleTypeDelete(item)">删除</el-button>
                <el-button size="mini" icon="el-icon-edit-outline" style="margin-left: 10px;" @click="handleTypeUpdate(item)">编辑</el-button>
                <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="handleImgAdd(item)">新增</el-button>
              </div>
              <div class="contain-imgs">
                <div
                  v-for="(m, x) in item.children"
                  :key="x"
                  class="img-item"
                  draggable="true"
                  @dragstart="dragStart($event, x, m, index)"
                  @dragover="allowDrop"
                  @drop="drop($event, x, m, index)"
                >
                  <img :src="m.legendDisplay.image">
                  <div class="img-font">{{ m.name }}</div>
                  <i class="el-icon-error img-delete" @click="deleteImg(m)" />
                </div>
              </div>
            </div>
          </div>
          <!--三维图例-->
          <div v-if="groupType === '2'" class="lengend-contain">
            <div v-for="(item, index) in typeList" :key="index">
              <div class="contain-title">
                {{ item.legendType }}
                <el-button size="mini" icon="el-icon-circle-close" style="margin-left: 10px;" @click="handleTypeDelete(item)">删除</el-button>
                <el-button size="mini" icon="el-icon-edit-outline" style="margin-left: 10px;" @click="handleTypeUpdate(item)">编辑</el-button>
                <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="handleModuAdd(item)">新增</el-button>
              </div>
              <div class="contain-modos">
                <div
                  v-for="(m, x) in item.children"
                  :key="x"
                  class="img-item"
                  draggable="true"
                  @dragstart="dragStart($event, x, m, index)"
                  @dragover="allowDrop"
                  @drop="drop($event, x, m, index)"
                >
                  <img :src="m.legendDisplay.image" @dblclick="handleViewModo(m)">
                  <div class="img-font">{{ m.name }}</div>
                  <i class="el-icon-error img-delete" @click="deleteImg(m)" />
                </div>
              </div>
            </div>
          </div>
          <!--预警图例-->
          <div v-if="groupType === '3'" class="lengend-contain">
            <div v-for="(item, index) in typeList" :key="index">
              <div class="contain-title">
                {{ item.legendType }}
                <el-button size="mini" icon="el-icon-circle-close" style="margin-left: 10px;" @click="handleTypeDelete(item)">删除</el-button>
                <el-button size="mini" icon="el-icon-edit-outline" style="margin-left: 10px;" @click="handleTypeUpdate(item)">编辑</el-button>
                <el-button size="mini" type="primary" icon="el-icon-circle-plus-outline" @click="handleWarnAdd(item)">新增</el-button>
              </div>
              <div class="contain-warns">
                <div
                  v-for="(a, b) in item.children"
                  :key="b"
                  class="img-group"
                  draggable="true"
                  @dragstart="dragStart($event, b, a, index)"
                  @dragover="allowDrop"
                  @drop="drop($event, b, a, index)"
                >
                  <div class="group-name">{{ a.name }}</div>
                  <div v-for="(m, x) in a.legendList" :key="x" class="img-item">
                    <img :src="m.image">
                    <div class="img-font">{{ warnList[x].value }}</div>
                  </div>
                  <i class="el-icon-error img-delete" @click="deleteImg(a)" />
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!--添加图例分类-->
    <el-dialog top="30vh" :title="lengendGroup.title" :visible.sync="lengendGroup.visible" left width="420px">
      <el-form ref="groupForm" :rules="groupRules" :model="groupForm" label-position="right" label-width="60px" style="padding-right: 20px;">
        <el-form-item label="名称" prop="name">
          <el-input v-model="groupForm.legendType" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="groupForm.sort" :min="0" :max="9999" :precision="0" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="lengendGroup.visible = false">{{ $t('table.cancel') }}</el-button>
        <el-button v-if="lengendGroup.operate === 'add'" type="primary" @click="groupAdd">新增</el-button>
        <el-button v-else type="primary" @click="groupUpdate">保存</el-button>
      </div>
    </el-dialog>
    <!--添加图例-->
    <el-dialog top="10vh" :title="secondImg.title" :visible.sync="secondImg.visible" left width="420px">
      <secondImg ref="secondImg" :pop-data="secondImg" @getList="handleGroupSelect" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="secondImg.visible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="secondAdd">新增</el-button>
      </div>
    </el-dialog>
    <!--添加图例模型-->
    <el-dialog top="10vh" :title="thirdImg.title" :visible.sync="thirdImg.visible" left width="420px">
      <thirdImg ref="thirdImg" :pop-data="thirdImg" @getList="handleGroupSelect" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="thirdImg.visible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="moduAdd">新增</el-button>
      </div>
    </el-dialog>
    <!--添加图例模型-->
    <el-dialog top="10vh" :title="warnImg.title" :visible.sync="warnImg.visible" left width="620px">
      <warnImg ref="warnImg" :pop-data="warnImg" @getList="handleGroupSelect" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="warnImg.visible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="warnAdd">新增</el-button>
      </div>
    </el-dialog>
    <!--模型浏览-->
    <el-dialog top="10vh" :title="viewModo.title" :visible.sync="viewModo.visible" left width="800px">
      <viewModo ref="warnImg" :pop-data="viewModo" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="viewModo.visible = false">{{ $t('table.cancel') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import LendAPI from '@/api/base/lend'
import secondImg from './secondImg.vue'
import thirdImg from './thirdImg.vue'
import warnImg from './warnImg.vue'
import viewModo from './view.vue'
import { dictCode } from '@/api/base/dictDetail'
export default {
  name: 'LengendManaget',
  components: { secondImg, thirdImg, warnImg, viewModo },
  data() {
    return {
      lengendGroup: {
        title: '',
        visible: false,
        operate: 'add'
      },
      groupForm: {
        legendType: '',
        legendFlag: '0',
        legendGroup: '',
        sort: 0
      },
      groupRules: {
        legendType: [{ required: true, message: '请填写图例类别名称', trigger: 'blur' }]
      },
      secondImg: {
        title: '',
        visible: false,
        legendType: ''
      },
      thirdImg: {
        title: '',
        visible: false,
        legendType: ''
      },
      warnImg: {
        title: '',
        visible: false,
        legendType: ''
      },
      viewModo: {
        title: '',
        visible: false
      },
      typeList: [],
      groupType: '1',
      warnList: [],
      fileMiddleData: {},
      fileMiddleIndex: -1,
      transArrIndex: -1
    }
  },
  mounted() {
    this.geDictList()
    this.handleGroupSelect('1')
  },
  methods: {
    handleGroupSelect(val) {
      this.groupType = val
      LendAPI.groupList(val).then(res => {
        res.data.forEach(item => {
          if (item.children.length > 0) {
            item.children.forEach(i => {
              if (val === '3') {
                // 当是预警图例时把对象转换为数组
                i.legendDisplay = JSON.parse(i.legendDisplay)
                i.legendList = []
                for (const b in i.legendDisplay) {
                  i.legendList.push(i.legendDisplay[b])
                }
              } else {
                i.legendDisplay = JSON.parse(i.legendDisplay)
              }
            })
          }
        })
        this.typeList = res.data
      })
    },
    geDictList() {
      this.warnList = []
      dictCode('2018').then(res => {
        this.warnList = res.data
      })
    },
    handleGroupAdd(type) {
      let title = ''
      switch (type) {
        case '1':
          title = '二维图例'
          break
        case '2':
          title = '三维图例'
          break
        case '3':
          title = '预警图例'
          break
      }
      this.lengendGroup.title = title
      this.groupForm.legendGroup = type
      this.lengendGroup.visible = true
      this.lengendGroup.operate = 'add'
    },
    groupAdd() {
      this.$refs['groupForm'].validate(valid => {
        if (valid) {
          const data = this.groupForm
          LendAPI.add(data).then(res => {
            this.$message.success('添加成功', 2000)
            this.lengendGroup.visible = false
            this.handleGroupSelect(this.groupType)
          })
        }
      })
    },
    handleImgAdd(info) {
      this.secondImg.title = info.legendType
      this.secondImg.legendType = info.legendType
      this.secondImg.visible = true
    },
    handleTypeUpdate(info) {
      let title = ''
      switch (info.legendGroup) {
        case '1':
          title = '二维图例'
          break
        case '2':
          title = '三维图例'
          break
        case '3':
          title = '预警图例'
          break
      }
      this.lengendGroup.title = title
      this.lengendGroup.visible = true
      this.groupForm = info
      this.lengendGroup.operate = 'edit'
    },
    groupUpdate() {
      this.$refs['groupForm'].validate(valid => {
        if (valid) {
          const data = this.groupForm
          LendAPI.update(data).then(res => {
            this.$message.success('编辑成功', 2000)
            this.lengendGroup.visible = false
            this.handleGroupSelect(this.groupType)
          })
        }
      })
    },
    handleTypeDelete(info) {
      this.$confirm('确认删除 “' + info.legendType + '” 图例组？').then(() => {
        const data = {
          group: info.legendGroup,
          type: info.legendType
        }
        LendAPI.deleteType(data)
          .then(() => {
            this.handleGroupSelect(this.groupType)
            this.$message.success('删除成功', 2000)
          })
      })
    },
    secondAdd() {
      this.$refs.secondImg.saveData()
    },
    handleModuAdd(info) {
      this.thirdImg.title = info.legendType
      this.thirdImg.legendType = info.legendType
      this.thirdImg.visible = true
    },
    moduAdd() {
      this.$refs.thirdImg.saveData()
    },
    handleWarnAdd(info) {
      this.warnImg.title = info.legendType
      this.warnImg.legendType = info.legendType
      this.warnImg.visible = true
    },
    warnAdd() {
      this.$refs.warnImg.saveData()
    },
    handleViewModo(info) {
      this.viewModo.title = info.name
      this.viewModo.url = info.legendDisplay.model
      this.viewModo.visible = true
    },
    deleteImg(info) {
      this.$confirm('确认删除 “' + info.name + '” 图例？').then(() => {
        LendAPI.delete(info.id)
          .then(() => {
            this.handleGroupSelect(this.groupType)
            this.$message.success('删除成功', 2000)
          })
      })
    },
    changeSort(arr) {
      LendAPI.sort(arr[0].id, arr[1].id).then(res => {
        console.log(res)
      })
    },
    dragStart(e, index, item, a) {
      this.clearBakData() // 清空上一次拖动时保存的数据
      e.dataTransfer.setData({}, index)
      this.fileMiddleData = item // 设置此次拖动时保存的数据
      this.fileMddleIndex = index // 设置此次拖动时保存的数据Index
      this.transArrIndex = a // 设置此次拖动的是那个分类
    },
    drop(e, index, item, a) {
      // 首先判断拖动的是不是一个分类下的图例，如果不是，不给予拖动排序的权限
      if (this.transArrIndex !== a) {
        return
      }
      // 如果拖动和放置的是同一个对象，结束事件
      if (this.fileMddleIndex === index) {
        return
      }
      // 取消默认行为
      this.allowDrop(e)
      // 换位的两个对象
      const changearr = []
      changearr.push(this.fileMiddleData)
      // 使用一个新数组重新排序后赋给原变量
      this.typeList.forEach((m, n) => {
        if (n === a) {
          const arr = m.children.concat([])
          const temp = arr[index]
          arr[index] = arr[this.fileMddleIndex]
          arr[this.fileMddleIndex] = temp
          m.children = arr
          changearr.push(temp)
        }
      })
      this.changeSort(changearr)
      this.clearBakData()
    },
    allowDrop(e) {
      e.preventDefault()
    },
    clearBakData() {
      // 此处写清除各列表的操作
      this.fileMiddleData = {}
      this.fileMddleIndex = -1
      this.transArrIndex = -1
    }
  }
}
</script>

<style lang="scss" scoped>
  .lengend-group-item {
    height: 40px;
    line-height: 40px;
  }
  .lengend-icon {
    float: right;
    line-height: 40px;
    font-size: 24px;
    color: #9B9B9B;
    &:hover {
      color: #2ac06d;
    }
  }
  .lengend-contain {
    position: relative;
    width: 100%;
    max-height: 800px;
    overflow-y: auto;
    .contain-title {
      padding-left: 22px;
      padding-right: 22px;
      font-size: 16px;
      height: 50px;
      line-height: 50px;
      color: #333a3d;
      background-color: #ebf6fb;
      button {
        float: right;
        margin-top: 7px;
        font-size: 16px;
      }
    }
    // 二维图例
    .contain-imgs {
      position: relative;
      margin-bottom: 16px;
      .img-item {
        position: relative;
        display: inline-block;
        width: 80px;
        height: 114px;
        margin-top: 16px;
        margin-left: 40px;
        border: 1px solid rgba(186,222,255,0);
        &:hover {
          border-color: rgba(186,222,255,1);
          .img-delete {
            display: block;
          }
        }
        img {
          margin-top: 10px;
          padding-left: 20px;
          padding-right: 20px;
          width: 80px;
          height: 40px;
        }
        .img-font {
          display: inline-block;
          margin-top: 10px;
          width: 80px;
          text-align: center;
          font-size: 14px;
        }
      }
    }
    // 三维图例
    .contain-modos {
      position: relative;
      margin-bottom: 16px;
      .img-item {
        position: relative;
        display: inline-block;
        width: 130px;
        height: 164px;
        margin-top: 16px;
        margin-left: 40px;
        border: 1px solid rgba(186,222,255,0);
        &:hover {
          border-color: rgba(186,222,255,1);
          .img-delete {
            display: block;
          }
        }
        img {
          margin-top: 10px;
          padding-left: 20px;
          padding-right: 20px;
          width: 130px;
          height: 90px;
        }
        .img-font {
          display: inline-block;
          margin-top: 10px;
          width: 130px;
          text-align: center;
        }
      }
    }
    // 预警图例
     .contain-warns {
       position: relative;
       margin-bottom: 16px;
       .img-group {
         position: relative;
         display: inline-block;
         margin: 10px 20px 0 10px;
         padding: 0px 20px;
         background-color: rgba(248,248,248,1);
         border: 1px solid rgba(186,222,255,0);
         &:hover {
           border-color: rgba(186,222,255,1);
           .img-delete {
             display: block;
           }
         }
         .group-name {
           text-align: center;
           width: 100%;
           color: #444444;
           font-size: 14px;
           line-height: 28px;
           margin-top: 10px;
           font-weight: bold;
         }
         .img-item {
           position: relative;
           display: inline-block;
           width: 80px;
           height: 114px;
           margin: 0 10px;
           img {
             margin-top: 10px;
             padding-left: 20px;
             padding-right: 20px;
             width: 80px;
             height: 40px;
           }
           .img-font {
             display: inline-block;
             margin-top: 10px;
             width: 80px;
             text-align: center;
             font-size: 14px;
           }
         }
       }
     }
    .img-delete {
      position: absolute;
      display: none;
      top: -10px;
      right: -10px;
      color:  rgb(217,0,27);
      text-align: center;
      font-size: 24px;
      cursor: pointer;
      z-index: 2;
    }
  }
</style>
