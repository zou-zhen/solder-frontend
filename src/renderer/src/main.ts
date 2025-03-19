import './styles/index.scss'

import { createApp, Directive } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'
import pinia from './store'
import '@renderer/assets/font/iconfont.css'

const app = createApp(App)
for (const i in Icons) {
  app.component(i, Icons[i])
}
// 注册全局指令
const focusDirective: Directive = {
  mounted(el: HTMLElement) {
    const inputElement = el.querySelector('el-input')
    if (inputElement) {
      inputElement.focus()
    }
  }
}
app.directive('focus', focusDirective)
app.use(router).use(ElementPlus).use(pinia.store).mount('#app')
