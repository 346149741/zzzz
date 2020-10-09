<template>
  <div class="icons-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>图标选择</span>
      </div>
      <el-tabs type="border-card">
        <el-tab-pane label="Icons">
          <div class="grid">
            <div v-for="item of svgIcons" :key="item" @click="handleClipboard(generateIconCode(item),$event)">
              <el-tooltip placement="top">
                <div slot="content">
                  {{ generateIconCode(item) }}
                </div>
                <div class="icon-item">
                  <i :class="item" />
                  <span>{{ item }}</span>
                </div>
              </el-tooltip>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Element-UI Icons">
          <div class="grid">
            <div v-for="item of elementIcons" :key="item" @click="handleClipboard(generateElementIconCode(item),$event)">
              <el-tooltip placement="top">
                <div slot="content">
                  {{ generateElementIconCode(item) }}
                </div>
                <div class="icon-item">
                  <i :class="item" />
                  <span>{{ item }}</span>
                </div>
              </el-tooltip>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import clipboard from '@/utils/clipboard'
import { readExtendIcons, readElementIcons } from '@/api/base/menu.js'
export default {
  name: 'Icons',
  data() {
    return {
      svgIcons: [],
      elementIcons: []
    }
  },
  created() {
    readElementIcons().then((res) => {
      this.elementIcons = res
    })
    readExtendIcons().then((res) => {
      this.svgIcons = res
    })
  },
  methods: {
    generateIconCode(symbol) {
      return `<i class="${symbol}" />`
    },
    generateElementIconCode(symbol) {
      return `<i class="${symbol}" />`
    },
    handleClipboard(text, event) {
      clipboard(text, event)
    }
  }
}
</script>

<style lang="scss" scoped>
.icons-container {
  margin: 10px 20px 0;
  overflow: hidden;

  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .icon-item {
    margin: 20px;
    height: 85px;
    text-align: center;
    width: 100px;
    float: left;
    font-size: 30px;
    color: #24292e;
    cursor: pointer;
    i{
      font-size: 24px;
    }
  }

  span {
    display: block;
    font-size: 12px;
    margin-top: 10px;
  }

  .disabled {
    pointer-events: none;
  }
}
</style>
