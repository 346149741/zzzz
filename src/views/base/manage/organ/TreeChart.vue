<template>
  <div style="overflow-y: auto;">
    <table v-if="treeData.organizationName">
      <tr>
        <td :colspan="treeData.children ? treeData.children.length * 2 : 1" :class="{parentNode: treeData.children}">
          <div class="node">
            <div class="name">
              <div class="org-name">{{ treeData.organizationName }}</div>
              <div>
                <span class="name-left"><span class="name-label">指挥官：</span>{{treeData.commandOfficerName}}</span>
                <span class="name-right"><span class="name-label">政委：</span>{{treeData.politicalCommissarName}}</span>
              </div>
            </div>
          </div>
        </td>
      </tr>
      <tr v-if="treeData.children">
        <td v-for="(children, index) in treeData.children" :key="index" colspan="2" class="childLevel" style="padding-bottom: 0;">
          <TreeChart :treeData="children" @click-node="$emit('click-node', $event)" />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TreeChart',
  props: ['treeData'],
  data() {
    return {
    }
  },
  watch: {
  },
  methods: {

  }
}
</script>

<style scoped>
  table{border-collapse: separate!important;border-spacing: 0!important;}
  td{position: relative; vertical-align: bottom;padding:2px 0 40px 0;text-align: center; }

  .parentNode::after {content: "";position: absolute;left:49.9%;top:90px;height:30px;border-left:2px solid #ccc;}
  .childLevel::before{content: "";position: absolute;left:50%;top:-11px;height:15px;border-left:2px solid #ccc;transform: translate3d(-1px,0,0)}
  .childLevel::after{content: "";position: absolute;left:0;right:0;top:-11px;border-top:2px solid #ccc;}
  .childLevel:first-child:before, .childLevel:last-child:before{display: none;}
  .childLevel:first-child:after{left:50%;height:15px; border:2px solid;border-color:#ccc transparent transparent #ccc;border-radius: 6px 0 0 0;transform: translate3d(1px,0,0)}
  .childLevel:last-child:after{right:50%;height:15px; border:2px solid;border-color:#ccc #ccc transparent transparent;border-radius: 0 6px 0 0;transform: translate3d(-1px,0,0)}
  .childLevel:first-child.childLevel:last-child::after{left:auto;border-radius: 0;border-color:transparent #ccc transparent transparent;transform: translate3d(1px,0,0)}
  .parentNode, .childLevel{vertical-align: top;}

  .node{position: relative; display: inline-block;width: 13em;box-sizing: border-box; text-align: center;}
  .node .person{position: relative; display: inline-block;z-index: 2;width:6em; overflow: hidden;}
  .node .avat{display: block;width:4em;height: 4em;margin:auto;overflow:hidden; background:#fff;border:1px solid #ccc;box-sizing: border-box;}
  .node .avat img{width:100%;height: 100%;}
  .node .name{height:5em;line-height: 2em;overflow: hidden;width:95%; background:#eee;border:1px solid #ccc;box-sizing: border-box;border-radius: 5px;}
  .node .name-left{font-size: 10px;float: left;margin-left: 4px;}
  .node .name-right{font-size: 10px;float: right;margin-right: 4px;}
  .node .name-label{font-weight: 600;}
  .node .org-name{font-weight: 600;margin-top: 6px;}

</style>
