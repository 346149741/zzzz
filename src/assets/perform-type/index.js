// pop 框需要严格与一张图配置相符
// todo  后续可扩展为1、多样式选择  2、及时显示
export default [
  {
    value: '01',
    label: '标注',
    children:[
      {label:'静态标注',value:'StaticLabelNode_Com'},
    ]
  },
  {
    value: '02',
    label: '管线',
    children:[
      {label:'管线节点',value:'LinePipeNodes_Com'},
      {label:'管线',value:'PipeLinePopu_Com'},
    ]
  },
  {
    value: '03',
    label: '轨迹',
    children:[
      {label:'轨迹节点',value:'TrackNodes_Com'},
    ]
  },
  {
    value: '04',
    label: '事件',
    children:[
      {label:'预警点',value:'WarningNode_Com'},
    ]
  },
  {
    value: '05',
    label: '其他',
    children:[
      {label:'摄像头',value:'CameraNode_Com'},
      {label:'巡检车',value:'Car_Com'},
      {label:'高后果区',value:'ConsequencePopu_Com'},
      {label:'第三方施工',value:'ThirdPopu_Com'},
      {label:'VR',value:'VRNode_Com'},
      {label:'巡检工',value:'TourPop_Com'},
    ]
  },



]
