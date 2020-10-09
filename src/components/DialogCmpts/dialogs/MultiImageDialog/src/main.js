import Vue from 'vue'
import Main from './main.vue'

const MainConstructor = Vue.extend(Main)

export default function MultiImageDialog(opts = {}) {
  const msg = new MainConstructor({ data: opts })
  msg.$mount()
  document.body.appendChild(msg.$el)
}
