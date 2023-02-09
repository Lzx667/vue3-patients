//为全局组件添加类型
// 1.导入组件
import CpNavBar from '@/components/CpNavBar.vue'
import CpIcon from '@/components/CpIcon.vue'
import CpRadioBtn from '@/components/CpRadioBtn.vue'
import CpPaySheet from '@/components/CpPaySheet.vue'
// 2.声明vue类型模块
declare module 'vue' {
  // 3.给vue添加全局组件类型
  interface GlobalComponents {
    // 4.定义具体组件类型,typeof获取到组件的实例类型
    CpNavBar: typeof CpNavBar
    CpIcon: typeof CpIcon
    CpRadioBtn: typeof CpRadioBtn
    CpPaySheet: typeof CpPaySheet
  }
}
