<template>
  <div>
    <div id="map" ref="map" class="onemap" />

    <div class="warning">
      <div class="warning-title">
        <span>防区预警</span>
        <i class="iconfont iconicon-life-alarm" />
      </div>
      <div class="warning-table">
        <!--分页内容-->
        <table>
          <thead><th>防区编号</th><th>防区名称</th><th>预警类型</th><th>预警时间</th><th>操作</th></thead>
          <tbody>
            <tr v-for="item in list" :key="item.key">
              <td>{{ item.code }}</td>
              <td>{{ item.name }}</td>
              <td>{{ getalarmTypeName(item.alarmType) }}</td>
              <td>{{ item.createTime }}</td>
              <td style="cursor: pointer;" @click="openCamera(item.id)">预览</td>
            </tr></tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import MapPerimeter from './mapPerimeter'
import { PlayBackCamera_Com } from '@/components/DialogCmpts/pops'
import { createPop } from '@/components/DialogCmpts/index.js'
import PoliceAPI from '@/api/perimeter/policeHandle.js'
import { dictBatch } from '@/api/base/dictDetail'
import { mapGetters } from 'vuex'
import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
export default {
  name: 'MapMaintain',
  components: {
  },
  sockets: {
  },
  data() {
    this.mapPerimeter = null
    return {
      tableKey: 0,
      list: [],
      alarmTypeList: [], // 报警类型
      waringId: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  watch: {
  },
  beforeDestroy() {
    this.cancleSocket()
  },
  created() {
    this.geDictList()
  },
  mounted() {
    this.init()
    // 获取警情数据
    this.getdata()
    // 订阅主题
    this.registerVueSocket()
  },
  methods: {
    cancleSocket() {
      if (this.sockets) {
        this.sockets.unsubscribe('perimeter')
      }
    },
    registerVueSocket() {
      const userId = this.userInfo.id
      Vue.use(new VueSocketIO({
        debug: false,
        connection: `ws://192.168.4.104:19090?username=${userId}`,
        options: {
          // path: '/ws',
          ioreconnection: true, // 是否自动重连
          reconnectionAttempts: 10 // 重连次数
        }
      }))
      if (this.sockets) {
        var me = this
        this.sockets.subscribe('perimeter', function(data) {
          me.list.unshift(data)
          // 修改样式
          if (this.waringId !== data.id) {
            this.waringId = data.id
            this.mapPerimeter.setDeploymentStatus(data.id, 'warning')
          }
        })
      }
    },
    init() {
      this.mapPerimeter = new MapPerimeter({
        id: this.$refs.map
      })
    },
    geDictList() {
      dictBatch(['3044']).then(res => {
        this.alarmTypeList = res.data['3044']// 报警类型
      })
    },
    getdata() {
      PoliceAPI.all().then(response => {
        this.list = response.data
      })
    },
    // 获取报警类型
    getalarmTypeName(val) {
      const item = this.alarmTypeList.find(item => item.key === val)
      if (item) {
        return item.value
      }
    },
    openCamera(id) {
      const list = [
        { url: '', img: require('@/assets/watchPoint/videoImg.jpg') },
        { url: '', img: require('@/assets/watchPoint/videoImg.jpg') },
        { url: '', img: require('@/assets/watchPoint/videoImg.jpg') },
        { url: '', img: require('@/assets/watchPoint/videoImg.jpg') },
        { url: '', img: require('@/assets/watchPoint/videoImg.jpg') },
        { url: '', img: require('@/assets/watchPoint/videoImg.jpg') },
        { url: '', img: require('@/assets/watchPoint/videoImg.jpg') },
        { url: '', img: require('@/assets/watchPoint/videoImg.jpg') }
      ]
      const cmpt = new PlayBackCamera_Com({ list: list })
      createPop(cmpt, 'cameraPopUp')
    }
  }
}
</script>

<style lang="scss" scoped>
.onemap {
  position: absolute;
  height: 100%;
  width: 100%;
}
.title{
  text-align: center;
}
.warning{
    position: absolute;
    right: 36px;
    bottom: 29px;
    z-index: 99;
    width: 490px;
    height: 255px;
    border: 1px solid #20EBF9;
    border-radius: 4px;
    background: rgba(28, 148, 154, 0.7);
    .warning-title{
    height: 40px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    line-height: 40px;
    position:relative;
    span{
      position:absolute;
      color:#20EBF9;
      left: 16px;
    }
    i{
       position:absolute;
      color:red;
      font-size: 26px;
      right:10px;
    }
    }
}
.warning-table{
      height: 213px;
    overflow: auto;
        overflow-x: hidden;
}
.warning-table table {
  font-size: 13px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #FFFFFF;
    width:100%;
        border-collapse: collapse;
    tbody{
      text-align:center;
      tr{
        border:1px dashed #3F9E9F;
        td{
              padding: 5px 0;
        }
      }
    }
    thead{
      text-align:center;
          background: #188186;
    font-size: 14px;
    th{
      padding: 5px 0px;
    }
    }
}

</style>
