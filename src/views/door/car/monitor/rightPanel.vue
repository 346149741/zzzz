<template>
  <div class="monitor-panel">
    <div class="monitor-panel-maintainer panel-imgs">
      <div class="title">
        <span>抓拍图像</span><i class="iconfont iconyou" @click="handleMoreImgClick" />
      </div>
      <div class="panel-img-list">
        <div class="img-item">
          <div class="border">
            <div class="top left" />
            <div class="top right" />
            <div class="bottom left" />
            <div class="bottom right" />
            <img src="@/assets/animationEarth/earthBg.png" alt="">
          </div>
        </div>
        <div class="img-item">
          <div class="border">
            <div class="top left" />
            <div class="top right" />
            <div class="bottom left" />
            <div class="bottom right" />
            <img src="@/assets/animationEarth/earthBg.png" alt="">
          </div>
        </div>
        <div class="img-item">
          <div class="border">
            <div class="top left" />
            <div class="top right" />
            <div class="bottom left" />
            <div class="bottom right" />
            <img src="@/assets/animationEarth/earthBg.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="monitor-panel-maintainer panel-warn">
      <div class="warning">
        <div class="warning-title">
          <span>预警事件</span>
          <i class="iconfont iconicon-life-alarm" />
        </div>
        <div class="warning-table">
          <!--分页内容-->
          <table>
            <thead><th>预警地点</th><th>预警车辆</th><th>预警类型</th><th>预警时间</th><th>操作</th></thead>
            <tbody>
              <tr v-for="item in warnList" :key="item.id">
                <td>{{ item.code }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.alarmType }}</td>
                <td>{{ item.createTime }}</td>
                <td style="cursor: pointer;" @click="handleImageClick(item.id)">预览</td>
              </tr></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SingleImageDialog from '@/components/DialogCmpts/dialogs/SingleImageDialog'
import MultiImageDialog from '@/components/DialogCmpts/dialogs/MultiImageDialog'
export default {
  name: 'RightPanel',
  data() {
    return {
      imgList: [],
      warnList: [
        { id: 1, code: 'A区', name: '豫A23422', alarmType: '设备离线', createTime: '2020年9月24日15:01:03' },
        { id: 11, code: 'A区', name: '豫A23422', alarmType: '设备离线', createTime: '2020年9月24日15:01:03' },
        { id: 12, code: 'A区', name: '豫A23422', alarmType: '设备离线', createTime: '2020年9月24日15:01:03' },
        { id: 13, code: 'A区', name: '豫A23422', alarmType: '设备离线', createTime: '2020年9月24日15:01:03' },
        { id: 14, code: 'A区', name: '豫A23422', alarmType: '设备离线', createTime: '2020年9月24日15:01:03' }
      ]
    }
  },
  created() {
    this.getImgList()
    this.getWarnList()
  },
  methods: {
    handleMoreImgClick() {
      const list = [
        { url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2661051407,1673218595&fm=26&gp=0.jpg' },
        { url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2661051407,1673218595&fm=26&gp=0.jpg' },
        { url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2661051407,1673218595&fm=26&gp=0.jpg' },
        { url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2661051407,1673218595&fm=26&gp=0.jpg' },
        { url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2661051407,1673218595&fm=26&gp=0.jpg' },
        { url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2661051407,1673218595&fm=26&gp=0.jpg' },
        { url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2661051407,1673218595&fm=26&gp=0.jpg' },
        { url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2661051407,1673218595&fm=26&gp=0.jpg' },
        { url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2661051407,1673218595&fm=26&gp=0.jpg' },
        { url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2661051407,1673218595&fm=26&gp=0.jpg' },
        { url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2661051407,1673218595&fm=26&gp=0.jpg' },
        { url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2661051407,1673218595&fm=26&gp=0.jpg' }
      ]
      new MultiImageDialog({ list })
    },
    handleImageClick() {
      new SingleImageDialog({
        url: 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1599622000&di=23fa36a0f9802370452849e5916860c1&src=http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg'
      })
    },
    getImgList() {

    },
    getWarnList() {

    }
  }
}
</script>

<style lang="scss" scoped>
  .monitor-panel {
    position: absolute;
    top: 20px;
    right: 30px;
    width: 490px;

    .monitor-panel-maintainer {
      border: 1px solid #20EBF9;
      border-radius: 4px;
      background: rgba(28, 147, 153, 0.7);

      &.panel-imgs {
        padding:12px;
        padding-top: 0px;

        .panel-img-list {
          display: flex;
          flex-wrap: wrap;
          .img-item {
            margin: 2px 5px;
            .border {
              position: relative;
              img{
                width: 212px;
                height: 124px;
              }
              div {
                width: 10px;
                height: 10px;
                position: absolute;
              }
              .top{
                border-top: 1px solid #20EBF9;
                top: 0;
              }
              .bottom{
                border-bottom: 1px solid #20EBF9;
                bottom: 0;
              }
              .left{
                border-left: 1px solid #20EBF9;
                left: 0;
              }
              .right{
                border-right: 1px solid #20EBF9;
                right: 0;
              }

            }
          }
        }
      }

      &.panel-warn {
        margin-top: 10px;

        .title {
          padding: 0 18px;
          display: flex;
          justify-content: space-between;

          .iconfont {
            font-size: 18px;
            color: #FF1818;
          }
        }
      }

      .title {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #20EBF9;
        line-height: 28px;
        .iconfont{
          cursor: pointer;
        }
      }
    }
  }

  .warning{
    z-index: 99;
    width: 490px;
    height: 255px;
    border: 1px solid #20EBF9;
    border-radius: 4px;
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
