<template>
  <div>
    <div
      id="container"
      v-loading="loading"
      element-loading-text="拼命加载中"
    />
  </div>
</template>
<script>
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default {
  name: 'ModelViewComp',
  props: ['popData'],
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      light: null,
      mush: null,
      loader: null,
      mixer: null,
      clock: new THREE.Clock(),
      controls: null,
      gltfLoader: null,
      orbitControls: null,
      animationMixer: null,
      walkAction: null,
      url: '',
      loading: false
    }
  },
  watch: {
    'popData.visible'(val) {
      if (val) {
        this.initmodo()
        this.render()
      } else {
        document.getElementById('container').innerHTML = ''
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initmodo()
      this.render()
    })
  },
  methods: {
    initmodo() {
      this.loading = true
      this.url = this.popData.url
      // 创建场景对象
      this.scene = new THREE.Scene()

      // 创建点光源
      const point = new THREE.PointLight('#FFFFFF')
      // 点光源位置
      point.position.set(400, 200, 300)
      // 将点光源设置到场景中去
      this.scene.add(point)
      const point2 = new THREE.PointLight('#FFFFFF')
      point2.position.set(-400, -200, -300)
      this.scene.add(point2)

      // 设置环境光
      // const ambient = new THREE.AmbientLight('#444444')
      // 将环境光设置到场景中去
      // this.scene.add(ambient)

      const container = document.getElementById('container')
      // 设置相机
      const height = container.offsetHeight
      const width = container.offsetWidth
      // 宽高比
      const k = width / height
      // 三维缩放系数
      const s = 100
      this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
      // 设置相机位置
      this.camera.position.set(600, 500, 300)
      // 设置相机方向(指向的场景对象)
      this.camera.lookAt(this.scene.position)

      // 创建渲染器对象
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.setSize(width, height)
      // 设置背景颜色
      this.renderer.setClearColor(0xA9A9A9, 1)
      // 页面容器中插入canves
      container.appendChild(this.renderer.domElement)

      // 鼠标控制操作
      this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement)
      this.orbitControls.mouseButtons = {
        // 左键平移
        LEFT: THREE.MOUSE.PAN,
        // 滚轮滑动
        MIDDLE: THREE.MOUSE.ROTATE,
        // 右键旋转
        RIGHT: THREE.MOUSE.DOLLY
      }
      console.log(this.orbitControls)
      // 添加网格线 ---效果不理想
      // this.initNetLine()
      // 添加文字 ---没成功回家再研究
      // this.initText()
      this.gltfLoader = new GLTFLoader()
      this.gltfLoader.load(this.url, gltf => {
        const loadscene = gltf.scene
        loadscene.name = 'Soldier'
        loadscene.rotation.y = Math.PI
        loadscene.traverse(function(object) {
          if (object.isMesh) {
            object.castShadow = true
          }
        })
        const group = new THREE.Group()
        group.add(loadscene)
        const bbox = new THREE.Box3().setFromObject(group)
        const mdlen = bbox.max.x - bbox.min.x // 边界的最小坐标值 边界的最大坐标值
        const mdhei = bbox.max.y - bbox.min.y
        const mdwid = bbox.max.z - bbox.min.z
        const p = ((Math.round(50 * 10000 / mdlen) + Math.round(50 * 10000 / mdhei) + Math.round(50 * 10000 / mdwid)) / (3 * 10000)).toFixed(2)
        loadscene.scale.set(p, p, p)
        this.scene.add(loadscene)
        this.scene.add(new THREE.AmbientLight(0x404040, 1))
        this.loading = false
      })
    },
    // 加载文字
    initText() {
      const loader = new THREE.FontLoader()
      loader.load('fonts/helvetiker_regular.typeface.json', font => {
        const geometry = new THREE.TextGeometry('asdv', {
          font: font,
          size: 80,
          height: 5,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 10,
          bevelSize: 8,
          bevelSegments: 5
        })
        geometry.center()
        const mat = new THREE.MeshPhongMaterial({
          color: 0xffe502,
          specular: 0x009900,
          shininess: 30,
          shading: THREE.FlatShading
        })
        const textObj = new THREE.Mesh(geometry, mat)
        textObj.castShadow = true
        this.scene.add(textObj)
      })
    },
    // 添加网络线
    initNetLine() {
      const geometry = new THREE.Geometry()
      geometry.vertices.push(new THREE.Vector3(-500, 0, 0))
      geometry.vertices.push(new THREE.Vector3(500, 0, 0))

      for (var i = 0; i <= 40; i++) {
        const line1 = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0x808080, opacity: 0.8 }))
        line1.position.z = (i * 20) - 500
        this.scene.add(line1)

        const line2 = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0x808080, opacity: 0.8 }))
        line2.position.x = (i * 20) - 500
        line2.rotation.y = 90 * Math.PI / 180
        this.scene.add(line2)
      }
    },
    // 渲染函数
    render() {
      this.renderer.render(this.scene, this.camera)
      // 自动旋转
      // this.mesh.rotateY(0.01)
      requestAnimationFrame(this.render)
    }
  }
}
</script>

<style scoped>
  #container{
    position: relative;
    margin: 0;
    width: 100%;
    height: 600px;
  }
</style>
