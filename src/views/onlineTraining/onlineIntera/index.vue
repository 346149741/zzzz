<template>
  <div class="app-container">
    <el-card class="box-card app-body">
      <div slot="header" class="clearfix">
        <span>网上答疑</span>
      </div>
      <div class="title">
        <div class="type">
          <span class="active">全部</span><span>我的提问</span>
        </div>
        <div>
          <el-input v-model="value" class="search" placeholder="请输入关键字" />
          <el-button type="primary">查询</el-button>
          <el-button type="primary" @click.native="dialog=true">提问</el-button>
        </div>
      </div>
      <div class="body">
        <el-card shadow="hover" style="margin-bottom: 20px;">
          <div class="body-title">国家对新闻行业的政策是什么啊？</div>
          <div class="body-sub"><span>王宇</span><span style="margin-left: 40px;">2020-05-12</span></div>
          <div class="body-main">
            <div class="box">
              <span>在水门窃听事件曝光后，美国司法部长 Elliot Richardson 任命 Archibald Cox 作为特别检察官，专门进行该事件的调查。Cox 进行了一个触及尼克松利益的基本操作：要求获得尼克松所持有的录音带。尼克松拒绝提供录音带，他声称录音带中含有对国家安全至关重要的内容，并主张自己享有行政豁免权尼克松拒绝提供录音带，他声称录音带中含有对国家安全至关重要的内容，并主张自己享有行政豁免权。为了保护「国家安全」，尼克松还提出了一个天才的方案：不提供录音带本身，而是请德高望重的参议员 John Stennis 来听一听录音，将其中不这么敏感的内容记录下来，再把笔记提供给特别检察官。</span>
            </div>
            <div class="more" @click="showMore($event)"><span style="cursor:pointer;">显示更多<i
              class="iconfont iconxiala"
            /></span></div>
            <div class="answers">
              <div class="my">
                <el-input v-model="value2" placeholder="写下你的评价..." style="width: 60%;" />
                <el-button type="primary" style="margin-left: 20px;">发表评论</el-button>
              </div>
              <ul class="list">
                <li class="item">
                  <div class="title"><span>呆呆</span><span>2020年9月24日09:15</span></div>
                  <div class="desc">世易时移，如果现在川普做同样事情的话，未必有同样的下场，彼时的规则还是规则。</div>
                </li>
                <li class="item">
                  <div class="title"><span>胡文广</span><span>2020年9月24日09:15</span></div>
                  <div class="desc">世易时移，如果现在川普做同样事情的话，未必有同样的下场，彼时的规则还是规则。</div>
                </li>
                <li class="item">
                  <div class="title"><span>何方</span><span>2020年9月24日09:15</span></div>
                  <div class="desc">世易时移，如果现在川普做同样事情的话，未必有同样的下场，彼时的规则还是规则。</div>
                </li>
                <li class="item">
                  <div class="title"><span>宋思聪</span><span>2020年9月24日09:15</span></div>
                  <div class="desc">世易时移，如果现在川普做同样事情的话，未必有同样的下场，彼时的规则还是规则。</div>
                </li>
              </ul>
            </div>
          </div>
        </el-card>
        <el-card shadow="hover" style="margin-bottom: 20px;">
          <div class="body-title">国家对新闻行业的政策是什么啊？</div>
          <div class="body-sub"><span>王宇</span><span style="margin-left: 40px;">2020-05-12</span></div>
          <div class="body-main">
            <div class="box">
              <span>在水门窃听事件曝光后，美国司法部长 Elliot Richardson 任命 Archibald Cox 作为特别检察官，专门进行该事件的调查。Cox 进行了一个触及尼克松利益的基本操作：要求获得尼克松所持有的录音带。尼克松拒绝提供录音带，他声称录音带中含有对国家安全至关重要的内容，并主张自己享有行政豁免权尼克松拒绝提供录音带，他声称录音带中含有对国家安全至关重要的内容，并主张自己享有行政豁免权。为了保护「国家安全」，尼克松还提出了一个天才的方案：不提供录音带本身，而是请德高望重的参议员 John Stennis 来听一听录音，将其中不这么敏感的内容记录下来，再把笔记提供给特别检察官。</span>
            </div>
            <div class="more" @click="showMore($event)"><span style="cursor:pointer;">显示更多<i
              class="iconfont iconxiala"
            /></span></div>
            <div class="talks">43条评论</div>
          </div>
        </el-card>
        <el-card shadow="hover" style="margin-bottom: 20px;">
          <div class="body-title">国家对新闻行业的政策是什么啊？</div>
          <div class="body-sub"><span>王宇</span><span style="margin-left: 40px;">2020-05-12</span></div>
          <div class="body-main">
            <div class="box">
              <span>在水门窃听事件曝光后，美国司法部长 Elliot Richardson 任命 Archibald Cox 作为特别检察官，专门进行该事件的调查。Cox 进行了一个触及尼克松利益的基本操作：要求获得尼克松所持有的录音带。尼克松拒绝提供录音带，他声称录音带中含有对国家安全至关重要的内容，并主张自己享有行政豁免权尼克松拒绝提供录音带，他声称录音带中含有对国家安全至关重要的内容，并主张自己享有行政豁免权。为了保护「国家安全」，尼克松还提出了一个天才的方案：不提供录音带本身，而是请德高望重的参议员 John Stennis 来听一听录音，将其中不这么敏感的内容记录下来，再把笔记提供给特别检察官。</span>
            </div>
            <div class="more" @click="showMore($event)"><span style="cursor:pointer;">显示更多<i
              class="iconfont iconxiala"
            /></span></div>
            <div class="talks">43条评论</div>
          </div>
        </el-card>
      </div>
      <el-dialog
        class="abow_dialog detail-form"
        title="提问"
        :visible.sync="dialog"
        :close-on-click-modal="false"
        width="800px"
      >
        <el-row style="padding: 20px">
          <el-col :span="4" style="text-align: center">
            <el-avatar size="large" :src="circleUrl" />
          </el-col>
          <el-col :span="20"><el-input
            v-model="vak"
            type="textarea"
            placeholder="请写下你的问题，准确描述更容易得到解答"
            show-word-limit
            height="500"
          /></el-col>
          <el-col :span="24" style="display: flex;justify-content: space-between;margin-top: 30px;">
            <el-checkbox v-model="chk">匿名回答</el-checkbox>
            <el-button type="primary" @click.native="dialog=false">发布问题</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      circleUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=395549444,2947920671&fm=26&gp=0.jpg',
      value: '',
      vak: '',
      chk: false,
      value2: '',
      dialog: false
    }
  },
  mounted() {
    this.showMoreDetail()
  },
  methods: {
    showMore(arg) {
      arg.currentTarget.previousElementSibling.classList.remove('box')
      arg.currentTarget.style.display = 'none'
    },
    showMoreDetail() {
      const asdf = document.getElementsByClassName('box')
      Array.from(asdf).forEach((cellElement) => {
        const a = cellElement
        const b = a.getElementsByTagName('span')[0]
        if (a.offsetHeight >= b.offsetHeight) {
          a.classList.remove('box')
          a.nextElementSibling.style.display = 'none'
        } else {
          a.classList.add('box')
          a.nextElementSibling.style.display = 'block'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .title {
    display: flex;
    justify-content: space-between;

    .type {
      font-size: 20px;
      line-height: 40px;

      span {
        &.active {
          color: #169BD5;
        }

        margin-right: 20px;
        font-weight: 500;
        cursor: pointer;
      }
    }

    .search {
      width: 400px;
    }
  }

  .body {
    margin-top: 16px;

    .body-title {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 14px;
    }

    .body-sub {
      line-height: 30px;
      font-size: 18px;
      color: #aaa;
    }

    .body-main {
      text-indent: 1em;

      .box {
        ext-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
      }

      .more {
        color: #0a76a4;
        margin: 4px 0;
      }

      .talks {
        cursor: pointer;
        color: #0a76a4;
      }

      .answers {
        margin-top: 14px;
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 10px 20px;

        .my {
          padding: 14px;
          border-bottom: 1px solid #ccc;
        }

        .list {
          padding: 0 100px;

          .item {
            padding: 20px 0;
            border-bottom: 1px solid #ccc;
            .title{
              font-size: 14px;
              line-height: 32px;
            }
            .desc{
              margin-top: 14px;
            }
          }
        }
      }
    }
  }
</style>
